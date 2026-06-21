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
import Image from "./ui/Image.jsx";

function metricValue(metric) {
  return `${metric.target}${metric.suffix}`;
}

function HeroProofBoard({ copy }) {
  const metrics = copy.results?.metrics?.slice(0, 2) || [];
  const projects = copy.portfolio?.projects || {};
  const proofTiles = [
    {
      alt: projects.campaignDashboard?.alt || "",
      label: projects.campaignDashboard?.title || "Campaign dashboards",
      src: "/assets/portfolio/campaign-dashboard.webp",
    },
    {
      alt: projects.erp?.alt || "",
      label: projects.erp?.title || "ERP systems",
      src: "/assets/portfolio/erp.webp",
    },
    {
      alt: projects.websites?.alt || "",
      label: projects.websites?.title || "Website experiences",
      src: "/assets/portfolio/websites.webp",
    },
  ];

  return (
    <aside className="hero-proof-board" aria-labelledby="hero-proof-title">
      <div className="hero-proof-head">
        <span>{copy.results?.eyebrow || copy.portfolio?.eyebrow}</span>
        <strong id="hero-proof-title">{copy.results?.title || copy.portfolio?.title}</strong>
      </div>
      <div className="hero-proof-metrics">
        {metrics.map((metric) => (
          <div className="hero-proof-metric" key={metric.label}>
            <strong>{metricValue(metric)}</strong>
            <span>{metric.label}</span>
          </div>
        ))}
      </div>
      <div className="hero-proof-gallery">
        {proofTiles.map((tile) => (
          <figure className="hero-proof-tile" key={tile.src}>
            <Image
              alt={tile.alt}
              decoding="async"
              height="360"
              loading="lazy"
              src={tile.src}
              width="560"
            />
            <figcaption>{tile.label}</figcaption>
          </figure>
        ))}
      </div>
    </aside>
  );
}

function HeroAssurance({ copy, reduceMotion }) {
  const metrics = copy.results?.metrics || [];
  const firstMetric = metrics[0] ? metricValue(metrics[0]) : null;

  return (
    <motion.div className="hero-assurance" {...heroEntrance(0.3, reduceMotion)}>
      <span>{copy.hero.eyebrow}</span>
      <span>{copy.financial?.delivery?.[0]}</span>
      {firstMetric && <span>{firstMetric} {metrics[0].label}</span>}
    </motion.div>
  );
}

function HeroVisual({ copy }) {
  const reduceMotion = usePrefersReducedMotion();
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
          <ol className="growth-stages">
            {stages.map((stage, index) => (
              <li key={stage}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{stage}</strong>
                {index < stages.length - 1 && <ArrowRight aria-hidden="true" size={18} />}
              </li>
            ))}
          </ol>
          <div className="growth-map-summary">
            <Check aria-hidden="true" size={17} />
            <p>{copy.hero.description}</p>
          </div>
        </div>
        <HeroProofBoard copy={copy} />
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
