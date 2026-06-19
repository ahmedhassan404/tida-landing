import { useEffect, useRef, useState } from "react";
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
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function HeroVisual({ copy }) {
  const containerRef = useRef(null);
  const cycleRef = useRef(null);

  const reduceMotion = usePrefersReducedMotion();

  const [activeIndex, setActiveIndex] = useState(-1);
  const [hasEntered, setHasEntered] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!hasEntered || isHovered || reduceMotion) return;

    cycleRef.current = window.setInterval(() => {
      setActiveIndex((prev) => (prev >= 5 ? 0 : prev + 1));
    }, 2500);

    return () => {
      if (cycleRef.current) {
        window.clearInterval(cycleRef.current);
      }
    };
  }, [hasEntered, isHovered, reduceMotion]);

  useGSAP(
    () => {
      const root = containerRef.current;
      if (!root) return;

      if (reduceMotion) {
        gsap.set(root, { opacity: 1, y: 0, scale: 1 });
        setHasEntered(true);
        setActiveIndex(0);
        return;
      }

      gsap.set(root, {
        opacity: 0,
        y: 30,
        scale: 0.98,
      });

      gsap.set(".growth-map-header span", {
        opacity: 0,
        y: -10,
      });

      gsap.set(".growth-map-track", {
        "--line-scale": 0,
      });

      gsap.set(".growth-map-track span", {
        opacity: 0,
        scale: 0.5,
      });

      gsap.set(".growth-map-track svg", {
        opacity: 0,
        x: -10,
      });

      gsap.set(".growth-node", {
        opacity: 0,
        y: 42,
        scale: 0.94,
        rotateX: 8,
        filter: "blur(10px)",
        transformOrigin: "center bottom",
      });

      const nodes = gsap.utils.toArray(".growth-node");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 85%",
          once: true,
        },
        defaults: {
          ease: "expo.out",
        },
        onComplete: () => {
          gsap.set(
            ".growth-node, .growth-map-track span, .growth-map-track svg, .growth-map-track",
            {
              clearProps: "all",
            }
          );

          setHasEntered(true);
        },
      });

      tl.to(root, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
      });

      tl.to(
        ".growth-map-header span",
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.06,
          ease: "power3.out",
        },
        "-=0.55"
      );

      tl.to(
        ".growth-map-track",
        {
          "--line-scale": 1,
          duration: 0.7,
          ease: "power3.inOut",
        },
        "-=0.35"
      );

      tl.to(
        ".growth-map-track span",
        {
          opacity: 1,
          scale: 1,
          duration: 0.42,
          stagger: 0.08,
          ease: "back.out(2)",
        },
        "-=0.45"
      );

      tl.to(
        ".growth-map-track svg",
        {
          opacity: 1,
          x: 0,
          duration: 0.34,
          stagger: 0.08,
          ease: "power2.out",
        },
        "-=0.45"
      );

      nodes.forEach((node, index) => {
        tl.call(
          () => {
            setActiveIndex(index);
          },
          [],
          index === 0 ? "-=0.2" : ">-0.42"
        );

        tl.to(
          node,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            filter: "blur(0px)",
            duration: 0.72,
          },
          "<"
        );
      });

      tl.to({}, { duration: 0.45 });
    },
    {
      scope: containerRef,
      dependencies: [reduceMotion],
    }
  );

  const getTrackIndex = () => {
    if (activeIndex < 0) return -1;
    return Math.floor(activeIndex / 2);
  };

  return (
    <div
      className="growth-map-wrap"
      ref={containerRef}
      style={{ opacity: reduceMotion ? 1 : 0 }}
    >
      <style>{`
        .growth-map-wrap {
          perspective: 1200px;
          will-change: transform, opacity;
        }

        .growth-map-track::before {
          transform: scaleX(var(--line-scale, 1));
          transform-origin: center center;
          will-change: transform;
        }

        .growth-map-track span,
        .growth-map-track svg,
        .growth-node {
          will-change: transform, opacity, filter;
        }

        .growth-node {
          transition:
            transform 340ms cubic-bezier(0.16, 1, 0.3, 1),
            opacity 340ms cubic-bezier(0.16, 1, 0.3, 1),
            border-color 340ms cubic-bezier(0.16, 1, 0.3, 1),
            box-shadow 340ms cubic-bezier(0.16, 1, 0.3, 1),
            background 340ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .growth-node.is-active {
          border-color: var(--accent);
          box-shadow:
            0 18px 55px color-mix(in srgb, var(--accent) 14%, transparent),
            0 0 0 1px color-mix(in srgb, var(--accent) 20%, transparent);
          background: color-mix(in srgb, var(--surface-raised) 98%, transparent);
        }

        .growth-node.is-active > span {
          color: var(--accent);
        }

        .growth-node svg {
          opacity: 0;
          transform: translateY(4px) scale(0.9);
          transition:
            opacity 300ms ease,
            transform 300ms ease;
        }

        .growth-node.is-active svg {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .growth-map-nodes.is-entered .growth-node.is-active {
          transform: translateY(-6px) scale(1.025);
          opacity: 1;
          z-index: 2;
        }

        .growth-map-nodes.is-entered .growth-node:not(.is-active) {
          opacity: 0.58;
          transform: scale(0.985);
          z-index: 1;
        }

        .growth-map-nodes.is-entered .growth-node:hover {
          transform: translateY(-8px) scale(1.03);
          opacity: 1;
        }

        .growth-map-track span {
          transition:
            transform 300ms ease,
            background 300ms ease,
            box-shadow 300ms ease,
            opacity 300ms ease;
        }

        .growth-map-track span.is-active {
          background: var(--accent) !important;
          box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent) 28%, transparent) !important;
          transform: scale(1.3) !important;
          opacity: 1 !important;
        }

        @media (prefers-reduced-motion: reduce) {
          .growth-node,
          .growth-map-track span,
          .growth-map-track svg {
            transition: none !important;
            transform: none !important;
            filter: none !important;
          }
        }
      `}</style>

      <div className="growth-map" aria-label={copy.hero.orbitLabel} role="img">
        <div className="growth-map-header">
          <span>
            <i /> {copy.hero.signal}
          </span>
          <span>01—06</span>
        </div>

        <div className="growth-map-track" aria-hidden="true">
          <span className={getTrackIndex() === 0 ? "is-active" : ""} />
          <ArrowRight size={17} />
          <span className={getTrackIndex() === 1 ? "is-active" : ""} />
          <ArrowRight size={17} />
          <span className={getTrackIndex() === 2 ? "is-active" : ""} />
        </div>

        <div
          className={`growth-map-nodes ${hasEntered ? "is-entered" : ""}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {copy.hero.serviceCards.map((service, index) => (
            <div
              className={`growth-node ${
                activeIndex === index ? "is-active" : ""
              }`}
              key={`${service}-${index}`}
              onMouseEnter={() => {
                if (hasEntered) {
                  setActiveIndex(index);
                }
              }}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{service}</strong>
              <Check size={14} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const { copy } = useLanguage();
  const reduceMotion = usePrefersReducedMotion();

  const entrance = (delay) => ({
    initial: {
      opacity: 0,
      y: reduceMotion ? 0 : 24,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
    transition: {
      duration: reduceMotion ? 0.01 : 0.7,
      delay,
      ease: [0.16, 1, 0.3, 1],
    },
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

        <HeroVisual copy={copy} />
      </div>
    </section>
  );
}