"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Subscribe to a media query without a mount-time setState.
 * Returns `false` during SSR and on the first client render, then the real
 * value — which is the safe default for every motion decision on this site.
 */
export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      if (typeof window === "undefined") return () => {};
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    [query],
  );

  const getSnapshot = useCallback(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  }, [query]);

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

export const usePrefersReducedMotion = () =>
  useMediaQuery("(prefers-reduced-motion: reduce)");

/** True only on a device with a real pointer that can hover. */
export const useFinePointer = () => useMediaQuery("(hover: hover) and (pointer: fine)");

/** Reads a sessionStorage flag without touching it during render. */
export function useSessionFlag(key: string) {
  const subscribe = useCallback(() => () => {}, []);

  const getSnapshot = useCallback(() => {
    if (typeof window === "undefined") return false;
    try {
      return sessionStorage.getItem(key) !== null;
    } catch {
      return false;
    }
  }, [key]);

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
