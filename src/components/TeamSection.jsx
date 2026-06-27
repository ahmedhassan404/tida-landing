import { useLanguage } from "../hooks/useLanguage.js";
import { teamPortraits } from "../data/tidaContent.js";
import Reveal from "./Reveal.jsx";
import Container from "./ui/Container.jsx";
import SectionHeader from "./ui/SectionHeader.jsx";
import Image from "./ui/Image.jsx";

function TeamCards({ members }) {
  return (
    <div className="team-grid">
      {members.map((member, index) => {
        const portrait = teamPortraits[member.id];
        return (
          <Reveal className="team-card glass-card" delay={index * 0.08} key={member.id}>
            <div className={`team-portrait team-portrait-${member.id}`}>
              <Image
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
            <span className="team-bio">{member.bio}</span>
          </Reveal>
        );
      })}
    </div>
  );
}

export function TeamRoster() {
  const { copy } = useLanguage();

  return (
    <section aria-label={copy.team.title} className="section team-section" id="team">
      <Container>
        <TeamCards members={copy.team.members} />
      </Container>
    </section>
  );
}

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
        <TeamCards members={copy.team.members} />
      </Container>
    </section>
  );
}
