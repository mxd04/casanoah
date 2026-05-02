"use client";
import { useEffect, useRef } from "react";
import Lenis from "lenis";

export const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Forțează browserul să sară sus la refresh (nativ)
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);

    // Inițializare Lenis
    lenisRef.current = new Lenis({
      duration: 1.2,
      lerp: 0.1,
      wheelMultiplier: 1,
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    // Forțează Lenis să înceapă de la 0
    lenisRef.current.scrollTo(0, { immediate: true });

    function raf(time: number) {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
};