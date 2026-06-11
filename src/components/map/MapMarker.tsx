import type { KeyboardEvent } from "react";
import { getCategory } from "../../data/categories";
import type { MapId, Place } from "../../data/places";

export type LabelTweak = {
  x?: number;
  y?: number;
  anchor?: "start" | "middle" | "end";
};

type MapMarkerProps = {
  place: Place;
  mapId: MapId;
  selected: boolean;
  dimmed: boolean;
  favorite: boolean;
  zoom: number;
  labelTweak?: LabelTweak;
  onSelect: (id: string, source?: "map") => void;
  onHover: (id: string | null) => void;
};

export function MapMarker({ place, mapId, selected, dimmed, favorite, zoom, labelTweak, onSelect, onHover }: MapMarkerProps) {
  const point = place[mapId];
  if (!point) {
    return null;
  }

  const category = getCategory(place.category);
  const radius = selected ? 19 : 15;
  const markerScale = 1 / Math.sqrt(zoom);
  // Sur la vue d'ensemble, le pourtour du Vieux-Québec est trop dense pour des
  // étiquettes permanentes : on n'y étiquette que les incontournables hors médaillon.
  const showLabel = place.essential && (mapId === "oldQuebec" || place.oldQuebec === undefined);

  function handleKeyDown(event: KeyboardEvent<SVGGElement>) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect(place.id);
    }
  }

  return (
    <g
      className={`map-marker ${selected ? "is-selected" : ""} ${dimmed ? "is-dimmed" : ""}`}
      transform={`translate(${point.x} ${point.y})`}
      role="button"
      tabIndex={0}
      aria-label={`${place.name} — ${category.label}`}
      aria-pressed={selected}
      onClick={() => onSelect(place.id, "map")}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => onHover(place.id)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(place.id)}
      onBlur={() => onHover(null)}
    >
      <g className="marker-scale" transform={`scale(${markerScale})`}>
        {selected && <circle className="marker-pulse" r={radius + 9} fill="none" stroke={category.color} strokeWidth={2} />}
        {place.essential && (
          <circle r={radius + 4} fill="none" stroke="var(--gold)" strokeWidth={2.4} opacity={dimmed ? 0.4 : 0.95} />
        )}
        <circle
          className="marker-core"
          r={radius}
          fill={category.color}
          stroke="#fbf7ee"
          strokeWidth={2.4}
          filter="url(#marker-shadow)"
        />
        <category.Icon
          x={-radius * 0.58}
          y={-radius * 0.58}
          width={radius * 1.16}
          height={radius * 1.16}
          color="#fbf7ee"
          strokeWidth={2.2}
          aria-hidden="true"
          focusable="false"
          pointerEvents="none"
        />
        {favorite && (
          <circle cx={radius * 0.85} cy={-radius * 0.85} r={5} fill="var(--gold)" stroke="#fbf7ee" strokeWidth={1.4} />
        )}
        {showLabel && (
          <text
            x={labelTweak?.x ?? 0}
            y={labelTweak?.y ?? radius + 21}
            textAnchor={labelTweak?.anchor ?? "middle"}
            className="marker-label"
            pointerEvents="none"
          >
            {place.name}
          </text>
        )}
      </g>
    </g>
  );
}

type MarkerTooltipProps = {
  place: Place | null;
  mapId: MapId;
  viewWidth: number;
  zoom: number;
};

/** Single floating tooltip, rendered above all markers by the map. */
export function MarkerTooltip({ place, mapId, viewWidth, zoom }: MarkerTooltipProps) {
  const point = place?.[mapId];
  if (!place || !point) {
    return null;
  }

  const category = getCategory(place.category);
  const label = place.name;
  const tooltipScale = 1 / Math.sqrt(zoom);
  const width = Math.max(120, label.length * 11.4 + 34);
  const left = Math.min(Math.max(point.x - width / 2, 28), viewWidth - width - 28);
  const above = point.y > 110;
  const top = above ? point.y - 72 : point.y + 34;

  return (
    <g
      className="marker-tooltip"
      transform={`translate(${point.x} ${point.y}) scale(${tooltipScale}) translate(${-point.x} ${-point.y})`}
      pointerEvents="none"
      aria-hidden="true"
    >
      <rect x={left} y={top} width={width} height={40} rx={9} fill="#2e271c" opacity={0.93} />
      {above ? (
        <polygon
          points={`${point.x - 7},${top + 40} ${point.x + 7},${top + 40} ${point.x},${top + 49}`}
          fill="#2e271c"
          opacity={0.93}
        />
      ) : (
        <polygon
          points={`${point.x - 7},${top} ${point.x + 7},${top} ${point.x},${top - 9}`}
          fill="#2e271c"
          opacity={0.93}
        />
      )}
      <circle cx={left + 18} cy={top + 20} r={5.5} fill={category.color} />
      <text x={left + 32} y={top + 27} className="tooltip-text">
        {label}
      </text>
    </g>
  );
}
