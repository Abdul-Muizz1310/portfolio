"use client";

import { useActionState } from "react";
import { Github, Linkedin, FileText, Mail } from "lucide-react";
import { PageTransition } from "@/components/page-transition";
import { SectionHeader } from "@/components/section-header";
import { sendContactMessage } from "@/app/contact/action";
import { SITE_CONFIG } from "@/lib/constants";

const initialState = { success: false, message: "" };

const SOCIAL_LINKS = [
  {
    icon: Github,
    label: "github.com/Abdul-Muizz1310",
    href: SITE_CONFIG.github,
    external: true,
  },
  {
    icon: Linkedin,
    label: "linkedin.com/in/abdulmuizz1310",
    href: SITE_CONFIG.linkedin,
    external: true,
  },
  {
    icon: FileText,
    label: "dev.to/abdulmuizz1310",
    href: SITE_CONFIG.devto,
    external: true,
  },
  {
    icon: Mail,
    label: SITE_CONFIG.email,
    href: `mailto:${SITE_CONFIG.email}`,
    external: false,
  },
];

export default function ContactPage() {
  const [state, formAction, isPending] = useActionState(
    sendContactMessage,
    initialState,
  );

  return (
    <PageTransition>
      <div className="mx-auto max-w-[1200px] px-4 py-20 sm:px-8">
        <SectionHeader command="$ ping abdul-muizz" />

        <div className="mt-8 grid grid-cols-1 gap-12 md:grid-cols-[1fr_auto]">
          {/* Contact Form */}
          <div className="rounded-lg border border-border bg-surface p-6 max-w-xl">
            <form action={formAction} className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="font-mono text-[0.875rem] text-foreground-muted"
                >
                  name:
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="mt-1 w-full border-b border-border bg-transparent py-2 font-mono text-foreground outline-none focus:border-accent-cyan"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="font-mono text-[0.875rem] text-foreground-muted"
                >
                  email:
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-1 w-full border-b border-border bg-transparent py-2 font-mono text-foreground outline-none focus:border-accent-cyan"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="font-mono text-[0.875rem] text-foreground-muted"
                >
                  subject:
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  className="mt-1 w-full border-b border-border bg-transparent py-2 font-mono text-foreground outline-none focus:border-accent-cyan"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="font-mono text-[0.875rem] text-foreground-muted"
                >
                  message:
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="mt-1 w-full border-b border-border bg-transparent py-2 font-mono text-foreground outline-none resize-none focus:border-accent-cyan"
                />
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="gradient-bg mt-6 rounded-full px-6 py-2 font-mono font-medium text-white transition-shadow hover:shadow-glow-lg disabled:opacity-50"
              >
                {isPending ? "$ sending..." : "$ send --message"}
              </button>

              {state.message && (
                <p
                  className={`font-mono text-[0.875rem] ${
                    state.success ? "text-success" : "text-error"
                  }`}
                >
                  {state.success ? "\u2713" : "\u2717"} {state.message}
                </p>
              )}
            </form>
          </div>

          {/* Social Links */}
          <div className="mt-0 md:mt-0">
            <div className="space-y-3">
              {SOCIAL_LINKS.map((link) => (
                <div key={link.href} className="flex items-center gap-3">
                  <span className="text-foreground-faint">&rarr;</span>
                  <link.icon className="h-4 w-4 text-foreground-muted" />
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="font-mono text-accent-cyan hover:underline"
                  >
                    {link.label}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
