import { renderHook, act } from "@testing-library/react";
import { useKonami } from "@/hooks/use-konami";

const KONAMI_SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA",
];

function pressKey(key: string) {
  const code = key.startsWith("Key") ? key : "";
  const keyValue = key.startsWith("Key") ? key.replace("Key", "").toLowerCase() : key;
  document.dispatchEvent(
    new KeyboardEvent("keydown", { key: keyValue, code: code || key, bubbles: true }),
  );
}

describe("useKonami", () => {
  it("initial state isActive is false", () => {
    const { result } = renderHook(() => useKonami());
    expect(result.current.isActive).toBe(false);
  });

  it("activates after full Konami sequence", () => {
    const { result } = renderHook(() => useKonami());

    act(() => {
      for (const key of KONAMI_SEQUENCE) {
        pressKey(key);
      }
    });

    expect(result.current.isActive).toBe(true);
  });

  it("does not activate with partial sequence", () => {
    const { result } = renderHook(() => useKonami());

    act(() => {
      pressKey("ArrowUp");
      pressKey("ArrowUp");
      pressKey("ArrowDown");
    });

    expect(result.current.isActive).toBe(false);
  });

  it("does not activate with wrong sequence", () => {
    const { result } = renderHook(() => useKonami());

    act(() => {
      pressKey("ArrowUp");
      pressKey("ArrowUp");
      pressKey("ArrowLeft"); // wrong — should be ArrowDown
    });

    expect(result.current.isActive).toBe(false);
  });

  it("deactivate resets isActive to false", () => {
    const { result } = renderHook(() => useKonami());

    act(() => {
      for (const key of KONAMI_SEQUENCE) {
        pressKey(key);
      }
    });

    expect(result.current.isActive).toBe(true);

    act(() => {
      result.current.deactivate();
    });

    expect(result.current.isActive).toBe(false);
  });

  it("resets after wrong key and accepts new sequence", () => {
    const { result } = renderHook(() => useKonami());

    act(() => {
      pressKey("ArrowUp");
      pressKey("ArrowDown"); // wrong — resets buffer
    });

    expect(result.current.isActive).toBe(false);

    // Now enter full correct sequence
    act(() => {
      for (const key of KONAMI_SEQUENCE) {
        pressKey(key);
      }
    });

    expect(result.current.isActive).toBe(true);
  });
});
