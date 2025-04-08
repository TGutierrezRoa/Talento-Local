
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Register = () => {
  const { toast } = useToast();
  const [userType, setUserType] = useState("usuario");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    // Campos específicos para prestadores
    dni: "",
    matricula: "",
    titulo: "",
    especialidad: "",
    experiencia: "",
    cbu: "",
    banco: "",
    direccion: "",
    ciudad: "",
    provincia: "",
    codigoPostal: "",
    telefono: "",
    sitioWeb: "",
    linkedin: "",
    tarifaHora: "",
    disponibilidad: "",
    service: "",
    description: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Registro exitoso",
      description: `Tu cuenta de ${userType} ha sido creada correctamente`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Crea tu cuenta
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="flex justify-center space-x-4 mb-6">
            <Button
              type="button"
              variant={userType === "usuario" ? "default" : "outline"}
              className={`flex-1 ${userType === "usuario" ? "bg-orange-500" : ""}`}
              onClick={() => setUserType("usuario")}
            >
              Usuario
            </Button>
            <Button
              type="button"
              variant={userType === "prestador" ? "default" : "outline"}
              className={`flex-1 ${userType === "prestador" ? "bg-orange-500" : ""}`}
              onClick={() => setUserType("prestador")}
            >
              Prestador
            </Button>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Campos comunes */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nombre completo
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Correo electrónico
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Campos específicos para prestadores */}
            {userType === "prestador" && (
              <>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="dni" className="block text-sm font-medium text-gray-700">
                      DNI/CUIT
                    </label>
                    <div className="mt-1">
                      <input
                        id="dni"
                        name="dni"
                        type="text"
                        required
                        value={formData.dni}
                        onChange={handleChange}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="matricula" className="block text-sm font-medium text-gray-700">
                      Número de Matrícula (si aplica)
                    </label>
                    <div className="mt-1">
                      <input
                        id="matricula"
                        name="matricula"
                        type="text"
                        value={formData.matricula}
                        onChange={handleChange}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="titulo" className="block text-sm font-medium text-gray-700">
                      Título Profesional
                    </label>
                    <div className="mt-1">
                      <input
                        id="titulo"
                        name="titulo"
                        type="text"
                        required
                        value={formData.titulo}
                        onChange={handleChange}
                        placeholder="Ej: Electricista Matriculado, Diseñador UX/UI"
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-700">
                      Categoría de Servicio
                    </label>
                    <div className="mt-1">
                      <select
                        id="service"
                        name="service"
                        required
                        value={formData.service}
                        onChange={handleChange}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                      >
                        <option value="">Selecciona una categoría</option>
                        <option value="electricista">Electricista</option>
                        <option value="disenador">Diseñador</option>
                        <option value="abogado">Abogado</option>
                        <option value="plomero">Plomero</option>
                        <option value="carpintero">Carpintero</option>
                        <option value="jardinero">Jardinero</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="especialidad" className="block text-sm font-medium text-gray-700">
                      Especialidad
                    </label>
                    <div className="mt-1">
                      <input
                        id="especialidad"
                        name="especialidad"
                        type="text"
                        required
                        value={formData.especialidad}
                        onChange={handleChange}
                        placeholder="Ej: Instalaciones Industriales, Diseño Web"
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="experiencia" className="block text-sm font-medium text-gray-700">
                      Años de Experiencia
                    </label>
                    <div className="mt-1">
                      <input
                        id="experiencia"
                        name="experiencia"
                        type="number"
                        required
                        value={formData.experiencia}
                        onChange={handleChange}
                        min="0"
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Descripción Profesional
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="description"
                        name="description"
                        rows="3"
                        required
                        value={formData.description}
                        onChange={handleChange}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                        placeholder="Describe tu experiencia, especialidades y servicios que ofreces..."
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 mt-6">
                    <h3 className="text-lg font-medium text-gray-900">Información Bancaria</h3>
                    <div>
                      <label htmlFor="cbu" className="block text-sm font-medium text-gray-700">
                        CBU/Alias
                      </label>
                      <div className="mt-1">
                        <input
                          id="cbu"
                          name="cbu"
                          type="text"
                          required
                          value={formData.cbu}
                          onChange={handleChange}
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="banco" className="block text-sm font-medium text-gray-700">
                        Banco
                      </label>
                      <div className="mt-1">
                        <input
                          id="banco"
                          name="banco"
                          type="text"
                          required
                          value={formData.banco}
                          onChange={handleChange}
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 mt-6">
                    <h3 className="text-lg font-medium text-gray-900">Información de Contacto</h3>
                    <div>
                      <label htmlFor="direccion" className="block text-sm font-medium text-gray-700">
                        Dirección
                      </label>
                      <div className="mt-1">
                        <input
                          id="direccion"
                          name="direccion"
                          type="text"
                          required
                          value={formData.direccion}
                          onChange={handleChange}
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="ciudad" className="block text-sm font-medium text-gray-700">
                          Ciudad
                        </label>
                        <div className="mt-1">
                          <input
                            id="ciudad"
                            name="ciudad"
                            type="text"
                            required
                            value={formData.ciudad}
                            onChange={handleChange}
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="provincia" className="block text-sm font-medium text-gray-700">
                          Provincia
                        </label>
                        <div className="mt-1">
                          <input
                            id="provincia"
                            name="provincia"
                            type="text"
                            required
                            value={formData.provincia}
                            onChange={handleChange}
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="codigoPostal" className="block text-sm font-medium text-gray-700">
                        Código Postal
                      </label>
                      <div className="mt-1">
                        <input
                          id="codigoPostal"
                          name="codigoPostal"
                          type="text"
                          required
                          value={formData.codigoPostal}
                          onChange={handleChange}
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">
                        Teléfono
                      </label>
                      <div className="mt-1">
                        <input
                          id="telefono"
                          name="telefono"
                          type="tel"
                          required
                          value={formData.telefono}
                          onChange={handleChange}
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 mt-6">
                    <h3 className="text-lg font-medium text-gray-900">Información Profesional Adicional</h3>
                    <div>
                      <label htmlFor="sitioWeb" className="block text-sm font-medium text-gray-700">
                        Sitio Web (opcional)
                      </label>
                      <div className="mt-1">
                        <input
                          id="sitioWeb"
                          name="sitioWeb"
                          type="url"
                          value={formData.sitioWeb}
                          onChange={handleChange}
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">
                        LinkedIn (opcional)
                      </label>
                      <div className="mt-1">
                        <input
                          id="linkedin"
                          name="linkedin"
                          type="url"
                          value={formData.linkedin}
                          onChange={handleChange}
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="tarifaHora" className="block text-sm font-medium text-gray-700">
                        Tarifa por Hora (ARS)
                      </label>
                      <div className="mt-1">
                        <input
                          id="tarifaHora"
                          name="tarifaHora"
                          type="number"
                          required
                          value={formData.tarifaHora}
                          onChange={handleChange}
                          min="0"
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="disponibilidad" className="block text-sm font-medium text-gray-700">
                        Disponibilidad
                      </label>
                      <div className="mt-1">
                        <select
                          id="disponibilidad"
                          name="disponibilidad"
                          required
                          value={formData.disponibilidad}
                          onChange={handleChange}
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
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
                </div>
              </>
            )}

            <div>
              <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">
                Registrarse
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  ¿Ya tienes una cuenta?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link to="/login">
                <Button variant="outline" className="w-full">
                  Iniciar sesión
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
