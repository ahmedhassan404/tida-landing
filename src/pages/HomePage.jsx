import { Link } from "react-router-dom";
import CTASection from "../components/CTASection.jsx";
import { ProcessSection, RelatedLinks, SummaryCards } from "../components/ContentBlocks.jsx";
import ContactSection from "../components/ContactSection.jsx";
import Hero from "../components/Hero.jsx";
import LogoMarquee from "../components/LogoMarquee.jsx";
import PortfolioShowcase from "../components/PortfolioShowcase.jsx";
import ResultsSection from "../components/ResultsSection.jsx";
import ServiceCatalog from "../components/ServiceCatalog.jsx";
import TeamSection from "../components/TeamSection.jsx";
import WhyChooseUs from "../components/WhyChooseUs.jsx";
import Container from "../components/ui/Container.jsx";
import { Button } from "../components/ui/Button.jsx";
import SectionHeader from "../components/ui/SectionHeader.jsx";
import { pageCopy } from "../data/siteContent.js";
import { useLanguage } from "../hooks/useLanguage.js";

export default function HomePage() {
  const { language } = useLanguage();
  const page = pageCopy[language];

  return (
    <>
      <Hero />
      <LogoMarquee />
      <SummaryCards
        description={page.home.problemsText}
        eyebrow={language === "ar" ? "التحديات" : "Common problems"}
        items={page.home.problems}
        title={page.home.problemsTitle}
      />
      <section className="section home-services">
        <Container>
          <SectionHeader
            description={page.home.servicesText}
            eyebrow={language === "ar" ? "الخدمات الرئيسية" : "Main services"}
            split
            title={page.home.servicesTitle}
          />
          <ServiceCatalog />
          <div className="section-action section-action-group">
            <Button asChild variant="secondary"><Link to="/services">{page.common.services}</Link></Button>
            <Button asChild><Link to="/contact">{page.common.consultation}</Link></Button>
          </div>
        </Container>
      </section>
      <ProcessSection items={page.home.process} title={page.home.processTitle} />
      <SummaryCards
        description={page.home.audienceText}
        eyebrow={language === "ar" ? "لمن نقدم خدماتنا؟" : "Who TIDA helps"}
        items={page.home.audiences}
        title={page.home.audienceTitle}
      />
      <PortfolioShowcase />
      <RelatedLinks links={[
        { label: language === "ar" ? "استعرض كل الأعمال" : "View all work", to: "/portfolio" },
        { label: language === "ar" ? "اقرأ دراسات الحالة" : "Read case studies", to: "/case-studies" },
        { label: page.common.contact, to: "/contact" },
      ]} />
      <ResultsSection />
      <WhyChooseUs />
      <TeamSection />
      <CTASection title={page.home.finalTitle} description={page.home.finalText} primaryLabel={page.common.consultation} />
      <ContactSection />
    </>
  );
}
