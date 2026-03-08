import type { Metadata } from "next";
import { CodeBlock } from "@/components/code-block";
import {
  PERSONAL_INFO,
  EXPERIENCE,
  EDUCATION,
  SKILLS,
} from "@/lib/resume-data";

export const metadata: Metadata = {
  title: "Resume — Abdul-Muizz",
  description: `Resume of ${PERSONAL_INFO.name} — ${PERSONAL_INFO.title}`,
};

function ResumeLines() {
  const lines: React.ReactNode[] = [];
  let key = 0;

  const push = (node: React.ReactNode) => {
    lines.push(<div key={key++}>{node}</div>);
  };

  const blank = () => push(<>&nbsp;</>);

  // --- Header ---
  push(
    <span className="text-foreground-faint">
      {`// ${PERSONAL_INFO.name} — ${PERSONAL_INFO.title}`}
    </span>,
  );
  push(
    <span className="text-foreground-faint">
      {`// ${PERSONAL_INFO.location} | ${PERSONAL_INFO.email}`}
    </span>,
  );
  blank();
  push(
    <span className="text-foreground-faint">
      {`// ${PERSONAL_INFO.summary}`}
    </span>,
  );
  blank();
  blank();

  // --- Experience ---
  push(
    <span className="text-foreground-faint">
      {"// ═══ Experience ═══"}
    </span>,
  );
  blank();

  EXPERIENCE.forEach((exp, idx) => {
    push(
      <span className="text-foreground">
        <span className="text-accent-purple">{"const "}</span>
        {`role_${idx + 1} `}
        <span className="text-foreground-muted">{"= {"}</span>
      </span>,
    );
    push(
      <span className="text-foreground">
        {"  position: "}
        <span className="text-accent-cyan">{`"${exp.role}"`}</span>
        {","}
      </span>,
    );
    push(
      <span className="text-foreground">
        {"  company: "}
        <span className="text-accent-purple">{`"${exp.company}"`}</span>
        {","}
      </span>,
    );
    push(
      <span className="text-foreground">
        {"  period: "}
        <span className="text-foreground-muted">
          {`"${exp.startDate} — ${exp.endDate}"`}
        </span>
        {","}
      </span>,
    );
    push(
      <span className="text-foreground">
        {"  location: "}
        <span className="text-foreground-muted">{`"${exp.location}"`}</span>
        {","}
      </span>,
    );
    push(
      <span className="text-foreground">{"  achievements: ["}</span>,
    );
    exp.description.forEach((desc) => {
      push(
        <span className="text-foreground">
          {"    "}
          <span className="text-foreground">{`"${desc}"`}</span>
          {","}
        </span>,
      );
    });
    push(<span className="text-foreground">{"  ],"}</span>);
    push(
      <span className="text-foreground-muted">{"};"}</span>,
    );
    blank();
  });

  blank();

  // --- Education ---
  push(
    <span className="text-foreground-faint">
      {"// ═══ Education ═══"}
    </span>,
  );
  blank();

  EDUCATION.forEach((edu, idx) => {
    push(
      <span className="text-foreground">
        <span className="text-accent-purple">{"const "}</span>
        {`education_${idx + 1} `}
        <span className="text-foreground-muted">{"= {"}</span>
      </span>,
    );
    push(
      <span className="text-foreground">
        {"  degree: "}
        <span className="text-accent-cyan">{`"${edu.degree}"`}</span>
        {","}
      </span>,
    );
    push(
      <span className="text-foreground">
        {"  institution: "}
        <span className="text-accent-purple">{`"${edu.institution}"`}</span>
        {","}
      </span>,
    );
    push(
      <span className="text-foreground">
        {"  period: "}
        <span className="text-foreground-muted">
          {`"${edu.startDate} — ${edu.endDate}"`}
        </span>
        {","}
      </span>,
    );
    push(
      <span className="text-foreground">
        {"  location: "}
        <span className="text-foreground-muted">{`"${edu.location}"`}</span>
        {","}
      </span>,
    );
    push(
      <span className="text-foreground">{"  highlights: ["}</span>,
    );
    edu.highlights.forEach((h) => {
      push(
        <span className="text-foreground">
          {"    "}
          <span className="text-foreground">{`"${h}"`}</span>
          {","}
        </span>,
      );
    });
    push(<span className="text-foreground">{"  ],"}</span>);
    push(
      <span className="text-foreground-muted">{"};"}</span>,
    );
    blank();
  });

  blank();

  // --- Skills ---
  push(
    <span className="text-foreground-faint">
      {"// ═══ Skills ═══"}
    </span>,
  );
  blank();

  push(
    <span className="text-foreground">
      <span className="text-accent-purple">{"const "}</span>
      {"skills "}
      <span className="text-foreground-muted">{"= {"}</span>
    </span>,
  );

  const skillEntries = Object.entries(SKILLS);
  skillEntries.forEach(([category, items]) => {
    push(
      <span className="text-foreground">
        {`  ${category}: [`}
        <span className="text-accent-cyan">
          {items.map((item) => `"${item}"`).join(", ")}
        </span>
        {"],"}
      </span>,
    );
  });

  push(
    <span className="text-foreground-muted">{"};"}</span>,
  );
  blank();

  // --- Export ---
  push(
    <span className="text-foreground">
      <span className="text-accent-purple">{"export default "}</span>
      {"{ role_1, role_2, role_3, education_1, skills };"}
    </span>,
  );

  return <>{lines}</>;
}

export default function ResumePage() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 py-20 sm:px-8">
      <div className="mb-6 flex items-center justify-end">
        <a
          href="/resume.pdf"
          download
          className="font-mono text-[0.875rem] bg-surface border border-border rounded-full px-4 py-1.5 hover:border-border-bright transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          $ export resume.pdf
        </a>
      </div>

      <CodeBlock filename="resume.tsx" showLineNumbers={true}>
        <ResumeLines />
      </CodeBlock>
    </div>
  );
}
