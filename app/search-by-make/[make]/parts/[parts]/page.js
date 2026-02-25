import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import TenEntries from '../../../../../components/tenentries';
import SearchModel from '../../../../../components/SearchModel';
import { Fira_Sans, Playfair_Display } from 'next/font/google';
import products from "../../../../../public/products.json"
import partsData from "../../../../../public/lib/filteredparts.json"
import CarData from "../../../../../public/lib/car-data.json"
import CitiesData from "../../../../../public/lib/cities.json"
import Product from './Product';
import FormMakePart from '../../../../../components/FormMakePart';
import FormBattery from '../../../../../components/FormBattery';
import { BadgeCheck, Car, Clock, LinkIcon, MapPin, Recycle } from 'lucide-react';
export const revalidate = 86400;
export const runtime = 'nodejs';
export const dynamicParams = false;

const carDataByMakeModel = {};
const carDataByMake = {};

//for loop to run at build time 
for (let i = 0; i < CarData.length; i++) {
    const car = CarData[i];

    const key = `${car.make.toLowerCase()}-${car.model.toLowerCase()}`;
    if (!carDataByMakeModel[key]) {
        carDataByMakeModel[key] = [];
    }
    carDataByMakeModel[key].push(car);

    const makeLower = car.make.toLowerCase();
    if (!carDataByMake[makeLower]) {
        carDataByMake[makeLower] = [];
    }
    carDataByMake[makeLower].push(car);
}

const playfair_display = Playfair_Display({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-playfair-display',
});

const firaSans = Fira_Sans({
    weight: ['400', '700'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-fira-sans',
});

const excludedMakes = [
    'Buick', 'Eagle', 'Lotus', 'Plymouth', 'Pontiac', 'Saab', 'Subaru',
    'Alpha Romeo', 'Geo', 'Oldsmobile', 'Isuzu', 'Saturn', 'Corbin', 'Holden',
    'Spyker', 'Spyker Cars', 'Aston Martin', 'Panoz', 'Foose', 'Morgan', 'Aptera',
    'Smart', 'SRT', 'Roush Performance', 'Pagani', 'Mobility Ventures LLC',
    'RUF Automobile', 'Koenigsegg', 'Karma', 'Polestar', 'STI', 'Kandi', 'Abarth',
    'Dorcen', 'Foton', 'W Motors', 'Opel', 'Skoda', 'Hillman', 'Austin', 'Fillmore',
    'Maybach', 'Merkur', 'Rambler', 'Shelby', 'Studebaker', 'Great Wall GWM',
    'Zeekr', 'ZNA', 'GAC', 'Gs7', 'Hongqi', 'W Motor', 'JAC', 'Jaecoo', 'Jetour',
    'TANK', 'Soueast', 'Zarooq Motors', 'Changan', 'Maxus', 'Haval', 'Zotye',
    'Sandstorm', 'Chery', 'Geely', 'BAIC', 'Bestune'
];

const excludedMakesSet = new Set(excludedMakes);

const selectedParts = [
    // Tier 1
    "Battery", "Engine Assembly", "Gearbox", "Radiator",
    "AC Compressor", "Alternator", "Suspension", "Shock Absorber",
    "Headlight Assembly", "Bumpers", "Brake Disc", "Turbocharger",
    // Tier 2
    "Steering Rack", "Water Pump", "Fuel Pump", "Starter",
    "Taillight", "Axle Assembly", "Lower Control Arm", "Upper Control Arm",
    "Catalytic Convertor", "AC Condenser", "Wheel", "Mirrors", "Steering Box"
]

export function generateStaticParams() {
    const params = [];
    const generated = new Set();

    // --- Path 1: From products.json (exact product matches) ---
    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        if (!product?.compatibility || !product.subcategory) continue;

        const subcategory = product.subcategory.trim();
        const partEntry = partsData.find(
            p => p.parts.toLowerCase() === subcategory.toLowerCase()
        );
        if (!partEntry) continue;

        for (let j = 0; j < product.compatibility.length; j++) {
            const compat = product.compatibility[j];
            const make = compat.make?.trim();
            if (!make || excludedMakesSet.has(make)) continue;

            const key = `${make}|${partEntry.parts}`;
            if (!generated.has(key)) {
                generated.add(key);
                params.push({
                    make: encodeURIComponent(make),
                    parts: encodeURIComponent(partEntry.parts),
                });
            }
        }
    }

    // --- Path 2: unique makes x selectedParts ---
    const uniqueMakes = new Set();
    for (let i = 0; i < CarData.length; i++) {
        const make = CarData[i].make?.trim();
        if (make && !excludedMakesSet.has(make)) {
            uniqueMakes.add(make);
        }
    }

    for (const make of uniqueMakes) {
        for (let i = 0; i < selectedParts.length; i++) {
            const selectedPart = selectedParts[i];

            const partEntry = partsData.find(
                p => p.parts.toLowerCase() === selectedPart.toLowerCase()
            );
            if (!partEntry) continue;

            const key = `${make}|${partEntry.parts}`;
            if (!generated.has(key)) {
                generated.add(key);
                params.push({
                    make: encodeURIComponent(make),
                    parts: encodeURIComponent(partEntry.parts),
                });
            }
        }
    }

    console.log(`✅ Generated ${params.length} make/parts pages`);
    return params;
}




