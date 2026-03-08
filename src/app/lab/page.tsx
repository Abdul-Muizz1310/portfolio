import type { Metadata } from "next";
import { SectionHeader } from "@/components/section-header";
import { LabCard } from "@/components/sections/lab-card";

function ParticlePreview() {
  return (
    <div className="flex items-center justify-center h-full gap-3">
      {[0, 1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className="block h-2.5 w-2.5 rounded-full bg-accent-cyan animate-pulse"
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </div>
  );
}

function TerminalPreview() {
  return (
    <div className="font-mono text-[0.75rem] text-accent-cyan p-3 space-y-1">
      <p>
        <span className="text-foreground-muted">$</span> whoami
      </p>
      <p>abdul-muizz</p>
      <p>
        <span className="text-foreground-muted">$</span> ls projects/
      </p>
      <p>rag-chatbot/ scraper/ meeting-bot/</p>
      <p className="animate-pulse">
        <span className="text-foreground-muted">$</span> _
      </p>
    </div>
  );
}

function AiChatPreview() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-2 p-3">
      <div className="flex items-center gap-1.5">
        <span className="bg-accent-cyan/15 text-accent-cyan text-[0.65rem] font-mono px-2 py-0.5 rounded border border-accent-cyan/20">
          Query
        </span>
        <span className="text-foreground-faint text-[0.6rem]">&rarr;</span>
        <span className="bg-accent-blue/15 text-accent-blue text-[0.65rem] font-mono px-2 py-0.5 rounded border border-accent-blue/20">
          RAG
        </span>
        <span className="text-foreground-faint text-[0.6rem]">&rarr;</span>
        <span className="bg-accent-purple/15 text-accent-purple text-[0.65rem] font-mono px-2 py-0.5 rounded border border-accent-purple/20">
          LLM
        </span>
      </div>
      <div className="flex gap-2 mt-1">
        <div className="bg-accent-cyan/10 rounded px-2 py-1 text-[0.6rem] text-accent-cyan font-mono animate-pulse">
          Hi! Ask me anything...
        </div>
      </div>
    </div>
  );
}

function ScraperPreview() {
  return (
    <div className="flex items-center justify-center h-full gap-1.5 p-3">
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <span
          key={i}
          className="block h-1.5 w-1.5 rounded-full bg-accent-cyan animate-pulse"
          style={{
            animationDelay: `${i * 0.15}s`,
            animationDuration: "1.2s",
          }}
        />
      ))}
      <span className="text-foreground-faint text-[0.6rem] font-mono ml-2">
        Extracting data...
      </span>
    </div>
  );
}

function ApiPreview() {
  return (
    <div className="font-mono text-[0.75rem] p-3 space-y-1.5 flex flex-col items-center justify-center h-full">
      <p>
        <span className="text-success">GET</span>{" "}
        <span className="text-foreground-muted">/api/skills</span>
      </p>
      <p>
        <span className="text-success">200</span>{" "}
        <span className="text-foreground-faint">OK</span>{" "}
        <span className="text-foreground-faint text-[0.65rem]">47ms</span>
      </p>
      <p className="text-accent-cyan text-[0.65rem]">
        {"{"}
        &quot;status&quot;: &quot;success&quot;
        {"}"}
      </p>
    </div>
  );
}

function FrontendPreview() {
  return (
    <div className="flex items-center justify-center h-full gap-2 p-3">
      {[
        "from-accent-cyan to-accent-blue",
        "from-accent-blue to-accent-purple",
        "from-accent-purple to-accent-cyan",
      ].map((gradient, i) => (
        <span
          key={i}
          className={`block h-10 w-10 rounded-lg bg-gradient-to-br ${gradient} animate-pulse`}
          style={{ animationDelay: `${i * 0.3}s` }}
        />
      ))}
    </div>
  );
}

export const metadata: Metadata = {
  title: "Lab — Abdul-Muizz",
  description:
    "Interactive experiments and demos — AI chat, particle systems, web scraping visualizer, API playground, and more.",
};

export default function LabPage() {
  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-8 py-20">
      <SectionHeader command="$ cd ~/lab && ls" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <LabCard
          title="AI Chat Demo"
          description="Simulated RAG pipeline assistant — ask about AI/ML expertise and watch the retrieval pipeline in action."
          tech={["LangChain", "RAG", "NLP"]}
          href="/lab/ai-chat"
          preview={<AiChatPreview />}
        />
        <LabCard
          title="Particle Playground"
          description="Interactive WebGL particle system with mouse-reactive physics and configurable parameters."
          tech={["Three.js", "React Three Fiber", "WebGL"]}
          href="/lab/particles"
          preview={<ParticlePreview />}
        />
        <LabCard
          title="Terminal Emulator"
          description="A browser-based terminal interface. Try running some commands to learn more about me."
          tech={["React", "TypeScript"]}
          href="/lab/terminal"
          preview={<TerminalPreview />}
        />
        <LabCard
          title="Scraper Visualizer"
          description="Visual demo of a web scraping pipeline — watch data flow from raw HTML to structured JSON."
          tech={["Python", "BeautifulSoup", "Scrapy", "Playwright"]}
          href="/lab/scraper"
          preview={<ScraperPreview />}
        />
        <LabCard
          title="API Playground"
          description="Interactive REST API explorer — send requests, inspect responses, and explore endpoint documentation."
          tech={["FastAPI", "REST", "Node.js"]}
          href="/lab/api"
          preview={<ApiPreview />}
        />
        <LabCard
          title="Frontend Showcase"
          description="A collection of interactive UI demos — spring animations, drag-and-drop, themes, and micro-interactions."
          tech={["React", "Framer Motion", "Tailwind"]}
          href="/lab/frontend"
          preview={<FrontendPreview />}
        />
      </div>
    </div>
  );
}
