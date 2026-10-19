import { render, screen } from "@testing-library/react";
import {
  OgFrame,
  OgPrompt,
  SITE_HOST,
  loadOgFonts,
  plural,
  truncate,
} from "@/lib/og-image";
import { SITE_CONFIG } from "@/lib/constants";

describe("og-image helpers", () => {
  it("derives the host from the site URL", () => {
    expect(SITE_HOST).toBe(new URL(SITE_CONFIG.url).host);
  });

  it("truncate leaves short text alone and ellipsizes long text", () => {
    expect(truncate("short", 10)).toBe("short");
    expect(truncate("a long sentence here", 10)).toBe("a long se…");
    expect(truncate("a long sentence here", 10)).toHaveLength(10);
    // trailing whitespace is trimmed before the ellipsis
    expect(truncate("abcd efgh", 6)).toBe("abcd…");
  });

  it("plural handles singular and plural counts", () => {
    expect(plural(1, "star")).toBe("1 star");
    expect(plural(0, "fork")).toBe("0 forks");
    expect(plural(12, "star")).toBe("12 stars");
  });

  it("loads the bundled TTF fonts", async () => {
    const fonts = await loadOgFonts();

    expect(fonts.map((f) => [f.name, f.weight])).toEqual([
      ["Space Grotesk", 700],
      ["Geist Mono", 400],
      ["Geist Mono", 600],
    ]);
    fonts.forEach((font) => expect(font.data.byteLength).toBeGreaterThan(1000));
  });
});

describe("OgFrame / OgPrompt", () => {
  it("renders the window title and children", () => {
    render(
      <OgFrame filename="~/test.md">
        <OgPrompt command="whoami" />
      </OgFrame>,
    );

    expect(screen.getByText("~/test.md")).toBeInTheDocument();
    expect(screen.getByText("visitor@abdul-muizz:~$")).toBeInTheDocument();
    expect(screen.getByText("whoami")).toBeInTheDocument();
  });
});
