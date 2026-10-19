import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import { EDUCATION, EXPERIENCE, PERSONAL_INFO, SKILLS } from "@/lib/resume-data";
import type { GitHubRepo } from "@/types/github";

export const TITLE_TEMPLATE = `%s — ${PERSONAL_INFO.name}`;

export const SITE_KEYWORDS = [
  PERSONAL_INFO.name,
  SITE_CONFIG.name,
  "AI Software Engineer",
  "Full-Stack Developer",
  "Software Engineer Islamabad",
  "Software Engineer Pakistan",
  "LangGraph",
  "LangChain",
  "RAG",
  "LLM Agents",
  "Next.js",
  "React",
  "TypeScript",
  "Python",
  "FastAPI",
  "Portfolio",
];

// Next.js shallow-merges metadata, so any page that sets `openGraph` replaces
// the root one entirely. Pages spread these shared fields back in.
export const OPEN_GRAPH_DEFAULTS = {
  type: "website",
  siteName: PERSONAL_INFO.name,
  locale: SITE_CONFIG.locale,
} as const;

export const OG_IMAGE_SIZE = { width: 1200, height: 630 };
export const OG_IMAGE_TYPE = "image/png";
export const OG_IMAGE_ALT = `${PERSONAL_INFO.name} — ${PERSONAL_INFO.title}`;

// Served by src/app/opengraph-image.tsx
const DEFAULT_OG_IMAGE = {
  url: "/opengraph-image",
  ...OG_IMAGE_SIZE,
  type: OG_IMAGE_TYPE,
  alt: OG_IMAGE_ALT,
};

interface PageMetadataOptions {
  /** Page title without the site suffix. Omit for the home page. */
  title?: string;
  description: string;
  /** Path relative to the site root, e.g. "/about". */
  path: string;
  keywords?: string[];
  /**
   * A page-level `openGraph` object drops the image inherited from
   * app/opengraph-image, so the site card is attached explicitly. Pass false
   * when the page's own segment has an opengraph-image file.
   */
  defaultImage?: boolean;
}

export function pageMetadata({
  title,
  description,
  path,
  keywords,
  defaultImage = true,
}: PageMetadataOptions): Metadata {
  const fullTitle = title ? TITLE_TEMPLATE.replace("%s", title) : SITE_CONFIG.title;

  return {
    title: title ?? { absolute: SITE_CONFIG.title },
    description,
    ...(keywords && { keywords }),
    alternates: { canonical: path },
    openGraph: {
      ...OPEN_GRAPH_DEFAULTS,
      title: fullTitle,
      description,
      url: path,
      ...(defaultImage && { images: [DEFAULT_OG_IMAGE] }),
    },
  };
}

export function absoluteUrl(path = "/"): string {
  return path === "/" ? SITE_CONFIG.url : `${SITE_CONFIG.url}${path}`;
}

/* ------------------------------------------------------------------ */
/* JSON-LD structured data (https://schema.org)                       */
/* ------------------------------------------------------------------ */

export type JsonLdNode = { "@type": string; [key: string]: unknown };

export interface JsonLdDocument {
  "@context": "https://schema.org";
  "@graph"?: JsonLdNode[];
  [key: string]: unknown;
}

const PERSON_ID = `${SITE_CONFIG.url}/#person`;
const WEBSITE_ID = `${SITE_CONFIG.url}/#website`;

export function personJsonLd(): JsonLdNode {
  const current = EXPERIENCE.find((job) => job.endDate === "Present");

  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: PERSONAL_INFO.name,
    alternateName: SITE_CONFIG.name,
    jobTitle: PERSONAL_INFO.title,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    image: absoluteUrl("/avatar.jpg"),
    email: `mailto:${PERSONAL_INFO.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Islamabad",
      addressCountry: "PK",
    },
    ...(current && {
      worksFor: { "@type": "Organization", name: current.company },
    }),
    alumniOf: EDUCATION.map((edu) => ({
      "@type": "CollegeOrUniversity",
      name: edu.institution,
    })),
    knowsAbout: Object.values(SKILLS).flat(),
    sameAs: [SITE_CONFIG.github, SITE_CONFIG.linkedin],
  };
}

export function homeJsonLd(): JsonLdDocument {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_CONFIG.url,
        name: PERSONAL_INFO.name,
        description: SITE_CONFIG.description,
        inLanguage: "en",
        publisher: { "@id": PERSON_ID },
      },
      personJsonLd(),
    ],
  };
}

export function profilePageJsonLd(): JsonLdDocument {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: absoluteUrl("/about"),
    name: `About ${PERSONAL_INFO.name}`,
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: personJsonLd(),
  };
}

export function projectJsonLd(repo: GitHubRepo): JsonLdDocument {
  const url = absoluteUrl(`/projects/${repo.name}`);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareSourceCode",
        name: repo.name,
        description: repo.description ?? undefined,
        url,
        codeRepository: repo.html_url,
        programmingLanguage: repo.language ?? undefined,
        keywords: repo.topics.length > 0 ? repo.topics.join(", ") : undefined,
        dateCreated: repo.created_at,
        dateModified: repo.pushed_at,
        author: {
          "@type": "Person",
          "@id": PERSON_ID,
          name: PERSONAL_INFO.name,
          url: SITE_CONFIG.url,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Projects", item: absoluteUrl("/projects") },
          { "@type": "ListItem", position: 3, name: repo.name, item: url },
        ],
      },
    ],
  };
}
