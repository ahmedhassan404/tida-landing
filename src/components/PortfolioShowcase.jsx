import { AnimatePresence, motion } from "framer-motion";
import { Expand } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage.js";
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

function PortfolioCard({ category, project, projectCopy, reduceMotion }) {
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
          <img
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
            </div>
            <Expand size={18} />
          </div>
        </motion.button>
      </DialogTrigger>
      <DialogContent className="portfolio-dialog">
        <div className="portfolio-dialog-image">
          <img alt={projectCopy.alt} src={project.image} />
        </div>
        <div className="portfolio-dialog-copy">
          <span>{category}</span>
          <DialogTitle>{projectCopy.title}</DialogTitle>
          <DialogDescription>{projectCopy.alt}</DialogDescription>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function PortfolioShowcase() {
  const { copy } = useLanguage();
  const reduceMotion = usePrefersReducedMotion();
  const filterIds = copy.portfolio.filters.map((filter) => filter.id);
  const [activeFilter, setActiveFilter] = useQueryParamState("work", "all", filterIds);
  const visibleProjects = portfolioProjects.filter(
    (project) => activeFilter === "all" || project.category === activeFilter
  );

  const categoryLabel = (category) =>
    copy.portfolio.filters.find((filter) => filter.id === category)?.label;

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
              const projectCopy = copy.portfolio.projects[project.id];
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
                    category={categoryLabel(project.category)}
                    project={project}
                    projectCopy={projectCopy}
                    reduceMotion={reduceMotion}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </LayoutGrid>
      </Container>
    </section>
  );
}
