"use client";

import { useRef, useState } from "react";
import Container from "../Container";
import DemoVideo from "../DemoVideo";
import AnimationPlayer from "../AnimationPlayer";
import { CheckIcon } from "../icons";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import {
  useIsomorphicLayoutEffect,
  useMediaQuery,
  usePrefersReducedMotion,
} from "@/lib/hooks";

type Chapter = {
  id: string;
  num: string;
  label: string;
  base: string;
  text: string;
  title: string;
  benefits: string[];
};

const chapters: Chapter[] = [
  {
    id: "repondre",
    num: "01",
    label: "Répondre instantanément",
    base: "/animations/01-reponse-instantanee",
    text: "Chaque message reçoit une réponse claire, à toute heure. EchoXIA accueille le client, comprend sa demande et répond sans le faire attendre.",
    title:
      "Une cliente écrit « Bonjour, vous êtes disponibles ? » et EchoXIA répond aussitôt, 24 h/24 et 7 j/7.",
    benefits: ["Disponible 24/7", "Réponses claires"],
  },
  {
    id: "qualifier",
    num: "02",
    label: "Qualifier les prospects",
    base: "/animations/02-qualification-prospects",
    text: "L’assistant pose les bonnes questions, recueille le besoin et les coordonnées, puis compose une fiche prospect prête pour votre équipe.",
    title:
      "EchoXIA demande le besoin et les coordonnées, puis remplit une fiche prospect : nom, besoin, contact, prospect qualifié.",
    benefits: ["Besoin identifié", "Coordonnées recueillies"],
  },
  {
    id: "rendez-vous",
    num: "03",
    label: "Prendre rendez-vous",
    base: "/animations/03-prise-de-rendez-vous",
    text: "Le client choisit un créneau parmi ceux que vous proposez et reçoit sa confirmation, directement dans la conversation.",
    title:
      "Le client choisit un créneau (par exemple 14 h 30) et reçoit aussitôt la confirmation de son rendez-vous.",
    benefits: ["Créneau choisi", "Confirmation immédiate"],
  },
  {
    id: "factures",
    num: "04",
    label: "Envoyer les factures",
    base: "/animations/04-envoi-automatique-facture",
    text: "Une fois la prestation confirmée, la facture part automatiquement dans le fil de conversation et reste accessible à tout moment.",
    title:
      "Une fois la prestation confirmée, la facture PDF est transmise automatiquement dans la conversation.",
    benefits: ["Envoi automatique", "Toujours accessible"],
  },
];

export default function FeaturesPinned() {
  const reduced = usePrefersReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  // Première passe (SSR + avant effet) : version empilée, accessible sans JS.
  const pinned = isDesktop && !reduced;

  return pinned ? <PinnedView reduced={reduced} /> : <StackedView reduced={reduced} />;
}

/* ------------------------------------------------------------------ */
/* Version desktop : section épinglée pilotée par le scroll            */
/* ------------------------------------------------------------------ */

