import { cn } from "@/lib/utils";

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("handles conditional classes", () => {
    expect(cn("base", false && "hidden", "visible")).toBe("base visible");
  });

  it("resolves Tailwind conflicts by keeping the last one", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });

  it("resolves conflicting text colors", () => {
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
  });

  it("handles undefined values", () => {
    expect(cn("base", undefined, "end")).toBe("base end");
  });

  it("handles null values", () => {
    expect(cn("base", null, "end")).toBe("base end");
  });

  it("handles false values", () => {
    expect(cn("base", false, "end")).toBe("base end");
  });

  it("returns empty string when called with no arguments", () => {
    expect(cn()).toBe("");
  });
});
