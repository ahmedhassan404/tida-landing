import AboutSection from "../components/AboutSection.jsx";
import CTASection from "../components/CTASection.jsx";
import { MarketCards, RelatedLinks, SummaryCards } from "../components/ContentBlocks.jsx";
import TeamSection from "../components/TeamSection.jsx";
import WhyChooseUs from "../components/WhyChooseUs.jsx";
import { pageCopy } from "../data/siteContent.js";
import { useLanguage } from "../hooks/useLanguage.js";

export default function AboutPage() {
  const { language } = useLanguage();
  const page = pageCopy[language];
  const copy = page.about;

  return (
    <>
      <AboutSection />
      <WhyChooseUs />
      <MarketCards items={copy.markets} title={copy.marketsTitle} description={copy.marketsText} />
      <SummaryCards eyebrow={language === "ar" ? "نموذج التشغيل" : "Operating model"} items={copy.model} title={copy.modelTitle} />
      <TeamSection />
      <RelatedLinks links={[
        { label: page.common.services, to: "/services" },
        { label: language === "ar" ? "تعرّف على الفريق" : "Meet the team", to: "/team" },
      ]} />
      <CTASection title={page.home.finalTitle} description={page.home.finalText} primaryLabel={page.common.consultation} />
    </>
  );
}
