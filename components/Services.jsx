// src/components/Services.jsx
import React, { useState } from "react";
import { SERVICES } from "../constants";
import ServicesModal from "./Services-modal";
import waterTexture from "../assets/img/fondo-tarjeta-servicios.png";

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <section id="services" className="py-20 bg-white">
      <style>{`
        .svc-card{
          position:relative;
          overflow:hidden;
          isolation:isolate;
        }

        /* ======= Agua (marea) ======= */
        .svc-waterWrap{
          position:absolute;
          inset:0;
          z-index:0;
          pointer-events:none;
          opacity:0;
          transition: opacity 240ms ease;
        }

        /* El agua es un bloque grande que SUBE suave */
        .svc-water{
          position:absolute;
          left:0; right:0;
          bottom:-22%;
          height:150%;
          transform: translateY(100%);
          transition: transform 1600ms cubic-bezier(.20,.95,.25,1); /* marea suave */
          background-image:url(${waterTexture});
          background-size: 160% 160%;
          background-repeat: repeat;
          background-position: 0% 0%;
          filter: saturate(1.06) contrast(1.03);
        }

        /* Movimiento sutil (tipo video) */
        @keyframes waterDrift{
          0%   { background-position: 0% 0%; }
          100% { background-position: 85% 55%; }
        }

        /* Hover: aparece y sube MÁS */
        .svc-card:hover .svc-waterWrap{ opacity: 1; }
        .svc-card:hover .svc-water{
          transform: translateY(18%); /* sube más (ajusta si quieres más aún: 12% o 8%) */
          animation: waterDrift 9s linear infinite;
        }

        /* ======= Onda superior (recorte blanco) =======
           Esto crea una "línea de marea" ondulada (como tu foto).
           Es un recorte blanco que tapa el borde recto del agua.
        */
        .svc-waveCut{
          position:absolute;
          left:0; right:0;
          top:-1px;
          height:70px;
          background: #ffffff; /* color de la tarjeta */
          /* Mask con onda (SVG) */
          -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='70' viewBox='0 0 240 70'%3E%3Cpath d='M0 0H240V40C220 30 200 50 180 40C160 30 140 50 120 40C100 30 80 50 60 40C40 30 20 50 0 40Z' fill='black'/%3E%3C/svg%3E");
          mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='70' viewBox='0 0 240 70'%3E%3Cpath d='M0 0H240V40C220 30 200 50 180 40C160 30 140 50 120 40C100 30 80 50 60 40C40 30 20 50 0 40Z' fill='black'/%3E%3C/svg%3E");
          -webkit-mask-repeat: repeat-x;
          mask-repeat: repeat-x;
          -webkit-mask-size: 240px 70px;
          mask-size: 240px 70px;
          opacity: 0; /* solo en hover */
          transition: opacity 220ms ease;
        }

        /* espuma: borde blanco suave sobre la línea de ola */
        .svc-foam{
          position:absolute;
          left:-8%;
          width:116%;
          height:38px;
          top:30px; /* cerca de la ola */
          background: linear-gradient(
            to bottom,
            rgba(255,255,255,.92),
            rgba(255,255,255,.55),
            rgba(255,255,255,0)
          );
          filter: blur(0.2px);
          opacity: 0;
          transition: opacity 220ms ease;
          transform: translateX(0);
          animation: foamMove 3.6s ease-in-out infinite;
        }

        @keyframes foamMove{
          0%{ transform: translateX(-1.5%); }
          50%{ transform: translateX(1.5%); }
          100%{ transform: translateX(-1.5%); }
        }

        .svc-card:hover .svc-waveCut,
        .svc-card:hover .svc-foam{
          opacity: 1;
        }

        /* ======= Burbujas dentro del agua (más "marea") ======= */
        .svc-bubble{
          position:absolute;
          bottom:-18px;
          border-radius:9999px;
          background:rgba(255,255,255,.72);
          box-shadow:0 0 0 1px rgba(255,255,255,.20);
          opacity:0;
          animation: bubbleUp 3.2s linear infinite;
        }

        @keyframes bubbleUp{
          0%   { transform: translateY(0) scale(.55); opacity:0; }
          12%  { opacity:.85; }
          100% { transform: translateY(-190px) scale(1.05); opacity:0; }
        }

        /* ======= Texto blanco cuando hay agua ======= */
        .svc-content{ position:relative; z-index:1; }

        .svc-card:hover .svc-content h3{
          color: rgba(255,255,255,.96);
        }
        .svc-card:hover .svc-content p{
          color: rgba(255,255,255,.86);
        }

        /* Icono legible sobre agua (sin romper diseño) */
        .svc-iconWrap{
          transition: background-color 220ms ease, border 220ms ease, color 220ms ease;
        }
        .svc-card:hover .svc-iconWrap{
          background: rgba(255,255,255,.18);
          border: 1px solid rgba(255,255,255,.25);
        }
        .svc-card:hover .svc-iconWrap svg{
          color: rgba(255,255,255,.92);
        }

        /* Reduce motion */
        @media (prefers-reduced-motion: reduce){
          .svc-card:hover .svc-water{ animation:none; }
          .svc-foam{ animation:none; }
          .svc-bubble{ animation:none; opacity:0!important; }
          .svc-water{ transition: transform 1ms linear; }
        }
      `}</style>

      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-sky-800">
            Nuestros Servicios
          </h2>
          <p className="text-lg text-gray-600 mt-2">
            Soluciones integrales para una piscina y un jardín impecable.
            <br />
            Presiona las tarjetas para ver el detalle.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((service, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSelectedService(service)}
              className="
                svc-card bg-white p-8 rounded-xl shadow-lg
                hover:shadow-2xl transition-all duration-300
                border border-gray-100 text-left cursor-pointer
              "
            >
              {/* Agua (solo visible en hover) */}
              <div className="svc-waterWrap">
                <div className="svc-water">
                  {/* burbujas (más y estables) */}
                  {[
                    { l: "8%", s: 6, d: "0.0s" },
                    { l: "14%", s: 9, d: "0.7s" },
                    { l: "20%", s: 5, d: "1.4s" },
                    { l: "26%", s: 8, d: "0.3s" },
                    { l: "32%", s: 6, d: "1.1s" },
                    { l: "38%", s: 10, d: "0.8s" },
                    { l: "44%", s: 5, d: "1.8s" },
                    { l: "50%", s: 8, d: "0.5s" },
                    { l: "56%", s: 6, d: "1.6s" },
                    { l: "62%", s: 9, d: "0.9s" },
                    { l: "68%", s: 5, d: "2.0s" },
                    { l: "74%", s: 8, d: "0.4s" },
                    { l: "80%", s: 6, d: "1.3s" },
                    { l: "86%", s: 10, d: "0.6s" },
                    { l: "92%", s: 5, d: "1.9s" },
                  ].map((b, i) => (
                    <span
                      key={i}
                      className="svc-bubble"
                      style={{
                        left: b.l,
                        width: `${b.s}px`,
                        height: `${b.s}px`,
                        animationDelay: b.d,
                        bottom: `-${Math.round(b.s * 2)}px`,
                      }}
                    />
                  ))}
                </div>

                {/* Recorte ondulado + espuma */}
                <div className="svc-waveCut" />
                <div className="svc-foam" />
              </div>

              {/* Contenido ORIGINAL (sin cambios) */}
              <div className="svc-content">
                <div className="svc-iconWrap flex items-center justify-center h-16 w-16 rounded-full bg-sky-100 text-sky-600 mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 line-clamp-3 transition-colors">
                  {service.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedService && (
        <ServicesModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </section>
  );
};

export default Services;
