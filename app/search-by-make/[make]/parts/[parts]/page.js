import Image from 'next/image';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import FormComponent from '../../../../../components/FormComponent';
import TenEntries from '../../../../../components/tenentries';
import SearchModel from '../../../../../components/SearchModel';
import { Fira_Sans, Playfair_Display } from 'next/font/google';
import products from "../../../../../public/products.json"
import partsData from "../../../../../public/lib/parts.json"
import CarData from "../../../../../public/lib/car-data.json"
import CitiesData from "../../../../../public/lib/cities.json"
export const revalidate = 86400;
export const runtime = 'nodejs';
export const dynamicParams = true;

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
    'Acura', 'Buick', 'Eagle', 'Lotus', 'Plymouth', 'Pontiac', 'Saab', 'Subaru',
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

export function generateStaticParams() {
    try {
        const params = [];
        const unique = new Set();

        // Step 1: Get unique makes from CarData (excluding blocked ones)
        const uniqueMakes = new Set();
        for (let i = 0; i < CarData.length; i++) {
            const car = CarData[i];
            if (car.make && !excludedMakesSet.has(car.make)) {
                uniqueMakes.add(car.make);
            }
        }

        // Step 2: Check which make/parts combinations actually have products
        for (let i = 0; i < products.length; i++) {
            const product = products[i];

            if (!product.compatibility || !product.subcategory) continue;

            for (let j = 0; j < product.compatibility.length; j++) {
                const compat = product.compatibility[j];
                const make = compat.make;

                if (!make || excludedMakesSet.has(make) || !uniqueMakes.has(make)) continue;

                for (let k = 0; k < partsData.length; k++) {
                    const part = partsData[k];

                    if (part.parts &&
                        product.subcategory.toLowerCase() === part.parts.toLowerCase()) {

                        const key = `${make}|${part.parts}`;

                        if (!unique.has(key)) {
                            unique.add(key);
                            params.push({
                                make: make,
                                parts: part.parts
                            });
                        }
                    }
                }
            }
        }

        console.log(` Generated ${params.length} params (only pages with products)`);
        return params;

    } catch (error) {
        console.error(' Error generating static params:', error);
        return [];
    }
}

