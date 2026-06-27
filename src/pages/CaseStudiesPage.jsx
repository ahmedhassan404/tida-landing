import CTASection from "../components/CTASection.jsx";
import { RelatedLinks } from "../components/ContentBlocks.jsx";
import Container from "../components/ui/Container.jsx";
import { pageCopy } from "../data/siteContent.js";
import { useLanguage } from "../hooks/useLanguage.js";

export default function CaseStudiesPage() {
  const { language } = useLanguage();
  const page = pageCopy[language];
  const copy = page.cases;
  return (
    <>
      <section className="section case-studies-section">
        <Container className="case-study-list">
          {copy.items.map((item, index) => (
            <article className="case-study-card" key={item.type}>
              <header><span>{String(index + 1).padStart(2, "0")}</span><h2>{item.type}</h2></header>
              <dl>
                <div><dt>{copy.labels.background}</dt><dd>{item.background}</dd></div>
                <div><dt>{copy.labels.problem}</dt><dd>{item.problem}</dd></div>
                <div>
                  <dt>{copy.labels.solution}</dt>
                  <dd>{item.solution}</dd>
                  <div className="case-service-tags">
                    {item.services.map((service) => <span key={service}>{service}</span>)}
                  </div>
                </div>
                <div className="case-result"><dt>{copy.labels.result}</dt><dd>{item.result}</dd></div>
              </dl>
            </article>
          ))}
        </Container>
      </section>
      <RelatedLinks links={[
        { label: language === "ar" ? "استعرض الأعمال" : "View portfolio", to: "/portfolio" },
        { label: page.common.services, to: "/services" },
      ]} />
      <CTASection title={page.home.finalTitle} description={page.home.finalText} primaryLabel={page.common.consultation} />
    </>
  );
}
