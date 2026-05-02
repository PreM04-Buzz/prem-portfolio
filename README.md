# Prem Portfolio

A modern personal portfolio for **Prem Swaroopa Nanda Ramalingam** built with React, TypeScript, Vite, Tailwind CSS, and shadcn/ui components.

## Features

- Responsive portfolio landing page
- Animated hero, starfield, orbit, and scroll interactions
- Sections for About, Skills, Projects, Experience, Achievements, and Contact
- Command palette and smooth navigation
- SEO-ready metadata in `index.html`
- TypeScript, ESLint, Vitest, and Vite build tooling

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui + Radix UI
- React Router
- TanStack Query
- Vitest

## Run Locally

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal, usually:

```bash
http://localhost:8080
```

## Build for Production

```bash
npm run build
npm run preview
```

## Quality Checks

```bash
npm run lint
npm run typecheck
npm run test
```

## Project Structure

```text
src/
  components/
    portfolio/   Portfolio sections and animations
    ui/          Reusable shadcn/ui components
  hooks/         Shared React hooks
  lib/           Utilities
  pages/         Route-level pages
  test/          Test setup and sample test
```

## Deployment Notes

This project can be deployed to GitHub Pages, Netlify, Vercel, or any static hosting provider after running `npm run build`. The production files are generated inside the `dist/` folder.

## Image Assets

- `src/assets/profile.jpg` is the portfolio avatar used in the hero section.
- `public/og-image.jpg` is used for Open Graph and Twitter preview cards.

