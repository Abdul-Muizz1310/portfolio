import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frontend Showcase — Abdul-Muizz",
  description:
    "Collection of micro-interaction demos including animated counters, drag-and-drop, theme switching, and responsive previews.",
};

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
