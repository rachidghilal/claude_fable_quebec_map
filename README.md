# Québec · Carte de la Capitale

![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=111)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=fff)
![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?logo=vite&logoColor=fff)
![Carte](https://img.shields.io/badge/carte-SVG%20illustr%C3%A9e-c9a227)
![Langue](https://img.shields.io/badge/langue-fran%C3%A7ais-123a6d)
![Vérification](https://img.shields.io/badge/v%C3%A9rification-playwright%20screenshots-2ea44f)
![License](https://img.shields.io/badge/license-MIT-blue)

Carte interactive illustrée de la ville de Québec, dessinée entièrement en SVG à la manière
d'une carte historique : le fleuve Saint-Laurent, les fortifications, le Château Frontenac,
le Parlement, les autoroutes à écussons et plus de 40 lieux à explorer, chacun avec sa fiche
documentée — histoire, anecdote « Le saviez-vous ? » et conseils de visite.

## Deux niveaux de lecture

| Vue | Contenu |
| --- | --- |
| **Vue d'ensemble** | La région : fleuve, rivière Saint-Charles, île d'Orléans, ponts de Québec et Pierre-Laporte, autoroutes 40/73/440, quartiers, chute Montmorency… avec le Vieux-Québec en médaillon doré cliquable. |
| **Vieux-Québec** | L'arrondissement historique en détail : fortifications et portes, Citadelle en étoile, falaise du cap Diamant hachurée, bâtiments emblématiques dessinés un à un, rues nommées, Petit-Champlain, Vieux-Port. |

## Fonctionnalités

- **Carte SVG sur mesure** : aucune bibliothèque cartographique — chaque trait est dessiné
  (cartouche gravé, rose des vents, échelle, voiliers, traversier en pointillés).
- **42 lieux cliquables** répartis en 8 catégories filtrables : monuments, musées, attractions,
  shopping, gastronomie, parcs & nature, points de vue, transports.
- **Fiches riches en français** : description, contexte historique, anecdote, quartier, durée,
  tarif et conseil de visite.
- **Recherche instantanée** (insensible aux accents) et filtres qui estompent les marqueurs
  hors catégorie.
- **Favoris persistés** en localStorage, incontournables marqués d'un anneau d'or.
- **Navigation fluide** : médaillon doré → zoom sur le Vieux-Québec, bascule d'en-tête,
  bouton retour ; marqueurs accessibles au clavier.
- **Caméra de carte** : zoom molette ou boutons, déplacement par glisser, flèches clavier,
  recentrage, détails cartographiques qui apparaissent seulement en vue rapprochée.
- **Visite express** : parcours guidé des incontournables avec recadrage automatique et barre
  compacte superposée à la carte.
- **Responsive** : bureau, compact et mobile.

## Pile technique

| Couche | Outils |
| --- | --- |
| Application | React 19, TypeScript, Vite |
| Carte | SVG dessiné à la main dans des composants React |
| UI | CSS (tokens « papier » dans `src/styles.css`), icônes Lucide |
| Vérification | Playwright Core + métriques de pixels PNG |

## Structure du projet

```text
.
|-- scripts/
|   `-- verify.mjs            # vérification visuelle Playwright
`-- src/
    |-- App.tsx               # état global, mise en page
    |-- components/
    |   |-- ExplorerRail.tsx  # recherche, filtres, liste des lieux
    |   |-- PlacePanel.tsx    # fiche détaillée du lieu
    |   |-- TourBar.tsx       # barre de visite express
    |   `-- map/
    |       |-- MapStage.tsx      # scène, caméra, transition de vue, légende
    |       |-- useMapCamera.ts   # zoom, pan, focus, reset
    |       |-- CityMap.tsx       # vue d'ensemble de la ville
    |       |-- OldQuebecMap.tsx  # Vieux-Québec détaillé
    |       |-- MapMarker.tsx     # marqueurs et infobulles
    |       `-- MapDecor.tsx      # cartouche, rose des vents, écussons…
    `-- data/
        |-- categories.ts     # 8 catégories (icône + couleur)
        `-- places.ts         # 42 lieux documentés + coordonnées
```

## Démarrer

```bash
npm install
npm run dev        # http://localhost:5173/
npm run build      # build de production (tsc + vite)
npm run verify     # captures desktop/compact/mobile + interactions
```

`npm run verify` lance l'application, capture les trois formats d'écran et les deux vues de
carte, vérifie les interactions (clic marqueur → fiche, médaillon → Vieux-Québec, recherche,
filtres, zoom/pan/reset, détails au zoom, visite express) et contrôle par métriques de pixels
que la carte n'est pas vide. Les captures sont écrites dans `verification/`.

## Note cartographique

La carte est **illustrée et stylisée** : les relations spatiales sont respectées (rives,
ponts, quartiers, tracés des autoroutes) mais les distances et les géométries sont
volontairement simplifiées, comme sur un plan touristique dessiné.

## Licence

Code sous licence MIT. Le texte de licence fourni dans `LICENSE` est en français.
