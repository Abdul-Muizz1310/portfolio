import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Particle Playground — Abdul-Muizz",
  description:
    "Interactive 3D particle system with configurable count, color, and gravity using Three.js and React Three Fiber.",
};

export default function ParticlesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
