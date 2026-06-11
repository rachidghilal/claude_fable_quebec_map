import { useEffect, useMemo, useState } from "react";
import { Building2, Map as MapIcon } from "lucide-react";
import { ExplorerRail } from "./components/ExplorerRail";
import { PlacePanel } from "./components/PlacePanel";
import { MapStage } from "./components/map/MapStage";
import { FleurDeLys } from "./components/map/MapDecor";
import { useMapCamera } from "./components/map/useMapCamera";
import type { CategoryId } from "./data/categories";
import { getPlaceById, places, placesForMap, TOUR_STEPS, type MapId, type Place } from "./data/places";
import type { SelectSource } from "./components/map/types";

const FAVORITES_KEY = "quebec-carte-favoris";

function normalize(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function loadFavorites(): Set<string> {
  try {
    const raw = window.localStorage.getItem(FAVORITES_KEY);
    if (!raw) {
      return new Set();
    }
    const ids: unknown = JSON.parse(raw);
    if (!Array.isArray(ids)) {
      return new Set();
    }
    const known = new Set(places.map((place) => place.id));
    return new Set(ids.filter((id): id is string => typeof id === "string" && known.has(id)));
  } catch {
    return new Set();
  }
}

export default function App() {
  const [view, setView] = useState<MapId>("city");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [activeCategories, setActiveCategories] = useState<Set<CategoryId>>(() => new Set());
  const [favorites, setFavorites] = useState<Set<string>>(loadFavorites);
  const [pendingFocus, setPendingFocus] = useState<{ id: string; k: number } | null>(null);
  const [tourIndex, setTourIndex] = useState<number | null>(null);
  const camera = useMapCamera(view);

  useEffect(() => {
    window.localStorage.setItem(FAVORITES_KEY, JSON.stringify([...favorites]));
  }, [favorites]);

  useEffect(() => {
    if (tourIndex === null) {
      return;
    }

    function handleEscape(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") {
        setTourIndex(null);
      }
    }

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [tourIndex]);

  const filtersActive = query.trim() !== "" || activeCategories.size > 0;

  const matches = useMemo(() => {
    const needle = normalize(query.trim());
    return (place: Place): boolean => {
      if (activeCategories.size > 0 && !activeCategories.has(place.category)) {
        return false;
      }
      if (needle === "") {
        return true;
      }
      const haystack = normalize(`${place.name} ${place.tagline} ${place.practical.neighborhood}`);
      return haystack.includes(needle);
    };
  }, [query, activeCategories]);

  const results = useMemo(() => {
    const filtered = places.filter(matches);
    return filtered.sort((a, b) => {
      if (Boolean(a.essential) !== Boolean(b.essential)) {
        return a.essential ? -1 : 1;
      }
      return a.name.localeCompare(b.name, "fr");
    });
  }, [matches]);

  const countsByCategory = useMemo(() => {
    const counts = new Map<CategoryId, number>();
    for (const place of places) {
      counts.set(place.category, (counts.get(place.category) ?? 0) + 1);
    }
    return counts;
  }, []);

  const viewPlaces = useMemo(() => placesForMap(view), [view]);

  const dimmedIds = useMemo(() => {
    if (!filtersActive) {
      return new Set<string>();
    }
    return new Set(viewPlaces.filter((place) => place.id !== selectedId && !matches(place)).map((place) => place.id));
  }, [filtersActive, selectedId, viewPlaces, matches]);

  const selectedPlace = useMemo(
    () => places.find((place) => place.id === selectedId) ?? null,
    [selectedId],
  );

  const essentials = useMemo(() => places.filter((place) => place.essential), []);
  const tourPlace = useMemo(() => (tourIndex === null ? null : getPlaceById(TOUR_STEPS[tourIndex])), [tourIndex]);

  useEffect(() => {
    if (!pendingFocus) {
      return;
    }

    const place = places.find((item) => item.id === pendingFocus.id);
    const point = place?.[view];
    if (!point) {
      return;
    }

    camera.focusOn(point, pendingFocus.k);
    setPendingFocus(null);
  }, [camera, pendingFocus, view]);

  function selectPlace(id: string, source: SelectSource = "list") {
    const place = places.find((item) => item.id === id);
    if (!place) {
      return;
    }
    const nextView = place[view] ? view : place.oldQuebec ? "oldQuebec" : "city";

    if (source !== "tour") {
      setTourIndex(null);
    }
    setSelectedId(id);
    if (source !== "map") {
      setPendingFocus({ id, k: source === "tour" ? 2.05 : Math.max(camera.state.k, 1.8) });
    }
    if (nextView !== view) {
      setView(nextView);
    }
  }

  function changeView(nextView: MapId) {
    setTourIndex(null);
    setView(nextView);
  }

  function goToTourStep(index: number) {
    const nextIndex = Math.min(Math.max(index, 0), TOUR_STEPS.length - 1);
    setTourIndex(nextIndex);
    selectPlace(TOUR_STEPS[nextIndex], "tour");
  }

  function startTour() {
    setQuery("");
    setActiveCategories(new Set());
    goToTourStep(0);
  }

  function previousTourStep() {
    if (tourIndex !== null) {
      goToTourStep(tourIndex - 1);
    }
  }

  function nextTourStep() {
    if (tourIndex === null || tourIndex === TOUR_STEPS.length - 1) {
      setTourIndex(null);
      return;
    }
    goToTourStep(tourIndex + 1);
  }

  function toggleCategory(id: CategoryId) {
    setActiveCategories((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  function toggleFavorite(id: string) {
    setFavorites((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-block">
          <span className="brand-orb" aria-hidden="true">
            <svg viewBox="-34 -42 68 84" width="30" height="36">
              <FleurDeLys x={0} y={0} size={62} color="#fbf7ee" />
            </svg>
          </span>
          <div>
            <h1>Québec · Carte de la Capitale</h1>
            <p>Découvrir la capitale nationale, du fleuve aux fortifications</p>
          </div>
        </div>

        <div className="view-switch" role="group" aria-label="Choisir la vue">
          <button
            type="button"
            className={view === "city" ? "is-active" : ""}
            onClick={() => changeView("city")}
          >
            <MapIcon size={16} aria-hidden="true" />
            Vue d'ensemble
          </button>
          <button
            type="button"
            className={view === "oldQuebec" ? "is-active" : ""}
            onClick={() => changeView("oldQuebec")}
          >
            <Building2 size={16} aria-hidden="true" />
            Vieux-Québec
          </button>
        </div>

        <div className="topbar-stats">
          <strong>{places.length}</strong> lieux à explorer · <strong>{favorites.size}</strong> favoris
        </div>
      </header>

      <div className="app-grid">
        <ExplorerRail
          query={query}
          activeCategories={activeCategories}
          results={results}
          countsByCategory={countsByCategory}
          selectedId={selectedId}
          favorites={favorites}
          onQueryChange={setQuery}
          onToggleCategory={toggleCategory}
          onSelect={selectPlace}
          onToggleFavorite={toggleFavorite}
        />

        <main className="stage-column">
          <MapStage
            view={view}
            onChangeView={changeView}
            places={viewPlaces}
            selectedId={selectedId}
            hoveredId={hoveredId}
            dimmedIds={dimmedIds}
            favorites={favorites}
            camera={camera}
            tourIndex={tourIndex}
            tourTotal={TOUR_STEPS.length}
            tourPlaceName={tourPlace?.name ?? null}
            onStartTour={startTour}
            onTourPrevious={previousTourStep}
            onTourNext={nextTourStep}
            onCloseTour={() => setTourIndex(null)}
            onSelect={selectPlace}
            onHover={setHoveredId}
          />
          <p className="map-footnote">
            Carte illustrée — tracés simplifiés, repères vérifiés avec données RTC, OSM et sources publiques.
          </p>
        </main>

        <PlacePanel
          place={selectedPlace}
          essentials={essentials}
          favorites={favorites}
          onSelect={selectPlace}
          onToggleFavorite={toggleFavorite}
        />
      </div>
    </div>
  );
}
