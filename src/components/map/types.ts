import type { Place } from "../../data/places";

export const MAP_DIMENSIONS = {
  city: { width: 1600, height: 1000 },
  oldQuebec: { width: 1400, height: 950 },
} as const;

export type MapDimensions = {
  width: number;
  height: number;
};

export type MapPoint = {
  x: number;
  y: number;
};

export type MapCameraState = {
  k: number;
  cx: number;
  cy: number;
};

export type MapCamera = {
  state: MapCameraState;
  dimensions: MapDimensions;
  worldTransform: string;
  canReset: boolean;
  zoomAt: (point: MapPoint, factor: number) => void;
  panBy: (dx: number, dy: number) => void;
  focusOn: (point: MapPoint, k?: number) => void;
  reset: () => void;
};

export type SelectSource = "map" | "list" | "tour";

export type MapViewProps = {
  places: Place[];
  selectedId: string | null;
  hoveredId: string | null;
  dimmedIds: Set<string>;
  favorites: Set<string>;
  camera: MapCamera;
  onSelect: (id: string, source?: SelectSource) => void;
  onHover: (id: string | null) => void;
};
