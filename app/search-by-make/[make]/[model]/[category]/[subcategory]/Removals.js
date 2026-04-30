'use client';

import { useState, useMemo } from 'react';
import CarData from '../../../../../../public/lib/car-data.json';
import partsData from '../../../../../../public/lib/filteredparts.json';
import productsFile from '../../../../../../public/products.json';

// ── Static data ───────────────────────────────────────────────────────────────

const EXCLUDED_MAKES = new Set([
    'Buick', 'Eagle', 'Lotus', 'Plymouth', 'Pontiac', 'Saab', 'Subaru',
    'Alfa Romeo', 'Geo', 'Oldsmobile', 'Isuzu', 'Saturn', 'Corbin', 'Holden',
    'Spyker', 'Spyker Cars', 'Aston Martin', 'Panoz', 'Foose', 'Morgan', 'Aptera',
    'Smart', 'SRT', 'Roush Performance', 'Pagani', 'Mobility Ventures LLC',
    'RUF Automobile', 'Koenigsegg', 'Karma', 'Polestar', 'STI', 'Kandi', 'Abarth',
    'Dorcen', 'Foton', 'W Motors', 'Opel', 'Skoda', 'Hillman', 'Austin', 'Fillmore',
    'Maybach', 'Merkur', 'Rambler', 'Shelby', 'Studebaker', 'Great Wall GWM',
    'Zeekr', 'ZNA', 'GAC', 'Gs7', 'Hongqi', 'W Motor', 'JAC', 'Jaecoo', 'Jetour',
    'TANK', 'Soueast', 'Zarooq Motors', 'Changan', 'Maxus', 'Haval', 'Zotye',
    'Sandstorm', 'Chery', 'Geely', 'BAIC', 'Bestune',
]);

const SELECTED_PARTS = new Set([
    'Battery', 'Engine Assembly', 'Gearbox', 'Radiator',
    'AC Compressor', 'Alternator', 'Suspension', 'Shock Absorber',
    'Headlight Assembly', 'Bumpers', 'Brake Disc', 'Turbocharger',
    'Steering Rack', 'Water Pump', 'Fuel Pump', 'Starter',
    'Taillight', 'Axle Assembly', 'Lower Control Arm', 'Upper Control Arm',
    'Catalytic Convertor', 'AC Condenser', 'Wheel', 'Mirrors', 'Steering Box',
]);

const CONDITION_LABELS = {
    1: { label: 'Not excluded · Part valid · SEO false', short: 'C1' },
    2: { label: 'Not excluded · Part invalid · SEO false', short: 'C2' },
    3: { label: 'Not excluded · Part invalid · SEO true', short: 'C3' },
    4: { label: 'Excluded · Part valid · SEO false', short: 'C4' },
    5: { label: 'Excluded · Part invalid · SEO false', short: 'C5' },
    6: { label: 'Excluded · Part invalid · SEO true', short: 'C6' },
    7: { label: 'Excluded · Part valid · SEO true', short: 'C7' },
};

const CONDITION_COLORS = {
    1: '#f59e0b', 2: '#ef4444', 3: '#f97316',
    4: '#8b5cf6', 5: '#6366f1', 6: '#ec4899', 7: '#14b8a6',
};

const BASE_URL = 'https://www.emirates-car.com';

// ── Core computation (runs once via useMemo) ──────────────────────────────────

