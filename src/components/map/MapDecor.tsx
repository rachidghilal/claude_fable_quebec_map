type Point = { x: number; y: number };

/**
 * Stylized fleur-de-lys, drawn in a local coordinate space of roughly
 * 60×72 centered on (0, 0). Scale with the `size` prop (height in svg units).
 */
export function FleurDeLys({ x, y, size, color }: Point & { size: number; color: string }) {
  const scale = size / 72;
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} fill={color} aria-hidden="true">
      {/* central petal */}
      <path d="M0,-36 C7,-24 9,-12 4,-2 L4,8 L-4,8 L-4,-2 C-9,-12 -7,-24 0,-36 Z" />
      {/* side curls */}
      <path d="M6,4 C12,-8 24,-12 27,-4 C30,4 20,9 7,9 Z" />
      <path d="M-6,4 C-12,-8 -24,-12 -27,-4 C-30,4 -20,9 -7,9 Z" />
      {/* band */}
      <rect x={-13} y={11} width={26} height={5} rx={2.5} />
      {/* foot */}
      <path d="M0,18 C5,22 7,28 4,34 L-4,34 C-7,28 -5,22 0,18 Z" />
      <path d="M5,20 C10,16 16,17 17,22 C18,27 12,29 6,27 Z" />
      <path d="M-5,20 C-10,16 -16,17 -17,22 C-18,27 -12,29 -6,27 Z" />
    </g>
  );
}

/** Double ornamental border in the style of an engraved map plate. */
export function MapFrame({ width, height }: { width: number; height: number }) {
  const outer = 10;
  const inner = 22;
  return (
    <g aria-hidden="true" pointerEvents="none">
      <rect
        x={outer}
        y={outer}
        width={width - outer * 2}
        height={height - outer * 2}
        fill="none"
        stroke="var(--map-ink)"
        strokeWidth={2.5}
      />
      <rect
        x={inner}
        y={inner}
        width={width - inner * 2}
        height={height - inner * 2}
        fill="none"
        stroke="var(--map-ink)"
        strokeWidth={0.8}
      />
      {[
        [outer, outer],
        [width - outer, outer],
        [outer, height - outer],
        [width - outer, height - outer],
      ].map(([cx, cy]) => (
        <rect
          key={`${cx}-${cy}`}
          x={cx - 7}
          y={cy - 7}
          width={14}
          height={14}
          fill="var(--map-paper)"
          stroke="var(--map-ink)"
          strokeWidth={2}
        />
      ))}
    </g>
  );
}

/** Engraved-style title cartouche with fleur-de-lys crest. */
export function Cartouche({
  x,
  y,
  width,
  title,
  subtitle,
  detail,
}: Point & { width: number; title: string; subtitle: string; detail: string }) {
  const height = 118;
  const compactTitle = title.length > 7;
  const compactSubtitle = subtitle.length > 26;
  return (
    <g transform={`translate(${x} ${y})`} aria-hidden="true" pointerEvents="none">
      <rect
        width={width}
        height={height}
        rx={6}
        fill="var(--map-paper)"
        stroke="var(--map-ink)"
        strokeWidth={2}
        opacity={0.96}
      />
      <rect
        x={5}
        y={5}
        width={width - 10}
        height={height - 10}
        rx={3}
        fill="none"
        stroke="var(--map-ink)"
        strokeWidth={0.7}
      />
      <FleurDeLys x={width / 2} y={26} size={26} color="var(--flag-blue)" />
      <text
        x={width / 2}
        y={62}
        textAnchor="middle"
        className={`cartouche-title ${compactTitle ? "is-compact" : ""}`}
        textLength={compactTitle ? width - 64 : undefined}
        lengthAdjust={compactTitle ? "spacingAndGlyphs" : undefined}
      >
        {title}
      </text>
      <line
        x1={width / 2 - 70}
        y1={73}
        x2={width / 2 + 70}
        y2={73}
        stroke="var(--gold)"
        strokeWidth={1.6}
      />
      <text
        x={width / 2}
        y={90}
        textAnchor="middle"
        className={`cartouche-subtitle ${compactSubtitle ? "is-compact" : ""}`}
        textLength={compactSubtitle ? width - 42 : undefined}
        lengthAdjust={compactSubtitle ? "spacingAndGlyphs" : undefined}
      >
        {subtitle}
      </text>
      <text x={width / 2} y={106} textAnchor="middle" className="cartouche-detail">
        {detail}
      </text>
    </g>
  );
}

