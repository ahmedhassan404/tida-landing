import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check, Play } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage.js";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion.js";
import { ButtonLink } from "./ui/Button.jsx";
import Badge from "./ui/Badge.jsx";
import GridPattern from "./magicui/GridPattern.jsx";
import Spotlight from "./aceternity/Spotlight.jsx";
import HeroHighlight from "./aceternity/HeroHighlight.jsx";
import HeroServicesText from "./HeroServicesText.jsx";

function HeroVisual({ copy }) {
  return (
    <div className="growth-map" aria-label={copy.hero.orbitLabel} role="img">
      <div className="growth-map-header">
        <span><i /> {copy.hero.signal}</span>
        <span>01—06</span>
      </div>
      <div className="growth-map-track" aria-hidden="true">
        <span />
        <ArrowRight size={17} />
        <span />
        <ArrowRight size={17} />
        <span />
      </div>
      <div className="growth-map-nodes">
        {copy.hero.serviceCards.map((service, index) => (
          <div className="growth-node" key={service}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{service}</strong>
            <Check size={14} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  const { copy } = useLanguage();
  const reduceMotion = usePrefersReducedMotion();
  const entrance = (delay) => ({
    initial: { opacity: 0, y: reduceMotion ? 0 : 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduceMotion ? 0.01 : 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  });

  return (
    <section className="hero" id="top">
      <GridPattern />
      <Spotlight />
      <div className="hero-inner">
        <div className="hero-copy">
          <motion.div {...entrance(0.04)}>
            <Badge>{copy.hero.eyebrow}</Badge>
          </motion.div>
          <motion.h1 {...entrance(0.1)}>
            {copy.hero.title}{" "}
            <HeroHighlight>{copy.hero.titleAccent}</HeroHighlight>
          </motion.h1>
          <motion.p className="hero-description" {...entrance(0.18)}>
            {copy.hero.description}
          </motion.p>
          <motion.div {...entrance(0.22)}>
            <HeroServicesText />
          </motion.div>
          <motion.div className="hero-actions" {...entrance(0.26)}>
            <ButtonLink href="#contact">
              {copy.hero.primaryCta}
              <ArrowUpRight size={17} />
            </ButtonLink>
            <ButtonLink href="#services" variant="secondary">
              <Play size={15} fill="currentColor" />
              {copy.hero.secondaryCta}
            </ButtonLink>
          </motion.div>
        </div>
        <motion.div
          className="growth-map-wrap"
          initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: reduceMotion ? 0.01 : 0.85, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
        >
          <HeroVisual copy={copy} />
        </motion.div>
      </div>
    </section>
  );
}
