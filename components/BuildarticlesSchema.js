export function buildArticleSchema({ product, canonicalUrl }) {
    const article = product?.article;
    if (!article) return null;

    const comp = product.compatibility?.[0] || { make: "Universal", model: "Part", years: "" };
    const rangeStr = comp.years ? ` (${comp.years})` : "";
    const imageUrl = `https://www.emirates-car.com${product.image}`;
    const today = new Date().toISOString().split("T")[0];


    const symptomSections = article.sections.filter((s) => s.type === "symptom");
    const introSection = article.sections.find((s) => s.type === "intro");
    const closingSection = article.sections.find((s) => s.type === "closing");

    const articleBodyParts = [
        introSection?.paragraph,
        ...symptomSections.map((s, i) => `${i + 1}. ${s.heading}: ${s.paragraph}`),
        article.replacement_guidance?.paragraph,
        closingSection?.paragraph,
    ].filter(Boolean);

    const articleSchema = {
        "@type": "Article",
        "@id": `${canonicalUrl}#article`,
        "headline": article.headline,
        "description": article.description,
        "image": imageUrl,
        "datePublished": article.datePublished || today,
        "dateModified": today,
        "mainEntityOfPage": canonicalUrl,
        "author": {
            "@type": "Organization",
            "name": "Emirates Car",
            "url": "https://www.emirates-car.com",
        },
        "publisher": {
            "@type": "Organization",
            "name": "Emirates Car",
            "logo": {
                "@type": "ImageObject",
                "url": "https://www.emirates-car.com/images/logo.png",
            },
        },
        "articleBody": articleBodyParts.join(" "),
        // ── "about" snippet, exactly the shape you asked for ──
        "about": [
            {
                "@type": "Product",
                "name": `${comp.make} ${comp.model} ${product.partname}${rangeStr}`,
                "mpn": product.partnumber,
                "image": imageUrl,
                "url": `https://www.emirates-car.com${product.canonicalProductUrl || ""}`,
            },
        ],
    };

    // ── FAQ schema, generated from the same article content ──
    const symptomList = symptomSections.map((s) => s.heading.toLowerCase()).join("; ");

    const faqSchema = {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        "mainEntity": [
            {
                "@type": "Question",
                "name": `What are the symptoms of a bad ${comp.make} ${comp.model} ${product.partname}?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `Common warning signs include: ${symptomList}. If you notice any of these, have the ${product.partname} inspected before it fails completely.`,
                },
            },
            article.replacement_guidance && {
                "@type": "Question",
                "name": `How many years does a ${product.partname} last on a ${comp.make} ${comp.model}?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": article.replacement_guidance.paragraph,
                },
            },
            {
                "@type": "Question",
                "name": `Is it safe to keep driving with these symptoms?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `Driving with a failing ${product.partname} risks a sudden loss of steering control. It's best to book an inspection as soon as symptoms appear rather than wait for full failure.`,
                },
            },
            {
                "@type": "Question",
                "name": `Where can I buy a genuine replacement in the UAE?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": closingSection?.paragraph ||
                        `Emirates Car supplies genuine ${comp.make} ${product.partname} parts with fast delivery across the UAE.`,
                },
            },
        ].filter(Boolean),
    };

    const breadcrumbSchema = {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.emirates-car.com" },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Failure Symptoms",
                "item": "https://www.emirates-car.com/car-spare-parts-failure-symptoms",
            },
            { "@type": "ListItem", "position": 3, "name": article.headline, "item": canonicalUrl },
        ],
    };

    return {
        "@context": "https://schema.org",
        "@graph": [articleSchema, faqSchema, breadcrumbSchema],
    };
}