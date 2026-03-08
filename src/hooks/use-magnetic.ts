"use client";

import { useRef, useEffect } from "react";

export function useMagnetic<T extends HTMLElement>(strength: number = 0.3) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    function handleMouseMove(e: MouseEvent) {
      const rect = el!.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.sqrt(distX * distX + distY * distY);

      const maxDist = 40;
      if (distance < maxDist) {
        const pull = (1 - distance / maxDist) * strength;
        el!.style.transform = `translate(${distX * pull}px, ${distY * pull}px)`;
      } else {
        el!.style.transform = "translate(0, 0)";
      }
    }

    function handleMouseLeave() {
      el!.style.transform = "translate(0, 0)";
      el!.style.transition = "transform 300ms ease";
      setTimeout(() => {
        if (el) el.style.transition = "";
      }, 300);
    }

    document.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength]);

  return ref;
}
