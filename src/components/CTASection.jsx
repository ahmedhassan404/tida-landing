import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage.js";
import { Button } from "./ui/Button.jsx";
import Container from "./ui/Container.jsx";

export default function CTASection({ description, primaryLabel, title }) {
  const { language } = useLanguage();

  return (
    <section className="section route-cta">
      <Container>
        <div className="route-cta-card">
          <div>
            <span className="eyebrow">{language === "ar" ? "مسار جلوبال / الخطوة التالية" : "Masar Global / NEXT STEP"}</span>
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
          <Button asChild>
            <Link to="/contact">
              {primaryLabel}
              <ArrowUpRight size={17} />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
