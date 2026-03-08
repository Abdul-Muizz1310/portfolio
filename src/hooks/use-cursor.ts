"use client";

import { useRef, useEffect, useCallback } from "react";

export function useCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const dotPos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const isHovering = useRef(false);
  const isVisible = useRef(false);
  const rafId = useRef<number>(0);

  const lerp = useCallback((start: number, end: number, factor: number) => {
    return start + (end - start) * factor;
  }, []);

  useEffect(() => {
    // Don't run on touch devices
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const lerpFactor = prefersReduced ? 1 : 0.15;

    const interactiveSelector =
      'a, button, [role="button"], input, textarea, select, [data-cursor="pointer"]';

    function handleMouseMove(e: MouseEvent) {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      if (!isVisible.current) {
        isVisible.current = true;
        dotPos.current = { x: e.clientX, y: e.clientY };
        ringPos.current = { x: e.clientX, y: e.clientY };

        if (dotRef.current) {
          dotRef.current.style.opacity = "1";
        }
        if (ringRef.current) {
          ringRef.current.style.opacity = "1";
        }
      }
    }

    function handleMouseOver(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (target.closest(interactiveSelector)) {
        isHovering.current = true;
        if (ringRef.current) {
          ringRef.current.style.transform = `translate(-50%, -50%) scale(1.5)`;
        }
      }
    }

    function handleMouseOut(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (target.closest(interactiveSelector)) {
        isHovering.current = false;
        if (ringRef.current) {
          ringRef.current.style.transform = `translate(-50%, -50%) scale(1)`;
        }
      }
    }

    function animate() {
      // Dot follows instantly
      dotPos.current.x = mouse.current.x;
      dotPos.current.y = mouse.current.y;

      // Ring follows with delay
      ringPos.current.x = lerp(
        ringPos.current.x,
        mouse.current.x,
        lerpFactor
      );
      ringPos.current.y = lerp(
        ringPos.current.y,
        mouse.current.y,
        lerpFactor
      );

      if (dotRef.current) {
        dotRef.current.style.left = `${dotPos.current.x}px`;
        dotRef.current.style.top = `${dotPos.current.y}px`;
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.current.x}px`;
        ringRef.current.style.top = `${ringPos.current.y}px`;
      }

      rafId.current = requestAnimationFrame(animate);
    }

    // Add custom-cursor class to body
    document.body.classList.add("custom-cursor");

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      document.body.classList.remove("custom-cursor");
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      cancelAnimationFrame(rafId.current);
    };
  }, [lerp]);

  return { dotRef, ringRef };
}
