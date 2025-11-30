import React from 'react';
import { CONTACT_INFO } from '../constants';
import PiscinaImg from "../assets/img/foto_piscina_casa.jpg";

const Hero = () => {
  const whatsappLink = `https://wa.me/${CONTACT_INFO.phone.replace(/\D/g, '')}?text=${encodeURIComponent(
    'Hola, me gustaría solicitar un presupuesto para el mantenimiento de mi piscina.'
  )}`;

  return (
    <section
      id="home"
      className="relative min-h-[70vh] text-white bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${PiscinaImg})`,
      }}
    >
      {/* Capa oscura encima de la imagen (un poco más suave) */}
      <div className="absolute inset-0 bg-gray-800/50"></div>

      {/* Contenido */}
      <div className="relative z-10 container mx-auto px-6 text-center pt-40 pb-32 md:pt-52 md:pb-40">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4 animate-fade-in-down">
          Expertos en mantenimiento y limpieza de Piscinas y limpieza de jardines.
        </h1>

        <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-3xl mx-auto animate-fade-in-up">
          Brindamos servicios confiables y personalizados para que disfrutes de tu piscina sin preocupaciones y tu jardín limpio todo el año.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="#contact"
            className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-transform duration-300 transform hover:scale-105 shadow-lg"
          >
            Solicitar Presupuesto
          </a>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-transform duration-300 transform hover:scale-105 shadow-lg"
          >
            Contáctanos por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
