'use client';

import { useState } from 'react';
import { Fira_Sans, Playfair_Display, Poppins, Roboto } from 'next/font/google';
import Link from 'next/link';

const playfair_display = Playfair_Display({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-playfair-display',
});

const roboto = Roboto({
    subsets: ['latin'],
    weight: ['400', '700'],
    style: ['normal', 'italic'],
    display: 'swap',
    variable: '--font-roboto',
});

const firaSans = Fira_Sans({
    weight: ['400', '700'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-fira-sans',
});

const poppins = Poppins({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-poppins',
    weight: ['600'],
});

export default function ProductTabs({ product, slug }) {
    const [activeTab, setActiveTab] = useState('compatibility');


    return (
        <div className="mt-10">
            {/* Tabs navigation */}
            <div className={`flex border-b mb-4 space-x-2 overflow-x-auto scrollbar-hide ${poppins.className}`}>
                <button
                    onClick={() => setActiveTab('compatibility')}
                    className={`px-4 xs:px-1 xxs:px-2 s:px-2 py-2 rounded-t-lg whitespace-nowrap font-semibold ${activeTab === 'compatibility' ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300 '
                        }`}
                    id='#compat'
                >
                    Compatibility
                </button>
                <button
                    onClick={() => setActiveTab('item-specifics')}
                    className={`px-4 xs:px-1 xxs:px-2 s:px-2 py-2 rounded-t-lg whitespace-nowrap font-semibold ${activeTab === 'item-specifics' ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
                        }`}
                >
                    Item Specifics
                </button>
                <button
                    onClick={() => setActiveTab('policies')}
                    className={`px-4 xs:px-1 xxs:px-2 s:px-2 py-2 rounded-t-lg whitespace-nowrap font-semibold ${activeTab === 'policies' ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
                        }`}
                >
                    Policies
                </button>
            </div>

            {/* Tabs content */}
            <div>
                {activeTab === 'compatibility' && (
                    <div>
                        <h2 className="text-xl font-semibold mb-2">Compatibility</h2>
                        <ul className={`list-disc pl-6 space-y-1 ${firaSans.className}`}>
                            {product?.compatibility?.map((comp, index) => {
                                const compatMake = encodeURIComponent(comp.make);
                                const compatModel = encodeURIComponent(comp.model);
                                const compatYear = comp.years;

                                const partSlug = `${product.partname}-${comp.make}-${comp.model}-${compatYear}-${product.partnumber}-${product.id}`;

                                return (
                                    <li key={index}>
                                        <Link
                                            className="text-blue-700 hover:underline"
                                            href={`https://www.emirates-car.com/search-by-make/${compatMake}/${compatModel}/${encodeURIComponent(
                                                product.category
                                            )}/${encodeURIComponent(product.subcategory)}/${encodeURIComponent(partSlug)}`}
                                            target='_blank'
                                        >
                                            {comp.make} {comp.model} {compatYear} {comp.engine}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}


                {activeTab === 'item-specifics' && (
                    <div>
                        <h2 className="text-xl font-semibold mb-2">Item Specifics</h2>
                        <dl className={`grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 ${firaSans.className}`}>

                            {/* SKU */}
                            {product.item_specifics.sku && (
                                <div>
                                    <dt className="font-semibold">SKU</dt>
                                    <dd className="text-gray-700">{product.item_specifics.sku}</dd>
                                </div>
                            )}

                            {/* Brand */}
                            {product.item_specifics.Brand && (
                                <div>
                                    <dt className="font-semibold">Brand</dt>
                                    <dd className="text-gray-700">{product.item_specifics.Brand}</dd>
                                </div>
                            )}

                            {/* Manufacturer Part Number */}
                            {product.item_specifics["Manufacturer Part Number"] && (
                                <div>
                                    <dt className="font-semibold">Manufacturer Part Number</dt>
                                    <dd className="text-gray-700">{product.item_specifics["Manufacturer Part Number"]}</dd>
                                </div>
                            )}

                            {/* Other Part Number */}
                            {product.item_specifics["Placement on Vehicle"]?.length > 0 && (
                                <div>
                                    <dt className="font-semibold">Placement on Vehicle</dt>
                                    <dd className="text-gray-700">{product.item_specifics["Placement on Vehicle"].join(", ")}</dd>
                                </div>
                            )}

                            {/* OEM or Aftermarket */}
                            {product.item_specifics["OEM or Aftermarket"] && (
                                <div>
                                    <dt className="font-semibold">OEM or Aftermarket</dt>
                                    <dd className="text-gray-700">
                                        {Array.isArray(product.item_specifics["OEM or Aftermarket"])
                                            ? product.item_specifics["OEM or Aftermarket"].join(", ")
                                            : product.item_specifics["OEM or Aftermarket"]}
                                    </dd>
                                </div>
                            )}

                            {/* Interchange Part Number */}
                            {product.item_specifics["Interchange Part Number"]?.length > 0 && (
                                <div>
                                    <dt className="font-semibold">Interchange Part Number</dt>
                                    <dd className="text-gray-700">{product.item_specifics["Interchange Part Number"].join(", ")}</dd>
                                </div>
                            )}

                            {/* Condition */}
                            {product.item_specifics.Condition && (
                                <div>
                                    <dt className="font-semibold">Condition</dt>
                                    <dd className="text-gray-700">{product.item_specifics.Condition}</dd>
                                </div>
                            )}

                            {/* Warranty */}
                            {product.item_specifics.Warranty && (
                                <div>
                                    <dt className="font-semibold">Warranty</dt>
                                    <dd className="text-gray-700">{product.item_specifics.Warranty}</dd>
                                </div>
                            )}

                            {/* Country of Manufacture */}
                            {product.item_specifics["Country/Region of Manufacture"] && (
                                <div>
                                    <dt className="font-semibold">Country/Region of Manufacture</dt>
                                    <dd className="text-gray-700">{product.item_specifics["Country/Region of Manufacture"]}</dd>
                                </div>
                            )}

                        </dl>
                    </div>
                )}




                {activeTab === 'policies' && (
                    <div>
                        <h2 className="text-xl font-semibold mb-2">Policies</h2>
                        <ul className={`list-disc pl-5 space-y-1 text-gray-700 ${firaSans.className}`}>
                            <li><strong>Shipping:</strong> {product.policies.shipping}</li>
                            <li><strong>Delivery:</strong> Delivery Available to All Emirates - Dubai, Sharjah, Ajman, Abu Dhabi, Al Ain, Fujairah, Umm Al Quwain, Ras Al Khaimah</li>
                            <li><strong>Returns:</strong> {product.policies.returns}</li>
                            <li><strong>Payment Methods:</strong> {product.policies.payment_methods.join(", ")}</li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
