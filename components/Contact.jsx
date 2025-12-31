import React, { useEffect, useMemo, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { CONTACT_INFO } from "../constants";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [selectedService, setSelectedService] = useState("");
  const [sending, setSending] = useState(false);

  // UI alerts
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // 🔹 Control para saber si el mensaje fue autogenerado
  const [isAutoMessage, setIsAutoMessage] = useState(true);

  // Para evitar re-aplicar el mismo servicio 100 veces por hashchange
  const lastAppliedServiceRef = useRef("");

  // ENV (con fallback por si cambiaste nombres antes)
  const EMAILJS_SERVICE_ID =
    import.meta.env.VITE_EMAILJS_SERVICE_ID || import.meta.env.VITE_EMAILJS_SERVICE;

  const EMAILJS_TEMPLATE_CONTACT =
    import.meta.env.VITE_EMAILJS_TEMPLATE_CONTACT ||
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID ||
    import.meta.env.VITE_EMAILJS_TEMPLATE;

  const EMAILJS_TEMPLATE_AUTOREPLY =
    import.meta.env.VITE_EMAILJS_TEMPLATE_AUTOREPLY || import.meta.env.VITE_EMAILJS_TEMPLATE_AUTO;

  const EMAILJS_PUBLIC_KEY =
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY || import.meta.env.VITE_EMAILJS_KEY;

  const envOk = useMemo(() => {
    return Boolean(
      EMAILJS_SERVICE_ID &&
        EMAILJS_TEMPLATE_CONTACT &&
        EMAILJS_TEMPLATE_AUTOREPLY &&
        EMAILJS_PUBLIC_KEY
    );
  }, [EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_CONTACT, EMAILJS_TEMPLATE_AUTOREPLY, EMAILJS_PUBLIC_KEY]);

  const buildAutoMessage = (service) =>
    `Hola, me interesa el servicio "${service}".\n¿Me podrían contactar para cotizar y coordinar?`;

  const getNowString = () => {
    try {
      return new Date().toLocaleString("es-CL", {
        timeZone: "America/Santiago",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return new Date().toLocaleString();
    }
  };

  const clearHashServiceParam = () => {
    // Limpia SOLO el query del hash para que no quede pegado al recargar
    // Deja el ancla #contact para que siga funcionando el scroll
    try {
      if ((window.location.hash || "").includes("?")) {
        window.history.replaceState(null, "", "#contact");
      }
    } catch (e) {
      // si el navegador bloquea replaceState en algo raro, no rompemos nada
    }
  };

  const applyService = (serviceName, { cleanHash = true } = {}) => {
    if (!serviceName) return;

    const service = String(serviceName).trim();
    if (!service) return;

    // evita re-aplicar el mismo servicio en loop
    if (lastAppliedServiceRef.current === service) {
      if (cleanHash) clearHashServiceParam();
      return;
    }
    lastAppliedServiceRef.current = service;

    setSelectedService(service);

    setFormData((prev) => {
      const prevMsg = (prev.message || "").trim();

      // Si el usuario NO ha escrito manualmente (o el mensaje está vacío),
      // sí lo actualizamos al cambiar el servicio
      const shouldOverwrite =
        isAutoMessage || prevMsg.length === 0 || prevMsg === buildAutoMessage(selectedService);

      if (!shouldOverwrite) return prev;

      return {
        ...prev,
        message: buildAutoMessage(service),
      };
    });

    // al aplicar desde modal/hash, marcamos que el mensaje es “auto”
    setIsAutoMessage(true);

    if (cleanHash) clearHashServiceParam();
  };

  // 🔹 Prefill de servicio/mensaje cuando viene desde el modal (#contact?service=...)
  useEffect(() => {
    const readServiceFromHash = () => {
      try {
        const hash = window.location.hash || "";
        const [anchor, queryString] = hash.split("?");
        if (anchor !== "#contact") return;

        if (!queryString) return;

        const params = new URLSearchParams(queryString);
        const serviceName = params.get("service");
        if (!serviceName) return;

        const decoded = decodeURIComponent(serviceName);
        applyService(decoded, { cleanHash: true });
      } catch (error) {
        console.error("Error leyendo parámetro de servicio:", error);
      }
    };

    // 1) primera carga
    readServiceFromHash();

    // 2) cambios posteriores
    window.addEventListener("hashchange", readServiceFromHash);
    return () => window.removeEventListener("hashchange", readServiceFromHash);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAutoMessage, selectedService]);

  // WhatsApp
  const whatsappLink = `https://wa.me/${String(CONTACT_INFO.phone || "").replace(
    /\D/g,
    ""
  )}?text=${encodeURIComponent("Hola, me gustaría solicitar un presupuesto.")}`;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setErrorMsg("");
    setSuccessMsg("");

    // si el usuario edita el mensaje a mano, ya no lo sobre-escribimos
    if (name === "message") setIsAutoMessage(false);

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!envOk) {
      setErrorMsg(
        "Faltan variables de EmailJS. Revisa VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_CONTACT, VITE_EMAILJS_TEMPLATE_AUTOREPLY y VITE_EMAILJS_PUBLIC_KEY en tu .env y reinicia Vite."
      );
      return;
    }

    const payload = {
      name: formData.name?.trim(),
      email: formData.email?.trim(),
      to_email: formData.email?.trim(), // por si el template usa to_email
      phone: formData.phone?.trim(),
      message: formData.message?.trim(),
      service: selectedService || "No especificado",
      time: getNowString(),
      title: selectedService ? `Servicio: ${selectedService}` : "Formulario Web",
      source: "Clean Splash - Sitio Web",
      reply_to: formData.email?.trim(),
    };

    if (!payload.email) {
      setErrorMsg("Ingresa un correo válido para poder enviarte el auto-reply.");
      return;
    }

    setSending(true);

    try {
      // 1) Correo al cliente (Clean Splash)
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_CONTACT,
        payload,
        EMAILJS_PUBLIC_KEY
      );

      // 2) Auto-reply al usuario
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_AUTOREPLY,
        payload,
        EMAILJS_PUBLIC_KEY
      );

      setSuccessMsg("¡Mensaje enviado! Te responderemos a la brevedad.");
      setFormData({ name: "", email: "", phone: "", message: "" });

      // ✅ Limpieza completa para que no quede pegado
      setSelectedService("");
      setIsAutoMessage(true);
      lastAppliedServiceRef.current = "";
      clearHashServiceParam();
    } catch (err) {
      console.error("EmailJS error:", err);
      setErrorMsg(
        "No se pudo enviar el mensaje. Intenta nuevamente en unos minutos o contáctanos por WhatsApp."
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-sky-800">Cotiza con Nosotros</h2>
          <p className="text-lg text-gray-600 mt-2">
            Envíanos un mensaje o contáctanos directamente. ¡Estamos para ayudarte!
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* FORM */}
          <div className="lg:w-1/2 bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Formulario de Contacto Rápido</h3>

            {/* Alerts */}
            {!envOk && (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-4"
                role="alert"
              >
                <p className="font-bold">Ups…</p>
                <p>
                  Faltan variables de EmailJS. Revisa <b>VITE_EMAILJS_SERVICE_ID</b>,{" "}
                  <b>VITE_EMAILJS_TEMPLATE_CONTACT</b>, <b>VITE_EMAILJS_TEMPLATE_AUTOREPLY</b> y{" "}
                  <b>VITE_EMAILJS_PUBLIC_KEY</b> en tu <code>.env</code> y reinicia Vite.
                </p>
              </div>
            )}

            {errorMsg && (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-4"
                role="alert"
              >
                <p className="font-bold">Ups…</p>
                <p>{errorMsg}</p>
              </div>
            )}

            {successMsg && (
              <div
                className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded mb-4"
                role="alert"
              >
                <p className="font-bold">¡Listo!</p>
                <p>{successMsg}</p>
              </div>
            )}

            {/* Servicio seleccionado */}
            {selectedService && (
              <div className="mb-4 text-sm text-gray-700">
                Servicio seleccionado: <span className="font-semibold">{selectedService}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={!envOk || sending}
                className={`w-full text-white font-bold py-3 px-6 rounded-full text-lg transition-colors duration-300 ${
                  !envOk || sending ? "bg-sky-300 cursor-not-allowed" : "bg-sky-500 hover:bg-sky-600"
                }`}
              >
                {sending ? "Enviando..." : "Enviar Mensaje"}
              </button>
            </form>
          </div>

          {/* CTA WhatsApp */}
          <div className="lg:w-1/2 flex flex-col justify-center items-center text-center lg:text-left lg:items-start">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              ¿Prefieres un contacto más directo?
            </h3>
            <p className="text-gray-600 mb-6">
              Haz clic en el botón para enviarnos un WhatsApp o llámanos. ¡La forma más rápida de tener tu piscina lista!
            </p>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-transform duration-300 transform hover:scale-105 shadow-lg mb-6 inline-flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-3"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01s-.521.074-.792.372c-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
              Chatear por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
