// src/components/Services-modal.jsx
import React, { useEffect, useState } from 'react';
import PiscinaImg from '../assets/img/foto_piscina_casa.jpg';

const ServicesModal = ({ service, onClose }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Disparar animación de entrada
    setShow(true);

    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    setShow(false);
    setTimeout(onClose, 200); // esperar a que termine la animación
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Contenido modal */}
      <div
        className={`relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden transform transition-all duration-200 ${
          show
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 translate-y-4'
        }`}
      >
        {/* Botón cerrar */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-10 h-8 w-8 rounded-full bg-white/80 hover:bg-white shadow-md flex items-center justify-center text-gray-600 hover:text-gray-900 transition"
          aria-label="Cerrar"
        >
          ✕
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Imagen */}
          <div className="md:w-1/2">
            <img
              src={PiscinaImg}
              alt="Servicio de mantenimiento de piscinas"
              className="w-full h-48 md:h-full object-cover"
            />
          </div>

          {/* Texto */}
          <div className="md:w-1/2 p-6 md:p-8 flex flex-col gap-4">
            <div>
              <h3 className="text-2xl font-bold text-sky-800 mb-1">
                {service.title}
              </h3>
              <p className="text-sm uppercase tracking-wide text-sky-500 font-semibold">
                Detalle del servicio
              </p>
            </div>

            <p className="text-gray-700 leading-relaxed">
              {service.description}
            </p>

            <p className="text-gray-600 text-sm leading-relaxed">
              En este servicio nos encargamos de cada detalle para que disfrutes
              de una piscina limpia, segura y en óptimas condiciones. Ajustamos
              parámetros, realizamos limpieza profunda y te orientamos en el
              cuidado periódico para prolongar la vida útil de tu piscina y su
              equipamiento.
            </p>

            <div className="mt-auto flex flex-wrap gap-3">
              <button
                onClick={handleClose}
                className="px-5 py-2 rounded-full border border-sky-500 text-sky-600 font-semibold hover:bg-sky-50 transition"
              >
                Cerrar
              </button>
              <a
                href="#contact"
                onClick={handleClose}
                className="px-5 py-2 rounded-full bg-sky-500 text-white font-semibold hover:bg-sky-600 transition"
              >
                Solicitar este servicio
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesModal;
