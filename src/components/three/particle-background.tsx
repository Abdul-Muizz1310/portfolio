"use client";

import dynamic from "next/dynamic";

const ParticleField = dynamic(
  () => import("./particle-field").then((m) => m.ParticleField),
  { ssr: false },
);

export function ParticleBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10"
    >
      <ParticleField className="absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background/95" />
    </div>
  );
}
