import { notFound } from "next/navigation";
import products from "../../../../../../../public/products.json";
import PartInquiryForm from "./PartInquiryForm";
import ProductTabs from "./ProductTabs";
import { Fira_Sans, Poppins, Roboto } from 'next/font/google';
import SearchBar from "../../../../../../catalogs/SearchBar";
export const revalidate = 86400;
export const runtime = 'nodejs';
export const fetchCache = 'force-cache';
export const dynamicParams = true;

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

export async function generateStaticParams() {
    const params = [];
    const generatedCombos = new Set();

    products.forEach((product) => {
        if (!product || !Array.isArray(product.compatibility)) return;

        const category = product.category?.trim();
        const subcategory = product.subcategory?.trim();

        if (!category || !subcategory) return;

        // Group by make/model
        const makeModelGroups = {};

        product.compatibility.forEach((compat) => {
            const make = compat.make?.trim();
            const model = compat.model?.trim();

            if (!make || !model || excludedMakesSet.has(make)) return;

            const key = `${make}|${model}`;
            if (!makeModelGroups[key]) makeModelGroups[key] = [];
            makeModelGroups[key].push(compat.years);
        });


        Object.entries(makeModelGroups).forEach(([key, years]) => {
            const [make, model] = key.split('|');

            const sortedYears = years.sort();
            const yearRange = sortedYears.length > 1
                ? `${sortedYears[0]}-${sortedYears[sortedYears.length - 1]}`
                : sortedYears[0];

            const slug = `${product.partname}-${make}-${model}-${yearRange}-${product.partnumber}-${product.id}`;

            const comboKey = `${product.id}|${make}|${model}`;

            if (!generatedCombos.has(comboKey)) {
                generatedCombos.add(comboKey);
                params.push({
                    make,
                    model,
                    category,
                    subcategory,
                    slug
                });
            }
        });
    });

    return params;
}


