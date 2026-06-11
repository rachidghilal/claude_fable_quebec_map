import { useRef, useState, type KeyboardEvent, type PointerEvent, type WheelEvent } from "react";
import { ArrowLeft, ListTree, Minus, Play, Plus, RotateCcw, X } from "lucide-react";
import { TourBar } from "../TourBar";
import { categories } from "../../data/categories";
import type { MapId } from "../../data/places";
import { CityMap } from "./CityMap";
import { OldQuebecMap } from "./OldQuebecMap";
import type { MapPoint, MapViewProps } from "./types";

type MapStageProps = MapViewProps & {
  view: MapId;
  onChangeView: (view: MapId) => void;
  tourIndex: number | null;
  tourTotal: number;
  tourPlaceName: string | null;
  onStartTour: () => void;
  onTourPrevious: () => void;
  onTourNext: () => void;
  onCloseTour: () => void;
};

/**
 * Scène centrale : affiche la vue active avec une transition de zoom,
 * et superpose la légende des catégories.
 */
export function MapStage({
  view,
  onChangeView,
  tourIndex,
  tourTotal,
  tourPlaceName,
  onStartTour,
  onTourPrevious,
  onTourNext,
  onCloseTour,
  ...mapProps
}: MapStageProps) {
  const [legendOpen, setLegendOpen] = useState(false);
  const [dragging, setDragging] = useState(false);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef<{ pointerId: number; x: number; y: number } | null>(null);
  const { camera } = mapProps;

  function clientToMapPoint(clientX: number, clientY: number): MapPoint {
    const svg = stageRef.current?.querySelector(".map-svg");
    const rect = svg?.getBoundingClientRect();
    if (!rect) {
      return { x: camera.dimensions.width / 2, y: camera.dimensions.height / 2 };
    }

    return {
      x: ((clientX - rect.left) / rect.width) * camera.dimensions.width,
      y: ((clientY - rect.top) / rect.height) * camera.dimensions.height,
    };
  }

  function handleWheel(event: WheelEvent<HTMLDivElement>) {
    event.preventDefault();
    const factor = event.deltaY > 0 ? 0.88 : 1.14;
    camera.zoomAt(clientToMapPoint(event.clientX, event.clientY), factor);
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (!event.isPrimary || event.button !== 0) {
      return;
    }

    const target = event.target instanceof Element ? event.target : null;
    if (
      target?.closest(
        ".map-marker, .old-quebec-medallion, .map-camera-controls, .map-legend, .map-back-button, .tour-start-button, .tour-bar",
      )
    ) {
      return;
    }

    event.currentTarget.focus();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = { pointerId: event.pointerId, x: event.clientX, y: event.clientY };
    setDragging(true);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) {
      return;
    }

    const svg = stageRef.current?.querySelector(".map-svg");
    const rect = svg?.getBoundingClientRect();
    if (!rect) {
      return;
    }

    const dx = ((event.clientX - drag.x) / rect.width) * camera.dimensions.width;
    const dy = ((event.clientY - drag.y) / rect.height) * camera.dimensions.height;
    camera.panBy(dx, dy);
    dragRef.current = { ...drag, x: event.clientX, y: event.clientY };
  }

  function stopDragging(event: PointerEvent<HTMLDivElement>) {
    if (dragRef.current?.pointerId === event.pointerId) {
      dragRef.current = null;
      setDragging(false);
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget) {
      return;
    }

    const center = { x: camera.dimensions.width / 2, y: camera.dimensions.height / 2 };
    const step = 82;

    if (event.key === "+" || event.key === "=") {
      event.preventDefault();
      camera.zoomAt(center, 1.18);
    } else if (event.key === "-" || event.key === "_") {
      event.preventDefault();
      camera.zoomAt(center, 0.84);
    } else if (event.key === "0") {
      event.preventDefault();
      camera.reset();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      camera.panBy(step, 0);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      camera.panBy(-step, 0);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      camera.panBy(0, step);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      camera.panBy(0, -step);
    }
  }

  return (
    <div
      ref={stageRef}
      className={`map-stage ${dragging ? "is-dragging" : ""}`}
      data-zoom={camera.state.k >= 1.8 ? "detail" : "base"}
      tabIndex={0}
      role="region"
      aria-label="Carte interactive"
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
      onKeyDown={handleKeyDown}
    >
      {(view === "oldQuebec" || tourIndex === null) && (
        <div className="map-stage-toolbar">
          {view === "oldQuebec" ? (
            <button type="button" className="map-back-button" onClick={() => onChangeView("city")}>
              <ArrowLeft size={16} />
              Vue d'ensemble
            </button>
          ) : (
            <span aria-hidden="true" />
          )}

          {tourIndex === null && (
            <button type="button" className="tour-start-button" onClick={onStartTour}>
              <Play size={15} fill="currentColor" aria-hidden="true" />
              Visite express
            </button>
          )}
        </div>
      )}

      <div className={`map-stage-inner view-${view}`} key={view}>
        {view === "city" ? (
          <CityMap {...mapProps} onEnterOldQuebec={() => onChangeView("oldQuebec")} />
        ) : (
          <OldQuebecMap {...mapProps} />
        )}
      </div>

      <div className="map-camera-controls" aria-label="Contrôles de la carte">
        <button
          type="button"
          onClick={() => camera.zoomAt({ x: camera.dimensions.width / 2, y: camera.dimensions.height / 2 }, 1.22)}
          aria-label="Zoomer"
        >
          <Plus size={17} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => camera.zoomAt({ x: camera.dimensions.width / 2, y: camera.dimensions.height / 2 }, 0.82)}
          aria-label="Dézoomer"
        >
          <Minus size={17} aria-hidden="true" />
        </button>
        <button type="button" onClick={camera.reset} disabled={!camera.canReset} aria-label="Recentrer">
          <RotateCcw size={16} aria-hidden="true" />
        </button>
      </div>

      {tourIndex !== null &&
        tourPlaceName && (
          <TourBar
            index={tourIndex}
            total={tourTotal}
            placeName={tourPlaceName}
            onPrevious={onTourPrevious}
            onNext={onTourNext}
            onClose={onCloseTour}
          />
        )}

      <div className={`map-legend ${legendOpen ? "is-open" : ""}`}>
        <button
          type="button"
          className="legend-toggle"
          onClick={() => setLegendOpen((open) => !open)}
          aria-expanded={legendOpen}
        >
          {legendOpen ? <X size={16} /> : <ListTree size={16} />}
          Légende
        </button>
        {legendOpen && (
          <ul className="legend-list">
            {categories.map((category) => (
              <li key={category.id}>
                <span className="legend-dot" style={{ background: category.color }}>
                  <category.Icon size={11} color="#fbf7ee" strokeWidth={2.4} />
                </span>
                {category.label}
              </li>
            ))}
            <li className="legend-essential">
              <span className="legend-ring" />
              Incontournable
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
