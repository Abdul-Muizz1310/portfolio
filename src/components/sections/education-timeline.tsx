"use client";

import { motion } from "framer-motion";
import { EDUCATION } from "@/lib/resume-data";

export function EducationTimeline() {
  return (
    <div>
      {/* Branch badge */}
      <span className="mb-4 inline-block rounded-sm bg-accent-cyan-soft px-2 py-0.5 font-mono text-[0.75rem] text-accent-cyan">
        branch: education
      </span>

      <div className="relative pl-8">
        {/* Vertical gradient line */}
        <div
          className="absolute left-[5px] top-0 h-full w-0.5"
          style={{
            background:
              "linear-gradient(to bottom, var(--accent-cyan), var(--accent-blue), var(--accent-purple))",
          }}
        />

        <div className="space-y-12">
          {EDUCATION.map((entry, index) => (
            <motion.div
              key={entry.hash}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {/* Dot on the line */}
              <div className="absolute -left-8 top-1 h-3 w-3 rounded-full border-2 border-background bg-accent-cyan" />

              {/* Content card */}
              <div>
                <p className="font-mono text-[0.75rem] text-foreground-faint">
                  commit {entry.hash}
                </p>
                <p className="font-mono text-[0.875rem] text-foreground-muted">
                  {entry.startDate} &mdash; {entry.endDate}
                </p>
                <h3 className="mt-1 text-h4 text-accent-cyan">
                  {entry.degree}
                </h3>
                <p className="font-medium text-accent-purple">
                  {entry.institution}
                </p>
                <p className="text-[0.875rem] text-foreground-muted">
                  {entry.location}
                </p>
                {entry.highlights.length > 0 && (
                  <ul className="mt-3 space-y-1.5">
                    {entry.highlights.map((highlight, i) => (
                      <li
                        key={i}
                        className="text-[0.875rem] leading-relaxed text-foreground-muted before:mr-2 before:text-foreground-faint before:content-['•']"
                      >
                        {highlight}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
