import type { ReactNode } from "react";

function logistic(t: number, t0: number, k: number, L = 100): number {
  return L / (1 + Math.exp(-k * (t - t0)));
}

function logisticDerivative(t: number, t0: number, k: number, L = 100): number {
  const e = Math.exp(-k * (t - t0));
  const d = 1 + e;
  return (L * k * e) / (d * d);
}

function samplePath(
  tMin: number,
  tMax: number,
  steps: number,
  fn: (t: number) => number,
): { x: number; y: number }[] {
  const out: { x: number; y: number }[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = tMin + (i / steps) * (tMax - tMin);
    out.push({ x: t, y: fn(t) });
  }
  return out;
}

function pathD(
  points: { x: number; y: number }[],
  xScale: (x: number) => number,
  yScale: (y: number) => number,
): string {
  if (points.length === 0) return "";
  const first = points[0];
  let d = `M ${xScale(first.x)} ${yScale(first.y)}`;
  for (let i = 1; i < points.length; i++) {
    const p = points[i];
    d += ` L ${xScale(p.x)} ${yScale(p.y)}`;
  }
  return d;
}

const defaultK = 0.35;

type AdoptionSCurveProps = {
  width?: number;
  height?: number;
  className?: string;
  xLabel?: string;
  yLabel?: string;
  ariaLabel?: string;
};

export function AdoptionSCurve({
  width = 520,
  height = 280,
  className,
  xLabel = "Time",
  yLabel = "Adoption",
  ariaLabel = "Adoption over time follows an S-shaped curve: slow early uptake, steep middle, then saturation.",
}: AdoptionSCurveProps) {
  const padL = 52;
  const padR = 20;
  const padT = 16;
  const padB = 44;
  const innerW = width - padL - padR;
  const innerH = height - padT - padB;
  const t0 = 25;
  const tMin = 0;
  const tMax = 70;

  const xScale = (t: number) => padL + ((t - tMin) / (tMax - tMin)) * innerW;
  const yScale = (y: number) => padT + innerH - (y / 100) * innerH;

  const pts = samplePath(tMin, tMax, 80, (t) => logistic(t, t0, defaultK));
  const curve = pathD(pts, xScale, yScale);

  return (
    <figure className={className}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={ariaLabel}
      >
        <title>{ariaLabel}</title>
        <line
          x1={padL}
          y1={padT + innerH}
          x2={padL + innerW}
          y2={padT + innerH}
          stroke="var(--surface-border)"
          strokeWidth={1}
        />
        <line
          x1={padL}
          y1={padT}
          x2={padL}
          y2={padT + innerH}
          stroke="var(--surface-border)"
          strokeWidth={1}
        />
        {[0, 25, 50, 75, 100].map((tick) => (
          <g key={tick}>
            <line
              x1={padL - 4}
              y1={yScale(tick)}
              x2={padL}
              y2={yScale(tick)}
              stroke="var(--surface-border)"
              strokeWidth={1}
            />
            <text
              x={padL - 8}
              y={yScale(tick)}
              dy="0.35em"
              textAnchor="end"
              fill="var(--text-muted)"
              fontSize={11}
              fontFamily="var(--font-geist-mono), monospace"
            >
              {tick}%
            </text>
          </g>
        ))}
        <path
          d={curve}
          fill="none"
          stroke="var(--accent)"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <text
          x={padL + innerW / 2}
          y={height - 12}
          textAnchor="middle"
          fill="var(--text-muted)"
          fontSize={12}
        >
          {xLabel}
        </text>
        <text
          x={14}
          y={padT + innerH / 2}
          textAnchor="middle"
          fill="var(--text-muted)"
          fontSize={12}
          transform={`rotate(-90 14 ${padT + innerH / 2})`}
        >
          {yLabel}
        </text>
      </svg>
    </figure>
  );
}

const steepnessCompareAria =
  "Two adoption curves with the same midpoint in time: one rises gradually with a long transition, the other rises sharply with a rapid adoption phase.";

type AdoptionSteepnessCompareProps = {
  width?: number;
  height?: number;
  className?: string;
};

/** Wider spread = more visible contrast between stretched vs sharp middles. */
const kSlow = 0.09;
const kFast = 0.82;

/** Cool blue (slow) vs warm coral (fast) — distinct on dark bg; fast must not match `--accent` (#7db2ff). */
const strokeFastContrast = "rgba(255, 155, 115, 0.98)";

