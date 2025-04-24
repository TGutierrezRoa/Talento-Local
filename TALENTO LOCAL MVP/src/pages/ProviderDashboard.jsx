
import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { Calendar, Users, Star, DollarSign, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const ProviderDashboard = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState({
    totalReviews: 0,
    averageRating: 0,
    totalClients: 0,
    earnings: 0
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data, error } = await supabase
          .from('provider_profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (error) throw error;
        setProfile(data);

        // Fetch stats
        const { data: reviews } = await supabase
          .from('reviews')
          .select('rating')
          .eq('provider_id', data.id);

        setStats({
          totalReviews: reviews?.length || 0,
          averageRating: reviews?.reduce((acc, rev) => acc + rev.rating, 0) / reviews?.length || 0,
          totalClients: reviews?.length || 0, // Simplificado para el ejemplo
          earnings: 0 // Se implementará con el sistema de pagos
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "No se pudo cargar el perfil",
          variant: "destructive"
        });
      }
    };

    if (user) fetchProfile();
  }, [user]);

  if (!profile) return <div>Cargando...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Bienvenido, {profile.name}</p>
          </div>
          <Button
            variant="outline"
            className="flex items-center"
            onClick={signOut}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Cerrar sesión
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Reseñas totales</p>
                <h3 className="text-2xl font-bold">{stats.totalReviews}</h3>
              </div>
              <Star className="w-8 h-8 text-yellow-400" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Calificación promedio</p>
                <h3 className="text-2xl font-bold">{stats.averageRating.toFixed(1)}</h3>
              </div>
              <Star className="w-8 h-8 text-yellow-400" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Clientes totales</p>
                <h3 className="text-2xl font-bold">{stats.totalClients}</h3>
              </div>
              <Users className="w-8 h-8 text-blue-400" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Ganancias totales</p>
                <h3 className="text-2xl font-bold">${stats.earnings}</h3>
              </div>
              <DollarSign className="w-8 h-8 text-green-400" />
            </div>
          </motion.div>
        </div>

        {/* Profile Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <img
              src={profile.profile_image || "https://via.placeholder.com/150"}
              alt={profile.name}
              className="w-24 h-24 rounded-full object-cover"
            />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{profile.titulo}</h2>
              <p className="text-gray-600">{profile.especialidad}</p>
              <p className="text-gray-500">{profile.ciudad}, {profile.provincia}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Información de contacto</h3>
              <p className="text-gray-600">Email: {user.email}</p>
              <p className="text-gray-600">Teléfono: {profile.telefono}</p>
              <p className="text-gray-600">Dirección: {profile.direccion}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Información profesional</h3>
              <p className="text-gray-600">Matrícula: {profile.matricula}</p>
              <p className="text-gray-600">Experiencia: {profile.experiencia} años</p>
              <p className="text-gray-600">Tarifa por hora: ${profile.tarifa_hora}</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Button className="bg-orange-500 hover:bg-orange-600">
            <Calendar className="w-4 h-4 mr-2" />
            Ver agenda
          </Button>
          <Button className="bg-orange-500 hover:bg-orange-600">
            <Users className="w-4 h-4 mr-2" />
            Ver clientes
          </Button>
          <Button className="bg-orange-500 hover:bg-orange-600">
            <Settings className="w-4 h-4 mr-2" />
            Configuración
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;
