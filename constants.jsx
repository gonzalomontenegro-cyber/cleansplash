
import React from 'react';

// SVG Icons for services and advantages
const WaterDropIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25c0 2.07 1.68 3.75 3.75 3.75s3.75-1.68 3.75-3.75c0-2.07-1.68-3.75-3.75-3.75S7.5 12.18 7.5 14.25z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a8.25 8.25 0 005.84-2.41l-1.42-1.42A6.75 6.75 0 0112 19.5a6.75 6.75 0 01-4.42-1.88L6.16 19.59A8.25 8.25 0 0012 21zM12 3a8.25 8.25 0 00-5.84 2.41l1.42 1.42A6.75 6.75 0 0112 4.5a6.75 6.75 0 014.42 1.88l1.42-1.42A8.25 8.25 0 0012 3z" />
  </svg>
);

const SparklesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M19 3v4M17 5h4M12 21v-4M10 19h4M5 12H1M23 12h-4M12 5V1M12 23v-4M19 12a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const WrenchScrewdriverIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const ShieldCheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.944a11.955 11.955 0 0118 0c.09-.712.18-1.423.27-2.136A11.955 11.955 0 0121.618 7.984z" />
  </svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const MapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
  </svg>
);

const RocketLaunchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

// Content
export const CONTACT_INFO = {
  phone: '+56 9 1234 5678',
  email: 'contacto@cleansplash.cl',
  facebook: 'https://facebook.com/cleansplash',
  instagram: 'https://instagram.com/cleansplash',
};

export const SERVICES = [
  {
    icon: <ShieldCheckIcon />,
    title: 'Balance Químico del Agua',
    description: 'Medición y ajuste de pH, Cloro y Ácido Cianúrico para un agua segura y cristalina.',
  },
  {
    icon: <SparklesIcon />,
    title: 'Limpieza Integral',
    description: 'Limpieza de fondo de la piscina y tratamiento especializado para aguas turbias o verdes.',
  },
  {
    icon: <WrenchScrewdriverIcon />,
    title: 'Revisión de Equipos',
    description: 'Inspección y mantenimiento de bombas y filtros para asegurar un funcionamiento óptimo y eficiente.',
  },
  {
    icon: <WaterDropIcon />,
    title: 'Eliminación de Microorganismos',
    description: 'Aplicamos tratamientos efectivos para eliminar y prevenir la aparición de algas y bacterias.',
  },
];

export const ADVANTAGES = [
  {
    icon: <MapIcon />,
    title: 'Cobertura Total',
    description: 'Llegamos a todas las comunas de la Región Metropolitana. Sin excepciones.',
  },
  {
    icon: <ClockIcon />,
    title: 'Puntualidad Garantizada',
    description: 'Respetamos tu tiempo. Nuestro equipo llega a la hora acordada, siempre.',
  },
  {
    icon: <RocketLaunchIcon />,
    title: 'Eficacia y Rapidez',
    description: 'Realizamos nuestro trabajo de forma eficiente para que disfrutes de tu piscina lo antes posible.',
  },
  {
    icon: <ShieldCheckIcon />,
    title: 'Garantía de 3 Meses',
    description: 'Confiamos en nuestro trabajo. Ofrecemos 3 meses de garantía en todos nuestros servicios.',
  },
];

export const TESTIMONIALS = [
  {
    quote: 'El equipo de Clean Splash es increíblemente profesional y puntual. Mi piscina nunca se había visto tan limpia. ¡Totalmente recomendados!',
    author: 'Ana González',
    location: 'Las Condes',
  },
  {
    quote: 'Contraté el servicio de mantenimiento para la piscina del condominio y el resultado ha sido excelente. Siempre responden rápido y son muy responsables.',
    author: 'Carlos Rojas',
    location: 'Maipú',
  },
  {
    quote: 'Tenía un problema con el agua verde y lo solucionaron en una sola visita. Ahora el agua está cristalina. Un servicio de primera calidad.',
    author: 'Sofía Vergara',
    location: 'Chicureo',
  },
];
