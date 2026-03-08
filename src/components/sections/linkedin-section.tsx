import Link from "next/link";
import { LINKEDIN_ARTICLES } from "@/lib/linkedin-articles";
import { SITE_CONFIG } from "@/lib/constants";

export function LinkedInSection() {
  return (
    <div className="mt-12">
      <h3 className="mb-4 font-mono text-lg text-foreground-muted">
        LinkedIn Articles
      </h3>

      {LINKEDIN_ARTICLES.length > 0 && (
        <div className="mb-6 space-y-2">
          {LINKEDIN_ARTICLES.map((article) => (
            <a
              key={article.url}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-md px-3 py-2 font-mono text-[0.875rem] text-foreground-muted transition-colors hover:bg-surface-hover"
            >
              {article.title}
              <span className="ml-2 text-foreground-faint">
                {article.date}
              </span>
            </a>
          ))}
        </div>
      )}

      <Link
        href={SITE_CONFIG.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="gradient-bg inline-block rounded-full px-6 py-2 font-medium text-white transition-shadow hover:shadow-glow-lg"
      >
        Follow on LinkedIn
      </Link>
    </div>
  );
}
