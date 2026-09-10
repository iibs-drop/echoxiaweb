"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PauseIcon, PlayIcon, ReplayIcon } from "./icons";

type DemoVideoProps = {
  base: string;
  title: string;
  /** Le chapitre est actif : la vidéo se lit, sinon elle est en pause. */
  active: boolean;
  /** Les sources ne sont injectées que lorsque true (chargement progressif). */
  shouldLoad: boolean;
  /** Désactive la lecture automatique (mouvement réduit). */
  reduced?: boolean;
};

/**
 * Vidéo de démonstration pilotée par l'état « actif ».
 * Utilisée dans le cadre stable de la section épinglée : plusieurs
 * instances sont empilées et l'opacité gère le fondu enchaîné.
 */
export default function DemoVideo({
  base,
  title,
  active,
  shouldLoad,
  reduced = false,
}: DemoVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userPaused, setUserPaused] = useState(false);

  // (Re)charge les sources quand elles deviennent disponibles.
  useEffect(() => {
    if (shouldLoad && videoRef.current) {
      videoRef.current.load();
    }
  }, [shouldLoad]);

  // Lecture / pause selon l'état actif du chapitre.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) return;

    if (active && !reduced && !userPaused) {
      if (video.ended) video.currentTime = 0;
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [active, shouldLoad, reduced, userPaused]);

  // Quand le chapitre redevient actif, on repart d'une lecture propre.
  useEffect(() => {
    if (active) setUserPaused(false);
  }, [active]);

  const toggle = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      setUserPaused(false);
      if (video.ended) video.currentTime = 0;
      video.play().catch(() => {});
    } else {
      setUserPaused(true);
      video.pause();
    }
  }, []);

  const replay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    setUserPaused(false);
    video.currentTime = 0;
    video.play().catch(() => {});
  }, []);

  return (
    <div className="absolute inset-0">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-contain"
        poster={`${base}.png`}
        muted
        playsInline
        preload="none"
        aria-label={title}
        tabIndex={active ? 0 : -1}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      >
        {shouldLoad && (
          <>
            <source src={`${base}.webm`} type="video/webm" />
            <source src={`${base}.mp4`} type="video/mp4" />
          </>
        )}
      </video>

      {/* Commandes accessibles, actives uniquement pour le chapitre courant */}
      {active && (
        <div className="absolute inset-x-0 bottom-0 flex justify-end p-3">
          <div className="flex items-center gap-2 rounded-full bg-white/85 p-1 shadow-soft backdrop-blur">
            <button
              type="button"
              onClick={toggle}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-brand hover:bg-surface-soft"
              aria-label={isPlaying ? "Mettre en pause la démonstration" : "Lire la démonstration"}
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
              aria-label="Rejouer la démonstration"
            >
              <ReplayIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
