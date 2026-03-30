/**
 * Canonical site origin + path (no trailing slash), used for metadataBase and OG URLs.
 * In production (e.g. GitHub Pages), set NEXT_PUBLIC_SITE_URL in the build environment,
 * e.g. https://YOUR_USER.github.io/product-thinking
 */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw) {
    return raw.replace(/\/$/, "");
  }
  return "http://localhost:3000";
}

export function getMetadataBase(): URL {
  return new URL(`${getSiteUrl()}/`);
}
