import React from 'react';
import Link from 'next/link';
import { Fira_Sans, Playfair_Display } from 'next/font/google';
import { buildFormHref } from './buildFormHref';

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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || ''; // e.g. https://example.com

export default function PartsTypesSection({
    make,
    model,
    partName,
    category,
    subcategory,
    location,
}) {
    const formHref = buildFormHref({ make, model, category, subcategory, location });
    const absoluteFormUrl = formHref.startsWith('http') ? formHref : `${SITE_URL}${formHref}`;

    const vehicle = [make, model].filter(Boolean).join(' ');
    const subject = [vehicle, partName || 'spare parts'].filter(Boolean).join(' ');
    const inLocation = location ? ` in ${location}` : '';

    const types = [
        {
            key: 'new',
            label: 'New',
            schemaCondition: 'https://schema.org/NewCondition',
            description: `Brand-new ${subject} for repairs and replacements, ready to fit.`,
        },
        {
            key: 'used',
            label: 'Used',
            schemaCondition: 'https://schema.org/UsedCondition',
            description: `Pre-owned ${subject}, a budget-friendly choice for older models and hard-to-find items.`,
        },
        {
            key: 'aftermarket',
            label: 'Aftermarket',
            schemaCondition: null, // no schema.org equivalent, described via additionalProperty
            description: `${subject} from third-party manufacturers, with more choice and lower prices.`,
        },
        {
            key: 'genuine',
            label: 'Genuine (OEM)',
            schemaCondition: null,
            description: `Genuine OEM ${subject}, identical to the originals fitted at the factory.`,
        },
    ];

    // Structured data for search engines and AI systems
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'OfferCatalog',
        name: `${subject}${inLocation}`,
        itemListElement: types.map((type, i) => ({
            '@type': 'Offer',
            position: i + 1,
            url: absoluteFormUrl,
            availability: 'https://schema.org/InStock',
            ...(location && { areaServed: location }),
            ...(type.schemaCondition && { itemCondition: type.schemaCondition }),
            itemOffered: {
                '@type': 'Product',
                name: `${type.label} ${subject}`,
                description: type.description,
                ...(make && { brand: { '@type': 'Brand', name: make } }),
                ...(category && { category }),
                additionalProperty: {
                    '@type': 'PropertyValue',
                    name: 'Part type',
                    value: type.label,
                },
            },
        })),
    };

    return (
        <section
            aria-labelledby="parts-types-heading"
            data-section="parts-types"
            className={`py-5 xxs:px-7 sm:px-7 s:py-6 lg:mx-6 md:mx-6 xs:mx-2 xxs:mx-2 max-w-7xl mx-auto ${firaSans.className}`}
        >
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <h2
                id="parts-types-heading"
                className={`text-4xl md:text-2xl lg:text-3xl font-semibold xs:text-2xl xxs:text-2xl py-5 ${playfair_display.className}`}
            >
                New, used, aftermarket and genuine {subject}
                {inLocation}
            </h2>
            <p className="max-w-2xl text-gray-700">
                Tell us which part you need and we will find it in the condition and
                price range that suits you.
            </p>

            <ul className="mt-8 grid gap-5 sm:gap-2 md:gap-3 xs:gap-1 xxs:gap-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 xxl:grid-cols-4">
                {types.map((type) => (
                    <li
                        key={type.key}
                        data-part-condition={type.key}
                        className="relative flex flex-col rounded-lg border border-gray-300 bg-white p-6 transition-shadow hover:shadow-md focus-within:ring-2 focus-within:ring-blue-700 focus-within:ring-offset-2"
                    >
                        <h3 className={`text-2xl font-semibold ${playfair_display.className}`}>
                            <Link
                                href={formHref}
                                aria-describedby={`inquiry-hint-${type.key}`}
                                className="text-gray-900 after:absolute after:inset-0 after:content-[''] focus:outline-none"
                            >
                                {`${type.label} ${subject}`}
                            </Link>
                        </h3>
                        <p className="mt-3 flex-1 text-gray-700">{type.description}</p>
                        <span
                            id={`inquiry-hint-${type.key}`}
                            className="mt-5 font-bold text-blue-700 underline"
                        >
                            Send an inquiry
                        </span>
                    </li>
                ))}
            </ul>
        </section>
    );
}