"use client";

import { SectionHeader } from "@/components/section-header";
import { GitCommitCard } from "@/components/git-commit-card";
import { TESTIMONIALS } from "@/lib/testimonials";

export function Testimonials() {
  return (
    <section className="max-w-[1200px] mx-auto px-4 sm:px-8 py-20">
      <SectionHeader command="~/testimonials" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {TESTIMONIALS.map((testimonial) => (
          <GitCommitCard key={testimonial.hash} testimonial={testimonial} />
        ))}
      </div>
    </section>
  );
}
