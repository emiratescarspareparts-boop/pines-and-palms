// scripts/generate-robots.mjs
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CarData = JSON.parse(readFileSync(join(__dirname, '../public/lib/car-data.json'), 'utf8'));

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

// ── Fix: track original casing directly — no split/lookup needed ──────────────
// "make|model" → { make, model, seo }  (original casing preserved)
const modelMap = new Map();

for (const car of CarData) {
    const make = car.make?.trim();
    const model = car.model?.trim();
    if (!make || !model || EXCLUDED_MAKES.has(make)) continue;

    // Use lowercase key for deduplication
    const key = `${make.toLowerCase()}|||${model.toLowerCase()}`;
    const current = modelMap.get(key);

    if (!current) {
        // Store original casing alongside seo flag
        modelMap.set(key, { make, model, seo: !!car.seo });
    } else if (!current.seo && car.seo) {
        // One seo:true wins — upgrade
        modelMap.set(key, { make, model, seo: true });
    }
}

// ── Generate Disallow lines for seo:false models ──────────────────────────────
const disallowLines = [];

for (const { make, model, seo } of modelMap.values()) {
    if (seo) continue; // seo:true → valid pages → skip
    disallowLines.push(
        `Disallow: /search-by-make/${encodeURIComponent(make)}/${encodeURIComponent(model)}/`
    );
}

disallowLines.sort();

console.log(`seo:false models (not excluded): ${disallowLines.length}`);
console.log('Sample lines:');
console.log(disallowLines.slice(0, 5).join('\n'));

const output = [
    '# ── Models with seo:false — no valid subcategory pages exist ────────────────',
    ...disallowLines,
].join('\n');

writeFileSync(join(__dirname, '../robots-seo-false.txt'), output, 'utf8');
console.log(`\nWritten to robots-seo-false.txt`);