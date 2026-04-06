"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const JOKES = [
  "I checked under the couch. Just dust and a sock.",
  "404: page went out for coffee. Hasn't come back. Send help.",
  "I asked the server. It just shrugged in TCP.",
  "We tried turning the universe off and on again. No dice.",
  "Even Stack Overflow doesn't have an answer for this one.",
  "This URL is in another castle. (Sorry, Mario.)",
  "git blame says it was definitely not me.",
  "The page you seek has achieved enlightenment and left this plane.",
];

export default function NotFound() {
  const [joke, setJoke] = useState(JOKES[0]);
  const [path, setPath] = useState("/the-void");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Intentional: hydration-safe randomization on client mount
    setJoke(JOKES[Math.floor(Math.random() * JOKES.length)]);
    setPath(window.location.pathname);
  }, []);

  return (
    <section className="relative flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        <div className="overflow-hidden rounded-lg border border-border bg-surface/80 shadow-lg backdrop-blur-md">
          {/* Window chrome */}
          <div className="flex items-center gap-2 border-b border-border bg-surface px-4 py-2.5">
            <span className="h-3 w-3 rounded-full bg-red-500/80" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <span className="h-3 w-3 rounded-full bg-green-500/80" />
            <span className="ml-2 font-mono text-[0.75rem] text-foreground-faint">
              fatal_error.sh — 404
            </span>
          </div>

          {/* Body */}
          <div className="space-y-4 bg-[#0A0A0F] p-6 font-mono text-[0.875rem] leading-relaxed">
            <p>
              <span className="text-accent-cyan">visitor@abdul-muizz:~$ </span>
              <span className="text-foreground">cd {path}</span>
            </p>
            <p className="text-error">
              bash: cd: that page: No such file or directory
            </p>

            <pre className="whitespace-pre-wrap text-accent-purple">
{`   _  _    ___  _  _
  | || |  / _ \\| || |
  | || |_| | | | || |_
  |__   _| | | |__   _|
     | | | |_| |  | |
     |_|  \\___/   |_|`}
            </pre>

            <p className="text-foreground-muted">
              <span className="text-warning">warning: </span>
              {joke}
            </p>

            <p>
              <span className="text-accent-cyan">visitor@abdul-muizz:~$ </span>
              <span className="text-foreground">ls /safe-places</span>
            </p>
            <ul className="ml-4 space-y-1 text-foreground-muted">
              <li>
                <Link href="/" className="text-accent-cyan hover:underline">
                  ./home
                </Link>{" "}
                <span className="text-foreground-faint">— start here, mate</span>
              </li>
              <li>
                <Link href="/projects" className="text-accent-cyan hover:underline">
                  ./projects
                </Link>{" "}
                <span className="text-foreground-faint">— things i built</span>
              </li>
              <li>
                <Link href="/about" className="text-accent-cyan hover:underline">
                  ./about
                </Link>{" "}
                <span className="text-foreground-faint">— the human behind the keyboard</span>
              </li>
              <li>
                <Link href="/contact" className="text-accent-cyan hover:underline">
                  ./contact
                </Link>{" "}
                <span className="text-foreground-faint">— say hi (no 404s here)</span>
              </li>
            </ul>

            <p className="pt-2">
              <span className="text-accent-cyan">visitor@abdul-muizz:~$ </span>
              <span className="inline-block h-4 w-2 animate-pulse bg-accent-cyan align-middle" />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
