"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

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
LinkedIn: linkedin.com/in/abdulmuizz1310
Dev.to:   dev.to/abdulmuizz1310`,
  "sudo hire-me": () => `Permission granted!
Redirecting to contact page...
Just kidding — but seriously, let's talk: abdulmuizz1310@outlook.com`,
  clear: () => "__CLEAR__",
  coffee: () => `
      ( (
       ) )
    .______.
    |      |]
    \\      /
     '----'
  Here's your coffee!`,
};

export default function TerminalPage() {
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

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

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

      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div
        ref={scrollRef}
        aria-label="Terminal output"
        className="bg-[#0A0A0F] min-h-screen pt-28 pb-7 px-4 sm:px-8 font-mono overflow-y-auto"
        onClick={() => inputRef.current?.focus()}
      >
        <div className="max-w-[900px] mx-auto text-[0.875rem] leading-relaxed" role="log" aria-live="polite">
          {output.map((line, i) => (
            <div key={i} className="mb-1">
              {line.type === "input" ? (
                <p>
                  <span className="text-accent-cyan">visitor@abdul-muizz:~$ </span>
                  <span className="text-foreground">{line.text}</span>
                </p>
              ) : (
                <pre className="text-foreground-muted whitespace-pre-wrap">{line.text}</pre>
              )}
            </div>
          ))}

          <form onSubmit={handleSubmit} className="flex items-center">
            <span className="text-accent-cyan shrink-0">visitor@abdul-muizz:~$ </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-transparent outline-none text-foreground flex-1 ml-1 caret-accent-cyan"
              spellCheck={false}
              autoComplete="off"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
