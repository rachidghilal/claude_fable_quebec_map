import { MapMarker, MarkerTooltip, type LabelTweak } from "./MapMarker";
import { Cartouche, CompassRose, MapDefs, MapFrame, ScaleBar } from "./MapDecor";
import { MAP_DIMENSIONS, type MapViewProps } from "./types";

/** Ajustements d'étiquettes pour éviter les collisions dans les zones denses. */
const LABEL_TWEAKS: Record<string, LabelTweak> = {
  "terrasse-dufferin": { y: -27 },
  "traversier-levis": { x: 26, y: 6, anchor: "start" },
  "musee-civilisation": { x: 26, y: 6, anchor: "start" },
};

const { width: VIEW_WIDTH, height: VIEW_HEIGHT } = MAP_DIMENSIONS.oldQuebec;

/** Points d'un polygone en étoile (Citadelle, plan Vauban stylisé). */
function starPoints(cx: number, cy: number, outer: number, inner: number, branches: number, rotation: number): string {
  const points: string[] = [];
  for (let i = 0; i < branches * 2; i += 1) {
    const radius = i % 2 === 0 ? outer : inner;
    const angle = ((i * 180) / branches + rotation - 90) * (Math.PI / 180);
    points.push(`${(cx + Math.cos(angle) * radius).toFixed(1)},${(cy + Math.sin(angle) * radius).toFixed(1)}`);
  }
  return points.join(" ");
}

/** Bastion saillant des fortifications : triangle pointant vers l'extérieur. */
function Bastion({ x, y, rotation }: { x: number; y: number; rotation: number }) {
  return (
    <polygon
      points="-13,3 0,-22 13,3"
      transform={`translate(${x} ${y}) rotate(${rotation})`}
      fill="var(--map-wall)"
      stroke="#fbf7ee"
      strokeWidth={1}
    />
  );
}

/** Porte fortifiée avec arche. */
function Gate({ x, y, label, labelDy = 24 }: { x: number; y: number; label: string; labelDy?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-9} y={-9} width={18} height={18} rx={2} fill="var(--map-wall)" stroke="#fbf7ee" strokeWidth={1.2} />
      <path d="M-4,5 L-4,-1 A4,4 0 0 1 4,-1 L4,5 Z" fill="var(--map-paper)" />
      <text y={labelDy} textAnchor="middle" className="map-gate-label">
        {label}
      </text>
    </g>
  );
}

