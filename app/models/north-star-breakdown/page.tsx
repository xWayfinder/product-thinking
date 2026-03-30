import type { Metadata } from "next";
import { ModelPlaceholder } from "@/components/ModelPlaceholder";
import { modelBySlug } from "@/lib/models";

const slug = "north-star-breakdown";
const entry = modelBySlug(slug)!;

export const metadata: Metadata = {
  title: `${entry.title} · Product Thinking`,
  description: entry.description,
};

export default function NorthStarBreakdownPage() {
  return <ModelPlaceholder slug={slug} />;
}
