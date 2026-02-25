# Beasylink Projects Website

Nuxt 3 + Vuetify marketing website for **Beasylink Projects**, a Witbank (Emalahleni), Mpumalanga service business offering welding, plumbing, and construction work.

## Project overview

This project is a static-first, SEO-ready business site focused on local lead generation:

- Sales-focused landing page with call and WhatsApp CTAs
- Dedicated services pages for welding, plumbing, and construction
- Gallery, about, and contact pages
- Structured SEO (meta tags, OG, Twitter, canonical URLs, JSON-LD, robots, sitemap)
- Image strategy based on `@nuxt/image` with responsive lazy-loaded assets
- Minimal Pinia usage for global business configuration only

## Tech stack

- **Nuxt 3**
- **Vuetify 3**
- **Pinia** (`@pinia/nuxt`) for global site config
- **@nuxt/image** for responsive images and optimization workflow

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production build and static generation

```bash
npm run build
npm run generate
npm run preview
```

Static output is generated to `.output/public` and is ready for Netlify deployment.

## Environment variables

Use `.env` (optional):

```bash
NUXT_PUBLIC_SITE_URL=https://beasylink-projects.co.za
```

If omitted, `https://beasylink-projects.co.za` is used as the default canonical base URL.

## SEO notes

### Where meta and canonical settings are managed
- Shared SEO helper: `composables/useSeo.ts`
- Per-page title/description/path defined directly in each page (`pages/*.vue`)

### Structured data
- Home page LocalBusiness schema: `pages/index.vue`
- Service schema per service page:
  - `pages/services/welding.vue`
  - `pages/services/plumbing.vue`
  - `pages/services/construction.vue`

### Crawl/index files
- Robots: `public/robots.txt`
- Sitemap route: `server/routes/sitemap.xml.ts` (prerendered via Nuxt Nitro setting)

## Image replacement instructions

Placeholder images live in `public/images/` with descriptive filenames.

To replace with real project photos:
1. Keep the same filenames **or** update references in pages/composables.
2. Prefer modern compressed formats (`.webp` or `.avif`) when available.
3. Keep descriptive filenames and alt text aligned (e.g. `welding-gate-installation-witbank`).
4. Keep dimensions proportional and avoid oversized source files.

Nuxt Image (`<NuxtImg>`) already handles responsive `sizes` and lazy loading on non-critical images.

## Netlify deployment

`netlify.toml` is included with:
- build command: `npm run generate`
- publish directory: `.output/public`

Deploy steps:
1. Push repository to your Git provider.
2. Create a Netlify site from the repo.
3. Confirm build command and publish dir from `netlify.toml`.
4. Set `NUXT_PUBLIC_SITE_URL` in Netlify environment variables.
5. Trigger deploy.

## Site configuration (business details)

Update business-wide details in one place:
- `stores/siteConfig.ts`

This store contains phone, WhatsApp, service areas, opening hours, and core services.
