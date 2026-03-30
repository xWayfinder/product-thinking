import { ModelPlaceholder } from "@/components/ModelPlaceholder";
import { modelBySlug } from "@/lib/models";
import { modelPageMetadata } from "@/lib/share-metadata";

const slug = "risk-radar";
const entry = modelBySlug(slug)!;

export const metadata = modelPageMetadata(entry);

export default function RiskRadarPage() {
  return <ModelPlaceholder slug={slug} />;
}
