import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "API Playground — Abdul-Muizz",
  description:
    "Interactive REST API playground for exploring mock API endpoints and responses.",
};

export default function ApiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
