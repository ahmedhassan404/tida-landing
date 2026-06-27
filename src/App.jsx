import { BrowserRouter, Route, Routes } from "react-router-dom";
import SiteLayout from "./components/layout/SiteLayout.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import CaseStudiesPage from "./pages/CaseStudiesPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import ServiceDetailPage from "./pages/ServiceDetailPage.jsx";
import ServicesPage from "./pages/ServicesPage.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="services/:serviceSlug" element={<ServiceDetailPage />} />
          <Route path="case-studies" element={<CaseStudiesPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
