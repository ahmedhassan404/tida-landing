import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Menu } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { navigation } from "../../data/siteContent.js";
import { useLanguage } from "../../hooks/useLanguage.js";
import { useTheme } from "../../hooks/useTheme.js";
import { Button } from "../ui/Button.jsx";
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

function DesktopNavigation({ copy, links }) {
  return (
    <nav className="navbar-links" aria-label={copy.a11y.primaryNav}>
      {links.map((link) => (
        <NavLink end={link.to === "/"} key={link.to} to={link.to}>
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
}

export default function Navbar() {
  const { copy, language } = useLanguage();
  const { theme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrolledNavbar();
  const links = navigation[language];

  return (
    <motion.header
      className={`navbar ${scrolled ? "is-scrolled" : ""}`}
      initial={false}
      animate={{ top: scrolled ? 12 : 0 }}
      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div className="navbar-inner" layout>
        <Link className="navbar-brand" to="/" aria-label={copy.a11y.home}>
          <Logo
            className="navbar-logo"
            label={copy.a11y.home}
            variant={theme === "dark" ? "dark" : "light"}
          />
        </Link>
        <DesktopNavigation copy={copy} links={links} />
        <div className="navbar-actions">
          <LanguageToggle />
          <ThemeToggle />
          <Button asChild className="navbar-cta" size="sm">
            <Link to="/contact">
              {language === "ar" ? "احجز استشارة" : "Book Consultation"}
              <ArrowUpRight size={15} />
            </Link>
          </Button>
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
                {links.map((link) => (
                  <NavLink
                    end={link.to === "/"}
                    to={link.to}
                    key={link.to}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                    <ArrowUpRight size={16} />
                  </NavLink>
                ))}
              </nav>
              <Button asChild>
                <Link to="/contact" onClick={() => setMenuOpen(false)}>
                  {language === "ar" ? "احجز استشارة" : "Book Consultation"}
                  <ArrowUpRight size={16} />
                </Link>
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </motion.div>
    </motion.header>
  );
}
