import { Clock, Compass, Heart, Lightbulb, MapPin, ScrollText, Sparkles, Ticket } from "lucide-react";
import { getCategory } from "../data/categories";
import type { Place } from "../data/places";

type PlacePanelProps = {
  place: Place | null;
  essentials: Place[];
  favorites: Set<string>;
  onSelect: (id: string) => void;
  onToggleFavorite: (id: string) => void;
};

/** Rail droit : fiche détaillée du lieu sélectionné, ou invitation à explorer. */
export function PlacePanel({ place, essentials, favorites, onSelect, onToggleFavorite }: PlacePanelProps) {
  if (!place) {
    return (
      <aside className="right-rail">
        <section className="panel place-panel place-panel-empty">
          <div className="empty-state">
            <span className="empty-orb" aria-hidden="true">
              <Compass size={30} />
            </span>
            <h3>Explorez la capitale</h3>
            <p>
              Cliquez un repère sur la carte ou un lieu dans la liste pour découvrir son histoire, ses anecdotes et
              les conseils de visite.
            </p>
          </div>

          <div className="essentials-block">
            <div className="panel-heading">
              <span>Les incontournables</span>
            </div>
            <ul className="essentials-list">
              {essentials.map((essential) => {
                const category = getCategory(essential.category);
                return (
                  <li key={essential.id}>
                    <button type="button" onClick={() => onSelect(essential.id)}>
                      <span className="place-dot" style={{ background: category.color }}>
                        <category.Icon size={13} color="#fbf7ee" strokeWidth={2.4} aria-hidden="true" />
                      </span>
                      <span>
                        <strong>{essential.name}</strong>
                        <em>{essential.tagline}</em>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      </aside>
    );
  }

  const category = getCategory(place.category);
  const favorite = favorites.has(place.id);

  return (
    <aside className="right-rail">
      <section className="panel place-panel" style={{ "--accent": category.color, "--accent-soft": category.colorSoft } as React.CSSProperties}>
        <header className="place-head">
          <span className="place-category-chip">
            <category.Icon size={13} aria-hidden="true" />
            {category.label}
          </span>
          <button
            type="button"
            className={`favorite-button large ${favorite ? "is-on" : ""}`}
            onClick={() => onToggleFavorite(place.id)}
            aria-label={favorite ? "Retirer des favoris" : "Ajouter aux favoris"}
          >
            <Heart size={20} fill={favorite ? "currentColor" : "none"} />
          </button>
        </header>

        <h2>
          {place.name}
          {place.essential && <span className="essential-badge">★ Incontournable</span>}
        </h2>
        <p className="place-tagline">{place.tagline}</p>
        <p className="place-description">{place.description}</p>

        <div className="history-block">
          <h4>
            <ScrollText size={15} aria-hidden="true" />
            Un peu d'histoire
          </h4>
          <p>{place.history}</p>
        </div>

        <div className="fun-fact">
          <Sparkles size={16} aria-hidden="true" />
          <p>
            <strong>Le saviez-vous ?</strong> {place.funFact}
          </p>
        </div>

        <dl className="practical-grid">
          <div>
            <dt>
              <MapPin size={13} aria-hidden="true" /> Quartier
            </dt>
            <dd>{place.practical.neighborhood}</dd>
          </div>
          <div>
            <dt>
              <Clock size={13} aria-hidden="true" /> Durée
            </dt>
            <dd>{place.practical.duration}</dd>
          </div>
          <div>
            <dt>
              <Ticket size={13} aria-hidden="true" /> Tarif
            </dt>
            <dd>{place.practical.price}</dd>
          </div>
        </dl>

        <div className="tip-block">
          <Lightbulb size={15} aria-hidden="true" />
          <p>{place.practical.tip}</p>
        </div>
      </section>
    </aside>
  );
}
