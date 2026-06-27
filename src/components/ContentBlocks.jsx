import { ArrowUpRight, Check, CircleDot, MapPin, Workflow } from "lucide-react";
import { Link } from "react-router-dom";
import { serviceGroups } from "../data/siteContent.js";
import { useLanguage } from "../hooks/useLanguage.js";
import Container from "./ui/Container.jsx";
import SectionHeader from "./ui/SectionHeader.jsx";

export function SummaryCards({ description, eyebrow, items, title }) {
  return (
    <section className="section">
      <Container>
        <SectionHeader description={description} eyebrow={eyebrow} split title={title} />
        <div className="summary-card-grid">
          {items.map((cardContent, index) => {
            const [itemTitle, itemDescription] = Array.isArray(cardContent) ? cardContent : [cardContent, null];
            return (
            <article className="summary-card" key={itemTitle}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{itemTitle}</h3>
              {itemDescription && <p>{itemDescription}</p>}
            </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export function ProcessSection({ items, title }) {
  const { language } = useLanguage();
  return (
    <section className="section process-section">
      <Container>
        <SectionHeader
          eyebrow={language === "ar" ? "طريقة العمل" : "How we work"}
          title={title}
        />
        <ol className="process-grid">
          {items.map((processContent, index) => {
            const [itemTitle, itemDescription] = Array.isArray(processContent) ? processContent : [processContent, null];
            return (
            <li key={itemTitle}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <Workflow size={22} />
              <h3>{itemTitle}</h3>
              {itemDescription && <p>{itemDescription}</p>}
            </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}

export function ServiceGroups() {
  const { language } = useLanguage();
  const groups = serviceGroups[language];
  return (
    <div className="service-group-grid">
      {groups.map((group) => (
        <article className="service-group-card" key={group.id}>
          <CircleDot size={20} />
          <h3>{group.title}</h3>
          <p>{group.summary}</p>
          <ul>
            {group.items.map((serviceName) => (
              <li key={serviceName}><Check size={15} />{serviceName}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}

export function MarketCards({ items, title, description }) {
  const { language } = useLanguage();
  return (
    <section className="section market-section">
      <Container>
        <SectionHeader
          description={description}
          eyebrow={language === "ar" ? "الأسواق" : "Markets served"}
          split
          title={title}
        />
        <div className="market-grid">
          {items.map(([country, text]) => (
            <article key={country}>
              <MapPin size={22} />
              <h3>{country}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function RelatedLinks({ links }) {
  const { language } = useLanguage();
  return (
    <section className="section related-section">
      <Container>
        <span className="eyebrow">{language === "ar" ? "تابع رحلتك" : "Continue your journey"}</span>
        <div className="related-links">
          {links.map((link) => (
            <Link to={link.to} key={link.to}>
              <span>{link.label}</span>
              <ArrowUpRight size={18} />
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function FAQSection({ items, title }) {
  const { language } = useLanguage();
  return (
    <section className="section faq-section">
      <Container>
        <SectionHeader eyebrow={language === "ar" ? "أسئلة شائعة" : "FAQ"} title={title} />
        <div className="faq-list">
          {items.map(([question, answer]) => (
            <details key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
