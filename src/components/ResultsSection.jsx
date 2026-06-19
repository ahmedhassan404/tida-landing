import { useRef } from "react";
import { useInView } from "framer-motion";
import { BarChart3 } from "lucide-react";
import { useCountUp } from "../hooks/useCountUp.js";
import { useLanguage } from "../hooks/useLanguage.js";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion.js";
import Reveal from "./Reveal.jsx";
import Container from "./ui/Container.jsx";
import GlassCard from "./ui/GlassCard.jsx";
import SectionHeader from "./ui/SectionHeader.jsx";

function ResultMetric({ metric, language }) {
  const metricRef = useRef(null);
  const reduceMotion = usePrefersReducedMotion();
  const inView = useInView(metricRef, { once: true, amount: 0.6 });
  const count = useCountUp(metric.target, inView, reduceMotion);
  const locale = language === "ar" ? "ar-EG" : "en-US";

  return (
    <GlassCard as="article" className="result-card" ref={metricRef}>
      <div className="result-card-head">
        <BarChart3 size={17} />
        <span className="status-dot" />
      </div>
      <strong>
        {new Intl.NumberFormat(locale).format(count)}
        {metric.suffix}
      </strong>
      <span>{metric.label}</span>
      <div className="result-bars" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
        <i />
        <i />
      </div>
    </GlassCard>
  );
}

export default function ResultsSection() {
  const { copy, language } = useLanguage();

  return (
    <section aria-labelledby="results-title" className="section results-section" id="results">
      <Container>
        <SectionHeader
          description={copy.results.description}
          eyebrow={copy.results.eyebrow}
          title={copy.results.title}
          titleId="results-title"
        />

        <div className="results-layout">
          <div className="results-grid">
            {copy.results.metrics.map((metric) => (
              <ResultMetric metric={metric} language={language} key={`${metric.target}-${metric.label}`} />
            ))}
          </div>
          <Reveal className="results-proof">
            <img
              alt={copy.results.imageAlt}
              decoding="async"
              height="560"
              loading="lazy"
              src="/assets/portfolio/campaign-results.webp"
              width="900"
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
