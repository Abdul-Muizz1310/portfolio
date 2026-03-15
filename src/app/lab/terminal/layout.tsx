import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terminal Simulator — Abdul-Muizz",
  description:
    "Interactive terminal emulator with command history, custom commands, and a developer-themed experience.",
};

export default function TerminalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
