"use client";

import { useEffect, useLayoutEffect, useState } from "react";

/**
 * useLayoutEffect qui ne déclenche pas d'avertissement côté serveur.
 */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Renvoie true si l'utilisateur préfère un mouvement réduit.
 * Réactif si le réglage système change.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}

/**
 * Renvoie true lorsque la media query fournie correspond.
 * Utilisé pour distinguer desktop (mise en scène épinglée) et mobile (pile).
 * Rend false au premier rendu (SSR) puis se met à jour après montage.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);

  return matches;
}
