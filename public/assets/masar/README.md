# Masar Global Logo Assets — All Themes

## Recommended usage

| Context | Use this file |
|---|---|
| Light theme / white navbar | `svg/full-logo/masar-global-logo-light-transparent.svg` |
| Dark theme / dark navbar | `svg/full-logo/masar-global-logo-dark-transparent.svg` |
| Navy theme | `svg/full-logo/masar-global-logo-navy-transparent.svg` |
| Footer on dark background | `png/full-logo/masar-global-logo-mono-white-transparent.png` or `svg/full-logo/masar-global-logo-white-transparent.svg` |
| Print / invoice / white paper | `svg/full-logo/masar-global-logo-black-transparent.svg` |
| Favicon / app icon | `png/favicon/favicon.ico` or `png/favicon/favicon-512x512.png` |
| Social card / presentation dark | `png/full-logo/masar-global-logo-card-dark.png` |
| Social card / presentation light | `png/full-logo/masar-global-logo-card-light.png` |

## Theme CSS example

```css
:root {
  --masar-bg-light: #FFFFFF;
  --masar-bg-soft: #D9DCD6;
  --masar-bg-dark: #141414;
  --masar-navy: #16425B;
  --masar-blue: #155aa5;
  --masar-blue-dark-mode: #81C3D7;
  --masar-orange: #f37621;
}

.logo-light { display: block; }
.logo-dark { display: none; }

html[data-theme="dark"] .logo-light { display: none; }
html[data-theme="dark"] .logo-dark { display: block; }
```

```html
<img class="logo-light" src="/assets/masar/svg/full-logo/masar-global-logo-light-transparent.svg" alt="Masar Global" />
<img class="logo-dark" src="/assets/masar/svg/full-logo/masar-global-logo-dark-transparent.svg" alt="Masar Global" />
```

## Notes
- SVG files are best for website headers because they stay sharp.
- PNG card files are best for previews, social posts, and presentations.
- Favicon files are square and ready for browser tabs/mobile install.
- The dark SVG uses lighter text and brighter blue for better contrast on dark backgrounds.
