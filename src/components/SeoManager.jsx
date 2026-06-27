import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { routeMetadata, serviceDetails } from "../data/siteContent.js";
import { useLanguage } from "../hooks/useLanguage.js";
import { siteConfig } from "../config/siteConfig.ts";

const SITE_URL = siteConfig.siteUrl;

function setMeta(selector, content) {
  document.querySelector(selector)?.setAttribute("content", content);
}

function setCanonicalLink(href) {
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }
  link.href = href;
}

export default function SeoManager() {
  const { language } = useLanguage();
  const { pathname } = useLocation();

  useEffect(() => {
    const serviceSlug = pathname.startsWith("/services/") ? pathname.split("/").pop() : null;
    const service = serviceSlug ? serviceDetails[serviceSlug]?.[language] : null;
    const metadata = service
      ? {
          title: `${service.eyebrow} | ${language === "ar" ? "مسار جلوبال" : "Masar Global"}`,
          description: service.description,
        }
      : routeMetadata[pathname]?.[language] || routeMetadata["/"][language];
    const canonical = `${SITE_URL}${pathname === "/" ? "/" : pathname}`;

    document.title = metadata.title;
    setMeta('meta[name="description"]', metadata.description);
    setMeta('meta[property="og:title"]', metadata.title);
    setMeta('meta[property="og:description"]', metadata.description);
    setMeta('meta[property="og:url"]', canonical);
    setMeta('meta[name="twitter:title"]', metadata.title);
    setMeta('meta[name="twitter:description"]', metadata.description);
    setCanonicalLink(canonical);
  }, [language, pathname]);

  return null;
}