export function generateMetadata({ params }) {
    const { parts, make } = params;
    const partsDa = partsData;

    const partEntry = partsDa.find(
        (p) => p.parts.toLowerCase() === decodeURIComponent(parts).toLowerCase()
    );

    if (!partEntry) {
        return {
            title: 'Parts not found',
            robots: { index: false, follow: false }
        };
    }


    const makeFiltered = products.filter(product =>
        product.compatibility?.some(
            (c) => c.make.toLowerCase() === make.toLowerCase()
        )
    );

    const partFiltered = makeFiltered.filter(product =>
        product.subcategory.toLowerCase() === partEntry.parts.toLowerCase()
    );

    const productListItems = partFiltered.map((product, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
            "@type": "Product",
            "@id": `https://www.emirates-car.com/search-by-make/${make}/${product.compatibility[0].model}/${product.category}/${product.partname}-${make}-${product.compatibility[0].model}-${product.compatibility[0].years}-${product.partnumber}-${product.id}#product`,
            "name": `${product.partname} ${product.partnumber} ${make}`,
            "url": `https://www.emirates-car.com/search-by-make/${make}/${product.category}/${product.partname}-${product.partnumber}-${product.id}`,
            "image": `https://www.emirates-car.com/${product.image}`,
            "description": `${product.partname} compatible with ${make} ${product.compatibility?.map(c => c.model).join(", ")}`,
            "brand": { "@type": "Brand", "name": product.compatibility[0]?.make || make },
            "mpn": product.partnumber,
            "offers": {
                "@type": "Offer",
                "url": `https://www.emirates-car.com/search-by-make/${make}/${product.category}/${product.partname}-${product.partnumber}-${product.id}`,
                "priceCurrency": product.pricing.currency,
                "price": product.pricing.price,
                "availability": "https://schema.org/InStock",
                "itemCondition": "https://schema.org/NewCondition"
            },
            "isAccessoryOrSparePartFor": {
                "@type": "Car",
                "make": { "@type": "Brand", "name": product.compatibility[0]?.make || make },
                "model": product.compatibility[0]?.model
            }
        }
    }));


    const faqSchema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "FAQPage",
                "divEntity": [
                    {
                        "@type": "Question",
                        "name": `Do you sell genuine ${make} spare parts in UAE?`,
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": `Yes, we supply genuine OEM ${make} ${parts} parts, as well as used and aftermarket options to suit your budget.`
                        }
                    },
                    {
                        "@type": "Question",
                        "name": `Can I buy used or aftermarket ${make} ${parts} parts to save costs?`,
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": `Yes, we offer used and aftermarket ${make} ${parts} spare parts that are tested for quality and performance.`
                        }
                    },
                    {
                        "@type": "Question",
                        "name": `Do you deliver ${make} ${parts} parts across UAE?`,
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": `Yes, we deliver ${make} ${parts} spare parts to Dubai, Abu Dhabi, Sharjah, Ajman, and other Emirates. International shipping is also available.`
                        }
                    },
                    {
                        "@type": "Question",
                        "name": `How do I know if a part fits my ${make} ${parts}?`,
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": `You can share your car's VIN or model details with us, and we will confirm compatibility before shipping.`
                        }
                    },
                    {
                        "@type": "Question",
                        "name": `Do your ${make} spare parts come with warranty?`,
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": `Yes, all new and OEM ${make} ${parts} spare parts come with a standard warranty. Used parts are tested but carry limited warranty.`
                        }
                    }
                ]
            },
            {
                "@type": "CollectionPage",
                "name": `${make} ${parts} Spare Parts | EMIRATESCAR`,
                "url": `https://www.emirates-car.com/search-by-make/${make}`,
                "description": `Find ${parts} genuine, OEM, and aftermarket spare parts for all ${make} models.`,
                "about": { "@type": "Brand", "name": make },
                "mainEntity": {
                    "@type": "ItemList",
                    "itemListElement": productListItems
                }
            },
            {
                "@context": "https://schema.org",
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
                        "item": `https://www.emirates-car.com/search-by-makes/`
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "name": `${make} Spare Parts`,
                        "item": `https://www.emirates-car.com/search-by-make/${make}`
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "name": `${make} ${parts} Spare Parts`,
                        "item": `https://www.emirates-car.com/search-by-make/${make}/parts/${parts}`
                    }
                ]
            },
        ]
    };
    return {
        title: `${make} ${parts} for sale from Dubai dealers in UAE - Used, Genuine, OEM and Aftermarket - Best price`,
        description: `Find genuine, OEM, used & aftermarket ${make} ${parts} spare parts in Dubai, Sharjah & across the UAE. Get best prices and fast quotes from trusted dealers today.`,
        metadataBase: new URL(
            `https://www.emirates-car.com`
        ),
        openGraph: {
            title: `${make} ${parts} - Used, Genuine, OEM and Aftermarket`,
            description: `Find genuine, OEM, used & aftermarket ${make} spare parts in Dubai, Sharjah & across the UAE. Get best prices and fast quotes from trusted dealers today.`,
            url: 'https://www.emirates-car.com/search-by-make/' + encodeURIComponent(make) + "/parts/" + encodeURIComponent(parts),
            image: 'https://www.emirates-car.com/img/car-spare-parts.png',
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
            title: `${make} Spare Parts Dubai dealers UAE - Used, Genuine, OEM and Aftermarket`,
            url: 'https://www.emirates-car.com/search-by-make/' + encodeURIComponent(make) + "/parts/" + encodeURIComponent(parts),
            description: `Find genuine, OEM, used & aftermarket ${make} ${parts} spare parts in Dubai, Sharjah & across the UAE. Get best prices and fast quotes from trusted dealers today.`,
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
        category: `${make} auto spare parts`,
        alternates: {
            canonical: `https://www.emirates-car.com/search-by-make/${encodeURIComponent(make)}/parts/${encodeURIComponent(parts)}`,
        },
        other: {
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
    const carmodel = getModel(make)
    const imageMake = getMakeImage(make)
    const partsDa = partsData;


    if (!partsData || partsData.length === 0) {
        notFound();
    }
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
    const partEntry = partsDa.find(
        (p) => p.parts.toLowerCase() === decodeURIComponent(parts).toLowerCase()
    );

    if (!partEntry) {
        redirect("/get-in-touch");
    }

    const makeFiltered = products.filter(product =>
        product.compatibility?.some(
            (c) => c.make.toLowerCase() === make.toLowerCase()
        )
    );

    const partFiltered = makeFiltered.filter(product =>
        product.subcategory.toLowerCase() === partEntry.parts.toLowerCase()
    );

    if (partFiltered.length === 0) {
        redirect("/get-in-touch");
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

    const excludedMakes = [
        'Acura', 'Buick', 'Eagle', 'Lotus', 'Plymouth', 'Pontiac', 'Saab', 'Subaru',
        'Alpha Romeo', 'Geo', 'Oldsmobile', 'Isuzu', 'Saturn', 'Corbin', 'Holden',
        'Spyker', 'Spyker Cars', 'Aston Martin', 'Panoz', 'Foose', 'Morgan', 'Aptera',
        'Smart', 'SRT', 'Roush Performance', 'Pagani', 'Mobility Ventures LLC',
        'RUF Automobile', 'Koenigsegg', 'Karma', 'Polestar', 'STI', 'Kandi', 'Abarth',
        'Dorcen', 'Foton', 'W Motors', 'Opel', 'Skoda', 'Hillman', 'Austin', 'Fillmore',
        'Maybach', 'Merkur', 'Rambler', 'Shelby', 'Studebaker', 'Great Wall GWM', 'Zeekr', 'ZNA', 'GAC', 'Gs7', 'Hongqi',
        'W Motor', 'JAC', 'Jaecoo', 'Jetour', 'TANK', 'Soueast', 'Zarooq Motors', 'Changan', 'Maxus', 'Haval', 'Zotye', 'Sandstorm',
        'Chery', 'Geely', 'BAIC', 'Bestune'
    ];
    const isExcludedMake = excludedMakes.includes(make);
    if (excludedMakes.includes(make)) {
        redirect('/get-in-touch');
    }

    const data = CarData.filter(item => item.make === make);

    if (!data || data.length === 0) {
        notFound();
    }

    const cities = CitiesData;
    const makedatas = getMake();
    const partsposts = partsData;
    const modelsform = CarData;


    return (
        <>
            <div className='max-w-7xl mx-auto'>
                <div className="py-5 xxs:px-7 sm:px-7 s:py-6 lg:mx-6 md:mx-6 xs:mx-2 xxs:mx-2 max-w-7xl mx-auto">
                    <div className="bg-backgroundlight rounded-sm">
                        <div className="grid grid-cols-2 xs:grid xs:grid-cols-1 s:grid s:grid-cols-1 xs:text-center sm:grid sm:grid-cols-2 xxs:grid xxs:grid-cols-1 xs:pt-5 s:pt-5">
                            <div>
                                <div className="ml-8 md:ml-8 xs:ml-1 xxs:ml-4 xxs:mt-8 xs:px-5 sm:ml-6 lg:ml-1 xl:ml-20 sm:mx-auto mt-10 sm:mt-12 md:mt-10 lg:mt-20 lg:px-8 xl:mt-28 xs:mt-2 xs:text-left s:mt-2">
                                    <div className="lg:text-left">

                                        <h1 className={`mt-3 text-5xl lg:text-4xl sm:text-lg xs:text-xl xxs:text-xl md:text-xl font-head font-bold ${firaSans.className}`}>
                                            <span className="text-blue-500">{make} {partEntry.parts}</span> - Used, Genuine & Aftermarket in UAE
                                        </h1>
                                        <div className="mt-5 sm:mt-5 xxs:my-5 xs:my-5 lg:justify-start">
                                            <div className="py-3 px-4 sm:py-0 sm:px-0 w-1/2 lg:w-full xs:w-full xxs:w-3/4 xs:mx-auto s:w-full sm:w-3/4 md:w-full md:mx-auto md:px-0 md:py-0 xs:py-0 xs:px-0 xxs:px-0 xxs:py-0 lg:px-0 lg:py-0 xl:px-0 xl:py-0 xxl:px-0 xxl:py-0 rounded-lg shadow-md sm:shadow-none">
                                                <a
                                                    href="/#myForm"
                                                    title="vehicle parts online"
                                                    className="flex items-center justify-center py-2 xs:py-2 xxs:py-1 sm:py-0 text-xl sm:text-base xl:text-xl border border-transparent font-medium rounded-sm text-white bg-blue-600 hover:bg-blue-700 md:py-2 md:text-md md:text-lg md:px-5 xs:text-sm xxs:text-sm xxs:my-2 lg:my-2 s:text-sm s:my-2 focus:filter brightness-125"
                                                >
                                                    Inquire Now
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="xxs:hidden xs:hidden p-35 md:p-20 lg:p-20">
                                {imageMake && (
                                    <Image
                                        src={`/img/car-logos/${imageMake}`}
                                        alt={`${make} spare parts`}
                                        width={300}
                                        height={300}
                                        priority
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    <section className="grid grid-cols-1 s:grid s:grid-cols-1 xs:grid xs:grid-cols-1 xxs:grid xxs:grid-cols-1 sm:grid sm:grid-cols-1">
                        <FormComponent formsData={modelsform} postFilter={partsposts} />

                    </section>
                    <section className="mt-10 shadow-sm mx-4 md:mx-4 lg:max-w-4xl lg:mx-auto xl:mx-10 bg-bglight px-20 xs:px-3 xxs:px-3">
                        <div className="container py-6">
                            <h2 className={`text-black text-4xl text-center md:text-2xl lg:text-3xl font-bold xs:text-xl xxs:text-2xl pt-10 ${firaSans.className}`}>
                                Search <span className='text-blue-600'>{decodeURIComponent(parts)}</span> for all {make} model
                            </h2>
                            <SearchModel make={make} car={carmodel} />

                            <ul className="grid grid-cols-4 md:grid-cols-3 sm:grid-cols-4 xs:grid-cols-2 xxs:grid-cols-3 gap-3 xs:gap-1 mt-10">
                                {carmodel.map((post, i) => {
                                    const linkHref = isExcludedMake
                                        ? '/get-in-touch'
                                        : '/search-by-make/[make]/[model]/[category]/[subcategory]';
                                    const linkAs = isExcludedMake
                                        ? '/get-in-touch'
                                        : `/search-by-make/${post.make}/${post.model}/${partsData.category}/${parts}`;

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
                                                    <span className='text-blue-600'>{make} {post.model}</span> {decodeURIComponent(parts)} parts
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

                        <div className="grid grid-cols-5 md:grid-cols-5 lg:grid-cols-5 md:mx-4 sm:mx-3 xs:grid xs:grid-cols-2 sm:grid sm:grid-cols-6 xxs:grid xxs:grid-cols-2 s:grid s:grid-cols-2 gap-3 xs:gap-1 xxs:gap-1 sm:gap-2 s:gap-2 md:gap-2 xs:mx-4 s:mx-4 xxs:mx-4 md:ml-11 my-10 mx-10">
                            {makedatas.map((post, i) => {
                                // Check if the given [parts] exists for this make
                                const partsAvailable = products.some(p =>
                                    p.compatibility?.some(c =>
                                        c.make.toLowerCase() === post.make.toLowerCase()
                                    ) &&
                                    p.subcategory.toLowerCase() === decodeURIComponent(partEntry.parts).toLowerCase()
                                );

                                // Build link conditionally
                                const href = partsAvailable
                                    ? `/search-by-make/${encodeURIComponent(post.make)}/parts/${encodeURIComponent(partEntry.parts)}`
                                    : `/search-by-make/${encodeURIComponent(post.make)}`;

                                return (
                                    <div key={i} className="border">
                                        <Link href={href} title={`${post.make} ${decodeURIComponent(partEntry.parts)}`}>
                                            <span className="h-full hover:border-blue-600 py-3 bg-gray-100 rounded-sm">
                                                <Image
                                                    src={`/img/car-logos/${post.img}`}
                                                    alt={`${post.make} spare parts`}
                                                    className="mx-auto m-3"
                                                    priority
                                                    width={70}
                                                    height={70}
                                                />
                                                <p className="text-center font-sans font-medium text-lg">
                                                    <span className="text-blue-600">{post.make}</span>{" "}
                                                    {decodeURIComponent(partEntry.parts)}
                                                </p>
                                            </span>
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
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
                    {parts === 'Alternator' ? <>
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

                            <ul className={`text-center font-sans font-medium text-lg mt-3 ${firaSans.className}`}>
                                <li>Aftermarket alternator: AED 200 – 600</li>
                                <li>Genuine OEM alternator: AED 1,500 – 3,500</li>
                                <li>Premium new alternator: AED 900 – 1,500</li>
                                <li>Used/rebuilt alternator: AED 100 – 250</li>
                            </ul>
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
            </div></>

    );
}
