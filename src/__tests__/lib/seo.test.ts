import {
  OG_IMAGE_ALT,
  OG_IMAGE_SIZE,
  SITE_KEYWORDS,
  TITLE_TEMPLATE,
  absoluteUrl,
  homeJsonLd,
  pageMetadata,
  personJsonLd,
  profilePageJsonLd,
  projectJsonLd,
} from "@/lib/seo";
import { SITE_CONFIG } from "@/lib/constants";
import { PERSONAL_INFO } from "@/lib/resume-data";
import type { GitHubRepo } from "@/types/github";

const REPO: GitHubRepo = {
  id: 1,
  name: "test-repo",
  full_name: "user/test-repo",
  description: "A test repo",
  html_url: "https://github.com/user/test-repo",
  homepage: null,
  language: "TypeScript",
  stargazers_count: 3,
  forks_count: 1,
  topics: ["nextjs", "ai"],
  created_at: "2024-01-01T00:00:00Z",
  updated_at: "2024-06-01T00:00:00Z",
  pushed_at: "2024-06-02T00:00:00Z",
};

describe("TITLE_TEMPLATE / SITE_KEYWORDS", () => {
  it("suffixes titles with the full name", () => {
    expect(TITLE_TEMPLATE).toBe(`%s — ${PERSONAL_INFO.name}`);
  });

  it("includes the person's name in keywords", () => {
    expect(SITE_KEYWORDS).toContain(PERSONAL_INFO.name);
  });
});

describe("absoluteUrl", () => {
  it("returns the bare origin for the root path", () => {
    expect(absoluteUrl()).toBe(SITE_CONFIG.url);
    expect(absoluteUrl("/")).toBe(SITE_CONFIG.url);
  });

  it("joins nested paths onto the origin", () => {
    expect(absoluteUrl("/about")).toBe(`${SITE_CONFIG.url}/about`);
  });
});

describe("pageMetadata", () => {
  it("builds title, description, canonical and Open Graph for a page", () => {
    const meta = pageMetadata({
      title: "About",
      description: "About page",
      path: "/about",
    });

    expect(meta.title).toBe("About");
    expect(meta.description).toBe("About page");
    expect(meta.alternates).toEqual({ canonical: "/about" });
    expect(meta.openGraph).toMatchObject({
      type: "website",
      siteName: PERSONAL_INFO.name,
      title: `About — ${PERSONAL_INFO.name}`,
      description: "About page",
      url: "/about",
    });
    expect(meta).not.toHaveProperty("keywords");
  });

  it("attaches the default social image unless disabled", () => {
    const withImage = pageMetadata({ title: "A", description: "d", path: "/a" });
    expect(withImage.openGraph?.images).toEqual([
      {
        url: "/opengraph-image",
        ...OG_IMAGE_SIZE,
        type: "image/png",
        alt: OG_IMAGE_ALT,
      },
    ]);

    const withoutImage = pageMetadata({
      title: "A",
      description: "d",
      path: "/a",
      defaultImage: false,
    });
    expect(withoutImage.openGraph).not.toHaveProperty("images");
  });

  it("uses the absolute site title when no title is given (home page)", () => {
    const meta = pageMetadata({ description: "Home", path: "/" });
    expect(meta.title).toEqual({ absolute: SITE_CONFIG.title });
    expect(meta.openGraph?.title).toBe(SITE_CONFIG.title);
  });

  it("passes keywords through when provided", () => {
    const meta = pageMetadata({
      title: "P",
      description: "d",
      path: "/p",
      keywords: ["one", "two"],
    });
    expect(meta.keywords).toEqual(["one", "two"]);
  });
});

describe("personJsonLd", () => {
  it("describes the site owner as a schema.org Person", () => {
    const person = personJsonLd();

    expect(person["@type"]).toBe("Person");
    expect(person["@id"]).toBe(`${SITE_CONFIG.url}/#person`);
    expect(person.name).toBe(PERSONAL_INFO.name);
    expect(person.jobTitle).toBe(PERSONAL_INFO.title);
    expect(person.image).toBe(`${SITE_CONFIG.url}/avatar.jpg`);
    expect(person.sameAs).toEqual([SITE_CONFIG.github, SITE_CONFIG.linkedin]);
    expect(person.worksFor).toEqual({
      "@type": "Organization",
      name: "Codeaza Technologies",
    });
    expect(person.alumniOf).toEqual([
      {
        "@type": "CollegeOrUniversity",
        name: "National University of Sciences and Technology",
      },
    ]);
    expect(person.knowsAbout).toContain("LangGraph");
  });

  it("does not include a phone number", () => {
    expect(JSON.stringify(personJsonLd())).not.toContain(PERSONAL_INFO.phone);
  });
});

describe("homeJsonLd", () => {
  it("contains a WebSite and Person graph", () => {
    const doc = homeJsonLd();
    expect(doc["@context"]).toBe("https://schema.org");
    const types = doc["@graph"]?.map((node) => node["@type"]);
    expect(types).toEqual(["WebSite", "Person"]);
    expect(doc["@graph"]?.[0]).toMatchObject({
      url: SITE_CONFIG.url,
      publisher: { "@id": `${SITE_CONFIG.url}/#person` },
    });
  });
});

describe("profilePageJsonLd", () => {
  it("wraps the Person in a ProfilePage", () => {
    const doc = profilePageJsonLd();
    expect(doc["@type"]).toBe("ProfilePage");
    expect(doc.url).toBe(`${SITE_CONFIG.url}/about`);
    expect(doc.mainEntity).toMatchObject({ "@type": "Person", name: PERSONAL_INFO.name });
  });
});

describe("projectJsonLd", () => {
  it("describes a repo as SoftwareSourceCode with breadcrumbs", () => {
    const doc = projectJsonLd(REPO);
    const [code, breadcrumbs] = doc["@graph"] ?? [];

    expect(code).toMatchObject({
      "@type": "SoftwareSourceCode",
      name: "test-repo",
      description: "A test repo",
      url: `${SITE_CONFIG.url}/projects/test-repo`,
      codeRepository: REPO.html_url,
      programmingLanguage: "TypeScript",
      keywords: "nextjs, ai",
      dateCreated: REPO.created_at,
      dateModified: REPO.pushed_at,
    });
    expect(breadcrumbs["@type"]).toBe("BreadcrumbList");
    expect(breadcrumbs.itemListElement).toHaveLength(3);
  });

  it("omits optional fields that are missing on the repo", () => {
    const doc = projectJsonLd({
      ...REPO,
      description: null,
      language: null,
      topics: [],
    });
    const json = JSON.parse(JSON.stringify(doc));
    const code = json["@graph"][0];

    expect(code).not.toHaveProperty("description");
    expect(code).not.toHaveProperty("programmingLanguage");
    expect(code).not.toHaveProperty("keywords");
  });
});
