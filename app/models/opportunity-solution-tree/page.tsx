import { ModelPlaceholder } from "@/components/ModelPlaceholder";
import { modelBySlug } from "@/lib/models";
import { modelPageMetadata } from "@/lib/share-metadata";

const slug = "opportunity-solution-tree";
const entry = modelBySlug(slug)!;

export const metadata = modelPageMetadata(entry);

export default function OpportunitySolutionTreePage() {
  return <ModelPlaceholder slug={slug} />;
}
