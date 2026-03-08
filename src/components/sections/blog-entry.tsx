"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { DevToArticle } from "@/types/blog";

interface BlogEntryProps {
  article: DevToArticle;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .slice(0, 40);
}

export function BlogEntry({ article }: BlogEntryProps) {
  const [isHovered, setIsHovered] = useState(false);

  const slug = slugify(article.title);
  const date = formatDate(article.published_at);

  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block cursor-pointer rounded-md px-3 py-2 transition-colors hover:bg-surface-hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <p className="font-mono text-[0.875rem] text-foreground-muted">
        -rw-r--r--{"  "}1 muizz{"  "}{date}{"  "}{slug}.md
      </p>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="mt-1 text-[0.875rem] text-foreground">
              {article.description}
            </p>

            <div className="mt-2 flex flex-wrap items-center gap-2">
              {article.tag_list.map((tag) => (
                <span
                  key={tag}
                  className="rounded-sm bg-accent-cyan-soft px-1.5 py-0.5 text-[0.75rem] text-accent-cyan"
                >
                  {tag}
                </span>
              ))}
              <span className="text-[0.75rem] text-foreground-faint">
                {article.reading_time_minutes} min read
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </a>
  );
}
