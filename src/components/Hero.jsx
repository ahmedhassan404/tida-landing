import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Play,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage.js";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion.js";
import HeroHighlight from "./aceternity/HeroHighlight.jsx";
import GridPattern from "./magicui/GridPattern.jsx";
import Spotlight from "./aceternity/Spotlight.jsx";
import Badge from "./ui/Badge.jsx";
import { Button } from "./ui/Button.jsx";

function HeroAssurance({ copy, reduceMotion }) {
  return (
    <motion.div className="hero-assurance" {...heroEntrance(0.3, reduceMotion)}>
      <span>{copy.hero.eyebrow}</span>
      <span>{copy.financial?.delivery?.[0]}</span>
    </motion.div>
  );
}

function HeroVisual({ copy }) {
  const reduceMotion = usePrefersReducedMotion();
  const stageVariants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 18, scale: reduceMotion ? 1 : 0.98 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: reduceMotion ? 0 : 0.18 + index * 0.12,
        duration: reduceMotion ? 0.01 : 0.55,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };
  const stages = copy.hero.signal.split(/\s*[→←]\s*/);

  return (
    <motion.div
      className="growth-map-wrap"
      initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 30 }}
      transition={{ duration: reduceMotion ? 0.01 : 0.8, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ amount: 0.2, once: true }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
    >
      <div className="hero-experience">
        <div className="growth-map" aria-label={copy.hero.orbitLabel} role="region">
          <div className="growth-map-header">
            <span>
              <i /> {copy.hero.orbitLabel}
            </span>
            <span>01—{String(stages.length).padStart(2, "0")}</span>
          </div>
          <motion.div
            aria-hidden="true"
            className="growth-map-flow"
            initial={reduceMotion ? false : { scaleX: 0, opacity: 0 }}
            transition={{ delay: 0.18, duration: reduceMotion ? 0.01 : 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ amount: 0.4, once: true }}
            whileInView={{ scaleX: 1, opacity: 1 }}
          >
            {stages.map((stage, index) => (
              <motion.span
                key={`${stage}-node`}
                initial={reduceMotion ? false : { scale: 0.7, opacity: 0 }}
                transition={{ delay: reduceMotion ? 0 : 0.34 + index * 0.12, duration: reduceMotion ? 0.01 : 0.45 }}
                whileInView={{ scale: 1, opacity: 1 }}
              />
            ))}
          </motion.div>
          <motion.ol
            className="growth-stages"
            initial="hidden"
            viewport={{ amount: 0.35, once: true }}
            whileInView="visible"
          >
            {stages.map((stage, index) => (
              <motion.li custom={index} key={stage} variants={stageVariants}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{stage}</strong>
                {index < stages.length - 1 && <ArrowRight aria-hidden="true" size={18} />}
              </motion.li>
            ))}
          </motion.ol>
          <motion.div
            className="growth-map-summary"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            transition={{ delay: reduceMotion ? 0 : 0.58, duration: reduceMotion ? 0.01 : 0.55, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ amount: 0.5, once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <Check aria-hidden="true" size={17} />
            <p>{copy.hero.description}</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function heroEntrance(delay, reduceMotion) {
  return {
    animate: { opacity: 1, y: 0 },
    initial: { opacity: 0, y: reduceMotion ? 0 : 24 },
    transition: {
      delay,
      duration: reduceMotion ? 0.01 : 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  };
}

export default function Hero() {
  const { copy } = useLanguage();
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section className="hero" id="top">
      <GridPattern />
      <Spotlight />
      <div className="hero-inner">
        <div className="hero-copy">
          <motion.div {...heroEntrance(0.04, reduceMotion)}>
            <Badge>{copy.hero.eyebrow}</Badge>
          </motion.div>
          <motion.h1 {...heroEntrance(0.1, reduceMotion)}>
            {copy.hero.title}{" "}
            <HeroHighlight>{copy.hero.titleAccent}</HeroHighlight>
          </motion.h1>
          <motion.p className="hero-description" {...heroEntrance(0.18, reduceMotion)}>
            {copy.hero.description}
          </motion.p>
          <motion.div className="hero-actions" {...heroEntrance(0.22, reduceMotion)}>
            <Button asChild>
              <Link to="/contact">
                {copy.hero.primaryCta}
                <ArrowUpRight size={17} />
              </Link>
            </Button>
            <Button asChild variant="secondary">
              <Link to="/services">
                <Play fill="currentColor" size={15} />
                {copy.hero.secondaryCta}
              </Link>
            </Button>
          </motion.div>
          <HeroAssurance copy={copy} reduceMotion={reduceMotion} />
        </div>
        <HeroVisual copy={copy} />
      </div>
    </section>
  );
}