/** Maisons de la trame urbaine (vues du dessus). */
const HOUSES: Array<{ x: number; y: number; w: number; h: number; r: number; roof?: string }> = [
  // Haute-Ville, autour de la basilique
  { x: 860, y: 330, w: 14, h: 11, r: -10 }, { x: 838, y: 372, w: 12, h: 14, r: 14 },
  { x: 884, y: 412, w: 13, h: 11, r: -6, roof: "#c4907c" }, { x: 922, y: 432, w: 12, h: 12, r: 8 },
  { x: 972, y: 422, w: 14, h: 11, r: -14 }, { x: 1002, y: 340, w: 12, h: 12, r: 6 },
  { x: 920, y: 300, w: 12, h: 11, r: -8 }, { x: 880, y: 272, w: 13, h: 11, r: 10, roof: "#9db8a8" },
  { x: 790, y: 320, w: 12, h: 13, r: -12 }, { x: 752, y: 366, w: 13, h: 11, r: 6 },
  { x: 716, y: 398, w: 12, h: 12, r: -8, roof: "#c4907c" }, { x: 680, y: 360, w: 12, h: 11, r: 12 },
  { x: 660, y: 318, w: 12, h: 12, r: -6 }, { x: 730, y: 290, w: 12, h: 11, r: 8 },
  { x: 812, y: 442, w: 13, h: 11, r: -10 }, { x: 770, y: 478, w: 12, h: 12, r: 10 },
  // Petit-Champlain et place Royale
  { x: 1098, y: 512, w: 10, h: 9, r: 24 }, { x: 1118, y: 548, w: 10, h: 9, r: 24, roof: "#c4907c" },
  { x: 1140, y: 572, w: 10, h: 9, r: 28 }, { x: 1132, y: 498, w: 9, h: 9, r: -4 },
  { x: 1152, y: 462, w: 10, h: 9, r: 4 }, { x: 1176, y: 482, w: 9, h: 9, r: 12, roof: "#9db8a8" },
  { x: 1160, y: 530, w: 9, h: 9, r: 20 },
  // Vieux-Port et rue Saint-Paul
  { x: 980, y: 252, w: 13, h: 10, r: 6 }, { x: 1020, y: 268, w: 12, h: 10, r: 10, roof: "#c4907c" },
  { x: 1062, y: 286, w: 13, h: 10, r: 14 }, { x: 1104, y: 308, w: 12, h: 10, r: 18 },
  { x: 1140, y: 336, w: 12, h: 10, r: 22 }, { x: 1160, y: 376, w: 12, h: 10, r: 8, roof: "#9db8a8" },
  { x: 1172, y: 418, w: 11, h: 10, r: 4 },
  // Saint-Roch (basse terre)
  { x: 240, y: 130, w: 15, h: 11, r: -4 }, { x: 300, y: 152, w: 14, h: 11, r: 4 },
  { x: 364, y: 130, w: 14, h: 11, r: -6, roof: "#c4907c" }, { x: 430, y: 154, w: 15, h: 11, r: 4 },
  { x: 498, y: 132, w: 14, h: 11, r: -4 }, { x: 562, y: 156, w: 14, h: 11, r: 6 },
  { x: 630, y: 136, w: 14, h: 11, r: -6 }, { x: 696, y: 160, w: 14, h: 11, r: 4, roof: "#9db8a8" },
  { x: 760, y: 142, w: 14, h: 11, r: -4 }, { x: 824, y: 168, w: 14, h: 11, r: 6 },
  // Faubourg Saint-Jean-Baptiste et Montcalm
  { x: 250, y: 392, w: 14, h: 11, r: -8 }, { x: 310, y: 412, w: 13, h: 11, r: 6 },
  { x: 372, y: 392, w: 13, h: 11, r: -6, roof: "#c4907c" }, { x: 434, y: 414, w: 13, h: 11, r: 8 },
  { x: 496, y: 396, w: 13, h: 11, r: -8 }, { x: 200, y: 478, w: 13, h: 11, r: 6 },
  { x: 262, y: 500, w: 13, h: 11, r: -6 }, { x: 326, y: 520, w: 13, h: 11, r: 8, roof: "#9db8a8" },
  { x: 150, y: 432, w: 13, h: 11, r: -4 },
];

/**
 * Carte détaillée du Vieux-Québec : fortifications, Citadelle, falaise du
 * cap Diamant, bâtiments emblématiques et trame de rues historiques.
 */
