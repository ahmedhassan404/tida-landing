import { BarChartBig, Globe2, Layers3, Network, Workflow } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage.js";
import Reveal from "./Reveal.jsx";
import Container from "./ui/Container.jsx";
import SectionHeader from "./ui/SectionHeader.jsx";

const BENEFIT_ICONS = [Workflow, Globe2, Layers3, Network, BarChartBig];

export default function WhyChooseUs() {
  const { copy } = useLanguage();

  return (
    <section aria-labelledby="why-title" className="section why-section">
      <Container className="why-layout">
        <SectionHeader
          className="why-heading"
          eyebrow={copy.why.eyebrow}
          title={copy.why.title}
          titleId="why-title"
        />
        <div className="why-list">
          {copy.why.items.map((benefit, index) => {
            const Icon = BENEFIT_ICONS[index];
            return (
              <Reveal className="why-item" delay={index * 0.05} key={benefit.title}>
                <span className="why-number">{String(index + 1).padStart(2, "0")}</span>
                <div className="card-icon">
                  <Icon size={20} />
                </div>
                <div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
