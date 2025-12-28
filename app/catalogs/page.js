import ProductFilter from "./ProductFilter";
import products from "../../public/products.json";

export const revalidate = 1814400;
export const runtime = "nodejs";
export const dynamicParams = false;

export function generateStaticParams() {
    const params = [];

    for (let i = 0; i < products.length; i++) {
        const p = products[i];

        // You can generate params based on categories, engines, compatibilities
        params.push({ category: p.category });
    }

    // Remove duplicates
    const unique = [];
    for (let i = 0; i < params.length; i++) {
        const exists = unique.find((u) => u.category === params[i].category);
        if (!exists) unique.push(params[i]);
    }

    return unique;
}

export function generateMetadata() {
    const uniqueMakes = [...new Set(products.flatMap(p =>
        p.compatibility?.map(c => c.make) || []
    ))];

    const productListItems = products.map((product, index) => {
        const primaryCompat = product.compatibility?.[0];
        const make = primaryCompat?.make || '';
        const model = primaryCompat?.model || '';

        return {
            "@type": "ListItem",
            "position": index + 1,
            "item": {
                "@type": "Product",
                "@id": `https://www.emirates-car.com/catalogs/${product.category}/${product.partname}-${product.partnumber}-${product.id}#product`,
                "name": `${product.partname} ${product.partnumber} for ${make} ${model}`,
                "url": `https://www.emirates-car.com/catalogs/${product.category}/${product.partname}-${product.partnumber}-${product.id}`,
                "image": `https://www.emirates-car.com${product.image}`,
                "description": `${product.partname} compatible with ${make} ${product.compatibility?.map(c => c.model).join(", ")}`,
                "brand": { "@type": "Brand", "name": primaryCompat?.make || "OEM" },
                "mpn": product.partnumber,
                "offers": {
                    "@type": "Offer",
                    "url": `https://www.emirates-car.com/catalogs/${product.category}/${product.partname}-${product.partnumber}-${product.id}`,
                    "priceCurrency": product.pricing.currency,
                    "price": product.pricing.price,
                    "availability": product.availability === "Inquire Now"
                        ? "https://schema.org/PreOrder"
                        : "https://schema.org/InStock",
                    "itemCondition": "https://schema.org/NewCondition"
                },
                "isAccessoryOrSparePartFor": {
                    "@type": "Car",
                    "name": `${make} ${model}`,
                    "manufacturer": { "@type": "Organization", "name": make },
                    "model": model
                }
            }
        };
    });

    const faqSchema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "CollectionPage",
                "name": "Auto Spare Parts | Emirates Car",
                "url": "https://www.emirates-car.com/catalogs",
                "description": "Find genuine, OEM, and aftermarket spare parts for all car models.",
                "mainEntity": {
                    "@type": "ItemList",
                    "itemListElement": productListItems
                }
            },
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Home",
                        "item": "https://www.emirates-car.com/"
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "Catalogs",
                        "item": "https://www.emirates-car.com/catalogs"
                    }
                ]
            }
        ]
    };

    return {
        title: "Auto Spare Parts Dubai dealers UAE - Used, Genuine, OEM and Aftermarket",
        description: "Find genuine, OEM, used & aftermarket spare parts in Dubai, Sharjah & across the UAE. Get best prices and fast quotes from trusted dealers today.",
        metadataBase: new URL("https://www.emirates-car.com"),
        openGraph: {
            title: "Auto Spare Parts Dubai dealers UAE - Used, Genuine, OEM and Aftermarket",
            description: "Find genuine, OEM, used & aftermarket spare parts in Dubai, Sharjah & across the UAE. Get best prices and fast quotes from trusted dealers today.",
            url: "https://www.emirates-car.com/catalogs",
            image: "https://www.emirates-car.com/img/car-spare-parts.png",
            siteName: "EMIRATESCAR",
            images: [
                "https://www.emirates-car.com/favicon.png",
                {
                    url: "https://www.emirates-car.com/icon-192x192.png",
                    width: 192,
                    height: 192,
                },
                {
                    url: "https://www.emirates-car.com/icons/icon-512x512.png",
                    width: 512,
                    height: 512,
                    alt: "car parts",
                },
            ],
            locale: "en_US",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: "Auto Spare Parts Dubai dealers UAE - Used, Genuine, OEM and Aftermarket | Catalogs | EMIRATESCAR",
            url: "https://www.emirates-car.com/catalogs",
            description: "Find genuine, OEM, used & aftermarket spare parts in Dubai, Sharjah & across the UAE. Get best prices and fast quotes from trusted dealers today.",
            images: ["https://www.emirates-car.com/favicon.png"],
        },
        icons: {
            icon: "https://www.emirates-car.com/favicon.png",
            shortcut: "https://www.emirates-car.com/icons/icon-96x96.png",
            apple: "https://www.emirates-car.com/icons/icon-192x192.png",
            other: {
                rel: "apple-touch-icon-precomposed",
                url: "https://www.emirates-car.com/icons/icon-152x152.png",
            },
        },
        category: "Auto spare parts",
        alternates: {
            canonical: "https://www.emirates-car.com/catalogs",
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                noimageindex: true,
                "max-video-preview": -1,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },
        other: {
            "script:ld+json": JSON.stringify(faqSchema),
        },
    };
}

