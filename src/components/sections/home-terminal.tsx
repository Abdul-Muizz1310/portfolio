"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { SectionHeader } from "@/components/section-header";

interface OutputLine {
  type: "input" | "output";
  text: string;
}

const commands: Record<string, () => string> = {
  help: () => `Available commands:
  help     - Show this help message
  about    - About Abdul-Muizz
  projects - List projects
  skills   - Show skills
  contact  - Contact information
  socials  - Find me online
  sudo hire-me - Try it and see
  clear    - Clear terminal
  coffee   - Need a break?

Tip: press Tab to autocomplete · Ctrl+/ to focus from anywhere`,
  about: () => `Abdul-Muizz — Software Engineer
Based in Islamabad, Pakistan
Specializing in AI/ML, Full-Stack Development, and Python Automation`,
  projects: () => `~/projects/
├── LangFlow-Financial-RAG-Chatbot  [Python]
├── Meeting-Transcript-Bot          [Python]
└── Website-Scrapper-pdf            [Python]

Visit /projects for more details.`,
  skills: () => `Languages:  Python, TypeScript, JavaScript
AI/ML:      LangChain, LangGraph, RAG, NLP
Frontend:   React, Next.js, Tailwind CSS
Backend:    FastAPI, Node.js, Express
Databases:  PostgreSQL, MongoDB
Tools:      Git, Docker, AWS, Redis, Celery`,
  contact: () => `Email:    abdulmuizz1310@outlook.com
Form:     /contact
Response: ~24h`,
  socials: () => `GitHub:   github.com/Abdul-Muizz1310
LinkedIn: linkedin.com/in/abdulmuizz1310`,
  "sudo hire-me": () => `[sudo] password for visitor: ********
Permission granted ✓
Opening secure channel to abdulmuizz1310@outlook.com...
Seriously though — let's talk. /contact`,
  clear: () => `__CLEAR__`,
  coffee: () => `
      ( (
       ) )
    .______.
    |      |]
    \\      /
     '----'
  Here's your coffee! ☕`,
};

const SUGGESTIONS = ["help", "about", "projects", "skills", "contact", "socials", "coffee"];

