import { MapMarker, MarkerTooltip } from "./MapMarker";
import { Cartouche, CompassRose, HighwayShield, MapDefs, MapFrame, ScaleBar } from "./MapDecor";
import { MAP_DIMENSIONS, type MapViewProps } from "./types";

const { width: VIEW_WIDTH, height: VIEW_HEIGHT } = MAP_DIMENSIONS.city;

type CityMapProps = MapViewProps & {
  onEnterOldQuebec: () => void;
};

/**
 * Vue d'ensemble stylisée de la région de Québec : fleuve, rivière
 * Saint-Charles, île d'Orléans, ponts, autoroutes et grands repères.
 * Géographie volontairement simplifiée, relations spatiales préservées.
 */
export function CityMap({
  places,
  selectedId,
  hoveredId,
  dimmedIds,
  favorites,
  camera,
  onSelect,
  onHover,
  onEnterOldQuebec,
}: CityMapProps) {
  const hoveredPlace = places.find((place) => place.id === hoveredId) ?? null;

  return (
    <svg
      className="map-svg city-map"
      viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
      role="group"
      aria-label="Carte de la ville de Québec"
    >
      <MapDefs />

      <g className="map-world" transform={camera.worldTransform}>
      {/* ——— Eau de fond ——— */}
      <rect width={VIEW_WIDTH} height={VIEW_HEIGHT} fill="url(#water-fill)" />
      <rect width={VIEW_WIDTH} height={VIEW_HEIGHT} fill="url(#water-lines)" />

      {/* ——— Rive nord (Québec) ——— */}
      <g filter="url(#land-shadow)">
        <path
          d="M0,0 L1600,0 L1600,300
             C1500,315 1400,340 1320,365
             C1240,392 1150,455 1080,490
             C1052,503 1022,510 996,506
             C1014,536 1012,576 982,608
             C952,638 906,628 872,602
             C852,586 830,580 800,584
             C740,590 700,600 600,615
             C480,633 250,665 120,678
             L0,690 Z"
          fill="var(--map-land)"
          stroke="var(--map-shoreline)"
          strokeWidth={2.5}
        />
      </g>

      {/* ——— Rive sud (Lévis) ——— */}
      <g filter="url(#land-shadow)">
        <path
          d="M0,1000 L1600,1000 L1600,545
             C1450,575 1300,610 1100,665
             C950,705 800,745 600,790
             C400,825 200,845 0,860 Z"
          fill="var(--map-land-low)"
          stroke="var(--map-shoreline)"
          strokeWidth={2.5}
        />
      </g>

      {/* ——— Île d'Orléans ——— */}
      <g filter="url(#land-shadow)">
        <path
          d="M1295,450
             C1360,408 1460,382 1600,360
             L1600,452
             C1480,472 1370,482 1295,450 Z"
          fill="#e3e8c8"
          stroke="var(--map-shoreline)"
          strokeWidth={2.2}
        />
      </g>
      <text x={1448} y={400} className="map-water-label" textAnchor="middle" transform="rotate(-7 1448 400)">
        Île d'Orléans
      </text>

      {/* ——— Rivière Saint-Charles ——— */}
      <path
        d="M120,55 C160,140 220,210 330,265 C440,318 540,355 620,395
           C700,432 800,450 880,470 C920,480 948,492 968,508"
        fill="none"
        stroke="var(--map-shoreline)"
        strokeWidth={18}
        strokeLinecap="round"
      />
      <path
        d="M120,55 C160,140 220,210 330,265 C440,318 540,355 620,395
           C700,432 800,450 880,470 C920,480 948,492 968,508"
        fill="none"
        stroke="url(#water-fill)"
        strokeWidth={13}
        strokeLinecap="round"
      />
      <text x={355} y={252} className="map-river-label" transform="rotate(24 355 252)">
        Rivière Saint-Charles
      </text>

      {/* ——— Contreforts des Laurentides ——— */}
      <g className="map-hills" aria-hidden="true">
        {[80, 230, 420, 600, 1020, 1180, 1360, 1520].map((x, i) => {
          const y = 52 + (i % 3) * 14;
          return (
            <path
              key={x}
              d={`M${x - 38},${y + 26} Q${x},${y - 18} ${x + 38},${y + 26}`}
              fill="none"
              stroke="var(--map-relief)"
              strokeWidth={2.4}
            />
          );
        })}
      </g>

      {/* ——— Parcs et espaces verts ——— */}
      <g stroke="var(--map-park-line)" strokeWidth={1.4}>
        {/* Plaines d'Abraham */}
        <path d="M830,560 C865,548 900,552 915,568 C922,582 912,600 885,608 C855,615 828,605 820,588 C816,574 820,566 830,560 Z" fill="var(--map-park)" />
        {/* Campus de l'Université Laval */}
        <path d="M340,495 C390,482 440,485 455,505 C462,525 440,545 400,548 C360,550 330,535 328,515 C328,505 332,499 340,495 Z" fill="var(--map-park)" />
        {/* Domaine de Maizerets */}
        <path d="M965,378 C1000,368 1035,375 1042,395 C1046,412 1025,428 995,428 C968,427 950,412 952,395 C953,387 958,381 965,378 Z" fill="var(--map-park)" />
        {/* Parc de la Chute-Montmorency */}
        <path d="M1255,300 C1290,290 1320,296 1330,315 C1336,332 1320,348 1292,350 C1266,351 1248,338 1248,320 C1248,311 1250,304 1255,300 Z" fill="var(--map-park)" />
        {/* Promenade Samuel-De Champlain (ruban riverain) */}
        <path d="M305,643 C420,622 540,612 655,597 L660,610 C545,625 425,635 310,658 Z" fill="var(--map-park)" />
        {/* Bois-de-Coulonge / Sillery */}
        <path d="M540,615 C575,605 610,608 618,624 C622,638 602,650 575,650 C550,649 532,637 534,625 Z" fill="var(--map-park)" />
      </g>
      <rect x={822} y={552} width={96} height={58} fill="url(#park-dots)" opacity={0.9} pointerEvents="none" />

      {/* Plage de la baie de Beauport */}
      <path d="M1090,455 C1115,442 1145,438 1162,448 C1150,462 1120,470 1098,466 Z" fill="#ead9a6" stroke="#cdb87e" strokeWidth={1.2} />

      {/* ——— Autoroutes ——— */}
      <g fill="none" strokeLinecap="round">
        {/* A-40 Félix-Leclerc */}
        <path d="M0,365 C250,335 500,295 750,262 C950,236 1080,240 1240,356" stroke="var(--map-hwy-edge)" strokeWidth={11} />
        <path d="M0,365 C250,335 500,295 750,262 C950,236 1080,240 1240,356" stroke="var(--map-hwy)" strokeWidth={7} />
        {/* A-73 Henri-IV / Laurentienne */}
        <path d="M186,920 C190,860 193,800 197,742 C202,690 208,650 216,612 C232,520 262,420 290,330 C308,268 318,160 320,40" stroke="var(--map-hwy-edge)" strokeWidth={11} />
        <path d="M186,920 C190,860 193,800 197,742 C202,690 208,650 216,612 C232,520 262,420 290,330 C308,268 318,160 320,40" stroke="var(--map-hwy)" strokeWidth={7} />
        {/* A-440 Charest */}
        <path d="M40,545 C250,520 450,495 650,470 C730,460 810,462 885,462" stroke="var(--map-hwy-edge)" strokeWidth={10} />
        <path d="M40,545 C250,520 450,495 650,470 C730,460 810,462 885,462" stroke="var(--map-hwy)" strokeWidth={6} />
        {/* A-440 Dufferin-Montmorency */}
        <path d="M1030,448 C1090,425 1160,400 1240,360 C1330,318 1480,295 1600,283" stroke="var(--map-hwy-edge)" strokeWidth={10} />
        <path d="M1030,448 C1090,425 1160,400 1240,360 C1330,318 1480,295 1600,283" stroke="var(--map-hwy)" strokeWidth={6} />
        {/* A-973 Laurentienne sud */}
        <path d="M822,252 C848,300 862,350 872,400 C877,425 882,445 888,462" stroke="var(--map-hwy-edge)" strokeWidth={9} />
        <path d="M822,252 C848,300 862,350 872,400 C877,425 882,445 888,462" stroke="var(--map-hwy)" strokeWidth={5.5} />
      </g>

      {/* ——— Grands boulevards ——— */}
      <g fill="none" strokeLinecap="round">
        <path d="M252,650 C390,624 540,604 690,584 C770,572 830,558 878,546" stroke="var(--map-road-edge)" strokeWidth={5} />
        <path d="M252,650 C390,624 540,604 690,584 C770,572 830,558 878,546" stroke="var(--map-road)" strokeWidth={3} />
        <path d="M260,678 C420,660 580,648 720,618 C800,600 855,592 912,588" stroke="var(--map-road-edge)" strokeWidth={4.4} />
        <path d="M260,678 C420,660 580,648 720,618 C800,600 855,592 912,588" stroke="var(--map-road)" strokeWidth={2.6} />
        <path d="M310,592 C460,568 610,548 745,530 C805,522 845,518 872,515" stroke="var(--map-road-edge)" strokeWidth={4.4} />
        <path d="M310,592 C460,568 610,548 745,530 C805,522 845,518 872,515" stroke="var(--map-road)" strokeWidth={2.6} />
      </g>
      <text x={400} y={614} className="map-road-label" transform="rotate(-8 400 614)">
        Grande Allée · boul. Laurier
      </text>

      {/* ——— Données RTC simplifiées : corridors majeurs issus des sources ouvertes ——— */}
      <g className="zoom-detail rtc-layer" aria-label="Corridors RTC simplifiés">
        <defs>
          <path id="rtc-metrobus-path" d="M315,586 C510,540 682,500 840,462 C948,438 1065,402 1210,342" />
          <path id="rtc-807-path" d="M268,650 C430,608 610,560 760,520 C850,495 930,472 1000,445" />
          <path id="rtc-littoral-path" d="M305,646 C430,625 548,608 652,596 C752,584 842,574 922,548" />
        </defs>
        <g className="rtc-corridors">
          <use href="#rtc-metrobus-path" className="rtc-path-edge" />
          <use href="#rtc-metrobus-path" className="rtc-path rtc-metrobus" />
          <use href="#rtc-807-path" className="rtc-path-edge" />
          <use href="#rtc-807-path" className="rtc-path rtc-local" />
          <use href="#rtc-littoral-path" className="rtc-path-edge" />
          <use href="#rtc-littoral-path" className="rtc-path rtc-bike" />
        </g>
        <g className="rtc-labels">
          <text x={742} y={445} transform="rotate(-14 742 445)">RTC Métrobus 800 · 801</text>
          <text x={650} y={535} transform="rotate(-14 650 535)">Parcours 807 · axe Sainte-Foy</text>
          <text x={520} y={588} transform="rotate(-8 520 588)">Corridor du Littoral · àVélo</text>
        </g>
        <g className="rtc-bus" aria-hidden="true">
          <rect x={-9} y={-5} width={18} height={10} rx={3} />
          <circle cx={-5} cy={6} r={1.8} />
          <circle cx={5} cy={6} r={1.8} />
          <animateMotion dur="18s" repeatCount="indefinite" rotate="auto">
            <mpath href="#rtc-metrobus-path" />
          </animateMotion>
        </g>
        <g className="rtc-bus rtc-bus-secondary" aria-hidden="true">
          <rect x={-8} y={-4.5} width={16} height={9} rx={3} />
          <circle cx={-4.5} cy={5.5} r={1.6} />
          <circle cx={4.5} cy={5.5} r={1.6} />
          <animateMotion dur="22s" begin="-7s" repeatCount="indefinite" rotate="auto">
            <mpath href="#rtc-807-path" />
          </animateMotion>
        </g>
      </g>

      <g className="zoom-detail relief-detail" aria-hidden="true">
        <path d="M820,524 C872,514 930,525 984,558 C962,598 918,626 872,622 C828,618 800,586 804,552 Z" />
        <path d="M1198,300 C1238,284 1282,286 1320,306 C1302,332 1264,342 1226,334 Z" />
        <text x={900} y={548} transform="rotate(12 900 548)">falaise du cap Diamant</text>
        <text x={1256} y={306} transform="rotate(-8 1256 306)">escarpement Montmorency</text>
      </g>

      <g className="zoom-detail city-zoom-detail" aria-hidden="true">
        <text x={566} y={304} transform="rotate(-8 566 304)">A-40 · Félix-Leclerc</text>
        <text x={246} y={284} transform="rotate(-78 246 284)">A-73 · Henri-IV</text>
        <text x={602} y={562} transform="rotate(-8 602 562)">ch. Sainte-Foy</text>
        <text x={514} y={632} transform="rotate(-9 514 632)">promenade Samuel-De Champlain</text>
        <text x={404} y={486}>campus de l'Université Laval</text>
        <text x={850} y={284}>ExpoCité</text>
        <text x={164} y={756} transform="rotate(-88 164 756)">pont Pierre-Laporte</text>
        <text x={278} y={762} transform="rotate(83 278 762)">pont de Québec</text>
        <text x={1360} y={414} transform="rotate(73 1360 414)">pont de l'Île</text>
        <text x={1060} y={620} transform="rotate(30 1060 620)">traverse Québec-Lévis</text>
        <text x={1280} y={282}>chute Montmorency · 83 m</text>
      </g>

      {/* ——— Ponts ——— */}
      <g strokeLinecap="round">
        {/* Pont Pierre-Laporte (porte l'A-73) */}
        <line x1={197} y1={665} x2={190} y2={832} stroke="#5d6b78" strokeWidth={11} />
        <line x1={197} y1={665} x2={190} y2={832} stroke="var(--map-hwy)" strokeWidth={5} />
        {/* Pont de Québec (cantilever) */}
        <line x1={230} y1={668} x2={248} y2={836} stroke="#4a4438" strokeWidth={9} />
        {[0.25, 0.5, 0.75].map((t) => (
          <circle key={t} cx={230 + (248 - 230) * t} cy={668 + (836 - 668) * t} r={7} fill="none" stroke="#4a4438" strokeWidth={2.4} />
        ))}
        {/* Pont de l'Île d'Orléans */}
        <line x1={1315} y1={372} x2={1338} y2={452} stroke="#5d6b78" strokeWidth={6} />
      </g>

      {/* ——— Traversier Québec–Lévis ——— */}
      <line x1={998} y1={602} x2={1112} y2={666} stroke="var(--map-ink)" strokeWidth={2.4} strokeDasharray="9 8" opacity={0.65} />
      {/* Petit navire */}
      <g transform="translate(1078 652) rotate(8)" aria-hidden="true">
        <path d="M-14,4 L14,4 L8,11 L-8,11 Z" fill="var(--map-ink)" />
        <rect x={-6} y={-3} width={12} height={7} rx={1.5} fill="var(--map-ink)" />
        <line x1={0} y1={-3} x2={0} y2={-10} stroke="var(--map-ink)" strokeWidth={2} />
      </g>

      {/* Voiliers décoratifs */}
      {[
        { x: 620, y: 740, flip: false },
        { x: 1340, y: 520, flip: true },
      ].map(({ x, y, flip }) => (
        <g key={`${x}-${y}`} transform={`translate(${x} ${y}) ${flip ? "scale(-1,1)" : ""}`} aria-hidden="true" opacity={0.8}>
          <path d="M-12,6 Q0,12 12,6 L9,2 L-9,2 Z" fill="var(--map-ink)" />
          <path d="M1,-16 L1,1 L11,1 Z" fill="var(--map-ink)" />
          <path d="M-2,-13 L-2,1 L-9,1 Z" fill="var(--map-ink)" />
        </g>
      ))}

      {/* ——— Noms de quartiers ——— */}
      <g className="map-district-labels">
        <text x={420} y={558}>Sainte-Foy</text>
        <text x={560} y={690}>Sillery</text>
        <text x={745} y={428}>Saint-Roch</text>
        <text x={918} y={372}>Limoilou</text>
        <text x={1148} y={302}>Beauport</text>
        <text x={520} y={130}>Charlesbourg</text>
        <text x={648} y={208}>Lebourgneuf</text>
        <text x={1090} y={782}>Lévis</text>
      </g>

      {/* ——— Étiquette du fleuve ——— */}
      <defs>
        <path id="fleuve-city-path" d="M380,790 C600,742 820,690 1040,630" fill="none" />
      </defs>
      <text className="map-fleuve-label">
        <textPath href="#fleuve-city-path" startOffset="8%">
          Fleuve Saint-Laurent
        </textPath>
      </text>

      {/* ——— Écussons d'autoroutes ——— */}
      <HighwayShield x={185} y={348} number="40" />
      <HighwayShield x={985} y={245} number="40" />
      <HighwayShield x={243} y={563} number="73" />
      <HighwayShield x={318} y={148} number="73" />
      <HighwayShield x={325} y={512} number="440" />
      <HighwayShield x={1152} y={400} number="440" />
      <HighwayShield x={905} y={402} number="973" />

      {/* ——— Médaillon du Vieux-Québec ——— */}
      <g
        className="old-quebec-medallion"
        role="button"
        tabIndex={0}
        aria-label="Explorer le Vieux-Québec en détail"
        onClick={onEnterOldQuebec}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onEnterOldQuebec();
          }
        }}
      >
        <circle cx={935} cy={532} r={90} fill="url(#gold-glow)" />
        <circle className="medallion-ring" cx={935} cy={532} r={86} fill="none" stroke="var(--gold)" strokeWidth={3} />
        <circle cx={935} cy={532} r={78} fill="none" stroke="var(--gold)" strokeWidth={1.2} strokeDasharray="5 7" />
        <defs>
          <path id="medallion-arc" d="M853,552 A86,86 0 0 1 1017,550" fill="none" />
        </defs>
        <text className="medallion-arc-text">
          <textPath href="#medallion-arc" startOffset="50%" textAnchor="middle">
            VIEUX-QUÉBEC
          </textPath>
        </text>
        <g className="medallion-cta" transform="translate(935 652)">
          <rect x={-92} y={-15} width={184} height={30} rx={15} fill="var(--flag-blue)" stroke="#fbf7ee" strokeWidth={1.6} />
          <text y={6} textAnchor="middle">Explorer en détail →</text>
        </g>
      </g>

      {/* ——— Lieux ——— */}
      {places.map((place) => (
        <MapMarker
          key={place.id}
          place={place}
          mapId="city"
          selected={selectedId === place.id}
          dimmed={dimmedIds.has(place.id)}
          favorite={favorites.has(place.id)}
          zoom={camera.state.k}
          onSelect={onSelect}
          onHover={onHover}
        />
      ))}
      <MarkerTooltip place={hoveredPlace} mapId="city" viewWidth={VIEW_WIDTH} zoom={camera.state.k} />
      </g>

      {/* ——— Habillage ——— */}
      <Cartouche
        x={42}
        y={42}
        width={304}
        title="QUÉBEC"
        subtitle="Capitale-Nationale du Québec"
        detail="Fondée en 1608 par Samuel de Champlain"
      />
      <CompassRose x={1488} y={128} size={104} />
      <ScaleBar x={60} y={938} label="≈ 5 km" />
      <MapFrame width={VIEW_WIDTH} height={VIEW_HEIGHT} />
    </svg>
  );
}
