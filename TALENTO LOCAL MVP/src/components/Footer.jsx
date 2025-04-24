
import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Columna 1 - Sobre Nosotros */}
          <div>
            <h3 className="text-xl font-bold mb-4">Talento Local</h3>
            <p className="text-gray-400 mb-4">
              Un producto de Talneo. Conectamos profesionales calificados con personas que necesitan servicios de calidad.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-orange-500">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Columna 2 - Servicios */}
          <div>
            <h3 className="text-xl font-bold mb-4">Servicios</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/servicios/electricistas" className="text-gray-400 hover:text-orange-500">
                  Electricistas
                </Link>
              </li>
              <li>
                <Link to="/servicios/disenadores" className="text-gray-400 hover:text-orange-500">
                  Diseñadores
                </Link>
              </li>
              <li>
                <Link to="/servicios/abogados" className="text-gray-400 hover:text-orange-500">
                  Abogados
                </Link>
              </li>
              <li>
                <Link to="/servicios/plomeros" className="text-gray-400 hover:text-orange-500">
                  Plomeros
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3 - Enlaces Útiles */}
          <div>
            <h3 className="text-xl font-bold mb-4">Enlaces Útiles</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/dashboard" className="text-gray-400 hover:text-orange-500">
                  Portal de Prestadores
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-orange-500">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link to="/terminos" className="text-gray-400 hover:text-orange-500">
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link to="/privacidad" className="text-gray-400 hover:text-orange-500">
                  Política de Privacidad
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 4 - Contacto */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contacto</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-400">
                <MapPin className="h-5 w-5 mr-2" />
                Buenos Aires, Argentina
              </li>
              <li className="flex items-center text-gray-400">
                <Phone className="h-5 w-5 mr-2" />
                +54 11 1234-5678
              </li>
              <li className="flex items-center text-gray-400">
                <Mail className="h-5 w-5 mr-2" />
                contacto@talentolocal.com
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} Talento Local - Un producto de Talneo. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
