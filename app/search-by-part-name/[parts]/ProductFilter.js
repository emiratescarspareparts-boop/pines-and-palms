"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Fira_Sans, Playfair_Display } from "next/font/google";
import { Menu, X } from "lucide-react";

const playfair_display = Playfair_Display({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-playfair-display",
});

const firaSans = Fira_Sans({
    weight: ["400", "700"],
    subsets: ["latin"],
    display: "swap",
    variable: "--font-fira-sans",
});

export default function ProductFilter({ products, searchParams }) {
    const router = useRouter();
    const [localQuery, setLocalQuery] = useState(searchParams?.search || "");
    const [suggestions, setSuggestions] = useState([]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [categoryQuery, setCategoryQuery] = useState("");
    const [engineQuery, setEngineQuery] = useState("");
    const [compatQuery, setCompatQuery] = useState("");

    /** Extract selected filters */
    const selectedCategories = Array.isArray(searchParams?.["filter_car_parts[]"])
        ? searchParams["filter_car_parts[]"]
        : searchParams?.["filter_car_parts[]"]
            ? [searchParams["filter_car_parts[]"]]
            : [];

    const selectedEngines = Array.isArray(searchParams?.["engine[]"])
        ? searchParams["engine[]"]
        : searchParams?.["engine[]"]
            ? [searchParams["engine[]"]]
            : [];

    const selectedCompat = Array.isArray(searchParams?.["compatibility[]"])
        ? searchParams["compatibility[]"]
        : searchParams?.["compatibility[]"]
            ? [searchParams["compatibility[]"]]
            : [];


    /** Build filter lists */
    const categories = [...new Set(products.map((item) => item.category))];

    const engines = [...new Set(products.flatMap((item) => item.engine || []))];

    const compatibilities = [
        ...new Set(
            products.flatMap((item) =>
                item.compatibility.map((c) =>
                    typeof c === "string"
                        ? c
                        : `${c.make} ${c.model} ${c.years ? `(${c.years})` : ""}`
                )
            )
        ),
    ];

    /** Search filtering for inputs */
    const filteredCategories = categories.filter((cat) =>
        cat.toLowerCase().includes(categoryQuery.toLowerCase())
    );

    const filteredEngines = engines.filter((eng) =>
        eng.toLowerCase().includes(engineQuery.toLowerCase())
    );

    const filteredCompatibilities = compatibilities.filter((comp) =>
        comp.toLowerCase().includes(compatQuery.toLowerCase())
    );

    /** Search bar logic */
    const updateURLAndFilter = (value) => {
        const params = new URLSearchParams(window.location.search);
        params.set("search", value);
        router.push(`?${params.toString()}`);
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setLocalQuery(value);

        if (!value.trim()) return setSuggestions([]);

        const q = value.toLowerCase();

        const matches = products
            .filter(
                (p) =>
                    p.partname.toLowerCase().includes(q) ||
                    p.partnumber.toLowerCase().includes(q) ||
                    p.engine?.some((e) => e.toLowerCase().includes(q)) ||
                    p.compatibility?.some((c) =>
                        `${c.make} ${c.model} ${c.years ?? ""}`
                            .toLowerCase()
                            .includes(q)
                    )
            )
            .slice(0, 6);

        setSuggestions(matches);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            updateURLAndFilter(localQuery);
        }
    };

    const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

    return (
        <div>
            {/* Search Bar */}
            <section id="filter" className="sticky top-0 bg-white z-50 py-4 shadow-sm">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center relative w-full max-w-3xl mx-auto">
                        {/* Mobile Menu */}
                        <button
                            onClick={toggleDrawer}
                            className="mr-2 px-2 py-2 bg-blue-900 text-white rounded-full 
                                block lg:hidden"
                        >
                            {isDrawerOpen ? <X /> : <Menu />}
                        </button>

                        {/* Search Input */}
                        <input
                            type="text"
                            placeholder="Search products by name, number, engine, compatibility..."
                            value={localQuery}
                            onChange={handleSearchChange}
                            onKeyDown={handleKeyDown}
                            className="w-full px-4 py-2 border border-gray-300 rounded-full shadow-sm text-sm"
                        />

                        {/* Suggestions */}
                        {suggestions.length > 0 && (
                            <ul className="absolute top-full left-0 mt-1 w-full bg-white border rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
                                {suggestions.map((s) => (
                                    <li
                                        key={s.id}
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                                        onClick={() => updateURLAndFilter(s.partname)}
                                    >
                                        {s.partname}{" "}
                                        <span className="text-gray-500">({s.partnumber})</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </section>

            {/* Filters + Results */}
            <div className="max-w-7xl mx-auto px-4">
                <div className="lg:grid lg:grid-cols-[20rem_1fr] xl:grid xl:grid-cols-[24rem_1fr] xxl:grid xxl:grid-cols-[28rem_1fr] md:grid md:grid-cols-[16rem_1fr] gap-6 xl:gap-4 xxl:gap-4 lg:gap-4">
                    {/* Sidebar Filters */}
                    <aside
                        className={`fixed top-0 left-0 h-full lg:w-80 xl:w-96 xxl:w-auto md:w-64 bg-white shadow-lg p-4 z-50
      transform ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 lg:sticky lg:translate-x-0 lg:shadow-none lg:block lg:h-auto
       lg:top-4 lg:max-h-[calc(100vh-4rem)] lg:overflow-y-auto lg:z-auto xl:sticky xl:translate-x-0 xl:shadow-none xl:block xl:h-auto
       xl:top-4 xl:max-h-[calc(100vh-4rem)] xl:overflow-y-auto xl:z-auto xxl:sticky xxl:translate-x-0 xxl:shadow-none xxl:block xxl:h-auto
       xxl:top-4 xxl:max-h-[calc(100vh-4rem)] xxl:overflow-y-auto xxl:z-auto md:sticky md:translate-x-0 md:shadow-none md:block md:h-auto
       md:top-4 md:max-h-[calc(100vh-4rem)] md:overflow-y-auto md:z-auto`}
                    >
                        {/* Mobile close */}
                        <div className="lg:hidden flex justify-end p-4">
                            <button
                                onClick={toggleDrawer}
                                className="px-2 py-2 bg-blue-900 text-white rounded-full"
                            >
                                <X />
                            </button>
                        </div>

                        <form method="get">
                            {/* Category */}
                            <fieldset>
                                <legend className={`font-bold my-3 text-xl ${playfair_display.className}`}>
                                    Category
                                </legend>
                                <input
                                    type="text"
                                    placeholder="Search category..."
                                    value={categoryQuery}
                                    onChange={(e) => setCategoryQuery(e.target.value)}
                                    className="w-full mb-2 px-3 py-2 border rounded-md text-sm"
                                />

                                {filteredCategories.map((cat) => (
                                    <label key={cat} className={`block ${firaSans.className}`}>
                                        <input
                                            type="checkbox"
                                            value={cat}
                                            name="filter_car_parts[]"
                                            defaultChecked={selectedCategories.includes(cat)}
                                            className="mr-2"
                                        />
                                        {cat}
                                    </label>
                                ))}
                            </fieldset>

                            <hr className="mt-5" />

                            {/* Engine */}
                            <fieldset>
                                <legend className={`font-bold my-3 text-xl ${playfair_display.className}`}>
                                    Engine
                                </legend>
                                <input
                                    type="text"
                                    placeholder="Search engine..."
                                    value={engineQuery}
                                    onChange={(e) => setEngineQuery(e.target.value)}
                                    className="w-full mb-2 px-3 py-2 border rounded-md text-sm"
                                />
                                {filteredEngines.map((eng) => (
                                    <label key={eng} className={`block ${firaSans.className}`}>
                                        <input
                                            type="checkbox"
                                            name="engine[]"
                                            value={eng}
                                            defaultChecked={selectedEngines.includes(eng)}
                                            className="mr-2"
                                        />
                                        {eng}
                                    </label>
                                ))}
                            </fieldset>

                            <hr className="mt-5" />

                            {/* Compatibility */}
                            <fieldset>
                                <legend className={`font-bold my-3 text-xl ${playfair_display.className}`}>
                                    Compatibility
                                </legend>
                                <input
                                    type="text"
                                    placeholder="Search compatibility..."
                                    value={compatQuery}
                                    onChange={(e) => setCompatQuery(e.target.value)}
                                    className="w-full mb-2 px-3 py-2 border rounded-md text-sm"
                                />
                                {filteredCompatibilities.map((comp, idx) => (
                                    <label key={idx} className={`block ${firaSans.className}`}>
                                        <input
                                            type="checkbox"
                                            name="compatibility[]"
                                            value={comp}
                                            defaultChecked={selectedCompat.includes(comp)}
                                            className="mr-2"
                                        />
                                        {comp}
                                    </label>
                                ))}
                            </fieldset>

                            <hr className="mt-5" />



                            <hr className="mt-5" />

                            <button type="submit" className="mt-4 w-full bg-blue-600 text-white py-2 rounded">
                                Apply Filters
                            </button>
                        </form>
                    </aside>

                    {/* Product Grid */}
                    <section>
                        <h2 className={`text-4xl font-bold mb-4 ${playfair_display.className}`}>
                            All Products
                        </h2>

                        <p>{products.length} Results</p>

                        <ul className="grid grid-cols-3 md:grid-cols-2 xl:grid-cols-4 gap-6">
                            {products.length > 0 ? (
                                products.map((product) => {
                                    const compat = product.compatibility?.[0];
                                    const make = compat?.make || "Unknown";
                                    const model = compat?.model || "Unknown";
                                    const slug = `${product.partname}-${make}-${model}${compat?.years ? `-${compat.years}` : ""
                                        }-${product.partnumber}-${product.id}`;

                                    return (
                                        <li
                                            key={product.id}
                                            className="flex flex-col border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                                        >
                                            <Link
                                                href={`/search-by-make/${encodeURIComponent(make)}/${encodeURIComponent(
                                                    model
                                                )}/${encodeURIComponent(product.category)}/${encodeURIComponent(
                                                    product.subcategory
                                                )}/${encodeURIComponent(slug)}`}
                                                className="flex flex-col h-full"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <figure className="relative w-full aspect-square">
                                                    <Image
                                                        src={product.image}
                                                        alt={product.partname}
                                                        fill
                                                        className="object-contain"
                                                    />
                                                </figure>
                                                <figcaption className="p-3">
                                                    <h3 className={`line-clamp-3 ${firaSans.className}`}>
                                                        {product.partname}
                                                    </h3>
                                                    <p className="text-sm text-gray-600">
                                                        Part #: {product.partnumber}
                                                    </p>
                                                </figcaption>
                                            </Link>
                                        </li>
                                    );
                                })
                            ) : (
                                <p className="col-span-full text-center text-gray-600">
                                    No products found for "{localQuery}"
                                </p>
                            )}
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
}