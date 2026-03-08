"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  text: string;
}

const PIPELINE_STEPS = [
  { label: "Query", icon: "?" },
  { label: "Embedding", icon: "#" },
  { label: "Retrieval", icon: ">" },
  { label: "LLM", icon: "*" },
  { label: "Response", icon: "=" },
];

const QA_PAIRS: Record<string, string> = {
  "ai": "Abdul-Muizz has extensive experience in AI/ML, including building RAG pipelines, NLP systems, and working with LangChain and LangFlow. He has developed financial RAG chatbots that ingest documents and perform semantic search over them.",
  "rag": "RAG (Retrieval-Augmented Generation) is a technique Abdul-Muizz specializes in. His pipeline: 1) Ingest documents into a vector store, 2) Embed user queries, 3) Retrieve relevant chunks via similarity search, 4) Feed context + query to an LLM for grounded answers. He built this for financial document analysis.",
  "langchain": "Abdul-Muizz uses LangChain extensively for building AI applications. He leverages its document loaders, text splitters, embedding models, vector stores, and chain abstractions to build production-ready RAG systems.",
  "ml": "On the ML side, Abdul-Muizz works with NLP models, embeddings, and vector databases. He focuses on practical applications: document Q&A, semantic search, and intelligent automation rather than pure research.",
  "projects": "Key AI/ML projects include: 1) LangFlow Financial RAG Chatbot — document ingestion + semantic search for financial data, 2) Meeting Transcript Bot — automated meeting transcription and summarization, 3) Web scraping pipelines with intelligent data extraction.",
  "skills": "Core skills: Python, TypeScript, LangChain, RAG pipelines, FastAPI, React/Next.js, Three.js, web scraping (BeautifulSoup, Scrapy, Playwright), Docker, and REST API design.",
  "experience": "Abdul-Muizz is a Software Engineer based in Islamabad, Pakistan, specializing in AI/ML, full-stack development, and Python automation. He builds intelligent systems that combine modern web technologies with AI capabilities.",
  "scraping": "Abdul-Muizz has built web scraping pipelines using Python, BeautifulSoup, Scrapy, and Playwright. His scrapers handle dynamic content, pagination, and export structured data as JSON/CSV/PDF.",
  "backend": "Backend expertise includes FastAPI, Node.js, REST API design, and database management. Abdul-Muizz builds scalable APIs with proper authentication, error handling, and documentation.",
  "frontend": "On the frontend, Abdul-Muizz works with React, Next.js, TypeScript, Tailwind CSS, Three.js, and Framer Motion. This portfolio itself showcases his frontend capabilities with 3D graphics, animations, and responsive design.",
};

function findAnswer(query: string): string {
  const lower = query.toLowerCase();
  for (const [key, value] of Object.entries(QA_PAIRS)) {
    if (lower.includes(key)) {
      return value;
    }
  }
  return "I can answer questions about Abdul-Muizz's AI/ML expertise, RAG pipelines, LangChain, web scraping, backend engineering, and frontend development. Try asking about one of these topics!";
}

export default function AiChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Hi! I'm a simulated RAG assistant. Ask me about Abdul-Muizz's AI/ML expertise, projects, or skills. Try: \"Tell me about RAG pipelines\"",
    },
  ]);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isProcessing) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: trimmed }]);
    setIsProcessing(true);

    const answer = findAnswer(trimmed);

    for (let i = 0; i < PIPELINE_STEPS.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      setActiveStep(i);
    }

    await new Promise((resolve) => setTimeout(resolve, 200));
    setMessages((prev) => [...prev, { role: "assistant", text: answer }]);
    setActiveStep(-1);
    setIsProcessing(false);
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

      <div className="bg-[#0A0A0F] min-h-screen pt-28 pb-32 px-4 sm:px-8">
        <div className="max-w-[800px] mx-auto">
          {/* Pipeline Visualization */}
          <div className="flex items-center justify-center gap-1 sm:gap-2 mb-8 font-mono text-[0.7rem] sm:text-[0.75rem]">
            {PIPELINE_STEPS.map((step, i) => (
              <div key={step.label} className="flex items-center gap-1 sm:gap-2">
                <motion.div
                  className={`px-2 sm:px-3 py-1.5 rounded border transition-colors duration-200 ${
                    activeStep >= i
                      ? "border-accent-cyan bg-accent-cyan/10 text-accent-cyan"
                      : "border-border-bright text-foreground-faint"
                  }`}
                  animate={
                    activeStep === i
                      ? { scale: [1, 1.05, 1] }
                      : { scale: 1 }
                  }
                  transition={{ duration: 0.3 }}
                >
                  <span className="hidden sm:inline">{step.icon} </span>
                  {step.label}
                </motion.div>
                {i < PIPELINE_STEPS.length - 1 && (
                  <span
                    className={`transition-colors duration-200 ${
                      activeStep > i
                        ? "text-accent-cyan"
                        : "text-foreground-faint"
                    }`}
                  >
                    &rarr;
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="space-y-4 overflow-y-auto max-h-[calc(100vh-320px)]"
          >
            <AnimatePresence>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-[75%] rounded-lg px-4 py-3 text-[0.875rem] leading-relaxed ${
                      msg.role === "user"
                        ? "bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/20"
                        : "bg-surface border border-border text-foreground-muted"
                    }`}
                  >
                    {msg.role === "assistant" && (
                      <span className="text-accent-purple text-[0.75rem] font-mono block mb-1">
                        RAG Assistant
                      </span>
                    )}
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isProcessing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-surface border border-border rounded-lg px-4 py-3">
                  <span className="text-accent-purple text-[0.75rem] font-mono block mb-1">
                    RAG Assistant
                  </span>
                  <span className="text-foreground-faint text-[0.875rem] font-mono animate-pulse">
                    Processing pipeline...
                  </span>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0A0A0F] border-t border-border p-4">
        <form
          onSubmit={handleSubmit}
          className="max-w-[800px] mx-auto flex gap-3"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about AI/ML, RAG, projects, skills..."
            className="flex-1 bg-surface border border-border rounded-lg px-4 py-2.5 text-foreground text-[0.875rem] font-mono placeholder:text-foreground-faint outline-none focus:border-accent-cyan transition-colors"
            disabled={isProcessing}
            autoFocus
            spellCheck={false}
          />
          <button
            type="submit"
            disabled={isProcessing || !input.trim()}
            className="bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/30 px-5 py-2.5 rounded-lg text-[0.875rem] font-mono hover:bg-accent-cyan/25 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
