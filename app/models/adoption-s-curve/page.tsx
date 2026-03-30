import type { Metadata } from "next";
import {
  AdoptionPacingVisual,
  AdoptionSCurve,
} from "@/components/visualizations/AdoptionSCurve";
import { modelBySlug } from "@/lib/models";

const entry = modelBySlug("adoption-s-curve")!;

export const metadata: Metadata = {
  title: `${entry.title} · Product Thinking`,
  description: entry.description,
};

export default function AdoptionCurvePage() {
  return (
    <main className="page-shell model-page">
      <header className="model-header">
        <p className="eyebrow">{entry.status}</p>
        <h1>{entry.title}</h1>
        <p className="hero-copy">{entry.description}</p>
      </header>

      <section className="model-intro" aria-label="Introduction">
        <p className="hero-copy">
          Product teams often celebrate launch day, but customers experience change over
          weeks and months. If you ship many big things together, you do not get “faster
          adoption” — you get overlapping learning curves, noisier feedback, and fatigue.
        </p>
      </section>

      <section className="model-figure-block" aria-labelledby="adoption-curve-heading">
        <h2 id="adoption-curve-heading" className="model-section-title">
          One feature, one S-curve
        </h2>
        <p className="model-figure-lead">
          Adoption rarely jumps straight to 100%. People need to discover, try, and spread
          usage. That produces a sigmoid: a slow start, a steep middle as momentum builds,
          then a flattening as you approach saturation.
        </p>
        <div className="model-chart-wrap">
          <AdoptionSCurve className="model-figure" />
        </div>
        <p className="model-figure-caption">
          The horizontal axis is time; the vertical axis is how much of the reachable
          audience has adopted the change. Your exact curve depends on the product, but the
          shape is stubbornly common.
        </p>
      </section>

      <section className="model-figure-block" aria-labelledby="pacing-heading">
        <h2 id="pacing-heading" className="model-section-title">
          Pacing releases: stagger vs. pile-on
        </h2>
        <p className="model-figure-lead">
          Shipping three meaningful changes in the same week stacks the steepest parts of
          their adoption curves on top of each other. Support, docs, and attention all get
          hit at once. Spacing releases spreads that pressure so customers (and your team)
          can absorb each change.
        </p>
        <div className="model-chart-wrap model-chart-wrap-wide">
          <AdoptionPacingVisual className="model-figure" width={560} />
        </div>
        <p className="model-figure-caption">
          Top: three features with different launch times vs. the same launch week. Bottom:
          sum of how fast adoption is moving for all three — a rough proxy for how much
          “change energy” your users feel at once. Burst launches concentrate that energy.
        </p>
      </section>

      <section className="model-closing" aria-labelledby="closing-heading">
        <h2 id="closing-heading" className="model-section-title">
          Not just throwing mud at the wall
        </h2>
        <p className="hero-copy">
          Releasing constantly without a theory of adoption is a recipe for noise, not
          learning. The S-curve is a reminder that impact takes time — and that sequencing
          matters as much as shipping.
        </p>
      </section>
    </main>
  );
}
