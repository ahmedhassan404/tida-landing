import ContactSection from "../components/ContactSection.jsx";
import { FAQSection } from "../components/ContentBlocks.jsx";
import { pageCopy } from "../data/siteContent.js";
import { useLanguage } from "../hooks/useLanguage.js";

export default function ContactPage() {
  const { language } = useLanguage();
  const copy = pageCopy[language].contact;
  return (
    <>
      <ContactSection />
      <FAQSection items={copy.faqs} title={copy.faqTitle} />
    </>
  );
}