export function OldQuebecMap({
  places,
  selectedId,
  hoveredId,
  dimmedIds,
  favorites,
  camera,
  onSelect,
  onHover,
}: MapViewProps) {
  const hoveredPlace = places.find((place) => place.id === hoveredId) ?? null;

  return (
    <svg
      className="map-svg old-quebec-map"
      viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
      role="group"
      aria-label="Carte détaillée du Vieux-Québec"
    >
      <MapDefs />

      <g className="map-world" transform={camera.worldTransform}>
      {/* ——— Socle terrestre ——— */}
      <rect width={VIEW_WIDTH} height={VIEW_HEIGHT} fill="var(--map-land)" />

      {/* Basses terres (Saint-Roch, Vieux-Port) */}
      <path
        d="M0,0 L1400,0 L1400,168 L1232,205
           C1150,242 1020,252 880,244
           C600,230 300,252 0,292 Z"
        fill="var(--map-land-low)"
      />
      {/* Bande littorale basse au pied de la falaise */}
      <path
        d="M120,950 C380,885 650,800 900,715 C1050,660 1160,575 1215,480 C1258,405 1272,310 1250,230"
        fill="none"
        stroke="var(--map-land-low)"
        strokeWidth={58}
      />

      {/* ——— Fleuve Saint-Laurent ——— */}
      <path
        d="M120,950 C380,885 650,800 900,715
           C1050,660 1160,575 1215,480
           C1258,405 1272,310 1250,230
           C1244,208 1233,190 1216,178
           L1400,158 L1400,950 Z"
        fill="url(#water-fill)"
        stroke="var(--map-shoreline)"
        strokeWidth={2.5}
      />
      <path
        d="M120,950 C380,885 650,800 900,715
           C1050,660 1160,575 1215,480
           C1258,405 1272,310 1250,230
           C1244,208 1233,190 1216,178
           L1400,158 L1400,950 Z"
        fill="url(#water-lines)"
      />

      {/* ——— Rivière Saint-Charles ——— */}
      <path
        d="M-10,70 C300,42 650,40 950,80 C1080,103 1175,140 1235,212"
        fill="none"
        stroke="var(--map-shoreline)"
        strokeWidth={44}
        strokeLinecap="round"
      />
      <path
        d="M-10,70 C300,42 650,40 950,80 C1080,103 1175,140 1235,212"
        fill="none"
        stroke="url(#water-fill)"
        strokeWidth={38}
        strokeLinecap="round"
      />

      {/* Bassin Louise */}
      <path
        d="M1005,168 L1128,148 L1142,200 L1018,222 Z"
        fill="url(#water-fill)"
        stroke="var(--map-shoreline)"
        strokeWidth={2}
      />
      <text x={1072} y={192} className="map-river-label" transform="rotate(-9 1072 192)">
        bassin Louise
      </text>

      {/* ——— Rive sud : Lévis ——— */}
      <path
        d="M1400,640 C1340,690 1290,745 1258,805 C1235,855 1222,900 1218,950 L1400,950 Z"
        fill="var(--map-land-low)"
        stroke="var(--map-shoreline)"
        strokeWidth={2.5}
      />
      <text x={1318} y={830} className="map-district" textAnchor="middle">
        Lévis
      </text>

      {/* ——— Falaise du cap Diamant ——— */}
      <path
        d="M60,838 C320,768 600,690 850,615
           C955,582 1040,520 1082,452
           C1112,404 1124,348 1116,296
           L1090,300
           C1097,350 1085,402 1056,447
           C1015,512 935,565 838,590
           C595,663 318,740 60,808 Z"
        fill="url(#cliff-hatch)"
      />
      <path
        d="M60,808 C318,740 595,663 838,590 C935,565 1015,512 1056,447 C1085,402 1097,350 1090,300"
        fill="none"
        stroke="var(--map-relief)"
        strokeWidth={1.6}
      />
      <text x={968} y={618} className="map-cliff-label" transform="rotate(-38 968 618)">
        cap Diamant
      </text>

      {/* Escarpement nord (côte d'Abraham) */}
      <path
        d="M0,300 C250,262 500,242 750,238 C900,236 1010,260 1082,300
           L1072,322 C1000,285 898,262 752,260 C502,264 252,286 0,330 Z"
        fill="url(#cliff-hatch)"
        opacity={0.45}
      />

      {/* ——— Parcs ——— */}
      <g stroke="var(--map-park-line)" strokeWidth={1.4}>
        {/* Plaines d'Abraham */}
        <path
          id="plains-shape"
          d="M55,648 C250,615 430,618 580,642 C700,662 790,684 836,706
             L846,732 C710,766 500,795 300,824 C195,838 115,846 52,852 Z"
          fill="var(--map-park)"
        />
        {/* Parc de l'Esplanade */}
        <path d="M610,400 C640,388 668,392 672,408 C674,424 650,436 622,434 C604,432 596,418 602,408 Z" fill="var(--map-park)" />
        {/* Place d'Armes */}
        <path d="M995,362 L1022,358 L1026,380 L999,385 Z" fill="var(--map-park)" />
      </g>
      <path
        d="M55,648 C250,615 430,618 580,642 C700,662 790,684 836,706
           L846,732 C710,766 500,795 300,824 C195,838 115,846 52,852 Z"
        fill="url(#park-dots)"
        pointerEvents="none"
      />
      {[{ x: 180, y: 740 }, { x: 290, y: 700 }, { x: 470, y: 690 }, { x: 620, y: 700 }, { x: 720, y: 730 }, { x: 240, y: 790 }, { x: 540, y: 760 }].map(
        ({ x, y }) => (
          <g key={`${x}-${y}`} aria-hidden="true">
            <circle cx={x} cy={y} r={4.5} fill="#7fa05e" opacity={0.75} />
            <line x1={x} y1={y + 4} x2={x} y2={y + 9} stroke="#6b8a4e" strokeWidth={1.4} />
          </g>
        ),
      )}
      <text x={420} y={788} className="map-park-label">
        parc des Champs-de-Bataille
      </text>

      {/* ——— Rues ——— */}
      <defs>
        <path id="street-grande-allee" d="M55,612 C250,575 450,545 648,498" />
        <path id="street-st-louis" d="M648,498 C760,468 880,438 1000,396" />
        <path id="street-st-jean" d="M588,352 C700,330 820,328 950,340" />
        <path id="street-charest" d="M0,158 C250,140 500,136 750,150 C850,158 915,164 955,172" />
        <path id="street-champlain" d="M945,705 C1058,658 1148,580 1202,492" />
        <path id="street-st-paul" d="M935,228 C1010,238 1080,258 1148,292" />
        <path id="street-montagne" d="M1035,388 C1072,368 1092,398 1096,430 C1099,452 1090,468 1078,480" />
      </defs>
      <g fill="none" strokeLinecap="round">
        {[
          "street-grande-allee",
          "street-st-louis",
          "street-st-jean",
          "street-charest",
          "street-champlain",
          "street-st-paul",
          "street-montagne",
        ].map((id) => (
          <use key={`${id}-edge`} href={`#${id}`} stroke="var(--map-road-edge)" strokeWidth={6} />
        ))}
        {[
          "street-grande-allee",
          "street-st-louis",
          "street-st-jean",
          "street-charest",
          "street-champlain",
          "street-st-paul",
          "street-montagne",
        ].map((id) => (
          <use key={`${id}-fill`} href={`#${id}`} stroke="var(--map-road)" strokeWidth={3.6} />
        ))}
        {/* Rues secondaires */}
        {[
          "M588,352 C576,300 568,250 562,198",
          "M40,520 C220,488 420,455 605,428",
          "M862,218 C880,248 888,276 892,308",
          "M880,310 C950,300 1020,315 1068,340",
          "M905,338 C925,350 938,360 950,368",
          "M950,368 C985,374 1010,382 1032,390",
          "M1082,482 C1108,508 1138,542 1170,566",
          "M1148,292 C1168,330 1178,368 1184,404",
          "M780,420 C850,402 920,390 1000,388",
          "M700,462 C770,438 850,420 920,408",
          "M1184,404 C1196,432 1200,456 1198,476",
        ].map((d) => (
          <g key={d}>
            <path d={d} stroke="var(--map-road-edge)" strokeWidth={4.4} />
            <path d={d} stroke="var(--map-road)" strokeWidth={2.4} />
          </g>
        ))}
      </g>
      {/* Noms de rues */}
      <g className="map-street-labels">
        <text dy={-6}>
          <textPath href="#street-grande-allee" startOffset="22%">Grande Allée</textPath>
        </text>
        <text dy={-6}>
          <textPath href="#street-st-louis" startOffset="36%">rue Saint-Louis</textPath>
        </text>
        <text dy={-6}>
          <textPath href="#street-st-jean" startOffset="40%">rue Saint-Jean</textPath>
        </text>
        <text dy={-6}>
          <textPath href="#street-charest" startOffset="42%">boulevard Charest</textPath>
        </text>
        <text dy={-6}>
          <textPath href="#street-champlain" startOffset="18%">boulevard Champlain</textPath>
        </text>
        <text dy={-6}>
          <textPath href="#street-st-paul" startOffset="16%">rue Saint-Paul</textPath>
        </text>
        <text dy={-7}>
          <textPath href="#street-montagne" startOffset="4%">côte de la Montagne</textPath>
        </text>
      </g>

      <g className="zoom-detail old-quebec-zoom-detail" aria-hidden="true">
        <text x={560} y={246} transform="rotate(-84 560 246)">côte du Palais</text>
        <text x={636} y={224} transform="rotate(-24 636 224)">rue des Remparts</text>
        <text x={958} y={292} transform="rotate(12 958 292)">rue Buade</text>
        <text x={1128} y={586} transform="rotate(28 1128 586)">rue du Petit-Champlain</text>
        <text x={1012} y={354}>place d'Armes</text>
        <text x={900} y={694} transform="rotate(-37 900 694)">promenade des Gouverneurs</text>
        <text x={452} y={738}>tours Martello</text>
        <text x={1110} y={146} transform="rotate(-8 1110 146)">marina du bassin Louise</text>
      </g>

      {/* ——— Trame urbaine ——— */}
      <g aria-hidden="true">
        {HOUSES.map(({ x, y, w, h, r, roof }, index) => (
          <rect
            key={index}
            x={-w / 2}
            y={-h / 2}
            width={w}
            height={h}
            transform={`translate(${x} ${y}) rotate(${r})`}
            fill={roof ?? "#e3d4b4"}
            stroke="#b3a283"
            strokeWidth={0.8}
          />
        ))}
      </g>

      {/* ——— Fortifications ——— */}
      <path
        d="M832,618 C770,572 706,540 660,502 C628,474 604,432 590,388
           C580,348 584,302 612,270 C642,238 700,218 768,208
           C806,202 836,206 858,216 C892,230 922,248 948,270"
        fill="none"
        stroke="var(--map-wall)"
        strokeWidth={5.5}
        strokeLinecap="round"
      />
      <path
        d="M832,618 C770,572 706,540 660,502 C628,474 604,432 590,388
           C580,348 584,302 612,270 C642,238 700,218 768,208
           C806,202 836,206 858,216 C892,230 922,248 948,270"
        fill="none"
        stroke="#fbf7ee"
        strokeWidth={1.4}
        strokeDasharray="2 7"
        strokeLinecap="round"
      />
      <Bastion x={705} y={548} rotation={230} />
      <Bastion x={610} y={438} rotation={260} />
      <Bastion x={592} y={330} rotation={285} />
      <Bastion x={650} y={250} rotation={320} />
      <Bastion x={760} y={212} rotation={350} />
      <Gate x={648} y={498} label="porte Saint-Louis" />
      <Gate x={606} y={424} label="porte Kent" labelDy={-16} />
      <Gate x={588} y={352} label="porte Saint-Jean" labelDy={-16} />
      <Gate x={1090} y={414} label="porte Prescott" labelDy={-14} />

      {/* ——— Citadelle ——— */}
      <g>
        <polygon
          points={starPoints(880, 650, 72, 45, 6, 14)}
          fill="#e0d3b2"
          stroke="var(--map-wall)"
          strokeWidth={2.6}
          strokeLinejoin="round"
        />
        <rect x={856} y={632} width={22} height={13} fill="#cdbb96" stroke="var(--map-wall)" strokeWidth={1} />
        <rect x={886} y={650} width={16} height={11} fill="#cdbb96" stroke="var(--map-wall)" strokeWidth={1} />
        <line x1={880} y1={616} x2={880} y2={596} stroke="var(--map-ink)" strokeWidth={1.6} />
        <rect x={880} y={596} width={13} height={8} fill="var(--flag-blue)" />
      </g>

      {/* ——— Terrasse Dufferin & promenade des Gouverneurs ——— */}
      <path d="M985,560 C1010,535 1030,505 1042,470" fill="none" stroke="#cda86a" strokeWidth={7} strokeLinecap="round" />
      <path d="M985,560 C1010,535 1030,505 1042,470" fill="none" stroke="#b08c4f" strokeWidth={7} strokeLinecap="round" strokeDasharray="2 5" />
      <path
        d="M992,565 C975,592 950,622 922,652 C900,676 872,696 846,708"
        fill="none"
        stroke="#8a6d3f"
        strokeWidth={2.2}
        strokeDasharray="4 5"
      />

      {/* Funiculaire */}
      <line x1={1042} y1={468} x2={1086} y2={492} stroke="var(--map-ink)" strokeWidth={2} strokeDasharray="3 3" />
      <rect x={1058} y={474} width={9} height={7} fill="var(--map-ink)" transform="rotate(28 1062 477)" />

      {/* ——— Bâtiments emblématiques ——— */}
      <g stroke="var(--map-ink)" strokeWidth={1.1} strokeLinejoin="round">
        {/* Château Frontenac */}
        <g transform="translate(1042 415) scale(0.75) translate(-1028 -398)">
          <rect x={982} y={392} width={32} height={26} fill="#c08a5f" />
          <polygon points="980,392 998,378 1016,392" fill="var(--copper)" />
          <rect x={1042} y={390} width={30} height={26} fill="#c08a5f" />
          <polygon points="1040,390 1056,377 1072,390" fill="var(--copper)" />
          <rect x={1014} y={376} width={28} height={42} fill="#b5825a" />
          <polygon points="1010,376 1028,348 1046,376" fill="var(--copper)" />
          <line x1={1028} y1={348} x2={1028} y2={338} strokeWidth={1.6} />
          <circle cx={984} cy={390} r={5.5} fill="#c08a5f" />
          <polygon points="977,390 984,374 991,390" fill="var(--copper)" />
          <circle cx={1070} cy={388} r={5.5} fill="#c08a5f" />
          <polygon points="1063,388 1070,372 1077,388" fill="var(--copper)" />
        </g>
        {/* Hôtel du Parlement */}
        <g>
          <rect x={488} y={508} width={64} height={26} fill="#ddd1b4" />
          <rect x={486} y={502} width={68} height={8} fill="#5b6c7c" />
          <rect x={512} y={488} width={16} height={16} fill="#cfc2a4" />
          <polygon points="510,488 520,476 530,488" fill="#5b6c7c" />
        </g>
        {/* Basilique Notre-Dame */}
        <g>
          <rect x={938} y={300} width={26} height={32} fill="#efe6d0" />
          <polygon points="938,300 951,287 964,300" fill="#aab4ba" />
          <line x1={945} y1={290} x2={945} y2={278} strokeWidth={1.5} />
          <circle cx={951} cy={335} r={7} fill="#efe6d0" />
        </g>
        {/* Séminaire de Québec */}
        <g>
          <rect x={988} y={262} width={36} height={11} fill="#f2ead6" />
          <rect x={988} y={262} width={10} height={28} fill="#f2ead6" />
        </g>
        {/* Hôtel de ville */}
        <g>
          <rect x={882} y={348} width={32} height={20} fill="#e6dabc" />
          <rect x={892} y={338} width={10} height={12} fill="#d6c8a8" />
        </g>
        {/* Cathédrale Holy Trinity */}
        <g>
          <rect x={930} y={396} width={18} height={20} fill="#eee5cf" />
          <polygon points="933,396 939,380 945,396" fill="#aab4ba" />
        </g>
        {/* Monastère des Augustines */}
        <g>
          <rect x={794} y={246} width={50} height={15} fill="#ece2ca" />
          <rect x={816} y={236} width={12} height={12} fill="#ddd0b2" />
        </g>
        {/* Manège militaire */}
        <g>
          <rect x={494} y={606} width={52} height={17} fill="#d9cbae" />
          <rect x={494} y={601} width={52} height={6} fill="var(--copper)" />
          <circle cx={496} cy={608} r={5} fill="#d9cbae" />
          <polygon points="490,608 496,596 502,608" fill="var(--copper)" />
          <circle cx={546} cy={608} r={5} fill="#d9cbae" />
          <polygon points="540,608 546,596 552,608" fill="var(--copper)" />
        </g>
        {/* Gare du Palais */}
        <g>
          <rect x={898} y={152} width={46} height={20} fill="#c08a5f" />
          <rect x={898} y={147} width={46} height={6} fill="var(--copper)" />
          <circle cx={900} cy={152} r={5} fill="#c08a5f" />
          <polygon points="894,152 900,140 906,152" fill="var(--copper)" />
          <circle cx={942} cy={152} r={5} fill="#c08a5f" />
          <polygon points="936,152 942,140 948,152" fill="var(--copper)" />
        </g>
        {/* Musée de la civilisation */}
        <polygon points="1160,346 1206,338 1212,360 1166,368" fill="#dcd6c6" />
        {/* MNBAQ */}
        <g>
          <rect x={148} y={664} width={26} height={18} fill="#e9e5d9" />
          <rect x={178} y={668} width={22} height={14} fill="#f4f1e8" />
        </g>
        {/* Tours Martello */}
        <circle cx={362} cy={688} r={8} fill="#b9ab8e" />
        <circle cx={520} cy={740} r={8} fill="#b9ab8e" />
        {/* Fontaine de Tourny */}
        <g>
          <circle cx={468} cy={498} r={7.5} fill="#9fc3cc" />
          <circle cx={468} cy={498} r={2.4} fill="var(--gold)" />
        </g>
        {/* Observatoire de la Capitale (édifice Marie-Guyart) */}
        <rect x={344} y={470} width={15} height={26} fill="#ded5c0" />
      </g>

      {/* ——— Traversier et navires ——— */}
      <path d="M1208,442 C1250,520 1280,600 1295,690" fill="none" stroke="var(--map-ink)" strokeWidth={2.2} strokeDasharray="8 8" opacity={0.6} />
      <g transform="translate(1262 568) rotate(75)" aria-hidden="true">
        <path d="M-13,4 L13,4 L8,10 L-8,10 Z" fill="var(--map-ink)" />
        <rect x={-5} y={-2} width={10} height={6} rx={1.5} fill="var(--map-ink)" />
      </g>
      {[
        { x: 560, y: 858, flip: false },
        { x: 1010, y: 800, flip: true },
      ].map(({ x, y, flip }) => (
        <g key={`${x}-${y}`} transform={`translate(${x} ${y}) ${flip ? "scale(-1,1)" : ""}`} aria-hidden="true" opacity={0.8}>
          <path d="M-12,6 Q0,12 12,6 L9,2 L-9,2 Z" fill="var(--map-ink)" />
          <path d="M1,-16 L1,1 L11,1 Z" fill="var(--map-ink)" />
          <path d="M-2,-13 L-2,1 L-9,1 Z" fill="var(--map-ink)" />
        </g>
      ))}

      {/* ——— Quartiers ——— */}
      <g className="map-district-labels">
        <text x={282} y={188}>Saint-Roch</text>
        <text x={318} y={368}>Saint-Jean-Baptiste</text>
        <text x={158} y={568}>Montcalm</text>
        <text x={736} y={486} transform="rotate(-9 736 486)">Haute-Ville</text>
        <text x={1124} y={318} transform="rotate(14 1124 318)">Basse-Ville</text>
      </g>

      {/* ——— Étiquettes d'eau ——— */}
      <defs>
        <path id="fleuve-oq-path" d="M300,895 C550,835 800,762 1010,672" fill="none" />
        <path id="riviere-sc-path" d="M260,52 C500,38 750,45 950,82" fill="none" />
      </defs>
      <text className="map-fleuve-label">
        <textPath href="#fleuve-oq-path" startOffset="10%">
          Fleuve Saint-Laurent
        </textPath>
      </text>
      <text className="map-river-label">
        <textPath href="#riviere-sc-path" startOffset="12%">
          Rivière Saint-Charles
        </textPath>
      </text>

      {/* ——— Lieux ——— */}
      {places.map((place) => (
        <MapMarker
          key={place.id}
          place={place}
          mapId="oldQuebec"
          selected={selectedId === place.id}
          dimmed={dimmedIds.has(place.id)}
          favorite={favorites.has(place.id)}
          zoom={camera.state.k}
          labelTweak={LABEL_TWEAKS[place.id]}
          onSelect={onSelect}
          onHover={onHover}
        />
      ))}
      <MarkerTooltip place={hoveredPlace} mapId="oldQuebec" viewWidth={VIEW_WIDTH} zoom={camera.state.k} />
      </g>

      {/* ——— Habillage ——— */}
      <Cartouche
        x={45}
        y={40}
        width={330}
        title="VIEUX-QUÉBEC"
        subtitle="Arrondissement historique"
        detail="Patrimoine mondial de l'UNESCO · 1985"
      />
      <CompassRose x={1308} y={92} size={92} />
      <ScaleBar x={600} y={902} label="≈ 400 m" />
      <MapFrame width={VIEW_WIDTH} height={VIEW_HEIGHT} />
    </svg>
  );
}
