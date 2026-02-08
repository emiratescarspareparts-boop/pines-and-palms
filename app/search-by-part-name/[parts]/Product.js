"use client"
import { Fira_Sans } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'

const firaSans = Fira_Sans({
    weight: ['400', '700'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-fira-sans',
});

export default function Product({ products, allProducts, parts, searchParams }) {
    const INITIAL_COUNT = 8;
    const [showAll, setShowAll] = useState(false);

    const visibleProducts = showAll
        ? products
        : products.slice(0, INITIAL_COUNT);

    const filteredProducts = allProducts.filter(product =>
        product.subcategory.toLowerCase() === parts.toLowerCase()
    );

    return (
        <div>
            {/* Results Grid */}
            <section className="mt-20 xs:mt-5 xxs:mt-5 sm:mt-7 mx-5 xs:mx-3 sm:mx-3 xxs:mx-3">
                <h2 className="text-2xl font-bold mb-4">{parts} Products</h2>
                <p>{filteredProducts.length} Results</p>
                <ul className="grid grid-cols-5 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 xxl:grid-cols-5 xxs:grid-cols-2 xs:grid-cols-2 xs:gap-2 s:gap-2 xxs:gap-2 md:gap-2 s:grid-cols-2 sm:grid-cols-2 sm:gap-2 gap-6 xl:gap-3 xxl:gap-3 lg:gap-3">
                    {visibleProducts.length > 0 ? (
                        visibleProducts.map(product => {
                            // Get first compatibility entry (or modify logic as needed)
                            const compat = product.compatibility && product.compatibility.length > 0
                                ? product.compatibility[0]
                                : null;

                            const make = compat?.make || '';
                            const model = compat?.model || '';
                            const years = compat?.years || '';

                            const slug = `${product.partname}-${make}-${model}${years ? `-${years}` : ""}-${product.partnumber}-${product.id}`;

                            return (
                                <li
                                    key={product.id}
                                    className="flex flex-col border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                                    itemScope
                                    itemType="https://schema.org/Product"
                                >
                                    <Link
                                        href={`/search-by-part-name/${parts}/${encodeURIComponent(slug)}`}
                                        className="flex flex-col h-full"
                                        target="_blank"
                                        title={`${make} ${model} ${years} ${product.partname}`}
                                        rel="noopener noreferrer"
                                    >
                                        <figure className="relative w-full aspect-square bg-white">
                                            <Image
                                                src={product.image}
                                                alt={product.partname}
                                                fill
                                                className="object-contain"
                                                itemProp="image"
                                            />
                                        </figure>

                                        <figcaption className="p-3">
                                            <h2 className="font-semibold line-clamp-3" itemProp="name">
                                                {make} {model} {years} {product.partname}
                                            </h2>
                                            <p className={`text-sm font-bold text-blue-600 ${firaSans.className}`}>
                                                {product.pricing.currency} {product.pricing.price}
                                            </p>

                                            <p className="text-sm text-gray-600">
                                                Part #: <span itemProp="mpn">{product.partnumber}</span>
                                            </p>

                                            <meta itemProp="brand" content={product.item_specifics?.Brand || ''} />
                                            <meta itemProp="category" content={product.category} />
                                            <meta
                                                itemProp="description"
                                                content={`${product.partname} compatible with ${make} ${model} ${years}`}
                                            />
                                        </figcaption>
                                    </Link>

                                    {product.pricing?.price && (
                                        <div itemProp="offers" itemScope itemType="https://schema.org/Offer" className="hidden">
                                            <meta itemProp="priceCurrency" content={product.pricing.currency} />
                                            <meta itemProp="price" content={product.pricing.price} />
                                            <link itemProp="availability" href="https://schema.org/InStock" />
                                            <meta itemProp="sku" content={product.item_specifics?.sku || product.partnumber} />
                                        </div>
                                    )}
                                </li>
                            );
                        })
                    ) : (
                        <p className="col-span-full text-center text-gray-600">
                            No products found for "{parts}"
                        </p>
                    )}
                </ul>
                {products.length > INITIAL_COUNT && (
                    <div className="flex justify-center mt-6">
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className="px-6 py-2 rounded-full bg-black text-white hover:bg-gray-800 transition"
                        >
                            {showAll ? 'Show Less' : 'Show All'}
                        </button>
                    </div>
                )}
            </section>
        </div>
    )
}