// scripts/generate-middleware-lookup.mjs
//
// PURPOSE:
//   Reads your raw data files and produces lib/middleware-lookup.js —
//   a tiny pre-computed file (~30-60KB) that middleware.js imports at
//   runtime instead of loading the full 818KB CarData on every cold start.
//
// HOW TO RUN:
//   node scripts/generate-middleware-lookup.mjs
//
// WHEN TO RUN:
//   Before every deployment. Add to package.json:
//   "prebuild": "node scripts/generate-middleware-lookup.mjs"
//   Vercel runs prebuild automatically before `next build`.

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── Load raw data files ───────────────────────────────────────────────────────
// Adjust these paths if your files live elsewhere
const CarData = JSON.parse(readFileSync(join(__dirname, '../public/lib/car-data.json'), 'utf8'));
const productsFile = JSON.parse(readFileSync(join(__dirname, '../public/products.json'), 'utf8'));

const EXCLUDED_MAKES = new Set([
    'Buick', 'Eagle', 'Lotus', 'Plymouth', 'Pontiac', 'Saab', 'Subaru',
    'Alfa Romeo', 'Geo', 'Oldsmobile', 'Isuzu', 'Saturn', 'Corbin', 'Holden',
    'Spyker', 'Spyker Cars', 'Aston Martin', 'Panoz', 'Foose', 'Morgan', 'Aptera',
    'Smart', 'SRT', 'Roush Performance', 'Pagani', 'Mobility Ventures LLC',
    'RUF Automobile', 'Koenigsegg', 'Karma', 'Polestar', 'STI', 'Kandi', 'Abarth',
    'Dorcen', 'Foton', 'W Motors', 'Opel', 'Skoda', 'Hillman', 'Austin', 'Fillmore',
    'Maybach', 'Merkur', 'Rambler', 'Shelby', 'Studebaker', 'Great Wall GWM',
    'Zeekr', 'ZNA', 'GAC', 'Gs7', 'Hongqi', 'W Motor', 'JAC', 'Jaecoo', 'Jetour',
    'TANK', 'Soueast', 'Zarooq Motors', 'Changan', 'Maxus', 'Haval', 'Zotye',
    'Sandstorm', 'Chery', 'Geely', 'BAIC', 'Bestune',
]);

// ── 1. VALID_MAKES ────────────────────────────────────────────────────────────
// Lowercase set of makes that exist in CarData and are NOT excluded.
// Used by middleware to 410 unknown or excluded makes instantly.

const validMakes = new Set();

for (const car of CarData) {
    const make = car.make?.trim();
    if (make && !EXCLUDED_MAKES.has(make)) {
        validMakes.add(make.toLowerCase());
    }
}

// ── 2. MODEL_INDEX ────────────────────────────────────────────────────────────
// Maps "make_lc|model_lc" → 1 (seo: true) or 0 (seo: false).
// Only contains non-excluded makes.
// One seo:true row anywhere for that make+model wins over all seo:false rows.
// Mirrors: CarData.some(car => car.make === make && car.model === model && car.seo === true)

const modelIndex = {};

for (const car of CarData) {
    const make = car.make?.trim();
    const model = car.model?.trim();
    if (!make || !model || EXCLUDED_MAKES.has(make)) continue;

    const key = `${make.toLowerCase()}|${model.toLowerCase()}`;
    if (modelIndex[key] === undefined) {
        modelIndex[key] = car.seo ? 1 : 0;
    } else if (!modelIndex[key] && car.seo) {
        modelIndex[key] = 1; // upgrade to true — one seo:true wins
    }
}

// ── 3. PRODUCT_COMBOS ─────────────────────────────────────────────────────────
// Set of "make_lc|model_lc|category_lc|subcategory_lc" keys for every
// make+model+category+subcategory combination that has a real product.
//
// Mirrors this page logic:
//   const matchingProducts = productsFile.filter(product =>
//     product.category === category &&
//     product.subcategory === subcategory &&
//     product.compatibility?.some(c => c.make === make && c.model === model)
//   )
//   if (!shouldRender && matchingProducts.length === 0) notFound()
//
// A product match saves the page from 404 even when shouldRender is false.
// Middleware must NOT 410 these — pass them through to the page.

const productCombos = new Set();

for (const product of productsFile) {
    if (!product.compatibility || !product.category || !product.subcategory) continue;

    const catLc = product.category.toLowerCase();
    const subLc = product.subcategory.toLowerCase();

    for (const compat of product.compatibility) {
        const make = compat.make?.trim();
        const model = compat.model?.trim();
        if (!make || !model) continue;
        productCombos.add(`${make.toLowerCase()}|${model.toLowerCase()}|${catLc}|${subLc}`);
    }
}

// ── Write output ──────────────────────────────────────────────────────────────

// Ensure lib/ directory exists
mkdirSync(join(__dirname, '../lib'), { recursive: true });

const output = `// !! AUTO-GENERATED — do not edit manually !!
// Regenerate: node scripts/generate-middleware-lookup.mjs
// Generated:  ${new Date().toISOString()}
//
// Stats:
//   CarData entries : ${CarData.length}
//   Valid makes     : ${validMakes.size}
//   Model entries   : ${Object.keys(modelIndex).length}
//   Product combos  : ${productCombos.size}

export const VALID_MAKES    = new Set(${JSON.stringify([...validMakes])});
export const MODEL_INDEX    = ${JSON.stringify(modelIndex)};
export const PRODUCT_COMBOS = new Set(${JSON.stringify([...productCombos])});
`;

const outPath = join(__dirname, '../lib/middleware-lookup.js');
writeFileSync(outPath, output, 'utf8');

const kb = (Buffer.byteLength(output) / 1024).toFixed(1);

console.log('\n── generate-middleware-lookup ───────────────────────');
console.log(`  Output   : lib/middleware-lookup.js  (${kb} KB)`);
console.log(`  Makes    : ${validMakes.size}`);
console.log(`  Models   : ${Object.keys(modelIndex).length}`);
console.log(`  Products : ${productCombos.size} combos`);
console.log('─────────────────────────────────────────────────────\n');
