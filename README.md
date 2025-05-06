[![Netlify Status](https://api.netlify.com/api/v1/badges/44144fa5-51a0-417e-ae0a-86d22638cdb4/deploy-status)](https://app.netlify.com/sites/visual-playground/deploys)

# Visual Playground — MVP

A minimalist, high-performance website for hosting creative coding projects using libraries like `canvas-sketch`, `p5.js`, and `Three.js`. Designed with DJs in mind as a visual tool, built using **Next.js**, **React**, **TypeScript**, and **TailwindCSS**.

## Objective

Create a personal site to showcase generative and interactive visual coding projects with a simple and intuitive UI. Over time, this may evolve into a visual companion for DJs and performers.

## Architecture

This is a single-page application (SPA) built with Next.js, focusing on smooth transitions and a seamless user experience. The main visual sketch takes up 60% of the viewport, with supporting content arranged in a bento-style layout around it.

## Scope

**In Scope (MVP):**

- Single-page application with smooth transitions
- Bento-style layout with main visual sketch (60% viewport)
- Visual sketch embedding using canvas-sketch (primary) and Three.js
- Tailwind-styled responsive UI
- Error monitoring using Sentry
- Clean TypeScript + React architecture via Next.js

**Out of Scope (MVP):**

- Audio-reactive features
- User authentication
- Multi-user submissions
- Real-time sync or collaboration

## Tech Stack

| Layer      | Tech                                |
| ---------- | ----------------------------------- |
| Framework  | Next.js (React, Hybrid SSR/SSG/CSR) |
| Language   | TypeScript                          |
| Styling    | TailwindCSS                         |
| Sketches   | p5.js, canvas-sketch, Three.js      |
| Logging    | Sentry                              |
| Deployment | Vercel or Netlify                   |
| Versioning | Git + GitHub                        |

## Features

### Project Gallery

- Bento-style layout with main visual sketch (60% viewport)
- Responsive grid layout for supporting content
- Lazy-loaded thumbnails
- Hover animations or previews

### Project Detail Page

- Fullscreen sketch display
- Title, description, metadata
- Return to gallery button

### Visual Embeds

- Load interactive projects via script
- Sandboxed and dynamic loading
- Optional fullscreen/lightbox mode

### Navigation

- Logo/title
- About or Contact section (static)

### Monitoring (Sentry)

- Frontend error tracking
- Tagged breadcrumbs for route/project
- Logging project interaction failures

## Requirements

### Functional

- `FR1`: Display at least 10 hosted projects
- `FR2`: Each project has a route (`/projects/:slug`)
- `FR3`: Integrate Sentry error logging
- `FR4`: Page load time < 2s (excluding heavy rendering)

### Non-Functional

- `NFR1`: Mobile-first responsive design
- `NFR2`: TypeScript strict mode enabled
- `NFR3`: TailwindCSS utility-first; no external CSS
- `NFR4`: Code-splitting and lazy-loading best practices
- `NFR5`: No sensitive data in logs

## Milestones

| Milestone | Task                                    | ETA    |
| --------- | --------------------------------------- | ------ |
| M1        | Scaffold Next.js app with Tailwind + TS | Week 1 |
| M2        | Gallery layout and dynamic routes       | Week 2 |
| M3        | Visual embed system and project pages   | Week 3 |
| M4        | Sentry integration + perf tuning        | Week 4 |
| M5        | Deployment + polish                     | Week 5 |

## Best Practices

### Next.js + TypeScript

- Use `app/` or `pages/` based on routing needs
- Enable strict mode in `tsconfig.json`
- Code-split large sketch components (`dynamic()`)

### TailwindCSS

- Consistent use of utility classes
- Avoid inline styles or custom CSS
- Use `@apply` for reuse when appropriate

### Logging (Sentry)

- Wrap app in error boundary
- Tag logs with project slug and route
- Avoid logging sensitive or unnecessary data

## Setup (Local Development)

```bash
clone the repo
cd visual-playground
npm install
npm run dev
```

Then visit http://localhost:3000.

## Example Sketch Frameworks

- canvas-sketch
- p5.js
- Three.js (via react-three-fiber or raw)

## Coming Soon (Post-MVP Ideas)

- Audio-reactive visuals
- MIDI input for live manipulation
- DJ sync integrations
- User submissions & account dashboard

---
