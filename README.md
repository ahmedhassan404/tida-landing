# TIDA Business Solutions Landing Page

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
npm run build
npm run preview
```

The project does not currently define an automated test script.

## Structure

- `src/components/layout/` — navbar, logo, theme/language controls, and footer
- `src/components/ui/` — Radix-backed shadcn-style primitives
- `src/components/magicui/` — bento, marquee, blur, grid, and border effects
- `src/components/aceternity/` — hero, portfolio, and CTA effects
- `src/components/` — landing-page sections
- `src/context/` — language and theme state
- `src/i18n/translations.js` — English and Arabic interface copy
- `src/data/tidaContent.js` — canonical asset paths
- `src/styles/` — theme tokens, shared styles, and responsive section styles

## Theme and language

Dark/light theme and English/Arabic language selections are stored in `localStorage`.
The document language, text direction, title, description, Open Graph metadata, and
Twitter metadata update when the language changes.

## Contact form

The contact form posts to FormSubmit using the address configured as `contactEmail`
in `src/data/tidaContent.js`. Update that value before deployment if inquiries should
go to a different mailbox.
