"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useKonami } from "@/hooks/use-konami";

interface TerminalLine {
  type: "input" | "output";
  content: string;
}

const HELP_TEXT = `Available commands:
  help      — Show this message
  about     — Learn something about me
  projects  — View featured projects
  matrix    — Enter the Matrix
  hire-me   — Let's work together
  exit      — Close the terminal`;

const ABOUT_TEXT = `> Abdul-Muizz — Software Engineer
> Specializing in AI/ML, Full-Stack Development, and Python Automation
> Based in Islamabad, Pakistan
> Always building, always learning.`;

const PROJECTS_TEXT = `> Featured Projects:
> Check out the /projects page for the full showcase.
> Hint: there might be more easter eggs hidden around...`;

const HIRE_ME_TEXT = `> I'm glad you found this!
> If you're looking for a developer who hides easter eggs in their portfolio,
> you probably want to hire me.
> Let's connect — check the contact section!`;

export function KonamiTerminal() {
  const { isActive, deactivate } = useKonami();
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState("");
  const [isMatrix, setIsMatrix] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Focus input when terminal opens
  useEffect(() => {
    if (isActive) {
      setLines([
        {
          type: "output",
          content:
            "Secret terminal unlocked! Type 'help' for available commands.",
        },
      ]);
      setInput("");
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isActive]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  // Handle Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isActive) {
        deactivate();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isActive, deactivate]);

  const addOutput = useCallback((content: string) => {
    setLines((prev) => [...prev, { type: "output", content }]);
  }, []);

  function handleCommand(cmd: string) {
    const trimmed = cmd.trim().toLowerCase();
    setLines((prev) => [
      ...prev,
      { type: "input", content: `secret@abdul-muizz:~$ ${cmd}` },
    ]);
    setInput("");

    switch (trimmed) {
      case "help":
        addOutput(HELP_TEXT);
        break;
      case "about":
        addOutput(ABOUT_TEXT);
        break;
      case "projects":
        addOutput(PROJECTS_TEXT);
        break;
      case "hire-me":
        addOutput(HIRE_ME_TEXT);
        break;
      case "matrix":
        setIsMatrix(true);
        addOutput("> Entering the Matrix...");
        setTimeout(() => {
          setIsMatrix(false);
          addOutput("> You took the red pill. Welcome back.");
        }, 3000);
        break;
      case "exit":
        deactivate();
        break;
      default:
        addOutput(`Command not found: ${trimmed}. Type 'help' for options.`);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleCommand(input);
    }
  }

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur"
          role="dialog"
          aria-label="Secret terminal"
        >
          {/* Matrix overlay */}
          {isMatrix && <MatrixRain />}

          <div className="mx-4 w-full max-w-2xl">
            {/* Terminal header */}
            <div className="flex items-center justify-between rounded-t-lg border border-accent-cyan/20 bg-surface/80 px-4 py-2">
              <span className="font-mono text-lg text-accent-cyan">
                Secret Terminal Unlocked
              </span>
              <button
                onClick={deactivate}
                className="text-foreground-muted transition-colors hover:text-foreground"
                aria-label="Close terminal"
              >
                [x]
              </button>
            </div>

            {/* Terminal body */}
            <div
              ref={scrollRef}
              className="h-80 overflow-y-auto rounded-b-lg border border-t-0 border-accent-cyan/20 bg-black/80 p-4 font-mono text-sm"
            >
              {lines.map((line, i) => (
                <div
                  key={i}
                  className={`whitespace-pre-wrap ${
                    line.type === "input"
                      ? "text-accent-cyan"
                      : "text-foreground-muted"
                  }`}
                >
                  {line.content}
                </div>
              ))}

              {/* Input line */}
              <div className="mt-1 flex items-center text-accent-cyan">
                <span className="mr-2 shrink-0">secret@abdul-muizz:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 border-none bg-transparent text-accent-cyan outline-none caret-accent-cyan"
                  autoComplete="off"
                  spellCheck={false}
                  aria-label="Terminal input"
                />
              </div>
            </div>

            <p className="mt-2 text-center font-mono text-xs text-foreground-faint">
              Press Esc to close
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Simple matrix rain effect using CSS animation */
function MatrixRain() {
  const columns = 40;
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {Array.from({ length: columns }).map((_, i) => {
        const left = `${(i / columns) * 100}%`;
        const delay = `${Math.random() * 2}s`;
        const duration = `${1.5 + Math.random() * 2}s`;
        const text = Array.from(
          { length: 20 },
          () => chars[Math.floor(Math.random() * chars.length)]
        ).join("\n");

        return (
          <span
            key={i}
            className="absolute top-0 font-mono text-xs text-green-400/70"
            style={{
              left,
              animation: `matrixFall ${duration} ${delay} linear infinite`,
              whiteSpace: "pre",
            }}
          >
            {text}
          </span>
        );
      })}
      <style>{`
        @keyframes matrixFall {
          0% { transform: translateY(-100%); opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}
