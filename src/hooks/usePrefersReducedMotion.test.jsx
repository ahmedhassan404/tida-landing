import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion.js";

function reducedMotionQuery(query) {
  return {
    addEventListener: vi.fn(),
    addListener: vi.fn(),
    dispatchEvent: vi.fn(),
    matches: query === "(prefers-reduced-motion)",
    media: query,
    onchange: null,
    removeEventListener: vi.fn(),
    removeListener: vi.fn(),
  };
}

describe("usePrefersReducedMotion", () => {
  test("reports the browser reduced-motion preference", async () => {
    window.matchMedia = vi.fn(reducedMotionQuery);

    const { result } = renderHook(() => usePrefersReducedMotion());

    await waitFor(() => expect(result.current).toBe(true));
  });
});
