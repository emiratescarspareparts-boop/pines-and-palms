import React from 'react';
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
import Link from 'next/link';
import TenEntries from '../../../../components/tenentries';
import Contents from '../../../../components/Contents';
import FormComponent from '../../../../components/FormComponent';
import SearchModel from '../../../../components/SearchModel';
import Footer from '../../../../components/footer';
import HondaOfferButton from '../../../../components/HondaOfferButton';
import PartsAccordion from '../../../../components/Parts-Accordion';
import { getCity, getFormModel, getParts } from '../../../page';
import { redirect } from 'next/navigation';
import HeroCarousel from '../../../../components/HeroCarousel';
import SearchCity from '../../../../components/SearchCity';
import SearchMakeParts from './SearchMakeParts';
import CarData from "../../../../public/lib/car-data.json"
import partsData from "../../../../public/lib/parts.json"

export async function generateStaticParams() {
    const excludedMakes = [
        'Acura', 'Buick', 'Eagle', 'Lotus', 'Plymouth', 'Pontiac', 'Saab', 'Subaru',
        'Alfa Romeo', 'Geo', 'Oldsmobile', 'Isuzu', 'Saturn', 'Corbin', 'Holden',
        'Spyker', 'Spyker Cars', 'Aston Martin', 'Panoz', 'Foose', 'Morgan', 'Aptera',
        'Smart', 'SRT', 'Roush Performance', 'Pagani', 'Mobility Ventures LLC',
        'RUF Automobile', 'Koenigsegg', 'Karma', 'Polestar', 'STI', 'Kandi', 'Abarth',
        'Dorcen', 'Foton', 'W Motors', 'Opel', 'Skoda', 'Hillman', 'Austin', 'Fillmore',
        'Maybach', 'Merkur', 'Rambler', 'Shelby', 'Studebaker'
    ];
    try {
        const filtered = CarData.filter(car => !excludedMakes.includes(car.make));
        const uniqueMakes = Array.from(
            new Map(
                filtered.map(item => [`${item.make}`, { make: item.make }])
            ).values()
        );


        const paths = [];
        uniqueMakes.forEach(make => {
            partsData.forEach(part => {
                paths.push({
                    make,
                    parts: part.parts,
                });
            });
        });
        if (excludedMakes.includes(make)) {
            redirect('/get-in-touch');
        }

        return paths;
    } catch (error) {
        console.error('Error generating static params:', error);
        return [];
    }
}

export async function generateMetadata({ params }) {
    const { make, parts } = params;
    const decodedPart = decodeURIComponent(parts);

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": `Do you sell genuine ${make} ${decodedPart}?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `Yes, we supply genuine OEM ${make} ${decodedPart}, as well as used and aftermarket options to suit your budget.`
                }
            },
            {
                "@type": "Question",
                "name": `Can I buy used or aftermarket ${make} ${decodedPart}?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `Yes, we offer used and aftermarket ${make} ${decodedPart} that are tested for quality and performance.`
                }
            }
        ]
    };

    return {
        title: `${make} ${decodedPart} - Car Auto Spare Parts Order Online in UAE`,
        description: `Buy ${make} ${decodedPart} Online and Get Delivered Used, New, Genuine / OEM, Aftermarket in UAE`,
        alternates: {
            canonical: `https://www.emirates-car.com/search-by-make/${make}/${decodedPart}`,
        },
        keywords: `${make} ${decodedPart} spare parts, ${make} ${decodedPart} online dubai, ${make} ${decodedPart} uae`,
        openGraph: {
            title: `${make} ${decodedPart} - Car Spare Parts UAE`,
            description: `Order ${make} ${decodedPart} Genuine, OEM, Used and Aftermarket Online in UAE.`,
            url: 'https://emirates-car.com/search-by-make/' + make + '/' + decodedPart,
            images: [{ url: '/favicon.png', width: 512, height: 512 }],
        },
        other: {
            "script:ld+json": JSON.stringify(faqSchema),
        },
    };
}

async function getModel(make) {
    const filtered = CarData.filter(item => item.make === make);
    return [...new Map(filtered.map(item => [item.model, item])).values()];
}

async function getPartsList() {
    return partsData;
}

