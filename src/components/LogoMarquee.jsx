import { partnerLogos } from "../data/tidaContent.js";
import { useLanguage } from "../hooks/useLanguage.js";
import Container from "./ui/Container.jsx";
import Marquee from "./magicui/Marquee.jsx";

export default function LogoMarquee() {
  const { copy } = useLanguage();
  const repeatedLogos = [...partnerLogos, ...partnerLogos];

  return (
    <section className="partners" aria-labelledby="partners-title">
      <Container className="partners-heading">
        <span className="eyebrow">{copy.partners.eyebrow}</span>
        <div>
          <h2 id="partners-title">{copy.partners.title}</h2>
          <p>{copy.partners.subtitle}</p>
        </div>
      </Container>
      <div className="marquee-mask">
        <Marquee>
          <div className="marquee-items" role="list">
          {repeatedLogos.map((logo, index) => (
            <div
              className="partner-logo"
              key={`${logo.src}-${index}`}
              role="listitem"
              aria-hidden={index >= partnerLogos.length}
            >
              <img
                alt={`${copy.partners.logoAlt} ${index + 1}`}
                decoding="async"
                height={logo.height}
                loading="lazy"
                src={logo.src}
                width={logo.width}
              />
            </div>
          ))}
          </div>
        </Marquee>
      </div>
    </section>
  );
}
