import CTASection from "../components/CTASection.jsx";
import { RelatedLinks, ServiceGroups } from "../components/ContentBlocks.jsx";
import ServiceCatalog from "../components/ServiceCatalog.jsx";
import SolutionsShowcase from "../components/SolutionsShowcase.jsx";
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
            description={language === "ar" ? "افتح صفحة الخدمة لمعرفة المشكلة التي تعالجها والمخرجات المتوقعة والخطوة التالية." : "Open a service to see the problem it solves, expected deliverables, and the next step."}
            eyebrow={language === "ar" ? "تفاصيل الخدمات" : "Service details"}
            split
            title={language === "ar" ? "سبعة مسارات واضحة للعمل" : "Seven clear ways to work together"}
          />
          <ServiceCatalog />
        </Container>
      </section>
      <SolutionsShowcase />
      <RelatedLinks links={[
        { label: language === "ar" ? "استعرض أعمالنا" : "View our work", to: "/portfolio" },
        { label: language === "ar" ? "اقرأ دراسات الحالة" : "Read case studies", to: "/case-studies" },
      ]} />
      <CTASection title={page.home.finalTitle} description={page.home.finalText} primaryLabel={page.common.consultation} />
    </>
  );
}
