import { render, screen, within } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { LanguageContext } from "../context/languageContext.js";
import { translations } from "../i18n/translations.js";
import Hero from "./Hero.jsx";

describe("Hero", () => {
  test("service numbering is derived from the current content", () => {
    const serviceCards = ["Marketing", "ERP", "Websites", "Branding"];
    const copy = {
      ...translations.en,
      hero: {
        ...translations.en.hero,
        serviceCards,
      },
    };

    render(
      <LanguageContext.Provider
        value={{ copy, language: "en", toggleLanguage: vi.fn() }}
      >
        <Hero />
      </LanguageContext.Provider>
    );

    expect(screen.getByText("01—04")).toBeInTheDocument();
    const growthMap = screen.getByRole("img", { name: copy.hero.orbitLabel });
    serviceCards.forEach((service) => {
      expect(within(growthMap).getByText(service)).toBeInTheDocument();
    });
  });
});