function computeDeadUrls() {
    // Build seo map: "make|model" → boolean
    const seoMap = new Map();
    for (const car of CarData) {
        const make = car.make?.trim();
        const model = car.model?.trim();
        if (!make || !model) continue;
        const key = `${make}|${model}`;
        if (!seoMap.has(key)) seoMap.set(key, !!car.seo);
        else if (!seoMap.get(key) && car.seo) seoMap.set(key, true);
    }

    // Build product map: "make|model|category|subcategory" → count
    const productMap = new Map();
    for (const product of productsFile) {
        if (!product.compatibility) continue;
        for (const compat of product.compatibility) {
            const make = compat.make?.trim();
            const model = compat.model?.trim();
            if (!make || !model) continue;
            const key = `${make}|${model}|${product.category}|${product.subcategory}`;
            productMap.set(key, (productMap.get(key) ?? 0) + 1);
        }
    }

    // Build unique make+model pairs
    const makeModelMap = new Map();
    for (const car of CarData) {
        const make = car.make?.trim();
        const model = car.model?.trim();
        if (!make || !model) continue;
        const key = `${make}|${model}`;
        if (!makeModelMap.has(key)) makeModelMap.set(key, { make, model });
    }

    const rows = [];

    for (const [, { make, model }] of makeModelMap) {
        const makeExcluded = EXCLUDED_MAKES.has(make);
        const seoTrue = seoMap.get(`${make}|${model}`) ?? false;

        for (const part of partsData) {
            const subcategory = part.parts?.trim();
            const category = part.category?.trim();
            if (!subcategory || !category) continue;

            const subcatValid = SELECTED_PARTS.has(subcategory);
            const shouldRender = !makeExcluded && seoTrue && subcatValid;
            const hasProduct = (productMap.get(`${make}|${model}|${category}|${subcategory}`) ?? 0) > 0;
            const isDead = !shouldRender && !hasProduct;

            if (!isDead) continue;

            let condition;
            if (!makeExcluded && subcatValid && !seoTrue) condition = 1;
            else if (!makeExcluded && !subcatValid && !seoTrue) condition = 2;
            else if (!makeExcluded && !subcatValid && seoTrue) condition = 3;
            else if (makeExcluded && subcatValid && !seoTrue) condition = 4;
            else if (makeExcluded && !subcatValid && !seoTrue) condition = 5;
            else if (makeExcluded && !subcatValid && seoTrue) condition = 6;
            else if (makeExcluded && subcatValid && seoTrue) condition = 7;

            rows.push({
                url: `${BASE_URL}/search-by-make/${encodeURIComponent(make)}/${encodeURIComponent(model)}/${encodeURIComponent(category)}/${encodeURIComponent(subcategory)}`,
                make,
                model,
                category,
                subcategory,
                makeExcluded,
                subcatValid,
                seoTrue,
                hasProduct,
                condition,
                removalType: makeExcluded ? 'PREFIX' : 'EXACT',
            });
        }
    }

    return rows;
}

// ── CSV export helper ─────────────────────────────────────────────────────────

