import CarData from "../../public/lib/car-data.json";
import partsData from "../../public/lib/filteredparts.json";

const excludedMakes = [
    'Buick', 'Eagle', 'Lotus', 'Plymouth', 'Pontiac', 'Saab', 'Subaru',
    'Alfa Romeo', 'Geo', 'Oldsmobile', 'Isuzu', 'Saturn', 'Corbin', 'Holden',
    'Spyker', 'Spyker Cars', 'Aston Martin', 'Panoz', 'Foose', 'Morgan', 'Aptera',
    'Smart', 'SRT', 'Roush Performance', 'Pagani', 'Mobility Ventures LLC',
    'RUF Automobile', 'Koenigsegg', 'Karma', 'Polestar', 'STI', 'Kandi', 'Abarth',
    'Dorcen', 'Foton', 'W Motors', 'Opel', 'Skoda', 'Hillman', 'Austin', 'Fillmore',
    'Maybach', 'Merkur', 'Rambler', 'Shelby', 'Studebaker', 'Great Wall GWM', 'Zeekr',
    'ZNA', 'GAC', 'Gs7', 'Hongqi', 'W Motor', 'JAC', 'Jaecoo', 'Jetour', 'TANK',
    'Soueast', 'Zarooq Motors', 'Changan', 'Maxus', 'Haval', 'Zotye', 'Sandstorm',
    'Chery', 'Geely', 'BAIC', 'Bestune'
];


const selectedParts = [
    "AC Compressor", "AC Condenser", "AC Evaporator",
    "Air Bag Assembly", "Anti-Lock Brake Control Module (ABS)", "Axle Assembly", "Axle Shaft",
    "Brake Booster", "Bumpers", "Accessories", "Body Kits", "Camshaft", "Carburetor",
    "Catalytic Convertor", "Body Control Module (BCM)", "Coil (Ignition)",
    "Cooling Fans Assembly (Rad. & Cond.)", "Crankshaft", "Cylinder Head", "Dashboard Assembly",
    "Differential Assembly", "Engine Assembly", "Engine Mount", "Exhaust Manifold",
    "Fender (Front)", "Fender (Rear)", "Flywheel", "Fog Light", "Fuel Injection Pump",
    "Fuel Pump", "Grille", "Gearbox", "Headlight Assembly", "Speedometer Cluster",
    "Intake Manifold", "Lower Control Arm", "Upper Control Arm", "Master Cylinder", "Mirrors",
    "Oil Pump", "Piston", "Steering Box", "Radiator", "Steering Wheel", "Spoiler", "Starter",
    "Suspension", "Taillight", "Throttle Body Assembly", "Turbocharger", "Water Pump", "Wheel",
    "Brake Disc", "Bonnet", "Engine Gasket", "Shock Absorber"
];

export default function SitemapRender() {
    const make = "Mercedes-Benz"; // Change this to any make you want

    const selectedPartsSet = new Set(selectedParts.map(p => p.toLowerCase()));

    // Filter parts that are in selectedParts
    const filteredParts = partsData.filter(part =>
        selectedPartsSet.has(part.parts.toLowerCase())
    );

    // Get unique models for the specific make
    const uniqueModels = new Set();
    const models = [];

    CarData.forEach(car => {
        if (car.make === make && car.model && !uniqueModels.has(car.model)) {
            uniqueModels.add(car.model);
            models.push(car.model);
        }
    });

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Sitemap URLs for {make}</h1>
            <p className="mb-2">Total Models: {models.length}</p>
            <p className="mb-4">Total URLs: {models.length * filteredParts.length}</p>
            <ul className="space-y-1">
                {models.map((model, modelIndex) => (
                    filteredParts.map((part, partIndex) => (
                        <li key={`${modelIndex}-${partIndex}`} className="text-sm break-all">
                            {`<url><loc>https://www.emirates-car.com/search-by-make/${encodeURIComponent(make)}/${encodeURIComponent(model)}/${encodeURIComponent(part.category)}/${encodeURIComponent(part.parts)}</loc><lastmod>2026-02-09T12:45:55.555Z</lastmod><changefreq>weekly</changefreq></url>`}
                        </li>
                    ))
                ))}
            </ul>
        </div>
    );
}