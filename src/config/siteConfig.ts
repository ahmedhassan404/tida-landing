export const siteConfig = {
  companyName: "Masar Global",
  companyNameAr: "مسار جلوبال",
  description:
    "Masar Global combines strategy, technology, marketing, financial consulting, accounting systems, compliance, MIS reporting, and AI-enabled operations across Egypt, Saudi Arabia, and the UAE.",
  siteUrl: "https://masar-global-landing.pages.dev",
  contactEndpoint: import.meta.env.VITE_CONTACT_ENDPOINT ?? "",
  hero: {
    eyebrow: "Egypt · KSA · UAE",
    title: "Finance systems marketing and growth",
    titleAccent: "One accountable business partner",
    description:
      "Masar Global helps growing companies in Egypt Saudi Arabia and the UAE improve financial control connect operations strengthen their market presence and automate repeated work",
  },
  services: [
    "Strategy & Business Consulting",
    "Financial & Accounting Solutions",
    "Saudi Business Setup",
    "Tourism & Travel Accounting",
    "Marketing & Media",
    "Websites, Applications & Automation",
  ],
  navigationLinks: [
    { label: "Home", to: "/" },
    { label: "Services", to: "/services" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
  ],
  socialLinks: {},
  brandColors: {
    primary: "#82378C",
    blue: "#048ABF",
    cyan: "#04B2D9",
    accent: "#F27127",
    backgroundLight: "#F2F2F2",
  },
} as const;
