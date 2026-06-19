import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { LanguageProvider } from "../context/LanguageContext.jsx";
import { translations } from "../i18n/translations.js";
import StickyScrollytelling from "./StickyScrollytelling.jsx";

describe("StickyScrollytelling", () => {
  test("arabic mode uses translated content and preserves the process anchor", () => {
    localStorage.setItem("tida-language", "ar");

    render(
      <LanguageProvider>
        <StickyScrollytelling />
      </LanguageProvider>
    );

    const heading = screen.getByRole("heading", {
      level: 2,
      name: translations.ar.walkthrough.title,
    });

    expect(heading.closest("section")).toHaveAttribute("id", "process");
    expect(screen.getByText(translations.ar.walkthrough.steps[0].title)).toBeInTheDocument();
    expect(screen.queryByText(translations.en.walkthrough.title)).not.toBeInTheDocument();
  });
});
