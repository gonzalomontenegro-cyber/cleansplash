
import React from 'react';
import Logo from './Logo';

const Header = () => {
  return (
    <header className="bg-sky-600 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-6 py-2 flex justify-between items-center">
        <a href="#" className="flex items-center">
          <Logo className="h-20 w-auto" />
        </a>
        <nav>
          <a
            href="#contact"
            className="bg-white text-sky-600 font-semibold py-2 px-4 rounded-full shadow-lg hover:bg-sky-100 transition-colors duration-300"
          >
            Contáctanos
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
