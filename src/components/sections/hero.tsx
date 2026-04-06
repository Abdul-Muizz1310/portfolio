"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { TerminalTyper } from "@/components/terminal-typer";
import { CodeBlock } from "@/components/code-block";

const heroCommands = [
  { command: "whoami", response: "Abdul-Muizz" },
  { command: "role", response: "Software Engineer · AI/ML · Full-Stack" },
  { command: "location", response: "Islamabad, Pakistan" },
];

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Content */}
      <div className="relative z-10 grid w-full max-w-[1200px] items-center gap-12 px-4 sm:px-8 md:grid-cols-2">
        {/* Left column — terminal + CTAs */}
        <div>
          <TerminalTyper commands={heroCommands} />

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/projects"
              className="gradient-bg inline-flex rounded-full px-6 py-3 font-medium text-white transition-shadow hover:shadow-glow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              View Projects
            </Link>
            <a
              href="/resume.pdf"
              download
              className="inline-flex rounded-full border border-border px-6 py-3 text-foreground-muted transition-colors hover:border-border-bright hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Download Resume
            </a>
          </div>
        </div>

        {/* Right column — photo in code block frame */}
        <div className="mx-auto max-w-sm md:mx-0 md:max-w-none">
          <div className="gradient-border rounded-lg">
            <CodeBlock filename="avatar.jpg" showLineNumbers={false}>
              <Image
                src="/avatar.jpg"
                alt="Abdul-Muizz"
                width={400}
                height={500}
                className="h-auto w-full"
                priority
              />
            </CodeBlock>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2" aria-hidden="true">
        <span className="font-mono text-[0.875rem] text-foreground-faint">
          {"// scroll to continue"}
        </span>
        <ChevronDown className="h-5 w-5 animate-bounce text-foreground-faint" />
      </div>
    </section>
  );
}
