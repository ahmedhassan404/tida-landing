import AboutSection from "../components/AboutSection.jsx";
import CTASection from "../components/CTASection.jsx";
import { RelatedLinks, SummaryCards } from "../components/ContentBlocks.jsx";
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
      <SummaryCards eyebrow={language === "ar" ? "Ù†Ù…ÙˆØ°Ø¬ Ø§Ù„ØªØ´ØºÙŠÙ„" : "Operating model"} items={copy.model} title={copy.modelTitle} />
      <RelatedLinks links={[
        { label: page.common.services, to: "/services" },
      ]} />
      <CTASection title={page.home.finalTitle} description={page.home.finalText} primaryLabel={page.common.consultation} />
    </>
  );
}
