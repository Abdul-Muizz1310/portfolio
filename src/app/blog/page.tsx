import { PageTransition } from "@/components/page-transition";
import { SectionHeader } from "@/components/section-header";
import { BlogEntry } from "@/components/sections/blog-entry";
import { LinkedInSection } from "@/components/sections/linkedin-section";
import { fetchDevToArticles } from "@/lib/devto";

export default async function BlogPage() {
  let articles;
  try {
    articles = await fetchDevToArticles();
  } catch {
    articles = null;
  }

  return (
    <PageTransition>
      <div className="mx-auto max-w-[1200px] px-4 py-20 sm:px-8">
        <SectionHeader command="$ ls ~/blog" />

        {articles && articles.length > 0 ? (
          <div className="mt-8 divide-y divide-border overflow-hidden rounded-lg border border-border bg-surface">
            {articles.map((article) => (
              <BlogEntry key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <p className="mt-8 font-mono text-foreground-faint">
            {"// No articles found"}
          </p>
        )}

        <LinkedInSection />
      </div>
    </PageTransition>
  );
}
