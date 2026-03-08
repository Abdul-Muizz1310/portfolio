"use client";

import { useState, useEffect } from "react";

interface TerminalCommand {
  command: string;
  response: string;
}

interface TerminalTyperProps {
  commands: TerminalCommand[];
  typingSpeed?: number;
  pauseBetween?: number;
  className?: string;
}

export function TerminalTyper({
  commands,
  typingSpeed = 60,
  pauseBetween = 300,
  className,
}: TerminalTyperProps) {
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [showResponse, setShowResponse] = useState(false);
  const [completedCommands, setCompletedCommands] = useState<number[]>([]);
  const [allDone, setAllDone] = useState(false);

  useEffect(() => {
    if (allDone || currentCommandIndex >= commands.length) {
      setAllDone(true);
      return;
    }

    const currentCommand = commands[currentCommandIndex];

    if (!showResponse && currentCharIndex < currentCommand.command.length) {
      const timeout = setTimeout(() => {
        setCurrentCharIndex((prev) => prev + 1);
      }, typingSpeed);
      return () => clearTimeout(timeout);
    }

    if (!showResponse && currentCharIndex >= currentCommand.command.length) {
      const timeout = setTimeout(() => {
        setShowResponse(true);
      }, pauseBetween);
      return () => clearTimeout(timeout);
    }

    if (showResponse) {
      const timeout = setTimeout(() => {
        setCompletedCommands((prev) => [...prev, currentCommandIndex]);
        setCurrentCommandIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
        setShowResponse(false);
      }, pauseBetween);
      return () => clearTimeout(timeout);
    }
  }, [
    currentCommandIndex,
    currentCharIndex,
    showResponse,
    allDone,
    commands,
    typingSpeed,
    pauseBetween,
  ]);

  return (
    <div className={`font-mono text-[0.875rem] leading-relaxed ${className ?? ""}`}>
      {completedCommands.map((idx) => (
        <div key={`completed-${idx}`}>
          <div>
            <span className="text-foreground-muted">$ </span>
            <span className="text-foreground-muted">{commands[idx].command}</span>
          </div>
          <div>
            <span className="text-accent-cyan">&gt; </span>
            <span className="text-foreground">{commands[idx].response}</span>
          </div>
        </div>
      ))}

      {!allDone && currentCommandIndex < commands.length && (
        <div>
          <div>
            <span className="text-foreground-muted">$ </span>
            <span className="text-foreground-muted">
              {commands[currentCommandIndex].command.slice(0, currentCharIndex)}
            </span>
            {!showResponse && (
              <span className="animate-pulse text-foreground">&#9610;</span>
            )}
          </div>
          {showResponse && (
            <div>
              <span className="text-accent-cyan">&gt; </span>
              <span className="text-foreground">
                {commands[currentCommandIndex].response}
              </span>
            </div>
          )}
        </div>
      )}

      {allDone && (
        <div>
          <span className="text-foreground-muted">$ </span>
          <span className="animate-pulse text-foreground">&#9610;</span>
        </div>
      )}
    </div>
  );
}
