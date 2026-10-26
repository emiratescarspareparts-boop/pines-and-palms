"use client"
import { Fira_Sans } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const firaSans = Fira_Sans({
    weight: ['400', '700'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-fira-sans',
});

// Expands "2008-2011" -> "2008, 2009, 2010, 2011"
// Also handles "2005, 2008-2010" -> "2005, 2008, 2009, 2010"
const expandYears = (years) => {
    if (!years) return "";

    const result = [];

    years.toString().split(',').forEach(part => {
        const p = part.trim();
        if (!p) return;

        if (p.includes('-')) {
            const [start, end] = p.split('-').map(y => parseInt(y.trim()));
            if (!isNaN(start) && !isNaN(end) && start <= end) {
                for (let year = start; year <= end; year++) {
                    result.push(year.toString());
                }
                return;
            }
        }

        result.push(p);
    });

    return result.join(', ');
};

export default function Product({ make, model, parts, products, allProducts }) {
    const visibleProducts = products.filter(product =>
        product.compatibility.some(
            c =>
                c.make.toLowerCase() === make.toLowerCase()
        )
    );
    return (
        <div>{/* Results Grid */}
            <section className="mt-20 xs:mt-5 xxs:mt-5 sm:mt-7 mx-5 xs:mx-3 sm:mx-3 xxs:mx-3">
                <h2 className="text-2xl font-bold mb-4">{make} Spare Parts</h2>
                <p>{visibleProducts.length} Results</p>
                <ul className="grid grid-cols-5 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 xxl:grid-cols-5 xxs:grid-cols-2 xs:grid-cols-2 xs:gap-2 s:gap-2 xxs:gap-2 md:gap-2 s:grid-cols-2 sm:grid-cols-2 sm:gap-2 gap-6 xl:gap-3 xxl:gap-3 lg:gap-3">
                    {visibleProducts.length > 0 ? (
                        visibleProducts.map(product => {
                            // If a model is passed in, prefer the entry matching it;
                            // otherwise use the first entry for this make
                            const compat =
                                (model
                                    ? product.compatibility.find(
                                        c =>
                                            c.make.toLowerCase() === make.toLowerCase() &&
                                            c.model?.toLowerCase() === model.toLowerCase()
                                    )
                                    : null) ||
                                product.compatibility.find(
                                    c => c.make.toLowerCase() === make.toLowerCase()
                                ) ||
                                null;

                            const displayYears = expandYears(compat?.years);

                            // Slug keeps the compact years format (e.g. 2008-2011)
                            const slug = `${product.partname}-${make}-${compat?.model || ""}${compat?.years ? `-${compat.years}` : ""}-${product.partnumber}-${product.id}`;

                            return (
                                <li
                                    key={product.id}
                                    className="flex flex-col border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                                    itemScope
                                    itemType="https://schema.org/Product"
                                >
                                    <Link
                                        href={`/search-by-make/${make}/${compat?.model || ""}/${product.category}/${product.subcategory}/${encodeURIComponent(slug)}`}
                                        className="flex flex-col h-full"
                                        target="_blank"
                                        title={`${make} ${compat?.model || ""} ${displayYears} ${product.partname}`}
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
                                            <h2 className="font-semibold line-clamp-4" itemProp="name">
                                                {make} {compat?.model || ""} {displayYears} {product.partname}
                                            </h2>
                                            <p className={`text-xl font-extrabold text-blue-500 ${firaSans.className}`}>{product.pricing.currency} {product.pricing.price}</p>

                                            <p className="text-sm text-bold">
                                                Part #: <span itemProp="mpn">{product.partnumber}</span>
                                            </p>

                                            <meta itemProp="brand" content={product.brand} />
                                            <meta itemProp="category" content={product.category} />
                                            <meta
                                                itemProp="description"
                                                content={`${product.partname} compatible with ${make} ${compat?.model || ""} ${displayYears}`}
                                            />
                                        </figcaption>
                                    </Link>

                                    {product.pricing?.price && (
                                        <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
                                            <meta itemProp="priceCurrency" content={product.pricing.currency} />
                                            <meta itemProp="price" content={product.pricing.price} />
                                            <link itemProp="availability" href="https://schema.org/InStock" />
                                            <meta itemProp="sku" content={product.sku || product.partnumber} />
                                        </div>
                                    )}
                                </li>
                            );
                        })
                    ) : (
                        <p className="col-span-full text-center text-gray-600">
                            No {make} products found
                        </p>
                    )}
                </ul>

            </section>
        </div>
    )
}