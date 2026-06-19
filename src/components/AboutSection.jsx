import { Compass, RefreshCw, Sparkles } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage.js";
import Reveal from "./Reveal.jsx";
import Container from "./ui/Container.jsx";
import GlassCard from "./ui/GlassCard.jsx";
import SectionHeader from "./ui/SectionHeader.jsx";

const CARD_ICONS = [RefreshCw, Compass, Sparkles];

export default function AboutSection() {
  const { copy } = useLanguage();

  return (
    <section aria-labelledby="about-title" className="section about-section" id="about">
      <Container>
        <SectionHeader
          description={copy.about.intro}
          eyebrow={copy.about.eyebrow}
          split
          title={copy.about.title}
          titleId="about-title"
        />

        <div className="about-grid">
          {copy.about.cards.map((card, index) => {
            const Icon = CARD_ICONS[index];
            return (
              <GlassCard
                as={Reveal}
                className="about-card"
                delay={index * 0.08}
                key={card.label}
              >
                <div className="card-icon">
                  <Icon size={21} />
                </div>
                <span className="card-kicker">{card.label}</span>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </GlassCard>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
