const logoSources = {
  light: "/assets/masar/svg/full-logo/masar-global-logo-light-transparent.svg",
  dark: "/assets/masar/svg/full-logo/masar-global-logo-dark-transparent.svg",
  navy: "/assets/masar/svg/full-logo/masar-global-logo-navy-transparent.svg",
  white: "/assets/masar/svg/full-logo/masar-global-logo-white-transparent.svg",
  black: "/assets/masar/svg/full-logo/masar-global-logo-black-transparent.svg",
  cardDark: "/assets/masar/png/full-logo/masar-global-logo-card-dark.png",
  cardLight: "/assets/masar/png/full-logo/masar-global-logo-card-light.png",
};

export default function Logo({ className, label, variant = "light" }) {
  return (
    <img
      alt={label}
      className={className}
      decoding="async"
      draggable="false"
      src={logoSources[variant] ?? logoSources.dark}
      translate="no"
    />
  );
}
