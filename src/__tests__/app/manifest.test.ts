import manifest from "@/app/manifest";
import { SITE_CONFIG } from "@/lib/constants";

describe("manifest", () => {
  it("describes the site as an installable web app", () => {
    const result = manifest();

    expect(result.name).toBe(SITE_CONFIG.title);
    expect(result.start_url).toBe("/");
    expect(result.display).toBe("standalone");
    expect(result.theme_color).toBe(SITE_CONFIG.themeColor);
    expect(result.background_color).toBe(SITE_CONFIG.themeColor);
  });

  it("lists SVG, PNG and maskable icons", () => {
    const icons = manifest().icons ?? [];
    const srcs = icons.map((icon) => icon.src);

    expect(srcs).toEqual([
      "/icon.svg",
      "/icon-192.png",
      "/icon-512.png",
      "/icon-maskable-512.png",
    ]);
    expect(icons.find((icon) => icon.purpose === "maskable")?.sizes).toBe("512x512");
  });
});
