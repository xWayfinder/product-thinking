import { ModelPlaceholder } from "@/components/ModelPlaceholder";
import { modelBySlug } from "@/lib/models";
import { modelPageMetadata } from "@/lib/share-metadata";

const slug = "north-star-breakdown";
const entry = modelBySlug(slug)!;

export const metadata = modelPageMetadata(entry);

export default function NorthStarBreakdownPage() {
  return <ModelPlaceholder slug={slug} />;
}
