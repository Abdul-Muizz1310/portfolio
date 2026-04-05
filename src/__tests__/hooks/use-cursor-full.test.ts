import { renderHook, act } from "@testing-library/react";
import { useCursor } from "@/hooks/use-cursor";

describe("useCursor — full", () => {
  let addSpy: ReturnType<typeof vi.spyOn>;
  let removeSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    addSpy = vi.spyOn(document, "addEventListener");
    removeSpy = vi.spyOn(document, "removeEventListener");

    // Simulate a fine pointer (non-touch)
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: query === "(pointer: coarse)" ? false : false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  afterEach(() => {
    addSpy.mockRestore();
    removeSpy.mockRestore();
  });

  it("returns an object with dotRef and ringRef", () => {
    const { result } = renderHook(() => useCursor());
    expect(result.current).toHaveProperty("dotRef");
    expect(result.current).toHaveProperty("ringRef");
    expect(result.current.dotRef).toHaveProperty("current");
    expect(result.current.ringRef).toHaveProperty("current");
  });

  it("adds mousemove listener on mount", () => {
    renderHook(() => useCursor());

    const mousemoveCalls = addSpy.mock.calls.filter(
      (call) => call[0] === "mousemove",
    );
    expect(mousemoveCalls.length).toBeGreaterThan(0);
  });

  it("removes mousemove listener on unmount", () => {
    const { unmount } = renderHook(() => useCursor());

    act(() => {
      unmount();
    });

    const removeCalls = removeSpy.mock.calls.filter(
      (call) => call[0] === "mousemove",
    );
    expect(removeCalls.length).toBeGreaterThan(0);
  });
});
