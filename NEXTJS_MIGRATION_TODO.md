# Next.js Migration TODO (Movie Platform)

## Completed
- [x] Migrated from Vite scripts to Next.js scripts in `package.json`.
- [x] Added Next.js app structure (`app/layout.jsx`, `app/page.jsx`, dynamic routes, `app/not-found.jsx`).
- [x] Replaced `react-router-dom` usage with `next/link` and `next/navigation`.
- [x] Added shared movie helpers in `src/lib/movies.js`.
- [x] Migrated interactive route views to client components in `src/views`.
- [x] Preserved existing behavior for:
  - [x] Home
  - [x] Category page filtering/pagination
  - [x] Movie detail and recommendations
- [x] Centralized global styles in `app/globals.css`.
- [x] Removed Vite entry/config files:
  - [x] `index.html`
  - [x] `vite.config.js`
  - [x] `src/main.jsx`
  - [x] `src/App.jsx`
- [x] Updated `README.md` for Next.js usage.
- [x] Installed dependencies and updated lockfile.
- [x] Verified build and lint pass:
  - [x] `npm run lint`
  - [x] `npm run build`

## Optional Follow-ups
- [ ] Migrate from `next lint` to ESLint CLI (recommended by Next.js 15+ deprecation notice).
- [ ] Add Next ESLint plugin configuration to remove warning shown during lint/build.
- [ ] Convert remaining JS to TypeScript.
- [ ] Add route-level tests for filter and pagination behavior.
