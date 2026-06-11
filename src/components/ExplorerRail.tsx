import { Search, Star } from "lucide-react";
import { categories, getCategory, type CategoryId } from "../data/categories";
import type { Place } from "../data/places";

type ExplorerRailProps = {
  query: string;
  activeCategories: Set<CategoryId>;
  results: Place[];
  countsByCategory: Map<CategoryId, number>;
  selectedId: string | null;
  favorites: Set<string>;
  onQueryChange: (query: string) => void;
  onToggleCategory: (id: CategoryId) => void;
  onSelect: (id: string) => void;
  onToggleFavorite: (id: string) => void;
};

/** Rail gauche : recherche, filtres par catégorie et liste des lieux. */
export function ExplorerRail({
  query,
  activeCategories,
  results,
  countsByCategory,
  selectedId,
  favorites,
  onQueryChange,
  onToggleCategory,
  onSelect,
  onToggleFavorite,
}: ExplorerRailProps) {
  return (
    <aside className="left-rail">
      <section className="panel explorer-panel">
        <label className="search-field">
          <Search size={17} aria-hidden="true" />
          <input
            type="search"
            placeholder="Chercher un lieu…"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            aria-label="Chercher un lieu"
          />
        </label>

        <div className="category-chips" role="group" aria-label="Filtrer par catégorie">
          {categories.map((category) => {
            const active = activeCategories.has(category.id);
            return (
              <button
                key={category.id}
                type="button"
                className={`category-chip ${active ? "is-active" : ""}`}
                style={{ "--chip": category.color, "--chip-soft": category.colorSoft } as React.CSSProperties}
                onClick={() => onToggleCategory(category.id)}
                aria-pressed={active}
              >
                <category.Icon size={14} aria-hidden="true" />
                <span>{category.label}</span>
                <em>{countsByCategory.get(category.id) ?? 0}</em>
              </button>
            );
          })}
        </div>
      </section>

      <section className="panel place-list-panel">
        <div className="panel-heading">
          <span>Lieux à explorer</span>
          <em>{results.length}</em>
        </div>

        <div className="place-list">
          {results.length === 0 && <p className="empty-list">Aucun lieu ne correspond à votre recherche.</p>}
          {results.map((place) => {
            const category = getCategory(place.category);
            const selected = selectedId === place.id;
            return (
              <div key={place.id} className={`place-row ${selected ? "is-active" : ""}`}>
                <button type="button" className="place-row-main" onClick={() => onSelect(place.id)}>
                  <span className="place-dot" style={{ background: category.color }}>
                    <category.Icon size={13} color="#fbf7ee" strokeWidth={2.4} aria-hidden="true" />
                  </span>
                  <span className="place-row-copy">
                    <strong>
                      {place.name}
                      {place.essential && <i className="essential-mark" title="Incontournable">★</i>}
                    </strong>
                    <span>{place.practical.neighborhood}</span>
                  </span>
                </button>
                <button
                  type="button"
                  className={`favorite-button ${favorites.has(place.id) ? "is-on" : ""}`}
                  onClick={() => onToggleFavorite(place.id)}
                  aria-label={
                    favorites.has(place.id)
                      ? `Retirer ${place.name} des favoris`
                      : `Ajouter ${place.name} aux favoris`
                  }
                >
                  <Star size={16} fill={favorites.has(place.id) ? "currentColor" : "none"} />
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </aside>
  );
}
