import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Menu } from "lucide-react";
import { useActiveSection } from "../../hooks/useActiveSection.js";
import { useLanguage } from "../../hooks/useLanguage.js";
import { Button, ButtonLink } from "../ui/Button.jsx";
import Separator from "../ui/Separator.jsx";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "../ui/Sheet.jsx";
import LanguageToggle from "./LanguageToggle.jsx";
import Logo from "./Logo.jsx";
import ThemeToggle from "./ThemeToggle.jsx";

function useScrolledNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateNavbar = () => setScrolled(window.scrollY > 20);
    updateNavbar();
    window.addEventListener("scroll", updateNavbar, { passive: true });
    return () => window.removeEventListener("scroll", updateNavbar);
  }, []);

  return scrolled;
}

function DesktopNavigation({ activeSectionId, copy }) {
  return (
    <nav className="navbar-links" aria-label={copy.a11y.primaryNav}>
      {copy.nav.links.map((link) => (
        <a
          aria-current={activeSectionId === link.href.slice(1) ? "location" : undefined}
          key={link.href}
          href={link.href}
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
}

export default function Navbar() {
  const { copy } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrolledNavbar();
  const sectionIds = useMemo(
    () => copy.nav.links.map((link) => link.href.slice(1)),
    [copy.nav.links]
  );
  const activeSectionId = useActiveSection(sectionIds);

  return (
    <motion.header
      className={`navbar ${scrolled ? "is-scrolled" : ""}`}
      initial={false}
      animate={{ top: scrolled ? 12 : 0 }}
      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div className="navbar-inner" layout>
        <a className="navbar-brand" href="#top" aria-label={copy.a11y.home}>
          <Logo className="navbar-logo" label={copy.a11y.home} />
        </a>
        <DesktopNavigation activeSectionId={activeSectionId} copy={copy} />
        <div className="navbar-actions">
          <LanguageToggle />
          <ThemeToggle />
          <ButtonLink className="navbar-cta" href="#contact" size="sm">
            {copy.nav.cta}
            <ArrowUpRight size={15} />
          </ButtonLink>
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button
                aria-label={copy.a11y.openMenu}
                className="menu-toggle"
                size="icon"
                variant="outline"
              >
                <Menu size={19} />
              </Button>
            </SheetTrigger>
            <SheetContent closeLabel={copy.a11y.closeMenu}>
              <SheetTitle>{copy.a11y.mobileNav}</SheetTitle>
              <SheetDescription>{copy.hero.description}</SheetDescription>
              <Separator />
              <nav className="sheet-nav" aria-label={copy.a11y.mobileNav}>
                {copy.nav.links.map((link) => (
                  <a
                    aria-current={activeSectionId === link.href.slice(1) ? "location" : undefined}
                    href={link.href}
                    key={link.href}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                    <ArrowUpRight size={16} />
                  </a>
                ))}
              </nav>
              <ButtonLink href="#contact" onClick={() => setMenuOpen(false)}>
                {copy.nav.cta}
                <ArrowUpRight size={16} />
              </ButtonLink>
            </SheetContent>
          </Sheet>
        </div>
      </motion.div>
    </motion.header>
  );
}
