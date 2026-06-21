import CTASection from "../components/CTASection.jsx";
import { RelatedLinks } from "../components/ContentBlocks.jsx";
import { PortfolioGallery } from "../components/PortfolioShowcase.jsx";
import ResultsSection from "../components/ResultsSection.jsx";
import { pageCopy } from "../data/siteContent.js";
import { useLanguage } from "../hooks/useLanguage.js";

export default function PortfolioPage() {
  const { language } = useLanguage();
  const page = pageCopy[language];
  return (
    <>
      <PortfolioGallery />
      <ResultsSection />
      <RelatedLinks links={[
        { label: language === "ar" ? "اقرأ دراسات الحالة" : "Read case studies", to: "/case-studies" },
        { label: page.common.services, to: "/services" },
      ]} />
      <CTASection title={page.home.finalTitle} description={page.home.finalText} primaryLabel={page.common.consultation} />
    </>
  );
}
