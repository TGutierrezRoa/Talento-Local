
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  const fetchUserData = async (userId) => {
    try {
      const { data: userData, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user data:', error);
        return null;
      }

      if (userData.user_type === 'prestador') {
        const { data: providerData, error: providerError } = await supabase
          .from('provider_profiles')
          .select('*')
          .eq('user_id', userId)
          .single();

        if (providerError) {
          console.error('Error fetching provider data:', providerError);
        } else {
          return { ...userData, provider: providerData };
        }
      }

      return userData;
    } catch (error) {
      console.error('Error in fetchUserData:', error);
      return null;
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          throw error;
        }

        if (session?.user) {
          const userData = await fetchUserData(session.user.id);
          if (userData) {
            setUser({ ...session.user, ...userData });
            // Redirigir según el tipo de usuario si estamos en login o register
            const currentPath = window.location.pathname;
            if (currentPath === '/login' || currentPath === '/register') {
              navigate(userData.user_type === 'prestador' ? '/dashboard' : '/');
            }
          } else {
            await supabase.auth.signOut();
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error in initializeAuth:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session);
      
      if (event === 'SIGNED_OUT' || event === 'USER_DELETED') {
        setUser(null);
        navigate('/');
        return;
      }

      if (session?.user) {
        const userData = await fetchUserData(session.user.id);
        if (userData) {
          setUser({ ...session.user, ...userData });
          
          if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
            toast({
              title: "¡Bienvenido!",
              description: "Has iniciado sesión correctamente"
            });
            navigate(userData.user_type === 'prestador' ? '/dashboard' : '/');
          }
        } else {
          await supabase.auth.signOut();
          setUser(null);
        }
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [navigate]);

  const signIn = async (email, password) => {
    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      const userData = await fetchUserData(authData.user.id);
      
      if (!userData) {
        await supabase.auth.signOut();
        throw new Error('No se encontró la información del usuario');
      }

      setUser({ ...authData.user, ...userData });
      
      toast({
        title: "¡Bienvenido!",
        description: "Has iniciado sesión correctamente"
      });

      navigate(userData.user_type === 'prestador' ? '/dashboard' : '/');
      
      return { user: authData.user, userType: userData.user_type };
    } catch (error) {
      console.error('Sign in error:', error);
      toast({
        title: "Error de autenticación",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };

  const signUp = async (email, password, userType, userData) => {
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;

      const { error: userError } = await supabase
        .from('users')
        .insert([{
          id: authData.user.id,
          email,
          name: userData.name,
          user_type: userType,
        }]);

      if (userError) {
        console.error('Error creating user:', userError);
        await supabase.auth.signOut();
        throw new Error('Error al crear el perfil de usuario');
      }

      if (userType === 'prestador' && userData.providerData) {
        const { error: providerError } = await supabase
          .from('provider_profiles')
          .insert([{
            user_id: authData.user.id,
            ...userData.providerData
          }]);

        if (providerError) {
          console.error('Error creating provider profile:', providerError);
          await supabase.from('users').delete().eq('id', authData.user.id);
          await supabase.auth.signOut();
          throw new Error('Error al crear el perfil de prestador');
        }
      }

      const verifyUser = await fetchUserData(authData.user.id);
      if (!verifyUser) {
        throw new Error('Error en la verificación de datos');
      }

      toast({
        title: "¡Registro exitoso!",
        description: "Tu cuenta ha sido creada correctamente"
      });

      setUser({ ...authData.user, ...verifyUser });
      navigate(userType === 'prestador' ? '/dashboard' : '/');

      return { user: authData.user, userType };
    } catch (error) {
      console.error('Sign up error:', error);
      toast({
        title: "Error en el registro",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      navigate('/');
      
      toast({
        title: "Sesión cerrada",
        description: "Has cerrado sesión correctamente"
      });
    } catch (error) {
      console.error('Sign out error:', error);
      toast({
        title: "Error al cerrar sesión",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
