import { Fragment, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check, Play } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage.js";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion.js";
import HeroHighlight from "./aceternity/HeroHighlight.jsx";
import HeroServicesText from "./HeroServicesText.jsx";
import GridPattern from "./magicui/GridPattern.jsx";
import Spotlight from "./aceternity/Spotlight.jsx";
import Badge from "./ui/Badge.jsx";
import { ButtonLink } from "./ui/Button.jsx";

const SERVICE_CYCLE_INTERVAL_MS = 2500;

function useCyclingService(serviceCount, paused) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (paused || serviceCount < 2) return undefined;

    const cycleId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % serviceCount);
    }, SERVICE_CYCLE_INTERVAL_MS);

    return () => window.clearInterval(cycleId);
  }, [paused, serviceCount]);

  return [activeIndex, setActiveIndex];
}

function GrowthTrack({ activeIndex, serviceCount }) {
  const trackCount = Math.ceil(serviceCount / 2);
  const activeTrackIndex = Math.floor(activeIndex / 2);

  return (
    <div className="growth-map-track" aria-hidden="true">
      {Array.from({ length: trackCount }, (_, index) => (
        <Fragment key={index}>
          {index > 0 && <ArrowRight size={17} />}
          <span className={activeTrackIndex === index ? "is-active" : ""} />
        </Fragment>
      ))}
    </div>
  );
}

function GrowthNodes({ activeIndex, onActivate, reduceMotion, services }) {
  return (
    <div className="growth-map-nodes">
      {services.map((service, index) => (
        <motion.div
          animate={{
            opacity: activeIndex === index ? 1 : 0.58,
            scale: activeIndex === index ? 1.025 : 0.985,
          }}
          className={`growth-node ${activeIndex === index ? "is-active" : ""}`}
          key={service}
          onMouseEnter={() => onActivate(index)}
          transition={{ duration: reduceMotion ? 0.01 : 0.34, ease: [0.16, 1, 0.3, 1] }}
          whileHover={reduceMotion ? undefined : { opacity: 1, scale: 1.03, y: -8 }}
        >
          <span>{String(index + 1).padStart(2, "0")}</span>
          <strong>{service}</strong>
          <Check size={14} />
        </motion.div>
      ))}
    </div>
  );
}

function HeroVisual({ copy }) {
  const reduceMotion = usePrefersReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const services = copy.hero.serviceCards;
  const [activeIndex, setActiveIndex] = useCyclingService(
    services.length,
    isHovered || reduceMotion
  );

  return (
    <motion.div
      className="growth-map-wrap"
      initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 30 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      transition={{ duration: reduceMotion ? 0.01 : 0.8, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ amount: 0.2, once: true }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
    >
      <div className="growth-map" aria-label={copy.hero.orbitLabel} role="img">
        <div className="growth-map-header">
          <span>
            <i /> {copy.hero.signal}
          </span>
          <span>
            01—{String(services.length).padStart(2, "0")}
          </span>
        </div>
        <GrowthTrack activeIndex={activeIndex} serviceCount={services.length} />
        <GrowthNodes
          activeIndex={activeIndex}
          onActivate={setActiveIndex}
          reduceMotion={reduceMotion}
          services={services}
        />
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
          <motion.div {...heroEntrance(0.22, reduceMotion)}>
            <HeroServicesText />
          </motion.div>
          <motion.div className="hero-actions" {...heroEntrance(0.26, reduceMotion)}>
            <ButtonLink href="#contact">
              {copy.hero.primaryCta}
              <ArrowUpRight size={17} />
            </ButtonLink>
            <ButtonLink href="#services" variant="secondary">
              <Play fill="currentColor" size={15} />
              {copy.hero.secondaryCta}
            </ButtonLink>
          </motion.div>
        </div>
        <HeroVisual copy={copy} />
      </div>
    </section>
  );
}
