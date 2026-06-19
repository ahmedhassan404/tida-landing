import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";

export default function HeroHighlight({ children }) {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <span className="hero-highlight">
      <motion.span
        aria-hidden="true"
        className="hero-highlight-stroke"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: reduceMotion ? 0 : 0.75, duration: reduceMotion ? 0.01 : 0.7 }}
      />
      <span>{children}</span>
    </span>
  );
}
