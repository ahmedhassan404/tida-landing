import { Link } from "react-router-dom";
import Container from "../components/ui/Container.jsx";
import { Button } from "../components/ui/Button.jsx";
import { pageCopy } from "../data/siteContent.js";
import { useLanguage } from "../hooks/useLanguage.js";

export default function NotFoundPage() {
  const { language } = useLanguage();
  const page = pageCopy[language];

  return (
    <section className="section not-found-section">
      <Container>
        <div className="service-problem-card">
          <span className="eyebrow">{page.notFound.eyebrow}</span>
          <h1>{page.notFound.title}</h1>
          <p>{page.notFound.description}</p>
          <div className="section-action">
            <Button asChild>
              <Link to="/">{language === "ar" ? "العودة للرئيسية" : "Back home"}</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
