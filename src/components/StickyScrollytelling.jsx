import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "../hooks/useLanguage.js";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion.js";
import Container from "./ui/Container.jsx";

const REVEAL_MARGIN = "1000px 0px -25% 0px";
const ACTIVE_MARGIN = "-35% 0px -35% 0px";

function StepDescription({ active, linkLabel, reduceMotion, step }) {
  return (
    <motion.div
      animate={{ height: active ? "auto" : 0, opacity: active ? 1 : 0 }}
      initial={false}
      transition={{ duration: reduceMotion ? 0.01 : 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{ overflow: "hidden" }}
    >
      <div className="step-desc-wrapper">
        <p>{step.description}</p>
        <a className="step-related" href="#services">
          {linkLabel}
        </a>
      </div>
    </motion.div>
  );
}

function StepItem({ index, linkLabel, reduceMotion, step }) {
  const stepRef = useRef(null);
  const isRevealed = useInView(stepRef, { margin: REVEAL_MARGIN });
  const isActive = useInView(stepRef, { margin: ACTIVE_MARGIN });

  return (
    <motion.article
      animate={{
        filter: isRevealed ? "blur(0px)" : "blur(4px)",
        opacity: isRevealed ? (isActive ? 1 : 0.4) : 0,
        y: isRevealed ? 0 : 24,
      }}
      className={`sticky-step ${isActive ? "is-active" : ""}`}
      initial={reduceMotion ? false : { filter: "blur(4px)", opacity: 0, y: 24 }}
      ref={stepRef}
      transition={{ duration: reduceMotion ? 0.01 : 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="step-num">{String(index + 1).padStart(2, "0")}</div>
      <div className="step-content">
        <h3>{step.title}</h3>
        <StepDescription
          active={isActive}
          linkLabel={linkLabel}
          reduceMotion={reduceMotion}
          step={step}
        />
      </div>
    </motion.article>
  );
}

export default function StickyScrollytelling() {
  const { copy } = useLanguage();
  const reduceMotion = usePrefersReducedMotion();
  const walkthrough = copy.walkthrough;

  return (
    <section
      aria-labelledby="process-title"
      className="section sticky-scrolly-section"
      id="process"
    >
      <Container>
        <div className="sticky-scrolly-grid">
          <div className="sticky-scrolly-left">
            <div className="sticky-scrolly-content">
              <span className="eyebrow">{walkthrough.eyebrow}</span>
              <h2 id="process-title">{walkthrough.title}</h2>
              <p>{walkthrough.description}</p>
            </div>
          </div>
          <div className="sticky-scrolly-right">
            {walkthrough.steps.map((step, index) => (
              <StepItem
                index={index}
                key={step.id}
                linkLabel={walkthrough.stepLink}
                reduceMotion={reduceMotion}
                step={step}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
