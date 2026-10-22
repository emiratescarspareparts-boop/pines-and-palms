'use client';

import { Fira_Sans, Poppins } from 'next/font/google';
import Link from 'next/link';

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

const SECTIONS = [
    { id: 'compatibility', label: 'Compatibility' },
    { id: 'item-specifics', label: 'Item Specifics' },
    { id: 'policies', label: 'Policies' },
];

const DELIVERY_AREAS =
    'Delivery Available to All Emirates - Dubai, Sharjah, Ajman, Abu Dhabi, Al Ain, Fujairah, Umm Al Quwain, Ras Al Khaimah';

const joinIfArray = (v) => (Array.isArray(v) ? v.join(', ') : v);

const th = 'border border-gray-300 bg-gray-100 px-3 py-2 text-left font-semibold';
const td = 'border border-gray-300 px-3 py-2 text-gray-700 align-top';

export default function ProductTabs({ product, slug }) {
    // Smooth-scroll to a section (href="#id" remains as a no-JS / crawler fallback)
    const scrollToSection = (e, id) => {
        const el = document.getElementById(id);
        if (!el) return;
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.replaceState(null, '', `#${id}`);
    };

    // Item specifics -> flat [label, value] rows (empty values skipped)
    const specs = product?.item_specifics || {};
    const specRows = [
        ['SKU', specs.sku],
        ['Brand', specs.Brand],
        ['Manufacturer Part Number', specs['Manufacturer Part Number']],
        ['Placement on Vehicle', joinIfArray(specs['Placement on Vehicle'])],
        ['OEM or Aftermarket', joinIfArray(specs['OEM or Aftermarket'])],
        ['Interchange Part Number', joinIfArray(specs['Interchange Part Number'])],
        ['Condition', specs.Condition],
        ['Warranty', specs.Warranty],
        ['Country/Region of Manufacture', specs['Country/Region of Manufacture']],
    ].filter(([, value]) => value !== undefined && value !== null && String(value).trim() !== '');

    const policyRows = [
        ['Shipping', product?.policies?.shipping],
        ['Delivery', DELIVERY_AREAS],
        ['Returns', product?.policies?.returns],
        ['Payment Methods', joinIfArray(product?.policies?.payment_methods)],
    ].filter(([, value]) => value);

    return (
        <div className="mt-10">
            {/* Jump links (sticky so they stay reachable while scrolling) */}
            <nav
                aria-label="Product details sections"
                className={`sticky top-0 z-10 flex border-b mb-6 space-x-2 overflow-x-auto scrollbar-hide bg-white ${poppins.className}`}
            >
                {SECTIONS.map((s) => (
                    <a
                        key={s.id}
                        href={`#${s.id}`}
                        onClick={(e) => scrollToSection(e, s.id)}
                        className="px-4 xs:px-1 xxs:px-2 s:px-2 py-2 rounded-t-lg whitespace-nowrap font-semibold bg-gray-200 hover:bg-blue-600 hover:text-white"
                    >
                        {s.label}
                    </a>
                ))}
            </nav>

            {/* scroll-mt leaves room for the sticky nav when jumping to a section */}

            {/* Compatibility */}
            <section id="compatibility" className="scroll-mt-16 mb-10">
                <h2 className="text-xl font-semibold mb-2">Compatibility</h2>
                <div className="overflow-x-auto">
                    <table className={`w-full border-collapse text-sm ${firaSans.className}`}>
                        <caption className="sr-only">
                            Vehicles compatible with {product?.partname} {product?.partnumber}
                        </caption>
                        <thead>
                            <tr>
                                <th scope="col" className={th}>Make</th>
                                <th scope="col" className={th}>Model</th>
                                <th scope="col" className={th}>Year(s)</th>
                                <th scope="col" className={th}>Engine</th>
                                <th scope="col" className={th}>Link</th>
                            </tr>
                        </thead>
                        <tbody>
                            {product?.compatibility?.map((comp, index) => {
                                const compatMake = encodeURIComponent(comp.make);
                                const compatModel = encodeURIComponent(comp.model);
                                const partSlug = `${product.partname}-${comp.make}-${comp.model}-${comp.years}-${product.partnumber}-${product.id}`;
                                const href = `https://www.emirates-car.com/search-by-make/${compatMake}/${compatModel}/${encodeURIComponent(
                                    product.category
                                )}/${encodeURIComponent(product.subcategory)}/${encodeURIComponent(partSlug)}`;

                                return (
                                    <tr key={index}>
                                        <td className={td}>{comp.make}</td>
                                        <td className={td}>{comp.model}</td>
                                        <td className={td}>{comp.years}</td>
                                        <td className={td}>{comp.engine}</td>
                                        <td className={td}>
                                            <Link className="text-blue-700 hover:underline" href={href} target="_blank">
                                                {comp.make} {comp.model} {comp.years} {comp.engine}
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Item Specifics */}
            <section id="item-specifics" className="scroll-mt-16 mb-10">
                <h2 className="text-xl font-semibold mb-2">Item Specifics</h2>
                <div className="overflow-x-auto">
                    <table className={`w-full border-collapse text-sm ${firaSans.className}`}>
                        <caption className="sr-only">Item specifics</caption>
                        <thead>
                            <tr>
                                <th scope="col" className={th}>Attribute</th>
                                <th scope="col" className={th}>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {specRows.map(([label, value]) => (
                                <tr key={label}>
                                    <th scope="row" className={`${td} font-semibold text-left text-black`}>{label}</th>
                                    <td className={td}>{value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Policies */}
            <section id="policies" className="scroll-mt-16">
                <h2 className="text-xl font-semibold mb-2">Shipping &amp; Delivery</h2>
                <div className="overflow-x-auto">
                    <table className={`w-full border-collapse text-sm ${firaSans.className}`}>
                        <caption className="sr-only">Shipping, delivery, returns and payment policies</caption>
                        <thead>
                            <tr>
                                <th scope="col" className={th}>Policy</th>
                                <th scope="col" className={th}>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {policyRows.map(([label, value]) => (
                                <tr key={label}>
                                    <th scope="row" className={`${td} font-semibold text-left text-black`}>{label}</th>
                                    <td className={td}>{value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}