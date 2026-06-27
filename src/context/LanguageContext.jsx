import { useEffect, useMemo, useState } from "react";
import { translations } from "../i18n/translations.js";
import { LanguageContext } from "./languageContext.js";

const STORAGE_KEY = "masar-global-language";

function initialLanguage() {
  return localStorage.getItem(STORAGE_KEY) === "ar" ? "ar" : "en";
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(initialLanguage);
  const copy = translations[language];

  useEffect(() => {
    const root = document.documentElement;
    root.lang = language;
    root.dir = language === "ar" ? "rtl" : "ltr";
    document.querySelector('meta[property="og:locale"]')?.setAttribute("content", copy.meta.locale);
    localStorage.setItem(STORAGE_KEY, language);
  }, [copy, language]);

  const contextValue = useMemo(
    () => ({
      language,
      copy,
      toggleLanguage: () => setLanguage((current) => (current === "en" ? "ar" : "en")),
    }),
    [copy, language]
  );

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}
