const mockConfigureBoneyard = vi.fn();

vi.mock("boneyard-js/react", () => ({
  configureBoneyard: mockConfigureBoneyard,
}));

describe("boneyard configuration", () => {
  it("calls configureBoneyard with correct config", async () => {
    // Force re-import to trigger the side effect
    vi.resetModules();

    // Re-setup the mock after resetModules
    vi.doMock("boneyard-js/react", () => ({
      configureBoneyard: mockConfigureBoneyard,
    }));

    await import("@/lib/boneyard");

    expect(mockConfigureBoneyard).toHaveBeenCalledWith({
      darkColor: "rgba(255, 255, 255, 0.06)",
      animate: "shimmer",
    });
  });
});
