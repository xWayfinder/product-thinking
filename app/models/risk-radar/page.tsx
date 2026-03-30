import type { Metadata } from "next";
import { ModelPlaceholder } from "@/components/ModelPlaceholder";
import { modelBySlug } from "@/lib/models";

const slug = "risk-radar";
const entry = modelBySlug(slug)!;

export const metadata: Metadata = {
  title: `${entry.title} · Product Thinking`,
  description: entry.description,
};

export default function RiskRadarPage() {
  return <ModelPlaceholder slug={slug} />;
}
