'use client'
import React, { useState } from 'react'
import CitiesData from "../../public/lib/cities.json"
import { Fira_Sans, Playfair_Display } from 'next/font/google';
import Link from 'next/link';

const firaSans = Fira_Sans({
    weight: ['400', '700'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-fira-sans',
});

const playfair_display = Playfair_Display({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-playfair-display',
});

export default function ShowCities() {
    const cities = CitiesData;
    const INITIAL_COUNT = 14;
    const [showAll, setShowAll] = useState(false);

    const visibleCities = showAll
        ? cities
        : cities.slice(0, INITIAL_COUNT);
    return (
        <div>
            <section className="mt-10 shadow-sm mx-4 md:mx-4 lg:max-w-4xl lg:mx-auto xl:mx-10 px-20 xs:px-3 xxs:px-3">
                <div className="container py-6">
                    <h2 className={`font-bold text-center text-3xl xs:text-2xl my-3 ${playfair_display.className}`}>
                        Search <span className='text-blue-600'>Auto spare parts</span> for All Car brands in UAE
                    </h2>

                    <ul className="grid grid-cols-4 md:grid-cols-4 xs:grid-cols-2 xxs:grid-cols-3 sm:grid-cols-3 xs:gap-2 xxs:gap-2 sm:gap-2 gap-4 my-10">
                        {visibleCities.map((p, i) => (
                            <li key={i} className="list-none">
                                <Link
                                    href="/search-by-cities-in-uae/[parts]"
                                    as={`/search-by-cities-in-uae/${p.city}`}
                                    title={`car parts in ${p.city}`}
                                    target='_blank'
                                    className="flex flex-col items-center justify-center border hover:border-blue-600 p-3 rounded-sm bg-white"
                                >
                                    <span className={`mt-2 px-3 py-1 h-auto text-sm xl:text-lg xxl:text-lg font-medium font-sans rounded-sm text-center w-max ${firaSans.className}`}>
                                        <span className='text-blue-500'>{p.city}</span>
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    {cities.length > INITIAL_COUNT && (
                        <div className="flex justify-center mt-6">
                            <button
                                onClick={() => setShowAll(!showAll)}
                                className="px-6 py-2 rounded-full bg-black text-white hover:bg-gray-800 transition"
                            >
                                {showAll ? 'Show Less' : 'Show All'}
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </div>
    )
}
