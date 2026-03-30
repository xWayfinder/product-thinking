import type { Metadata } from "next";
import type { ModelEntry } from "@/lib/models";
import { modelHref } from "@/lib/models";

/** Default social preview image (public/og.png). Dimensions match generated asset. */
const ogImage = {
  url: "/og.png",
  width: 1376,
  height: 768,
  alt: "Product Thinking — principles & mental models for product work",
} as const;

export function modelPageMetadata(entry: ModelEntry): Metadata {
  const path = modelHref(entry.slug);
  const shareTitle = `${entry.title} · Product Thinking`;
  const shareDescription = entry.shareDescription ?? entry.description;
  const image = entry.shareImage ?? ogImage;

  return {
    title: entry.title,
    description: entry.description,
    openGraph: {
      type: "article",
      title: shareTitle,
      description: shareDescription,
      url: path,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description: shareDescription,
      images: [image.url],
    },
  };
}
