import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";
import { PNG } from "pngjs";

const url = process.env.APP_URL ?? "http://localhost:5173/";
const chromePath =
  process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const outDir = new URL("../verification/", import.meta.url);

function outPath(fileName) {
  return fileURLToPath(new URL(fileName, outDir));
}

function assert(value, message) {
  if (!value) {
    throw new Error(message);
  }
}

/** Métriques pixels de la carte : détecte un SVG vide ou un rendu cassé. */
async function readVisualMetrics(page, selector) {
  const box = await page.locator(selector).boundingBox();
  const buffer = await page.locator(selector).screenshot();
  const png = PNG.sync.read(buffer);
  const left = Math.floor(png.width * 0.1);
  const right = Math.floor(png.width * 0.9);
  const top = Math.floor(png.height * 0.1);
  const bottom = Math.floor(png.height * 0.9);

  let nonPaper = 0;
  let sum = 0;
  let sumSquares = 0;
  let count = 0;

  for (let y = top; y < bottom; y += 1) {
    for (let x = left; x < right; x += 1) {
      const index = (png.width * y + x) * 4;
      const r = png.data[index];
      const g = png.data[index + 1];
      const b = png.data[index + 2];
      const brightness = (r + g + b) / 3;
      if (Math.abs(r - 248) + Math.abs(g - 243) + Math.abs(b - 230) > 30) {
        nonPaper += 1;
      }
      sum += brightness;
      sumSquares += brightness * brightness;
      count += 1;
    }
  }

  const mean = sum / count;
  const variance = sumSquares / count - mean * mean;

  return {
    width: box?.width ?? png.width,
    height: box?.height ?? png.height,
    nonPaperRatio: nonPaper / count,
    variance,
  };
}

async function verifyViewport(browser, name, viewport) {
  console.error(`[verify] viewport ${name}…`);
  const page = await browser.newPage({ viewport, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: "domcontentloaded" });
  await page.waitForSelector("svg.city-map", { timeout: 15000 });
  await page.waitForTimeout(900);
  console.error(`[verify] ${name}: page chargée`);

  const title = await page.locator(".brand-block h1").innerText();
  const markerCount = await page.locator(".city-map .map-marker").count();
  const chipCount = await page.locator(".category-chip").count();
  const listCount = await page.locator(".place-row").count();
  const emptyPanel = await page.locator(".place-panel-empty").count();
  const essentialsCount = await page.locator(".essentials-list li").count();
  const visualBox = await page.locator("svg.city-map").boundingBox();
  const metrics = await readVisualMetrics(page, "svg.city-map");

  await page.screenshot({ path: outPath(`${name}.png`), fullPage: true });
  await page.locator("svg.city-map").screenshot({ path: outPath(`${name}-carte.png`) });

  assert(title.includes("Québec"), `${name}: titre principal introuvable`);
  assert(markerCount >= 15, `${name}: ${markerCount} marqueurs sur la vue ville (≥ 15 attendus)`);
  assert(chipCount === 8, `${name}: ${chipCount} puces de catégories (8 attendues)`);
  assert(listCount >= 40, `${name}: ${listCount} lieux dans la liste (≥ 40 attendus)`);
  assert(emptyPanel === 1, `${name}: l'état vide de la fiche devrait être affiché au démarrage`);
  assert(essentialsCount >= 8, `${name}: ${essentialsCount} incontournables listés (≥ 8 attendus)`);
  assert(visualBox && visualBox.width > 280 && visualBox.height > 180, `${name}: carte trop petite`);
  assert(metrics.nonPaperRatio > 0.2, `${name}: la carte semble vide (ratio ${metrics.nonPaperRatio.toFixed(3)})`);
  assert(metrics.variance > 120, `${name}: trop peu de variation visuelle sur la carte`);

  await page.close();
  return { name, markerCount, chipCount, listCount, metrics };
}