function PinnedView({ reduced }: { reduced: boolean }) {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const videoWrapRefs = useRef<Array<HTMLDivElement | null>>([]);
  const textRefs = useRef<Array<HTMLDivElement | null>>([]);
  const stRef = useRef<ScrollTrigger | null>(null);

  const [active, setActive] = useState(0);
  const [shouldLoad, setShouldLoad] = useState(false);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const lastIdx = { v: 0 };

      const applyIndex = (idx: number) => {
        // Fondu enchaîné des vidéos : la démo active apparaît, les autres disparaissent.
        videoWrapRefs.current.forEach((el, i) => {
          if (!el) return;
          gsap.to(el, {
            autoAlpha: i === idx ? 1 : 0,
            scale: i === idx ? 1 : 0.98,
            duration: 0.5,
            ease: "power2.out",
            overwrite: "auto",
          });
        });
        // Apparition du texte du chapitre actif.
        textRefs.current.forEach((el, i) => {
          if (!el) return;
          if (i === idx) {
            gsap.fromTo(
              el,
              { autoAlpha: 0, y: 14 },
              { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out", overwrite: "auto" },
            );
          } else {
            gsap.to(el, { autoAlpha: 0, duration: 0.3, overwrite: "auto" });
          }
        });
        setActive(idx);
      };

      // État initial : seul le premier chapitre est visible.
      videoWrapRefs.current.forEach((el, i) =>
        gsap.set(el, { autoAlpha: i === 0 ? 1 : 0, scale: i === 0 ? 1 : 0.98 }),
      );
      textRefs.current.forEach((el, i) =>
        gsap.set(el, { autoAlpha: i === 0 ? 1 : 0, y: i === 0 ? 0 : 14 }),
      );

      const st = ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top top",
        end: "+=300%", // ~3 hauteurs de fenêtre
        pin: pinRef.current,
        pinSpacing: true,
        anticipatePin: 1,
        onRefresh: () => setShouldLoad(true),
        onUpdate: (self) => {
          const p = self.progress;
          // Barre de progression.
          if (progressRef.current) {
            progressRef.current.style.transform = `scaleY(${Math.max(0.001, p)})`;
          }
          // Chapitre actif (4 segments égaux).
          const idx = Math.min(chapters.length - 1, Math.floor(p * chapters.length));
          if (idx !== lastIdx.v) {
            lastIdx.v = idx;
            applyIndex(idx);
          }
          // Fond qui évolue subtilement entre blanc et bleu très clair.
          if (bgRef.current) {
            const wave = 0.5 - 0.5 * Math.cos(p * Math.PI * 2 * (chapters.length / 2));
            const color = gsap.utils.interpolate("#ffffff", "#EAF1FA", wave);
            bgRef.current.style.backgroundColor = color;
          }
        },
      });
      stRef.current = st;
    }, rootRef);

    return () => {
      stRef.current = null;
      ctx.revert();
    };
  }, []);

  const goTo = (i: number) => {
    const st = stRef.current;
    if (!st) return;
    const target = st.start + ((i + 0.5) / chapters.length) * (st.end - st.start);
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <section
      ref={rootRef}
      id="fonctionnalites"
      className="relative scroll-mt-24"
      aria-label="Les fonctionnalités d’EchoXIA, présentées pas à pas"
    >
      <div ref={pinRef} className="relative h-screen overflow-hidden">
        <div ref={bgRef} className="absolute inset-0 -z-10 bg-white" />
        <Container className="flex h-full items-center">
          <div className="grid w-full items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
            {/* Colonne gauche : étapes, texte, progression */}
            <div className="flex gap-6">
              {/* Rail de progression vertical */}
              <div className="relative mt-2 w-1 flex-none overflow-hidden rounded-full bg-line">
                <div
                  ref={progressRef}
                  className="absolute inset-0 origin-top rounded-full bg-gradient-to-b from-accent to-brand"
                  style={{ transform: "scaleY(0.001)" }}
                />
              </div>

              <div>
                <span className="eyebrow">Fonctionnalités</span>
                <h2 className="section-title mt-4">
                  Un message devient un client.
                </h2>

                <ol className="mt-8 space-y-1">
                  {chapters.map((c, i) => (
                    <li key={c.id}>
                      <button
                        type="button"
                        onClick={() => goTo(i)}
                        aria-current={active === i ? "step" : undefined}
                        className="group flex w-full items-center gap-4 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-surface-soft"
                      >
                        <span
                          className={`inline-flex h-9 w-9 flex-none items-center justify-center rounded-full text-sm font-bold transition-colors ${
                            active === i
                              ? "bg-brand text-white"
                              : "bg-surface-soft text-brand-dark/50"
                          }`}
                        >
                          {c.num}
                        </span>
                        <span
                          className={`text-lg font-semibold transition-colors ${
                            active === i ? "text-brand-dark" : "text-brand-dark/45"
                          }`}
                        >
                          {c.label}
                        </span>
                      </button>
                    </li>
                  ))}
                </ol>

                {/* Textes des chapitres, superposés et révélés à l'activation */}
                <div className="relative mt-6 min-h-[7rem] max-w-md">
                  {chapters.map((c, i) => (
                    <div
                      key={c.id}
                      ref={(el) => {
                        textRefs.current[i] = el;
                      }}
                      className="absolute inset-0"
                      aria-hidden={active !== i}
                    >
                      <p className="text-lg leading-relaxed text-brand-dark/75">
                        {c.text}
                      </p>
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {c.benefits.map((b) => (
                          <li
                            key={b}
                            className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1 text-xs font-medium text-brand"
                          >
                            <CheckIcon className="h-3.5 w-3.5 text-accent" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Colonne droite : cadre de démonstration stable (4:3) */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl2 border border-line bg-surface-soft shadow-card">
              {chapters.map((c, i) => (
                <div
                  key={c.id}
                  ref={(el) => {
                    videoWrapRefs.current[i] = el;
                  }}
                  className="absolute inset-0"
                >
                  <DemoVideo
                    base={c.base}
                    title={c.title}
                    active={active === i}
                    shouldLoad={shouldLoad && Math.abs(active - i) <= 1}
                    reduced={reduced}
                  />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Version mobile / mouvement réduit : pile verticale accessible       */
/* ------------------------------------------------------------------ */

function StackedView({ reduced }: { reduced: boolean }) {
  const rootRef = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".feature-block").forEach((el) => {
        gsap.from(el, {
          y: 24,
          autoAlpha: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 82%" },
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={rootRef}
      id="fonctionnalites"
      className="scroll-mt-24 bg-white py-16 md:py-20"
      aria-label="Les fonctionnalités d’EchoXIA"
    >
      <Container>
        <div className="max-w-2xl">
          <span className="eyebrow">Fonctionnalités</span>
          <h2 className="section-title mt-4">Un message devient un client.</h2>
          <p className="mt-4 text-lg leading-relaxed text-brand-dark/75">
            De la première question jusqu’à la facture, EchoXIA accompagne
            l’échange de bout en bout.
          </p>
        </div>

        <div className="mt-10 space-y-12">
          {chapters.map((c) => (
            <article key={c.id} id={c.id} className="feature-block scroll-mt-24">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                  {c.num}
                </span>
                <h3 className="text-xl font-semibold text-brand-dark">
                  {c.label}
                </h3>
              </div>
              <div className="mt-5">
                <AnimationPlayer base={c.base} title={c.title} />
              </div>
              <p className="mt-4 text-brand-dark/75">{c.text}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {c.benefits.map((b) => (
                  <li
                    key={b}
                    className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1 text-xs font-medium text-brand"
                  >
                    <CheckIcon className="h-3.5 w-3.5 text-accent" />
                    {b}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
