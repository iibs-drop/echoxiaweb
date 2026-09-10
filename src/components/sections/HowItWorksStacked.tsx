"use client";

import { useRef } from "react";
import Container from "../Container";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsomorphicLayoutEffect, usePrefersReducedMotion } from "@/lib/hooks";

const steps = [
  {
    number: "1",
    title: "Configurez EchoXIA",
    text: "Renseignez les informations de votre activité : services, réponses attendues, ton de la marque. L’assistant s’aligne sur votre façon de communiquer.",
  },
  {
    number: "2",
    title: "Connectez vos canaux",
    text: "Reliez WhatsApp, Instagram, Messenger et votre site web. Vos conversations remontent au même endroit.",
  },
  {
    number: "3",
    title: "Laissez l’assistant gérer",
    text: "EchoXIA prend en charge les échanges au quotidien, et votre équipe retrouve les informations utiles pour assurer le suivi.",
  },
];

export default function HowItWorksStacked() {
  const rootRef = useRef<HTMLElement>(null);
  const wrapperRefs = useRef<Array<HTMLLIElement | null>>([]);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const reduced = usePrefersReducedMotion();

  useIsomorphicLayoutEffect(() => {
    if (reduced) return;

    const ctx = gsap.context(() => {
      // Chaque carte, une fois recouverte par la suivante, se réduit et s'atténue.
      cardRefs.current.forEach((card, i) => {
        if (!card || i === steps.length - 1) return;
        const next = wrapperRefs.current[i + 1];
        if (!next) return;
        ScrollTrigger.create({
          trigger: next,
          start: "top bottom",
          end: "top top",
          scrub: true,
          onUpdate: (self) => {
            const p = self.progress;
            gsap.set(card, {
              scale: 1 - 0.06 * p,
              opacity: 1 - 0.35 * p,
              y: -14 * p,
            });
          },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={rootRef}
      id="comment-ca-marche"
      className="scroll-mt-24 bg-surface-soft py-16 md:py-24"
    >
      <Container>
        <div className="max-w-2xl">
          <span className="eyebrow">Comment ça marche</span>
          <h2 className="section-title mt-4">Opérationnel en trois étapes.</h2>
          <p className="mt-4 text-lg leading-relaxed text-brand-dark/75">
            De la configuration à la mise en route, EchoXIA s’intègre à votre
            organisation sans bouleverser vos habitudes.
          </p>
        </div>

        <ol className="relative mt-12">
          {steps.map((step, i) => (
            <li
              key={step.number}
              ref={(el) => {
                wrapperRefs.current[i] = el;
              }}
              className={
                reduced
                  ? "mb-6"
                  : "sticky mb-6 md:mb-10"
              }
              style={
                reduced
                  ? undefined
                  : { top: `calc(6rem + ${i * 1}rem)`, zIndex: i + 1 }
              }
            >
              <div
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="origin-top rounded-[1.5rem] border border-line bg-white p-8 shadow-card will-change-transform sm:p-10 md:p-12"
              >
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-10">
                  <span
                    aria-hidden="true"
                    className="inline-flex h-16 w-16 flex-none items-center justify-center rounded-2xl bg-brand text-2xl font-bold text-white md:h-20 md:w-20 md:text-3xl"
                  >
                    {step.number}
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                      Étape {step.number}
                    </p>
                    <h3 className="mt-2 text-2xl font-bold text-brand-dark md:text-3xl">
                      {step.title}
                    </h3>
                    <p className="mt-3 max-w-xl text-lg leading-relaxed text-brand-dark/70">
                      {step.text}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
