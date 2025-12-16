// src/components/Header.jsx
import React, { useEffect, useRef } from "react";
import BubbleMenu from "./BubbleMenu";
import { gsap } from "gsap";
import logo from "../assets/img/Logo.svg"; // mismo logo que usa tu componente Logo

// Enlaces a las secciones reales de Clean Splash
const navItems = [
  {
    label: "Inicio",
    href: "#home",
    ariaLabel: "Ir a Inicio",
    rotation: -8,
    hoverStyles: { bgColor: "#0ea5e9", textColor: "#ffffff" },
  },
  {
    label: "Servicios",
    href: "#services",
    ariaLabel: "Ir a Servicios",
    rotation: 8,
    hoverStyles: { bgColor: "#10b981", textColor: "#ffffff" },
  },
  {
    label: "Nosotros",
    href: "#about",
    ariaLabel: "Ir a Nosotros",
    rotation: 8,
    hoverStyles: { bgColor: "#f59e0b", textColor: "#ffffff" },
  },
    {
    label: "Galería",
    href: "#galeria",
    ariaLabel: "Ir a Galeria",
    rotation: 8,
    hoverStyles: { bgColor: "#7a7f33ff", textColor: "#ffffff" },
  },
  {
    label: "Elígenos",
    href: "#advantages",
    ariaLabel: "Ir a ¿Por qué elegirnos?",
    rotation: 8,
    hoverStyles: { bgColor: "#6366f1", textColor: "#ffffff" },
  },
  {
    label: "Contacto",
    href: "#contact",
    ariaLabel: "Ir a Contacto",
    rotation: -8,
    hoverStyles: { bgColor: "#22c55e", textColor: "#ffffff" },
  },
];

export default function Header() {
  const headerRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    const header = headerRef.current;
    const logoEl = logoRef.current;
    if (!header || !logoEl) return;

    // Delegación de clicks: scroll suave + cerrar menú
    const handleClick = (e) => {
      const link = e.target.closest("a");
      if (!link || !link.getAttribute("href")?.startsWith("#")) return;

      const hash = link.getAttribute("href");
      const id = hash.slice(1);
      const target = document.getElementById(id);
      e.preventDefault();

      if (target) {
        const offset = 80; // altura aprox del header/burbujas
        const top =
          target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      } else if (id === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }

      // cerrar menú si está abierto
      const openBtn = header.querySelector(".menu-btn.open");
      if (openBtn) openBtn.click();
    };

    header.addEventListener("click", handleClick);

    // Animación del logo con GSAP
    const ctx = gsap.context(() => {
      gsap.to(logoEl, {
        rotate: "+=360",
        duration: 1.6,
        ease: "power2.inOut",
        repeat: -1,
        repeatDelay: 6,
      });

      const handleEnter = () =>
        gsap.to(logoEl, {
          rotate: "+=360",
          duration: 1,
          ease: "power2.out",
        });

      const handleLogoClick = (ev) => {
        ev.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      };

      logoEl.addEventListener("mouseenter", handleEnter);
      logoEl.addEventListener("click", handleLogoClick);

      return () => {
        logoEl.removeEventListener("mouseenter", handleEnter);
        logoEl.removeEventListener("click", handleLogoClick);
      };
    }, header);

    return () => {
      header.removeEventListener("click", handleClick);
      ctx.revert();
    };
  }, []);

  return (
    <header ref={headerRef} className="relative z-50">
      <BubbleMenu
        logo={
          <img
            ref={logoRef}
            src={logo}
            alt="Clean Splash"
            className="bubble-logo cursor-pointer select-none"
            style={{ transformOrigin: "center center" }}
          />
        }
        items={navItems}
        menuAriaLabel="Abrir navegación"
        menuBg="#ffffff"
        menuContentColor="#111111"
        useFixedPosition={true}
        animationEase="back.out(1.5)"
        animationDuration={0.5}
        staggerDelay={0.12}
      />
    </header>
  );
}
