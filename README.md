# Masar Global Landing Page

Single-page bilingual company website built with React and Vite.

## Stack

- React 19
- Vite 8
- Framer Motion for interface animation
- Lucide React icons
- Radix-backed shadcn-style UI primitives
- Magic UI and Aceternity-inspired free effects
- Plain CSS with theme tokens in `src/styles/tokens.css`

## Local development

```bash
npm install
npm run dev
```

Production verification:

```bash
npm run lint
npm test
npm run build
npm run preview
```

The Vitest suite covers language switching, translated process content, query
parameter state, RTL tab navigation, reduced-motion preferences, and dynamic
hero service numbering.

## Structure

- `src/components/layout/` — navbar, logo, theme/language controls, and footer
- `src/components/ui/` — Radix-backed shadcn-style primitives
- `src/components/magicui/` — bento, marquee, blur, grid, and border effects
- `src/components/aceternity/` — hero, work examples, and CTA effects
- `src/components/` — landing-page sections
- `src/context/` — language and theme state
- `src/i18n/translations.js` — English and Arabic interface copy
- `src/data/siteAssets.js` — canonical asset paths
- `src/styles/` — theme tokens, shared styles, and responsive section styles

## Theme and language

Dark/light theme and English/Arabic language selections are stored in `localStorage`.
The document language, text direction, title, description, Open Graph metadata, and
Twitter metadata update when the language changes.

## Contact form

The contact form builds a JSON payload with `name`, `email`, `phone`, `company`,
and `message`, then POSTs it to `VITE_CONTACT_ENDPOINT`. Copy `.env.example` to a
local env file and fill that value before deployment.
