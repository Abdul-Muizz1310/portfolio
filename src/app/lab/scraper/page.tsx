"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const SAMPLE_URL = "https://example.com/products";

const SAMPLE_HTML = `<html>
  <body>
    <div class="product-list">
      <div class="product" data-id="1">
        <h2 class="title">Widget Pro</h2>
        <span class="price">$29.99</span>
        <p class="desc">Premium widget</p>
      </div>
      <div class="product" data-id="2">
        <h2 class="title">Gadget Plus</h2>
        <span class="price">$49.99</span>
        <p class="desc">Advanced gadget</p>
      </div>
      <div class="product" data-id="3">
        <h2 class="title">Tool Max</h2>
        <span class="price">$19.99</span>
        <p class="desc">Essential tool</p>
      </div>
    </div>
  </body>
</html>`;

const EXTRACTED_ELEMENTS = [
  { selector: ".product .title", values: ["Widget Pro", "Gadget Plus", "Tool Max"] },
  { selector: ".product .price", values: ["$29.99", "$49.99", "$19.99"] },
  { selector: ".product .desc", values: ["Premium widget", "Advanced gadget", "Essential tool"] },
];

const STRUCTURED_DATA = [
  { id: 1, title: "Widget Pro", price: "$29.99", description: "Premium widget" },
  { id: 2, title: "Gadget Plus", price: "$49.99", description: "Advanced gadget" },
  { id: 3, title: "Tool Max", price: "$19.99", description: "Essential tool" },
];

const TECH_BADGES = ["Python", "BeautifulSoup", "Scrapy", "Playwright"];

type Stage = "idle" | "url" | "request" | "response" | "parser" | "data" | "done";

const STAGES: { key: Stage; label: string }[] = [
  { key: "url", label: "Target URL" },
  { key: "request", label: "HTTP Request" },
  { key: "response", label: "HTML Response" },
  { key: "parser", label: "Parser" },
  { key: "data", label: "Structured Data" },
];

