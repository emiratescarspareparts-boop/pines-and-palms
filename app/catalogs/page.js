import ProductFilter from "./ProductFilter";
import products from "../../public/products.json";

export const revalidate = 1814400;
export const dynamic = 'force-static'
export const dynamicParams = false;


export default function CatalogPage({ searchParams }) {
    const {
        "filter_car_parts[]": categories = [],
        "engine[]": engines = [],
        "compatibility[]": compats = [],
        search = "",
    } = searchParams;

    // Ensure arrays
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

    const allProducts = products;
    const filtered = [];

    for (let i = 0; i < allProducts.length; i++) {
        const product = allProducts[i];

        // matchesCategory
        let matchesCategory =
            selectedCategories.length === 0 ||
            selectedCategories.includes(product.category);

        // matchesSearch
        let matchesSearch = false;
        if (!query) {
            matchesSearch = true;
        } else {
            if (
                product.partname?.toLowerCase().includes(query) ||
                (product.partnumber &&
                    product.partnumber.toString().toLowerCase().includes(query))
            ) {
                matchesSearch = true;
            } else if (product.engine) {
                for (let j = 0; j < product.engine.length; j++) {
                    if (product.engine[j].toLowerCase().includes(query)) {
                        matchesSearch = true;
                        break;
                    }
                }
            }

            if (!matchesSearch && product.compatibility) {
                for (let j = 0; j < product.compatibility.length; j++) {
                    const c = product.compatibility[j];
                    const compatString = `${c.make} ${c.model} ${c.years ?? ""}`.toLowerCase();
                    if (compatString.includes(query)) {
                        matchesSearch = true;
                        break;
                    }
                }
            }
        }

        // matchesEngine
        let matchesEngine = false;
        if (selectedEngines.length === 0) {
            matchesEngine = true;
        } else if (product.engine) {
            for (let j = 0; j < product.engine.length; j++) {
                if (selectedEngines.includes(product.engine[j])) {
                    matchesEngine = true;
                    break;
                }
            }
        }

        // matchesCompatibility
        let matchesCompatibility = false;
        if (selectedCompats.length === 0) {
            matchesCompatibility = true;
        } else if (product.compatibility) {
            for (let j = 0; j < product.compatibility.length; j++) {
                const c = product.compatibility[j];
                const compatString = `${c.make} ${c.model} ${c.years ? `(${c.years})` : ""}`;
                if (selectedCompats.includes(compatString)) {
                    matchesCompatibility = true;
                    break;
                }
            }
        }

        if (
            matchesCategory &&
            matchesSearch &&
            matchesEngine &&
            matchesCompatibility
        ) {
            filtered.push(product);
        }
    }

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