export function AdoptionSteepnessCompare({
  width = 520,
  height = 280,
  className,
}: AdoptionSteepnessCompareProps) {
  const padL = 52;
  const padR = 20;
  const padT = 16;
  const padB = 52;
  const innerW = width - padL - padR;
  const innerH = height - padT - padB;
  const t0 = 25;
  const tMin = 0;
  const tMax = 70;

  const xScale = (t: number) => padL + ((t - tMin) / (tMax - tMin)) * innerW;
  const yScale = (y: number) => padT + innerH - (y / 100) * innerH;

  const ptsSlow = samplePath(tMin, tMax, 80, (t) => logistic(t, t0, kSlow));
  const ptsFast = samplePath(tMin, tMax, 80, (t) => logistic(t, t0, kFast));
  const pathSlow = pathD(ptsSlow, xScale, yScale);
  const pathFast = pathD(ptsFast, xScale, yScale);

  const chartBottom = padT + innerH;
  const legendY = chartBottom + 16;
  const swatchW = 24;
  const swatchGap = 8;
  const betweenGroups = 28;
  const estTextW = 92;
  const legendTotalW =
    swatchW + swatchGap + estTextW + betweenGroups + swatchW + swatchGap + estTextW;
  const legendStartX = padL + (innerW - legendTotalW) / 2;
  const fastLegendX =
    legendStartX + swatchW + swatchGap + estTextW + betweenGroups;

  return (
    <figure className={className}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={steepnessCompareAria}
      >
        <title>{steepnessCompareAria}</title>
        <line
          x1={padL}
          y1={padT + innerH}
          x2={padL + innerW}
          y2={padT + innerH}
          stroke="var(--surface-border)"
          strokeWidth={1}
        />
        <line
          x1={padL}
          y1={padT}
          x2={padL}
          y2={padT + innerH}
          stroke="var(--surface-border)"
          strokeWidth={1}
        />
        {[0, 25, 50, 75, 100].map((tick) => (
          <g key={tick}>
            <line
              x1={padL - 4}
              y1={yScale(tick)}
              x2={padL}
              y2={yScale(tick)}
              stroke="var(--surface-border)"
              strokeWidth={1}
            />
            <text
              x={padL - 8}
              y={yScale(tick)}
              dy="0.35em"
              textAnchor="end"
              fill="var(--text-muted)"
              fontSize={11}
              fontFamily="var(--font-geist-mono), monospace"
            >
              {tick}%
            </text>
          </g>
        ))}
        <path
          d={pathSlow}
          fill="none"
          stroke="var(--accent)"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d={pathFast}
          fill="none"
          stroke={strokeFastContrast}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <text
          x={padL + innerW / 2}
          y={height - 12}
          textAnchor="middle"
          fill="var(--text-muted)"
          fontSize={12}
        >
          Time
        </text>
        <text
          x={14}
          y={padT + innerH / 2}
          textAnchor="middle"
          fill="var(--text-muted)"
          fontSize={12}
          transform={`rotate(-90 14 ${padT + innerH / 2})`}
        >
          Adoption
        </text>
        <line
          x1={legendStartX}
          y1={legendY}
          x2={legendStartX + swatchW}
          y2={legendY}
          stroke="var(--accent)"
          strokeWidth={2.5}
          strokeLinecap="round"
        />
        <text
          x={legendStartX + swatchW + swatchGap}
          y={legendY}
          dy="0.35em"
          fill="var(--text)"
          fontSize={11}
          fontFamily="var(--font-geist-mono), monospace"
        >
          Slower adoption
        </text>
        <line
          x1={fastLegendX}
          y1={legendY}
          x2={fastLegendX + swatchW}
          y2={legendY}
          stroke={strokeFastContrast}
          strokeWidth={2.5}
          strokeLinecap="round"
        />
        <text
          x={fastLegendX + swatchW + swatchGap}
          y={legendY}
          dy="0.35em"
          fill="var(--text)"
          fontSize={11}
          fontFamily="var(--font-geist-mono), monospace"
        >
          Faster adoption
        </text>
      </svg>
    </figure>
  );
}

type AdoptionPacingVisualProps = {
  width?: number;
  rowHeight?: number;
  className?: string;
};

const featureStartsStaggered = [18, 38, 58];
const featureStartsBurst = [32, 32, 32];

