"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PauseIcon, PlayIcon, ReplayIcon } from "./icons";

type AnimationPlayerProps = {
  /** Chemin de base sans extension, ex. "/animations/01-reponse-instantanee". */
  base: string;
  /** Libellé accessible décrivant l'animation. */
  title: string;
  className?: string;
  /** Priorité de chargement : le premier visuel (hero) charge tout de suite. */
  priority?: boolean;
};

/**
 * Lecteur d'animation réutilisable.
 * - Ratio 4:3, animation entièrement visible.
 * - PNG en image d'attente, sources WebM + MP4.
 * - Lecture au défilement (visible ≥ 55 %), pause en sortie d'écran.
 * - Conserve la dernière image après lecture.
 * - Commandes accessibles Pause / Rejouer.
 * - Respecte prefers-reduced-motion (image fixe + lecture manuelle).
 * - Chargement différé des médias plus bas dans la page.
 */
export default function AnimationPlayer({
  base,
  title,
  className = "",
  priority = false,
}: AnimationPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [reducedMotion, setReducedMotion] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(priority);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);

  // Refs pour la logique dans les observateurs (évite les fermetures obsolètes).
  const hasEndedRef = useRef(false);
  const userPausedRef = useRef(false);
  const reducedMotionRef = useRef(false);

  const poster = `${base}.png`;

  // Détection prefers-reduced-motion (réactif si l'utilisateur change de réglage).
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      setReducedMotion(mq.matches);
      reducedMotionRef.current = mq.matches;
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // Chargement différé : on ne charge les sources que lorsque le bloc approche.
  useEffect(() => {
    if (shouldLoad) return;
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShouldLoad(true);
          obs.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [shouldLoad]);

  // Quand les sources deviennent disponibles, on demande le (re)chargement.
  useEffect(() => {
    if (shouldLoad && videoRef.current) {
      videoRef.current.load();
    }
  }, [shouldLoad]);

  // Lecture / pause selon la visibilité.
  useEffect(() => {
    const el = containerRef.current;
    const video = videoRef.current;
    if (!el || !video) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting && entry.intersectionRatio >= 0.55) {
          if (
            !reducedMotionRef.current &&
            !hasEndedRef.current &&
            !userPausedRef.current
          ) {
            video.play().catch(() => {
              /* lecture auto refusée : les commandes manuelles restent dispo */
            });
          }
        } else {
          // Sortie d'écran : on met en pause si la lecture est en cours (pas si terminée).
          if (!video.paused && !video.ended) {
            video.pause();
          }
        }
      },
      { threshold: [0, 0.55, 1] },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [shouldLoad]);

  const onPlay = useCallback(() => {
    setIsPlaying(true);
    setHasEnded(false);
    hasEndedRef.current = false;
  }, []);

  const onPause = useCallback(() => setIsPlaying(false), []);

  const onEnded = useCallback(() => {
    setIsPlaying(false);
    setHasEnded(true);
    hasEndedRef.current = true;
  }, []);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      userPausedRef.current = false;
      video.play().catch(() => {});
    } else {
      userPausedRef.current = true;
      video.pause();
    }
  }, []);

  const replay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    userPausedRef.current = false;
    hasEndedRef.current = false;
    setHasEnded(false);
    video.currentTime = 0;
    video.play().catch(() => {});
  }, []);

  return (
    <figure className={`group ${className}`}>
      <div
        ref={containerRef}
        className="relative aspect-[4/3] w-full overflow-hidden rounded-xl2 border border-line bg-surface-soft shadow-card"
      >
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-contain"
          poster={poster}
          muted
          playsInline
          preload={priority ? "metadata" : "none"}
          // pas de boucle : la dernière image reste affichée
          aria-label={title}
          onPlay={onPlay}
          onPause={onPause}
          onEnded={onEnded}
        >
          {shouldLoad && (
            <>
              <source src={`${base}.webm`} type="video/webm" />
              <source src={`${base}.mp4`} type="video/mp4" />
            </>
          )}
        </video>

        {/* Commandes accessibles, toujours atteignables au clavier. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-end gap-2 p-3">
          <div className="pointer-events-auto flex items-center gap-2 rounded-full bg-white/85 p-1 shadow-soft backdrop-blur transition-opacity duration-200 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100">
            <button
              type="button"
              onClick={togglePlay}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-brand hover:bg-surface-soft"
              aria-label={isPlaying ? `Mettre en pause : ${title}` : `Lire : ${title}`}
            >
              {isPlaying ? (
                <PauseIcon className="h-5 w-5" />
              ) : (
                <PlayIcon className="h-5 w-5" />
              )}
            </button>
            <button
              type="button"
              onClick={replay}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-brand hover:bg-surface-soft"
              aria-label={`Rejouer : ${title}`}
            >
              <ReplayIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Indice de lecture pour reduced-motion / avant première lecture. */}
        {reducedMotion && !isPlaying && !hasEnded && (
          <button
            type="button"
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-brand-dark/5"
            aria-label={`Lire l'animation : ${title}`}
          >
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-brand shadow-card">
              <PlayIcon className="h-6 w-6" />
            </span>
          </button>
        )}
      </div>
      <figcaption className="sr-only">{title}</figcaption>
    </figure>
  );
}
