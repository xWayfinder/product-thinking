<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Social / Open Graph metadata

Every **new route** (`app/**/page.tsx`) should export metadata that works for link previews (email, Slack, social crawlers):

- **Model pages** under `app/models/*/page.tsx`: use `modelPageMetadata(entry)` from `lib/share-metadata.ts` (same pattern as existing model routes). It sets `openGraph` and `twitter` (`summary_large_image`) plus page-specific `title`, `description`, and `url`. In `lib/models.ts`, set optional **`shareDescription`** for a short link-preview blurb (long `description` stays for the page body). For a **custom preview image** (e.g. hero with the first diagram + short line), add a file under **`public/`** (e.g. `og-<slug>.png`) and set **`shareImage`** on that model entry with correct `width` / `height` / `alt`. With static export + `basePath`, route-level `opengraph-image.*` files can produce incorrect doubled paths in `og:image` URLs; prefer **`public/`** assets for page-specific OG images.
- **Other pages**: export a `metadata` object (or `generateMetadata`) with at least `title`, `description`, and extend `openGraph` / `twitter` if the defaults in `app/layout.tsx` are not specific enough. Prefer absolute-ready fields: `metadataBase` is set from `NEXT_PUBLIC_SITE_URL` via `lib/site.ts` in the root layout; relative image paths like `/og.png` resolve against it.
- **Preview image**: default shared image is `public/og.png`. Override per model with **`shareImage`** when the card should reflect that page’s content.
- **Production builds** (including CI): `NEXT_PUBLIC_SITE_URL` must match the deployed origin (no trailing slash). See `.env.example` and `.github/workflows/deploy.yml`.