export default function CatalogPage({ searchParams }) {
    const {
        "filter_car_parts[]": categories = [],
        "engine[]": engines = [],
        "compatibility[]": compats = [],
        search = "",
    } = searchParams;

    // Ensure arrays
    const selectedCategories = Array.isArray(categories)
        ? categories
        : [categories].filter(Boolean);

    const selectedEngines = Array.isArray(engines)
        ? engines
        : [engines].filter(Boolean);

    const selectedCompats = Array.isArray(compats)
        ? compats
        : [compats].filter(Boolean);

    const query = search?.toLowerCase() || "";

    const allProducts = products;
    const filtered = [];

    for (let i = 0; i < allProducts.length; i++) {
        const product = allProducts[i];

        // matchesCategory
        let matchesCategory =
            selectedCategories.length === 0 ||
            selectedCategories.includes(product.category);

        // matchesSearch
        let matchesSearch = false;
        if (!query) {
            matchesSearch = true;
        } else {
            if (
                product.partname?.toLowerCase().includes(query) ||
                (product.partnumber &&
                    product.partnumber.toString().toLowerCase().includes(query))
            ) {
                matchesSearch = true;
            } else if (product.engine) {
                for (let j = 0; j < product.engine.length; j++) {
                    if (product.engine[j].toLowerCase().includes(query)) {
                        matchesSearch = true;
                        break;
                    }
                }
            }

            if (!matchesSearch && product.compatibility) {
                for (let j = 0; j < product.compatibility.length; j++) {
                    const c = product.compatibility[j];
                    const compatString = `${c.make} ${c.model} ${c.years ?? ""}`.toLowerCase();
                    if (compatString.includes(query)) {
                        matchesSearch = true;
                        break;
                    }
                }
            }
        }

        // matchesEngine
        let matchesEngine = false;
        if (selectedEngines.length === 0) {
            matchesEngine = true;
        } else if (product.engine) {
            for (let j = 0; j < product.engine.length; j++) {
                if (selectedEngines.includes(product.engine[j])) {
                    matchesEngine = true;
                    break;
                }
            }
        }

        // matchesCompatibility
        let matchesCompatibility = false;
        if (selectedCompats.length === 0) {
            matchesCompatibility = true;
        } else if (product.compatibility) {
            for (let j = 0; j < product.compatibility.length; j++) {
                const c = product.compatibility[j];
                const compatString = `${c.make} ${c.model} ${c.years ? `(${c.years})` : ""}`;
                if (selectedCompats.includes(compatString)) {
                    matchesCompatibility = true;
                    break;
                }
            }
        }

        if (
            matchesCategory &&
            matchesSearch &&
            matchesEngine &&
            matchesCompatibility
        ) {
            filtered.push(product);
        }
    }

    return (
        <section className="mt-6">
            <ProductFilter
                products={filtered}
                allProducts={allProducts}
                searchParams={searchParams}
            />
        </section>
    );
}