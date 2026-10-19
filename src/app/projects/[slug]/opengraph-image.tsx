import { ImageResponse } from "next/og";
import { fetchGitHubRepos } from "@/lib/github";
import { LANGUAGE_COLORS } from "@/lib/constants";
import {
  OG_COLORS,
  OgFrame,
  OgPrompt,
  SITE_HOST,
  loadOgFonts,
  plural,
  truncate,
} from "@/lib/og-image";
import { PERSONAL_INFO } from "@/lib/resume-data";
import { OG_IMAGE_SIZE, OG_IMAGE_TYPE } from "@/lib/seo";

export const alt = `Project by ${PERSONAL_INFO.name}`;
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_TYPE;

interface ImageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const repos = await fetchGitHubRepos();
  return repos.map((repo) => ({ slug: repo.name }));
}

export default async function Image({ params }: ImageProps) {
  const { slug } = await params;
  const [fonts, repos] = await Promise.all([loadOgFonts(), fetchGitHubRepos()]);
  const repo = repos.find((r) => r.name === slug);

  const name = repo?.name ?? slug;
  const description = truncate(
    repo?.description ?? `A project by ${PERSONAL_INFO.name}`,
    150,
  );
  const topics = repo?.topics.slice(0, 5) ?? [];
  const language = repo?.language ?? null;
  // Only show social proof when there is some
  const stats = [
    repo?.stargazers_count ? plural(repo.stargazers_count, "star") : null,
    repo?.forks_count ? plural(repo.forks_count, "fork") : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return new ImageResponse(
    (
      <OgFrame filename={`~/projects/${name}/README.md`}>
        <OgPrompt command="cat README.md" />

        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontFamily: "Space Grotesk",
            fontSize: name.length > 24 ? 56 : 72,
            fontWeight: 700,
            letterSpacing: -2,
            lineHeight: 1.05,
          }}
        >
          {name}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 20,
            fontSize: 28,
            lineHeight: 1.45,
            color: OG_COLORS.muted,
          }}
        >
          {description}
        </div>

        {topics.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", marginTop: 28 }}>
            {topics.map((topic) => (
              <div
                key={topic}
                style={{
                  display: "flex",
                  marginRight: 12,
                  padding: "6px 14px",
                  borderRadius: 6,
                  fontSize: 20,
                  color: OG_COLORS.cyan,
                  backgroundColor: OG_COLORS.cyanSoft,
                }}
              >
                {topic}
              </div>
            ))}
          </div>
        )}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "auto",
            fontSize: 22,
            color: OG_COLORS.muted,
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            {language && (
              <div style={{ display: "flex", alignItems: "center", marginRight: 28 }}>
                <div
                  style={{
                    width: 16,
                    height: 16,
                    marginRight: 10,
                    borderRadius: 8,
                    backgroundColor: LANGUAGE_COLORS[language] ?? "#888",
                  }}
                />
                <span>{language}</span>
              </div>
            )}
            {stats && <span>{stats}</span>}
          </div>
          <span style={{ color: OG_COLORS.cyan }}>{SITE_HOST}</span>
        </div>
      </OgFrame>
    ),
    { ...size, fonts },
  );
}
