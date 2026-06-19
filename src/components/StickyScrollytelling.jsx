import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Container from "./ui/Container.jsx";

const steps = [
  { num: "01", title: "Discover the opportunity" },
  { num: "02", title: "Build the strategy" },
  { num: "03", title: "Design the digital presence" },
  { num: "04", title: "Launch growth campaigns" },
  { num: "05", title: "Manage business operations" },
  { 
    num: "06", 
    title: "Measure and scale", 
    desc: "Track KPIs campaign results reporting and ongoing optimization so the next decision is grounded in evidence", 
    related: "Related services" 
  },
];

export default function StickyScrollytelling() {
  return (
    <section className="section sticky-scrolly-section" aria-labelledby="scrolly-title">
      <Container>
        <div className="sticky-scrolly-grid">
          <div className="sticky-scrolly-left">
            <div className="sticky-scrolly-content">
              <span className="eyebrow">The TIDA growth system</span>
              <h2 id="scrolly-title">Six moves from opportunity to scale</h2>
              <p>See how strategy digital delivery campaigns operations and measurement work together</p>
            </div>
          </div>
          <div className="sticky-scrolly-right">
            {steps.map((step, index) => (
              <StepItem key={index} step={step} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function StepItem({ step }) {
  const ref = useRef(null);
  
  // Use a huge top margin so it doesn't hide when scrolling past it upwards
  const isRevealed = useInView(ref, { margin: "1000px 0px -25% 0px", once: false });
  // Active when near the center of the viewport
  const isActive = useInView(ref, { margin: "-35% 0px -35% 0px" });

  return (
    <motion.div
      ref={ref}
      className={`sticky-step ${isActive ? "is-active" : ""}`}
      initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
      animate={{
        opacity: isRevealed ? (isActive ? 1 : 0.4) : 0,
        y: isRevealed ? 0 : 24,
        filter: isRevealed ? "blur(0px)" : "blur(4px)"
      }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="step-num">{step.num}</div>
      <div className="step-content">
        <h3>{step.title}</h3>
        {step.desc && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: isActive ? "auto" : 0, 
              opacity: isActive ? 1 : 0 
            }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div className="step-desc-wrapper">
              <p>{step.desc}</p>
              {step.related && (
                <a href="#services" className="step-related">{step.related}</a>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
