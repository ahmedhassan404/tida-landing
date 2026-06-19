import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../hooks/useLanguage.js";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion.js";

export default function HeroServicesText() {
  const { copy, language } = useLanguage();
  const reduceMotion = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);

  const services = copy.hero.animatedServicesList;
  const fixedText = copy.hero.animatedServicesFixed;

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % services.length);
    }, 2000);

    return () => clearInterval(timer);
  }, [services.length]);

  return (
    <div className="hero-services-text-container" dir={language === "ar" ? "rtl" : "ltr"}>
      <span className="hero-services-fixed">{fixedText}</span>
      <div className="hero-services-animated-wrapper">
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            className="hero-services-animated-word"
            initial={{ opacity: 0, y: reduceMotion ? 0 : 15, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : -15, filter: "blur(4px)" }}
            transition={{ duration: reduceMotion ? 0.01 : 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {services[index]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
