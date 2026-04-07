import type { Metadata } from "next";
import { SectionHeader } from "@/components/section-header";
import { PERSONAL_INFO } from "@/lib/resume-data";

export const metadata: Metadata = {
  title: "Resume — Abdul-Muizz",
  description: `Resume of ${PERSONAL_INFO.name} — ${PERSONAL_INFO.title}`,
};

export default function ResumePage() {
  const pdfPath = "/resume.pdf";

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-20 sm:px-8">
      <SectionHeader command="$ cat resume.pdf" />

      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <p className="font-mono text-sm text-foreground-muted">
          {`// ${PERSONAL_INFO.name} — ${PERSONAL_INFO.title}`}
        </p>

        <div className="flex flex-wrap items-center gap-2">
          <a
            href={pdfPath}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[0.875rem] bg-surface border border-border rounded-full px-4 py-1.5 hover:border-border-bright transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            $ open --new-tab
          </a>
          <a
            href={pdfPath}
            download
            className="font-mono text-[0.875rem] gradient-bg text-background rounded-full px-4 py-1.5 hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            $ download resume.pdf
          </a>
        </div>
      </div>

      {/* PDF viewer — macOS-style window chrome matching site design */}
      <div className="mt-8 rounded-xl border border-border bg-surface overflow-hidden shadow-2xl gradient-border">
        {/* Window chrome */}
        <div className="flex items-center gap-3 border-b border-border bg-background/60 px-4 py-3">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex-1 text-center font-mono text-xs text-foreground-muted truncate">
            resume.pdf — Abdul-Muizz Anwar
          </div>
          <div className="font-mono text-[0.7rem] text-foreground-faint hidden sm:block">
            PDF
          </div>
        </div>

        {/* PDF iframe */}
        <div className="relative bg-background">
          <object
            data={`${pdfPath}#view=FitH&toolbar=1&navpanes=0`}
            type="application/pdf"
            className="block h-[80vh] min-h-[600px] w-full"
            aria-label={`${PERSONAL_INFO.name} resume PDF`}
          >
            <iframe
              src={pdfPath}
              title={`${PERSONAL_INFO.name} resume PDF`}
              className="block h-[80vh] min-h-[600px] w-full border-0"
            />
            <div className="p-8 text-center font-mono text-sm text-foreground-muted">
              <p className="mb-4">
                {`// Your browser can't display embedded PDFs.`}
              </p>
              <a
                href={pdfPath}
                download
                className="inline-block gradient-bg text-background rounded-full px-4 py-2"
              >
                $ download resume.pdf
              </a>
            </div>
          </object>
        </div>
      </div>

      <p className="mt-4 text-center font-mono text-xs text-foreground-faint">
        {`// rendered from /public/resume.pdf`}
      </p>
    </div>
  );
}
