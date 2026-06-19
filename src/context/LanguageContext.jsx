import { useEffect, useMemo, useState } from "react";
import { translations } from "../i18n/translations.js";
import { LanguageContext } from "./languageContext.js";

const STORAGE_KEY = "tida-language";

function initialLanguage() {
  return localStorage.getItem(STORAGE_KEY) === "ar" ? "ar" : "en";
}

function updateMetaContent(selector, content) {
  document.querySelector(selector)?.setAttribute("content", content);
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(initialLanguage);
  const copy = translations[language];

  useEffect(() => {
    const root = document.documentElement;
    root.lang = language;
    root.dir = language === "ar" ? "rtl" : "ltr";
    document.title = copy.meta.title;
    updateMetaContent('meta[name="description"]', copy.meta.description);
    updateMetaContent('meta[property="og:title"]', copy.meta.title);
    updateMetaContent('meta[property="og:description"]', copy.meta.description);
    updateMetaContent('meta[property="og:locale"]', copy.meta.locale);
    updateMetaContent('meta[name="twitter:title"]', copy.meta.title);
    updateMetaContent('meta[name="twitter:description"]', copy.meta.description);
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
