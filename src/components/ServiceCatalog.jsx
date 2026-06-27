import {
  Bot, Building2, ChartNoAxesCombined, CircleCheckBig,
  Database, Globe2, Megaphone, Plane,
} from "lucide-react";
import { Link } from "react-router-dom";
import { serviceCatalog } from "../data/siteContent.js";
import { useLanguage } from "../hooks/useLanguage.js";
import Reveal from "./Reveal.jsx";

const icons = {
  finance: ChartNoAxesCombined,
  erp: Database,
  saudi: Building2,
  tourism: Plane,
  ai: Bot,
  marketing: Megaphone,
  web: Globe2,
};

export default function ServiceCatalog({ limit }) {
  const { language } = useLanguage();
  const services = limit ? serviceCatalog[language].slice(0, limit) : serviceCatalog[language];

  return (
    <div className="route-service-grid">
      {services.map((service, index) => {
        const Icon = icons[service.icon] || CircleCheckBig;
        return (
          <Reveal className="route-service-card" delay={(index % 3) * 0.05} key={service.id}>
            <div className="card-icon"><Icon size={21} /></div>
            <span className="service-index">{String(index + 1).padStart(2, "0")}</span>
            <h3>{service.title}</h3>
            <p className="service-problem">{service.problem}</p>
            <p>{service.description}</p>
            <span className="service-best-for">
              {language === "ar" ? "الأنسب: " : "Best for: "}
              {service.bestFor}
            </span>
            <Link to={service.to}>
              <span>{language === "ar" ? "تفاصيل الخدمة" : "Learn more"}</span>
              <CircleCheckBig size={16} />
            </Link>
          </Reveal>
        );
      })}
    </div>
  );
}
