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
  sudo hire-me - Try it and see
  clear    - Clear terminal
  coffee   - Need a break?`,
  about: () => `Abdul-Muizz — Software Engineer
Based in Islamabad, Pakistan
Specializing in AI/ML, Full-Stack Development, and Python Automation`,
  projects: () => `~/projects/
├── LangFlow-Financial-RAG-Chatbot  [Python]
├── Meeting-Transcript-Bot          [Python]
└── Website-Scrapper-pdf            [Python]

Visit /projects for more details.`,
  skills: () => `Languages:  Python, TypeScript, JavaScript
AI/ML:      LangChain, RAG, NLP, LangFlow
Frontend:   React, Next.js, Tailwind CSS
Backend:    FastAPI, Node.js, REST APIs
Tools:      Git, Docker, VS Code`,
  contact: () => `Email:    abdulmuizz1310@outlook.com
GitHub:   github.com/Abdul-Muizz1310
LinkedIn: linkedin.com/in/abdulmuizz1310`,
  "sudo hire-me": () => `Permission granted!
Redirecting to contact page...
Just kidding — but seriously, let's talk: abdulmuizz1310@outlook.com`,
  clear: () => `__CLEAR__`,
  coffee: () => `
      ( (
       ) )
    .______.
    |      |]
    \\      /
     '----'
  Here's your coffee!`,
};

export function HomeTerminal() {
  const [output, setOutput] = useState<OutputLine[]>([
    {
      type: "output",
      text: 'Welcome to Abdul-Muizz\'s terminal. Type "help" to get started.',
    },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [output, scrollToBottom]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const newHistory = [...history, trimmed];
    setHistory(newHistory);
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
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
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

      <div className="mt-8 overflow-hidden rounded-lg border border-border">
        {/* Terminal header */}
        <div className="flex items-center gap-2 border-b border-border bg-surface px-4 py-2.5">
          <span className="h-3 w-3 rounded-full bg-red-500/80" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <span className="h-3 w-3 rounded-full bg-green-500/80" />
          <span className="ml-2 font-mono text-[0.75rem] text-foreground-faint">
            visitor@abdul-muizz:~
          </span>
        </div>

        {/* Terminal body */}
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
        <div
          ref={scrollRef}
          className="h-[360px] overflow-y-auto bg-[#0A0A0F] p-4 font-mono text-[0.875rem] leading-relaxed"
          onClick={() => inputRef.current?.focus()}
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
      </div>
    </section>
  );
}
