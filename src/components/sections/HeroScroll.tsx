"use client";

import { useRef } from "react";
import Container from "../Container";
import Button from "../Button";
import AnimationPlayer from "../AnimationPlayer";
import { channels } from "@/lib/site";
import {
  GlobeIcon,
  InstagramIcon,
  MessengerIcon,
  WhatsAppIcon,
} from "../icons";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect, usePrefersReducedMotion } from "@/lib/hooks";

const channelIcon: Record<string, React.ReactNode> = {
  whatsapp: <WhatsAppIcon className="h-5 w-5" />,
  instagram: <InstagramIcon className="h-5 w-5" />,
  messenger: <MessengerIcon className="h-5 w-5" />,
  web: <GlobeIcon className="h-5 w-5" />,
};

export default function HeroScroll() {
  const rootRef = useRef<HTMLElement>(null);
  const titleWrapRef = useRef<HTMLDivElement>(null);
  const frameOuterRef = useRef<HTMLDivElement>(null);
  const frameInnerRef = useRef<HTMLDivElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useIsomorphicLayoutEffect(() => {
    if (reduced) return;

    const ctx = gsap.context(() => {
      // Position de repos : cadre légèrement incliné.
      gsap.set(frameOuterRef.current, { rotate: -6, transformOrigin: "50% 50%" });

      // Intro à l'ouverture — apparition ligne par ligne.
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .from(".hero-line", { yPercent: 60, opacity: 0, duration: 0.7, stagger: 0.12 })
        .from(".hero-eyebrow", { y: 14, opacity: 0, duration: 0.5 }, 0)
        .from(".hero-sub", { y: 16, opacity: 0, duration: 0.6 }, 0.35)
        .from(".hero-cta", { y: 16, opacity: 0, duration: 0.6, stagger: 0.08 }, 0.5)
        .from(".hero-channels", { y: 16, opacity: 0, duration: 0.6 }, 0.65)
        .from(
          frameInnerRef.current,
          { yPercent: 8, opacity: 0, scale: 0.92, duration: 0.9 },
          0.15,
        );

      // Timeline pilotée par le scroll — le cadre se redresse et grandit,
      // le titre remonte, l'arrière-plan bouge en parallaxe.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });
      tl.to(titleWrapRef.current, { yPercent: -34, opacity: 0.35, ease: "none" }, 0)
        .to(
          frameOuterRef.current,
          { rotate: 0, scale: 1.08, ease: "none" },
          0,
        )
        .to(blob1Ref.current, { yPercent: 32, ease: "none" }, 0)
        .to(blob2Ref.current, { yPercent: -26, ease: "none" }, 0);
    }, rootRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-dotted">
      {/* Éléments décoratifs en parallaxe */}
      <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
        <div
          ref={blob1Ref}
          className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-accent/10 blur-3xl"
        />
        <div
          ref={blob2Ref}
          className="absolute -left-32 top-40 h-[26rem] w-[26rem] rounded-full bg-brand/10 blur-3xl"
        />
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-gradient-to-b from-surface-soft/80 to-transparent" />

      <Container className="relative py-14 md:py-20 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Colonne texte */}
          <div>
            <div ref={titleWrapRef}>
              <span className="eyebrow hero-eyebrow">
                <span className="inline-block h-2 w-2 rounded-full bg-accent" />
                Votre assistant IA, disponible 24/7
              </span>
              <h1 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight text-brand-dark sm:text-5xl lg:text-[3.4rem]">
                <span className="block overflow-hidden">
                  <span className="hero-line block">Vos clients écrivent.</span>
                </span>
                <span className="block overflow-hidden">
                  <span className="hero-line block">
                    <span className="text-brand">EchoXIA</span> s’occupe de la
                    suite.
                  </span>
                </span>
              </h1>
            </div>
            <p className="hero-sub mt-6 max-w-xl text-lg leading-relaxed text-brand-dark/75">
              Répondez à leurs questions, qualifiez vos prospects, prenez des
              rendez-vous et envoyez vos factures, directement depuis vos
              conversations.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <span className="hero-cta">
                <Button href="#demo" size="lg" className="w-full sm:w-auto">
                  Demander une démo
                </Button>
              </span>
              <span className="hero-cta">
                <Button
                  href="#fonctionnalites"
                  size="lg"
                  variant="secondary"
                  className="w-full sm:w-auto"
                >
                  Découvrir les fonctionnalités
                </Button>
              </span>
            </div>

            <div className="hero-channels mt-10">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-dark/50">
                Sur tous vos canaux
              </p>
              <ul className="mt-3 flex flex-wrap items-center gap-2">
                {channels.map((c) => (
                  <li
                    key={c.key}
                    className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-2 text-sm font-medium text-brand-dark shadow-soft"
                  >
                    <span className="text-accent">{channelIcon[c.key]}</span>
                    {c.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Colonne animation — cadre incliné qui se redresse au scroll */}
          <div className="lg:pl-4">
            <div ref={frameOuterRef} className="will-change-transform">
              <div ref={frameInnerRef}>
                <AnimationPlayer
                  base="/animations/01-reponse-instantanee"
                  title="Une cliente écrit sur WhatsApp « Bonjour, vous êtes disponibles ? » et EchoXIA répond aussitôt, 24 h/24 et 7 j/7."
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
