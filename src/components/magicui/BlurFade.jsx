import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";

export default function BlurFade({
  children,
  className = "",
  delay = 0,
  inView = true,
  yOffset = 18,
}) {
  const reduceMotion = usePrefersReducedMotion();
  const animation = { filter: "blur(0px)", opacity: 1, y: 0 };
  const initial = {
    filter: reduceMotion ? "blur(0px)" : "blur(8px)",
    opacity: 0,
    y: reduceMotion ? 0 : yOffset,
  };

  return (
    <motion.div
      animate={inView ? undefined : animation}
      className={className}
      initial={initial}
      transition={{
        delay: reduceMotion ? 0 : delay,
        duration: reduceMotion ? 0.01 : 0.65,
        ease: [0.16, 1, 0.3, 1],
      }}
      viewport={{ amount: 0.18, once: true }}
      whileInView={inView ? animation : undefined}
    >
      {children}
    </motion.div>
  );
}