export function generateMetadata({ params }) {
    const { parts, make } = params;
    const decodedParts = decodeURIComponent(parts);
    const decodedMake = decodeURIComponent(make);

    const partEntry = partsData.find(
        (p) => p.parts.toLowerCase() === decodedParts.toLowerCase()
    );

    const isSelectedPart = selectedParts.some(
        p => p.toLowerCase() === decodedParts.toLowerCase()
    );

    const makeFiltered = products.filter(product =>
        product.compatibility?.some(
            (c) => c.make.toLowerCase() === decodedMake.toLowerCase()
        )
    );

    const partFiltered = makeFiltered.filter(product =>
        product.subcategory.toLowerCase() === decodedParts.toLowerCase()
    );

    const hasValidContent = partEntry && (isSelectedPart || partFiltered.length > 0);

    if (!hasValidContent) {
        return {
            title: 'Page Not Found - EMIRATESCAR',
            description: 'The requested page could not be found.',
            robots: {
                index: false,
                follow: false,
                noarchive: true,
                nosnippet: true,
                noimageindex: true,
                googleBot: {
                    index: false,
                    follow: false,
                    noarchive: true,
                    nosnippet: true,
                    noimageindex: true,
                },
            },
        };
    }

    const canonicalUrl = `https://www.emirates-car.com/search-by-make/${encodeURIComponent(decodedMake)}/parts/${encodeURIComponent(decodedParts)}`;

    // FIX 1: Use decodedMake and decodedParts consistently — original was mixing
    // encoded params (make, parts) with decoded values in schema URLs
    const productListItems = partFiltered.map((product, index) => {
        // FIX 2: Guard against missing compatibility data to prevent runtime crash
        const firstCompat = product.compatibility?.[0];
        if (!firstCompat) return null;

        const productUrl = `https://www.emirates-car.com/search-by-make/${encodeURIComponent(decodedMake)}/${encodeURIComponent(firstCompat.model)}/${encodeURIComponent(product.category)}/${product.partname}-${encodeURIComponent(decodedMake)}-${encodeURIComponent(firstCompat.model)}-${firstCompat.years ?? ''}-${product.partnumber}-${product.id}`;

        return {
            "@type": "ListItem",
            "position": index + 1,
            "item": {
                "@type": "Product",
                // FIX 3: Corrected @id — was using raw encoded params in URL
                "@id": `${productUrl}#product`,
                "name": `${product.partname} ${product.partnumber} ${decodedMake}`,
                "url": productUrl,
                "image": `https://www.emirates-car.com${product.image}`,
                // FIX 4: Description now includes all compatible models, not just first
                "description": `${product.partname} compatible with ${decodedMake} ${product.compatibility?.map(c => c.model).join(", ")}`,
                "brand": { "@type": "Brand", "name": decodedMake },
                "mpn": product.partnumber,
                "offers": {
                    "@type": "Offer",
                    "url": productUrl,
                    "priceCurrency": product.pricing.currency,
                    "price": product.pricing.price,
                    "availability": "https://schema.org/InStock",
                    "itemCondition": "https://schema.org/NewCondition"
                },
                "isAccessoryOrSparePartFor": {
                    "@type": "Car",
                    // FIX 5: was { "@type": "Brand", "name": make } — wrong, make is a string not Brand
                    "brand": { "@type": "Brand", "name": decodedMake },
                    "model": firstCompat.model
                }
            }
        };
        // FIX 6: Filter out nulls from missing compatibility guard above
    }).filter(Boolean);

    const faqSchema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "CollectionPage",
                // FIX 7: Was using raw encoded params — use decoded values
                "name": `${decodedMake} ${decodedParts} Parts | EMIRATESCAR`,
                "url": canonicalUrl,
                "description": `Buy ${decodedMake} ${decodedParts} parts. New, used, genuine/OEM and aftermarket spare parts for all ${decodedMake} models in UAE.`,
                "about": { "@type": "Brand", "name": decodedMake },
                "mainEntity": {
                    "@type": "ItemList",
                    "itemListElement": productListItems
                }
            },
            {
                // FIX 8: Removed duplicate @context inside @graph — invalid JSON-LD
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
                        "name": "Car Makes",
                        "item": "https://www.emirates-car.com/search-by-make/"
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "name": `${decodedMake} Spare Parts`,
                        "item": `https://www.emirates-car.com/search-by-make/${encodeURIComponent(decodedMake)}`
                    },
                    {
                        "@type": "ListItem",
                        "position": 4,
                        "name": `${decodedMake} ${decodedParts} Parts`,
                        "item": canonicalUrl
                    }
                ]
            },
        ]
    };

    return {
        // FIX 9: Title was too long (60+ chars is fine but this was excessive)
        // Also was using raw encoded `make` and `parts` params
        title: `${decodedMake} ${decodedParts} | Used, Genuine, OEM & Aftermarket Parts UAE`,
        description: `Find genuine, OEM, used & aftermarket ${decodedMake} ${decodedParts} spare parts in Dubai, Sharjah & across the UAE. Get best prices and fast quotes from trusted dealers today.`,
        metadataBase: new URL('https://www.emirates-car.com'),
        openGraph: {
            title: `${decodedMake} ${decodedParts} | Used, Genuine, OEM & Aftermarket UAE`,
            description: `Find genuine, OEM, used & aftermarket ${decodedMake} ${decodedParts} spare parts in Dubai, Sharjah & across the UAE. Get best prices and fast quotes from trusted dealers today.`,
            url: canonicalUrl,
            siteName: 'EMIRATESCAR',
            // FIX 10: Had both `image` (singular, wrong key) and `images` (correct)
            // Removed the bare `image` key, cleaned up images array
            images: [
                {
                    url: 'https://www.emirates-car.com/img/car-spare-parts.png',
                    width: 800,
                    height: 600,
                    alt: `${decodedMake} ${decodedParts} spare parts UAE`,
                },
            ],
            locale: 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: `${decodedMake} ${decodedParts} | Used, Genuine, OEM & Aftermarket UAE`,
            description: `Find genuine, OEM, used & aftermarket ${decodedMake} ${decodedParts} spare parts in Dubai, Sharjah & across the UAE. Get best prices and fast quotes from trusted dealers today.`,
            images: ['https://www.emirates-car.com/img/car-spare-parts.png'],
        },
        // FIX 11: Removed `icons` — icons belong in layout.js not in page metadata
        // Setting icons per-page overrides your global layout icons unnecessarily
        keywords: `${decodedParts} for ${decodedMake} in dubai, buy ${decodedMake} ${decodedParts} online UAE`,
        alternates: {
            canonical: canonicalUrl,
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
        // FIX 12: Duplicate `other` key — second was overwriting first silently
        // Merged both into single other object
        other: {
            'product:brand': decodedMake,
            'product:category': `Vehicle Parts & Accessories > ${decodedMake} > ${partEntry.category} > ${partEntry.parts}`,
            "script:ld+json": JSON.stringify(faqSchema),
        },
    };
}

function getMake() {
    const uniqueMakes = {};
    for (let i = 0; i < CarData.length; i++) {
        const car = CarData[i];
        if (!uniqueMakes[car.make]) {
            uniqueMakes[car.make] = car;
        }
    }
    return Object.values(uniqueMakes);
}

function getMakeImage(make) {
    const key = `${make.toLowerCase()}`;
    const cars = carDataByMake[key];

    if (!cars || cars.length === 0) return '';

    for (const car of cars) {
        if (car.img) {
            return car.img;
        }
    }

    return '';
}

function getModel(make) {
    try {
        const decodedMake = decodeURIComponent(make).toLowerCase();
        const cars = carDataByMake[decodedMake] || [];

        const result = [];
        const seenModels = {};

        for (let i = 0; i < cars.length; i++) {
            const item = cars[i];

            if (!seenModels[item.model]) {
                seenModels[item.model] = true;
                result.push(item);
            }
        }

        return result;
    } catch (error) {
        console.error('Error reading model data:', error.message);
        return [];
    }
}

