import CTASection from "../components/CTASection.jsx";
import { RelatedLinks, ServiceGroups } from "../components/ContentBlocks.jsx";
import ServiceCatalog from "../components/ServiceCatalog.jsx";
import Container from "../components/ui/Container.jsx";
import SectionHeader from "../components/ui/SectionHeader.jsx";
import { pageCopy } from "../data/siteContent.js";
import { useLanguage } from "../hooks/useLanguage.js";

export default function ServicesPage() {
  const { language } = useLanguage();
  const page = pageCopy[language];
  return (
    <>
      <section className="section">
        <Container>
          <SectionHeader description={page.services.groupsText} eyebrow={page.services.eyebrow} split title={page.services.groupsTitle} />
          <ServiceGroups />
        </Container>
      </section>
      <section className="section">
        <Container>
          <SectionHeader
            description={language === "ar" ? "Ø§ÙØªØ­ ØµÙØ­Ø© Ø§Ù„Ø®Ø¯Ù…Ø© Ù„Ù…Ø¹Ø±ÙØ© Ø§Ù„Ù…Ø´ÙƒÙ„Ø© Ø§Ù„ØªÙŠ ØªØ¹Ø§Ù„Ø¬Ù‡Ø§ ÙˆØ§Ù„Ù…Ø®Ø±Ø¬Ø§Øª Ø§Ù„Ù…ØªÙˆÙ‚Ø¹Ø© ÙˆØ§Ù„Ø®Ø·ÙˆØ© Ø§Ù„ØªØ§Ù„ÙŠØ©." : "Open a service to see the problem it solves, expected deliverables, and the next step."}
            eyebrow={language === "ar" ? "ØªÙØ§ØµÙŠÙ„ Ø§Ù„Ø®Ø¯Ù…Ø§Øª" : "Service details"}
            split
            title={language === "ar" ? "Ø³ØªØ© Ù…Ø³Ø§Ø±Ø§Øª ÙˆØ§Ø¶Ø­Ø© Ù„Ù„Ø¹Ù…Ù„" : "Six clear ways to work together"}
          />
          <ServiceCatalog />
        </Container>
      </section>
      <RelatedLinks links={[
        { label: language === "ar" ? "Ø§Ù‚Ø±Ø£ Ø¯Ø±Ø§Ø³Ø§Øª Ø§Ù„Ø­Ø§Ù„Ø©" : "Read case studies", to: "/case-studies" },
      ]} />
      <CTASection title={page.home.finalTitle} description={page.home.finalText} primaryLabel={page.common.consultation} />
    </>
  );
}
