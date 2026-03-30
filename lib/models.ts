export type ModelStatus = "Ready" | "In Progress" | "Planned" | "Draft";

export type ModelEntry = {
  slug: string;
  title: string;
  description: string;
  status: ModelStatus;
  /** Short line for link previews; defaults to `description` if omitted. */
  shareDescription?: string;
  /** Page-specific `og:image` under `public/` (path from site root, e.g. `/og-adoption-s-curve.png`). */
  shareImage?: {
    url: string;
    width: number;
    height: number;
    alt: string;
  };
};

export const models: ModelEntry[] = [
  {
    slug: "adoption-s-curve",
    title: "Feature adoption (S-curve)",
    description:
      "Why adoption follows a sigmoid: slow start, acceleration, saturation — and why shipping everything at once overwhelms customers.",
    shareDescription:
      "Principles & mental models for product work — the adoption S-curve and why pacing beats pile-ons.",
    shareImage: {
      url: "/og-adoption-s-curve.png",
      width: 1376,
      height: 768,
      alt: "Product Thinking — principles & mental models for product work; adoption S-curve",
    },
    status: "Ready",
  },
  {
    slug: "opportunity-solution-tree",
    title: "Opportunity Solution Tree",
    description:
      "Map outcomes to opportunities and experiments so your team can prioritize by impact.",
    status: "Planned",
  },
  {
    slug: "north-star-breakdown",
    title: "North Star Breakdown",
    description:
      "Break your North Star metric into leading indicators and initiative bets.",
    status: "In Progress",
  },
  {
    slug: "risk-radar",
    title: "Risk Radar",
    description:
      "Track product, technical, and adoption risks with explicit mitigation actions.",
    status: "Draft",
  },
];

export function modelHref(slug: string): string {
  return `/models/${slug}/`;
}

export function modelBySlug(slug: string): ModelEntry | undefined {
  return models.find((m) => m.slug === slug);
}
