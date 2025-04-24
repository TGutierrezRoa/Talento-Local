
import React, { Suspense, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";

// Importaciones con lazy loading
const Home = React.lazy(() => import("@/pages/Home"));
const Login = React.lazy(() => import("@/pages/Login"));
const Register = React.lazy(() => import("@/pages/Register"));
const ServiceList = React.lazy(() => import("@/pages/ServiceList"));
const ProviderDashboard = React.lazy(() => import("@/pages/ProviderDashboard"));
const PaymentForm = React.lazy(() => import("@/components/PaymentForm"));
const Settings = React.lazy(() => import("@/pages/Settings"));

// Componente protegido para el dashboard
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (user.user_type !== 'prestador') {
      navigate('/');
    }
  }, [user, navigate]);

  return user && user.user_type === 'prestador' ? children : null;
};

// Componente principal que maneja la autenticación
const AuthenticatedApp = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const currentPath = window.location.pathname;
      if (currentPath === '/login' || currentPath === '/register') {
        navigate(user.user_type === 'prestador' ? '/dashboard' : '/');
      }
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <Suspense>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={
              user ? (
                <Navigate to={user.user_type === 'prestador' ? '/dashboard' : '/'} replace />
              ) : (
                <Login />
              )
            } />
            <Route path="/register" element={
              user ? (
                <Navigate to={user.user_type === 'prestador' ? '/dashboard' : '/'} replace />
              ) : (
                <Register />
              )
            } />
            <Route path="/servicios/:category" element={<ServiceList />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <ProviderDashboard />
                </ProtectedRoute>
              } 
            />
            <Route path="/payment/:providerId" element={<PaymentForm />} />
            <Route 
              path="/configuracion" 
              element={
                user ? <Settings /> : <Navigate to="/login" replace />
              }
            />
          </Routes>
        </Suspense>
      </div>
      <Footer />
      <Toaster />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AuthenticatedApp />
    </AuthProvider>
  );
}

export default App;
