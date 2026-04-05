describe("About page", () => {
  it("exports a default function component", async () => {
    const mod = await import("@/app/about/page");
    expect(mod.default).toBeDefined();
    expect(typeof mod.default).toBe("function");
  });

  it("exports metadata", async () => {
    const mod = await import("@/app/about/page");
    expect(mod.metadata).toBeDefined();
    expect(mod.metadata).toHaveProperty("title");
    expect(mod.metadata).toHaveProperty("description");
  });
});