export async function generateMetadata({ params }) {

    const { make, model, category, subcategory, slug } = params;
    const id = Number(slug.split("-").pop());

    // Find product by ID
    const product = products.find((p) => p.id === id);

    if (!product) {
        notFound()
    }

    const compat = product.compatibility?.find(
        (c) =>
            c?.make?.trim().toLowerCase() === decodeURIComponent(params.make).trim().toLowerCase() &&
            c?.model?.trim().toLowerCase() === decodeURIComponent(params.model).trim().toLowerCase()
    );

    const expandYears = (range) => {
        if (!range) return "";

        const [start, end] = range.split("-").map(Number);

        if (!end) return start.toString();

        let years = [];
        for (let year = start; year <= end; year++) {
            years.push(year);
        }

        return years.join(", ");
    };



    const faqSchema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Product",
                "name": `${product.item_specifics?.Brand || ""} ${product.partname}`,
                "category": product.category,
                "mpn": product.partnumber,
                "sku": product.item_specifics?.sku,
                "brand": {
                    "@type": "Brand",
                    "name": product.item_specifics?.Brand || "Generic"
                },
                "image": product.image,
                "description": `${product.item_specifics?.Condition || ""} ${product.partname} compatible with multiple vehicles.`,
                "offers": {
                    "@type": "Offer",
                    "url": `https://www.emirates-car.com/search-by-make/${encodeURIComponent(make)}/${encodeURIComponent(model)}/${category}/${slug}`,
                    "priceCurrency": product.pricing.currency || "USD",
                    "availability": product.availability === "In Stock" ? "http://schema.org/InStock" : "http://schema.org/OutOfStock",
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": parseFloat(product.pricing.price) ?? 0,
                        "priceCurrency": product.pricing.currency || "USD"
                    }
                },
                "additionalProperty": Object.entries({
                    Condition: product.item_specifics?.Condition,
                    Warranty: product.item_specifics?.Warranty,
                    "OEM or Aftermarket": product.item_specifics?.["OEM or Aftermarket"],
                    "Fitment Type": product.item_specifics?.["Fitment Type"],
                    "Country/Region of Manufacture":
                        product.item_specifics?.["Country/Region of Manufacture"]
                })
                    .filter(([_, v]) => v)
                    .map(([k, v]) => ({
                        "@type": "PropertyValue",
                        "name": k,
                        "value": v
                    })),
                "isRelatedTo": product.compatibility?.map((c) => ({
                    "@type": "Product",
                    "name": `${c.make} ${c.model} (${c.years})`,
                    "additionalProperty": [
                        {
                            "@type": "PropertyValue",
                            "name": "Engine",
                            "value": c.engine
                        }
                    ]
                }))
            },
            {
                "@type": "FAQPage",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": `Can I buy used or aftermarket ${product.partname} (${product.partnumber}) to save costs?`,
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": `Yes, we offer used and aftermarket ${product.partname} (${product.partnumber}) that are tested for quality and performance. You can cross check with item specifics tabs for other aftermarket part numbers.`
                        }
                    },
                    {
                        "@type": "Question",
                        "name": `Do you deliver ${product.partname} (${product.partnumber}) across UAE?`,
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": `Yes, we deliver ${product.partname} (${product.partnumber}) to Dubai, Abu Dhabi, Sharjah, Ajman, and other Emirates. International shipping is also available.`
                        }
                    },
                    {
                        "@type": "Question",
                        "name": `How do I know if ${product.partname} (${product.partnumber}) fits my car?`,
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": `You can share your car's VIN or model details with us, and we will confirm if ${product.partname} (${product.partnumber}) is compatible before shipping.`
                        }
                    },
                    {
                        "@type": "Question",
                        "name": `Does the ${product.partname} (${product.partnumber}) come with warranty?`,
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": product.item_specifics?.Warranty ||
                                "This product is sold as-is without manufacturer or seller warranty."
                        }
                    }
                ]
            },

        ]
    };


    return {
        title: `${decodeURIComponent(make)} ${decodeURIComponent(model)} ${expandYears(compat?.years) || ""} ${product.partname}`,
        description: `Buy ${product.item_specifics["OEM or Aftermarket"]} ${product.item_specifics.Condition} ${product.partname} (${product.partnumber}), Check warranty, Fitment, Other part number, Manufacture part number and Policies`,

        openGraph: {
            title: `${product.item_specifics["OEM or Aftermarket"]} ${decodeURIComponent(make)} ${decodeURIComponent(model)} ${expandYears(compat?.years) || ""} ${product.partname}`,
            description: `Buy ${product.partname} fits ${compat?.make || "" + compat?.model || "" + expandYears(compat?.years) || ""}`,
            url: `https://www.emirates-car.com/search-by-make/${encodeURIComponent(make)}/${encodeURIComponent(model)}/${category}/${slug}`,
            image: `https://www.emirates-car.com/${product.image}`,
            siteName: 'EMIRATESCAR',
            images: [
                'https://www.emirates-car.com/favicon.png',
                {
                    url: 'https://www.emirates-car.com/icon-192x192.png',
                    width: 192,
                    height: 192,
                },
                {
                    url: 'https://www.emirates-car.com/icons/icon-512x512.png',
                    width: 512,
                    height: 512,
                    alt: 'car parts',
                },
            ],
            locale: 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: `${product.item_specifics["OEM or Aftermarket"]} ${make} ${decodeURIComponent(model)} ${expandYears(compat?.years) || ""} ${product.partname}`,
            url: `https://www.emirates-car.com/search-by-make/${encodeURIComponent(make)}/${encodeURIComponent(model)}/${category}/${slug}`,
            description: `Buy ${make} - ${decodeURIComponent(
                model
            )} auto spare parts Online and Get delivered Used, New, Genuine / OEM, Aftermarket in UAE`,
            images: ['https://www.emirates-car.com/favicon.png'],
        },
        icons: {
            icon: 'https://www.emirates-car.com/favicon.png',
            shortcut: 'https://www.emirates-car.com/icons/icon-96x96.png',
            apple: 'https://www.emirates-car.com/icons/icon-192x192.png',
            other: {
                rel: 'apple-touch-icon-precomposed',
                url: 'https://www.emirates-car.com/icons/icon-152x152.png',
            },
        },
        alternates: {
            canonical: `https://emirates-car.com/search-by-make/${encodeURIComponent(make)}/${encodeURIComponent(model)}/${category}/${slug}`,
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
        category: `${decodeURIComponent(category)}`,
        other: {
            "script:ld+json": JSON.stringify(faqSchema),
        },
    };
}


