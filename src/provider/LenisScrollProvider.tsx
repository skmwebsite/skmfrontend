"use client";
import Lenis from "lenis";
import { type ReactNode, useEffect, useRef } from "react";

const LenisScrollProvider = ({ children }: { children: ReactNode }) => {
  const lenisRef = useRef<Lenis | undefined>(undefined);
  const rafHandleRef = useRef<number | null>(null);

  useEffect(() => {
    if (!lenisRef.current) {
      lenisRef.current = new Lenis({
        easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      });
      const raf = (time: number) => {
        lenisRef.current?.raf(time);
        rafHandleRef.current = requestAnimationFrame(raf);
      };
      rafHandleRef.current = requestAnimationFrame(raf);
    }

    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = undefined;
      }
      if (rafHandleRef.current) {
        cancelAnimationFrame(rafHandleRef.current);
        rafHandleRef.current = null;
      }
    };
  }, []);

  return children;
};

export default LenisScrollProvider;
