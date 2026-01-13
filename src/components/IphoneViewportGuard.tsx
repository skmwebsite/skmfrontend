"use client";

import { useEffect } from "react";

const IphoneRegex = /iPhone/i;
export default function IphoneViewportGuard() {
  useEffect(() => {
    const isIphone = IphoneRegex.test(window.navigator.userAgent);

    if (isIphone) {
      const meta = document.querySelector('meta[name="viewport"]');
      if (meta) {
        meta.setAttribute(
          "content",
          "width=device-width, initial-scale=1, maximum-scale=1"
        );
      }
    }
  }, []);

  return null; // nothing to render
}