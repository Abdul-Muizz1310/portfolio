"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion, useSpring, useTransform } from "framer-motion";

/* ─────────────── Animated Counter ─────────────── */
function AnimatedCounter() {
  const [target, setTarget] = useState(0);
  const spring = useSpring(0, { stiffness: 50, damping: 15 });
  const display = useTransform(spring, (v) => Math.round(v));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const unsubscribe = display.on("change", (v) => {
      setDisplayValue(v);
    });
    return unsubscribe;
  }, [display]);

  const increment = (amount: number) => {
    const newTarget = target + amount;
    setTarget(newTarget);
    spring.set(newTarget);
  };

  return (
    <div className="text-center">
      <motion.div className="text-[3rem] font-bold font-mono text-accent-cyan mb-4 leading-none">
        {displayValue}
      </motion.div>
      <div className="flex gap-2 justify-center">
        {[1, 10, 100].map((n) => (
          <button
            key={n}
            onClick={() => increment(n)}
            className="bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20 px-3 py-1.5 rounded text-[0.8rem] font-mono hover:bg-accent-cyan/20 transition-colors"
          >
            +{n}
          </button>
        ))}
        <button
          onClick={() => {
            setTarget(0);
            spring.set(0);
          }}
          className="bg-error/10 text-error border border-error/20 px-3 py-1.5 rounded text-[0.8rem] font-mono hover:bg-error/20 transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

/* ─────────────── Drag & Drop ─────────────── */
function DragAndDrop() {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const items = [
    { id: 1, label: "React", color: "accent-cyan" },
    { id: 2, label: "Next.js", color: "accent-blue" },
    { id: 3, label: "TypeScript", color: "accent-purple" },
    { id: 4, label: "Tailwind", color: "accent-cyan" },
  ];

  return (
    <div
      ref={constraintsRef}
      className="relative h-[160px] bg-[#0A0A0F] rounded-lg border border-border overflow-hidden"
    >
      <p className="absolute top-2 left-3 text-[0.65rem] text-foreground-faint font-mono">
        Drag the cards around
      </p>
      {items.map((item, i) => (
        <motion.div
          key={item.id}
          drag
          dragConstraints={constraintsRef}
          dragElastic={0.1}
          whileDrag={{ scale: 1.1, zIndex: 10 }}
          whileHover={{ scale: 1.05 }}
          className={`absolute cursor-grab active:cursor-grabbing bg-${item.color}/15 text-${item.color} border border-${item.color}/25 px-3 py-1.5 rounded text-[0.8rem] font-mono select-none`}
          style={{
            top: `${30 + Math.floor(i / 2) * 50}px`,
            left: `${20 + (i % 2) * 120}px`,
          }}
        >
          {item.label}
        </motion.div>
      ))}
    </div>
  );
}

/* ─────────────── Theme Switcher ─────────────── */
const THEMES = [
  {
    name: "Cyan",
    bg: "#0A0A0F",
    primary: "#22D3EE",
    secondary: "#164e63",
    text: "#e2e8f0",
  },
  {
    name: "Purple",
    bg: "#0F0A1A",
    primary: "#8B5CF6",
    secondary: "#4c1d95",
    text: "#e2e8f0",
  },
  {
    name: "Green",
    bg: "#0A0F0A",
    primary: "#10B981",
    secondary: "#064e3b",
    text: "#e2e8f0",
  },
  {
    name: "Amber",
    bg: "#0F0D0A",
    primary: "#F59E0B",
    secondary: "#78350f",
    text: "#e2e8f0",
  },
];

function ThemeSwitcher() {
  const [activeTheme, setActiveTheme] = useState(0);
  const theme = THEMES[activeTheme];

  return (
    <div>
      <div className="flex gap-2 mb-3">
        {THEMES.map((t, i) => (
          <button
            key={t.name}
            onClick={() => setActiveTheme(i)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[0.75rem] font-mono border transition-colors ${
              activeTheme === i
                ? "border-foreground-muted text-foreground"
                : "border-border text-foreground-faint hover:text-foreground-muted"
            }`}
          >
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: t.primary }}
            />
            {t.name}
          </button>
        ))}
      </div>
      <motion.div
        layout
        className="rounded-lg p-4 border transition-all duration-300"
        style={{
          backgroundColor: theme.bg,
          borderColor: theme.primary + "30",
        }}
      >
        <div
          className="text-[0.9rem] font-mono font-semibold mb-2"
          style={{ color: theme.primary }}
        >
          {theme.name} Theme Preview
        </div>
        <div
          className="text-[0.8rem] mb-3"
          style={{ color: theme.text + "99" }}
        >
          A sample card with this color palette.
        </div>
        <div className="flex gap-2">
          <span
            className="px-3 py-1 rounded text-[0.75rem] font-mono"
            style={{
              backgroundColor: theme.primary + "20",
              color: theme.primary,
            }}
          >
            Primary
          </span>
          <span
            className="px-3 py-1 rounded text-[0.75rem] font-mono"
            style={{
              backgroundColor: theme.secondary + "40",
              color: theme.text,
            }}
          >
            Secondary
          </span>
        </div>
      </motion.div>
    </div>
  );
}

/* ─────────────── Micro-interactions ─────────────── */
function MicroInteractions() {
  const [clicked, setClicked] = useState<number | null>(null);

  const buttons = [
    { label: "Bounce", animation: { scale: [1, 1.3, 0.9, 1.05, 1] } },
    { label: "Shake", animation: { x: [0, -8, 8, -5, 5, 0] } },
    { label: "Spin", animation: { rotate: [0, 360] } },
    { label: "Pulse", animation: { scale: [1, 1.15, 1, 1.1, 1] } },
  ];

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {buttons.map((btn, i) => (
        <motion.button
          key={btn.label}
          onClick={() => setClicked(i)}
          animate={clicked === i ? btn.animation : {}}
          onAnimationComplete={() => setClicked(null)}
          transition={{ duration: 0.4 }}
          whileHover={{ scale: 1.05 }}
          className="bg-accent-purple/10 text-accent-purple border border-accent-purple/25 px-4 py-2 rounded-lg text-[0.85rem] font-mono hover:bg-accent-purple/20 transition-colors"
        >
          {btn.label}
        </motion.button>
      ))}
    </div>
  );
}

/* ─────────────── Responsive Preview ─────────────── */
const VIEWPORTS = [
  { name: "Mobile", width: "120px", icon: "375px" },
  { name: "Tablet", width: "200px", icon: "768px" },
  { name: "Desktop", width: "100%", icon: "1440px" },
];

function ResponsivePreview() {
  const [viewport, setViewport] = useState(2);
  const vp = VIEWPORTS[viewport];

  return (
    <div>
      <div className="flex gap-2 mb-3 justify-center">
        {VIEWPORTS.map((v, i) => (
          <button
            key={v.name}
            onClick={() => setViewport(i)}
            className={`px-2.5 py-1 rounded text-[0.75rem] font-mono border transition-colors ${
              viewport === i
                ? "border-accent-blue text-accent-blue bg-accent-blue/10"
                : "border-border text-foreground-faint hover:text-foreground-muted"
            }`}
          >
            {v.name}
            <span className="text-foreground-faint ml-1 text-[0.65rem]">
              {v.icon}
            </span>
          </button>
        ))}
      </div>
      <div className="flex justify-center">
        <motion.div
          layout
          className="bg-[#0A0A0F] border border-border rounded-lg overflow-hidden"
          animate={{ width: vp.width }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Browser Chrome */}
          <div className="bg-surface-hover border-b border-border px-3 py-1.5 flex items-center gap-2">
            <div className="flex gap-1">
              <span className="h-2 w-2 rounded-full bg-error/60" />
              <span className="h-2 w-2 rounded-full bg-warning/60" />
              <span className="h-2 w-2 rounded-full bg-success/60" />
            </div>
            <span className="text-[0.6rem] text-foreground-faint font-mono truncate">
              portfolio.dev
            </span>
          </div>
          {/* Mini Page */}
          <div className="p-3 space-y-2">
            <div className="h-2 w-3/4 bg-accent-cyan/20 rounded" />
            <div className="h-1.5 w-full bg-foreground-faint/10 rounded" />
            <div className="h-1.5 w-5/6 bg-foreground-faint/10 rounded" />
            <div className="flex gap-1 mt-2">
              <div className="h-8 flex-1 bg-accent-blue/10 rounded" />
              <div className="h-8 flex-1 bg-accent-purple/10 rounded" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ─────────────── Main Page ─────────────── */
interface DemoCardProps {
  title: string;
  children: React.ReactNode;
}

function DemoCard({ title, children }: DemoCardProps) {
  return (
    <div className="bg-surface border border-border rounded-lg p-5">
      <h3 className="text-[0.75rem] text-foreground-faint font-mono mb-4 uppercase tracking-spaced">
        {title}
      </h3>
      {children}
    </div>
  );
}

export default function FrontendPage() {
  return (
    <div className="min-h-screen relative">
      <div className="fixed top-16 left-0 right-0 z-40 bg-surface/80 backdrop-blur border-b border-border h-12 flex items-center px-4 sm:px-8">
        <Link
          href="/lab"
          className="flex items-center gap-2 text-foreground-muted hover:text-foreground transition-colors text-[0.875rem]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Lab
        </Link>
      </div>

      <div className="bg-[#0A0A0F] min-h-screen pt-28 pb-8 px-4 sm:px-8">
        <div className="max-w-[900px] mx-auto space-y-5">
          <DemoCard title="Animated Counter — Spring Physics">
            <AnimatedCounter />
          </DemoCard>

          <DemoCard title="Drag & Drop — Draggable Elements">
            <DragAndDrop />
          </DemoCard>

          <DemoCard title="Theme Switcher — Live Color Palettes">
            <ThemeSwitcher />
          </DemoCard>

          <DemoCard title="Micro-interactions — Click Animations">
            <MicroInteractions />
          </DemoCard>

          <DemoCard title="Responsive Preview — Viewport Sizes">
            <ResponsivePreview />
          </DemoCard>
        </div>
      </div>
    </div>
  );
}
