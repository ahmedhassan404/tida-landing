import CTASection from "../components/CTASection.jsx";
import { RelatedLinks, SummaryCards } from "../components/ContentBlocks.jsx";
import { TeamRoster } from "../components/TeamSection.jsx";
import { pageCopy } from "../data/siteContent.js";
import { useLanguage } from "../hooks/useLanguage.js";

export default function TeamPage() {
  const { language } = useLanguage();
  const page = pageCopy[language];
  return (
    <>
      <TeamRoster />
      <SummaryCards
        eyebrow={language === "ar" ? "مجالات الخبرة" : "Expertise"}
        items={page.team.expertise}
        title={page.team.expertiseTitle}
      />
      <RelatedLinks links={[
        { label: page.common.services, to: "/services" },
        { label: language === "ar" ? "استعرض أعمالنا" : "View our work", to: "/portfolio" },
      ]} />
      <CTASection title={page.home.finalTitle} description={page.home.finalText} primaryLabel={page.common.consultation} />
    </>
  );
}