export default async function PartsPage({ params }) {
    const { make, parts } = params;
    const carmodel = await getModel(make);
    const partsList = await getPartsList();
    const modelforms = await getFormModel();
    const partsposts = await getParts();
    const cities = await getCity();
    const excludedMakes = [
        'Acura',
        'Buick',
        'Eagle',
        'Lotus',
        'Plymouth',
        'Pontiac',
        'Saab',
        'Subaru',
        'Alpha Romeo',
        'Geo',
        'Oldsmobile',
        'Isuzu',
        'Saturn',
        'Corbin',
        'Holden',
        'Spyker',
        'Spyker Cars',
        'Aston Martin',
        'Panoz',
        'Foose',
        'Morgan',
        'Aptera',
        'Smart',
        'SRT',
        'Roush Performance',
        'Pagani',
        'Mobility Ventures LLC',
        'RUF Automobile',
        'Koenigsegg',
        'Karma',
        'Polestar',
        'STI',
        'Kandi',
        'Abarth',
        'Dorcen',
        'Foton',
        'W Motors',
        'Opel',
        'Skoda',
        'Hillman',
        'Austin',
        'Fillmore',
        'Maybach',
        'Merkur',
        'Rambler',
        'RUF Automobile',
        'Saturn',
        'Shelby',
        'Studebaker',
    ];
    const isExcludedMake = excludedMakes.includes(make);
    if (excludedMakes.includes(make)) {
        redirect('/get-in-touch');
    }

    return (
        <div>
            <main className="d-flex justify-center pt-10 mx-2 font-sans">
                <section
                    className="py-5 xxs:px-7 sm:px-7 s:py-6 lg:mx-6 md:mx-6 xs:mx-2 xxs:mx-2 s:mx-2 max-w-7xl mx-auto"
                    aria-label="Spare parts by country of origin"
                >
                    <div className="bg-backgroundlight rounded-sm">
                        <div className="grid grid-cols-2 xs:grid-cols-1 sm:grid-cols-2 xxs:grid-cols-1 xs:text-center xs:pt-5">
                            <div>
                                <div className="ml-8 md:ml-8 xs:ml-1 xxs:ml-4 mt-10 sm:mt-12 md:mt-10 lg:mt-20 xl:mt-28 xs:mt-2 xs:text-left">
                                    <h2 className="block text-3xl md:text-lg lg:text-2xl font-medium text-black lg:leading-tight font-poppins">
                                        Expert Parts <span className="text-blue-600">Seamless Performance</span>
                                    </h2>

                                    <h1 className="mt-3 text-5xl xl:text-4xl xxl:text-4xl lg:text-4xl md:text-xl xs:text-lg xxs:text-lg sm:text-lg s:text-lg font-extrabold font-head text-gray-900">
                                        {make} <span className='text-blue-700'>{decodeURIComponent(parts)}</span> in UAE from Dubai Dealers - Used, Aftermarket, Genuine parts.
                                    </h1>

                                    <div className="mt-5">
                                        <div className="py-3  w-1/2 lg:w-full xs:w-full xxs:w-3/4 mr-auto rounded-lg shadow-md">
                                            <a
                                                href="/#myForm"
                                                title="Inquire about vehicle parts online"
                                                className="flex items-center justify-center py-2 text-xl border border-transparent font-medium rounded-sm text-white bg-blue-600 hover:bg-blue-700"
                                            >
                                                Inquire Now
                                            </a>
                                        </div>
                                    </div>                                </div>
                            </div>

                            <div className="xxs:hidden xs:hidden s:hidden">
                                <HeroCarousel />
                            </div>
                        </div>
                    </div>
                </section>
                <FormComponent formsData={modelforms} postFilter={partsposts} />
                <div className="py-5 max-w-7xl mx-auto">
                    <p className="mt-3 text-center text-gray-700">
                        Searching for reliable {make} {decodeURIComponent(parts)} in UAE?
                        Emirates Auto Parts supplies Genuine, Used, OEM and Aftermarket
                        {` ${make} ${decodeURIComponent(parts)}.`}
                    </p>
                </div>
                <div className="bg-bglight">
                    {!isExcludedMake && (
                        <>
                            <h3 className="text-black text-4xl my-10 text-center md:text-2xl lg:text-2xl font-bold xs:text-xl xxs:text-2xl pt-10">
                                Search <span className="text-blue-500">{decodeURIComponent(parts)}</span>{' '}
                                Spare parts for other Model
                            </h3>

                            <SearchMakeParts partsposts={partsposts} make={make} />
                            <div className="grid grid-cols-7 md:grid-cols-5 lg:grid-cols-7 mx-10 md:mx-4 sm:mx-3 xs:grid xs:grid-cols-2 sm:grid sm:grid-cols-5 xxs:grid xxs:grid-cols-5 s:grid s:grid-cols-3 gap-1 xs:mx-4 s:mx-4 xxs:mx-4 md:ml-11 my-10 pb-10 font-sans">
                                {partsList.map((part, i) => (
                                    <Link
                                        key={i}
                                        href={`/parts/${make}/${encodeURIComponent(part.parts)}`}
                                        title={`${make} ${part.parts}`}
                                    >
                                        <div className="border-blue-800 h-full hover:border-blue-900 bg-white rounded-sm">
                                            <p className="text-center text-black text-sm font-medium hover:text-gray-800 p-2">{make} {part.parts}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </>
                    )}
                </div>
                <SearchModel make={make} car={carmodel} />
                <div className="place-content-center grid grid-cols-1 gap-3 xs:grid-cols-1 xs:grid s:grid s:grid-cols-1 py-5 xl:mx-10 lg:mx-10 md:mx-10 sm:mx-5 xs:mx-2 xs:py-0 xxs:mx-2 s:mx-2 md:ml-11 my-10 mx-10">

                    <h3 className="text-center font-bold text-4xl">
                        {decodeURIComponent(parts)} for All {make} Models:
                    </h3>
                    <div className="grid grid-cols-4 xs:grid xs:grid-cols-1 sm:grid sm:grid-cols-4 md:grid md:grid-cols-3 xxs:grid xxs:grid-cols-3 gap-1">
                        {carmodel.map((post, i) => {
                            const linkHref = isExcludedMake
                                ? '/get-in-touch'
                                : '/search-by-make/[make]/[model]';
                            const linkAs = isExcludedMake
                                ? '/get-in-touch'
                                : `/search-by-make/${post.make}/${encodeURIComponent(post.model)}`;

                            return (
                                <div key={i}>
                                    <Link href={linkHref} as={linkAs} title={`${post.make} ${post.model} spare parts`}>
                                        <div className="border-blue-800 h-full hover:border-blue-900 bg-white rounded-sm">
                                            <p className="xs:text-center font-sans text-blue-800 underline hover:text-blue-700 focus:text-blue-700">
                                                {make + ' ' + post.model.replace('%2F', '/') + " " + decodeURIComponent(parts)}
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="bg-bglight ">
                    <h3 className="text-black text-4xl my-10 text-center md:text-2xl lg:text-2xl font-bold xs:text-xl xxs:text-2xl pt-10">
                        Search{' '}
                        <span className="text-blue-500">{make} {decodeURIComponent(parts)}</span>{' '}
                        Spare parts Anywhere in UAE
                    </h3>
                    <SearchCity cities={cities} />
                    <div className="grid grid-cols-7 md:grid-cols-5 lg:grid-cols-7 mx-10 md:mx-4 sm:mx-3 xs:grid xs:grid-cols-2 sm:grid sm:grid-cols-5 xxs:grid xxs:grid-cols-5 s:grid s:grid-cols-3 gap-1 xs:mx-4 s:mx-4 xxs:mx-4 md:ml-11 my-10 pb-10 font-sans">
                        {cities.map((post, i) => (
                            <div key={i}>
                                <Link
                                    href="/search-by-cities-in-uae/[city]"
                                    as={'/search-by-cities-in-uae/' + post.city}
                                    title={make + ' spare parts ' + post.city}
                                >
                                    <div className="border-blue-800 h-full hover:border-blue-900 bg-white rounded-sm">
                                        <p className="text-center text-black font-medium text-sm hover:text-gray-800 p-2">
                                            {make} {decodeURIComponent(parts)} {post.city}
                                        </p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="text-center mt-5">
                    {make === 'Honda' ? <HondaOfferButton /> : null}
                </div>


                <PartsAccordion make={make} location={parts} />
                <TenEntries />
                <Contents />
            </main>
            <Footer />
        </div>
    );
}
