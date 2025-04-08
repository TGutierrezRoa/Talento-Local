
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ProfessionalModal from "@/components/ProfessionalModal";

const serviceCategories = {
  electricistas: {
    title: "Electricistas",
    icon: "⚡",
    description: "Encuentra electricistas certificados para todo tipo de instalaciones y reparaciones eléctricas."
  },
  disenadores: {
    title: "Diseñadores",
    icon: "🎨",
    description: "Conecta con diseñadores profesionales para dar vida a tus proyectos creativos."
  },
  abogados: {
    title: "Abogados",
    icon: "⚖️",
    description: "Consulta con abogados expertos en diferentes áreas del derecho."
  },
  plomeros: {
    title: "Plomeros",
    icon: "🔧",
    description: "Soluciona problemas de plomería con profesionales experimentados."
  },
  carpinteros: {
    title: "Carpinteros",
    icon: "🪚",
    description: "Encuentra carpinteros calificados para tus proyectos de madera y muebles."
  },
  jardineros: {
    title: "Jardineros",
    icon: "🌿",
    description: "Mantén tu jardín hermoso con la ayuda de jardineros profesionales."
  }
};

const mockProfessionals = [
  {
    id: 1,
    name: "Juan Pérez",
    rating: 4.8,
    reviews: 127,
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    description: "Más de 10 años de experiencia en el sector.",
    phone: "+1234567890"
  },
  {
    id: 2,
    name: "María García",
    rating: 4.9,
    reviews: 89,
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    description: "Especialista certificada con atención al detalle.",
    phone: "+1234567891"
  },
  {
    id: 3,
    name: "Carlos Rodríguez",
    rating: 4.7,
    reviews: 156,
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    description: "Servicio profesional y puntual garantizado.",
    phone: "+1234567892"
  }
];

const ServiceList = () => {
  const { category } = useParams();
  const [selectedProfessional, setSelectedProfessional] = useState(null);
  const serviceInfo = serviceCategories[category];

  if (!serviceInfo) {
    return <div>Categoría no encontrada</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado de la categoría */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">{serviceInfo.icon}</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{serviceInfo.title}</h1>
          <p className="text-xl text-gray-600">{serviceInfo.description}</p>
        </div>

        {/* Lista de profesionales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockProfessionals.map((professional, index) => (
            <motion.div
              key={professional.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={professional.image}
                alt={professional.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {professional.name}
                </h3>
                <div className="flex items-center mb-2">
                  <div className="text-yellow-400 mr-1">★</div>
                  <span className="text-gray-700">{professional.rating}</span>
                  <span className="text-gray-500 ml-1">({professional.reviews} reseñas)</span>
                </div>
                <p className="text-gray-600 mb-4">{professional.description}</p>
                <button
                  onClick={() => setSelectedProfessional(professional)}
                  className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors"
                >
                  Contactar
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {selectedProfessional && (
        <ProfessionalModal
          professional={selectedProfessional}
          onClose={() => setSelectedProfessional(null)}
        />
      )}
    </div>
  );
};

export default ServiceList;