export function AdoptionPacingVisual({
  width = 520,
  rowHeight = 180,
  className,
}: AdoptionPacingVisualProps) {
  const padL = 52;
  const padR = 20;
  const padT = 12;
  const padB = 36;
  const innerW = width - padL - padR;
  const innerH = rowHeight - padT - padB;
  const tMin = 0;
  const tMax = 80;
  const k = defaultK;
  const sectionGap = 28;
  const row1Top = 36;
  const row2Top = row1Top + rowHeight + sectionGap;
  const loadRowTop = row2Top + rowHeight + sectionGap + 18;
  const loadInnerH = rowHeight - padT - padB;
  const height = loadRowTop + rowHeight + 48;

  const xScale = (t: number) => padL + ((t - tMin) / (tMax - tMin)) * innerW;
  const makeYScale = (offsetY: number) => (y: number) =>
    offsetY + padT + innerH - (y / 100) * innerH;

  const colors = [
    "var(--accent)",
    "rgba(125, 178, 255, 0.75)",
    "rgba(125, 178, 255, 0.45)",
  ];

  const row = (
    offsetY: number,
    starts: number[],
    label: string,
  ): ReactNode => {
    const yScale = makeYScale(offsetY);
    const axesY = offsetY + padT + innerH;
    return (
      <g key={label}>
        <text
          x={padL}
          y={offsetY - 2}
          fill="var(--text)"
          fontSize={13}
          fontWeight={600}
        >
          {label}
        </text>
        <line
          x1={padL}
          y1={axesY}
          x2={padL + innerW}
          y2={axesY}
          stroke="var(--surface-border)"
          strokeWidth={1}
        />
        <line
          x1={padL}
          y1={offsetY + padT}
          x2={padL}
          y2={axesY}
          stroke="var(--surface-border)"
          strokeWidth={1}
        />
        {starts.map((t0, i) => {
          const pts = samplePath(tMin, tMax, 80, (t) => logistic(t, t0, k));
          const d = pathD(pts, xScale, yScale);
          return (
            <path
              key={i}
              d={d}
              fill="none"
              stroke={colors[i % colors.length]}
              strokeWidth={2}
              strokeLinecap="round"
            />
          );
        })}
      </g>
    );
  };

  let maxLoad = 0;
  const loadSamples = 100;
  const staggeredLoad: { x: number; y: number }[] = [];
  const burstLoad: { x: number; y: number }[] = [];
  for (let i = 0; i <= loadSamples; i++) {
    const t = tMin + (i / loadSamples) * (tMax - tMin);
    let s = 0;
    let b = 0;
    for (const t0 of featureStartsStaggered) {
      s += logisticDerivative(t, t0, k);
    }
    for (const t0 of featureStartsBurst) {
      b += logisticDerivative(t, t0, k);
    }
    maxLoad = Math.max(maxLoad, s, b);
    staggeredLoad.push({ x: t, y: s });
    burstLoad.push({ x: t, y: b });
  }

  const loadScale = Math.max(maxLoad, 1e-6);
  const loadYScale = (y: number) =>
    loadRowTop + padT + loadInnerH - (y / (loadScale * 1.05)) * loadInnerH;

  const staggeredLoadPath = pathD(staggeredLoad, xScale, loadYScale);
  const burstLoadPath = pathD(burstLoad, xScale, loadYScale);
  const loadAxesY = loadRowTop + padT + loadInnerH;

  const ariaLabel =
    "Three adoption curves: when releases are staggered, peaks are spread out; when released together, change pressure stacks into one sharp peak.";

  return (
    <figure className={className}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={ariaLabel}
      >
        <title>{ariaLabel}</title>
        {row(row1Top, featureStartsStaggered, "Staggered releases")}
        {row(row2Top, featureStartsBurst, "Same-week launch")}
        <text
          x={padL + innerW / 2}
          y={loadRowTop - sectionGap - 4}
          textAnchor="middle"
          fill="var(--text-muted)"
          fontSize={12}
        >
          Weeks
        </text>

        <text
          x={padL}
          y={loadRowTop - 6}
          fill="var(--text)"
          fontSize={13}
          fontWeight={600}
        >
          Combined rate of adoption change
        </text>
        <line
          x1={padL}
          y1={loadAxesY}
          x2={padL + innerW}
          y2={loadAxesY}
          stroke="var(--surface-border)"
          strokeWidth={1}
        />
        <line
          x1={padL}
          y1={loadRowTop + padT}
          x2={padL}
          y2={loadAxesY}
          stroke="var(--surface-border)"
          strokeWidth={1}
        />
        <path
          d={staggeredLoadPath}
          fill="none"
          stroke="var(--accent)"
          strokeWidth={2}
          strokeLinecap="round"
          opacity={0.9}
        />
        <path
          d={burstLoadPath}
          fill="none"
          stroke="rgba(255, 160, 120, 0.95)"
          strokeWidth={2}
          strokeLinecap="round"
          opacity={0.95}
        />
        <text
          x={padL + innerW - 8}
          y={loadRowTop + 28}
          textAnchor="end"
          fill="var(--accent)"
          fontSize={11}
          fontFamily="var(--font-geist-mono), monospace"
        >
          staggered
        </text>
        <text
          x={padL + innerW - 8}
          y={loadRowTop + 44}
          textAnchor="end"
          fill="rgba(255, 180, 140, 0.95)"
          fontSize={11}
          fontFamily="var(--font-geist-mono), monospace"
        >
          burst
        </text>
      </svg>
    </figure>
  );
}
