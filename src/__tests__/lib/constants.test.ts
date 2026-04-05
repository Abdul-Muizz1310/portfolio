import {
  SITE_CONFIG,
  NAV_LINKS,
  GITHUB_USERNAME,
  LANGUAGE_EXTENSIONS,
  LANGUAGE_COLORS,
} from "@/lib/constants";

describe("SITE_CONFIG", () => {
  it("has all required fields", () => {
    expect(SITE_CONFIG).toHaveProperty("name");
    expect(SITE_CONFIG).toHaveProperty("title");
    expect(SITE_CONFIG).toHaveProperty("description");
    expect(SITE_CONFIG).toHaveProperty("url");
    expect(SITE_CONFIG).toHaveProperty("github");
    expect(SITE_CONFIG).toHaveProperty("linkedin");
    expect(SITE_CONFIG).toHaveProperty("email");
  });

  it("has non-empty string values for all fields", () => {
    expect(typeof SITE_CONFIG.name).toBe("string");
    expect(SITE_CONFIG.name.length).toBeGreaterThan(0);
    expect(typeof SITE_CONFIG.url).toBe("string");
    expect(SITE_CONFIG.url).toMatch(/^https?:\/\//);
  });
});

describe("NAV_LINKS", () => {
  it("has correct structure for each link", () => {
    NAV_LINKS.forEach((link) => {
      expect(link).toHaveProperty("label");
      expect(link).toHaveProperty("href");
      expect(link).toHaveProperty("path");
      expect(typeof link.label).toBe("string");
      expect(typeof link.href).toBe("string");
      expect(typeof link.path).toBe("string");
    });
  });

  it("contains exactly the expected navigation links", () => {
    const expected = [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Projects", href: "/projects" },
      { label: "Resume", href: "/resume" },
      { label: "Contact", href: "/contact" },
    ];

    expect(NAV_LINKS).toHaveLength(expected.length);

    expected.forEach(({ label, href }) => {
      const found = NAV_LINKS.find(
        (link) => link.label === label && link.href === href
      );
      expect(found).toBeDefined();
    });
  });
});

describe("GITHUB_USERNAME", () => {
  it('is "Abdul-Muizz1310"', () => {
    expect(GITHUB_USERNAME).toBe("Abdul-Muizz1310");
  });
});

describe("LANGUAGE_EXTENSIONS", () => {
  it("maps common languages to file extensions", () => {
    expect(LANGUAGE_EXTENSIONS.Python).toBe(".py");
    expect(LANGUAGE_EXTENSIONS.TypeScript).toBe(".ts");
    expect(LANGUAGE_EXTENSIONS.JavaScript).toBe(".js");
    expect(LANGUAGE_EXTENSIONS.HTML).toBe(".html");
    expect(LANGUAGE_EXTENSIONS.CSS).toBe(".css");
  });
});

describe("LANGUAGE_COLORS", () => {
  it("maps common languages to hex color strings", () => {
    expect(LANGUAGE_COLORS.Python).toMatch(/^#[0-9A-Fa-f]{6}$/);
    expect(LANGUAGE_COLORS.TypeScript).toMatch(/^#[0-9A-Fa-f]{6}$/);
    expect(LANGUAGE_COLORS.JavaScript).toMatch(/^#[0-9A-Fa-f]{6}$/);
  });
});
