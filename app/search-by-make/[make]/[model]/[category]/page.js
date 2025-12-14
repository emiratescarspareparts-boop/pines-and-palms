import React from "react";
import { promises as fs } from "fs";
import path from "path";
import { notFound } from "next/navigation";
import ProductFilter from "./ProductFilter";
import productsFile from "../../../../../public/products.json";
import GetInTouchForm from "../../../../../components/GetInTouchForm";

async function loadJSON(relPath) {
    const full = path.join(process.cwd(), relPath);
    const data = await fs.readFile(full, "utf8");
    return JSON.parse(data);
}

async function getMakeImage(make, model) {
    try {
        const data = await loadJSON("public/lib/car-data.json");

        const filtered = data.filter(
            (i) =>
                i.make.toLowerCase() === make.toLowerCase() &&
                i.model.toLowerCase() === model.toLowerCase()
        );

        const unique = [
            ...new Map(filtered.map((i) => [i.img, i])).values(),
        ];

        return unique.map((i) => i.img);
    } catch (err) {
        return [];
    }
}

export async function generateMetadata({ params }) {
    const make = decodeURIComponent(params.make);
    const model = decodeURIComponent(params.model);
    const category = decodeURIComponent(params.category);

    const images = await getMakeImage(make, model);

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

export default async function CategoryPage({ params, searchParams }) {
    const make = decodeURIComponent(params.make);
    const model = decodeURIComponent(params.model);
    const category = decodeURIComponent(params.category);

    const partsData = await loadJSON("public/lib/parts.json");

    const normalize = (x) =>
        x?.toLowerCase().replace(/\s+/g, " ").trim() || "";

    const productMatches = productsFile.filter((p) => {
        const matchCompat = p.compatibility?.some(
            (c) =>
                normalize(c.make) === normalize(make) &&
                normalize(c.model) === normalize(model)
        );

        return (
            matchCompat &&
            normalize(p.category) === normalize(category)
        );
    });

    if (!productMatches || productMatches.length === 0) {
        notFound();
    }

    const genericParts = partsData.filter(
        (p) => normalize(p.category) === normalize(category)
    );

    // If no products found but generic exists → show generic category list
    const finalData =
        productMatches.length > 0
            ? productMatches
            : genericParts.length > 0
                ? genericParts
                : [];

    if (finalData.length === 0) {
        return notFound()
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