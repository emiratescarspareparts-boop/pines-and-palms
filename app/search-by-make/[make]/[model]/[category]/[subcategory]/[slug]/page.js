import { notFound } from "next/navigation";
import Link from "next/link";
import products from "../../../../../../../public/products.json";
import PartInquiryForm from "./PartInquiryForm";
import ProductTabs from "./ProductTabs";
import { Poppins, Roboto } from "next/font/google";
import SearchBar from "../../../../../../catalogs/SearchBar";

export const revalidate = 86400;
export const runtime = "nodejs";
export const fetchCache = "force-cache";
export const dynamicParams = false;

const roboto = Roboto({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
    style: ["normal", "italic"],
    display: "swap",
    variable: "--font-roboto",
});

const poppins = Poppins({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-poppins",
    weight: ["600"],
});

const excludedMakes = [
    "Buick", "Eagle", "Lotus", "Plymouth", "Pontiac", "Saab",
    "Alpha Romeo", "Geo", "Oldsmobile", "Isuzu", "Saturn", "Corbin", "Holden",
    "Spyker", "Spyker Cars", "Aston Martin", "Panoz", "Foose", "Morgan", "Aptera",
    "Smart", "SRT", "Roush Performance", "Pagani", "Mobility Ventures LLC",
    "RUF Automobile", "Koenigsegg", "Karma", "Polestar", "STI", "Kandi", "Abarth",
    "Dorcen", "Foton", "W Motors", "Opel", "Skoda", "Hillman", "Austin", "Fillmore",
    "Maybach", "Merkur", "Rambler", "Shelby", "Studebaker", "Great Wall GWM", "Zeekr", "ZNA", "GAC", "Gs7", "Hongqi",
    "W Motor", "JAC", "Jaecoo", "Jetour", "TANK", "Soueast", "Zarooq Motors", "Changan", "Maxus", "Haval", "Zotye", "Sandstorm",
    "Chery", "Geely", "BAIC", "Bestune",
];
const excludedMakesSet = new Set(excludedMakes);

/* ───────────────────────── helpers ───────────────────────── */

const SITE = "https://www.emirates-car.com";

const safeDecode = (s = "") => {
    try {
        return decodeURIComponent(s);
    } catch {
        return s;
    }
};
// Works whether Next hands us encoded or decoded params (avoids double-encoding)
const enc = (s) => encodeURIComponent(safeDecode(s));
const norm = (s) => (s || "").toString().trim().toLowerCase();
const imgPath = (img) => (/^https?:/.test(img) ? img : `/${img.replace(/^\//, "")}`);
const imgAbs = (img) => (/^https?:/.test(img) ? img : `${SITE}/${img.replace(/^\//, "")}`);

// Handles "2016", "2010-2020", mixed arrays with duplicates
function yearRange(compatibility, filterMake, filterModel) {
    if (!compatibility?.length) return "";
    const filtered = compatibility.filter(
        (c) => norm(c?.make) === norm(filterMake) && norm(c?.model) === norm(filterModel)
    );
    const entries = filtered.length ? filtered : compatibility;
    const all = new Set();
    entries.forEach((c) => {
        const y = c.years?.toString().trim();
        if (!y) return;
        if (y.includes("-")) {
            const [start, end] = y.split("-").map(Number);
            for (let yr = start; yr <= end; yr++) all.add(yr);
        } else {
            all.add(Number(y));
        }
    });
    if (!all.size) return "";
    const sorted = [...all].sort((a, b) => a - b);
    const first = sorted[0];
    const last = sorted[sorted.length - 1];
    return first === last ? `${first}` : `${first}–${last}`;
}

// Single source of truth used by generateMetadata AND the page
function getContext(params) {
    const { make, model, category, subcategory, slug } = params;
    const id = Number(slug.split("-").pop());
    const product = products.find((p) => p.id === id);
    if (!product) notFound();

    const decodedMake = safeDecode(make);
    const decodedModel = safeDecode(model);
    const decodedCategory = safeDecode(category);
    const decodedSubcategory = safeDecode(subcategory);

    const matchingCompats = (product.compatibility || []).filter(
        (c) => norm(c?.make) === norm(decodedMake) && norm(c?.model) === norm(decodedModel)
    );
    if (!matchingCompats.length) notFound();
    const compat = matchingCompats[0];

    const years = [...new Set(matchingCompats.map((c) => c.years))].join(", ");
    const range = yearRange(product.compatibility, decodedMake, decodedModel);
    const rangeStr = range ? ` (${range})` : "";

    const specs = product.item_specifics || {};
    const oemType = specs["OEM or Aftermarket"] || "Genuine";
    const condition = specs.Condition || "New";
    const brand = specs.Brand || decodedMake;

    const pageUrl = `${SITE}/search-by-make/${enc(make)}/${enc(model)}/${enc(category)}/${enc(subcategory)}/${enc(slug)}`;

    return {
        product, specs, compat, years, range, rangeStr,
        make, model, category, subcategory, slug,
        decodedMake, decodedModel, decodedCategory, decodedSubcategory,
        oemType, condition, brand, pageUrl,
        partname: product.partname,
        partnumber: product.partnumber,
    };
}

