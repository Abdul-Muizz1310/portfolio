describe("Home page", () => {
  it("exports a default function component", async () => {
    const mod = await import("@/app/page");
    expect(mod.default).toBeDefined();
    expect(typeof mod.default).toBe("function");
  });
});
