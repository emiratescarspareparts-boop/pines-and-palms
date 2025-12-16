import productsFile from "../../../../../../public/products.json";
import { Fira_Sans, Playfair_Display } from "next/font/google";
import SearchModel from "../../../../../../components/SearchModel";
import Link from "next/link";
import CarParts from '../../../../../../public/img/car-spare-parts.png';
import Image from "next/image";
import SearchMakeModelParts from "../../../../../../components/SearchMakeModelParts";
import { getCity, getFormModel, getMake, getParts } from "../../../../../page";
import SearchCity from "../../../../../../components/SearchCity";
import FormComponentMakeModelCatSubcat from "../../../../../../components/FormComponentMakeModelCatSubcat";
import GetInTouchForm from "../../../../../../components/GetInTouchForm";
import CarData from "../../../../../../public/lib/car-data.json"
import partsData from "../../../../../../public/lib/parts.json"

export const revalidate = 1814400;
export const runtime = 'edge';
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


const subCity = [
    {
        "id": 2,
        "city": "Abu Dhabi",
        "link": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d465132.6090253298!2d54.27841778442708!3d24.38657289151084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5e440f723ef2b9%3A0xc7cc2e9341971108!2sAbu%20Dhabi%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sin!4v1640018687052!5m2!1sen!2sin",
        "description": "Abu Dhabi, also spelled Abu zaby. Abu Dhabi, the capital of the United Arab Emirates, sits off the mainland on an island in the Persian (Arabian) Gulf. Its focus on oil exports and commerce is reflected by the skyline&apos;s modern towers and shopping megacenters such as Abu Dhabi and Marina malls. The city of Abu Dhabi is located on an island Beneath white-marble domes, the vast Sheikh Zayed Grand Mosque features an immense Persian carpet, crystal chandeliers and capacity for 41,000 worshipers."
    },
    {
        "id": 5,
        "city": "Ajman",
        "link": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d230658.57689222984!2d55.39307659945978!3d25.40346278803545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5764dd8fbe79%3A0xcda090de6445a819!2sAjman%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sin!4v1640009886379!5m2!1sen!2sin",
        "description": "After Abu Dhabi, Sharjah and Al Ain, Ajman is the fifth largest city in United Arab Emirates. A paper published by researchers from Ajman university explains the URBANISATION IN AJMAN: PUSHING BY HOUSING DEVELOPMENT, published on febrauary, 2020. It is published in a motto of developing the Ajman city."
    },
    {
        "id": 6,
        "city": "Al Ain",
        "link": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d232921.30495584515!2d55.60677819193463!3d24.192928130526976!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e8ab145cbd5a049%3A0xf56f8cea5bf29f7f!2sAl%20Ain%20-%20Abu%20Dhabi%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sin!4v1640018189460!5m2!1sen!2sin",
        "description": "Al Ain is a inland oasis city. It shares eastern border with Oman. Its called a garden city because it is loaded with palm grooves trees and natural springs. It has Archeological park to the north and tombs on mountain of Jebel al Hafeet and its remains are displayed on the National museum in the central part of Al Ain. So naturally, Al Ain is more adventourous to attract tourist. A new project is initiated by the name `Plan Al Ain 2030`. It is expected to complete by 2030. The paper released by faculty of UAEU. It outlines the Foundation, Economics, urban structure framework and overall patterns"
    },
    {
        "id": 14,
        "city": "Al Quoz",
        "link": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114828.64793224298!2d54.86883979250164!3d24.890725154679558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6964885557e3%3A0xa70149067c1c3458!2sAl%20Quoz%20-%20Dubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sin!4v1640017701389!5m2!1sen!2sin",
        "description": "Al quoz is an ex-industrial area.But now it is a residence for various art galleries for both local arts and global arts. There are boutiques which has products of home startups, It is also a residence for Pop-ups market, film screenings and stylish cafes. Many rooms and villas are available at cheap rent rate for families. If families are looking for rent near a mall and busy area, they can find it near khail mall. Al quoz area is divided into al quoz 1, al quoz 2, al quoz 3, al quoz 4 and two industrial area. Rooms are avaiable for rent at low rent prices."
    },
    {
        "id": 21,
        "city": "Dubai",
        "link": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d462562.65102636546!2d54.94754444558808!3d25.075759435668097!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sDubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sin!4v1640016582896!5m2!1sen!2sin",
        "description": "."
    },
    {
        "id": 56,
        "city": "Ras al Khaimah",
        "link": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d922252.0033869754!2d55.44538869425926!3d25.453407942583034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ef6710e4cd209a7%3A0xb99e670ca684e20f!2sRas%20al%20Khaimah%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sin!4v1640012402585!5m2!1sen!2sin",
        "description": "."
    },
    {
        "id": 63,
        "city": "Sharjah",
        "link": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d230818.9387004767!2d55.41516106289569!3d25.319455944500426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5f5fede7964b%3A0x2a830aa19c1f6d89!2sAl%20Sharjah%20-%20Sharjah%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sin!4v1640011943348!5m2!1sen!2sin",
        "description": "."
    },
    {
        "id": 64,
        "city": "Deira",
        "link": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114828.64793224298!2d54.86883979250164!3d24.890725154679558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f434f37cdae93%3A0xde756363a1b78491!2sDeira%20-%20Dubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sin!4v1640016669393!5m2!1sen!2sin",
        "description": "."
    },
    {
        "id": 65,
        "city": "Palm Jumeirah",
        "link": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14450.447161457285!2d55.12874522050363!3d25.114999342949368!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f14d4cca1c2d7%3A0x5ad3062089d93972!2sThe%20Palm%20-%20Jumeirah!5e0!3m2!1sen!2sin!4v1640011798560!5m2!1sen!2sin",
        "description": "."
    }
];