function buildFaqs(c) {
    const { decodedMake: mk, decodedModel: md, partname, partnumber, rangeStr, specs } = c;
    return [
        {
            q: `Can I buy used or aftermarket ${mk} ${md} ${partname} (${partnumber}) to save costs?`,
            a: `Yes, we offer used and aftermarket ${mk} ${md} ${partname} (${partnumber}) tested for quality and performance. Check the item specifics section for alternative part numbers.`,
        },
        {
            q: `Do you deliver ${mk} ${md} ${partname} across UAE?`,
            a: `Yes, we deliver ${mk} ${md} ${partname} (${partnumber}) to Dubai, Abu Dhabi, Sharjah, Ajman and all other Emirates. International shipping is also available on request.`,
        },
        {
            q: `How do I know if ${partname} (${partnumber}) fits my ${mk} ${md}?`,
            a: `Share your car's VIN or full model details when you inquire. We will confirm fitment for ${mk} ${md}${rangeStr} before processing your order.`,
        },
        {
            q: `Does the ${mk} ${md} ${partname} (${partnumber}) come with a warranty?`,
            a:
                specs.Warranty ||
                "Warranty details are available on inquiry. Contact us before purchasing for full warranty information.",
        },
    ];
}

function buildJsonLd(c, faqs, crumbs) {
    const { product, specs, decodedMake, decodedModel, partname, partnumber, rangeStr, oemType, condition, brand, pageUrl } = c;

    const isInStock = product.availability?.toLowerCase() === "in stock";
    const availability = isInStock ? "https://schema.org/InStock" : "https://schema.org/PreOrder";
    const endOfYear = new Date(new Date().getFullYear(), 11, 31).toISOString().split("T")[0];
    const price = parseFloat(product.pricing?.price);

    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Product",
                "@id": `${pageUrl}#product`,
                name: `${brand} ${partname} for ${decodedMake} ${decodedModel}${rangeStr}`,
                url: pageUrl,
                category: product.category,
                mpn: partnumber,
                sku: specs.sku || String(partnumber),
                brand: { "@type": "Brand", name: brand },
                ...(product.image && { image: imgAbs(product.image) }),
                description: `${oemType} ${condition} ${partname} (${partnumber}) for ${decodedMake} ${decodedModel}${rangeStr}. Direct replacement, guaranteed fitment.`,
                offers: {
                    "@type": "Offer",
                    url: pageUrl,
                    priceCurrency: product.pricing?.currency || "AED",
                    // Only include price when it is real
                    ...(price > 100 && { price, priceValidUntil: endOfYear }),
                    availability,
                    itemCondition:
                        condition === "Used" ? "https://schema.org/UsedCondition" : "https://schema.org/NewCondition",
                    areaServed: "AE",
                    shippingDetails: {
                        "@type": "OfferShippingDetails",
                        shippingDestination: { "@type": "DefinedRegion", addressCountry: "AE" },
                        deliveryTime: {
                            "@type": "ShippingDeliveryTime",
                            handlingTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 1, unitCode: "DAY" },
                            transitTime: { "@type": "QuantitativeValue", minValue: 1, maxValue: 3, unitCode: "DAY" },
                        },
                    },
                },
                additionalProperty: Object.entries({
                    Condition: condition,
                    Warranty: specs.Warranty,
                    "OEM or Aftermarket": oemType,
                    "Fitment Type": specs["Fitment Type"],
                    "Country/Region of Manufacture": specs["Country/Region of Manufacture"],
                })
                    .filter(([, v]) => v)
                    .map(([k, v]) => ({ "@type": "PropertyValue", name: k, value: v })),
            },
            {
                "@type": "BreadcrumbList",
                itemListElement: crumbs.map((cr, i) => ({
                    "@type": "ListItem",
                    position: i + 1,
                    name: cr.name,
                    item: cr.href ? `${SITE}${cr.href}` : pageUrl,
                })),
            },
            {
                "@type": "FAQPage",
                mainEntity: faqs.map((f) => ({
                    "@type": "Question",
                    name: f.q,
                    acceptedAnswer: { "@type": "Answer", text: f.a },
                })),
            },
        ],
    };
}

