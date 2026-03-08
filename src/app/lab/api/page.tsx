"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface ApiResponse {
  status: number;
  statusText: string;
  time: string;
  headers: Record<string, string>;
  body: unknown;
}

const METHODS: HttpMethod[] = ["GET", "POST", "PUT", "DELETE"];

const METHOD_COLORS: Record<HttpMethod, string> = {
  GET: "text-success",
  POST: "text-accent-blue",
  PUT: "text-warning",
  DELETE: "text-error",
};

const ENDPOINTS: Record<string, Record<string, ApiResponse>> = {
  "GET /api/users/abdul-muizz": {
    response: {
      status: 200,
      statusText: "OK",
      time: "47ms",
      headers: {
        "Content-Type": "application/json",
        "X-Request-Id": "req_a7f3b2c1",
        "Cache-Control": "max-age=3600",
      },
      body: {
        id: "usr_001",
        name: "Abdul-Muizz",
        role: "Software Engineer",
        location: "Islamabad, Pakistan",
        specializations: ["AI/ML", "Full-Stack Development", "Python Automation"],
        github: "github.com/Abdul-Muizz1310",
        available_for_hire: true,
      },
    },
  },
  "GET /api/projects": {
    response: {
      status: 200,
      statusText: "OK",
      time: "63ms",
      headers: {
        "Content-Type": "application/json",
        "X-Request-Id": "req_d4e5f6a7",
        "X-Total-Count": "3",
      },
      body: {
        projects: [
          {
            id: 1,
            name: "LangFlow Financial RAG Chatbot",
            tech: ["Python", "LangChain", "LangFlow"],
            status: "completed",
          },
          {
            id: 2,
            name: "Meeting Transcript Bot",
            tech: ["Python", "NLP", "FastAPI"],
            status: "completed",
          },
          {
            id: 3,
            name: "Web Scraper Pipeline",
            tech: ["Python", "Scrapy", "BeautifulSoup"],
            status: "completed",
          },
        ],
        total: 3,
      },
    },
  },
  "GET /api/skills": {
    response: {
      status: 200,
      statusText: "OK",
      time: "31ms",
      headers: {
        "Content-Type": "application/json",
        "X-Request-Id": "req_b8c9d0e1",
      },
      body: {
        languages: ["Python", "TypeScript", "JavaScript"],
        ai_ml: ["LangChain", "RAG", "NLP", "LangFlow"],
        frontend: ["React", "Next.js", "Tailwind CSS", "Three.js"],
        backend: ["FastAPI", "Node.js", "REST APIs"],
        tools: ["Git", "Docker", "VS Code", "Playwright"],
      },
    },
  },
  "POST /api/contact": {
    response: {
      status: 201,
      statusText: "Created",
      time: "89ms",
      headers: {
        "Content-Type": "application/json",
        "X-Request-Id": "req_f2a3b4c5",
      },
      body: {
        success: true,
        message: "Message received! Abdul-Muizz will get back to you soon.",
        ticket_id: "tkt_2024_0042",
      },
    },
  },
};

const REQUEST_HEADERS = {
  Authorization: "Bearer sk_demo_***",
  "Content-Type": "application/json",
  Accept: "application/json",
};

const SUGGESTED_ENDPOINTS = [
  "/api/users/abdul-muizz",
  "/api/projects",
  "/api/skills",
  "/api/contact",
];

