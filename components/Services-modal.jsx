// src/components/Services-modal.jsx
import React, { useEffect, useMemo, useState } from "react";
import PiscinaImg from "../assets/img/foto_piscina_casa.jpg";

const ServicesModal = ({ service, onClose }) => {
  const [show, setShow] = useState(false);
  const [bubbles, setBubbles] = useState(false);
  const [bubbleParticles, setBubbleParticles] = useState([]);

  // Genera burbujas alrededor del modal (perímetro) sin tapar el contenido
  const makeBubbles = (count = 60) => {
    const parts = [];
    for (let i = 0; i < count; i++) {
      // Elegimos una zona: left/right/top/bottom (más prob en laterales)
      const r = Math.random();
      let x, y;

      if (r < 0.34) {
        // LEFT band (fuera del modal)
        x = -6 - Math.random() * 10; // % (fuera)
        y = Math.random() * 100; // %
      } else if (r < 0.68) {
        // RIGHT band
        x = 106 + Math.random() * 10; // %
        y = Math.random() * 100; // %
      } else if (r < 0.84) {
        // TOP band
        x = Math.random() * 100; // %
        y = -6 - Math.random() * 10; // %
      } else {
        // BOTTOM band
        x = Math.random() * 100; // %
        y = 106 + Math.random() * 10; // %
      }

      const size = 5 + Math.random() * 12; // 5..17px
      const delay = Math.random() * 260; // 0..260ms
      const driftX = (Math.random() - 0.5) * 28; // -14..14px
      const driftY = -18 - Math.random() * 34; // -18..-52px

      parts.push({
        id: `${Date.now()}-${i}`,
        x,
        y,
        size,
        delay,
        driftX,
        driftY,
        opacity: 0.55 + Math.random() * 0.4,
      });
    }
    return parts;
  };

  useEffect(() => {
    // animación entrada modal
    setShow(true);

    // burbujas al abrir
    setBubbleParticles(makeBubbles(60)); // 🔥 más burbujas
    setBubbles(true);
    const t = setTimeout(() => setBubbles(false), 1100); // un poquito más para que se vea

    const handleEsc = (e) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", handleEsc);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    setShow(false);
    setTimeout(onClose, 200);
  };

  const handleGoToContact = () => {
    const serviceTitle = service?.title || "";
    const newHash = `#contact?service=${encodeURIComponent(serviceTitle)}`;
    window.location.hash = newHash;

    const section = document.getElementById("contact");
    if (section) {
      const offset = 80;
      const top = section.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }

    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* CSS local: burbujas alrededor del modal */}
      <style>{`
        @keyframes bubblePop {
          0%   { transform: translate(0, 12px) scale(0.6); opacity: 0; }
          15%  { opacity: 0.95; }
          100% { transform: translate(var(--dx), var(--dy)) scale(1.18); opacity: 0; }
        }
        .mbubble {
          position: absolute;
          border-radius: 9999px;
          background: rgba(14, 165, 233, 0.28);
          box-shadow:
            0 0 0 2px rgba(125, 211, 252, 0.22),
            0 8px 30px rgba(14,165,233,0.10);
          pointer-events: none;
          animation: bubblePop 1100ms ease-out forwards;
          filter: blur(0.05px);
        }
      `}</style>

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Contenedor relativo para burbujas + modal */}
      <div className="relative w-full max-w-3xl">
        {/* ✅ MUCHAS burbujas alrededor (solo al abrir) */}
        {bubbles &&
          bubbleParticles.map((b) => (
            <span
              key={b.id}
              className="mbubble"
              style={{
                left: `${b.x}%`,
                top: `${b.y}%`,
                width: `${b.size}px`,
                height: `${b.size}px`,
                opacity: b.opacity,
                animationDelay: `${b.delay}ms`,
                "--dx": `${b.driftX}px`,
                "--dy": `${b.driftY}px`,
              }}
            />
          ))}

        {/* Contenido modal (NO se modifica el diseño) */}
        <div
          className={`relative bg-white rounded-2xl shadow-2xl w-full overflow-hidden transform transition-all duration-200 ${
            show ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"
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

              <p className="text-gray-700 leading-relaxed">{service.description}</p>

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
                <button
                  type="button"
                  onClick={handleGoToContact}
                  className="px-5 py-2 rounded-full bg-sky-500 text-white font-semibold hover:bg-sky-600 transition"
                >
                  Solicitar este servicio
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesModal;
