// scripts/generate-middleware-lookup.mjs
//
// Generates lib/middleware-lookup.js
// Run:   node scripts/generate-middleware-lookup.mjs
// Hook:  "prebuild": "node scripts/generate-middleware-lookup.mjs"
//
// Builds:
//   VALID_MAKES     → Set<string>  lowercase non-excluded makes from CarData
//   MODEL_INDEX     → "make_lc|model_lc" → 1 (seo:true) | 0 (seo:false)
//   PRODUCT_COMBOS  → Set<string>  "make_lc|model_lc|category_lc|subcat_lc"
//   PRODUCT_IDS     → Map<number, { makeLc, modelLc }>
//                     Used by Pattern E (slug route) to validate:
//                       - product id exists
//                       - make+model in the URL matches the product's compatibility

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

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
const validMakes = new Set();
for (const car of CarData) {
    const make = car.make?.trim();
    if (make && !EXCLUDED_MAKES.has(make)) validMakes.add(make.toLowerCase());
}

// ── 2. MODEL_INDEX ────────────────────────────────────────────────────────────
const modelIndex = {};
for (const car of CarData) {
    const make = car.make?.trim();
    const model = car.model?.trim();
    if (!make || !model || EXCLUDED_MAKES.has(make)) continue;
    const key = `${make.toLowerCase()}|${model.toLowerCase()}`;
    if (modelIndex[key] === undefined) modelIndex[key] = car.seo ? 1 : 0;
    else if (!modelIndex[key] && car.seo) modelIndex[key] = 1;
}

// ── 3. PRODUCT_COMBOS ─────────────────────────────────────────────────────────
// "make_lc|model_lc|category_lc|subcategory_lc" — pages saved by a product match
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

// ── 4. PRODUCT_IDS ────────────────────────────────────────────────────────────
// Mirrors Pattern E (slug) page logic:
//   const id = Number(slug.split("-").pop())
//   const product = products.find(p => p.id === id)       → if !product: notFound
//   const compat  = product.compatibility?.find(           → if !compat:  notFound
//     c => c.make === make && c.model === model
//   )
//
// We store: id → Set of "make_lc|model_lc" that are valid for this product.
// Middleware checks: id exists AND "make_lc|model_lc" is in the product's set.
//
// Format in output: { [id]: ["make_lc|model_lc", ...] }
// We use an object (not Map) so it JSON-serialises cleanly.

const productIds = {};
for (const product of productsFile) {
    if (!product.id || !product.compatibility) continue;
    const combos = product.compatibility
        .filter(c => c.make?.trim() && c.model?.trim())
        .map(c => `${c.make.trim().toLowerCase()}|${c.model.trim().toLowerCase()}`);

    if (combos.length > 0) {
        productIds[product.id] = combos;
    }
}

// ── Write output ──────────────────────────────────────────────────────────────
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
//   Product IDs     : ${Object.keys(productIds).length}

export const VALID_MAKES    = new Set(${JSON.stringify([...validMakes])});
export const MODEL_INDEX    = ${JSON.stringify(modelIndex)};
export const PRODUCT_COMBOS = new Set(${JSON.stringify([...productCombos])});
export const PRODUCT_IDS    = ${JSON.stringify(productIds)};
`;

writeFileSync(join(__dirname, '../lib/middleware-lookup.js'), output, 'utf8');

const kb = (Buffer.byteLength(output) / 1024).toFixed(1);
console.log('\n── generate-middleware-lookup ───────────────────────');
console.log(`  Output         : lib/middleware-lookup.js (${kb} KB)`);
console.log(`  Valid makes    : ${validMakes.size}`);
console.log(`  Models         : ${Object.keys(modelIndex).length}`);
console.log(`  Product combos : ${productCombos.size}`);
console.log(`  Product IDs    : ${Object.keys(productIds).length}`);
console.log('─────────────────────────────────────────────────────\n');
