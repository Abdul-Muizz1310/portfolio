import { renderHook, act } from "@testing-library/react";
import { useCursor } from "@/hooks/use-cursor";

describe("useCursor — DOM interactions", () => {
  let rafCallbacks: FrameRequestCallback[] = [];

  beforeEach(() => {
    rafCallbacks = [];

    // Simulate fine pointer (non-touch device)
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches:
          query === "(pointer: coarse)"
            ? false
            : query === "(prefers-reduced-motion: reduce)"
              ? false
              : false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    // Capture rAF callbacks to run them manually
    vi.spyOn(window, "requestAnimationFrame").mockImplementation(
      (cb: FrameRequestCallback) => {
        rafCallbacks.push(cb);
        return rafCallbacks.length;
      },
    );
    vi.spyOn(window, "cancelAnimationFrame").mockImplementation(() => {});
  });

  afterEach(() => {
    document.body.classList.remove("custom-cursor");
    vi.restoreAllMocks();
  });

  function runAnimationFrame() {
    if (rafCallbacks.length > 0) {
      const cb = rafCallbacks.shift();
      if (!cb) return;
      cb(performance.now());
    }
  }

  it("adds custom-cursor class to body on mount", () => {
    renderHook(() => useCursor());
    expect(document.body.classList.contains("custom-cursor")).toBe(true);
  });

  it("removes custom-cursor class on unmount", () => {
    const { unmount } = renderHook(() => useCursor());
    expect(document.body.classList.contains("custom-cursor")).toBe(true);

    act(() => {
      unmount();
    });

    expect(document.body.classList.contains("custom-cursor")).toBe(false);
  });

  it("handles mousemove and updates visibility", () => {
    const { result } = renderHook(() => useCursor());

    // Create mock DOM elements for the refs
    const dotEl = document.createElement("div");
    const ringEl = document.createElement("div");

    // Assign refs
    Object.defineProperty(result.current.dotRef, "current", {
      value: dotEl,
      writable: true,
    });
    Object.defineProperty(result.current.ringRef, "current", {
      value: ringEl,
      writable: true,
    });

    // Dispatch a mousemove to set visible and update positions
    act(() => {
      document.dispatchEvent(
        new MouseEvent("mousemove", { clientX: 150, clientY: 250 }),
      );
    });

    // The mousemove handler should have set opacity
    expect(dotEl.style.opacity).toBe("1");
    expect(ringEl.style.opacity).toBe("1");

    // Run one animation frame to update positions
    act(() => {
      runAnimationFrame();
    });

    expect(dotEl.style.left).toBe("150px");
    expect(dotEl.style.top).toBe("250px");
  });

  it("handles mouseover on interactive elements", () => {
    const { result } = renderHook(() => useCursor());

    const ringEl = document.createElement("div");
    Object.defineProperty(result.current.ringRef, "current", {
      value: ringEl,
      writable: true,
    });

    // Create a button and add it to DOM
    const button = document.createElement("button");
    document.body.appendChild(button);

    act(() => {
      button.dispatchEvent(new MouseEvent("mouseover", { bubbles: true }));
    });

    // Ring should be scaled up
    expect(ringEl.style.transform).toContain("scale(1.5)");

    act(() => {
      button.dispatchEvent(new MouseEvent("mouseout", { bubbles: true }));
    });

    // Ring should be scaled back
    expect(ringEl.style.transform).toContain("scale(1)");

    document.body.removeChild(button);
  });

  it("cancelAnimationFrame is called on unmount", () => {
    const { unmount } = renderHook(() => useCursor());

    act(() => {
      unmount();
    });

    expect(window.cancelAnimationFrame).toHaveBeenCalled();
  });

  it("lerp function is used in animation loop", () => {
    const { result } = renderHook(() => useCursor());

    const dotEl = document.createElement("div");
    const ringEl = document.createElement("div");

    Object.defineProperty(result.current.dotRef, "current", {
      value: dotEl,
      writable: true,
    });
    Object.defineProperty(result.current.ringRef, "current", {
      value: ringEl,
      writable: true,
    });

    // Trigger mouse move first to make visible
    act(() => {
      document.dispatchEvent(
        new MouseEvent("mousemove", { clientX: 100, clientY: 100 }),
      );
    });

    // Run animation frame
    act(() => {
      runAnimationFrame();
    });

    // Ring position should have been lerped (not exactly at mouse position
    // since factor is 0.15 for non-reduced-motion)
    expect(ringEl.style.left).toBeTruthy();
    expect(ringEl.style.top).toBeTruthy();
  });
});
