import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Chat Lab — Abdul-Muizz",
  description:
    "Interactive RAG chatbot demo showcasing retrieval-augmented generation pipeline visualization.",
};

export default function AiChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
