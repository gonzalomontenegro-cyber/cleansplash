import React from "react";
import Logo from "./Logo";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <a href="#home" className="flex items-center">
          <Logo className="h-16 w-auto" />
        </a>

        {/* Menú */}
        <nav className="hidden md:flex space-x-8 text-white font-semibold text-lg">
          <a href="#home" className="hover:text-sky-300 transition">Inicio</a>
          <a href="#services" className="hover:text-sky-300 transition">Servicios</a>
          <a href="#about" className="hover:text-sky-300 transition">Nosotros</a>
          <a href="#contact"
             className="bg-white text-sky-600 py-2 px-4 rounded-full shadow-lg hover:bg-sky-100 transition">
            Contáctanos
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
