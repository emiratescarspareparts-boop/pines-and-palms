import React from "react";
import { notFound } from "next/navigation";
import productsFile from "../../../../../public/products.json";
import CarData from "../../../../../public/lib/car-data.json"
export const revalidate = 86400;
export const runtime = 'nodejs';
export const dynamicParams = false;

const excludedMakes = [
    'Buick', 'Eagle', 'Lotus', 'Plymouth', 'Pontiac', 'Saab', 'Subaru',
    'Alpha Romeo', 'Geo', 'Oldsmobile', 'Isuzu', 'Saturn', 'Corbin', 'Holden',
    'Spyker', 'Spyker Cars', 'Aston Martin', 'Panoz', 'Foose', 'Morgan', 'Aptera',
    'Smart', 'SRT', 'Roush Performance', 'Pagani', 'Mobility Ventures LLC',
    'RUF Automobile', 'Koenigsegg', 'Karma', 'Polestar', 'STI', 'Kandi', 'Abarth',
    'Dorcen', 'Foton', 'W Motors', 'Opel', 'Skoda', 'Hillman', 'Austin', 'Fillmore',
    'Maybach', 'Merkur', 'Rambler', 'Shelby', 'Studebaker', 'Great Wall GWM', 'Zeekr', 'ZNA', 'GAC', 'Gs7', 'Hongqi',
    'W Motor', 'JAC', 'Jaecoo', 'Jetour', 'TANK', 'Soueast', 'Zarooq Motors', 'Changan', 'Maxus', 'Haval', 'Zotye', 'Sandstorm',
    'Chery', 'Geely', 'BAIC', 'Bestune'
];

const excludedMakesSet = new Set(excludedMakes);


function getMakeImage(make, model) {
    try {
        const seenImages = {};
        const result = [];

        const makeLower = make.toLowerCase();
        const modelLower = model.toLowerCase();

        for (let i = 0; i < CarData.length; i++) {
            const item = CarData[i];

            if (!item.make || !item.model || !item.img) continue;

            if (
                item.make.toLowerCase() === makeLower &&
                item.model.toLowerCase() === modelLower
            ) {
                if (!seenImages[item.img]) {
                    seenImages[item.img] = true;
                    result.push(item.img);
                }
            }
        }

        return result;
    } catch (err) {
        return [];
    }
}



export function generateMetadata({ params }) {
    const make = decodeURIComponent(params.make);
    const model = decodeURIComponent(params.model);
    const category = decodeURIComponent(params.category);

    const images = getMakeImage(make, model);

    return {
        title: `${make} ${model} ${category} | EMIRATESCAR`,
        description: `Buy ${category} for ${make} ${model} in UAE.`,
        openGraph: {
            title: `${make} ${model} ${category}`,
            description: `Order ${category} for ${make} ${model} in UAE.`,
            images: [
                `https://www.emirates-car.com/img/car-logos/${images?.[0] || "default.png"}`,
            ],
            url: `https://www.emirates-car.com/search-by-make/${make}/${model}/${category}`,
            siteName: "EMIRATESCAR",
        },
        alternates: {
            canonical: `https://www.emirates-car.com/search-by-make/${make}/${model}/${category}`,
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                noimageindex: false,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
    };
}

export default function CategoryPage({ params, searchParams }) {
    const make = decodeURIComponent(params.make);
    const model = decodeURIComponent(params.model);
    const category = decodeURIComponent(params.category);

    const partsData = loadJSON("public/lib/parts.json");

    function normalize(x) {
        return x ? x.toLowerCase().replace(/\s+/g, " ").trim() : "";
    }

    const productMatches = [];

    for (let i = 0; i < productsFile.length; i++) {
        const p = productsFile[i];

        if (!p || !p.compatibility) continue;

        let matchCompat = false;

        for (let j = 0; j < p.compatibility.length; j++) {
            const c = p.compatibility[j];

            if (
                normalize(c.make) === normalize(make) &&
                normalize(c.model) === normalize(model)
            ) {
                matchCompat = true;
                break;
            }
        }

        if (
            matchCompat &&
            normalize(p.category) === normalize(category)
        ) {
            productMatches.push(p);
        }
    }

    if (productMatches.length === 0) {
        notFound();
    }

    const genericParts = [];

    for (let i = 0; i < partsData.length; i++) {
        const p = partsData[i];

        if (normalize(p.category) === normalize(category)) {
            genericParts.push(p);
        }
    }

    let finalData = [];

    if (productMatches.length > 0) {
        finalData = productMatches;
    } else if (genericParts.length > 0) {
        finalData = genericParts;
    }

    if (finalData.length === 0) {
        return notFound();
    }

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <header>
                <h1 className="text-2xl font-bold mb-6 capitalize">
                    {make} {model} – {category.replace(/-/g, " ")}
                </h1>

                <p className="text-gray-600 mb-4">
                    Showing available {category} parts for {make} {model}.
                </p>
            </header>



            {productMatches.length === 0 && (
                <ul className="mt-6 grid gap-4">
                    {genericParts.map((p) => (
                        <li
                            key={p.id}
                            className="border p-4 rounded shadow bg-white"
                        >
                            <h2 className="font-semibold">{p.parts}</h2>
                            {p.description && (
                                <p className="text-gray-600 text-sm">
                                    {p.description}
                                </p>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}