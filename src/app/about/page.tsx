import type { Metadata } from "next";
import { SectionHeader } from "@/components/section-header";
import { ExperienceTimeline } from "@/components/sections/experience-timeline";
import { EducationTimeline } from "@/components/sections/education-timeline";
import { Values } from "@/components/sections/values";
import { PERSONAL_INFO } from "@/lib/resume-data";

export const metadata: Metadata = {
  title: "About — Abdul-Muizz",
  description: PERSONAL_INFO.summary,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 py-20 sm:px-8">
      <SectionHeader command="$ cat about.md" />

      {/* Intro */}
      <div className="mt-8 max-w-3xl space-y-4 text-lg leading-relaxed text-foreground-muted">
        <p>{PERSONAL_INFO.summary}</p>
        <p>
          With a Bachelor&apos;s in Software Engineering from the National
          University of Sciences and Technology, I bring a strong foundation in
          algorithms, system design, and modern development practices. My
          experience spans building AI-powered platforms with LangGraph agents,
          scalable microservice architectures, and polished full-stack web
          applications.
        </p>
        <p>
          When I&apos;m not shipping production code, you&apos;ll find me
          exploring the latest in LLM tooling, contributing to open-source
          projects, or experimenting with creative dev tools like Remotion and
          Three.js.
        </p>
      </div>

      {/* Experience */}
      <section className="mt-16">
        <SectionHeader command="$ git log --oneline" />
        <div className="mt-8">
          <ExperienceTimeline />
        </div>
      </section>

      {/* Education */}
      <section className="mt-16">
        <SectionHeader command="$ git branch -a" />
        <div className="mt-8">
          <EducationTimeline />
        </div>
      </section>

      {/* Values */}
      <section className="mt-16">
        <SectionHeader command="$ printenv" />
        <div className="mt-8">
          <Values />
        </div>
      </section>
    </div>
  );
}
