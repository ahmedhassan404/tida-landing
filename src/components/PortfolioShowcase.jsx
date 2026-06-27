import { AnimatePresence, motion } from "framer-motion";
import { Expand } from "lucide-react";
import Image from "./ui/Image.jsx";
import { useLanguage } from "../hooks/useLanguage.js";
import { portfolioDetails } from "../data/siteContent.js";
import { portfolioProjects } from "../data/tidaContent.js";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion.js";
import { useQueryParamState } from "../hooks/useQueryParamState.js";
import Container from "./ui/Container.jsx";
import SectionHeader from "./ui/SectionHeader.jsx";
import TabList from "./ui/TabList.jsx";
import LayoutGrid from "./aceternity/LayoutGrid.jsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./ui/Dialog.jsx";

function PortfolioCard({ project, reduceMotion }) {
  const { copy, language } = useLanguage();
  const category = copy.portfolio.filters.find((filter) => filter.id === project.category)?.label;
  const details = portfolioDetails[language][project.id];
  const projectCopy = copy.portfolio.projects[project.id];
  const labels = language === "ar"
    ? { goal: "المشكلة التي يعالجها العمل", delivered: "ما تم تنفيذه", evidence: "المخرج المتاح" }
    : { goal: "Problem this work addresses", delivered: "What TIDA delivered", evidence: "Available outcome" };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.button
          className="portfolio-card"
          layout
          initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.97 }}
          transition={{ duration: reduceMotion ? 0.01 : 0.3 }}
          type="button"
        >
          <Image
            alt={projectCopy.alt}
            decoding="async"
            height={project.height}
            loading="lazy"
            src={project.image}
            width={project.width}
          />
          <div className="portfolio-overlay">
            <div>
              <span>{category}</span>
              <h3>{projectCopy.title}</h3>
              <p>{details.description}</p>
            </div>
            <Expand aria-hidden="true" size={18} />
          </div>
        </motion.button>
      </DialogTrigger>
      <DialogContent className="portfolio-dialog">
        <div className="portfolio-dialog-image">
          <Image alt={projectCopy.alt} src={project.image} />
        </div>
        <div className="portfolio-dialog-copy">
          <span>{category}</span>
          <DialogTitle>{projectCopy.title}</DialogTitle>
          <DialogDescription>{details.description}</DialogDescription>
          <div className="portfolio-detail-block">
            <span>{labels.goal}</span>
            <strong>{details.goal}</strong>
          </div>
          <div className="portfolio-detail-block">
            <span>{labels.delivered}</span>
            <ul>{details.services.map((service) => <li key={service}>{service}</li>)}</ul>
          </div>
          <div className="portfolio-detail-block">
            <span>{labels.evidence}</span>
            <p>{details.description}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function PortfolioContent() {
  const { copy } = useLanguage();
  const reduceMotion = usePrefersReducedMotion();
  const filterIds = copy.portfolio.filters.map((filter) => filter.id);
  const [activeFilter, setActiveFilter] = useQueryParamState("work", "all", filterIds);
  const visibleProjects = portfolioProjects.filter(
    (project) => activeFilter === "all" || project.category === activeFilter
  );

  return (
    <>
      <TabList
        activeId={activeFilter}
        className="portfolio-filters"
        id="portfolio"
        onChange={setActiveFilter}
        tabs={copy.portfolio.filters}
      />
      <LayoutGrid
        aria-labelledby={`portfolio-tab-${activeFilter}`}
        className="portfolio-grid"
        id="portfolio-panel"
        role="tabpanel"
      >
        <AnimatePresence mode="popLayout">
          {visibleProjects.map((project) => {
            return (
              <motion.div
                className="portfolio-card-slot"
                key={project.id}
                initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.97 }}
                layout
                transition={{ duration: reduceMotion ? 0.01 : 0.3 }}
              >
                <PortfolioCard
                  project={project}
                  reduceMotion={reduceMotion}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </LayoutGrid>
    </>
  );
}

export function PortfolioGallery() {
  const { copy } = useLanguage();

  return (
    <section aria-label={copy.portfolio.title} className="section portfolio-section" id="portfolio">
      <Container>
        <PortfolioContent />
      </Container>
    </section>
  );
}

export default function PortfolioShowcase() {
  const { copy } = useLanguage();

  return (
    <section aria-labelledby="portfolio-title" className="section portfolio-section" id="portfolio">
      <Container>
        <SectionHeader
          description={copy.portfolio.description}
          eyebrow={copy.portfolio.eyebrow}
          split
          title={copy.portfolio.title}
          titleId="portfolio-title"
        />
        <PortfolioContent />
      </Container>
    </section>
  );
}
