
import React from 'react';
import { ADVANTAGES } from '../constants';

const Advantages = () => {
  return (
    <section id="advantages" className="py-20 bg-sky-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-sky-800">¿Por qué elegirnos?</h2>
          <p className="text-lg text-gray-600 mt-2">Nos diferenciamos por nuestro compromiso y calidad.</p>
        </div>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          {ADVANTAGES.map((advantage, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-lg bg-sky-500 text-white">
                {advantage.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">{advantage.title}</h3>
                <p className="text-gray-600 mt-1">{advantage.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Advantages;