async function getMakeImage(make, model) {
    try {
        const filtered = CarData.filter(
            (item) =>
                item.make.toLowerCase() === make.toLowerCase() &&
                item.model.toLowerCase() === model.toLowerCase()
        );

        const unique = [...new Map(filtered.map((i) => [i.img, i])).values()];
        return unique.map((i) => i.img);
    } catch (e) {
        console.error("Error loading image:", e.message);
        return [];
    }
}

async function getPartsByCategory(category, subcategory) {
    try {
        if (!category) return [];
        return partsData.filter(
            (item) => item.category.toLowerCase() === category.toLowerCase()
        );
    } catch (error) {
        console.error("Error filtering parts by category:", error);
        return [];
    }
}
async function getPartImage(subcategory) {
    try {
        const filtered = partsData.filter(item =>
            item.parts.toLowerCase() === subcategory.toLowerCase()
        );

        return filtered.length ? filtered[0].img : null;
    } catch (e) {
        console.error("Error loading image:", e.message);
        return [];
    }
}



export async function generateMetadata({ params }) {
    const make = decodeURIComponent(params.make);
    const model = decodeURIComponent(params.model);
    const category = decodeURIComponent(params.category);
    const subcategory = decodeURIComponent(params.subcategory);
    const partImage = await getPartImage(subcategory)

    const imageMake = await getMakeImage(make, model);

    // Products filtered only by make
    const productsForMake = productsFile.filter((p) =>
        p.compatibility?.some(
            (c) => c.make?.toLowerCase() === make.toLowerCase()
        )
    );

    const productListItems = productsForMake.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
            "@type": "Product",
            "@id": `https://emirates-car.com/search-by-make/${make}/${product.category}/${product.subcategory}/${product.partname}-${product.partnumber}-${product.id}#product`,
            name: `${product.partname} ${product.partnumber} ${make}`,
            url: `https://www.emirates-car.com/search-by-make/${make}/${product.category}/${product.subcategory}/${product.partname}-${product.partnumber}-${product.id}`,
            image: `https://www.emirates-car.com${product.image}`,
            description: `${product.partname} compatible with ${make}`,
            brand: { "@type": "Brand", name: product.compatibility?.[0]?.make || make },
            mpn: product.partnumber,
            offers: {
                "@type": "Offer",
                priceCurrency: product.pricing.currency,
                price: product.pricing.price,
                availability: "https://schema.org/InStock",
                itemCondition: "https://schema.org/NewCondition",
            },
        },
    }));

    const faqSchema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "CollectionPage",
                name: `${make} ${model} ${subcategory} | EMIRATESCAR`,
                url: `https://www.emirates-car.com/search-by-make/${make}/${model}/${category}/${subcategory}`,
                mainEntity: {
                    "@type": "ItemList",
                    itemListElement: productListItems,
                },
            },
        ],
    };

    return {
        title: `${make} ${model} ${subcategory} | Genuine & Used Parts UAE`,
        description: `Buy ${subcategory} for ${make} ${model}. New, used & aftermarket parts with fast UAE delivery.`,
        openGraph: {
            title: `${make} ${model} ${subcategory} Parts`,
            description: `Order ${subcategory} for ${make} ${model} in UAE.`,
            images: [
                `https://www.emirates-car.com/img/car-logos/${imageMake?.[0] || "default.png"}`,
            ],
            url: `https://www.emirates-car.com/search-by-make/${make}/${model}/${category}/${subcategory}`,
            siteName: "EMIRATESCAR",
        },
        alternates: {
            canonical: `https://www.emirates-car.com/search-by-make/${make}/${model}/${category}/${subcategory}`,
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


async function getModel(make) {
    try {
        const decodedMake = decodeURIComponent(make);

        const filtered = CarData.filter(item => item.make === decodedMake);

        const uniqueObjectArray = [
            ...new Map(filtered.map(item => [item.model, item])).values(),
        ];

        return uniqueObjectArray;
    } catch (error) {
        console.error('Error reading model data:', error.message);
        return [];
    }
}


export default async function SubcategoryPage({ params, searchParams }) {
    const make = decodeURIComponent(params.make);
    const model = decodeURIComponent(params.model);
    const category = decodeURIComponent(params.category);
    const subcategory = decodeURIComponent(params.subcategory);
    const partImage = await getPartImage(subcategory)
    const partsposts = await getParts();
    const makeArray = await getMake();
    const imageMake = await getMakeImage(make, model);
    const partspost = await getParts();
    const modelsform = await getFormModel();
    const cities = await getCity()
    const relatedCategories = await getPartsByCategory(category, subcategory)
    const carmodel = await getModel(make);
    const genericParts = partsData;

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



    return (<>

        {!hasExactMatch && (
            <div className="p-6 max-w-6xl mx-auto">
                <h1 className={`mt-3 text-5xl lg:text-4xl sm:text-lg xs:text-xl xxs:text-xl md:text-xl font-head font-extrabold ${playfair_display.className}`}>
                    {make} {model} <span className="text-blue-500">{subcategory.replace(/-/g, " ")}</span> - Genuine & Aftermarket in UAE
                </h1>
                <p className={`text-xl py-4 font-sans text-gray-700 mx-auto xs:text-lg xl:text-lg xxs:text-lg ${firaSans.className}`}>
                    If you are looking for {make} {model} {subcategory.replace(/-/g, " ")}, submit your inquiry below, Our team will get back to you through whatsapp based on stock availability
                </p>

                <GetInTouchForm />
            </div>
        )}
        {hasExactMatch &&
            (<div className="p-6 max-w-6xl mx-auto">

                <div className="py-5 sm:px-7 s:py-6 lg:mx-6 md:mx-6 xs:mx-2 xxs:mx-2 max-w-7xl mx-auto">
                    <div className="bg-backgroundlight rounded-sm">
                        <div className="grid grid-cols-2 xs:grid xs:grid-cols-1 s:grid s:grid-cols-1 xs:text-center sm:grid sm:grid-cols-2 xxs:grid xxs:grid-cols-1 xs:pt-5 s:pt-5">
                            <div>
                                <div className="ml-8 md:ml-8 xs:ml-1 xxs:ml-4 xxs:mt-8 xs:px-5 sm:ml-6 lg:ml-1 xl:ml-20 sm:mx-auto mt-10 sm:mt-12 md:mt-10 lg:mt-20 lg:px-8 xl:mt-28 xs:mt-2 xs:text-left s:mt-2">
                                    <div className="lg:text-left">

                                        <header>
                                            <h1 className={`mt-3 text-5xl lg:text-4xl sm:text-lg xs:text-xl xxs:text-xl md:text-xl font-head font-extrabold ${playfair_display.className}`}>
                                                {make} {model} <span className="text-blue-500">{subcategory.replace(/-/g, " ")}</span> - Genuine & Aftermarket in UAE
                                            </h1>
                                        </header>

                                        <div className="mt-5 sm:mt-5 xxs:my-5 xs:my-5 lg:justify-start">
                                            <div className="py-3 px-4 sm:py-0 sm:px-0 w-1/2 lg:w-full xs:w-full xxs:w-3/4 xs:mx-auto s:w-full sm:w-3/4 md:w-full md:mx-auto md:px-0 md:py-0 xs:py-0 xs:px-0 xxs:px-0 xxs:py-0 lg:px-0 lg:py-0 xl:px-0 xl:py-0 xxl:px-0 xxl:py-0 rounded-lg shadow-md sm:shadow-none">
                                                <a
                                                    href="#myMakeModelSubcategoryForm"
                                                    title={`${make} ${model} ${subcategory}`}
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
                                <Image
                                    alt="emirates car"
                                    className="rounded-sm"
                                    src={partImage ? partImage : CarParts}
                                    width={400}
                                    height={400}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <section className='#myForm'>
                    <FormComponentMakeModelCatSubcat formsData={modelsform} postFilter={partspost} mke={make} model={model} subcategory={subcategory} />
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
                <section className="mt-10 shadow-sm mx-4 md:mx-4 lg:max-w-4xl lg:mx-auto xl:mx-10 bg-bglight px-20 xs:px-3 xxs:px-3">
                    <div className="container py-6">
                        <h2 className={`font-bold text-center text-3xl xs:text-2xl my-3 ${playfair_display.className}`}>
                            Search <span className='text-blue-600'>{subcategory}</span> for All {make} Models
                        </h2>
                        <SearchModel make={make} subcategory={subcategory} car={carmodel} />

                        <ul className="grid grid-cols-4 md:grid-cols-3 sm:grid-cols-4 xs:grid-cols-2 xxs:grid-cols-3 gap-3 xs:gap-1 mt-10">
                            {carmodel.map((post, i) => {
                                return (
                                    <li key={i} className="h-full">
                                        <Link
                                            href='/search-by-make/[make]/[model]'
                                            as={`/search-by-make/${post.make}/${encodeURIComponent(post.model)}/${category}/${subcategory}`}
                                            title={`${post.make} ${post.model} ${subcategory}`}
                                            target="_blank"
                                            className="block border border-blue-800 hover:border-blue-900 bg-white rounded-sm h-full p-3 text-center"
                                        >
                                            <span className="text-center text-black text-lg font-medium hover:text-gray-800 p-2 xs:p-0 font-sans underline ">
                                                {make} {post.model.replace('%2F', '/')} <span className="text-blue-600">{subcategory}</span>
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
                        Search <span className="text-blue-500">{subcategory}</span> for Any Models - Used, Genuine & Aftermarket
                    </h2>

                    <ul className="grid grid-cols-4 md:grid-cols-3 xs:grid-cols-1 xxs:grid-cols-1 sm:grid-cols-2 xs:gap-1 xxs:gap-1 sm:gap-1 gap-4 my-10">
                        {makeArray.map((p, i) => (
                            <li key={i} className="list-none">
                                <Link
                                    href="/search-by-make/[make]/parts/[subcategory]"
                                    as={`/search-by-make/${p.make}/parts/${subcategory}`}
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
                <section>
                    <h2 className={`font-bold text-3xl text-center xs:text-2xl my-3 ${playfair_display.className}`}>
                        Search <span className='text-blue-600'>{make} {model} {subcategory}</span> Anywhere in UAE
                    </h2>
                    <SearchCity cities={cities} />
                    <ul className="grid grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-2 xxs:grid-cols-2 gap-4 xs:gap-2 xxs:gap-2 mt-10">
                        {subCity.map((city) => (
                            <li key={city.id} className="border rounded-md overflow-hidden bg-white shadow hover:shadow-lg transition-shadow h-full flex flex-col">
                                <Link href={`/search-by-brands-in-uae/${make}/${city.city}`} target="_blank"
                                    title={`${make} ${model} ${subcategory} dubai`}>
                                    <div className="p-3 flex-1 flex flex-col">
                                        <h3 className="text-lg font-semibold mb-2 underline text-center">{make} {model} {subcategory} <span className="text-blue-500">{city.city}</span></h3>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>)}
    </>

    );
}