import { notFound } from "next/navigation";
import products from "../../../../../../../public/products.json";
import PartInquiryForm from "./PartInquiryForm";
import ProductTabs from "./ProductTabs";
import { Fira_Sans, Poppins, Roboto } from 'next/font/google';
import SearchBar from "../../../../../../catalogs/SearchBar";
export const revalidate = 86400;
export const runtime = 'nodejs';
export const fetchCache = 'force-cache';
export const dynamicParams = false;

const roboto = Roboto({
    subsets: ['latin'],
    weight: ['400', '700'],
    style: ['normal', 'italic'],
    display: 'swap',
    variable: '--font-roboto',
});

const firaSans = Fira_Sans({
    weight: ['400', '700'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-fira-sans',
});

const poppins = Poppins({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-poppins',
    weight: ['600'],
});

const excludedMakes = [
    'Buick', 'Eagle', 'Lotus', 'Plymouth', 'Pontiac', 'Saab',
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


export async function generateMetadata({ params }) {

    const { make, model, category, subcategory, slug } = params;
    const id = Number(slug.split("-").pop());

    const product = products.find((p) => p.id === id);
    if (!product) notFound();

    const decodedMake = decodeURIComponent(make);
    const decodedModel = decodeURIComponent(model);

    // ─── yearRange ──────────────────────────────────────────────────
    // Handles: "2016", "2010-2020", mixed array with duplicates
    function yearRange(compatibility, filterMake, filterModel) {
        if (!compatibility?.length) return "";

        const filtered = compatibility.filter(
            (c) =>
                c?.make?.trim().toLowerCase() === filterMake.trim().toLowerCase() &&
                c?.model?.trim().toLowerCase() === filterModel.trim().toLowerCase()
        );

        const entries = filtered.length ? filtered : compatibility;
        const allYears = new Set();

        entries.forEach((c) => {
            const y = c.years?.toString().trim();
            if (!y) return;
            if (y.includes("-")) {
                const [start, end] = y.split("-").map(Number);
                for (let yr = start; yr <= end; yr++) allYears.add(yr);
            } else {
                allYears.add(Number(y));
            }
        });

        if (allYears.size === 0) return "";
        const sorted = [...allYears].sort((a, b) => a - b);
        const first = sorted[0];
        const last = sorted[sorted.length - 1];
        return first === last ? `${first}` : `${first}–${last}`;
    }

    const range = yearRange(product.compatibility, decodedMake, decodedModel);
    const rangeStr = range ? ` (${range})` : "";

    // ─── Availability ───────────────────────────────────────────────
    // Your data uses "Inquire Now" not "In Stock" — map correctly
    const isInStock = product.availability?.toLowerCase() === "in stock";
    const schemaAvailability = isInStock
        ? "https://schema.org/InStock"
        : "https://schema.org/PreOrder"; // PreOrder = available to request, not OutOfStock

    // ─── Shared strings (reused across title/desc/OG/Twitter) ───────
    const oemType = product.item_specifics?.["OEM or Aftermarket"] || "Genuine";
    const condition = product.item_specifics?.Condition || "New";
    const partname = product.partname;
    const partnumber = product.partnumber;
    const brand = product.item_specifics?.Brand || decodedMake;

    const pageTitle = `${decodedMake} ${decodedModel} ${partname}${rangeStr} UAE | Emirates Car`;
    // e.g. "Honda Pilot Steering Rack (2016–2022) UAE | Emirates Car" — 57 chars ✓

    const pageDesc = `${oemType} ${partname} for ${decodedMake} ${decodedModel}${rangeStr}. Part no. ${partnumber}. In stock in UAE — fast delivery to Dubai, Abu Dhabi and Sharjah. Inquire now for price and availability.`;
    // e.g. "Aftermarket Steering Rack for Honda Pilot (2016–2022). Part no. 53400-TG7-A02. In stock in UAE..." ~158 chars ✓

    // ─── Schema ─────────────────────────────────────────────────────
    const now = new Date();
    const endOfYear = new Date(now.getFullYear(), 11, 31).toISOString().split("T")[0];

    const faqSchema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Product",
                "name": `${brand} ${partname} for ${decodedMake} ${decodedModel}${rangeStr}`,
                "category": product.category,
                "mpn": partnumber,
                "sku": product.item_specifics?.sku || String(product.partnumber),
                "brand": {
                    "@type": "Brand",
                    "name": product.item_specifics?.Brand || make
                },
                "image": `https://www.emirates-car.com/${product.image}`,
                "description": `${oemType} ${condition} ${partname} (${partnumber}) for ${decodedMake} ${decodedModel}${rangeStr}. Direct replacement, guaranteed fitment.`,

                "offers": {
                    "@type": "Offer",
                    "url": `https://www.emirates-car.com/search-by-make/${encodeURIComponent(make)}/${encodeURIComponent(model)}/${category}/${subcategory}/${slug}`,
                    "priceCurrency": product.pricing?.currency || "AED",

                    // ── Only include price if real, otherwise omit entirely ──
                    ...(parseFloat(product.pricing?.price) > 100 && {
                        "price": parseFloat(product.pricing?.price),
                        "priceValidUntil": endOfYear,
                    }),

                    "availability": schemaAvailability,
                    "itemCondition": condition === "Used"
                        ? "https://schema.org/UsedCondition"
                        : "https://schema.org/NewCondition",
                    "areaServed": "AE",
                    "shippingDetails": {
                        "@type": "OfferShippingDetails",
                        "shippingDestination": {
                            "@type": "DefinedRegion",
                            "addressCountry": "AE"
                        },
                        "deliveryTime": {
                            "@type": "ShippingDeliveryTime",
                            "handlingTime": {
                                "@type": "QuantitativeValue",
                                "minValue": 0,
                                "maxValue": 1,
                                "unitCode": "DAY"
                            },
                            "transitTime": {
                                "@type": "QuantitativeValue",
                                "minValue": 1,
                                "maxValue": 3,
                                "unitCode": "DAY"
                            }
                        }
                    }
                },
                "additionalProperty": Object.entries({
                    Condition: condition,
                    Warranty: product.item_specifics?.Warranty,
                    "OEM or Aftermarket": oemType,
                    "Fitment Type": product.item_specifics?.["Fitment Type"],
                    "Country/Region of Manufacture": product.item_specifics?.["Country/Region of Manufacture"]
                })
                    .filter(([, v]) => v)
                    .map(([k, v]) => ({
                        "@type": "PropertyValue",
                        "name": k,
                        "value": v
                    })),
                "isRelatedTo": product.compatibility?.slice(0, 5).map((c) => ({
                    "@type": "Product",
                    "name": `${c.make} ${c.model} Parts`,
                    "description": `Compatible with ${c.make} ${c.model} ${c.years}.`
                }))
            },
            {
                "@type": "FAQPage",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": `Can I buy used or aftermarket ${decodedMake} ${decodedModel} ${partname} (${partnumber}) to save costs?`,
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": `Yes, we offer used and aftermarket ${decodedMake} ${decodedModel} ${partname} (${partnumber}) tested for quality and performance. Check the item specifics tab for alternative part numbers.`
                        }
                    },
                    {
                        "@type": "Question",
                        "name": `Do you deliver ${decodedMake} ${decodedModel} ${partname} across UAE?`,
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": `Yes, we deliver ${decodedMake} ${decodedModel} ${partname} (${partnumber}) to Dubai, Abu Dhabi, Sharjah, Ajman and all other Emirates. International shipping is also available on request.`
                        }
                    },
                    {
                        "@type": "Question",
                        "name": `How do I know if ${partname} (${partnumber}) fits my ${decodedMake} ${decodedModel}?`,
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": `Share your car's VIN or full model details when you inquire. We will confirm fitment for ${decodedMake} ${decodedModel}${rangeStr} before processing your order.`
                        }
                    },
                    {
                        "@type": "Question",
                        "name": `Does the ${decodedMake} ${decodedModel} ${partname} (${partnumber}) come with a warranty?`,
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": product.item_specifics?.Warranty ||
                                "Warranty details are available on inquiry. Contact us before purchasing for full warranty information."
                        }
                    }
                ]
            }
        ]
    };

    return {
        title: pageTitle,
        description: pageDesc,

        openGraph: {
            title: pageTitle,
            description: pageDesc,
            url: `https://www.emirates-car.com/search-by-make/${encodeURIComponent(make)}/${encodeURIComponent(model)}/${category}/${subcategory}/${slug}`,
            siteName: "Emirates Car",
            images: [
                {
                    url: `https://www.emirates-car.com/${product.image}`,
                    alt: `${decodedMake} ${decodedModel} ${partname}`,
                },
                {
                    url: "https://www.emirates-car.com/icons/icon-512x512.png",
                    width: 512,
                    height: 512,
                    alt: "Emirates Car spare parts",
                },
            ],
            locale: "en_US",
            type: "website",
        },

        twitter: {
            card: "summary_large_image",
            title: pageTitle,
            description: pageDesc,
            images: [`https://www.emirates-car.com/${product.image}`],
        },

        icons: {
            icon: "https://www.emirates-car.com/icons/favicon-32x32.png",
            shortcut: "https://www.emirates-car.com/icons/icon-96x96.png",
            apple: "https://www.emirates-car.com/icons/icon-192x192.png",
            other: {
                rel: "apple-touch-icon-precomposed",
                url: "https://www.emirates-car.com/icons/icon-152x152.png",
            },
        },

        alternates: {
            canonical: `https://www.emirates-car.com/search-by-make/${encodeURIComponent(make)}/${encodeURIComponent(model)}/${category}/${subcategory}/${slug}`,
        },

        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                noimageindex: false,
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
export async function generateStaticParams() {
    return products
        .flatMap((product) =>
            product.compatibility
                ?.filter((c) => !excludedMakesSet.has(c.make))
                .map((c) => ({
                    make: encodeURIComponent(c.make),
                    model: encodeURIComponent(c.model),
                    category: encodeURIComponent(product.category),
                    subcategory: encodeURIComponent(product.subcategory),
                    slug: `${product.partname}-${c.make}-${c.model}-${c.years}-${product.partnumber}-${product.id}`,
                })) ?? []
        )
        .filter(Boolean);
}



// page.js — server component, no changes to "use client" needed here

export default function ProductPage({ params, searchParams }) {
    const { make, model, category, subcategory, slug } = params;
    const id = Number(slug.split("-").pop());
    const product = products.find((p) => p.id === id);
    if (!product) notFound();

    const compat = product.compatibility?.find(
        (c) =>
            c?.make?.trim().toLowerCase() === decodeURIComponent(params.make).trim().toLowerCase() &&
            c?.model?.trim().toLowerCase() === decodeURIComponent(params.model).trim().toLowerCase()
    );
    if (!compat) notFound();

    const matchingCompats = product.compatibility?.filter(
        (c) =>
            c?.make?.trim().toLowerCase() === decodeURIComponent(params.make).trim().toLowerCase() &&
            c?.model?.trim().toLowerCase() === decodeURIComponent(params.model).trim().toLowerCase()
    );

    const years = [...new Set(matchingCompats?.map(c => c.years))].join(', ');
    const decodedMake = decodeURIComponent(make);
    const decodedModel = decodeURIComponent(model);
    const oemType = product.item_specifics?.["OEM or Aftermarket"] || "Genuine";
    const condition = product.item_specifics?.Condition || "New";

    const otherProducts = products.filter(
        (p) => p.id !== product.id &&
            p.category === product.category &&
            p.compatibility?.some(
                (c) => c.make === decodeURIComponent(make) &&
                    c.model === decodeURIComponent(model)
            )
    ).slice(0, 6);

    return (
        <main className="max-w-5xl mx-auto p-6">
            <SearchBar allProducts={products} searchParams={searchParams} />

            <div
                className="grid xl:grid-cols-2 xxl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 gap-6"
                itemScope
                itemType="https://schema.org/Product"
            >
                {/* Product Image — server rendered, visible to robots */}
                {product.image && (
                    <figure className="mb-4 md:mb-0">
                        <img
                            src={product.image}
                            alt={`${decodedMake} ${decodedModel} ${product.partname}`}
                            className="w-full rounded-lg shadow border"
                            itemProp="image"
                        />
                        <figcaption className="text-sm text-gray-500 text-center mt-2">
                            {product.partname} — {decodedMake} {decodedModel}
                        </figcaption>
                    </figure>
                )}

                {/* Product Info — fully server rendered */}
                <section className="space-y-4">
                    <h1
                        className={`text-3xl font-extrabold my-5 ${poppins.className}`}
                        itemProp="name"
                    >
                        {decodedMake} {decodedModel} {product.partname} ({years})
                    </h1>

                    <p className={`text-green-700 font-semibold ${roboto.className}`}>
                        ✓ Verified fitment
                    </p>

                    {/* ── Static body text for Google confidence ── */}
                    <p className={`text-gray-600 text-sm leading-relaxed ${roboto.className}`}>
                        The {product.partnumber} is a {oemType} {condition.toLowerCase()} {product.partname} for the {decodedMake} {decodedModel} ({years}).
                        Compatible with {decodedMake} {decodedModel} vehicles equipped with a {compat.engine} engine.
                        Available in UAE with fast delivery to Dubai, Abu Dhabi, Sharjah and all other Emirates.
                        We supply both genuine OEM and quality aftermarket alternatives — inquire now and we will confirm stock and pricing within a few hours.
                    </p>

                    <div className={`space-y-1 ${roboto.className}`}>
                        <p className="text-gray-700">
                            <strong>Category: </strong>
                            <span itemProp="category">{product.category}</span>
                        </p>
                        <p className="text-gray-700">
                            <strong>Brand: </strong>
                            <span itemProp="brand">{product.item_specifics.Brand}</span>
                        </p>
                        <p className="text-gray-700" itemProp="mpn">
                            <strong>Part Number: </strong>{product.partnumber}
                        </p>
                        <p className="text-gray-700">
                            <strong>Compatible Years: </strong>{years}
                        </p>
                        <p className="text-gray-700">
                            <strong>Condition: </strong>{condition}
                        </p>

                        {/* ── Availability — server rendered, robot readable ── */}
                        <p className="text-gray-700">
                            <strong>Availability: </strong>
                            <span className="text-green-700 font-semibold">
                                ✓ In Stock — Price on Request
                            </span>
                        </p>

                        <p className="text-gray-700">
                            <strong>Delivery: </strong>
                            {subcategory === 'Battery' ? (
                                <span className="text-red-800 font-extrabold">
                                    Within 4 hours in Dubai and Sharjah
                                </span>
                            ) : (
                                <span>
                                    <a href="/search-by-cities-in-uae/Dubai" className="text-blue-500">Dubai</a>,{" "}
                                    <a href="/search-by-cities-in-uae/Abu%20Dhabi" className="text-blue-500">Abu Dhabi</a>,{" "}
                                    <a href="/search-by-cities-in-uae/Ajman" className="text-blue-500">Ajman</a>,{" "}
                                    <a href="/search-by-cities-in-uae/Sharjah" className="text-blue-500">Sharjah</a>,{" "}
                                    <a href="/search-by-cities-in-uae/Al%20Ain" className="text-blue-500">Al Ain</a>,{" "}
                                    <a href="/search-by-cities-in-uae/Ras%20Al%20Khaimah" className="text-blue-500">Ras Al Khaimah</a>,{" "}
                                    <a href="/search-by-cities-in-uae/Fujairah" className="text-blue-500">Fujairah</a>,{" "}
                                    <a href="/search-by-cities-in-uae/Umm%20al%20Quwain" className="text-blue-500">Umm Al Quwain</a>
                                </span>
                            )}
                        </p>
                        <meta itemProp="brand" content={product.item_specifics.Brand} />
                    </div>

                    {/* ── Price — server rendered ── */}
                    <div
                        itemProp="offers"
                        itemScope
                        itemType="https://schema.org/Offer"
                    >
                        <meta itemProp="priceCurrency" content={product.pricing?.currency || "AED"} />
                        <meta itemProp="price" content={product.pricing?.price} />
                        <meta itemProp="availability" content="https://schema.org/InStock" />
                        <link
                            itemProp="url"
                            href={`https://www.emirates-car.com/search-by-make/${encodeURIComponent(make)}/${encodeURIComponent(model)}/${category}/${subcategory}/${slug}`}
                        />

                        {subcategory !== 'Battery' && product.pricing?.price > 100 && (
                            <p className="text-xl font-semibold text-gray-800">
                                Starting from{" "}
                                <span className="text-black">
                                    {product.pricing?.currency || "AED"}{" "}
                                    {product.pricing?.price?.toLocaleString()}{" "}
                                    <span className="text-sm text-blue-500">(approx. — inquire for final price)</span>
                                </span>
                            </p>
                        )}

                        {/* ── Button — client component, only the interactive part ── */}
                        <PartInquiryForm
                            product={product}
                            make={make}
                            model={model}
                            subcategory={subcategory}
                        />
                    </div>
                </section>
            </div>

            {/* ── Tabs content — NOW SERVER RENDERED, visible to robots ── */}
            <section className="mt-10">
                {/* Compatibility — static HTML, fully crawlable */}
                <StaticCompatibility product={product} />

                {/* Item Specifics — static HTML, fully crawlable */}
                <StaticItemSpecifics product={product} />

                {/* Policies — static HTML, fully crawlable */}
                <StaticPolicies product={product} />

                {/* Interactive tabs still work on top via client component */}
                <ProductTabs product={product} slug={slug} />
            </section>

            {/* Related Products */}
            {otherProducts.length > 0 && (
                <section className="mt-10">
                    <h2 className="text-xl font-semibold mb-4">Other {decodedMake} Products</h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 xxl:grid-cols-3  gap-6">
                        {otherProducts.map((p) => {
                            const compatForMake = p.compatibility.find(c => c.make === make);
                            if (!compatForMake) return null;
                            const otherSlug = `${p.partname}-${compatForMake.make}-${compatForMake.model}-${compatForMake.years}-${p.partnumber}-${p.id}`;
                            return (
                                <li key={p.id} className="border p-3 rounded-lg hover:shadow-md">
                                    <a
                                        href={`/search-by-make/${encodeURIComponent(make)}/${encodeURIComponent(compatForMake.model)}/${encodeURIComponent(p.category)}/${encodeURIComponent(p.subcategory)}/${encodeURIComponent(otherSlug)}`}
                                        className="block"
                                    >
                                        <img
                                            src={p.image}
                                            alt={`${decodedMake} ${compatForMake.model} ${p.partname}`}
                                            className="w-full h-36 object-cover mb-2 rounded"
                                        />
                                        <p className="text-sm font-semibold">{decodedMake} {compatForMake.model} {p.partname}</p>
                                        <p className="text-sm font-bold text-blue-600">
                                            {p.pricing.price > 1
                                                ? `${p.pricing.currency} ${p.pricing.price.toLocaleString()}`
                                                : "Price on Request"
                                            }
                                        </p>
                                        <p className="text-sm text-gray-600">{p.partnumber}</p>
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </section>
            )}
        </main>
    );
}

// ── Fully server-rendered, robot-readable ─────────────────────────────

function StaticCompatibility({ product }) {
    return (
        <div className="mt-6 hidden">
            {/* hidden visually but present in HTML source for robots */}
            <h2 className="text-xl font-semibold mb-2">Compatibility</h2>
            <ul className="list-disc pl-6 space-y-1">
                {product?.compatibility?.map((comp, index) => {
                    const partSlug = `${product.partname}-${comp.make}-${comp.model}-${comp.years}-${product.partnumber}-${product.id}`;
                    return (
                        <li key={index}>
                            <a
                                className="text-blue-700 hover:underline"
                                href={`/search-by-make/${encodeURIComponent(comp.make)}/${encodeURIComponent(comp.model)}/${encodeURIComponent(product.category)}/${encodeURIComponent(product.subcategory)}/${encodeURIComponent(partSlug)}`}
                            >
                                {comp.make} {comp.model} {comp.years} {comp.engine}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

function StaticItemSpecifics({ product }) {
    const specs = product.item_specifics;
    return (
        <div className="mt-6 hidden">
            <h2 className="text-xl font-semibold mb-2">Item Specifics</h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                {specs.sku && <><dt className="font-semibold">SKU</dt><dd>{specs.sku}</dd></>}
                {specs.Brand && <><dt className="font-semibold">Brand</dt><dd>{specs.Brand}</dd></>}
                {specs["Manufacturer Part Number"] && <><dt className="font-semibold">Manufacturer Part Number</dt><dd>{specs["Manufacturer Part Number"]}</dd></>}
                {specs["OEM or Aftermarket"] && <><dt className="font-semibold">OEM or Aftermarket</dt><dd>{specs["OEM or Aftermarket"]}</dd></>}
                {specs["Interchange Part Number"]?.length > 0 && <><dt className="font-semibold">Interchange Part Number</dt><dd>{specs["Interchange Part Number"].join(", ")}</dd></>}
                {specs.Condition && <><dt className="font-semibold">Condition</dt><dd>{specs.Condition}</dd></>}
                {specs.Warranty && <><dt className="font-semibold">Warranty</dt><dd>{specs.Warranty}</dd></>}
                {specs["Country/Region of Manufacture"] && <><dt className="font-semibold">Country of Manufacture</dt><dd>{specs["Country/Region of Manufacture"]}</dd></>}
                {specs["Fitment Type"] && <><dt className="font-semibold">Fitment Type</dt><dd>{specs["Fitment Type"]}</dd></>}
            </dl>
        </div>
    );
}

function StaticPolicies({ product }) {
    return (
        <div className="mt-6 hidden">
            <h2 className="text-xl font-semibold mb-2">Shipping & Delivery</h2>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li><strong>Shipping:</strong> {product.policies.shipping}</li>
                <li><strong>Delivery:</strong> Available to all Emirates — Dubai, Sharjah, Ajman, Abu Dhabi, Al Ain, Fujairah, Umm Al Quwain, Ras Al Khaimah</li>
                <li><strong>Payment Methods:</strong> {product.policies.payment_methods.join(", ")}</li>
            </ul>
        </div>
    );
}