async function verifyInteractions(browser) {
  console.error("[verify] interactions…");
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: "domcontentloaded" });
  await page.waitForSelector("svg.city-map", { timeout: 15000 });
  await page.waitForTimeout(600);

  console.error("[verify] interaction 1");
  // 1. Caméra : zoom, détails progressifs, pan, reset.
  const zoomInButton = page.getByRole("button", { name: "Zoomer", exact: true });
  await zoomInButton.click();
  await zoomInButton.click();
  await zoomInButton.click();
  await zoomInButton.click();
  await page.waitForTimeout(300);
  const zoomTransform = await page.locator(".city-map .map-world").getAttribute("transform");
  const detailMode = await page.locator('.map-stage[data-zoom="detail"]').count();
  assert(zoomTransform && /scale\((1\.[8-9]|[2-3])/.test(zoomTransform), `caméra: zoom insuffisant (${zoomTransform})`);
  assert(detailMode === 1, "caméra: les détails progressifs devraient être actifs");

  const cityBox = await page.locator("svg.city-map").boundingBox();
  assert(cityBox, "caméra: boîte SVG introuvable");
  const beforePan = await page.locator(".city-map .map-world").getAttribute("transform");
  await page.mouse.move(cityBox.x + cityBox.width * 0.52, cityBox.y + cityBox.height * 0.55);
  await page.mouse.down();
  await page.mouse.move(cityBox.x + cityBox.width * 0.62, cityBox.y + cityBox.height * 0.6);
  await page.mouse.up();
  await page.waitForTimeout(200);
  const afterPan = await page.locator(".city-map .map-world").getAttribute("transform");
  assert(beforePan !== afterPan, "caméra: le glisser-déplacer n'a pas modifié le transform");
  await page.locator("svg.city-map").screenshot({ path: outPath("ville-zoom.png") });

  await page.getByLabel("Recentrer").click();
  await page.waitForTimeout(250);
  const resetTransform = await page.locator(".city-map .map-world").getAttribute("transform");
  assert(resetTransform?.includes("scale(1)"), `caméra: reset incomplet (${resetTransform})`);

  console.error("[verify] interaction 2");
  // 1. Clic sur un marqueur → la fiche affiche le bon lieu.
  await page.locator('.map-marker[aria-label^="Parc de la Chute-Montmorency"]').click();
  await page.waitForTimeout(300);
  const placeTitle = await page.locator(".place-panel h2").innerText();
  assert(placeTitle.includes("Chute-Montmorency"), "fiche: le clic marqueur n'a pas sélectionné le lieu");

  console.error("[verify] interaction 3");
  // 2. Bascule vers le Vieux-Québec via le médaillon doré.
  await page.locator(".old-quebec-medallion").click();
  await page.waitForSelector("svg.old-quebec-map", { timeout: 5000 });
  await page.waitForTimeout(700);
  const oldQuebecMarkers = await page.locator(".old-quebec-map .map-marker").count();
  assert(oldQuebecMarkers >= 25, `Vieux-Québec: ${oldQuebecMarkers} marqueurs (≥ 25 attendus)`);
  const oldQuebecMetrics = await readVisualMetrics(page, "svg.old-quebec-map");
  assert(oldQuebecMetrics.nonPaperRatio > 0.2, "Vieux-Québec: la carte semble vide");
  await page.screenshot({ path: outPath("vieux-quebec.png"), fullPage: true });
  await page.locator("svg.old-quebec-map").screenshot({ path: outPath("vieux-quebec-carte.png") });

  console.error("[verify] interaction 4");
  // 3. Sélection d'un lieu de la liste qui n'existe que sur l'autre carte → bascule auto.
  await page.locator(".place-row-main", { hasText: "Aquarium du Québec" }).click();
  await page.waitForSelector("svg.city-map", { timeout: 5000 });
  const aquariumTitle = await page.locator(".place-panel h2").innerText();
  assert(aquariumTitle.includes("Aquarium"), "liste: la sélection n'a pas mis à jour la fiche");

  console.error("[verify] interaction 5");
  // 4. Recherche → la liste se filtre.
  await page.locator(".search-field input").fill("frontenac");
  await page.waitForTimeout(300);
  const filteredCount = await page.locator(".place-row").count();
  assert(filteredCount === 1, `recherche: ${filteredCount} résultat pour « frontenac » (1 attendu)`);
  await page.locator(".search-field input").fill("");

  console.error("[verify] interaction 6");
  // 5. Filtre de catégorie → les marqueurs hors catégorie s'estompent.
  await page.locator(".category-chip", { hasText: "Musées" }).click();
  await page.waitForTimeout(300);
  const dimmedCount = await page.locator(".map-marker.is-dimmed").count();
  assert(dimmedCount >= 10, `filtres: ${dimmedCount} marqueurs estompés (≥ 10 attendus)`);

  console.error("[verify] interaction 7");
  // 6. Retour à la vue d'ensemble via la bascule d'en-tête.
  await page.locator(".view-switch button", { hasText: "Vieux-Québec" }).click();
  await page.waitForSelector("svg.old-quebec-map", { timeout: 5000 });
  await page.waitForTimeout(500);
  await page.screenshot({ path: outPath("interactions.png"), fullPage: true });

  console.error("[verify] interaction 8");
  // 7. Visite express → première étape, étape suivante, fermeture.
  await page.locator(".tour-start-button").click();
  await page.waitForTimeout(500);
  const tourTitle = await page.locator(".place-panel h2").innerText();
  assert(tourTitle.includes("Château Frontenac"), "visite: la première étape devrait sélectionner le Château Frontenac");
  await page.locator(".tour-next").click();
  await page.waitForTimeout(500);
  const tourSecondTitle = await page.locator(".place-panel h2").innerText();
  assert(tourSecondTitle.includes("Terrasse Dufferin"), "visite: Suivant devrait sélectionner la Terrasse Dufferin");
  await page.screenshot({ path: outPath("visite.png"), fullPage: true });
  await page.getByLabel("Fermer la visite").click();
  await page.waitForTimeout(200);
  const tourClosed = await page.locator(".tour-bar").count();
  assert(tourClosed === 0, "visite: la barre devrait disparaître après fermeture");

  await page.close();

  return { zoomTransform, afterPan, placeTitle, oldQuebecMarkers, filteredCount, dimmedCount, tourTitle };
}

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({
  executablePath: chromePath,
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

try {
  const desktop = await verifyViewport(browser, "desktop", { width: 1440, height: 1000 });
  const compact = await verifyViewport(browser, "compact", { width: 1180, height: 800 });
  const mobile = await verifyViewport(browser, "mobile", { width: 390, height: 900 });
  const interactions = await verifyInteractions(browser);

  console.log(
    JSON.stringify(
      {
        ok: true,
        url,
        screenshots: [
          "verification/desktop.png",
          "verification/desktop-carte.png",
          "verification/compact.png",
          "verification/compact-carte.png",
          "verification/mobile.png",
          "verification/mobile-carte.png",
          "verification/vieux-quebec.png",
          "verification/vieux-quebec-carte.png",
          "verification/interactions.png",
          "verification/ville-zoom.png",
          "verification/visite.png",
        ],
        desktop,
        compact,
        mobile,
        interactions,
      },
      null,
      2,
    ),
  );
} finally {
  await browser.close();
}
