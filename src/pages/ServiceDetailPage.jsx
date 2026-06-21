import { ArrowRight, FileScan, ScanLine } from "lucide-react";
import { useParams } from "react-router-dom";
import CTASection from "../components/CTASection.jsx";
import { ProcessSection, RelatedLinks, SummaryCards } from "../components/ContentBlocks.jsx";
import Container from "../components/ui/Container.jsx";
import SectionHeader from "../components/ui/SectionHeader.jsx";
import { pageCopy, serviceDetails } from "../data/siteContent.js";
import { useLanguage } from "../hooks/useLanguage.js";
import NotFoundPage from "./NotFoundPage.jsx";

export default function ServiceDetailPage() {
  const { serviceSlug } = useParams();
  const { language } = useLanguage();
  const service = serviceDetails[serviceSlug];
  if (!service) return <NotFoundPage />;

  const content = service[language];
  const page = pageCopy[language];
  const labels = language === "ar"
    ? { problem: "المشكلة", deliverables: "ما الذي تستلمه؟", tools: "الأنظمة والأدوات", audience: "لمن هذه الخدمة؟", outcome: "النتيجة المتوقعة" }
    : { problem: "The problem", deliverables: "What you receive", tools: "Systems and tools", audience: "Who this is for", outcome: "Expected business outcome" };

  return (
    <>
      <section className="section service-problem-section">
        <Container>
          <div className="service-problem-card">
            <span className="eyebrow">{labels.problem}</span>
            <h2>{content.problem}</h2>
          </div>
        </Container>
      </section>
      <ProcessSection items={content.process} title={language === "ar" ? "كيف ننفذ الخدمة؟" : "How the service is delivered"} />
      <SummaryCards
        eyebrow={labels.deliverables}
        items={content.deliverables}
        title={labels.deliverables}
      />
      <section className="section service-context-section">
        <Container>
          <SectionHeader eyebrow={labels.tools} title={labels.tools} />
          <div className="tool-tags">
            {content.tools.map((tool) => <span key={tool}>{tool}</span>)}
          </div>
          <div className="service-context-grid">
            <article><span>{labels.audience}</span><h3>{content.audience}</h3></article>
            <article><span>{labels.outcome}</span><h3>{content.outcome}</h3></article>
          </div>
          {content.flow && (
            <div className="automation-flow">
              {content.flow.map((step, index) => (
                <div className="automation-step" key={step}>
                  {index === 0 ? <FileScan size={22} /> : <ScanLine size={22} />}
                  <strong>{step}</strong>
                  {index < content.flow.length - 1 && <ArrowRight className="flow-arrow" size={18} />}
                </div>
              ))}
            </div>
          )}
        </Container>
      </section>
      <RelatedLinks links={[
        content.related,
        { label: language === "ar" ? "استعرض جميع الخدمات" : "View all services", to: "/services" },
        { label: language === "ar" ? "دراسات الحالة" : "Case studies", to: "/case-studies" },
      ]} />
      <CTASection title={content.cta} description={content.outcome} primaryLabel={page.common.consultation} />
    </>
  );
}
