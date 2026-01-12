'use client'
import React, { useState } from 'react'
import PartsData from "../../public/lib/parts.json"
import SearchPartsComponent from '../../components/SearchPart';
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

export default function ShowParts() {
    const partsposts = PartsData;
    const INITIAL_COUNT = 14;
    const [showAll, setShowAll] = useState(false);

    const visiblePart = showAll
        ? partsposts
        : partsposts.slice(0, INITIAL_COUNT);
    return (
        <div><section className="mt-10 shadow-sm mx-4 md:mx-4 lg:max-w-4xl lg:mx-auto xl:mx-10 px-20 xs:px-3 xxs:px-3">
            <div className="container py-6">
                <h2 className={`font-bold text-center text-3xl xs:text-2xl my-3 ${playfair_display.className}`}>
                    Search <span className='text-blue-600'>Auto spare parts</span> for All Car brands in UAE
                </h2>
                <SearchPartsComponent partsposts={partsposts} />

                <ul className="grid grid-cols-4 md:grid-cols-4 xs:grid-cols-2 xxs:grid-cols-3 sm:grid-cols-3 xs:gap-2 xxs:gap-2 sm:gap-2 gap-4 my-10">
                    {visiblePart.map((p, i) => (
                        <li key={i} className="list-none">
                            <Link
                                href="/search-by-part-name/[parts]"
                                as={`/search-by-part-name/${p.parts}`}
                                title={`${p.parts} spare parts UAE`}
                                target='_blank'
                                className="flex flex-col items-center justify-center border hover:border-blue-600 p-3 rounded-sm bg-white"
                            >
                                <span className={`mt-2 px-3 py-1 text-sm xl:text-lg xxl:text-lg font-medium font-sans rounded-sm text-center w-max ${firaSans.className}`}>
                                    <span className='text-blue-500'>{p.parts}</span>
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
                {partsposts.length > INITIAL_COUNT && (
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