/* ───────────────────────── metadata (rendered in <head>) ───────────────────────── */

export async function generateMetadata({ params }) {
    const c = getContext(params);
    const { product, decodedMake, decodedModel, partname, partnumber, rangeStr, oemType, pageUrl } = c;

    const title = `${decodedMake} ${decodedModel} ${partname}${rangeStr} Price UAE | Emirates Car`;
    const description = `${oemType} ${partname} for ${decodedMake} ${decodedModel}${rangeStr}. Part no. ${partnumber}. In stock in UAE — fast delivery to Dubai, Sharjah, Abu Dhabi, Ras Al Khaimah, and Fujairah. Inquire now for price and availability.`;
    const productImage = product.image ? imgAbs(product.image) : `${SITE}/icons/icon-512x512.png`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url: pageUrl,
            siteName: "Emirates Car",
            images: [
                { url: productImage, alt: `${decodedMake} ${decodedModel} ${partname}` },
                { url: `${SITE}/icons/icon-512x512.png`, width: 512, height: 512, alt: "Emirates Car spare parts" },
            ],
            locale: "en_US",
            type: "website",
        },
        twitter: { card: "summary_large_image", title, description, images: [productImage] },
        icons: {
            icon: `${SITE}/icons/favicon-32x32.png`,
            shortcut: `${SITE}/icons/icon-96x96.png`,
            apple: `${SITE}/icons/icon-192x192.png`,
            other: { rel: "apple-touch-icon-precomposed", url: `${SITE}/icons/icon-152x152.png` },
        },
        alternates: { canonical: pageUrl },
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
        // NOTE: JSON-LD is NOT placed here — `other` only renders <meta> tags.
        // It is rendered as a real <script type="application/ld+json"> in the page body below.
    };
}

