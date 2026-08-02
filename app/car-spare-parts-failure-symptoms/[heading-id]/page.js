// /app/car-spare-parts-failure-symptoms/[headlineId]/page.jsx

import { notFound } from "next/navigation";
import { products } from "../../../public/products.json";
import { buildArticleSchema } from "@/components/seo/buildArticleSchema";
import DiagnosisComponent from "../../../components/DiagnosisComponent";

export async function generateMetadata({ params }) {
    const id = Number(params.headlineId);
    const product = products.find((p) => p.id === id);
    if (!product?.article) notFound();

    const canonicalUrl = `https://www.emirates-car.com/car-spare-parts-failure-symptoms/${params.headlineId}`;
    const graph = buildArticleSchema({ product, canonicalUrl });

    const imageUrl = `https://www.emirates-car.com${product.image}`;

    return {
        title: product.article.headline,
        description: product.article.description,

        openGraph: {
            title: product.article.headline,
            description: product.article.description,
            url: canonicalUrl,
            siteName: "Emirates Car",
            images: [{ url: imageUrl, alt: product.article.headline }],
            locale: "en_US",
            type: "article",
        },

        twitter: {
            card: "summary_large_image",
            title: product.article.headline,
            description: product.article.description,
            images: [imageUrl],
        },

        alternates: {
            canonical: canonicalUrl,
        },

        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                noimageindex: false,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },

        other: {
            "script:ld+json": JSON.stringify(graph),
        },
    };
}

export default function Page({ params }) {
    const id = Number(params.headlineId);
    const product = products.find((p) => p.id === id);
    if (!product?.article) notFound();

    return <DiagnosisComponent product={product} />;
}