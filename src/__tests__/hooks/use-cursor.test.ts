import { renderHook } from "@testing-library/react";
import { useCursor } from "@/hooks/use-cursor";

describe("useCursor", () => {
  it("returns dotRef and ringRef objects", () => {
    const { result } = renderHook(() => useCursor());
    expect(result.current.dotRef).toBeDefined();
    expect(result.current.ringRef).toBeDefined();
    expect(result.current.dotRef).toHaveProperty("current");
    expect(result.current.ringRef).toHaveProperty("current");
  });
});