export default function Parts({ params, searchParams }) {
    const { make, parts } = params;
    const carmodel = getModel(make);
    const imageMake = getMakeImage(make);
    const partsDa = partsData;

    if (excludedMakesSet.has(make)) {
        notFound();
    }

    if (!partsData || partsData.length === 0) {
        notFound();
    }

    const partEntry = partsDa.find(
        (p) => p.parts.toLowerCase() === decodeURIComponent(parts).toLowerCase()
    );

    if (!partEntry) {
        notFound();
    }

    //lets check if this part is in the selectedParts

    const isSelectedParts = selectedParts.some(p => p.toLowerCase() === partEntry.parts.toLowerCase())
    const isBattery = decodeURIComponent(parts) === 'Battery'


    const {
        "filter_car_parts[]": categories = [],
        "engine[]": engines = [],
        "compatibility[]": compats = [],
        search = ""
    } = searchParams;

    const selectedCategories = Array.isArray(categories) ? categories : [categories].filter(Boolean);
    const selectedEngines = Array.isArray(engines) ? engines : [engines].filter(Boolean);
    const selectedCompats = Array.isArray(compats) ? compats : [compats].filter(Boolean);
    const query = search?.toLowerCase() || "";

    const makeFiltered = products.filter(product =>
        product.compatibility?.some(
            (c) => c.make.toLowerCase() === make.toLowerCase()
        )
    );


    // Filter by part subcategory
    const partFiltered = makeFiltered.filter(product =>
        product.subcategory.toLowerCase() === partEntry.parts.toLowerCase()
    );

    // Only show 404 if part is NOT in selectedParts AND no products found
    if (!isSelectedParts && (!partFiltered || partFiltered.length === 0)) {
        notFound()
    }
    const filtered = partFiltered.filter(product => {
        const matchesCategory =
            selectedCategories.length === 0 || selectedCategories.includes(product.category);

        const matchesSearch =
            product.partname.toLowerCase().includes(query) ||
            product.partnumber.toLowerCase().includes(query) ||
            product.engine?.some(e => e.toLowerCase().includes(query)) ||
            product.compatibility?.some(c =>
                `${c.make} ${c.model} ${c.years ?? ""}`.toLowerCase().includes(query))

        const matchesEngine =
            selectedEngines.length === 0 || product.engine?.some(e => selectedEngines.includes(e));

        const matchesCompatibility =
            selectedCompats.length === 0 ||
            product.compatibility?.some(c => selectedCompats.includes(`${c.make} ${c.model} ${c.years ? `(${c.years})` : ""}`));

        return matchesCategory && matchesSearch && matchesEngine && matchesCompatibility;
    });

    if (!isSelectedParts && filtered.length === 0) {
        notFound();
    }

    const data = CarData.filter(item => item.make === make);

    if (!data || data.length === 0) {
        notFound();
    }

    const cities = CitiesData;
    const makedatas = getMake();
    const partsposts = partsData;
    const modelsform = CarData;
    const hasPartInSubcategory = partFiltered.length > 0;


    return (
        <>
            {!hasPartInSubcategory && (
                <div className="p-6 max-w-6xl mx-auto">
                    <h1 className={`mt-3 text-5xl lg:text-4xl sm:text-lg xs:text-3xl xxs:text-3xl md:text-4xl font-head font-extrabold ${playfair_display.className}`}>
                        {isBattery ? (<><>{make} <span className="flex items-center"> Battery Replacement Serivces in UAE - Dubai & Sharjah <a href="#myBatteryForm"><LinkIcon className="text-blue-500 h-16 w-16" /></a></span></></>) : (<> {make} {partEntry.parts} - Genuine & Aftermarket in UAE</>)}
                    </h1>
                    <p className={`text-xl py-4 font-sans text-gray-700 mx-auto xs:text-lg xl:text-lg xxs:text-lg ${firaSans.className}`}>
                        If you are looking for {make} {partEntry.parts}, submit your inquiry below, Our team will get back to you through whatsapp based on stock availability
                    </p>

                    {isBattery ? (<> <div className="grid grid-cols-2 xs:grid-cols-1 xxs:grid-cols-1 mx-auto xl:px-10 xs:px-3 xxs:px-4 md:px-5 lg:px-6 mt-5 border-2 p-5 rounded-sm">
                        <div className='mt-20 xs:mt-5 xxs:mt-5 sm:mt-5 md:mt-5 lg:mt-10'>
                            <h2 className={`flex items-center font-bold text-3xl mt-3 xs:text-2xl ${playfair_display.className}`}>
                                {make} Battery Replacement Services in Dubai & Sharjah <span><a href="#myBatteryForm"><LinkIcon className="text-blue-500 h-12 w-12 md:hidden lg:hidden xxl:hidden xl:hidden xs:h-5 xxs:h-5" /></a></span>
                            </h2>
                            <ul className='space-y-3 mt-5'>
                                <li className="flex items-start gap-3">
                                    <Clock className={`w-5 h-5 text-blue-600 flex-shrink-0 mt-1 ${firaSans.className}`} />
                                    <span>24/7 emergency car battery replacement services available round the clock</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Car className={`w-5 h-5 text-red-600 flex-shrink-0 mt-1 ${firaSans.className}`} />
                                    <span>On-site car battery replacement at your location for maximum convenience</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <MapPin className={`w-5 h-5 text-black flex-shrink-0 mt-1 ${firaSans.className}`} />
                                    <span>Services available across Dubai and Sharjah with quick response times</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <BadgeCheck className={`w-5 h-5 text-yellow-400 flex-shrink-0 mt-1 ${firaSans.className}`} />
                                    <span>Instant professional installation by certified technicians</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Recycle className={`w-5 h-5 text-green-600 flex-shrink-0 mt-1 ${firaSans.className}`} />
                                    <span>Safe old Battery Disposal</span>
                                </li>
                            </ul>
                        </div>
                        <div><FormBattery formsData={modelsform} /></div>
                    </div></>) : (<><div className='sm:max-w-xl lg:max-w-2xl md:max-w-xl xl:max-w-2xl xxl:max-w-2xl mx-auto xs:mx-3 xxs:mx-3 sm:mx-5'>
                        <FormMakePart formsData={modelsform} mke={make} />
                    </div></>)}


                    <section className="mt-10 shadow-sm mx-4 md:mx-4 lg:max-w-4xl lg:mx-auto xl:mx-10 bg-bglight px-20 xs:px-3 xxs:px-3">
                        <div className="container py-6">
                            <h2 className={`text-black text-4xl text-center md:text-2xl lg:text-3xl font-bold xs:text-xl xxs:text-2xl pt-10 ${firaSans.className}`}>
                                Search <span className='text-blue-600'>{decodeURIComponent(parts)}</span> for all {make} model
                            </h2>
                            <SearchModel make={make} car={carmodel} />

                            <ul className="grid grid-cols-4 md:grid-cols-3 sm:grid-cols-4 xs:grid-cols-2 xxs:grid-cols-3 gap-3 xs:gap-1 mt-10">
                                {carmodel.map((post, i) => {
                                    const isBattery = decodeURIComponent(partEntry.parts).toLowerCase() === 'battery';

                                    // Check if this specific model has seo=true
                                    const key = `${post.make.toLowerCase()}-${post.model.toLowerCase()}`;
                                    const carEntry = carDataByMakeModel[key];
                                    const hasSEO = carEntry?.some(car => car.seo === true);

                                    let linkHref, linkAs;
                                    if (isBattery) {
                                        linkHref = '/car-battery-replacement-services-in-uae'
                                        linkAs = '/car-battery-replacement-services-in-uae'
                                    } else if (excludedMakes.includes(make)) {
                                        linkHref = '/get-in-touch'
                                        linkAs = '/get-in-touch'
                                    } else if (hasSEO) {
                                        // Model has seo=true, link to the subcategory page
                                        linkHref = '/search-by-make/[make]/[model]/[category]/[subcategory]'
                                        linkAs = `/search-by-make/${encodeURIComponent(post.make)}/${encodeURIComponent(post.model)}/${encodeURIComponent(partEntry.category)}/${parts}`
                                    } else {
                                        // Model has seo=false, link to model page with form anchor
                                        linkHref = '/search-by-make/[make]/[model]#myForm'
                                        linkAs = `/search-by-make/${encodeURIComponent(post.make)}/${encodeURIComponent(post.model)}#myForm`
                                    }

                                    return (
                                        <li key={i} className="h-full">
                                            <Link
                                                href={linkHref}
                                                as={linkAs}
                                                target='_blank'
                                                title={`${post.make} ${post.model} ${decodeURIComponent(parts)}`}
                                                className="block border border-blue-800 hover:border-blue-900 bg-white rounded-sm h-full p-3 text-center"
                                            >
                                                <span className="text-center text-black text-lg font-medium hover:text-gray-800 p-2 xs:p-0 font-sans underline ">
                                                    <span className='text-blue-600'>{make} {post.model}</span> {decodeURIComponent(partEntry.parts) === 'Battery' ? "Battery replacement services in UAE" : decodeURIComponent(partEntry.parts)}
                                                </span>
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>

                        </div>
                    </section>
                    <section>
                        <h2
                            className={`text-black text-4xl text-center md:text-2xl lg:text-3xl font-bold xs:text-xl xxs:text-2xl pt-10 ${firaSans.className}`}
                        >
                            Search{" "}
                            <span className="text-blue-500">
                                {decodeURIComponent(partEntry.parts)}{" "}
                            </span>
                            for Any Models
                        </h2>

                        <ul className="grid grid-cols-5 md:grid-cols-5 lg:grid-cols-5 md:mx-4 sm:mx-3 xs:grid xs:grid-cols-2 sm:grid sm:grid-cols-6 xxs:grid xxs:grid-cols-2 s:grid s:grid-cols-2 gap-3 xs:gap-1 xxs:gap-1 sm:gap-2 s:gap-2 md:gap-2 xs:mx-4 s:mx-4 xxs:mx-4 md:ml-11 my-10 mx-10">
                            {makedatas
                                .filter(post => !excludedMakes.includes(post.make))
                                .map((post, i) => {
                                    // Check if this part is in selectedParts
                                    const isPartAvailable = selectedParts.includes(partEntry.parts);

                                    // Build link conditionally
                                    const href = isPartAvailable
                                        ? `/search-by-make/${encodeURIComponent(post.make)}/parts/${encodeURIComponent(partEntry.parts)}`
                                        : `/get-in-touch`;

                                    return (
                                        <li key={i} className="border">
                                            <Link href={href} title={`${post.make} ${decodeURIComponent(partEntry.parts)}`}>
                                                <span className="h-full hover:border-blue-600 py-3 bg-gray-100 rounded-sm">
                                                    <Image
                                                        src={`/img/car-logos/${post.img}`}
                                                        alt={`${post.make} spare parts`}
                                                        className="mx-auto m-3"
                                                        width={70}
                                                        height={70}
                                                    />
                                                    <p className="text-center font-sans font-medium text-lg">
                                                        <span className="text-blue-600">{post.make}</span>{" "}
                                                        {decodeURIComponent(partEntry.parts)}
                                                    </p>
                                                </span>
                                            </Link>
                                        </li>
                                    );
                                })
                            }
                        </ul>

                    </section>

                    <TenEntries />
                    <section>
                        <h2 className={`text-black text-4xl text-center md:text-2xl lg:text-3xl font-bold xs:text-xl xxs:text-2xl pt-10 ${firaSans.className}`}>
                            Search{' '}
                            <span className="text-blue-500">
                                {decodeURIComponent(partEntry.parts)}{' '}
                            </span>
                            parts in UAE
                        </h2>
                        <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-4 md:mx-4 sm:mx-3 xs:grid xs:grid-cols-2 sm:grid sm:grid-cols-6 xxs:grid xxs:grid-cols-2 s:grid s:grid-cols-2 gap-3 xs:gap-1 xxs:gap-1 sm:gap-2 s:gap-2 md:gap-2 xs:mx-4 s:mx-4 xxs:mx-4 md:ml-11 my-10 mx-10">
                            {cities.map((post, i) => (
                                <div key={i} className='border'>
                                    <Link
                                        href="/search-by-cities-in-uae/[city]"
                                        as={'/search-by-cities-in-uae/' + post.city}
                                        target='_blank'
                                        title={
                                            make + " " + decodeURIComponent(partEntry.parts) + ' in ' + post.city
                                        }
                                    >
                                        <span className="h-full hover:border-blue-600 py-auto bg-gray-100 rounded-sm">
                                            <p className={`text-center my-auto font-sans font-medium text-lg xs:text-base xxs:text-base`}>
                                                {decodeURIComponent(partEntry.parts) === 'Battery' ? make + " " + decodeURIComponent(partEntry.parts) + " replacement services in " : decodeURIComponent(partEntry.parts)} in <span className='text-blue-600'>{post.city}</span>
                                            </p>
                                        </span>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </section>
                    {parts === 'Alternator' && make === 'Honda' ? <>
                        <section>
                            <h2 className={`text-4xl md:text-2xl lg:text-3xl font-semibold xs:text-2xl xxs:text-2xl py-5 ${playfair_display.className}`}>
                                Find the Right Honda Alternator in the UAE — For Garages & Car Owners
                            </h2>
                            <p className={`text-xl font-sans text-gray-700 mx-auto xs:text-lg xl:text-lg xxs:text-lg ${firaSans.className}`}>
                                Whether you run a workshop, showroom, spare parts shop or you are a Honda owner,
                                <span className='text-blue-600'> EMIRATESCAR</span> operates as a secure, centralized spare parts hub that sources quotes from verified,
                                reputable suppliers across the UAE. We conduct the full price comparison internally and provide the
                                most cost-effective option, ensuring no third-party involvement or direct supplier interactions.
                                Our inventory covers a full range of <strong>OEM, aftermarket, refurbished and
                                    high-output Honda alternators</strong>. We serve Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah
                                and Fujairah with fast delivery, warranty options and bulk pricing tailored for garages and workshops.
                            </p>
                        </section>
                        <section>
                            <h2 className={`text-4xl md:text-2xl lg:text-3xl font-semibold xs:text-2xl xxs:text-2xl py-5 ${playfair_display.className}`}>
                                Why Choose EMIRATESCAR for Your Honda Alternator Replacement
                            </h2>
                            <p className={`text-xl font-sans text-gray-700 mx-auto xs:text-lg xl:text-lg xxs:text-lg ${firaSans.className}`}>
                                We deal in a wide range of Honda alternators across models and engine types, backed by
                                trusted UAE suppliers. Whether you need <em>one unit</em> or a <em>bulk order</em> for
                                your garage, you can compare prices, check compatibility and request quotations easily.
                            </p>
                            <ul className={`text-xl font-sans text-gray-700 mx-auto xs:text-lg xl:text-lg xxs:text-lg ${firaSans.className}`}>
                                <li>✔ Genuine OEM and reliable aftermarket options</li>
                                <li>✔ Verified suppliers and warranty-backed parts</li>
                                <li>✔ Bulk order discounts for workshops and spare parts shops</li>
                            </ul>
                        </section>
                        <section>
                            <h2 className={`text-4xl md:text-2xl lg:text-3xl font-semibold xs:text-2xl xxs:text-2xl py-5 ${playfair_display.className}`}>
                                Common Alternator Symptoms — When to Replace It
                            </h2>
                            <p className={`text-xl font-sans text-gray-700 mx-auto xs:text-lg xl:text-lg xxs:text-lg ${firaSans.className}`}>
                                If your Honda shows electrical issues, don&apos;t ignore it. Typical signs include the battery
                                warning light, dim or flickering headlights, slow cranking, frequent battery drain, or
                                electrical accessories failing. Early replacement prevents battery and ECU damage — and
                                saves your time and money.
                            </p>
                        </section>
                        <section>
                            <h2 className={`text-4xl md:text-2xl lg:text-3xl font-semibold xs:text-2xl xxs:text-2xl py-5 ${playfair_display.className}`}>
                                Models & Engine Coverage (Including K-Series Engines)
                            </h2>
                            <p className={`text-xl font-sans text-gray-700 mx-auto xs:text-lg xl:text-lg xxs:text-lg ${firaSans.className}`}>
                                We list alternators for all popular Honda models found on UAE roads — Accord, Civic, CR-V,
                                City, HR-V, Odyssey and Pilot — and we specifically support a wide range of <strong>K-series</strong>
                                and related engine codes used in these models. This makes it easy for both garage buyers and
                                individual owners to find a direct-fit alternator.
                            </p>


                            <ul className={`text-xl font-sans text-gray-700 mx-auto xs:text-lg xl:text-lg xxs:text-lg ${firaSans.className}`}>
                                <li>Popular models: Honda Accord, Civic, CR-V, City, HR-V, Odyssey, Pilot</li>
                                <li>Targeted engine codes: <strong>K20A, K20A2, K20, K20C, K20C1 (crate)</strong></li>
                                <li>Targeted engine codes: <strong>K24, K24A, K24A1, K24A2, K24A4, K24Z3, K24Z7</strong></li>
                            </ul>


                            <p className={`text-xl font-sans text-gray-700 mx-auto xs:text-lg xl:text-lg xxs:text-lg ${firaSans.className}`}>
                                Each K-series variant may require a different amperage, mounting bracket or regulator spec —
                                our listings include those details so a mechanic or owner can choose the correct alternator
                                the first time.
                            </p>
                        </section>
                        <section>
                            <h2 className={`text-4xl md:text-2xl lg:text-3xl font-semibold xs:text-2xl xxs:text-2xl py-5 ${playfair_display.className}`}>
                                Types of Honda Alternators Available in the UAE
                            </h2>
                            <p className={`text-xl font-sans text-gray-700 mx-auto xs:text-lg xl:text-lg xxs:text-lg ${firaSans.className}`}>
                                We make it easy to choose between OEM reliability and cost-effective aftermarket options.
                                Our marketplace lists brand-new OEM alternators, dependable aftermarket units, refurbished
                                assemblies and high-output alternators for vehicles with added electrical loads.
                            </p>


                            <ul className={`text-xl font-sans text-gray-700 mx-auto xs:text-lg xl:text-lg xxs:text-lg ${firaSans.className}`}>
                                <li>Genuine OEM alternators — exact fit and factory performance</li>
                                <li>Aftermarket alternators — value-focused replacements and popular with workshops</li>
                                <li>Refurbished/reconditioned alternators — economical for older vehicles</li>
                                <li>High-output alternators — for modified cars or heavy-electrical loads</li>
                            </ul>
                        </section>
                        <section>
                            <h2 className={`text-4xl md:text-2xl lg:text-3xl font-semibold xs:text-2xl xxs:text-2xl py-5 ${playfair_display.className}`}>
                                Pricing Guide — What to Expect in the UAE Market
                            </h2>
                            <p className={`text-xl font-sans text-gray-700 mx-auto xs:text-lg xl:text-lg xxs:text-lg ${firaSans.className}`}>
                                Prices vary by model, engine and condition. Below are approximate ranges that help both
                                visitors budgeting a repair and garages planning inventory purchases.
                            </p>

                            <p className={`text-xl font-sans text-gray-700 mx-auto xs:text-lg xl:text-lg xxs:text-lg ${firaSans.className}`}>
                                For K-series engines such as <strong>K20A2</strong> or <strong>K24A2</strong>, prices can
                                skew higher if you need OEM or high-output units. Garages ordering in bulk should ask
                                suppliers for wholesale discounts (typically 5–25% depending on quantity).
                            </p>
                        </section>
                        <section>
                            <h2 className={`text-4xl md:text-2xl lg:text-3xl font-semibold xs:text-2xl xxs:text-2xl py-5 ${playfair_display.className}`}>
                                Why Workshops & Showrooms Trust Our Platform
                            </h2>
                            <p className={`text-xl font-sans text-gray-700 mx-auto xs:text-lg xl:text-lg xxs:text-lg ${firaSans.className}`}>
                                UAE garages and showrooms rely on <a href="/" className='text-blue-600'>EMIRATESCAR</a> for streamlined procurement: supplier
                                verification, stock visibility, and fast lead times. For engine rebuilds, crate engines
                                (like K20C1 builds) and fleet maintenance, our bulk ordering and pricing tools reduce
                                downtime and improve margins.
                            </p>
                        </section>
                        {/* 8. Why Visitors Trust Us */}
                        <section>
                            <h2 className={`text-4xl md:text-2xl lg:text-3xl font-semibold xs:text-2xl xxs:text-2xl py-5 ${playfair_display.className}`}>
                                Why Honda Owners Choose <a href="/" className='text-blue-600'>EMIRATESCAR</a>
                            </h2>
                            <p className={`text-xl font-sans text-gray-700 mx-auto xs:text-lg xl:text-lg xxs:text-lg ${firaSans.className}`}>
                                Individual owners benefit from easy compatibility checks, clear pricing and delivery
                                across the UAE. If your Honda runs a K-series engine such as <strong>K20</strong> or
                                <strong>K24Z7</strong>, you can quickly find alternators that match your engine’s amps and
                                mounting style.
                            </p>
                        </section>
                        <section>
                            <h2 className={`text-4xl md:text-2xl lg:text-3xl font-semibold xs:text-2xl xxs:text-2xl py-5 ${playfair_display.className}`}>
                                How to Order Your Honda Alternator Online
                            </h2>
                            <p className={`text-xl font-sans text-gray-700 mx-auto xs:text-lg xl:text-lg xxs:text-lg ${firaSans.className}`}>
                                Ordering is simple: choose your model and engine, select Alternator under parts, compare
                                OEM and aftermarket listings, and submit an inquiry or request for bulk pricing. Suppliers
                                will contact you via WhatsApp, phone or email with delivery and warranty details.
                            </p>
                        </section>
                        <section className="pb-12">
                            <h2 className={`text-4xl md:text-2xl lg:text-3xl font-semibold xs:text-2xl xxs:text-2xl py-5 ${playfair_display.className}`}>
                                Buy Honda Alternators in the UAE — Fast, Reliable & Compatible
                            </h2>
                            <p className={`text-xl font-sans text-gray-700 mx-auto xs:text-lg xl:text-lg xxs:text-lg ${firaSans.className}`}>
                                Whether you’re a garage stocking parts or an owner replacing an alternator on a K-series
                                engine, <a href="/" className='text-blue-600'>EMIRATESCAR</a> helps you find the right part with confidence. Contact suppliers
                                today to request a quote, check compatibility for <strong>K20A2, K24A2</strong> and other
                                engines, or secure bulk order pricing for your workshop.
                            </p>
                        </section></> : ""}


                </div>
            )}
            {hasPartInSubcategory && (
                <div className='max-w-7xl mx-auto'>
                    <div className="flex items-center mt-10 xs:pt-5 s:pt-5">
                        <div>
                            <div className="mx-auto xs:ml-1 xxs:ml-4 xxs:mt-8 xs:px-5 sm:ml-6 lg:ml-1 xl:ml-20 sm:mx-auto mt-10 sm:mt-12 md:mt-10 lg:mt-20 lg:px-8 xl:mt-28 xs:mt-2 xs:text-left s:mt-2">
                                <h1 className={`mt-3 text-5xl lg:text-4xl sm:text-lg xs:text-3xl xxs:text-3xl md:text-4xl font-head font-extrabold ${playfair_display.className}`}>
                                    {isBattery ? (<><> <span className="flex items-center">{make} Battery Replacement Serivces in UAE - Dubai & Sharjah <a href="#myBatteryForm"><LinkIcon className="text-blue-500 h-16 w-16" /></a></span></></>) : (<> {make} {partEntry.parts} - Genuine & Aftermarket in UAE</>)}
                                </h1>
                            </div>
                        </div>
                    </div>

                    {isBattery ? (<> <div className="grid grid-cols-2 xs:grid-cols-1 xxs:grid-cols-1 mx-auto xl:px-10 xs:px-3 xxs:px-4 md:px-5 lg:px-6 mt-5 border-2 p-5 rounded-sm">
                        <div className='mt-20 xs:mt-5 xxs:mt-5 sm:mt-5 md:mt-5 lg:mt-10'>
                            <h2 className={`flex items-center font-bold text-3xl mt-3 xs:text-2xl ${playfair_display.className}`}>
                                {make} Battery Replacement Services in Dubai & Sharjah <span><a href="#myBatteryForm"><LinkIcon className="text-blue-500 h-12 w-12 md:hidden lg:hidden xxl:hidden xl:hidden xs:h-5 xxs:h-5" /></a></span>
                            </h2>
                            <ul className='space-y-3 mt-5'>
                                <li className="flex items-start gap-3">
                                    <Clock className={`w-5 h-5 text-blue-600 flex-shrink-0 mt-1 ${firaSans.className}`} />
                                    <span>24/7 emergency car battery replacement services available round the clock</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Car className={`w-5 h-5 text-red-600 flex-shrink-0 mt-1 ${firaSans.className}`} />
                                    <span>On-site car battery replacement at your location for maximum convenience</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <MapPin className={`w-5 h-5 text-black flex-shrink-0 mt-1 ${firaSans.className}`} />
                                    <span>Services available across Dubai and Sharjah with quick response times</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <BadgeCheck className={`w-5 h-5 text-yellow-400 flex-shrink-0 mt-1 ${firaSans.className}`} />
                                    <span>Instant professional installation by certified technicians</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Recycle className={`w-5 h-5 text-green-600 flex-shrink-0 mt-1 ${firaSans.className}`} />
                                    <span>Safe old Battery Disposal</span>
                                </li>
                            </ul>
                        </div>
                        <div><FormBattery formsData={modelsform} /></div>
                    </div></>) : (<><div className='sm:max-w-xl lg:max-w-2xl md:max-w-xl xl:max-w-2xl xxl:max-w-2xl mx-auto xs:mx-3 xxs:mx-3 sm:mx-5'>
                        <FormMakePart formsData={modelsform} mke={make} />
                    </div></>)}



                    <section>
                        {partFiltered.length > 0 ?
                            <Product
                                make={make}
                                parts={parts}
                                products={filtered}
                                allProducts={partFiltered}
                            /> : <></>}
                    </section>

                    <section className="mt-10 shadow-sm mx-4 md:mx-4 lg:max-w-4xl lg:mx-auto xl:mx-10 bg-bglight px-20 xs:px-3 xxs:px-3">
                        <div className="container py-6">
                            <h2 className={`text-black text-4xl text-center md:text-2xl lg:text-3xl font-bold xs:text-xl xxs:text-2xl pt-10 ${firaSans.className}`}>
                                Search <span className='text-blue-600'>{decodeURIComponent(parts)}</span> for all {make} model
                            </h2>
                            <SearchModel make={make} car={carmodel} />

                            <ul className="grid grid-cols-4 md:grid-cols-3 sm:grid-cols-4 xs:grid-cols-2 xxs:grid-cols-3 gap-3 xs:gap-1 mt-10">
                                {carmodel.map((post, i) => {
                                    const isBattery = decodeURIComponent(partEntry.parts).toLowerCase() === 'battery';

                                    // Check if this specific model has seo=true
                                    const key = `${post.make.toLowerCase()}-${post.model.toLowerCase()}`;
                                    const carEntry = carDataByMakeModel[key];
                                    const hasSEO = carEntry?.some(car => car.seo === true);

                                    let linkHref, linkAs;
                                    if (isBattery) {
                                        linkHref = '/car-battery-replacement-services-in-uae'
                                        linkAs = '/car-battery-replacement-services-in-uae'
                                    } else if (excludedMakes.includes(make)) {
                                        linkHref = '/get-in-touch'
                                        linkAs = '/get-in-touch'
                                    } else if (hasSEO) {
                                        // Model has seo=true, link to the subcategory page
                                        linkHref = '/search-by-make/[make]/[model]/[category]/[subcategory]'
                                        linkAs = `/search-by-make/${encodeURIComponent(post.make)}/${encodeURIComponent(post.model)}/${encodeURIComponent(partEntry.category)}/${parts}`
                                    } else {
                                        // Model has seo=false, link to model page with form anchor
                                        linkHref = '/search-by-make/[make]/[model]#myForm'
                                        linkAs = `/search-by-make/${encodeURIComponent(post.make)}/${encodeURIComponent(post.model)}#myForm`
                                    }

                                    return (
                                        <li key={i} className="h-full">
                                            <Link
                                                href={linkHref}
                                                as={linkAs}
                                                target='_blank'
                                                title={`${post.make} ${post.model} ${decodeURIComponent(parts)}`}
                                                className="block border border-blue-800 hover:border-blue-900 bg-white rounded-sm h-full p-3 text-center"
                                            >
                                                <span className="text-center text-black text-lg font-medium hover:text-gray-800 p-2 xs:p-0 font-sans underline ">
                                                    <span className='text-blue-600'>{make} {post.model}</span> {decodeURIComponent(partEntry.parts) === 'Battery' ? "Battery replacement services in UAE" : decodeURIComponent(partEntry.parts)}
                                                </span>
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>

                        </div>
                    </section>


                    <section>
                        <h2
                            className={`text-black text-4xl text-center md:text-2xl lg:text-3xl font-bold xs:text-xl xxs:text-2xl pt-10 ${firaSans.className}`}
                        >
                            Search{" "}
                            <span className="text-blue-500">
                                {decodeURIComponent(partEntry.parts)}{" "}
                            </span>
                            for Any Models
                        </h2>

                        <ul className="grid grid-cols-5 md:grid-cols-5 lg:grid-cols-5 md:mx-4 sm:mx-3 xs:grid xs:grid-cols-2 sm:grid sm:grid-cols-6 xxs:grid xxs:grid-cols-2 s:grid s:grid-cols-2 gap-3 xs:gap-1 xxs:gap-1 sm:gap-2 s:gap-2 md:gap-2 xs:mx-4 s:mx-4 xxs:mx-4 md:ml-11 my-10 mx-10">
                            {makedatas
                                .filter(post => !excludedMakes.includes(post.make))
                                .map((post, i) => {
                                    const isPartAvailable = selectedParts.includes(partEntry.parts);

                                    // Build link conditionally
                                    const href = isPartAvailable
                                        ? `/search-by-make/${encodeURIComponent(post.make)}/parts/${encodeURIComponent(partEntry.parts)}`
                                        : `/get-in-touch`;

                                    return (
                                        <li key={i} className="border">
                                            <Link href={href} title={`${post.make} ${decodeURIComponent(partEntry.parts)}`}>
                                                <span className="h-full hover:border-blue-600 py-3 bg-gray-100 rounded-sm">
                                                    <Image
                                                        src={`/img/car-logos/${post.img}`}
                                                        alt={`${post.make} spare parts`}
                                                        className="mx-auto m-3"
                                                        width={70}
                                                        height={70}
                                                    />
                                                    <p className="text-center font-sans font-medium text-lg">
                                                        <span className="text-blue-600">{post.make}</span>{" "}
                                                        {decodeURIComponent(partEntry.parts)}
                                                    </p>
                                                </span>
                                            </Link>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    </section>


                    <TenEntries />
                    <section>
                        <h2 className={`text-black text-4xl text-center md:text-2xl lg:text-3xl font-bold xs:text-xl xxs:text-2xl pt-10 ${firaSans.className}`}>
                            Search{' '}
                            <span className="text-blue-500">
                                {decodeURIComponent(partEntry.parts)}{' '}
                            </span>
                            parts in UAE
                        </h2>
                        <div className="grid grid-cols-5 md:grid-cols-5 lg:grid-cols-5 md:mx-4 sm:mx-3 xs:grid xs:grid-cols-2 sm:grid sm:grid-cols-6 xxs:grid xxs:grid-cols-2 s:grid s:grid-cols-2 gap-3 xs:gap-1 xxs:gap-1 sm:gap-2 s:gap-2 md:gap-2 xs:mx-4 s:mx-4 xxs:mx-4 md:ml-11 my-10 mx-10">
                            {cities.map((post, i) => (
                                <div key={i} className='border'>
                                    <Link
                                        href="/search-by-cities-in-uae/[city]"
                                        as={'/search-by-cities-in-uae/' + post.city}
                                        target='_blank'
                                        title={
                                            make + " " + decodeURIComponent(partEntry.parts) + ' in ' + post.city
                                        }
                                    >
                                        <span className="h-full hover:border-blue-600 py-auto bg-gray-100 rounded-sm">
                                            <p className={`text-center my-auto font-sans font-medium text-lg xs:text-base xxs:text-base`}>
                                                {decodeURIComponent(partEntry.parts)} in <span className='text-blue-600'>{post.city}</span>
                                            </p>
                                        </span>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </section>
                    {parts === 'Alternator' && make === 'Honda' ? <>
                        <section>
                            <h2 className={`text-4xl md:text-2xl lg:text-3xl font-semibold xs:text-2xl xxs:text-2xl py-5 ${playfair_display.className}`}>
                                Find the Right Honda Alternator in the UAE — For Garages & Car Owners
                            </h2>
                            <p className={`text-xl font-sans text-gray-700 mx-auto xs:text-lg xl:text-lg xxs:text-lg ${firaSans.className}`}>
                                Whether you run a workshop, showroom, spare parts shop or you are a Honda owner,
                                <span className='text-blue-600'> EMIRATESCAR</span> operates as a secure, centralized spare parts hub that sources quotes from verified,
                                reputable suppliers across the UAE. We conduct the full price comparison internally and provide the
                                most cost-effective option, ensuring no third-party involvement or direct supplier interactions.
                                Our inventory covers a full range of <strong>OEM, aftermarket, refurbished and
                                    high-output Honda alternators</strong>. We serve Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah
                                and Fujairah with fast delivery, warranty options and bulk pricing tailored for garages and workshops.
                            </p>
                        </section>
                        <section>
                            <h2 className={`text-4xl md:text-2xl lg:text-3xl font-semibold xs:text-2xl xxs:text-2xl py-5 ${playfair_display.className}`}>
                                Why Choose EMIRATESCAR for Your Honda Alternator Replacement
                            </h2>
                            <p className={`text-xl font-sans text-gray-700 mx-auto xs:text-lg xl:text-lg xxs:text-lg ${firaSans.className}`}>
                                We deal in a wide range of Honda alternators across models and engine types, backed by
                                trusted UAE suppliers. Whether you need <em>one unit</em> or a <em>bulk order</em> for
                                your garage, you can compare prices, check compatibility and request quotations easily.
                            </p>
                            <ul className={`text-xl font-sans text-gray-700 mx-auto xs:text-lg xl:text-lg xxs:text-lg ${firaSans.className}`}>
                                <li>✔ Genuine OEM and reliable aftermarket options</li>
                                <li>✔ Verified suppliers and warranty-backed parts</li>
                                <li>✔ Bulk order discounts for workshops and spare parts shops</li>
                            </ul>
                        </section>
                        <section>
                            <h2 className={`text-4xl md:text-2xl lg:text-3xl font-semibold xs:text-2xl xxs:text-2xl py-5 ${playfair_display.className}`}>
                                Common Alternator Symptoms — When to Replace It
                            </h2>
                            <p className={`text-xl font-sans text-gray-700 mx-auto xs:text-lg xl:text-lg xxs:text-lg ${firaSans.className}`}>
                                If your Honda shows electrical issues, don&apos;t ignore it. Typical signs include the battery
                                warning light, dim or flickering headlights, slow cranking, frequent battery drain, or
                                electrical accessories failing. Early replacement prevents battery and ECU damage — and
                                saves your time and money.
                            </p>
                        </section>
                        <section>
                            <h2 className={`text-4xl md:text-2xl lg:text-3xl font-semibold xs:text-2xl xxs:text-2xl py-5 ${playfair_display.className}`}>
                                Models & Engine Coverage (Including K-Series Engines)
                            </h2>
                            <p className={`text-xl font-sans text-gray-700 mx-auto xs:text-lg xl:text-lg xxs:text-lg ${firaSans.className}`}>
                                We list alternators for all popular Honda models found on UAE roads — Accord, Civic, CR-V,
                                City, HR-V, Odyssey and Pilot — and we specifically support a wide range of <strong>K-series</strong>
                                and related engine codes used in these models. This makes it easy for both garage buyers and
                                individual owners to find a direct-fit alternator.
                            </p>


                            <ul className={`text-xl font-sans text-gray-700 mx-auto xs:text-lg xl:text-lg xxs:text-lg ${firaSans.className}`}>
                                <li>Popular models: Honda Accord, Civic, CR-V, City, HR-V, Odyssey, Pilot</li>
                                <li>Targeted engine codes: <strong>K20A, K20A2, K20, K20C, K20C1 (crate)</strong></li>
                                <li>Targeted engine codes: <strong>K24, K24A, K24A1, K24A2, K24A4, K24Z3, K24Z7</strong></li>
                            </ul>


                            <p className={`text-xl font-sans text-gray-700 mx-auto xs:text-lg xl:text-lg xxs:text-lg ${firaSans.className}`}>
                                Each K-series variant may require a different amperage, mounting bracket or regulator spec —
                                our listings include those details so a mechanic or owner can choose the correct alternator
                                the first time.
                            </p>
                        </section>
                        <section>
                            <h2 className={`text-4xl md:text-2xl lg:text-3xl font-semibold xs:text-2xl xxs:text-2xl py-5 ${playfair_display.className}`}>
                                Types of Honda Alternators Available in the UAE
                            </h2>
                            <p className={`text-xl font-sans text-gray-700 mx-auto xs:text-lg xl:text-lg xxs:text-lg ${firaSans.className}`}>
                                We make it easy to choose between OEM reliability and cost-effective aftermarket options.
                                Our marketplace lists brand-new OEM alternators, dependable aftermarket units, refurbished
                                assemblies and high-output alternators for vehicles with added electrical loads.
                            </p>


                            <ul className={`text-xl font-sans text-gray-700 mx-auto xs:text-lg xl:text-lg xxs:text-lg ${firaSans.className}`}>
                                <li>Genuine OEM alternators — exact fit and factory performance</li>
                                <li>Aftermarket alternators — value-focused replacements and popular with workshops</li>
                                <li>Refurbished/reconditioned alternators — economical for older vehicles</li>
                                <li>High-output alternators — for modified cars or heavy-electrical loads</li>
                            </ul>
                        </section>
                        <section>
                            <h2 className={`text-4xl md:text-2xl lg:text-3xl font-semibold xs:text-2xl xxs:text-2xl py-5 ${playfair_display.className}`}>
                                Pricing Guide — What to Expect in the UAE Market
                            </h2>
                            <p className={`text-xl font-sans text-gray-700 mx-auto xs:text-lg xl:text-lg xxs:text-lg ${firaSans.className}`}>
                                Prices vary by model, engine and condition. Below are approximate ranges that help both
                                visitors budgeting a repair and garages planning inventory purchases.
                            </p>

                            <p className={`text-xl font-sans text-gray-700 mx-auto xs:text-lg xl:text-lg xxs:text-lg ${firaSans.className}`}>
                                For K-series engines such as <strong>K20A2</strong> or <strong>K24A2</strong>, prices can
                                skew higher if you need OEM or high-output units. Garages ordering in bulk should ask
                                suppliers for wholesale discounts (typically 5–25% depending on quantity).
                            </p>
                        </section>
                        <section>
                            <h2 className={`text-4xl md:text-2xl lg:text-3xl font-semibold xs:text-2xl xxs:text-2xl py-5 ${playfair_display.className}`}>
                                Why Workshops & Showrooms Trust Our Platform
                            </h2>
                            <p className={`text-xl font-sans text-gray-700 mx-auto xs:text-lg xl:text-lg xxs:text-lg ${firaSans.className}`}>
                                UAE garages and showrooms rely on <a href="/" className='text-blue-600'>EMIRATESCAR</a> for streamlined procurement: supplier
                                verification, stock visibility, and fast lead times. For engine rebuilds, crate engines
                                (like K20C1 builds) and fleet maintenance, our bulk ordering and pricing tools reduce
                                downtime and improve margins.
                            </p>
                        </section>
                        {/* 8. Why Visitors Trust Us */}
                        <section>
                            <h2 className={`text-4xl md:text-2xl lg:text-3xl font-semibold xs:text-2xl xxs:text-2xl py-5 ${playfair_display.className}`}>
                                Why Honda Owners Choose <a href="/" className='text-blue-600'>EMIRATESCAR</a>
                            </h2>
                            <p className={`text-xl font-sans text-gray-700 mx-auto xs:text-lg xl:text-lg xxs:text-lg ${firaSans.className}`}>
                                Individual owners benefit from easy compatibility checks, clear pricing and delivery
                                across the UAE. If your Honda runs a K-series engine such as <strong>K20</strong> or
                                <strong>K24Z7</strong>, you can quickly find alternators that match your engine’s amps and
                                mounting style.
                            </p>
                        </section>
                        <section>
                            <h2 className={`text-4xl md:text-2xl lg:text-3xl font-semibold xs:text-2xl xxs:text-2xl py-5 ${playfair_display.className}`}>
                                How to Order Your Honda Alternator Online
                            </h2>
                            <p className={`text-xl font-sans text-gray-700 mx-auto xs:text-lg xl:text-lg xxs:text-lg ${firaSans.className}`}>
                                Ordering is simple: choose your model and engine, select Alternator under parts, compare
                                OEM and aftermarket listings, and submit an inquiry or request for bulk pricing. Suppliers
                                will contact you via WhatsApp, phone or email with delivery and warranty details.
                            </p>
                        </section>
                        <section className="pb-12">
                            <h2 className={`text-4xl md:text-2xl lg:text-3xl font-semibold xs:text-2xl xxs:text-2xl py-5 ${playfair_display.className}`}>
                                Buy Honda Alternators in the UAE — Fast, Reliable & Compatible
                            </h2>
                            <p className={`text-xl font-sans text-gray-700 mx-auto xs:text-lg xl:text-lg xxs:text-lg ${firaSans.className}`}>
                                Whether you’re a garage stocking parts or an owner replacing an alternator on a K-series
                                engine, <a href="/" className='text-blue-600'>EMIRATESCAR</a> helps you find the right part with confidence. Contact suppliers
                                today to request a quote, check compatibility for <strong>K20A2, K24A2</strong> and other
                                engines, or secure bulk order pricing for your workshop.
                            </p>
                        </section></> : ""}

                    <section className="mt-10 shadow-sm mx-4 md:mx-4 lg:max-w-4xl lg:mx-auto xl:mx-10 bg-gray-100 px-20 xs:px-3 xxs:px-3">
                        <div className="container py-6">
                            <h2 className={`text-black text-4xl text-center md:text-2xl lg:text-3xl font-bold xs:text-xl xxs:text-2xl pt-10 ${firaSans.className}`}>
                                Search All <span className='text-blue-500'>{make}</span> Parts in UAE
                            </h2>

                            <ul className="grid grid-cols-4 md:grid-cols-3 sm:grid-cols-4 xs:grid-cols-2 xxs:grid-cols-3 gap-3 xs:gap-1 mt-10">
                                {partsposts
                                    .filter(post => selectedParts.includes(post.parts))
                                    .map((post, i) => {
                                        // Check if any model for this make has seo=true
                                        const makeLower = make.toLowerCase();
                                        const carsForMake = carDataByMake[makeLower] || [];
                                        const hasSEO = carsForMake.some(car => car.seo === true);

                                        const linkHref = hasSEO
                                            ? `/search-by-make/${encodeURIComponent(make)}/parts/${encodeURIComponent(post.parts)}`
                                            : `/search-by-make/${encodeURIComponent(make)}#myForm`;

                                        return (
                                            <li key={i} className="border">
                                                <a href={linkHref} target="_blank">
                                                    <div className="flex flex-col hover:border-blue-600 py-3 bg-gray-100 rounded-sm">
                                                        <div className="w-[120px] h-[120px] mx-auto m-3 flex items-center justify-center">
                                                            <Image
                                                                src={post.img || '/img/parts/car-spare-parts.png'}
                                                                alt={`${make} ${post.parts}`}
                                                                className="max-w-full max-h-full object-contain"
                                                                width={120}
                                                                height={120}
                                                            />
                                                        </div>
                                                        <p className="text-center font-sans font-medium text-base">
                                                            <span>{make} {post.parts}</span>
                                                        </p>
                                                    </div>
                                                </a>
                                            </li>
                                        );
                                    })
                                }
                            </ul>
                        </div>
                    </section>
                </div>
            )}
        </>

    );
}
