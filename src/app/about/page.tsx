import type { Metadata } from "next";
import { SectionHeader } from "@/components/section-header";
import { ExperienceTimeline } from "@/components/sections/experience-timeline";
import { EducationTimeline } from "@/components/sections/education-timeline";
import { VolunteerTimeline } from "@/components/sections/volunteer-timeline";
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
        <p>
          I&apos;m a full-stack developer who has turned his love for tech
          (somehow) into a full-time career. I focus on building robust and
          secure systems that thrive in real-world complexity. I firmly believe
          that perfection is not always the correct answer. It is always better
          to prioritize clarity, maintainability, and thoughtful tradeoffs over
          unnecessary complexity.
        </p>
        <p>
          My engineering philosophy centers on building functional and resilient
          solutions. Create systems that do not crack under edge cases but
          evolve with them. Each project should reflect a commitment to clean
          design, structured thinking, and problem-solving with purpose.
        </p>
        <p>
          A game of chess or Dota 2 would be preferable if you want to know
          more about me.
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

      {/* Volunteer Experience */}
      <section className="mt-16">
        <SectionHeader command="$ git log --all --community" />
        <div className="mt-8">
          <VolunteerTimeline />
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
