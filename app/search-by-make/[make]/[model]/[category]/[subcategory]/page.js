import productsFile from "../../../../../../public/products.json";
import { Fira_Sans, Playfair_Display } from "next/font/google";
import SearchModel from "../../../../../../components/SearchModel";
import Link from "next/link";
import Image from "next/image";
import SearchMakeModelParts from "../../../../../../components/SearchMakeModelParts";
import SearchCity from "../../../../../../components/SearchCity";
import CarData from "../../../../../../public/lib/car-data.json"
import partsData from "../../../../../../public/lib/filteredparts.json"
import CitiesData from "../../../../../../public/lib/cities.json"
const Product = dynamic(() => import('./Product'));
const FormMakeModel = dynamic(() => import('../../../../../../components/FormMakeModel'));
const FormBattery = dynamic(() => import('../../../../../../components/FormBattery'));
import { notFound } from "next/navigation";
import { BadgeCheck, Car, Clock, LinkIcon, MapPin, Recycle } from 'lucide-react';
import subCityBattery from "../../../../../../public/lib/subCityBattery"
import subCity from "../../../../../../public/lib/subCity.json"
import dynamic from "next/dynamic";

export const revalidate = 86400;
export const runtime = 'nodejs';
export const dynamicParams = false;


const playfair_display = Playfair_Display({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-playfair-display",
});

