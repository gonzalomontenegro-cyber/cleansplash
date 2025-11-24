
import React from 'react';
import { CONTACT_INFO } from '../constants';
import Logo from './Logo';

const SocialIcon = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
    {children}
  </a>
);

const Footer = () => {
  return (
    <footer className="bg-sky-600 sticky top-0 z-50 shadow-md text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Column 1: Brand */}
          <div>
            <div className="flex justify-center md:justify-start mb-4">
               <Logo className="h-16 w-auto" />
            </div>
            <p className="text-gray-400">Mantenimiento y limpieza de piscinas en la Región Metropolitana.</p>
            <p className="text-gray-400 mt-2">© {new Date().getFullYear()} Clean Splash. Todos los derechos reservados.</p>
          </div>

          {/* Column 2: Contact Info */}
          <div>
            <h3 className="font-semibold tracking-wider uppercase mb-4">Contacto</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href={`tel:${CONTACT_INFO.phone}`} className="hover:text-white">{CONTACT_INFO.phone}</a></li>
              <li><a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-white">{CONTACT_INFO.email}</a></li>
              <li className="pt-2">
                <p className="font-semibold">Horario de Atención:</p>
                <p>Lunes a Viernes: 8:00 - 20:00 hrs</p>
              </li>
            </ul>
          </div>

          {/* Column 3: Social Media */}
          <div>
            <h3 className="font-semibold tracking-wider uppercase mb-4">Síguenos</h3>
            <div className="flex justify-center md:justify-start space-x-6">
              <SocialIcon href={CONTACT_INFO.instagram}>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.012-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.345 2.525c.636-.247 1.363-.416 2.427-.465C9.793 2.013 10.147 2 12.315 2zm0 1.62c-2.403 0-2.748.01-3.71.058-.943.048-1.5.208-1.943.372-.49.182-.883.417-1.28.813a3.27 3.27 0 00-.813 1.28c-.164.443-.324 1-.372 1.943-.048.962-.058 1.307-.058 3.71s.01 2.748.058 3.71c.048.943.208 1.5.372 1.943.182.49.417.883.813 1.28a3.27 3.27 0 001.28.813c.443.164 1 .324 1.943.372.962.048 1.307.058 3.71.058s2.748-.01 3.71-.058c.943-.048 1.5-.208 1.943-.372.49-.182.883-.417 1.28-.813a3.27 3.27 0 00.813-1.28c.164-.443.324-1 .372-1.943.048-.962.058-1.307-.058-3.71s-.01-2.748-.058-3.71c-.048-.943-.208-1.5-.372-1.943a3.27 3.27 0 00-.813-1.28 3.27 3.27 0 00-1.28-.813c-.443-.164-1-.324-1.943-.372C15.063 3.63 14.718 3.62 12.315 3.62zM12 7.18c-2.647 0-4.792 2.145-4.792 4.792s2.145 4.792 4.792 4.792 4.792-2.145 4.792-4.792-2.145-4.792-4.792-4.792zm0 7.952c-1.75 0-3.16-1.41-3.16-3.16s1.41-3.16 3.16-3.16 3.16 1.41 3.16 3.16-1.41 3.16-3.16 3.16zm3.44-8.31a1.15 1.15 0 100-2.3 1.15 1.15 0 000 2.3z" clipRule="evenodd" /></svg>
              </SocialIcon>
              <SocialIcon href={CONTACT_INFO.facebook}>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
              </SocialIcon>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
