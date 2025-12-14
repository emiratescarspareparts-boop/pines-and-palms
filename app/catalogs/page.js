import ProductFilter from "./ProductFilter";
import products from "../../public/products.json";
export const revalidate = 1814400;
export const runtime = 'edge';
export const fetchCache = 'force-cache';
export const dynamicParams = false;
export const dynamic = 'force-static';

export default function CatalogPage({ searchParams }) {
    const {
        "filter_car_parts[]": categories = [],
        "engine[]": engines = [],
        "compatibility[]": compats = [],
        search = "",
    } = searchParams;

    const selectedCategories = Array.isArray(categories)
        ? categories
        : [categories].filter(Boolean);

    const selectedEngines = Array.isArray(engines)
        ? engines
        : [engines].filter(Boolean);

    const selectedCompats = Array.isArray(compats)
        ? compats
        : [compats].filter(Boolean);

    const query = search?.toLowerCase() || "";

    // No make/model filtering here — ALL products
    const allProducts = products;

    const filtered = allProducts.filter(product => {
        const matchesCategory =
            selectedCategories.length === 0 ||
            selectedCategories.includes(product.category);

        const matchesSearch =
            product.partname.toLowerCase().includes(query) ||
            product.partnumber.toLowerCase().includes(query) ||
            product.engine?.some(e => e.toLowerCase().includes(query)) ||
            product.compatibility?.some(c =>
                `${c.make} ${c.model} ${c.years ?? ""}`
                    .toLowerCase()
                    .includes(query)
            );

        const matchesEngine =
            selectedEngines.length === 0 ||
            product.engine?.some(e => selectedEngines.includes(e));

        const matchesCompatibility =
            selectedCompats.length === 0 ||
            product.compatibility?.some(c =>
                selectedCompats.includes(
                    `${c.make} ${c.model} ${c.years ? `(${c.years})` : ""}`
                )
            );

        return (
            matchesCategory &&
            matchesSearch &&
            matchesEngine &&
            matchesCompatibility
        );
    });

    return (
        <section className="mt-6">
            <ProductFilter
                products={filtered}
                allProducts={allProducts}
                searchParams={searchParams}
            />
        </section>
    );
}