export async function generateStaticParams() {
    return products
        .flatMap(
            (product) =>
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

/* ───────────────────────── page ───────────────────────── */

const CITIES = [
    ["Dubai", "Dubai"],
    ["Abu Dhabi", "Abu%20Dhabi"],
    ["Sharjah", "Sharjah"],
    ["Ajman", "Ajman"],
    ["Al Ain", "Al%20Ain"],
    ["Ras Al Khaimah", "Ras%20Al%20Khaimah"],
    ["Fujairah", "Fujairah"],
    ["Umm Al Quwain", "Umm%20al%20Quwain"],
];

export default function ProductPage({ params, searchParams }) {
    const c = getContext(params);
    const {
        product, specs, compat, years, make, model, category, subcategory, slug,
        decodedMake, decodedModel, decodedCategory, decodedSubcategory,
        oemType, condition, brand, partname, partnumber,
    } = c;

    const isBattery = decodedSubcategory === "Battery";
    const price = Number(product.pricing?.price);
    const showPrice = !isBattery && price > 100;
    const currency = product.pricing?.currency || "AED";

    const base = `/search-by-make/${enc(make)}`;
    const crumbs = [
        { name: "Home", href: "/" },
        { name: decodedMake, href: base },
        { name: decodedModel, href: `${base}/${enc(model)}` },
        { name: decodedCategory, href: `${base}/${enc(model)}/${enc(category)}` },
        { name: decodedSubcategory, href: `${base}/${enc(model)}/${enc(category)}/${enc(subcategory)}` },
        { name: partname, href: null },
    ];

    const faqs = buildFaqs(c);
    const jsonLd = buildJsonLd(c, faqs, crumbs);

    const related = products
        .filter(
            (p) =>
                p.id !== product.id &&
                p.category === product.category &&
                p.compatibility?.some((x) => norm(x.make) === norm(decodedMake) && norm(x.model) === norm(decodedModel))
        )
        .slice(0, 6);

    const keyFacts = [
        ["Brand", brand],
        ["Part Number", partnumber],
        ["Condition", condition],
        ["Type", oemType],
        ["Compatible Years", years],
        ["Engine", compat.engine],
        ["Category", product.category],
    ].filter(([, v]) => v);

    return (
        <main className={`mx-auto max-w-6xl px-4 py-6 sm:px-6 ${roboto.className}`}>
            <SearchBar allProducts={products} searchParams={searchParams} />

            {/* Breadcrumbs */}
            <nav aria-label="Breadcrumb" className="mt-4 text-sm text-gray-500">
                <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    {crumbs.map((cr, i) => (
                        <li key={cr.name + i} className="flex items-center gap-2">
                            {i > 0 && <span aria-hidden="true">/</span>}
                            {cr.href ? (
                                <Link href={cr.href} className="hover:text-blue-600 hover:underline">
                                    {cr.name}
                                </Link>
                            ) : (
                                <span aria-current="page" className="font-medium text-gray-900">
                                    {cr.name}
                                </span>
                            )}
                        </li>
                    ))}
                </ol>
            </nav>

            {/* Hero: gallery + buy box */}
            <div className="mt-6 grid gap-8 lg:grid-cols-2 xl:grid-cols-2 xxl:grid-cols-2">
                {/* Gallery */}
                <figure className="self-start rounded-2xl border bg-white p-4 shadow-sm lg:sticky lg:top-6">
                    <div className="relative">
                        {product.image ? (
                            <img
                                src={imgPath(product.image)}
                                alt={`${decodedMake} ${decodedModel} ${partname} ${partnumber}`}
                                width={800}
                                height={800}
                                fetchPriority="high"
                                className="mx-auto aspect-square w-full rounded-xl object-contain"
                            />
                        ) : (
                            <div className="flex aspect-square w-full items-center justify-center rounded-xl bg-gray-100 text-gray-400">
                                No image available
                            </div>
                        )}
                        <span className="absolute left-3 top-3 rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white shadow">
                            ✓ Verified fitment
                        </span>
                    </div>
                    <figcaption className="mt-3 text-center text-sm text-gray-500">
                        {partname} — {decodedMake} {decodedModel}
                    </figcaption>
                </figure>

                {/* Buy box */}
                <section className="space-y-5">
                    <div className="flex flex-wrap gap-2 text-xs font-semibold">
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-blue-700">{oemType}</span>
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-700">{condition}</span>
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-700">{brand}</span>
                    </div>

                    <h1 className={`text-2xl font-bold leading-tight text-gray-900 sm:text-3xl ${poppins.className}`}>
                        {decodedMake} {decodedModel} {partname} ({years}) {oemType} No - {partnumber}
                    </h1>

                    <p className="text-sm text-gray-500">
                        Part No: <span className="font-medium text-gray-800">{partnumber}</span>
                        {specs.sku && (
                            <>
                                {" "}· SKU: <span className="font-medium text-gray-800">{specs.sku}</span>
                            </>
                        )}
                    </p>

                    {/* Price + availability card */}
                    <div className="rounded-2xl border bg-gray-50 p-5">
                        {showPrice ? (
                            <p className="text-sm text-gray-500">
                                Starting from
                                <span className={`block text-3xl font-bold text-gray-900 ${poppins.className}`}>
                                    {currency} {price.toLocaleString("en-AE")}
                                </span>
                                <span className="text-xs text-blue-600">Inquire for final price</span>
                            </p>
                        ) : (
                            <p className={`text-2xl font-bold text-gray-900 ${poppins.className}`}>
                                Price on Request
                                <span className="mt-1 block text-sm font-normal text-gray-500">
                                    Send an inquiry and we will confirm stock and price within a few hours.
                                </span>
                            </p>
                        )}

                        <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-green-700">
                            <span className="inline-block h-2.5 w-2.5 rounded-full bg-green-600" aria-hidden="true" />
                            Price on Request
                        </p>

                        <div className="mt-4">
                            <PartInquiryForm product={product} make={make} model={model} subcategory={subcategory} />
                        </div>
                    </div>

                    {/* Trust badges */}
                    <ul className="grid gap-3 text-sm sm:grid-cols-3">
                        <li className="rounded-xl border p-3">
                            <p className="font-semibold text-gray-900">✓ Fitment checked</p>
                            <p className="text-gray-500">Confirmed for {decodedMake} {decodedModel}</p>
                        </li>
                        <li className="rounded-xl border p-3">
                            <p className="font-semibold text-gray-900">🚚 UAE delivery</p>
                            <p className="text-gray-500">
                                {isBattery ? "Within 4 hours in Dubai & Sharjah" : "All 7 Emirates"}
                            </p>
                        </li>
                        <li className="rounded-xl border p-3">
                            <p className="font-semibold text-gray-900">🛡 Warranty</p>
                            <p className="text-gray-500">{specs.Warranty || "Details on inquiry"}</p>
                        </li>
                    </ul>

                    {/* Description */}
                    <p className="text-sm leading-relaxed text-gray-600">
                        The {partnumber} is a {oemType} {condition.toLowerCase()} {partname} for the {decodedMake} {decodedModel} ({years}).
                        Compatible with {decodedMake} {decodedModel} vehicles equipped with a {compat.engine} engine.
                        Available in UAE with fast delivery to Dubai, Abu Dhabi, Sharjah and all other Emirates.
                        We supply both genuine OEM and quality aftermarket alternatives — inquire now and we will confirm stock and pricing within a few hours.
                    </p>

                    {/* Key facts */}
                    <dl className="grid grid-cols-2 gap-x-6 gap-y-3 rounded-2xl border p-5 text-sm">
                        {keyFacts.map(([label, value]) => (
                            <div key={label}>
                                <dt className="text-gray-500">{label}</dt>
                                <dd className="font-medium text-gray-900">{value}</dd>
                            </div>
                        ))}
                    </dl>

                    {/* Delivery cities */}
                    {!isBattery && (
                        <p className="text-sm text-gray-600">
                            <strong className="text-gray-900">Delivery: </strong>
                            {CITIES.map(([name, path], i) => (
                                <span key={name}>
                                    <Link href={`/search-by-cities-in-uae/${path}`} className="text-blue-600 hover:underline">
                                        {name}
                                    </Link>
                                    {i < CITIES.length - 1 && ", "}
                                </span>
                            ))}
                        </p>
                    )}
                </section>
            </div>

            {/* Compatibility / Item specifics / Policies — real tables, always in the HTML */}
            <section className="mt-12">
                <ProductTabs product={product} slug={slug} />
            </section>

            {/* FAQ — visible on page so it matches the FAQPage JSON-LD */}
            <section id="faq" className="mt-12">
                <h2 className="mb-4 text-xl font-semibold">Frequently asked questions</h2>
                <div className="divide-y rounded-2xl border">
                    {faqs.map((f) => (
                        <details key={f.q} className="group p-4">
                            <summary className="cursor-pointer list-none font-medium text-gray-900 marker:hidden">
                                {f.q}
                            </summary>
                            <p className="mt-2 text-sm leading-relaxed text-gray-600">{f.a}</p>
                        </details>
                    ))}
                </div>
            </section>

            {/* Related products */}
            {related.length > 0 && (
                <section className="mt-12">
                    <h2 className="mb-4 text-xl font-semibold">
                        Related {decodedMake} {decodedModel} parts
                    </h2>
                    <ul className="grid grid-cols-2 gap-4 md:grid-cols-3">
                        {related.map((p) => {
                            const rc = p.compatibility.find(
                                (x) => norm(x.make) === norm(decodedMake) && norm(x.model) === norm(decodedModel)
                            );
                            if (!rc) return null;
                            const otherSlug = `${p.partname}-${rc.make}-${rc.model}-${rc.years}-${p.partnumber}-${p.id}`;
                            const href = `/search-by-make/${enc(rc.make)}/${enc(rc.model)}/${enc(p.category)}/${enc(p.subcategory)}/${encodeURIComponent(otherSlug)}`;
                            return (
                                <li key={p.id} className="overflow-hidden rounded-2xl border bg-white transition hover:shadow-md">
                                    <Link href={href} className="block">
                                        {p.image && (
                                            <img
                                                src={imgPath(p.image)}
                                                alt={`${decodedMake} ${rc.model} ${p.partname}`}
                                                width={400}
                                                height={400}
                                                loading="lazy"
                                                className="aspect-square w-full object-cover"
                                            />
                                        )}
                                        <div className="space-y-1 p-3">
                                            <p className="line-clamp-2 text-sm font-semibold text-gray-900">
                                                {decodedMake} {rc.model} {p.partname}
                                            </p>
                                            <p className="text-xs text-gray-500">{p.partnumber}</p>
                                            <p className="text-sm font-bold text-blue-600">
                                                {p.pricing?.price > 1
                                                    ? `${p.pricing.currency || "AED"} ${Number(p.pricing.price).toLocaleString("en-AE")}`
                                                    : "Price on Request"}
                                            </p>
                                        </div>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </section>
            )}

            {/* JSON-LD: a real <script> tag, server-rendered so it shows in View Page Source */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
            />
        </main>
    );
}