export default function ApiPage() {
  const [method, setMethod] = useState<HttpMethod>("GET");
  const [endpoint, setEndpoint] = useState("/api/users/abdul-muizz");
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (isLoading) return;
    setIsLoading(true);
    setResponse(null);

    await new Promise((r) => setTimeout(r, 400 + Math.random() * 300));

    const key = `${method} ${endpoint}`;
    const match = ENDPOINTS[key];

    if (match) {
      setResponse(match.response);
    } else {
      setResponse({
        status: 404,
        statusText: "Not Found",
        time: `${Math.floor(12 + Math.random() * 20)}ms`,
        headers: {
          "Content-Type": "application/json",
          "X-Request-Id": `req_${Math.random().toString(36).slice(2, 10)}`,
        },
        body: {
          error: "Not Found",
          message: `Endpoint ${method} ${endpoint} does not exist.`,
          available_endpoints: [
            "GET /api/users/abdul-muizz",
            "GET /api/projects",
            "GET /api/skills",
            "POST /api/contact",
          ],
        },
      });
    }

    setIsLoading(false);
  };

  const statusColor =
    response && response.status >= 200 && response.status < 300
      ? "text-success"
      : "text-error";

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

      <div className="bg-[#0A0A0F] min-h-screen pt-28 pb-8 px-4 sm:px-8">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Request Panel */}
            <div className="space-y-4">
              <div className="bg-surface border border-border rounded-lg p-4">
                <h3 className="text-[0.75rem] text-foreground-faint font-mono mb-3 uppercase tracking-spaced">
                  Request
                </h3>

                {/* Method + Endpoint */}
                <div className="flex gap-2 mb-4">
                  <div className="flex gap-1">
                    {METHODS.map((m) => (
                      <button
                        key={m}
                        onClick={() => setMethod(m)}
                        className={`px-2.5 py-1.5 rounded text-[0.75rem] font-mono border transition-colors ${
                          method === m
                            ? `${METHOD_COLORS[m]} border-current bg-current/10`
                            : "text-foreground-faint border-border hover:text-foreground-muted"
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                <input
                  type="text"
                  value={endpoint}
                  onChange={(e) => setEndpoint(e.target.value)}
                  className="w-full bg-[#0A0A0F] border border-border rounded px-3 py-2 font-mono text-[0.85rem] text-foreground outline-none focus:border-accent-cyan transition-colors"
                  spellCheck={false}
                />

                {/* Suggested Endpoints */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {SUGGESTED_ENDPOINTS.map((ep) => (
                    <button
                      key={ep}
                      onClick={() => setEndpoint(ep)}
                      className={`text-[0.7rem] font-mono px-2 py-0.5 rounded border transition-colors ${
                        endpoint === ep
                          ? "border-accent-cyan text-accent-cyan bg-accent-cyan/10"
                          : "border-border text-foreground-faint hover:text-foreground-muted"
                      }`}
                    >
                      {ep}
                    </button>
                  ))}
                </div>
              </div>

              {/* Headers */}
              <div className="bg-surface border border-border rounded-lg p-4">
                <h3 className="text-[0.75rem] text-foreground-faint font-mono mb-3 uppercase tracking-spaced">
                  Request Headers
                </h3>
                <div className="bg-[#0A0A0F] rounded p-3 font-mono text-[0.75rem] space-y-1">
                  {Object.entries(REQUEST_HEADERS).map(([key, val]) => (
                    <p key={key}>
                      <span className="text-accent-purple">{key}</span>
                      <span className="text-foreground-faint">: </span>
                      <span className="text-foreground-muted">{val}</span>
                    </p>
                  ))}
                </div>
              </div>

              {/* Send Button */}
              <button
                onClick={handleSend}
                disabled={isLoading}
                className="w-full bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/30 py-2.5 rounded-lg text-[0.875rem] font-mono hover:bg-accent-cyan/25 transition-colors disabled:opacity-40"
              >
                {isLoading ? "Sending..." : "Send Request"}
              </button>
            </div>

            {/* Response Panel */}
            <div className="bg-surface border border-border rounded-lg p-4">
              <h3 className="text-[0.75rem] text-foreground-faint font-mono mb-3 uppercase tracking-spaced">
                Response
              </h3>

              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center py-20"
                  >
                    <div className="flex gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="block h-2 w-2 rounded-full bg-accent-cyan animate-pulse"
                          style={{ animationDelay: `${i * 0.15}s` }}
                        />
                      ))}
                    </div>
                  </motion.div>
                ) : response ? (
                  <motion.div
                    key="response"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3"
                  >
                    {/* Status */}
                    <div className="flex items-center justify-between font-mono text-[0.85rem]">
                      <div className="flex items-center gap-2">
                        <span
                          className={`${statusColor} font-bold`}
                        >
                          {response.status}
                        </span>
                        <span className={statusColor}>
                          {response.statusText}
                        </span>
                      </div>
                      <span className="text-foreground-faint text-[0.75rem]">
                        {response.time}
                      </span>
                    </div>

                    {/* Response Headers */}
                    <div className="bg-[#0A0A0F] rounded p-3 font-mono text-[0.7rem] space-y-0.5">
                      <p className="text-foreground-faint mb-1 text-[0.65rem] uppercase tracking-spaced">
                        Response Headers
                      </p>
                      {Object.entries(response.headers).map(([key, val]) => (
                        <p key={key}>
                          <span className="text-accent-purple">{key}</span>
                          <span className="text-foreground-faint">: </span>
                          <span className="text-foreground-muted">{val}</span>
                        </p>
                      ))}
                    </div>

                    {/* Body */}
                    <div className="bg-[#0A0A0F] rounded p-3 font-mono text-[0.75rem] max-h-[400px] overflow-y-auto">
                      <p className="text-foreground-faint mb-1 text-[0.65rem] uppercase tracking-spaced">
                        Body
                      </p>
                      <pre className="text-foreground-muted whitespace-pre-wrap">
                        {JSON.stringify(response.body, null, 2)}
                      </pre>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-center py-20"
                  >
                    <p className="text-foreground-faint font-mono text-[0.85rem]">
                      Send a request to see the response
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
