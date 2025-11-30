import React, { useState, useEffect } from 'react';
import { CONTACT_INFO } from '../constants';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  // 🔹 Prefill del mensaje cuando viene desde el modal de servicios
  useEffect(() => {
    const applyServiceFromHash = () => {
      try {
        const hash = window.location.hash || '';
        const [, queryString] = hash.split('?');
        if (!queryString) return;

        const params = new URLSearchParams(queryString);
        const serviceName = params.get('service');

        if (serviceName) {
          setFormData(prev => ({
            ...prev,
            message: `Hola, me gustaría saber más sobre el servicio "${serviceName}". Quisiera información detallada, por favor.`,
          }));
        }
      } catch (error) {
        console.error('Error leyendo parámetro de servicio:', error);
      }
    };

    // Ejecutar al montar (por si ya viene con hash)
    applyServiceFromHash();

    // Escuchar cambios de hash (cuando clickeas “Solicitar este servicio”)
    window.addEventListener('hashchange', applyServiceFromHash);
    return () => window.removeEventListener('hashchange', applyServiceFromHash);
  }, []);

  const whatsappLink = `https://wa.me/${CONTACT_INFO.phone.replace(/\D/g, '')}?text=${encodeURIComponent('Hola, me gustaría solicitar un presupuesto.')}`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to a server or email service
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="py-20 bg-gray-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-sky-800">Cotiza con Nosotros</h2>
          <p className="text-lg text-gray-600 mt-2">Envíanos un mensaje o contáctanos directamente. ¡Estamos para ayudarte!</p>
        </div>
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/2 bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Formulario de Contacto Rápido</h3>
            {submitted ? (
              <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded" role="alert">
                <p className="font-bold">¡Mensaje enviado!</p>
                <p>Gracias por contactarnos. Te responderemos a la brevedad.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Nombre</label>
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
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Correo Electrónico</label>
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
                  <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Teléfono</label>
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
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Mensaje</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-6 rounded-full text-lg transition-colors duration-300"
                >
                  Enviar Mensaje
                </button>
              </form>
            )}
          </div>
          <div className="lg:w-1/2 flex flex-col justify-center items-center text-center lg:text-left lg:items-start">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">¿Prefieres un contacto más directo?</h3>
            <p className="text-gray-600 mb-6">Haz clic en el botón para enviarnos un WhatsApp o llámanos. ¡La forma más rápida de tener tu piscina lista!</p>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-transform duration-300 transform hover:scale-105 shadow-lg mb-6 inline-flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
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
