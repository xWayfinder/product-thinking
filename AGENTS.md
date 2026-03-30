<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Social / Open Graph metadata

Every **new route** (`app/**/page.tsx`) should export metadata that works for link previews (email, Slack, social crawlers):

- **Model pages** under `app/models/*/page.tsx`: use `modelPageMetadata(entry)` from `lib/share-metadata.ts` (same pattern as existing model routes). It sets `openGraph` and `twitter` (`summary_large_image`) plus page-specific `title`, `description`, and `url`.
- **Other pages**: export a `metadata` object (or `generateMetadata`) with at least `title`, `description`, and extend `openGraph` / `twitter` if the defaults in `app/layout.tsx` are not specific enough. Prefer absolute-ready fields: `metadataBase` is set from `NEXT_PUBLIC_SITE_URL` via `lib/site.ts` in the root layout; relative image paths like `/og.png` resolve against it.
- **Preview image**: default shared image is `public/og.png`. Use a page-specific `openGraph.images` entry only when a route needs its own artwork; keep width/height accurate.
- **Production builds** (including CI): `NEXT_PUBLIC_SITE_URL` must match the deployed origin (no trailing slash). See `.env.example` and `.github/workflows/deploy.yml`.