export default function ProductPage({ params, searchParams }) {
    const { make, model, category, subcategory, slug } = params;

    const id = Number(slug.split("-").pop());

    const product = products.find((p) => p.id === id);

    if (!product) {
        notFound()
    }

    const compat = product.compatibility?.find(
        (c) =>
            c?.make?.trim().toLowerCase() === decodeURIComponent(params.make).trim().toLowerCase() &&
            c?.model?.trim().toLowerCase() === decodeURIComponent(params.model).trim().toLowerCase()
    );

    if (!compat) {
        return (
            <div className="p-6 text-center text-gray-700">
                Compatibility not found for {make} {model}
            </div>
        );
    }

    const matchingCompats = product.compatibility?.filter(
        (c) =>
            c?.make?.trim().toLowerCase() === decodeURIComponent(params.make).trim().toLowerCase() &&
            c?.model?.trim().toLowerCase() === decodeURIComponent(params.model).trim().toLowerCase()
    );

    const years = [...new Set(matchingCompats?.map(c => c.years))].join(', ');

    const otherProducts = products.filter(
        (p) => p.id !== product.id && p.compatibility?.some((c) => c.make === make)
    );


    return (
        <main className="max-w-5xl mx-auto p-6">
            <SearchBar allProducts={products} searchParams={searchParams} />
            <div className="grid xl:grid-cols-2 xxl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 gap-6"
                itemScope
                itemType="https://schema.org/Product">
                {/* Product Image */}
                {product.image && (
                    <figure className="mb-4 md:mb-0">
                        <img
                            src={product.image}
                            alt={product.partname}
                            className="w-full rounded-lg shadow border-[1px]"
                            itemProp="image"
                        />
                        <figcaption className="text-sm text-gray-500 text-center mt-2">
                            Image of <span>{product.partname}</span>
                        </figcaption>
                    </figure>
                )}

                {/* Product Info */}
                <section className="space-y-4">
                    {/* Category & Engine */}
                    <h1 className={`text-3xl xl:text-4xl xxl:text-4xl font-extrabold mx-auto my-5 xs:my-3 xs:text-xl xxs:text-2xl md:text-xl md:my-3 sm:text-xl xxs:text-center line-clamp-6  ${poppins.className}`} itemProp="name">
                        {decodeURIComponent(make)} {decodeURIComponent(model)} {product.partname}
                    </h1>
                    <p className={`text-fitment font-semibold ${roboto.className}`}>✓ Verified fitment</p>
                    <div className={`space-y-1 ${roboto.className}`}>
                        <p className="text-gray-700"><strong>Category:</strong><span itemProp="category">{product.category}</span> </p>
                        <p className="text-gray-700"><strong>Brand:</strong> {product.item_specifics.Brand}</p>
                        <p className="text-gray-700" itemProp="mpn"><strong>Part Number:</strong> {product.partnumber}</p>
                        <p className="text-gray-700"><strong>Compatible Years</strong> {years}</p>
                        <p className="text-gray-700"><strong>Condition:</strong> {product.item_specifics.Condition}</p>
                        <p className="text-gray-700"><strong>Availability:</strong> {product.availability}</p>
                        <p className="text-gray-700"><strong>Delivery:</strong> <a href="https://www.emirates-car.com/search-by-cities-in-uae/Dubai" className="text-blue-500">Dubai</a>, <a href="https://www.emirates-car.com/search-by-cities-in-uae/Abu%20Dhabi" className="text-blue-500">Abu Dhabi</a>,<a href="https://www.emirates-car.com/search-by-cities-in-uae/Ajman" className="text-blue-500">Ajman</a>, <a href="https://www.emirates-car.com/search-by-cities-in-uae/Sharjah" className="text-blue-500">Sharjah</a>, <a href="https://www.emirates-car.com/search-by-cities-in-uae/Al%20Ain" className="text-blue-500">Al Ain</a>, <a href="https://www.emirates-car.com/search-by-cities-in-uae/Ras%20Al%20Khaimah" className="text-blue-500">Ras Al Khaimah</a>, <a href="https://www.emirates-car.com/search-by-cities-in-uae/Fujairah" className="text-blue-500">Al Fujairah</a>, <a href="https://www.emirates-car.com/search-by-cities-in-uae/Umm%20al%20Quwain" className="text-blue-500">Umm Al Quwain</a></p>
                        <meta itemProp="brand" content={product.item_specifics.Brand} />

                    </div>
                    {/* Pricing */}
                    <div className="space-y-1">
                        <div
                            itemProp="offers"
                            itemScope
                            itemType="https://schema.org/Offer"
                        >
                            <p className="text-xl font-semibold text-gray-800">
                                Price:{" "}
                                <span className="text-black">
                                    <span itemProp="priceCurrency">{product.pricing?.currency || "AED"}</span>{" "}<span itemProp="price">{product.pricing?.price}</span> <span className="text-sm text-blue-500">(approx.)</span>
                                </span>{" "}
                                <span>
                                    <PartInquiryForm
                                        product={product}
                                        dealerPrice={product.pricing.price}
                                        dealerPriceCurrency={product.pricing?.currency}
                                        make={make}
                                        model={model}
                                        oemoraftermarket={product.item_specifics["OEM or Aftermarket"]}
                                        partname={product.partname}
                                    />
                                </span>
                            </p>

                            <link
                                itemProp="url"
                                href={`https://www.emirates-car.com/search-by-make/${encodeURIComponent(make)}/${encodeURIComponent(model)}/${category}/${subcategory}/${slug}`}
                            />

                            {/* Hidden structured data for availability */}
                            <meta itemProp="availability" content="https://schema.org/InStock" />
                        </div>
                    </div>
                </section>
            </div>

            <section><ProductTabs product={product} slug={slug} /></section>


            {/* Related Products */}
            {otherProducts.length > 0 && (
                <section className="mt-10">
                    <h2 className="text-xl font-semibold mb-4">Other {make} Products</h2>
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
                                            alt={p.partname}
                                            className="w-full h-36 object-cover mb-2 rounded"
                                        />
                                        <p className={`text-sm font-semibold ${firaSans.className}`}>{make} {model} {p.partname}</p>
                                        <p className={`text-sm font-bold text-blue-600 ${firaSans.className}`}>{p.pricing.currency} {p.pricing.price}</p>
                                        <p className={`text-xs text-gray-600 ${firaSans.className}`}>{p.partnumber}</p>
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

