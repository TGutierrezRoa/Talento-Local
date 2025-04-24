
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import ImageUpload from "@/components/ImageUpload";

const Settings = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(user?.provider?.profile_image || null);
  const [formData, setFormData] = useState({
    email: user?.email || "",
    name: user?.name || "",
    // Campos específicos para prestadores
    dni: user?.provider?.dni || "",
    matricula: user?.provider?.matricula || "",
    titulo: user?.provider?.titulo || "",
    especialidad: user?.provider?.especialidad || "",
    experiencia: user?.provider?.experiencia || "",
    cbu: user?.provider?.cbu || "",
    banco: user?.provider?.banco || "",
    direccion: user?.provider?.direccion || "",
    ciudad: user?.provider?.ciudad || "",
    provincia: user?.provider?.provincia || "",
    codigoPostal: user?.provider?.codigo_postal || "",
    telefono: user?.provider?.telefono || "",
    sitioWeb: user?.provider?.sitio_web || "",
    linkedin: user?.provider?.linkedin || "",
    tarifaHora: user?.provider?.tarifa_hora || "",
    disponibilidad: user?.provider?.disponibilidad || "",
    service: user?.provider?.service || "",
    description: user?.provider?.description || ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Actualizar datos básicos del usuario
      const { error: userError } = await supabase
        .from('users')
        .update({
          name: formData.name,
          email: formData.email
        })
        .eq('id', user.id);

      if (userError) throw userError;

      // Si es prestador, actualizar datos adicionales
      if (user.user_type === 'prestador') {
        const providerData = {
          dni: formData.dni,
          matricula: formData.matricula,
          titulo: formData.titulo,
          especialidad: formData.especialidad,
          experiencia: parseInt(formData.experiencia),
          cbu: formData.cbu,
          banco: formData.banco,
          direccion: formData.direccion,
          ciudad: formData.ciudad,
          provincia: formData.provincia,
          codigo_postal: formData.codigoPostal,
          telefono: formData.telefono,
          sitio_web: formData.sitioWeb,
          linkedin: formData.linkedin,
          tarifa_hora: parseFloat(formData.tarifaHora),
          disponibilidad: formData.disponibilidad,
          service: formData.service,
          description: formData.description,
          profile_image: profileImage
        };

        const { error: providerError } = await supabase
          .from('provider_profiles')
          .update(providerData)
          .eq('user_id', user.id);

        if (providerError) throw providerError;
      }

      toast({
        title: "¡Actualización exitosa!",
        description: "Tus datos han sido actualizados correctamente"
      });

    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron actualizar los datos",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Configuración de la cuenta
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Datos básicos */}
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">Información básica</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    required
                  />
                </div>
              </div>

              {/* Campos específicos para prestadores */}
              {user.user_type === 'prestador' && (
                <>
                  <div className="space-y-6 pt-6 border-t">
                    <h3 className="text-lg font-medium text-gray-900">Información profesional</h3>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Foto de perfil
                      </label>
                      <ImageUpload 
                        onImageUpload={setProfileImage}
                        currentImage={profileImage}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          DNI/CUIT
                        </label>
                        <input
                          type="text"
                          name="dni"
                          value={formData.dni}
                          onChange={handleChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Matrícula
                        </label>
                        <input
                          type="text"
                          name="matricula"
                          value={formData.matricula}
                          onChange={handleChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Título Profesional
                      </label>
                      <input
                        type="text"
                        name="titulo"
                        value={formData.titulo}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Especialidad
                      </label>
                      <input
                        type="text"
                        name="especialidad"
                        value={formData.especialidad}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Años de Experiencia
                      </label>
                      <input
                        type="number"
                        name="experiencia"
                        value={formData.experiencia}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Descripción Profesional
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-6 pt-6 border-t">
                    <h3 className="text-lg font-medium text-gray-900">Información Bancaria</h3>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          CBU/Alias
                        </label>
                        <input
                          type="text"
                          name="cbu"
                          value={formData.cbu}
                          onChange={handleChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Banco
                        </label>
                        <input
                          type="text"
                          name="banco"
                          value={formData.banco}
                          onChange={handleChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6 pt-6 border-t">
                    <h3 className="text-lg font-medium text-gray-900">Información de Contacto</h3>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Dirección
                      </label>
                      <input
                        type="text"
                        name="direccion"
                        value={formData.direccion}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Ciudad
                        </label>
                        <input
                          type="text"
                          name="ciudad"
                          value={formData.ciudad}
                          onChange={handleChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Provincia
                        </label>
                        <input
                          type="text"
                          name="provincia"
                          value={formData.provincia}
                          onChange={handleChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Código Postal
                        </label>
                        <input
                          type="text"
                          name="codigoPostal"
                          value={formData.codigoPostal}
                          onChange={handleChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Teléfono
                        </label>
                        <input
                          type="tel"
                          name="telefono"
                          value={formData.telefono}
                          onChange={handleChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6 pt-6 border-t">
                    <h3 className="text-lg font-medium text-gray-900">Información Profesional Adicional</h3>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Sitio Web
                        </label>
                        <input
                          type="url"
                          name="sitioWeb"
                          value={formData.sitioWeb}
                          onChange={handleChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          LinkedIn
                        </label>
                        <input
                          type="url"
                          name="linkedin"
                          value={formData.linkedin}
                          onChange={handleChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Tarifa por Hora (ARS)
                        </label>
                        <input
                          type="number"
                          name="tarifaHora"
                          value={formData.tarifaHora}
                          onChange={handleChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Disponibilidad
                        </label>
                        <select
                          name="disponibilidad"
                          value={formData.disponibilidad}
                          onChange={handleChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                          required
                        >
                          <option value="">Selecciona tu disponibilidad</option>
                          <option value="fulltime">Tiempo completo</option>
                          <option value="parttime">Medio tiempo</option>
                          <option value="flexible">Horario flexible</option>
                          <option value="fines">Fines de semana</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="pt-6 border-t">
                <Button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600"
                  disabled={loading}
                >
                  {loading ? "Guardando cambios..." : "Guardar cambios"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
