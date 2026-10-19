import robots from "@/app/robots";
import { SITE_CONFIG } from "@/lib/constants";

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
    expect(result.sitemap).toBe(`${SITE_CONFIG.url}/sitemap.xml`);
  });
});
