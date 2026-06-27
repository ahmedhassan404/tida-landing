import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { useLanguage } from "../hooks/useLanguage.js";
import { translations } from "../i18n/translations.js";
import { LanguageProvider } from "./LanguageContext.jsx";

function LanguageControls() {
  const { copy, toggleLanguage } = useLanguage();

  return (
    <>
      <span>{copy.walkthrough.title}</span>
      <button onClick={toggleLanguage} type="button">
        switch
      </button>
    </>
  );
}

describe("LanguageProvider", () => {
  test("switching language updates visible copy, document direction, and persistence", async () => {
    render(
      <LanguageProvider>
        <LanguageControls />
      </LanguageProvider>
    );

    fireEvent.click(screen.getByRole("button", { name: "switch" }));

    expect(screen.getByText(translations.ar.walkthrough.title)).toBeInTheDocument();
    await waitFor(() => expect(document.documentElement).toHaveAttribute("dir", "rtl"));
    expect(localStorage.getItem("tida-language")).toBe("ar");
  });
});
