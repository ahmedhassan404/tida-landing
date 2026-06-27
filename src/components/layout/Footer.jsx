import { Link } from "react-router-dom";
import { workingHours } from "../../data/siteAssets.js";
import { navigation, serviceCatalog } from "../../data/siteContent.js";
import { useLanguage } from "../../hooks/useLanguage.js";
import Container from "../ui/Container.jsx";
import { Button } from "../ui/Button.jsx";
import Logo from "./Logo.jsx";

export default function Footer() {
  const { copy, language } = useLanguage();
  const locale = language === "ar" ? "ar-EG" : "en-US";
  const year = new Intl.NumberFormat(locale, { useGrouping: false }).format(
    new Date().getFullYear()
  );
  const copyright = copy.footer.copyright.replace("{year}", year);
  const links = navigation[language];
  const services = serviceCatalog[language].filter((service) =>
    ["financial", "saudi", "tourism", "ai", "web"].includes(service.id)
  );

  return (
    <footer className="footer">
      <Container>
        <div className="footer-grid">
          <div className="footer-brand">
            <Logo className="footer-logo" label={copy.a11y.home} variant="white" />
            <p>{copy.footer.description}</p>
            <Button asChild size="sm">
              <Link to="/contact">{language === "ar" ? "احجز استشارة" : "Book Consultation"}</Link>
            </Button>
          </div>
          <div className="footer-column">
            <h3>{copy.footer.navigationTitle}</h3>
            {links.map((link) => (
              <Link to={link.to} key={link.to}>{link.label}</Link>
            ))}
          </div>
          <div className="footer-column">
            <h3>{copy.footer.servicesTitle}</h3>
            {services.map((service) => (
              <Link to={service.to} key={service.id}>{service.title}</Link>
            ))}
          </div>
          <div className="footer-column">
            <h3>{language === "ar" ? "تواصل" : "Contact"}</h3>
            <Link to="/contact">{language === "ar" ? "تواصل معنا" : "Contact Us"}</Link>
            <Link to="/contact">{language === "ar" ? "احجز استشارة" : "Book Consultation"}</Link>
            <span>{workingHours[language]}</span>
          </div>
        </div>
        <div className="footer-bottom">
          <p>{copyright}</p>
          <span>{copy.footer.signature}</span>
        </div>
      </Container>
      <div className="footer-wordmark" aria-hidden="true">Masar Global</div>
    </footer>
  );
}
