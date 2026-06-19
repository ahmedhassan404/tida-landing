import { AnimatePresence, motion } from "framer-motion";
import { Check, CircleDollarSign, Code2, Database } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage.js";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion.js";
import { useQueryParamState } from "../hooks/useQueryParamState.js";
import Container from "./ui/Container.jsx";
import Image from "./ui/Image.jsx";
import SectionHeader from "./ui/SectionHeader.jsx";
import TabList from "./ui/TabList.jsx";
import BorderBeam from "./magicui/BorderBeam.jsx";

const SOLUTION_ICONS = {
  accounting: CircleDollarSign,
  web: Code2,
  erp: Database,
};

function SolutionPanel({ solution, reduceMotion }) {
  const Icon = SOLUTION_ICONS[solution.id];

  return (
    <motion.div
      className="solution-panel"
      key={solution.id}
      initial={{ opacity: 0, x: reduceMotion ? 0 : 18 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: reduceMotion ? 0 : -18 }}
      transition={{ duration: reduceMotion ? 0.01 : 0.38, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="solution-copy">
        <div className="card-icon">
          <Icon size={22} />
        </div>
        <h3>{solution.title}</h3>
        <p>{solution.description}</p>
        <ul>
          {solution.points.map((point) => (
            <li key={point}>
              <Check size={16} />
              {point}
            </li>
          ))}
        </ul>
      </div>
      <div className={`solution-visual solution-visual-${solution.id}`}>
        {solution.id === "erp" && (
          <Image
            alt=""
            decoding="async"
            height="560"
            loading="lazy"
            src="/assets/portfolio/erp.webp"
            width="900"
          />
        )}
        <div className="solution-stat">
          <strong>{solution.stat}</strong>
          <span>{solution.statLabel}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function SolutionsShowcase() {
  const { copy } = useLanguage();
  const reduceMotion = usePrefersReducedMotion();
  const solutionIds = copy.solutions.tabs.map((tab) => tab.id);
  const [activeId, setActiveId] = useQueryParamState("solution", "accounting", solutionIds);
  const activeSolution = copy.solutions.tabs.find((tab) => tab.id === activeId);

  return (
    <section aria-labelledby="solutions-title" className="section solutions-section">
      <Container>
        <SectionHeader
          description={copy.solutions.description}
          eyebrow={copy.solutions.eyebrow}
          title={copy.solutions.title}
          titleId="solutions-title"
        />

        <div className="solution-shell glass-card">
          <BorderBeam />
          <TabList
            activeId={activeId}
            className="solution-tabs"
            id="solutions"
            onChange={setActiveId}
            tabs={copy.solutions.tabs}
          />
          <div
            aria-labelledby={`solutions-tab-${activeId}`}
            id="solutions-panel"
            role="tabpanel"
          >
            <AnimatePresence mode="wait">
              <SolutionPanel solution={activeSolution} reduceMotion={reduceMotion} />
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}
