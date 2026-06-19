import { useLanguage } from "../hooks/useLanguage.js";
import { teamPortraits } from "../data/tidaContent.js";
import Reveal from "./Reveal.jsx";
import Container from "./ui/Container.jsx";
import SectionHeader from "./ui/SectionHeader.jsx";

export default function TeamSection() {
  const { copy } = useLanguage();

  return (
    <section aria-labelledby="team-title" className="section team-section" id="team">
      <Container>
        <SectionHeader
          description={copy.team.description}
          eyebrow={copy.team.eyebrow}
          title={copy.team.title}
          titleId="team-title"
        />

        <div className="team-grid">
          {copy.team.members.map((member, index) => {
            const portrait = teamPortraits[member.id];
            return (
              <Reveal className="team-card glass-card" delay={index * 0.08} key={member.id}>
                <div className={`team-portrait team-portrait-${member.id}`}>
                  <img
                    alt={member.alt}
                    decoding="async"
                    height={portrait.height}
                    loading="lazy"
                    src={portrait.src}
                    width={portrait.width}
                  />
                  <span className="team-scan" aria-hidden="true" />
                </div>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
