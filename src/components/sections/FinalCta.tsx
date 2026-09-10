"use client";

import { useRef } from "react";
import Container from "../Container";
import DemoForm from "../DemoForm";
import { CheckIcon } from "../icons";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect, usePrefersReducedMotion } from "@/lib/hooks";

const points = [
  "Une démonstration adaptée à votre activité",
  "Vos canaux et vos cas d’usage passés en revue",
  "Des réponses concrètes à vos questions",
];

export default function FinalCta() {
  const rootRef = useRef<HTMLElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useIsomorphicLayoutEffect(() => {
    if (reduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 72%",
        },
        defaults: { ease: "power3.out" },
      });
      tl.from(haloRef.current, {
        scale: 0.55,
        autoAlpha: 0,
        duration: 1.1,
        ease: "power2.out",
      })
        .from(".cta-title", { y: 24, autoAlpha: 0, duration: 0.7 }, 0.15)
        .from(".cta-point", { y: 16, autoAlpha: 0, duration: 0.5, stagger: 0.1 }, 0.35)
        .from(".cta-form", { y: 28, autoAlpha: 0, duration: 0.7 }, 0.3);
    }, rootRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={rootRef} id="demo" className="scroll-mt-24 bg-white py-16 md:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-[1.75rem] border border-brand-dark/40 bg-brand-dark text-white shadow-card">
          {/* Halo cyan qui s'élargit à l'arrivée */}
          <div
            ref={haloRef}
            aria-hidden="true"
            className="pointer-events-none absolute -top-40 left-1/2 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-accent/25 blur-3xl"
          />
          <div className="relative grid gap-10 p-8 md:grid-cols-2 md:gap-14 md:p-12 lg:p-16">
            <div className="flex flex-col justify-center">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                <span className="inline-block h-2 w-2 rounded-full bg-accent" />
                Demander une démo
              </span>
              <h2 className="cta-title mt-5 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                Faites avancer votre activité, conversation après conversation.
              </h2>
              <p className="cta-title mt-5 max-w-md text-lg leading-relaxed text-white/80">
                Découvrez EchoXIA sur vos propres canaux. Laissez-nous quelques
                informations, nous organisons votre démonstration.
              </p>
              <ul className="mt-8 space-y-3">
                {points.map((p) => (
                  <li key={p} className="cta-point flex items-center gap-3 text-white/90">
                    <span className="inline-flex h-6 w-6 flex-none items-center justify-center rounded-full bg-accent/20 text-accent">
                      <CheckIcon className="h-4 w-4" />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <div className="cta-form">
              <DemoForm />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