function downloadCSV(rows, filename = 'dead-urls.csv') {
    // Plain URL list — one per line, no headers, ready to paste into bulk removal extension
    const lines = rows.map(r => r.url);
    const blob = new Blob([lines.join('\n')], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
}

function downloadTXT(rows, filename = 'dead-urls-removal-list.txt') {
    const prefixes = new Set(
        rows.filter(r => r.removalType === 'PREFIX')
            .map(r => `${BASE_URL}/search-by-make/${encodeURIComponent(r.make)}/`)
    );
    const exacts = rows.filter(r => r.removalType === 'EXACT').map(r => r.url);
    const blob = new Blob([[...prefixes, ...exacts].join('\n')], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function DeadUrlsViewer() {
    const allRows = useMemo(() => computeDeadUrls(), []);

    const [search, setSearch] = useState('');
    const [filterCond, setFilterCond] = useState('all');
    const [filterRemoval, setFilterRemoval] = useState('all');
    const [page, setPage] = useState(1);
    const [sortCol, setSortCol] = useState('condition');
    const [sortAsc, setSortAsc] = useState(true);

    const PAGE_SIZE = 100;

    // Condition summary counts
    const conditionCounts = useMemo(() => {
        const counts = {};
        for (const r of allRows) counts[r.condition] = (counts[r.condition] ?? 0) + 1;
        return counts;
    }, [allRows]);

    const prefixCount = useMemo(() =>
        new Set(allRows.filter(r => r.removalType === 'PREFIX')
            .map(r => r.make)).size
        , [allRows]);

    // Filtered + sorted rows
    const filtered = useMemo(() => {
        let rows = allRows;

        if (search.trim()) {
            const q = search.toLowerCase();
            rows = rows.filter(r =>
                r.url.toLowerCase().includes(q) ||
                r.make.toLowerCase().includes(q) ||
                r.model.toLowerCase().includes(q) ||
                r.subcategory.toLowerCase().includes(q)
            );
        }

        if (filterCond !== 'all') {
            rows = rows.filter(r => String(r.condition) === filterCond);
        }

        if (filterRemoval !== 'all') {
            rows = rows.filter(r => r.removalType === filterRemoval);
        }

        const dir = sortAsc ? 1 : -1;
        rows = [...rows].sort((a, b) => {
            const av = a[sortCol] ?? '';
            const bv = b[sortCol] ?? '';
            return String(av).localeCompare(String(bv)) * dir;
        });

        return rows;
    }, [allRows, search, filterCond, filterRemoval, sortCol, sortAsc]);

    const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
    const pageRows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    function handleSort(col) {
        if (sortCol === col) setSortAsc(a => !a);
        else { setSortCol(col); setSortAsc(true); }
        setPage(1);
    }

    function SortIcon({ col }) {
        if (sortCol !== col) return <span style={{ opacity: 0.3 }}>↕</span>;
        return <span>{sortAsc ? '↑' : '↓'}</span>;
    }

    const badge = (val, color) => (
        <span style={{
            display: 'inline-block', padding: '1px 7px', borderRadius: 4,
            fontSize: 11, fontWeight: 600, background: color + '22', color,
        }}>{val}</span>
    );

    return (
        <div style={{ fontFamily: 'monospace', padding: 24, background: '#0f0f0f', minHeight: '100vh', color: '#e5e5e5' }}>

            {/* Header */}
            <div style={{ marginBottom: 24 }}>
                <h1 style={{ fontSize: 22, fontWeight: 700, color: '#fff', margin: 0 }}>
                    Dead URL Analyser
                </h1>
                <p style={{ color: '#666', marginTop: 4, fontSize: 13 }}>
                    Based on: <code style={{ color: '#a78bfa' }}>shouldRender = hasSEO &amp;&amp; isSelectedPart</code> — pages that return 404/notFound
                </p>
            </div>

            {/* Summary cards */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 24 }}>
                {[
                    { label: 'Total Dead URLs', value: allRows.length, color: '#ef4444' },
                    { label: 'PREFIX removals', value: prefixCount, color: '#f59e0b' },
                    { label: 'EXACT removals', value: allRows.filter(r => r.removalType === 'EXACT').length, color: '#6366f1' },
                    { label: 'Filtered', value: filtered.length, color: '#22d3ee' },
                ].map(card => (
                    <div key={card.label} style={{
                        background: '#1a1a1a', border: '1px solid #2a2a2a',
                        borderRadius: 8, padding: '12px 20px', minWidth: 140,
                    }}>
                        <div style={{ fontSize: 26, fontWeight: 700, color: card.color }}>{card.value.toLocaleString()}</div>
                        <div style={{ fontSize: 11, color: '#666', marginTop: 2 }}>{card.label}</div>
                    </div>
                ))}
            </div>

            {/* Condition breakdown */}
            <div style={{ marginBottom: 24, background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: 16 }}>
                <div style={{ fontSize: 12, color: '#666', marginBottom: 10, fontWeight: 600, letterSpacing: 1 }}>CONDITION BREAKDOWN</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {Object.entries(CONDITION_LABELS).map(([cond, { label }]) => (
                        <div key={cond} style={{
                            padding: '6px 12px', borderRadius: 6,
                            background: CONDITION_COLORS[cond] + '18',
                            border: `1px solid ${CONDITION_COLORS[cond]}44`,
                            cursor: 'pointer',
                            outline: filterCond === cond ? `2px solid ${CONDITION_COLORS[cond]}` : 'none',
                        }}
                            onClick={() => { setFilterCond(filterCond === cond ? 'all' : cond); setPage(1); }}
                        >
                            <span style={{ fontSize: 13, fontWeight: 700, color: CONDITION_COLORS[cond] }}>
                                C{cond} — {(conditionCounts[cond] ?? 0).toLocaleString()}
                            </span>
                            <div style={{ fontSize: 10, color: '#888', marginTop: 2 }}>{label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Controls */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16, alignItems: 'center' }}>
                <input
                    placeholder="Search make, model, URL, part..."
                    value={search}
                    onChange={e => { setSearch(e.target.value); setPage(1); }}
                    style={{
                        flex: 1, minWidth: 220, padding: '8px 12px',
                        background: '#1a1a1a', border: '1px solid #333',
                        borderRadius: 6, color: '#e5e5e5', fontSize: 13, fontFamily: 'monospace',
                    }}
                />

                <select
                    value={filterCond}
                    onChange={e => { setFilterCond(e.target.value); setPage(1); }}
                    style={{ padding: '8px 12px', background: '#1a1a1a', border: '1px solid #333', borderRadius: 6, color: '#e5e5e5', fontSize: 13 }}
                >
                    <option value="all">All conditions</option>
                    {Object.entries(CONDITION_LABELS).map(([c, { label }]) => (
                        <option key={c} value={c}>C{c} — {label}</option>
                    ))}
                </select>

                <select
                    value={filterRemoval}
                    onChange={e => { setFilterRemoval(e.target.value); setPage(1); }}
                    style={{ padding: '8px 12px', background: '#1a1a1a', border: '1px solid #333', borderRadius: 6, color: '#e5e5e5', fontSize: 13 }}
                >
                    <option value="all">All removal types</option>
                    <option value="PREFIX">PREFIX only</option>
                    <option value="EXACT">EXACT only</option>
                </select>

                <button
                    onClick={() => downloadCSV(filtered)}
                    style={{
                        padding: '8px 16px', background: '#166534', border: 'none',
                        borderRadius: 6, color: '#86efac', fontSize: 13, cursor: 'pointer', fontFamily: 'monospace',
                    }}
                >
                    ↓ CSV ({filtered.length.toLocaleString()})
                </button>

                <button
                    onClick={() => downloadTXT(filtered)}
                    style={{
                        padding: '8px 16px', background: '#1e3a5f', border: 'none',
                        borderRadius: 6, color: '#93c5fd', fontSize: 13, cursor: 'pointer', fontFamily: 'monospace',
                    }}
                >
                    ↓ Removal List
                </button>
            </div>

            {/* Table */}
            <div style={{ overflowX: 'auto', borderRadius: 8, border: '1px solid #2a2a2a' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                    <thead>
                        <tr style={{ background: '#1a1a1a', borderBottom: '1px solid #2a2a2a' }}>
                            {[
                                { col: 'make', label: 'Make' },
                                { col: 'model', label: 'Model' },
                                { col: 'category', label: 'Category' },
                                { col: 'subcategory', label: 'Subcategory' },
                                { col: 'condition', label: 'Cond' },
                                { col: 'makeExcluded', label: 'Excluded' },
                                { col: 'subcatValid', label: 'Part Valid' },
                                { col: 'seoTrue', label: 'SEO' },
                                { col: 'removalType', label: 'Removal' },
                            ].map(({ col, label }) => (
                                <th
                                    key={col}
                                    onClick={() => handleSort(col)}
                                    style={{
                                        padding: '10px 12px', textAlign: 'left',
                                        color: '#888', fontWeight: 600, letterSpacing: 0.5,
                                        cursor: 'pointer', userSelect: 'none', whiteSpace: 'nowrap',
                                    }}
                                >
                                    {label} <SortIcon col={col} />
                                </th>
                            ))}
                            <th style={{ padding: '10px 12px', color: '#888', fontWeight: 600 }}>URL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pageRows.map((row, i) => (
                            <tr
                                key={i}
                                style={{
                                    borderBottom: '1px solid #1e1e1e',
                                    background: i % 2 === 0 ? 'transparent' : '#141414',
                                }}
                            >
                                <td style={{ padding: '8px 12px', color: '#e5e5e5' }}>{row.make}</td>
                                <td style={{ padding: '8px 12px', color: '#e5e5e5' }}>{row.model}</td>
                                <td style={{ padding: '8px 12px', color: '#999' }}>{row.category}</td>
                                <td style={{ padding: '8px 12px', color: '#ccc' }}>{row.subcategory}</td>
                                <td style={{ padding: '8px 12px' }}>
                                    {badge(`C${row.condition}`, CONDITION_COLORS[row.condition] ?? '#888')}
                                </td>
                                <td style={{ padding: '8px 12px' }}>
                                    {row.makeExcluded ? badge('Yes', '#ef4444') : badge('No', '#22c55e')}
                                </td>
                                <td style={{ padding: '8px 12px' }}>
                                    {row.subcatValid ? badge('Yes', '#22c55e') : badge('No', '#ef4444')}
                                </td>
                                <td style={{ padding: '8px 12px' }}>
                                    {row.seoTrue ? badge('Yes', '#22c55e') : badge('No', '#ef4444')}
                                </td>
                                <td style={{ padding: '8px 12px' }}>
                                    {row.removalType === 'PREFIX'
                                        ? badge('PREFIX', '#f59e0b')
                                        : badge('EXACT', '#6366f1')}
                                </td>
                                <td style={{ padding: '8px 12px', maxWidth: 320 }}>
                                    <a
                                        href={row.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            color: '#60a5fa', textDecoration: 'none', fontSize: 11,
                                            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                                            display: 'block', maxWidth: 320,
                                        }}
                                    >
                                        {row.url}
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 16, fontSize: 13, color: '#666' }}>
                <button
                    disabled={page === 1}
                    onClick={() => setPage(p => p - 1)}
                    style={{
                        padding: '6px 14px', background: '#1a1a1a', border: '1px solid #333',
                        borderRadius: 6, color: page === 1 ? '#444' : '#e5e5e5',
                        cursor: page === 1 ? 'default' : 'pointer', fontFamily: 'monospace',
                    }}
                >← Prev</button>

                <span>
                    Page <strong style={{ color: '#e5e5e5' }}>{page}</strong> of <strong style={{ color: '#e5e5e5' }}>{totalPages}</strong>
                    {' '}— showing rows {((page - 1) * PAGE_SIZE + 1).toLocaleString()}–{Math.min(page * PAGE_SIZE, filtered.length).toLocaleString()} of {filtered.length.toLocaleString()}
                </span>

                <button
                    disabled={page === totalPages}
                    onClick={() => setPage(p => p + 1)}
                    style={{
                        padding: '6px 14px', background: '#1a1a1a', border: '1px solid #333',
                        borderRadius: 6, color: page === totalPages ? '#444' : '#e5e5e5',
                        cursor: page === totalPages ? 'default' : 'pointer', fontFamily: 'monospace',
                    }}
                >Next →</button>
            </div>
        </div>
    );
}