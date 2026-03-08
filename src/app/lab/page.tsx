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

function RagPreview() {
  return (
    <div className="flex items-center justify-center h-full relative">
      <p className="text-foreground-faint text-center text-[0.875rem]">
        RAG Pipeline Visualizer
      </p>
      <div className="absolute top-3 right-3 bg-accent-purple/20 text-accent-purple text-[0.675rem] px-2 py-0.5 rounded-sm font-mono">
        Coming Soon
      </div>
    </div>
  );
}

export default function LabPage() {
  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-8 py-20">
      <SectionHeader command="$ cd ~/lab && ls" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
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
          title="RAG Demo"
          description="Retrieval-Augmented Generation pipeline demo with document ingestion and semantic search."
          tech={["Python", "LangChain", "RAG"]}
          href="#"
          preview={<RagPreview />}
        />
      </div>
    </div>
  );
}
