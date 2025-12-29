"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProductFilter({ make, products, allProducts, searchParams }) {
    const router = useRouter();

    // Search state
    const [localQuery, setLocalQuery] = useState(searchParams.search || "");
    const [suggestions, setSuggestions] = useState([]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [categoryQuery, setCategoryQuery] = useState("");
    const [engineQuery, setEngineQuery] = useState("");
    const [compatQuery, setCompatQuery] = useState("");


    // Selected filters from URL
    const selectedCategories = Array.isArray(searchParams["categories"])
        ? searchParams["categories"]
        : searchParams["categories"]
            ? [searchParams["categories"]]
            : [];

    const selectedEngines = Array.isArray(searchParams["engine"])
        ? searchParams["engine"]
        : searchParams["engine"]
            ? [searchParams["engine"]]
            : [];

    const selectedCompat = Array.isArray(searchParams["compatibility"])
        ? searchParams["compatibility"]
        : searchParams["compatibility"]
            ? [searchParams["compatibility"]]
            : [];

    // Build options
    const categories = [...new Set(allProducts.map(item => item.category))];
    const engines = [...new Set(allProducts.flatMap(item => item.engine || []))];
    const compatibilities = [
        ...new Set(
            allProducts.flatMap(item =>
                item.compatibility.map(c =>
                    typeof c === "string"
                        ? c
                        : `${c.make} ${c.model ?? ""} ${c.years ? `(${c.years})` : ""}`
                )
            )
        ),
    ];
    const filteredCategories = categories.filter(cat =>
        cat.toLowerCase().includes(categoryQuery.toLowerCase())
    );

    const filteredEngines = engines.filter(eng =>
        eng.toLowerCase().includes(engineQuery.toLowerCase())
    );

    const filteredCompatibilities = compatibilities.filter(comp =>
        comp.toLowerCase().includes(compatQuery.toLowerCase())
    );
    // Suppose you filtered products by make & model
    const filteredProducts = allProducts.filter(product =>
        product.compatibility.some(
            c =>
                c.make.toLowerCase() === make.toLowerCase()
        )
    );



    // Update URL for SSR filtering
    const updateURLAndFilter = (query) => {
        const params = new URLSearchParams(searchParams.toString());

        if (query) {
            params.set("search", query);
        } else {
            params.delete("search");
        }

        // Decode only parentheses after building query
        let paramString = params.toString()
            .replace(/%28/g, "(")
            .replace(/%29/g, ")");

        router.push(`/search-by-make/${make}?${paramString}#filter`);
    };


    // Handle search input changes
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setLocalQuery(value);

        if (!value.trim()) return setSuggestions([]);

        const q = value.toLowerCase();
        const matches = allProducts
            .filter(p =>
                p.partname.toLowerCase().includes(q) ||
                p.partnumber.toLowerCase().includes(q) ||
                p.engine?.some(e => e.toLowerCase().includes(q)) ||
                p.compatibility?.some(c =>
                    `${c.make} ${c.model} ${c.years ?? ""}`.toLowerCase().includes(q)
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
                    <div className="flex justify-center items-center relative w-full max-w-3xl mx-auto">
                        <input
                            type="text"
                            placeholder={`Search ${make} parts by partname, partnumer, engine, compatibility...`}
                            value={localQuery}
                            onChange={handleSearchChange}
                            onKeyDown={handleKeyDown}
                            className="w-full px-4 py-2 border border-gray-300 rounded-full shadow-sm text-sm"
                        />

                        {suggestions.length > 0 && (
                            <ul className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
                                {suggestions.map(s => (
                                    <li
                                        key={s.id}
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                                        onClick={() => updateURLAndFilter(s.partname)}
                                    >
                                        {s.partname} <span className="text-gray-500">({s.partnumber})</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </section>

            {/* Mobile filter button */}
            <div className="lg:hidden xl:hidden xxl:hidden md:hidden flex justify-end p-4">
                <button
                    onClick={toggleDrawer}
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                    {isDrawerOpen ? "Close Filters" : "Open Filters"}
                </button>
            </div>
            <div className="max-w-7xl mx-auto px-4">
                <div className="lg:grid lg:grid-cols-[20rem_1fr] xl:grid xl:grid-cols-[24rem_1fr] xxl:grid xxl:grid-cols-[28rem_1fr] md:grid md:grid-cols-[16rem_1fr] gap-6 xl:gap-4 xxl:gap-4 lg:gap-4">
                    <aside
                        className={`fixed top-0 left-0 h-full lg:w-80 xl:w-96 xxl:w-auto md:w-64 bg-white shadow-lg p-4 z-50
      transform ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 lg:sticky lg:translate-x-0 lg:shadow-none lg:block lg:h-auto
       lg:top-4 lg:max-h-[calc(100vh-4rem)] lg:overflow-y-auto lg:z-auto xl:sticky xl:translate-x-0 xl:shadow-none xl:block xl:h-auto
       xl:top-4 xl:max-h-[calc(100vh-4rem)] xl:overflow-y-auto xl:z-auto xxl:sticky xxl:translate-x-0 xxl:shadow-none xxl:block xxl:h-auto
       xxl:top-4 xxl:max-h-[calc(100vh-4rem)] xxl:overflow-y-auto xxl:z-auto md:sticky md:translate-x-0 md:shadow-none md:block md:h-auto
       md:top-4 md:max-h-[calc(100vh-4rem)] md:overflow-y-auto md:z-auto`}>
                        <div className="lg:hidden xl:hidden xxl:hidden md:hidden flex justify-end p-4">
                            <button
                                onClick={toggleDrawer}
                                className="px-4 py-2 bg-blue-600 text-white rounded"
                            >
                                {isDrawerOpen ? "Close Filters" : "Open Filters"}
                            </button>
                        </div>
                        <form method="get">
                            <h4 className="font-semibold mb-2">Category</h4>

                            <input
                                type="text"
                                placeholder="Search categories..."
                                value={categoryQuery}
                                onChange={(e) => setCategoryQuery(e.target.value)}
                                className="w-full mb-2 px-3 py-2 border border-gray-300 rounded-md text-sm"
                            />
                            {filteredCategories.map(cat => (
                                <label key={cat} className="block text-sm">
                                    <input
                                        type="checkbox"
                                        name="filter_car_parts[]"
                                        value={cat}
                                        defaultChecked={selectedCategories.includes(cat)}
                                        className="mr-2"
                                    />
                                    {cat}
                                </label>
                            ))}

                            <h4 className="font-semibold mt-4 mb-2">Engine</h4>
                            <input
                                type="text"
                                placeholder="Search engines..."
                                value={engineQuery}
                                onChange={(e) => setEngineQuery(e.target.value)}
                                className="w-full mb-2 px-3 py-2 border border-gray-300 rounded-md text-sm"
                            />
                            {filteredEngines.map(eng => (
                                <label key={eng} className="block text-sm">
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

                            <h4 className="font-semibold mt-4 mb-2">Compatibility</h4>
                            <input
                                type="text"
                                placeholder="Search compatibility..."
                                value={compatQuery}
                                onChange={(e) => setCompatQuery(e.target.value)}
                                className="w-full mb-2 px-3 py-2 border border-gray-300 rounded-md text-sm"
                            />
                            {filteredCompatibilities.map((comp, idx) => (
                                <label key={idx} className="block text-sm">
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

                            <button
                                type="submit"
                                className="mt-4 w-full bg-blue-600 text-white py-2 rounded"
                            >
                                Apply Filters
                            </button>
                        </form>
                    </aside>


                    {/* Results Grid */}
                    <section className="lg:ml-0">
                        <h2 className="text-2xl font-bold mb-4">{make} Spare Parts</h2>
                        <p>{filteredProducts.length} Results</p>
                        <ul className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 xxl:grid-cols-3 xxs:grid-cols-2 xs:grid-cols-2 xs:gap-2 s:gap-2 xxs:gap-2 md:gap-2 s:grid-cols-2 sm:grid-cols-2 sm:gap-2 gap-6 xl:gap-3 xxl:gap-3 lg:gap-3">
                            {products.length > 0 ? (
                                products.map(product => {
                                    // === 3-DAY ROTATION LOGIC (inline) === //
                                    const compatList = product.compatibility.filter(
                                        c => c.make.toLowerCase() === make.toLowerCase()
                                    );

                                    let compat = null;

                                    if (compatList.length > 0) {
                                        const now = new Date();

                                        const days = Math.floor(now.getTime() / (1000 * 60 * 60 * 24));

                                        const rotationPeriod = Math.floor(days / 3);

                                        const index = (rotationPeriod + product.id) % compatList.length;

                                        compat = compatList[index];
                                    }

                                    const slug = `${product.partname}-${make}-${compat?.model ? `${compat.model}` : ""
                                        }${compat?.years ? `-${compat.years}` : ""
                                        }-${product.partnumber}-${product.id}`;

                                    return (
                                        <li
                                            key={product.id}
                                            className="flex flex-col border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                                            itemScope
                                            itemType="https://schema.org/Product"
                                        >
                                            <Link
                                                href={`/search-by-make/${make}/${compat?.model ? `${compat.model}` : ""
                                                    }/${product.category}/${product.subcategory}/${encodeURIComponent(slug)}`}
                                                className="flex flex-col h-full" target='_blank' rel='noopener noreferrer'
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
                                                    <h2 className="font-semibold line-clamp-1" itemProp="name">{make} {compat?.model || ""} {compat?.years || ""} {product.partname}</h2>
                                                    <p className="text-sm text-gray-600">Part #: <span itemProp="mpn">{product.partnumber}</span></p>
                                                    <meta itemProp="brand" content={product.brand} />
                                                    <meta itemProp="category" content={product.category} />
                                                    <meta itemProp="description" content={`${product.partname} compatible with ${make} ${compat?.model || ""} ${compat?.years || ""}`} />

                                                </figcaption>
                                            </Link>
                                            {product.pricing?.price && (
                                                <div itemProp="offers" itemScope itemType="https://schema.org/Offer" className="hidden">
                                                    <meta itemProp="priceCurrency" content={product.pricing?.currency} />
                                                    <meta itemProp="price" content={product.pricing?.price} />
                                                    <link itemProp="availability" href="https://schema.org/InStock" />
                                                    <meta itemProp="url" content={`https://emirates-car.com/search-by-make/${make}/${compat?.model ? `${compat.model}` : ""}/${product.category}/${encodeURIComponent(slug)}`} />
                                                    <meta itemProp="sku" content={product.sku || product.partnumber} />
                                                </div>
                                            )}
                                        </li>
                                    );
                                })
                            ) : (
                                <p className="col-span-full text-center text-gray-600">
                                    No {make} products found for "{localQuery}"
                                </p>
                            )}
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
}