export function HomeTerminal() {
  const [output, setOutput] = useState<OutputLine[]>([
    {
      type: "output",
      text: 'Welcome to Abdul-Muizz\'s terminal. Type "help" or click a chip below.',
    },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollState, setScrollState] = useState({ progress: 0, hasOverflow: false, atTop: true, atBottom: true });

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    const hasOverflow = max > 4;
    setScrollState({
      progress: hasOverflow ? el.scrollTop / max : 0,
      hasOverflow,
      atTop: el.scrollTop <= 2,
      atBottom: !hasOverflow || el.scrollTop >= max - 2,
    });
  }, []);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
    updateScrollState();
  }, [output, scrollToBottom, updateScrollState]);

  // Global keyboard shortcut: Ctrl+/ focuses the terminal
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "/") {
        e.preventDefault();
        inputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const runCommand = useCallback((raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) return;

    setHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const handler = commands[trimmed.toLowerCase()];

    if (handler) {
      const result = handler();
      if (result === "__CLEAR__") {
        setOutput([]);
      } else {
        setOutput((prev) => [
          ...prev,
          { type: "input", text: trimmed },
          { type: "output", text: result },
        ]);
      }
    } else {
      setOutput((prev) => [
        ...prev,
        { type: "input", text: trimmed },
        {
          type: "output",
          text: `Command not found: ${trimmed}. Type 'help' for available commands.`,
        },
      ]);
    }

    setInput("");
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runCommand(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const partial = input.trim().toLowerCase();
      if (!partial) return;
      const match = Object.keys(commands).find((c) => c.startsWith(partial));
      if (match) setInput(match);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const newIndex =
        historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(newIndex);
      setInput(history[newIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      const newIndex = historyIndex + 1;
      if (newIndex >= history.length) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    }
  };

  return (
    <section className="mx-auto max-w-[1200px] px-4 py-20 sm:px-8">
      <SectionHeader command="~/terminal" />

      {/* Suggestion chips — instantly run any command */}
      <div className="mt-6 flex flex-wrap gap-2">
        {SUGGESTIONS.map((cmd) => (
          <button
            key={cmd}
            type="button"
            onClick={() => runCommand(cmd)}
            className="rounded-full border border-border bg-surface/60 px-3 py-1 font-mono text-[0.75rem] text-foreground-muted backdrop-blur-md transition-all duration-200 hover:border-accent-cyan hover:text-accent-cyan hover:shadow-glow"
          >
            $ {cmd}
          </button>
        ))}
      </div>

      <div className="mt-4 overflow-hidden rounded-lg border border-border shadow-lg relative">
        {/* Terminal header */}
        <div className="flex items-center gap-2 border-b border-border bg-surface px-4 py-2.5">
          <span className="h-3 w-3 rounded-full bg-red-500/80" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <span className="h-3 w-3 rounded-full bg-green-500/80" />
          <span className="ml-2 font-mono text-[0.75rem] text-foreground-faint">
            visitor@abdul-muizz:~
          </span>
          <span className="ml-auto hidden font-mono text-[0.7rem] text-foreground-faint sm:inline">
            Ctrl+/ to focus · Tab to complete
          </span>
        </div>

        {/* Terminal body */}
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
        <div
          ref={scrollRef}
          className="no-scrollbar relative h-[400px] overflow-y-auto bg-[#0A0A0F]/95 p-4 font-mono text-[0.875rem] leading-relaxed backdrop-blur-md scroll-smooth"
          onClick={() => inputRef.current?.focus()}
          onScroll={updateScrollState}
        >
          <div role="log" aria-live="polite">
            {output.map((line, i) => (
              <div key={i} className="mb-1">
                {line.type === "input" ? (
                  <p>
                    <span className="text-accent-cyan">visitor@abdul-muizz:~$ </span>
                    <span className="text-foreground">{line.text}</span>
                  </p>
                ) : (
                  <pre className="whitespace-pre-wrap text-foreground-muted">{line.text}</pre>
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex items-center">
            <span className="shrink-0 text-accent-cyan">visitor@abdul-muizz:~$ </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="ml-1 flex-1 bg-transparent text-foreground caret-accent-cyan outline-none"
              spellCheck={false}
              autoComplete="off"
              aria-label="Terminal input"
            />
          </form>
        </div>

        {/* Top fade — only when scrolled down */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute left-0 right-0 top-[41px] h-8 bg-gradient-to-b from-[#0A0A0F] to-transparent transition-opacity duration-200 ${
            scrollState.atTop ? "opacity-0" : "opacity-100"
          }`}
        />
        {/* Bottom fade — only when not at bottom */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#0A0A0F] to-transparent transition-opacity duration-200 ${
            scrollState.atBottom ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* Interactive scroll progress rail — click to jump */}
        {scrollState.hasOverflow && (
          <button
            type="button"
            aria-label="Scroll terminal"
            onClick={(e) => {
              const el = scrollRef.current;
              if (!el) return;
              const rect = e.currentTarget.getBoundingClientRect();
              const ratio = (e.clientY - rect.top) / rect.height;
              el.scrollTo({ top: ratio * (el.scrollHeight - el.clientHeight), behavior: "smooth" });
            }}
            className="absolute right-1.5 top-[49px] bottom-2 w-1 rounded-full bg-border/40 transition-colors hover:bg-border-bright"
          >
            <span
              className="block w-full rounded-full bg-gradient-to-b from-accent-cyan via-accent-blue to-accent-purple shadow-glow transition-all duration-150"
              style={{
                height: "24%",
                transform: `translateY(${scrollState.progress * 316}%)`,
              }}
            />
          </button>
        )}

        {/* Scroll-to-bottom button — appears when not at bottom */}
        {!scrollState.atBottom && (
          <button
            type="button"
            onClick={scrollToBottom}
            aria-label="Scroll to latest"
            className="absolute bottom-4 right-6 rounded-full border border-border-bright bg-surface/90 px-3 py-1 font-mono text-[0.7rem] text-accent-cyan backdrop-blur-md transition-all hover:shadow-glow"
          >
            ↓ latest
          </button>
        )}
      </div>
    </section>
  );
}
