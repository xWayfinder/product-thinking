import type { Metadata } from "next";
import type { ModelEntry } from "@/lib/models";
import { modelHref } from "@/lib/models";

/** Default social preview image (public/og.png). Dimensions match generated asset. */
const ogImage = {
  url: "/og.png",
  width: 1376,
  height: 768,
  alt: "Product Thinking — visual mental models for product work",
} as const;

export function modelPageMetadata(entry: ModelEntry): Metadata {
  const path = modelHref(entry.slug);
  const shareTitle = `${entry.title} · Product Thinking`;

  return {
    title: entry.title,
    description: entry.description,
    openGraph: {
      type: "article",
      title: shareTitle,
      description: entry.description,
      url: path,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description: entry.description,
      images: [ogImage.url],
    },
  };
}
