import { siteConfig } from "../config/siteConfig.ts";

export const contactEndpoint = siteConfig.contactEndpoint;
export const workingHours = {
  en: "Sunday–Thursday, 9:00 AM–5:00 PM",
  ar: "الأحد–الخميس، 9:00 صباحًا–5:00 مساءً",
};

export const partnerLogos = Array.from(
  { length: 30 },
  (_, index) => ({
    height: 200,
    src: `/assets/partners/partner-${String(index + 1).padStart(2, "0")}.webp`,
    width: 300,
  })
);

