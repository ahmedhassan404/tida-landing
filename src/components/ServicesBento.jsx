import {
  BadgeDollarSign,
  BarChart3,
  Bot,
  Braces,
  Clapperboard,
  Database,
  Megaphone,
  Palette,
  Search,
} from "lucide-react";
import { useLanguage } from "../hooks/useLanguage.js";
import Reveal from "./Reveal.jsx";
import Container from "./ui/Container.jsx";
import SectionHeader from "./ui/SectionHeader.jsx";
import { BentoCard, BentoGrid } from "./magicui/BentoGrid.jsx";

const SERVICE_ICONS = {
  marketing: Megaphone,
  digital: Bot,
  search: Search,
  development: Braces,
  erp: Database,
  accounting: BadgeDollarSign,
  media: Clapperboard,
  branding: Palette,
  analytics: BarChart3,
};

export default function ServicesBento() {
  const { copy } = useLanguage();

  return (
    <section aria-labelledby="services-title" className="section services-section" id="services">
      <Container>
        <SectionHeader
          description={copy.services.description}
          eyebrow={copy.services.eyebrow}
          split
          title={copy.services.title}
          titleId="services-title"
        />

        <BentoGrid className="services-grid">
          {copy.services.items.map((service, index) => {
            const Icon = SERVICE_ICONS[service.id];
            return (
              <Reveal
                className={`service-card-wrap service-card-${index + 1}`}
                delay={(index % 3) * 0.06}
                key={service.id}
              >
                <BentoCard className="service-card">
                  <div className="service-icon">
                    <Icon size={21} />
                  </div>
                  <span className="service-index">{String(index + 1).padStart(2, "0")}</span>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </BentoCard>
              </Reveal>
            );
          })}
        </BentoGrid>
        <Reveal className="services-more">
          <span />
          <p>{copy.services.more}</p>
        </Reveal>
      </Container>
    </section>
  );
}
