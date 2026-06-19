import AboutSection from "./components/AboutSection.jsx";
import ContactSection from "./components/ContactSection.jsx";
import Hero from "./components/Hero.jsx";
import LogoMarquee from "./components/LogoMarquee.jsx";
import Footer from "./components/layout/Footer.jsx";
import Navbar from "./components/layout/Navbar.jsx";
import PortfolioShowcase from "./components/PortfolioShowcase.jsx";
import ResultsSection from "./components/ResultsSection.jsx";
import ServicesBento from "./components/ServicesBento.jsx";
import SolutionsShowcase from "./components/SolutionsShowcase.jsx";
import StickyScrollytelling from "./components/StickyScrollytelling.jsx";
import TeamSection from "./components/TeamSection.jsx";
import WhyChooseUs from "./components/WhyChooseUs.jsx";
import { useLanguage } from "./hooks/useLanguage.js";
import { TooltipProvider } from "./components/ui/Tooltip.jsx";

export default function App() {
  const { copy } = useLanguage();

  return (
    <TooltipProvider delayDuration={250}>
      <a className="skip-link" href="#main-content">
        {copy.a11y.skipContent}
      </a>
      <Navbar />
      <div className="site-frame">
        <main id="main-content" tabIndex="-1">
          <Hero />
          <LogoMarquee />
          <AboutSection />
          <StickyScrollytelling />
          <ServicesBento />
          <SolutionsShowcase />
          <PortfolioShowcase />
          <ResultsSection />
          <WhyChooseUs />
          <TeamSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </TooltipProvider>
  );
}