/** Classic eight-point compass rose, north pointing up. */
export function CompassRose({ x, y, size }: Point & { size: number }) {
  const r = size / 2;
  const inner = r * 0.42;
  const cardinal = [0, 90, 180, 270];
  const ordinal = [45, 135, 225, 315];

  function point(angle: number, radius: number): string {
    const rad = ((angle - 90) * Math.PI) / 180;
    return `${(Math.cos(rad) * radius).toFixed(1)},${(Math.sin(rad) * radius).toFixed(1)}`;
  }

  return (
    <g transform={`translate(${x} ${y})`} aria-hidden="true" pointerEvents="none">
      <circle r={r * 1.08} fill="var(--map-paper)" opacity={0.85} />
      <circle r={r * 0.95} fill="none" stroke="var(--map-ink)" strokeWidth={1} />
      <circle r={r * 0.55} fill="none" stroke="var(--map-ink)" strokeWidth={0.6} />
      {ordinal.map((angle) => (
        <polygon
          key={angle}
          points={`${point(angle, r * 0.6)} ${point(angle + 14, inner * 0.4)} ${point(angle - 14, inner * 0.4)}`}
          fill="var(--map-muted)"
        />
      ))}
      {cardinal.map((angle) => (
        <g key={angle}>
          <polygon
            points={`${point(angle, r)} ${point(angle + 11, inner * 0.45)} ${point(angle - 11, inner * 0.45)}`}
            fill={angle === 0 ? "var(--flag-blue)" : "var(--map-ink)"}
          />
          <polygon
            points={`${point(angle, r)} ${point(angle + 11, inner * 0.45)} ${point(angle, inner * 0.3)}`}
            fill="var(--map-paper)"
            opacity={0.55}
          />
        </g>
      ))}
      <circle r={3.5} fill="var(--gold)" stroke="var(--map-ink)" strokeWidth={0.8} />
      <text y={-r - 10} textAnchor="middle" className="compass-letter">
        N
      </text>
    </g>
  );
}

/** Decorative alternating scale bar. */
export function ScaleBar({ x, y, label, width = 150 }: Point & { label: string; width?: number }) {
  const segment = width / 4;
  return (
    <g transform={`translate(${x} ${y})`} aria-hidden="true" pointerEvents="none">
      <rect x={-6} y={-14} width={width + 12} height={34} rx={4} fill="var(--map-paper)" opacity={0.85} />
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x={i * segment}
          y={0}
          width={segment}
          height={6}
          fill={i % 2 === 0 ? "var(--map-ink)" : "var(--map-paper)"}
          stroke="var(--map-ink)"
          strokeWidth={1}
        />
      ))}
      <text x={0} y={-3} textAnchor="middle" className="scale-text">
        0
      </text>
      <text x={width} y={-3} textAnchor="middle" className="scale-text">
        {label}
      </text>
    </g>
  );
}

/**
 * Shared SVG defs: water, parks, cliff hatching, golden highlight.
 * Included once per map; ids are referenced by both map drawings.
 */
export function MapDefs() {
  return (
    <defs>
      <linearGradient id="water-fill" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#bdd5dc" />
        <stop offset="100%" stopColor="#a9c8d2" />
      </linearGradient>

      <pattern id="water-lines" width="46" height="14" patternUnits="userSpaceOnUse">
        <path
          d="M0,7 q5.75,-4 11.5,0 t11.5,0 t11.5,0 t11.5,0"
          fill="none"
          stroke="#8fb3c0"
          strokeWidth="1"
          opacity="0.5"
        />
      </pattern>

      <pattern id="park-dots" width="26" height="26" patternUnits="userSpaceOnUse">
        <circle cx="6" cy="7" r="1.6" fill="#88a96b" opacity="0.5" />
        <circle cx="19" cy="19" r="1.6" fill="#88a96b" opacity="0.35" />
      </pattern>

      <pattern id="cliff-hatch" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(58)">
        <line x1="0" y1="0" x2="0" y2="9" stroke="#b59a72" strokeWidth="1.7" opacity="0.75" />
      </pattern>

      <pattern id="tidal-flat" width="14" height="8" patternUnits="userSpaceOnUse">
        <line x1="0" y1="4" x2="7" y2="4" stroke="#9fbcc6" strokeWidth="1" opacity="0.6" />
      </pattern>

      <radialGradient id="gold-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#c9a227" stopOpacity="0.32" />
        <stop offset="78%" stopColor="#c9a227" stopOpacity="0.10" />
        <stop offset="100%" stopColor="#c9a227" stopOpacity="0" />
      </radialGradient>

      <filter id="land-shadow" x="-4%" y="-4%" width="108%" height="108%">
        <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="#4e4230" floodOpacity="0.22" />
      </filter>

      <filter id="marker-shadow" x="-60%" y="-60%" width="220%" height="220%">
        <feDropShadow dx="0" dy="1.5" stdDeviation="2" floodColor="#3a3022" floodOpacity="0.4" />
      </filter>
    </defs>
  );
}

/** Numbered Québec autoroute shield (blue crest with fleur-de-lys hint). */
export function HighwayShield({ x, y, number }: Point & { number: string }) {
  return (
    <g transform={`translate(${x} ${y})`} aria-hidden="true" pointerEvents="none">
      <path
        d="M-15,-13 L15,-13 L15,6 Q15,13 0,17 Q-15,13 -15,6 Z"
        fill="var(--flag-blue)"
        stroke="#fbf7ee"
        strokeWidth={1.8}
      />
      <text y={6.5} textAnchor="middle" className="shield-number">
        {number}
      </text>
    </g>
  );
}
