
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import RatingStars from "@/components/RatingStars";

const PaymentForm = () => {
  const { providerId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    acceptTerms: false
  });

  useEffect(() => {
    const fetchProvider = async () => {
      try {
        const { data, error } = await supabase
          .from('provider_profiles')
          .select('*, users(*)')
          .eq('id', providerId)
          .single();

        if (error) throw error;
        setProvider(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "No se pudo cargar la información del prestador",
          variant: "destructive"
        });
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchProvider();
  }, [providerId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.acceptTerms) {
      toast({
        title: "Error",
        description: "Debes aceptar los términos y condiciones",
        variant: "destructive"
      });
      return;
    }

    try {
      // Aquí iría la lógica de pago con Stripe
      toast({
        title: "Procesando pago",
        description: "Tu solicitud está siendo procesada"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo procesar el pago",
        variant: "destructive"
      });
    }
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Contratar Servicio
            </h2>

            {/* Información del prestador */}
            <div className="mb-8 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <img
                  src={provider.profile_image || "https://via.placeholder.com/100"}
                  alt={provider.titulo}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold">{provider.titulo}</h3>
                  <p className="text-gray-600">{provider.especialidad}</p>
                  <div className="flex items-center mt-1">
                    <RatingStars rating={provider.rating || 0} readOnly size="small" />
                    <span className="ml-2 text-sm text-gray-500">
                      ({provider.reviews_count || 0} reseñas)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Monto a pagar (ARS)
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="amount"
                    required
                    value={formData.amount}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    placeholder="0.00"
                    min="0"
                  />
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  Tarifa por hora sugerida: ${provider.tarifa_hora}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Descripción del trabajo
                </label>
                <div className="mt-1">
                  <textarea
                    name="description"
                    rows="4"
                    required
                    value={formData.description}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    placeholder="Describe el trabajo que necesitas..."
                  />
                </div>
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                  className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  He leído y acepto los{" "}
                  <a href="/terminos" className="text-orange-500 hover:text-orange-600">
                    términos y condiciones
                  </a>
                </label>
              </div>

              <Button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600"
                disabled={loading}
              >
                {loading ? "Procesando..." : "Proceder al pago"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