const firaSans = Fira_Sans({
    weight: ['400', '700'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-fira-sans',
});

const excludedMakes = [
    'Buick', 'Eagle', 'Lotus', 'Plymouth', 'Pontiac', 'Saab', 'Subaru',
    'Alfa Romeo', 'Geo', 'Oldsmobile', 'Isuzu', 'Saturn', 'Corbin', 'Holden',
    'Spyker', 'Spyker Cars', 'Aston Martin', 'Panoz', 'Foose', 'Morgan', 'Aptera',
    'Smart', 'SRT', 'Roush Performance', 'Pagani', 'Mobility Ventures LLC',
    'RUF Automobile', 'Koenigsegg', 'Karma', 'Polestar', 'STI', 'Kandi', 'Abarth',
    'Dorcen', 'Foton', 'W Motors', 'Opel', 'Skoda', 'Hillman', 'Austin', 'Fillmore',
    'Maybach', 'Merkur', 'Rambler', 'Shelby', 'Studebaker', 'Great Wall GWM', 'Zeekr', 'ZNA', 'GAC', 'Gs7', 'Hongqi',
    'W Motor', 'JAC', 'Jaecoo', 'Jetour', 'TANK', 'Soueast', 'Zarooq Motors', 'Changan', 'Maxus', 'Haval', 'Zotye', 'Sandstorm',
    'Chery', 'Geely', 'BAIC', 'Bestune'
];


const selectedParts = ["Battery", "Alternator", "Steering Rack"]

const excludedMakesSet = new Set(excludedMakes);

function getMakeImage(make, model) {
    try {
        const imagesMap = {};
        const result = [];

        for (let i = 0; i < CarData.length; i++) {
            const item = CarData[i];

            if (
                item.make &&
                item.model &&
                item.make.toLowerCase() === make.toLowerCase() &&
                item.model.toLowerCase() === model.toLowerCase()
            ) {
                if (item.img && !imagesMap[item.img]) {
                    imagesMap[item.img] = true;
                    result.push(item.img);
                }
            }
        }

        return result;
    } catch (e) {
        console.error("Error loading image:", e.message);
        return [];
    }
}

function getPartsByCategory(category) {
    try {
        if (!category) return [];

        const result = [];

        for (let i = 0; i < partsData.length; i++) {
            const item = partsData[i];

            if (
                item.category &&
                item.category.toLowerCase() === category.toLowerCase()
            ) {
                result.push(item);
            }
        }

        return result;
    } catch (error) {
        console.error("Error filtering parts by category:", error);
        return [];
    }
}


export function generateStaticParams() {
    try {
        const unique = new Set();
        const params = [];

        for (const product of productsFile) {
            if (!product || !product.compatibility) continue;

            const category = product.category?.trim();
            const subcategory = product.subcategory?.trim();

            if (!category || !subcategory) continue;

            for (const fit of product.compatibility) {
                const make = fit.make?.trim();
                const model = fit.model?.trim();

                if (!make || !model || excludedMakesSet.has(make)) continue;

                const key = `${make}|${model}|${category}|${subcategory}`;

                if (!unique.has(key)) {
                    unique.add(key);

                    const isSelectedPart = selectedParts.some(
                        p => p.toLowerCase() === subcategory.toLowerCase()
                    );

                    const hasProducts = productsFile.some(p =>
                        p.category === category &&
                        p.subcategory === subcategory &&
                        p.compatibility?.some(c => c.make === make && c.model === model)
                    );

                    if (isSelectedPart || hasProducts) {
                        params.push({
                            make: make,
                            model: model,
                            category: category,
                            subcategory: subcategory,
                        })
                    }
                }
            }
        }

        return params;
    } catch (error) {
        console.error("Error generating static params:", error);
        return [];
    }
}

export function generateMetadata({ params }) {
    const make = decodeURIComponent(params.make);
    const model = decodeURIComponent(params.model);
    const category = decodeURIComponent(params.category);
    const subcategory = decodeURIComponent(params.subcategory);

    // Check if this is a valid page
    const isSelectedPart = selectedParts.some(
        p => p.toLowerCase() === subcategory.toLowerCase()
    );

    const matchingProducts = productsFile.filter(product => {
        if (product.category !== category || product.subcategory !== subcategory) {
            return false;
        }
        return product.compatibility?.some(
            compat => compat.make === make && compat.model === model
        );
    });

    const hasValidContent = isSelectedPart || matchingProducts.length > 0;

    // For invalid pages (404), return noindex metadata
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

    const imageMake = getMakeImage(make, model);

    // Products filtered only by make
    const productsForMake = productsFile.filter((p) =>
        p.compatibility?.some(
            (c) => c.make?.toLowerCase() === make.toLowerCase()
        )
    );

    const productListItems = productsForMake.length > 0 ? productsForMake.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
            "@type": "Product",
            "@id": `https://emirates-car.com/search-by-make/${make}/${product.category}/${product.subcategory}/${product.partname}-${product.partnumber}-${product.id}#product`,
            "name": `${product.partname} ${product.partnumber} ${make}`,
            "url": `https://www.emirates-car.com/search-by-make/${make}/${model}/${product.category}/${product.subcategory}/${product.partname}-${product.partnumber}-${product.id}`,
            "image": `https://www.emirates-car.com${product.image}`,
            "description": `${product.partname} compatible with ${make}`,
            "brand": { "@type": "Brand", name: product.compatibility?.[0]?.make || make },
            "mpn": product.partnumber,
            "offers": {
                "@type": "Offer",
                "priceCurrency": product.pricing.currency,
                "price": product.pricing.price,
                "availability": "https://schema.org/InStock",
                "itemCondition": "https://schema.org/NewCondition",
            },
        },
    })) : [];

    const faqSchema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "CollectionPage",
                "name": `${make} ${model} ${subcategory} | EMIRATESCAR`,
                "url": `https://www.emirates-car.com/search-by-make/${make}/${model}/${category}/${subcategory}`,
                "mainEntity": {
                    "@type": "ItemList",
                    "itemListElement": productListItems,
                },
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
                        "item": `https://www.emirates-car.com/search-by-make/`
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "name": `${make} Spare Parts`,
                        "item": `https://www.emirates-car.com/search-by-make/${encodeURIComponent(make)}`
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "name": `${make} ${model} Spare Parts`,
                        "item": `https://www.emirates-car.com/search-by-make/${encodeURIComponent(make)}/${encodeURIComponent(model)}`
                    },
                    {
                        "@type": "ListItem",
                        "position": 4,
                        "name": `${make} ${model} ${category} Spare Parts`,
                        "item": `https://www.emirates-car.com/search-by-make/${encodeURIComponent(make)}/${encodeURIComponent(model)}/${encodeURIComponent(category)}`
                    },
                    {
                        "@type": "ListItem",
                        "position": 4,
                        "name": `${make} ${model} ${subcategory} Spare Parts`,
                        "item": `https://www.emirates-car.com/search-by-make/${encodeURIComponent(make)}/${encodeURIComponent(model)}/${encodeURIComponent(category)}/${encodeURIComponent(subcategory)}`
                    }
                ]
            },
        ],
    };

    return {
        title: `${make} ${model} ${subcategory} | Genuine & New, Used Parts UAE`,
        description: `Buy ${subcategory} for ${make} ${model}. New, used & aftermarket parts with fast UAE delivery.`,
        openGraph: {
            title: `${make} ${model} ${subcategory} Parts`,
            description: `Buy ${subcategory} for ${make} ${model}. New, used & aftermarket parts with fast UAE delivery.`,
            images: [
                `https://www.emirates-car.com/img/car-logos/${imageMake?.[0] || "default.png"}`,
            ],
            url: `https://www.emirates-car.com/search-by-make/${encodeURIComponent(make)}/${encodeURIComponent(model)}/${encodeURIComponent(category)}/${encodeURIComponent(subcategory)}`,
            siteName: "EMIRATESCAR",
        },
        alternates: {
            canonical: `https://www.emirates-car.com/search-by-make/${encodeURIComponent(make)}/${encodeURIComponent(model)}/${encodeURIComponent(category)}/${encodeURIComponent(subcategory)}`,
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


function getModel(make) {
    try {
        const decodedMake = decodeURIComponent(make);
        const seenModels = {};
        const result = [];

        for (let i = 0; i < CarData.length; i++) {
            const item = CarData[i];

            if (!item.make || !item.model) continue;

            if (item.make === decodedMake) {
                if (!seenModels[item.model]) {
                    seenModels[item.model] = true;
                    result.push(item);
                }
            }
        }

        return result;
    } catch (error) {
        console.error("Error reading model data:", error.message);
        return [];
    }
}


export default function SubcategoryPage({ params, searchParams }) {
    const make = decodeURIComponent(params.make);
    const model = decodeURIComponent(params.model);
    const category = decodeURIComponent(params.category);
    const subcategory = decodeURIComponent(params.subcategory);
    const partsposts = partsData;
    const makeArray = getMake();
    const modelsform = CarData;
    const cities = CitiesData;
    const relatedCategories = getPartsByCategory(category, subcategory)
    const carmodel = getModel(make);
    const genericParts = partsData;
    //lets check if this part is in the selectedParts

    const isSelectedPart = selectedParts.some(
        p => p.toLowerCase() === subcategory.toLowerCase()
    );

    const matchingProducts = productsFile.filter(product => {
        if (product.category !== category || product.subcategory !== subcategory) {
            return false;
        }

        // Check if this product fits this make/model
        return product.compatibility?.some(
            compat => compat.make === make && compat.model === model
        );
    });

    // If no products found, show 404
    if (!isSelectedPart && matchingProducts.length === 0) {
        notFound();
    }

    const normalize = (v) =>
        v?.toString().toLowerCase().trim().replace(/\s+/g, " ") || "";


    const productMatches = productsFile.filter((p) => {
        const matchesMakeModel = p.compatibility?.some(
            (c) =>
                normalize(c.make) === normalize(make) &&
                normalize(c.model) === normalize(model)
        );

        return (
            matchesMakeModel &&
            normalize(p.category) === normalize(category) &&
            normalize(p.subcategory) === normalize(subcategory)
        );
    });


    const genericMatch = genericParts.find(
        (gp) =>
            normalize(gp.parts) === normalize(subcategory) &&
            normalize(gp.category) === normalize(category)
    );

    const finalData = productMatches.length > 0 ? productMatches : genericMatch ? [genericMatch] : [];
    const hasExactMatch = productMatches.length > 0;
    const hasAnyData = finalData.length > 0;

    const isBattery = decodeURIComponent(subcategory) === 'Battery'


    return (<>

        {!hasExactMatch && (
            <div className="p-6 max-w-6xl mx-auto">
                <div className="flex items-center mt-10 xs:pt-5 s:pt-5">
                    <div>
                        <div className="mx-auto xs:ml-1 xxs:ml-4 xxs:mt-8 xs:px-5 sm:ml-6 lg:ml-1 xl:ml-20 sm:mx-auto mt-10 sm:mt-12 md:mt-10 lg:mt-20 lg:px-8 xl:mt-28 xs:mt-2 xs:text-left s:mt-2">
                            <h1 className={`mt-3 text-5xl lg:text-4xl sm:text-lg xs:text-xl xxs:text-xl md:text-xl font-head font-extrabold ${playfair_display.className}`}>
                                {decodeURIComponent(subcategory) === 'Battery' ? (<>{make} {model} <span className="flex items-center whitespace-nowrap"> Battery Replacement Serivces in UAE - Dubai & Sharjah <a href="#myBatteryForm"><LinkIcon className="text-blue-500 h-16 w-16" /></a></span></>) : (<>{make} {model} <span className="text-blue-500">{subcategory.replace(/-/g, " ")}</span> - Genuine & Aftermarket in UAE <a href="#myBatteryForm"><LinkIcon className="text-blue-500 h-16 w-16" /></a></>)}
                            </h1>
                        </div>
                    </div>
                </div>
                <div className=" mt-10 xs:pt-5 s:pt-5">
                    {isBattery ? (<>
                        <div className={`text-xl font-sans text-gray-700 mx-auto xs:text-lg xl:text-lg xxs:text-lg ${firaSans.className}`}>
                            Car Battery Replacement in Dubai and Sharjah made easy at Home, Office and at any spot. We ensure a safer disposal of battery is done.
                            You just have to submit your inquiry in the form below, our team will get back to you soon. Either you search for <span className="font-bold">"{make} {model} battery replacement in dubai"</span> or <span className="font-bold">"{make} {model} battery replacement in sharjah"</span> or <span className="font-bold">"{make} {model} battery replacement near me"</span>, we are your final destination. We will take you through the journey further.
                        </div>

                    </>) : (<><p className={`text-xl py-4 font-sans text-gray-700 mx-auto xs:text-lg xl:text-lg xxs:text-lg ${firaSans.className}`}>
                        If you are looking for {make} {model} {subcategory}, submit your inquiry below, Our team will get back to you through whatsapp based on stock availability
                    </p></>)}

                </div>

                {isBattery ? (<> <div className="grid grid-cols-2 xs:grid-cols-1 xxs:grid-cols-1 mx-auto xl:px-10 xs:px-3 xxs:px-4 md:px-5 lg:px-6 mt-5 border-2 p-5 rounded-sm">
                    <div className='mt-20 xs:mt-5 xxs:mt-5 sm:mt-5 md:mt-5 lg:mt-10'>
                        <h2 className={`flex items-center font-bold text-3xl mt-3 xs:text-2xl ${playfair_display.className}`}>
                            {make} {model} Car Battery Replacement Services in Dubai & Sharjah <span><a href="#myBatteryForm"><LinkIcon className="text-blue-500 h-12 w-12 md:hidden lg:hidden xxl:hidden xl:hidden xs:h-5 xxs:h-5" /></a></span>
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
                    <FormMakeModel formsData={modelsform} mke={make} modl={model} />
                </div></>)}

                <div className="mt-10 xs:pt-5 s:pt-5">
                    {isBattery ? (<><h2 className={`text-4xl md:text-2xl lg:text-3xl font-semibold xs:text-2xl xxs:text-2xl py-5 ${playfair_display.className}`}>
                        {make} {model} Battery Issues
                    </h2>
                        <p className={`text-xl font-sans text-gray-700 mx-auto xs:text-lg xl:text-lg xxs:text-lg ${firaSans.className}`}>
                            To find if your battery need to be changed in easy steps, you can see the light dimming. The car battery need to be changed every 4 years. Battery is essential to start the starter motor which in turn starts the engine through spark Plug. To have a long battery life, the advice is to have long rides instead of small frequent rides. To maintain your battery from corroding, you may use distilled water to clean it very often.
                        </p></>) : (<></>)}
                </div>

                {isBattery ? (<><section>
                    <h2 className={`font-bold text-3xl text-center xs:text-2xl my-3 ${playfair_display.className}`}>
                        <span className='text-blue-600'>{make} {model} {subcategory}</span> Replacement Services Anywhere in Dubai and Sharjah
                    </h2>
                    <ul className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-5 mx-10 md:mx-4 sm:mx-3 xs:grid xs:grid-cols-2 sm:grid sm:grid-cols-3 xxs:grid xxs:grid-cols-2 s:grid s:grid-cols-3 gap-1 xs:mx-4 s:mx-4 xxs:mx-4 md:ml-11 my-10 pb-10 font-sans">
                        {subCityBattery.map((city) => (
                            <li key={city.id} className="border rounded-md overflow-hidden bg-white shadow hover:shadow-lg transition-shadow h-full flex flex-col">
                                <Link href={`/car-battery-replacement-services-in-uae`} target="_blank"
                                    title={`${make} ${model} ${subcategory} ${city.city}`}>
                                    <div className={`flex flex-1 text-center m-1 text-sm xl:text-xl xxl:text-xl font-medium font-sans rounded-sm w-max ${firaSans.className}  rounded-sm`}>
                                        <MapPin size={32} color="darkblue" />  {city.city}
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section></>) : (<></>)}

                <section className="mt-10 shadow-sm mx-4 md:mx-4 lg:max-w-4xl lg:mx-auto xl:mx-10 bg-bglight px-20 xs:px-3 xxs:px-3">
                    <div className="container py-6">
                        <h2 className={`font-bold text-center text-3xl xs:text-2xl my-3 ${playfair_display.className}`}>
                            Search <span className='text-blue-600'>{subcategory}</span> for All {make} Models
                        </h2>
                        <SearchModel make={make} subcategory={subcategory} car={carmodel} />

                        <ul className="grid grid-cols-4 md:grid-cols-3 sm:grid-cols-4 xs:grid-cols-2 xxs:grid-cols-3 gap-3 xs:gap-1 mt-10">
                            {carmodel.map((post, i) => {
                                const isBatterySubcategory = decodeURIComponent(subcategory).toLowerCase() === 'battery';

                                const hasBatteryCompatibility = productsFile.some((product) =>
                                    product.subcategory.toLowerCase() === 'battery' &&
                                    product.compatibility?.some((c) =>
                                        c.make.toLowerCase() === post.make.toLowerCase() &&
                                        c.model.toLowerCase() === post.model.toLowerCase()
                                    )
                                );
                                const isBattery = isBatterySubcategory || hasBatteryCompatibility;

                                let linkHref, linkAs;
                                if (isBattery) {
                                    linkHref = '/car-battery-replacement-services-in-uae'
                                    linkAs = '/car-battery-replacement-services-in-uae'
                                } else if (excludedMakesSet.has(post.make)) {
                                    linkHref = '/get-in-touch'
                                    linkAs = '/get-in-touch'
                                } else {
                                    linkHref = '/search-by-make/[make]/[model]/[category]/[subcategory]#myBatteryForm'
                                    linkAs = `/search-by-make/${post.make}/${encodeURIComponent(post.model)}/${category}/${subcategory}#myBatteryForm`
                                }
                                return (
                                    <li key={i} className="h-full">
                                        <Link
                                            href={linkHref}
                                            as={linkAs}
                                            title={`${post.make} ${post.model} ${subcategory}`}
                                            target="_blank"
                                            className="block border border-blue-800 hover:border-blue-900 bg-white rounded-sm h-full p-3 text-center"
                                        >
                                            <span className="text-center text-black text-lg font-medium hover:text-gray-800 p-2 xs:p-0 font-sans underline ">
                                                {post.make} {post.model.replace('%2F', '/')}<span className="text-blue-600"> {isBattery ? "Battery replacement services in UAE" : decodeURIComponent(subcategory)}</span>
                                            </span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </section>
                <section>
                    <h2 className={`font-bold text-center text-3xl xs:text-2xl my-3 ${playfair_display.className}`}>
                        Search All spare parts for <span className='text-blue-600'>{make} {model}</span>
                    </h2>
                    <SearchMakeModelParts partsposts={partsposts} make={make} model={model} category={category} />


                    <ul className="grid grid-cols-4 md:grid-cols-3 sm:grid-cols-4 xs:grid-cols-2 xxs:grid-cols-3 gap-3 xs:gap-1 mt-10">
                        {partsposts.map((post, i) => {
                            return (
                                <li key={i} className="h-full">

                                    <span className="text-center text-black text-lg font-medium hover:text-gray-800 p-2 xs:p-0 font-sans underline ">
                                        {make} {model} <span className="text-blue-500">{post.parts}</span>
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                </section>

                <section
                    aria-labelledby={`all-${make}-${model}-${subcategory}-brands`}
                    className="mt-10 shadow-sm mx-4 md:mx-4 lg:max-w-4xl lg:mx-auto xl:mx-10 bg-bglight px-5 md:px-20 lg:px-10"
                >
                    <h2
                        id={`all-${make}-brands`}
                        className={`text-4xl text-center md:text-3xl lg:text-3xl xs:text-2xl xxs:text-2xl font-semibold py-5 ${playfair_display.className}`}
                    >
                        {subcategory === 'Battery' ?
                            <> Search <span className="text-blue-500">{subcategory}</span> for Any Models
                            </> : <>Search <span className="text-blue-500">{subcategory}</span> for Any Models - Used, Genuine & Aftermarket
                            </>}
                    </h2>

                    <ul className="grid grid-cols-4 md:grid-cols-3 xs:grid-cols-1 xxs:grid-cols-1 sm:grid-cols-2 xs:gap-1 xxs:gap-1 sm:gap-1 gap-4 my-10">

                        {makeArray.map((p, i) => {

                            let linkHref, linkAs;
                            if (isBattery) {
                                linkHref = '/car-battery-replacement-services-in-uae'
                                linkAs = '/car-battery-replacement-services-in-uae'
                            } else if (excludedMakesSet.has(p.make)) {
                                linkHref = '/get-in-touch'
                                linkAs = '/get-in-touch'
                            } else {
                                linkHref = '/search-by-make/[make]/parts/[subcategory]'
                                linkAs = `/search-by-make/${encodeURIComponent(p.make)}/parts/${encodeURIComponent(subcategory)}`
                            }

                            return (

                                <li key={i} className="list-none">
                                    <Link
                                        href={linkHref}
                                        as={linkAs}
                                        title={`${p.make} ${subcategory}`}
                                        target="_blank"
                                        className="flex flex-col items-center justify-center border hover:border-blue-600 p-3 rounded-sm bg-white"
                                    >
                                        <Image
                                            alt={`${p.make}`}
                                            src={`/img/car-logos/${p.img}`}
                                            height={90}
                                            width={90}
                                            className="object-contain"
                                        />
                                        <span className={`mt-2 px-3 py-1 text-sm md:text-xs xl:text-2xl xxl:text-lg font-medium font-sans text-white bg-blue-600 rounded-sm hover:bg-blue-700 text-center w-max ${firaSans.className}`}>
                                            {p.make} {subcategory}
                                        </span>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </section>
                <section className="mt-10 shadow-sm mx-4 lg:max-w-4xl lg:mx-auto xl:mx-10 bg-bglight px-20 xs:px-3 xxs:px-3">
                    <div className="container py-6">

                        <h2 className={`font-bold text-center text-3xl xs:text-2xl my-3 ${playfair_display.className}`}>
                            Similar {category} Parts Categories for {make} {model}
                        </h2>

                        <ul className="grid grid-cols-4 md:grid-cols-3 sm:grid-cols-4 xs:grid-cols-2 xxs:grid-cols-3 gap-3 xs:gap-1 mt-10">

                            {relatedCategories.map((item, i) => (

                                <li key={i} className="h-full">
                                    <Link
                                        href={`/search-by-make/${make}/${encodeURIComponent(model)}/${encodeURIComponent(item.category)}`}
                                        title={`${make} ${model} ${item.category}`}
                                        target="_blank"
                                        className="block border border-blue-800 hover:border-blue-900 bg-white rounded-sm h-full p-3 text-center"
                                    >
                                        <span className="text-center text-black text-lg font-medium hover:text-gray-800 p-2 xs:p-0 font-sans underline">
                                            {make} {model} <span className="text-blue-500">{item.parts}</span>
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>

                    </div>
                </section>
                {isBattery ? (<></>) : (<><section>
                    <h2 className={`font-bold text-3xl text-center xs:text-2xl my-3 ${playfair_display.className}`}>
                        Search <span className='text-blue-600'>{make} {model} {subcategory}</span> Anywhere in UAE
                    </h2>
                    <SearchCity cities={cities} />
                    <ul className="grid grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-2 xxs:grid-cols-2 gap-4 xs:gap-2 xxs:gap-2 mt-10">
                        {subCity.map((city) => (
                            <li key={city.id} className="border rounded-md overflow-hidden bg-white shadow hover:shadow-lg transition-shadow h-full flex flex-col">
                                <Link href={`/search-by-brands-in-uae/${encodeURIComponent(make)}/${encodeURIComponent(city.city)}`} target="_blank"
                                    title={`${make} ${model} ${subcategory} dubai`}>
                                    <div className="p-3 flex-1 flex flex-col">
                                        <h3 className="text-lg font-semibold mb-2 underline text-center">{make} {model} {subcategory} <span className="text-blue-500">{city.city}</span></h3>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section></>)}

            </div>
        )}
        {hasExactMatch &&
            (<div className="p-6 xs:p-3 xxs:p-3 s:p-3 sm:p-4 max-w-6xl mx-auto">

                <div className="flex items-center mt-10 xs:pt-5 s:pt-5">
                    <div>
                        <div className="mx-auto xs:ml-1 xxs:ml-4 xxs:mt-8 xs:px-5 sm:ml-6 lg:ml-1 xl:ml-20 sm:mx-auto mt-10 sm:mt-12 md:mt-10 lg:mt-20 lg:px-8 xl:mt-28 xs:mt-2 xs:text-left s:mt-2">
                            <h1 className={`mt-3 text-5xl lg:text-4xl sm:text-lg xs:text-xl xxs:text-xl md:text-xl font-head font-extrabold ${playfair_display.className}`}>
                                {decodeURIComponent(subcategory) === 'Battery' ? (<>{make} {model} <span className="flex items-center whitespace-nowrap"> Battery Replacement Serivces in UAE - Dubai & Sharjah <a href="#myBatteryForm"><LinkIcon className="text-blue-500 h-16 w-16" /></a></span></>) : (<>{make} {model} <span className="text-blue-500">{subcategory.replace(/-/g, " ")}</span> - Genuine & Aftermarket in UAE</>)}
                            </h1>
                        </div>
                    </div>
                </div>
                <div className=" mt-10 xs:pt-5 s:pt-5">
                    {isBattery ? (<>
                        <p className={`text-xl font-sans text-gray-700 mx-auto xs:text-lg xl:text-lg xxs:text-lg ${firaSans.className}`}>
                            Car Battery Replacement in Dubai and Sharjah made easy at Home, Office and at any spot. We ensure a safer disposal of battery is done.
                            You just have to submit your inquiry in the form below, our team will get back to you soon. Either you search for <span className="font-bold">"{make} {model} battery replacement in dubai"</span> or <span className="font-bold">"{make} {model} battery replacement in sharjah"</span> or <span className="font-bold">"{make} {model} battery replacement near me"</span>, we are your final destination. We will take you through the journey further.
                        </p>

                    </>) : (<></>)}

                </div>
                {isBattery ? (<> <div className="grid grid-cols-2 xs:grid-cols-1 xxs:grid-cols-1 mx-auto xl:px-10 xs:px-3 xxs:px-4 md:px-5 lg:px-6 mt-5 border-2 p-5 rounded-sm">
                    <div className='mt-20 xs:mt-5 xxs:mt-5 sm:mt-5 md:mt-5 lg:mt-10'>
                        <h2 className={`flex items-center font-bold text-3xl mt-3 xs:text-2xl ${playfair_display.className}`}>
                            {make} {model} Car Battery Replacement Services in Dubai & Sharjah <span><a href="#myBatteryForm"><LinkIcon className="text-blue-500 h-12 w-12 md:hidden lg:hidden xxl:hidden xl:hidden xs:h-5 xxs:h-5" /></a></span>
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
                    <FormMakeModel formsData={modelsform} mke={make} modl={model} />
                </div></>)}

                <div className="mt-10 xs:pt-5 s:pt-5">
                    {isBattery ? (<><h2 className={`text-4xl md:text-2xl lg:text-3xl font-semibold xs:text-2xl xxs:text-2xl py-5 ${playfair_display.className}`}>
                        {make} {model} Battery Issues
                    </h2>
                        <p className={`text-xl font-sans text-gray-700 mx-auto xs:text-lg xl:text-lg xxs:text-lg ${firaSans.className}`}>
                            To find if your battery need to be changed in easy steps, you can see the light dimming. The car battery need to be changed every 4 years. Battery is essential to start the starter motor which in turn starts the engine through spark Plug. To have a long battery life, the advice is to have long rides instead of small frequent rides. To maintain your battery from corroding, you may use distilled water to clean it very often.
                        </p></>) : (<></>)}
                </div>


                {isBattery ? (<><section>
                    <h2 className={`font-bold text-3xl text-center xs:text-2xl my-3 ${playfair_display.className}`}>
                        <span className='text-blue-600'>{make} {model} {subcategory}</span> Replacement Services Anywhere in Dubai and Sharjah
                    </h2>
                    <ul className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-5 mx-10 md:mx-4 sm:mx-3 xs:grid xs:grid-cols-2 sm:grid sm:grid-cols-3 xxs:grid xxs:grid-cols-2 s:grid s:grid-cols-3 gap-1 xs:mx-4 s:mx-4 xxs:mx-4 md:ml-11 my-10 pb-10 font-sans">
                        {subCityBattery.map((city) => (
                            <li key={city.id} className="border rounded-md overflow-hidden bg-white shadow hover:shadow-lg transition-shadow h-full flex flex-col">
                                <Link href={`/car-battery-replacement-services-in-uae`} target="_blank"
                                    title={`${make} ${model} ${subcategory} ${city.city}`}>
                                    <div className={`flex flex-1 text-center m-1 text-sm xl:text-xl xxl:text-xl font-medium font-sans rounded-sm w-max ${firaSans.className}  rounded-sm`}>
                                        <MapPin size={32} color="darkblue" />  {city.city}
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section></>) : (<></>)}

                {productMatches.length > 0 && (
                    <Product
                        make={make}
                        model={model}
                        subcategory={subcategory}
                        products={productMatches}
                        allProducts={productMatches}
                    />
                )}

                <section className="mt-10 shadow-sm mx-4 md:mx-4 lg:max-w-4xl lg:mx-auto xl:mx-10 bg-bglight px-20 xs:px-3 xxs:px-3">
                    <div className="container py-6">
                        <h2 className={`font-bold text-center text-3xl xs:text-2xl my-3 ${playfair_display.className}`}>
                            Search <span className='text-blue-600'>{subcategory}</span> for All {make} Models
                        </h2>
                        <SearchModel make={make} subcategory={subcategory} car={carmodel} />

                        <ul className="grid grid-cols-4 md:grid-cols-3 sm:grid-cols-4 xs:grid-cols-2 xxs:grid-cols-3 gap-3 xs:gap-1 mt-10">
                            {carmodel.map((post, i) => {
                                const isBatterySubcategory = decodeURIComponent(subcategory).toLowerCase() === 'battery';

                                const hasBatteryCompatibility = productsFile.some((product) =>
                                    product.subcategory.toLowerCase() === 'battery' &&
                                    product.compatibility?.some((c) =>
                                        c.make.toLowerCase() === post.make.toLowerCase() &&
                                        c.model.toLowerCase() === post.model.toLowerCase()
                                    )
                                );
                                const isBattery = isBatterySubcategory || hasBatteryCompatibility;

                                let linkHref, linkAs;
                                if (isBattery) {
                                    linkHref = '/car-battery-replacement-services-in-uae'
                                    linkAs = '/car-battery-replacement-services-in-uae'
                                } else if (excludedMakesSet.has(post.make)) {
                                    linkHref = '/get-in-touch'
                                    linkAs = '/get-in-touch'
                                } else {
                                    linkHref = '/search-by-make/[make]/[model]/[category]/[subcategory]#myBatteryForm'
                                    linkAs = `/search-by-make/${post.make}/${encodeURIComponent(post.model)}/${category}/${subcategory}#myBatteryForm`
                                }
                                return (
                                    <li key={i} className="h-full">
                                        <Link
                                            href={linkHref}
                                            as={linkAs}
                                            target="_blank"
                                            title={`${post.make} ${post.model} ${subcategory}`}
                                            className="block border border-blue-800 hover:border-blue-900 bg-white rounded-sm h-full p-3 text-center"
                                        >
                                            <span className="text-center text-black text-lg font-medium hover:text-gray-800 p-2 xs:p-0 font-sans underline ">
                                                {post.make} {post.model.replace('%2F', '/')}<span className="text-blue-600"> {isBattery ? "Battery replacement services in UAE" : decodeURIComponent(subcategory)}</span>
                                            </span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </section>
                <section
                    aria-labelledby={`all-${make}-${model}-${subcategory}-brands`}
                    className="mt-10 shadow-sm mx-4 md:mx-4 lg:max-w-4xl lg:mx-auto xl:mx-10 bg-bglight px-5 md:px-20 lg:px-10"
                >
                    <h2
                        id={`all-${make}-brands`}
                        className={`text-4xl text-center md:text-3xl lg:text-3xl xs:text-2xl xxs:text-2xl font-semibold py-5 ${playfair_display.className}`}
                    >
                        {subcategory === 'Battery' ?
                            <> Search <span className="text-blue-500">{subcategory}</span> for Any Models
                            </> : <>Search <span className="text-blue-500">{subcategory}</span> for Any Models - Used, Genuine & Aftermarket
                            </>}
                    </h2>

                    <ul className="grid grid-cols-4 md:grid-cols-3 xs:grid-cols-1 xxs:grid-cols-1 sm:grid-cols-2 xs:gap-1 xxs:gap-1 sm:gap-1 gap-4 my-10">

                        {makeArray.map((p, i) => {

                            let linkHref, linkAs;
                            if (isBattery) {
                                linkHref = '/car-battery-replacement-services-in-uae'
                                linkAs = '/car-battery-replacement-services-in-uae'
                            } else if (excludedMakesSet.has(p.make)) {
                                linkHref = '/get-in-touch'
                                linkAs = '/get-in-touch'
                            } else {
                                linkHref = '/search-by-make/[make]/parts/[subcategory]'
                                linkAs = `/search-by-make/${encodeURIComponent(p.make)}/parts/${encodeURIComponent(subcategory)}`
                            }

                            return (

                                <li key={i} className="list-none">
                                    <Link
                                        href={linkHref}
                                        as={linkAs}
                                        title={`${p.make} ${subcategory}`}
                                        target="_blank"
                                        className="flex flex-col items-center justify-center border hover:border-blue-600 p-3 rounded-sm bg-white"
                                    >
                                        <Image
                                            alt={`${p.make}`}
                                            src={`/img/car-logos/${p.img}`}
                                            height={90}
                                            width={90}
                                            className="object-contain"
                                            priority
                                        />
                                        <span className={`mt-2 px-3 py-1 text-sm md:text-xs xl:text-2xl xxl:text-lg font-medium font-sans text-white bg-blue-600 rounded-sm hover:bg-blue-700 text-center w-max ${firaSans.className}`}>
                                            {p.make} {subcategory}
                                        </span>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </section>

                <section
                    aria-labelledby={`all-${make}-${model}-${subcategory}-brands`}
                    className="mt-10 shadow-sm mx-4 md:mx-4 lg:max-w-4xl lg:mx-auto xl:mx-10 bg-bglight px-5 md:px-20 lg:px-10"
                >
                    <h2
                        id={`all-${make}-brands`}
                        className={`text-4xl text-center md:text-3xl lg:text-3xl xs:text-2xl xxs:text-2xl font-semibold py-5 ${playfair_display.className}`}
                    >
                        Search <span className="text-blue-500">{subcategory}</span> for Any Models - Used, Genuine & Aftermarket
                    </h2>

                    <ul className="grid grid-cols-4 md:grid-cols-3 xs:grid-cols-1 xxs:grid-cols-1 sm:grid-cols-2 xs:gap-1 xxs:gap-1 sm:gap-1 gap-4 my-10">

                        {makeArray.map((p, i) => (

                            <li key={i} className="list-none">
                                <Link
                                    href="/search-by-make/[make]/parts/[subcategory]"
                                    as={`/search-by-make/${encodeURIComponent(p.make)}/parts/${encodeURIComponent(subcategory)}`}
                                    title={`${p.make} ${subcategory}`}
                                    target="_blank"
                                    className="flex flex-col items-center justify-center border hover:border-blue-600 p-3 rounded-sm bg-white"
                                >
                                    <Image
                                        alt={`${p.make}`}
                                        src={`/img/car-logos/${p.img}`}
                                        height={90}
                                        width={90}
                                        className="object-contain"
                                        priority
                                    />
                                    <span className={`mt-2 px-3 py-1 text-sm md:text-xs xl:text-2xl xxl:text-lg font-medium font-sans text-white bg-blue-600 rounded-sm hover:bg-blue-700 text-center w-max ${firaSans.className}`}>
                                        {p.make} {subcategory}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>
                <section className="mt-10 shadow-sm mx-4 lg:max-w-4xl lg:mx-auto xl:mx-10 bg-bglight px-20 xs:px-3 xxs:px-3">
                    <div className="container py-6">

                        <h2 className={`font-bold text-center text-3xl xs:text-2xl my-3 ${playfair_display.className}`}>
                            Similar {category} Parts Categories for {make} {model}
                        </h2>

                        <ul className="grid grid-cols-4 md:grid-cols-3 sm:grid-cols-4 xs:grid-cols-2 xxs:grid-cols-3 gap-3 xs:gap-1 mt-10">

                            {relatedCategories.map((item, i) => (

                                <li key={i} className="h-full">
                                    <Link
                                        href={`/search-by-make/${make}/${encodeURIComponent(model)}/${encodeURIComponent(item.category)}`}
                                        title={`${make} ${model} ${item.category}`}
                                        target="_blank"
                                        className="block border border-blue-800 hover:border-blue-900 bg-white rounded-sm h-full p-3 text-center"
                                    >
                                        <span className="text-center text-black text-lg font-medium hover:text-gray-800 p-2 xs:p-0 font-sans underline">
                                            {make} {model} <span className="text-blue-500">{item.parts}</span>
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>

                    </div>
                </section>

                {isBattery ? (<></>) : (<><section>
                    <h2 className={`font-bold text-3xl text-center xs:text-2xl my-3 ${playfair_display.className}`}>
                        Search <span className='text-blue-600'>{make} {model} {subcategory}</span> Anywhere in UAE
                    </h2>
                    <SearchCity cities={cities} />
                    <ul className="grid grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-2 xxs:grid-cols-2 gap-4 xs:gap-2 xxs:gap-2 mt-10">
                        {subCity.map((city) => (
                            <li key={city.id} className="border rounded-md overflow-hidden bg-white shadow hover:shadow-lg transition-shadow h-full flex flex-col">
                                <Link href={`/search-by-brands-in-uae/${encodeURIComponent(make)}/${encodeURIComponent(city.city)}`} target="_blank"
                                    title={`${make} ${model} ${subcategory} dubai`}>
                                    <div className="p-3 flex-1 flex flex-col">
                                        <h3 className="text-lg font-semibold mb-2 underline text-center">{make} {model} {subcategory} <span className="text-blue-500">{city.city}</span></h3>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section></>)}

            </div>)}
    </>

    );
}