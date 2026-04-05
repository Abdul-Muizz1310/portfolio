import robots from "@/app/robots";

describe("robots", () => {
  it("exports a default function", () => {
    expect(typeof robots).toBe("function");
  });

  it("returns an object with rules field", () => {
    const result = robots();
    expect(result).toHaveProperty("rules");
    expect(result.rules).toEqual({ userAgent: "*", allow: "/" });
  });

  it("returns an object with sitemap field", () => {
    const result = robots();
    expect(result).toHaveProperty("sitemap");
    expect(result.sitemap).toBe("https://abdul-muizz.dev/sitemap.xml");
  });
});
