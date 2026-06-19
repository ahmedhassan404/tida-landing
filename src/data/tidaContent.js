export const contactEmail = "a7medhasan404@gmail.com";

export const partnerLogos = Array.from(
  { length: 22 },
  (_, index) => ({
    height: 144,
    src: `/assets/partners/partner-${String(index + 1).padStart(2, "0")}.webp`,
    width: 144,
  })
);

export const portfolioProjects = [
  { id: "restaurants", category: "restaurants", image: "/assets/portfolio/restaurants.webp", width: 900, height: 560 },
  { id: "interior", category: "interior", image: "/assets/portfolio/interior.webp", width: 900, height: 560 },
  { id: "socialColor", category: "social", image: "/assets/portfolio/social-color.webp", width: 900, height: 560 },
  { id: "socialIndustrial", category: "social", image: "/assets/portfolio/social-industrial.webp", width: 900, height: 560 },
  { id: "socialCampaign", category: "social", image: "/assets/portfolio/social-campaign.webp", width: 900, height: 560 },
  { id: "websites", category: "websites", image: "/assets/portfolio/websites.webp", width: 900, height: 560 },
  { id: "campaignResults", category: "adResults", image: "/assets/portfolio/campaign-results.webp", width: 900, height: 560 },
  { id: "campaignDashboard", category: "adResults", image: "/assets/portfolio/campaign-dashboard.webp", width: 900, height: 560 },
  { id: "erp", category: "systems", image: "/assets/portfolio/erp.webp", width: 900, height: 560 },
];

export const teamPortraits = {
  mohamed: { src: "/assets/team/mohamed.png", width: 1254, height: 1254 },
  seham: { src: "/assets/team/seham.png", width: 1254, height: 1254 },
  shady: { src: "/assets/team/shady.png", width: 1254, height: 1254 },
};
