import { Outlet } from "react-router-dom";
import { useLanguage } from "../../hooks/useLanguage.js";
import { TooltipProvider } from "../ui/Tooltip.jsx";
import Footer from "./Footer.jsx";
import MobileContactBar from "./MobileContactBar.jsx";
import Navbar from "./Navbar.jsx";
import SeoManager from "../SeoManager.jsx";

export default function SiteLayout() {
  const { copy } = useLanguage();

  return (
    <TooltipProvider delayDuration={250}>
      <SeoManager />
      <a className="skip-link" href="#main-content">
        {copy.a11y.skipContent}
      </a>
      <Navbar />
      <div className="site-frame">
        <main id="main-content" tabIndex="-1">
          <Outlet />
        </main>
        <Footer />
      </div>
      <MobileContactBar />
    </TooltipProvider>
  );
}
