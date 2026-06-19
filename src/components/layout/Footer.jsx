import { contactEmail } from "../../data/tidaContent.js";
import { useLanguage } from "../../hooks/useLanguage.js";
import Container from "../ui/Container.jsx";
import Logo from "./Logo.jsx";

export default function Footer() {
  const { copy, language } = useLanguage();
  const locale = language === "ar" ? "ar-EG" : "en-US";
  const year = new Intl.NumberFormat(locale, { useGrouping: false }).format(
    new Date().getFullYear()
  );
  const copyright = copy.footer.copyright.replace("{year}", year);

  return (
    <footer className="footer">
      <Container>
        <div className="footer-grid">
          <div className="footer-brand">
            <Logo className="footer-logo" label={copy.a11y.home} />
            <p>{copy.footer.description}</p>
          </div>
          <div className="footer-column">
            <h3>{copy.footer.navigationTitle}</h3>
            {copy.nav.links.map((link) => (
              <a href={link.href} key={link.href}>{link.label}</a>
            ))}
          </div>
          <div className="footer-column">
            <h3>{copy.footer.servicesTitle}</h3>
            {copy.footer.serviceLinks.map((service) => (
              <a href="#services" key={service}>{service}</a>
            ))}
          </div>
          <div className="footer-column">
            <h3>{copy.footer.countriesTitle}</h3>
            {copy.footer.countries.map((country) => (
              <a href="#contact" key={country}>{country}</a>
            ))}
            <a href={`mailto:${contactEmail}`}>{copy.footer.emailLabel}</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>{copyright}</p>
          <span>{copy.footer.signature}</span>
        </div>
      </Container>
      <div className="footer-wordmark" aria-hidden="true">TIDA</div>
    </footer>
  );
}
