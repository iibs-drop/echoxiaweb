"use client";

import { useEffect, useRef, useState } from "react";
import Container from "./Container";
import Logo from "./Logo";
import Button from "./Button";
import { CloseIcon, MenuIcon } from "./icons";
import { nav } from "@/lib/site";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      setScrolled(y > 8);
      // Indicateur de progression de lecture.
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${p})`;
      }
    };
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Fermeture du menu mobile avec Échap + verrouillage du défilement.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-[background-color,box-shadow,border-color] duration-300 ${
        scrolled
          ? "border-line bg-white/90 shadow-soft backdrop-blur"
          : "border-transparent bg-white/70 backdrop-blur"
      }`}
    >
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Aller au contenu
      </a>
      <Container
        className={`flex items-center justify-between transition-[height] duration-300 ${
          scrolled ? "h-14 md:h-16" : "h-16 md:h-[72px]"
        }`}
      >
        <Logo className="text-xl md:text-2xl" />

        <nav aria-label="Navigation principale" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-brand-dark/80 transition-colors hover:bg-surface-soft hover:text-brand-dark"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden md:block">
          <Button href="#demo" size="md">
            Demander une démo
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-brand-dark md:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">
            {open ? "Fermer le menu" : "Ouvrir le menu"}
          </span>
          {open ? (
            <CloseIcon className="h-6 w-6" />
          ) : (
            <MenuIcon className="h-6 w-6" />
          )}
        </button>
      </Container>

      {/* Indicateur de progression de lecture */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-line/60"
      >
        <div
          ref={progressRef}
          className="h-full origin-left bg-gradient-to-r from-accent to-brand"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      {/* Menu mobile */}
      {open && (
        <div className="md:hidden" id="menu-mobile">
          <nav aria-label="Navigation mobile" className="border-t border-line bg-white">
            <Container className="py-3">
              <ul className="flex flex-col">
                {nav.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-md px-3 py-3 text-base font-medium text-brand-dark hover:bg-surface-soft"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
                <li className="mt-2 px-1 pb-2">
                  <Button
                    href="#demo"
                    size="lg"
                    className="w-full"
                  >
                    Demander une démo
                  </Button>
                </li>
              </ul>
            </Container>
          </nav>
        </div>
      )}
    </header>
  );
}
