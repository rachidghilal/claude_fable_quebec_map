import { useCallback, useEffect, useMemo, useState } from "react";
import type { MapId } from "../../data/places";
import { MAP_DIMENSIONS, type MapCameraState, type MapDimensions, type MapPoint } from "./types";

const MIN_ZOOM = 1;
const MAX_ZOOM = 3;

function initialCamera(dimensions: MapDimensions): MapCameraState {
  return {
    k: MIN_ZOOM,
    cx: dimensions.width / 2,
    cy: dimensions.height / 2,
  };
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function clampCamera(camera: MapCameraState, dimensions: MapDimensions): MapCameraState {
  const k = clamp(camera.k, MIN_ZOOM, MAX_ZOOM);
  const halfWidth = dimensions.width / (2 * k);
  const halfHeight = dimensions.height / (2 * k);

  return {
    k,
    cx: clamp(camera.cx, halfWidth, dimensions.width - halfWidth),
    cy: clamp(camera.cy, halfHeight, dimensions.height - halfHeight),
  };
}

export function useMapCamera(view: MapId) {
  const dimensions = MAP_DIMENSIONS[view];
  const [state, setState] = useState<MapCameraState>(() => initialCamera(dimensions));

  useEffect(() => {
    setState(initialCamera(dimensions));
  }, [dimensions]);

  const reset = useCallback(() => {
    setState(initialCamera(dimensions));
  }, [dimensions]);

  const zoomAt = useCallback(
    (point: MapPoint, factor: number) => {
      setState((current) => {
        const nextK = clamp(current.k * factor, MIN_ZOOM, MAX_ZOOM);
        const worldX = current.cx + (point.x - dimensions.width / 2) / current.k;
        const worldY = current.cy + (point.y - dimensions.height / 2) / current.k;

        return clampCamera(
          {
            k: nextK,
            cx: worldX - (point.x - dimensions.width / 2) / nextK,
            cy: worldY - (point.y - dimensions.height / 2) / nextK,
          },
          dimensions,
        );
      });
    },
    [dimensions],
  );

  const panBy = useCallback(
    (dx: number, dy: number) => {
      setState((current) =>
        clampCamera(
          {
            ...current,
            cx: current.cx - dx / current.k,
            cy: current.cy - dy / current.k,
          },
          dimensions,
        ),
      );
    },
    [dimensions],
  );

  const focusOn = useCallback(
    (point: MapPoint, k = 1.9) => {
      setState(clampCamera({ k, cx: point.x, cy: point.y }, dimensions));
    },
    [dimensions],
  );

  return useMemo(() => {
    const tx = dimensions.width / 2 - state.k * state.cx;
    const ty = dimensions.height / 2 - state.k * state.cy;

    return {
      state,
      dimensions,
      worldTransform: `translate(${tx} ${ty}) scale(${state.k})`,
      canReset: Math.abs(state.k - MIN_ZOOM) > 0.01,
      zoomAt,
      panBy,
      focusOn,
      reset,
    };
  }, [dimensions, focusOn, panBy, reset, state, zoomAt]);
}
