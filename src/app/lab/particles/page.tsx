"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ParticlePlaygroundScene } from "@/components/three/particle-playground-scene";

const COLORS = ["#22D3EE", "#3B82F6", "#8B5CF6"];
const COLOR_NAMES = ["Cyan", "Blue", "Purple"];

export default function ParticlesPage() {
  const [count, setCount] = useState(120);
  const [colorIndex, setColorIndex] = useState(0);
  const [gravity, setGravity] = useState(false);

  return (
    <div className="min-h-screen relative">
      <div className="fixed top-16 left-0 right-0 z-40 bg-surface/80 backdrop-blur border-b border-border h-12 flex items-center justify-between px-4 sm:px-8">
        <Link
          href="/lab"
          className="flex items-center gap-2 text-foreground-muted hover:text-foreground transition-colors text-[0.875rem]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Lab
        </Link>

        <div className="flex items-center gap-4 text-[0.75rem]">
          <label className="flex items-center gap-2 text-foreground-muted">
            <span className="hidden sm:inline">Particles:</span>
            <span className="font-mono text-foreground">{count}</span>
            <input
              type="range"
              min={50}
              max={200}
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="w-20 accent-accent-cyan"
            />
          </label>

          <button
            onClick={() => setColorIndex((prev) => (prev + 1) % COLORS.length)}
            className="flex items-center gap-1.5 text-foreground-muted hover:text-foreground transition-colors"
          >
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: COLORS[colorIndex] }}
            />
            <span className="hidden sm:inline">{COLOR_NAMES[colorIndex]}</span>
          </button>

          <button
            onClick={() => setGravity((prev) => !prev)}
            className={`px-2 py-0.5 rounded-sm transition-colors ${
              gravity
                ? "bg-accent-cyan-soft text-accent-cyan"
                : "text-foreground-muted hover:text-foreground"
            }`}
          >
            Gravity {gravity ? "ON" : "OFF"}
          </button>
        </div>
      </div>

      <ParticlePlaygroundScene
        count={count}
        color={COLORS[colorIndex]}
        gravity={gravity}
        className="w-full h-screen pt-28"
      />
    </div>
  );
}
