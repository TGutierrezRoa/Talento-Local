
import React from "react";
import { Phone, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProfessionalModal = ({ professional, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
          
          <div className="p-6">
            <div className="flex items-start space-x-6">
              <img
                src={professional.image}
                alt={professional.name}
                className="w-32 h-32 rounded-full object-cover"
              />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{professional.name}</h2>
                <div className="flex items-center mt-2">
                  <div className="text-yellow-400 mr-1">★</div>
                  <span className="text-gray-700">{professional.rating}</span>
                  <span className="text-gray-500 ml-1">({professional.reviews} reseñas)</span>
                </div>
                <p className="mt-2 text-gray-600">{professional.description}</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">Experiencia Profesional</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <ul className="space-y-2">
                  <li>• Más de 10 años de experiencia en el sector</li>
                  <li>• Certificaciones profesionales relevantes</li>
                  <li>• Especialización en proyectos comerciales y residenciales</li>
                  <li>• Atención personalizada y compromiso con la calidad</li>
                </ul>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">Servicios Ofrecidos</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium">Servicio Básico</h4>
                  <p className="text-gray-600 text-sm mt-1">Diagnóstico y reparaciones simples</p>
                  <p className="text-orange-600 font-semibold mt-2">Desde $50</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium">Servicio Completo</h4>
                  <p className="text-gray-600 text-sm mt-1">Instalaciones y proyectos completos</p>
                  <p className="text-orange-600 font-semibold mt-2">Desde $150</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex space-x-4">
              <Button
                className="flex-1 bg-green-500 hover:bg-green-600"
                onClick={() => window.location.href = `tel:${professional.phone}`}
              >
                <Phone className="w-4 h-4 mr-2" />
                Llamar
              </Button>
              <Button
                className="flex-1 bg-orange-500 hover:bg-orange-600"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Contratar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalModal;