export default function ScraperPage() {
  const [stage, setStage] = useState<Stage>("idle");
  const [typedUrl, setTypedUrl] = useState("");
  const [htmlLines, setHtmlLines] = useState(0);
  const [stats, setStats] = useState({ pages: 0, records: 0, time: "0.0" });
  const [isRunning, setIsRunning] = useState(false);

  const htmlLinesArray = SAMPLE_HTML.split("\n");

  const isRunningRef = useRef(false);

  const runScrape = useCallback(async () => {
    if (isRunningRef.current) return;
    isRunningRef.current = true;
    setIsRunning(true);
    setStage("idle");
    setTypedUrl("");
    setHtmlLines(0);
    setStats({ pages: 0, records: 0, time: "0.0" });

    // Stage 1: Type URL
    setStage("url");
    for (let i = 0; i <= SAMPLE_URL.length; i++) {
      await new Promise((r) => setTimeout(r, 30));
      setTypedUrl(SAMPLE_URL.slice(0, i));
    }
    await new Promise((r) => setTimeout(r, 400));

    // Stage 2: HTTP Request
    setStage("request");
    await new Promise((r) => setTimeout(r, 800));

    // Stage 3: HTML Response
    setStage("response");
    for (let i = 0; i <= htmlLinesArray.length; i++) {
      await new Promise((r) => setTimeout(r, 60));
      setHtmlLines(i);
    }
    await new Promise((r) => setTimeout(r, 300));

    // Stage 4: Parser
    setStage("parser");
    await new Promise((r) => setTimeout(r, 1200));

    // Stage 5: Structured Data
    setStage("data");
    await new Promise((r) => setTimeout(r, 400));
    setStats({ pages: 42, records: 156, time: "2.3" });
    await new Promise((r) => setTimeout(r, 200));

    setStage("done");
    setIsRunning(false);
    isRunningRef.current = false;
  }, [htmlLinesArray.length]);

  useEffect(() => {
    const timer = setTimeout(() => {
      runScrape();
    }, 500);
    return () => clearTimeout(timer);
  }, [runScrape]);

  const stageIndex = STAGES.findIndex((s) => s.key === stage);

  return (
    <div className="min-h-screen relative">
      <div className="fixed top-16 left-0 right-0 z-40 bg-surface/80 backdrop-blur border-b border-border h-12 flex items-center justify-between px-4 sm:px-8">
        <Link
          href="/lab"
          className="flex items-center gap-2 text-foreground-muted hover:text-foreground transition-colors text-[0.875rem]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Lab
        </Link>
        <button
          onClick={runScrape}
          disabled={isRunning}
          className="bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/30 px-4 py-1.5 rounded text-[0.8rem] font-mono hover:bg-accent-cyan/25 transition-colors disabled:opacity-40"
        >
          {isRunning ? "Running..." : "Run Scrape"}
        </button>
      </div>

      <div className="bg-[#0A0A0F] min-h-screen pt-28 pb-8 px-4 sm:px-8">
        <div className="max-w-[1000px] mx-auto">
          {/* Pipeline Steps */}
          <div className="flex items-center justify-center gap-1 sm:gap-2 mb-8 font-mono text-[0.7rem] sm:text-[0.75rem] flex-wrap">
            {STAGES.map((s, i) => (
              <div key={s.key} className="flex items-center gap-1 sm:gap-2">
                <motion.div
                  className={`px-2 sm:px-3 py-1.5 rounded border transition-colors duration-200 ${
                    stageIndex >= i
                      ? "border-accent-cyan bg-accent-cyan/10 text-accent-cyan"
                      : "border-border-bright text-foreground-faint"
                  }`}
                  animate={
                    stage === s.key ? { scale: [1, 1.05, 1] } : { scale: 1 }
                  }
                  transition={{ duration: 0.3 }}
                >
                  {s.label}
                </motion.div>
                {i < STAGES.length - 1 && (
                  <span
                    className={`transition-colors duration-200 ${
                      stageIndex > i
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

          {/* Tech Badges */}
          <div className="flex justify-center gap-2 mb-8">
            {TECH_BADGES.map((t) => (
              <span
                key={t}
                className="bg-accent-cyan-soft text-accent-cyan text-[0.7rem] px-2 py-0.5 rounded-sm font-mono"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* URL Input */}
            <div className="bg-surface border border-border rounded-lg p-4">
              <h3 className="text-[0.75rem] text-foreground-faint font-mono mb-2 uppercase tracking-spaced">
                Target URL
              </h3>
              <div className="bg-[#0A0A0F] rounded p-3 font-mono text-[0.8rem] text-accent-cyan min-h-[2.5rem] flex items-center">
                {typedUrl}
                {stage === "url" && (
                  <span className="animate-pulse ml-0.5">|</span>
                )}
              </div>
            </div>

            {/* HTTP Request */}
            <div className="bg-surface border border-border rounded-lg p-4">
              <h3 className="text-[0.75rem] text-foreground-faint font-mono mb-2 uppercase tracking-spaced">
                HTTP Request
              </h3>
              <div className="bg-[#0A0A0F] rounded p-3 font-mono text-[0.8rem] min-h-[2.5rem]">
                {(stageIndex >= 1 || stage === "done") ? (
                  <div className="space-y-1">
                    <p className="text-accent-blue">GET {SAMPLE_URL}</p>
                    <p className="text-foreground-faint">
                      User-Agent: ScraperBot/1.0
                    </p>
                    <p className="text-foreground-faint">Accept: text/html</p>
                    {(stageIndex >= 2 || stage === "done") && (
                      <p className="text-success mt-2">
                        &larr; 200 OK (142ms)
                      </p>
                    )}
                  </div>
                ) : (
                  <span className="text-foreground-faint">Waiting...</span>
                )}
              </div>
            </div>

            {/* HTML Response */}
            <div className="bg-surface border border-border rounded-lg p-4">
              <h3 className="text-[0.75rem] text-foreground-faint font-mono mb-2 uppercase tracking-spaced">
                HTML Response
              </h3>
              <div className="bg-[#0A0A0F] rounded p-3 font-mono text-[0.75rem] max-h-[200px] overflow-y-auto">
                {(stageIndex >= 2 || stage === "done") ? (
                  <pre className="text-foreground-muted whitespace-pre-wrap">
                    {htmlLinesArray
                      .slice(0, stage === "done" ? htmlLinesArray.length : htmlLines)
                      .map((line, i) => (
                        <span key={i}>
                          <span className="text-foreground-faint select-none">
                            {String(i + 1).padStart(2, " ")}|{" "}
                          </span>
                          {colorizeHtml(line)}
                          {"\n"}
                        </span>
                      ))}
                  </pre>
                ) : (
                  <span className="text-foreground-faint">Waiting...</span>
                )}
              </div>
            </div>

            {/* Parser */}
            <div className="bg-surface border border-border rounded-lg p-4">
              <h3 className="text-[0.75rem] text-foreground-faint font-mono mb-2 uppercase tracking-spaced">
                Parsed Elements
              </h3>
              <div className="bg-[#0A0A0F] rounded p-3 font-mono text-[0.8rem] max-h-[200px] overflow-y-auto">
                {(stageIndex >= 3 || stage === "done") ? (
                  <div className="space-y-3">
                    {EXTRACTED_ELEMENTS.map((el) => (
                      <div key={el.selector}>
                        <p className="text-accent-purple text-[0.75rem]">
                          {el.selector}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {el.values.map((v) => (
                            <span
                              key={v}
                              className="bg-accent-cyan/10 text-accent-cyan px-2 py-0.5 rounded text-[0.7rem]"
                            >
                              {v}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <span className="text-foreground-faint">Waiting...</span>
                )}
              </div>
            </div>

            {/* Structured Data */}
            <div className="bg-surface border border-border rounded-lg p-4 md:col-span-2">
              <h3 className="text-[0.75rem] text-foreground-faint font-mono mb-2 uppercase tracking-spaced">
                Structured Output (JSON)
              </h3>
              <div className="bg-[#0A0A0F] rounded p-3 font-mono text-[0.8rem]">
                {(stageIndex >= 4 || stage === "done") ? (
                  <pre className="text-foreground-muted whitespace-pre-wrap">
                    <span className="text-accent-purple">{"["}</span>
                    {"\n"}
                    {STRUCTURED_DATA.map((item, i) => (
                      <span key={item.id}>
                        {"  "}
                        <span className="text-foreground-faint">{"{"}</span>
                        {"\n"}
                        {"    "}
                        <span className="text-accent-blue">&quot;id&quot;</span>
                        {": "}
                        <span className="text-accent-cyan">{item.id}</span>
                        {", "}
                        <span className="text-accent-blue">
                          &quot;title&quot;
                        </span>
                        {": "}
                        <span className="text-success">
                          &quot;{item.title}&quot;
                        </span>
                        {", "}
                        <span className="text-accent-blue">
                          &quot;price&quot;
                        </span>
                        {": "}
                        <span className="text-success">
                          &quot;{item.price}&quot;
                        </span>
                        {", "}
                        <span className="text-accent-blue">
                          &quot;description&quot;
                        </span>
                        {": "}
                        <span className="text-success">
                          &quot;{item.description}&quot;
                        </span>
                        {"\n"}
                        {"  "}
                        <span className="text-foreground-faint">{"}"}</span>
                        {i < STRUCTURED_DATA.length - 1 ? "," : ""}
                        {"\n"}
                      </span>
                    ))}
                    <span className="text-accent-purple">{"]"}</span>
                  </pre>
                ) : (
                  <span className="text-foreground-faint">Waiting...</span>
                )}
              </div>
            </div>
          </div>

          {/* Stats */}
          {stage === "done" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center gap-6 mt-6 font-mono text-[0.8rem]"
            >
              <div className="text-center">
                <p className="text-accent-cyan text-[1.25rem] font-bold">
                  {stats.pages}
                </p>
                <p className="text-foreground-faint">Pages Scraped</p>
              </div>
              <div className="text-center">
                <p className="text-accent-blue text-[1.25rem] font-bold">
                  {stats.records}
                </p>
                <p className="text-foreground-faint">Records Extracted</p>
              </div>
              <div className="text-center">
                <p className="text-accent-purple text-[1.25rem] font-bold">
                  {stats.time}s
                </p>
                <p className="text-foreground-faint">Total Time</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

function colorizeHtml(line: string): React.ReactNode {
  return line
    .replace(/</g, "\u00AB")
    .replace(/>/g, "\u00BB")
    .split(/(\u00AB\/?[a-z0-9-]+(?:\s[^»]*)?\u00BB)/g)
    .map((part, i) => {
      if (part.startsWith("\u00AB")) {
        return (
          <span key={i} className="text-accent-blue">
            {part.replace(/\u00AB/g, "<").replace(/\u00BB/g, ">")}
          </span>
        );
      }
      return (
        <span key={i} className="text-foreground-muted">
          {part.replace(/\u00AB/g, "<").replace(/\u00BB/g, ">")}
        </span>
      );
    });
}
