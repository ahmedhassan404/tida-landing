import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach, vi } from "vitest";

class VisibleIntersectionObserver {
  constructor(callback) {
    this.callback = callback;
  }

  disconnect() {}

  observe(target) {
    this.callback([{ intersectionRatio: 1, isIntersecting: true, target }]);
  }

  unobserve() {}
}

function mediaQueryResult(matches, media) {
  return {
    addEventListener: vi.fn(),
    addListener: vi.fn(),
    dispatchEvent: vi.fn(),
    matches,
    media,
    onchange: null,
    removeEventListener: vi.fn(),
    removeListener: vi.fn(),
  };
}

beforeEach(() => {
  window.IntersectionObserver = VisibleIntersectionObserver;
  window.matchMedia = vi.fn((query) => mediaQueryResult(false, query));
});

afterEach(() => {
  cleanup();
  document.documentElement.removeAttribute("dir");
  document.documentElement.removeAttribute("lang");
  localStorage.clear();
  window.history.replaceState({}, "", "/");
  vi.restoreAllMocks();
});
