# Digicore Frontend

React + Vite frontend for the Digicore site (public pages + admin panel).

## Stack

- React 19, React Router
- Tailwind v4
- Framer Motion / GSAP for animations
- Swiper for carousels/testimonials
- Recharts for admin dashboard charts

## Structure

- `src/Pages` – route-level pages, public site + `admin/`
- `src/Components` – reusable UI, split into `Sections`, `Cards`, `admin/`
- `src/layout` – `AdminLayout`, `UserLayout`
- `src/utils` – API helpers, blog data, misc

## Running locally

```bash
npm install
npm run dev
```

Needs the backend running (see `../Backend`) for anything that hits `/api/*` — otherwise pages fall back to local placeholder data where that's wired up (e.g. blogs).

## Build

```bash
npm run build
npm run preview
```
