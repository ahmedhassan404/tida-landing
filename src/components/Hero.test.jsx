import { render, screen, within } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { LanguageContext } from "../context/languageContext.js";
import { translations } from "../i18n/translations.js";
import Hero from "./Hero.jsx";

describe("Hero", () => {
  test("operating stages are derived from the localized signal", () => {
    const signal = "Diagnose → Deliver → Improve → Scale";
    const copy = {
      ...translations.en,
      hero: {
        ...translations.en.hero,
        signal,
      },
    };

    render(
      <MemoryRouter>
        <LanguageContext.Provider
          value={{ copy, language: "en", toggleLanguage: vi.fn() }}
        >
          <Hero />
        </LanguageContext.Provider>
      </MemoryRouter>
    );

    const growthMap = screen.getByRole("region", { name: copy.hero.orbitLabel });
    expect(within(growthMap).getByText("01—04")).toBeInTheDocument();
    signal.split(/\s*→\s*/).forEach((stage) => {
      expect(within(growthMap).getByText(stage)).toBeInTheDocument();
    });
  });
});
