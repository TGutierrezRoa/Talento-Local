
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const services = [
  { title: "Electricistas", icon: "⚡", path: "electricistas" },
  { title: "Diseñadores", icon: "🎨", path: "disenadores" },
  { title: "Abogados", icon: "⚖️", path: "abogados" },
  { title: "Plomeros", icon: "🔧", path: "plomeros" },
  { title: "Carpinteros", icon: "🪚", path: "carpinteros" },
  { title: "Jardineros", icon: "🌿", path: "jardineros" }
];

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Carousel */}
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 5000 }}
        pagination={{ clickable: true }}
        className="h-[400px] bg-gray-200"
      >
        <SwiperSlide>
          <div className="flex items-center justify-center h-full bg-gradient-to-r from-orange-500 to-orange-600">
            <div className="text-center text-white">
              <h1 className="text-4xl font-bold mb-4">Encuentra al profesional ideal</h1>
              <p className="text-xl">Miles de expertos listos para ayudarte</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex items-center justify-center h-full bg-gradient-to-r from-blue-500 to-blue-600">
            <div className="text-center text-white">
              <h1 className="text-4xl font-bold mb-4">Paga en cuotas</h1>
              <p className="text-xl">Financia tus proyectos de manera flexible</p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Servicios Populares</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {services.map((service, index) => (
            <Link key={service.title} to={`/servicios/${service.path}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-lg font-medium text-gray-900">{service.title}</h3>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
