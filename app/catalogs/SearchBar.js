"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function SearchBar({ allProducts, searchParams = {} }) {
    const router = useRouter();
    const [localQuery, setLocalQuery] = useState(searchParams?.search || "");
    const [suggestions, setSuggestions] = useState([]);

    // Search bar logic
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
        const matches = [];

        for (let i = 0; i < allProducts.length; i++) {
            const p = allProducts[i];
            let match = false;

            if (p.partname?.toLowerCase().includes(q)) {
                match = true;
            } else if (p.partnumber?.toLowerCase().includes(q)) {
                match = true;
            } else if (p.engine) {
                for (let j = 0; j < p.engine.length; j++) {
                    if (p.engine[j].toLowerCase().includes(q)) {
                        match = true;
                        break;
                    }
                }
            } else if (p.compatibility) {
                for (let j = 0; j < p.compatibility.length; j++) {
                    const c = p.compatibility[j];
                    const str = `${c.make} ${c.model} ${c.years ?? ""}`.toLowerCase();
                    if (str.includes(q)) {
                        match = true;
                        break;
                    }
                }
            }

            if (match) {
                matches.push(p);
                if (matches.length === 6) break;
            }
        }

        setSuggestions(matches);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            updateURLAndFilter(localQuery);
        }
    };

    return (
        <section id="filter" className="sticky top-0 bg-white z-50 py-4 shadow-sm">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center relative w-full max-w-3xl mx-auto">
                    {/* Search Input */}
                    <input
                        type="text"
                        placeholder="Search products by name, number, engine, compatibility..."
                        value={localQuery}
                        onChange={handleSearchChange}
                        onKeyDown={handleKeyDown}
                        className="w-full px-4 py-2 border border-gray-300 rounded-full shadow-sm text-sm"
                    />

                    {/* Suggestions Dropdown */}
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
    );
}