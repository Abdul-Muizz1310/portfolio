"use client";

import { useCursor } from "@/hooks/use-cursor";

export function CustomCursor() {
  const { dotRef, ringRef } = useCursor();

  return (
    <>
      {/* Dot — follows cursor instantly */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[200] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-cyan opacity-0 pointer-events-none"
        aria-hidden="true"
      />
      {/* Ring — follows with delay, scales on hover */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[200] h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent-cyan/50 opacity-0 pointer-events-none transition-transform duration-150 shadow-[0_0_10px_rgba(34,211,238,0.3)]"
        aria-hidden="true"
      />
    </>
  );
}
