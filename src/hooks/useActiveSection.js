import { useEffect, useState } from "react";

function mostVisibleSection(sectionVisibility) {
  return [...sectionVisibility.entries()]
    .filter(([, ratio]) => ratio > 0)
    .sort(([, firstRatio], [, secondRatio]) => secondRatio - firstRatio)[0]?.[0];
}

export function useActiveSection(sectionIds) {
  const [activeSectionId, setActiveSectionId] = useState(null);

  useEffect(() => {
    const sections = sectionIds
      .map((sectionId) => document.getElementById(sectionId))
      .filter(Boolean);
    const sectionVisibility = new Map(sections.map((section) => [section.id, 0]));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          sectionVisibility.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        });

        const visibleSectionId = mostVisibleSection(sectionVisibility);
        if (visibleSectionId) setActiveSectionId(visibleSectionId);
      },
      {
        rootMargin: "-18% 0px -58% 0px",
        threshold: [0, 0.15, 0.35, 0.6],
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [sectionIds]);

  return activeSectionId;
}
