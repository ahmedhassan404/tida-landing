import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { LanguageProvider } from "../context/LanguageContext.jsx";
import { ThemeProvider } from "../context/ThemeContext.jsx";
import { translations } from "../i18n/translations.js";
import { navigation } from "../data/siteContent.js";
import { MemoryRouter } from "react-router-dom";
import FinancialSolutions from "./FinancialSolutions.jsx";
import Navbar from "./layout/Navbar.jsx";
import { TooltipProvider } from "./ui/Tooltip.jsx";

function renderFinanceExperience() {
  render(
    <MemoryRouter>
      <ThemeProvider>
        <LanguageProvider>
          <TooltipProvider>
            <Navbar />
            <FinancialSolutions />
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </MemoryRouter>
  );
}

describe("FinancialSolutions", () => {
  test("selecting a finance tab updates the visible panel and query state", () => {
    renderFinanceExperience();

    fireEvent.click(
      screen.getByRole("tab", {
        name: translations.en.financial.tabs[1].label,
      })
    );

    expect(
      screen.getByRole("heading", {
        level: 3,
        name: translations.en.financial.tabs[1].title,
      })
    ).toBeInTheDocument();
    expect(window.location.search).toBe("?finance=operations");
  });

  test("arabic mode renders RTL content and route navigation", async () => {
    localStorage.setItem("tida-language", "ar");
    renderFinanceExperience();

    await waitFor(() => expect(document.documentElement).toHaveAttribute("dir", "rtl"));
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: translations.ar.financial.title,
      })
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("link", {
        name: navigation.ar[2].label,
      })[0]
    ).toHaveAttribute("href", navigation.ar[2].to);
  });
});
