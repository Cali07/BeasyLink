# Mila Portal

Internal Nuxt 3 + Vuetify portal scaffolded for Mila teams. It ships a sidebar layout, placeholder modules, and a feature‑rich Beadographer workspace built with the Options API and Pinia.

## Stack
- Nuxt 3 (SPA)
- Vuetify 3
- Pinia
- jsPDF (PDF export)

## App Structure
- `layouts/mila.vue` — permanent sidebar shell
- `pages/dashboard` — landing overview (placeholder)
- `pages/products` — coming soon
- `pages/capacity` — coming soon
- `pages/quality` — coming soon
- `pages/beadographer` — bead design studio (editor, gallery, pattern loader)
- `components/beadographer/*` — grid, tools, palette manager, JSON/PDF controls, overlay, metadata, gallery cards
- `stores/*` — Pinia stores (products, capacity, quality, beadographer)

## Beadographer Highlights
- Two-column layout: left canvas + overlay, right tools/palette/settings/metadata
- Undo/redo stacks, zoom, fill row/column, eyedropper, eraser
- Palette manager with add/remove and symbol handling
- Grid settings (rows/cols, zoom, reset)
- Background overlay upload with opacity, offsets, fit toggle
- Auto-save to `localStorage` every second (grid, palette, overlay, metadata, patterns)
- Save/load patterns to local gallery
- Export PDF
- Import/export JSON (dialog + file/text input, validation, preview)

## Getting Started
```bash
npm install
npm run dev
```
App serves at http://localhost:3000.

## Notes
- No backend wiring is included; all data is mock/localStorage.
- Keep edits in Options API to stay consistent with the scaffold.*** End Patch
