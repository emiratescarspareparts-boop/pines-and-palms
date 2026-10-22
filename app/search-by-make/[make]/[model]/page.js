import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Poppins, Roboto } from "next/font/google";
import HondaOfferButton from "../../../../components/HondaOfferButton";
import products from "../../../../public/products.json";
import SearchModel from "../../../../components/SearchModel";
import CarData from "../../../../public/lib/car-data.json";
import PartsData from "../../../../public/lib/parts.json";
import Product from "./Product";
import TenEntries from "../../../../components/tenentries";
import FormMakeModelRender from "../../../../components/FormMakeModelRender";

export const dynamic = "force-static";
export const fetchCache = "force-cache";
export const dynamicParams = true;
export const revalidate = 86400;

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["600"],
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-roboto",
});

/* ───────────────────────── data & constants ───────────────────────── */

const SITE = "https://www.emirates-car.com";

const selectedParts = [
  // Tier 1
  "Battery", "Engine Assembly", "Gearbox", "Radiator",
  "AC Compressor", "Alternator", "Suspension", "Shock Absorber",
  "Headlight Assembly", "Bumpers", "Brake Disc", "Turbocharger",
  // Tier 2
  "Steering Rack", "Water Pump", "Fuel Pump", "Starter",
  "Taillight", "Axle Assembly", "Lower Control Arm", "Upper Control Arm",
  "Catalytic Convertor", "AC Condenser", "Wheel", "Mirrors",
];

const excludedMakes = [
  "Buick", "Eagle", "Lotus", "Plymouth", "Pontiac", "Saab",
  "Geo", "Oldsmobile", "Isuzu", "Saturn", "Corbin", "Holden",
  "Spyker", "Spyker Cars", "Aston Martin", "Panoz", "Foose", "Morgan", "Aptera",
  "Smart", "SRT", "Roush Performance", "Pagani", "Mobility Ventures LLC",
  "RUF Automobile", "Koenigsegg", "Karma", "Polestar", "STI", "Kandi", "Abarth",
  "Dorcen", "Foton", "W Motors", "Opel", "Skoda", "Hillman", "Austin", "Fillmore",
  "Maybach", "Merkur", "Rambler", "Shelby", "Studebaker", "Great Wall GWM", "Zeekr",
  "ZNA", "GAC", "Gs7", "Hongqi", "W Motor", "JAC", "Jaecoo", "Jetour", "TANK",
  "Soueast", "Zarooq Motors", "Changan", "Maxus", "Haval", "Zotye", "Sandstorm",
  "Chery", "Geely", "BAIC", "Bestune", "Fairthorpe",
];
const excludedMakesSet = new Set(excludedMakes);

const GSC_TRAFFIC_MODELS = new Set([
  "Toyota|Yaris", "Nissan|Kicks", "Mitsubishi|Pajero", "Honda|Civic", "Toyota|Prado",
  "Honda|CR-V", "Nissan|Patrol", "Nissan|Rogue", "Nissan|Altima", "Toyota|RAV4",
  "Hyundai|Santa Fe", "Hyundai|Sonata Hybrid", "JAC|J7", "Nissan|Versa", "Nissan|JUKE",
  "Mitsubishi|Montero Sport", "Lexus|ES 350", "Kia|Sportage", "Hummer|H3", "Toyota|Corolla",
  "Nissan|350Z", "Jetour|T2", "Mazda|CX-9", "Audi|e-tron", "Hyundai|Sonata", "Honda|Fit",
  "Nissan|Tiida", "Nissan|Maxima", "Chevrolet|Malibu", "Nissan|Xterra 4WD", "Toyota|Supra",
  "Toyota|Sienna", "BYD|Leopard Titanium 7", "Volkswagen|ID.4 1st", "Chevrolet|TrailBlazer",
  "TANK|500", "Lexus|LX 570", "Nissan|Quest", "Lexus|RX", "GMC|Acadia", "Lexus|GX 460",
  "Hyundai|Elantra", "Nissan|370Z", "Honda|Accord", "Toyota|Prius", "BAIC|BJ40", "JAC|S3",
  "JAC|JS4", "Chevrolet|Cruze", "Maxus|V80", "Toyota|Land Cruiser", "Lexus|IS",
  "Suzuki|Grand Vitara", "Toyota|C-HR", "Lexus|IS 300", "Kia|Rio", "Lexus|IS 200t",
  "Mitsubishi|Outlander", "Toyota|Tundra", "Exeed|RX", "JAC|J4", "BYD|Leopard",
  "Toyota|Previa", "Audi|Q7", "Toyota|Highlander", "ZNA|Rich", "Exeed|TXL",
  "Toyota|Yaris iA", "Chevrolet|Tahoe", "Toyota|86", "Honda|Insight", "Lexus|LS 460",
  "Toyota|Sequoia", "Chevrolet|Lumina", "Honda|HR-V 2WD", "Nissan|X-trail", "Lexus|ES 300h",
  "Lexus|RX 450h", "Kia|K5", "Mitsubishi|Lancer Evolution", "Ford|Fusion", "Mazda|Mazda3",
  "Chevrolet|Captiva AWD", "Volvo|XC60", "Hyundai|Veracruz", "Kia|Sedona", "Mitsubishi|Lancer",
  "Lexus|LS 460 L", "Mitsubishi|Galant", "Toyota|4Runner", "Infiniti|Q50", "Volkswagen|R32",
  "Mitsubishi|Eclipse Cross 4WD", "GAC|EMPOW", "Audi|Q5", "Toyota|Camry Hybrid",
  "Mitsubishi|Montero", "Sandstorm|S24", "Nissan|Pathfinder 4WD", "Kia|Sorento", "Hyundai|Veloster",
]);

// Built once at module load (build time)
const carDataByMakeModel = {};
const carDataByMake = {};
for (const car of CarData) {
  const keyMM = `${car.make.toLowerCase()}-${car.model.toLowerCase()}`;
  (carDataByMakeModel[keyMM] ||= []).push(car);
  (carDataByMake[car.make.toLowerCase()] ||= []).push(car);
}

const CITIES = ["Abu Dhabi", "Ajman", "Dubai", "Al Ain", "Sharjah", "Ras al Khaimah", "Fujairah"];
const AREAS = ["Dubai", "Sharjah", "Abu Dhabi", "Ajman", "Al Quoz", "Palm Jumeirah", "Deira"];
const COUNTRIES = ["Japanese", "American", "German", "Chinese", "Korean", "French", "British"];

// [label, part-name slug]
const PART_GROUPS = [
  {
    title: "Engine parts",
    parts: [
      ["Engine Assembly"], ["Engine Block"], ["Engine Mount"], ["Cylinder Head"], ["Cylinder Block"],
      ["Crankshaft"], ["Camshaft"], ["Piston"], ["Exhaust Manifold"], ["Intake Manifold"],
      ["Ignition Switch"], ["Ignition Control Module"], ["TCM", "Transmission Control Module"],
    ],
  },
  {
    title: "Mechanical parts",
    parts: [
      ["Engine", "Engine Assembly"], ["Battery"], ["Alternator"], ["Brake Pads"], ["Radiator"],
      ["Transmission", "Transmission Control Module"], ["Shock Absorber"],
      ["Catalytic Converter", "Catalytic Convertor"], ["Power Steering", "Power Steering Box"],
    ],
  },
  {
    title: "Body parts",
    parts: [["Bonnet"], ["Fender", "Fender (Front)"], ["Decklid"], ["Grille"], ["Wheel"]],
  },
  {
    title: "Electrical parts",
    parts: [["Spark Plug"], ["Alternator"], ["Battery"], ["Ignition Switch"]],
  },
  {
    title: "AC parts",
    parts: [["AC Compressor"], ["AC Condenser"], ["AC Selector"], ["AC Controls"]],
  },
];

/* ───────────────────────── helpers ───────────────────────── */

const safeDecode = (s = "") => {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
};
const enc = (s) => encodeURIComponent(safeDecode(s));
const norm = (s) => (s || "").toString().trim().toLowerCase();
const toArray = (v) => (Array.isArray(v) ? v : v ? [v] : []);

function getCarField(make, model, field) {
  const cars = carDataByMakeModel[`${norm(make)}-${norm(model)}`];
  if (!cars?.length) return "";
  for (const car of cars) if (car[field]) return car[field];
  return "";
}

function getModels(make) {
  const cars = carDataByMake[norm(make)];
  if (!cars?.length) return [];
  const unique = {};
  for (const car of cars) if (!unique[car.model]) unique[car.model] = car;
  return Object.values(unique);
}

function productUrl(product, compat, make, model) {
  const slugRaw = `${product.partname}-${compat.make || make}-${compat.model || model}${compat.years ? `-${compat.years}` : ""}-${product.partnumber}-${product.id}`;
  return `/search-by-make/${encodeURIComponent(make)}/${encodeURIComponent(model)}/${encodeURIComponent(product.category)}/${encodeURIComponent(product.subcategory)}/${encodeURIComponent(slugRaw)}`;
}

function buildSchema(make, model, items, imageMake) {
  const pageUrl = `${SITE}/search-by-make/${encodeURIComponent(make)}/${encodeURIComponent(model)}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#page`,
        name: `${make} ${model} Spare Parts | Emirates Car`,
        url: pageUrl,
        description: `Browse genuine, OEM and aftermarket spare parts for the ${make} ${model} — engine, suspension, AC, brakes, electrical and body parts with delivery across UAE.`,
        ...(imageMake && { primaryImageOfPage: `${SITE}/img/car-logos/${imageMake}` }),
        isPartOf: { "@id": `${SITE}/#organization` },
        ...(items.length > 0 && { mainEntity: { "@id": `${pageUrl}#list` } }),
      },
      ...(items.length > 0
        ? [
          {
            "@type": "ItemList",
            "@id": `${pageUrl}#list`,
            itemListElement: items.map((it, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `${SITE}${it.href}`,
              name: it.name,
            })),
          },
        ]
        : []),
      {
        "@type": "Organization",
        "@id": `${SITE}/#organization`,
        name: "Emirates Car",
        url: SITE,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: "Car Makes", item: `${SITE}/search-by-make/` },
          { "@type": "ListItem", position: 3, name: `${make} Spare Parts`, item: `${SITE}/search-by-make/${encodeURIComponent(make)}` },
          { "@type": "ListItem", position: 4, name: `${make} ${model} Spare Parts`, item: pageUrl },
        ],
      },
    ],
  };
}

/* ───────────────────────── static params + metadata ───────────────────────── */

export async function generateStaticParams() {
  const params = [];
  for (const car of CarData.filter((c) => c.seo === true)) {
    if (!car.make || !car.model) continue;
    if (GSC_TRAFFIC_MODELS.has(`${car.make}|${car.model}`)) {
      params.push({
        make: encodeURIComponent(car.make.replace(/ /g, "%20")),
        model: encodeURIComponent(car.model.replace(/ /g, "%20")),
      });
    }
  }
  return Array.from(new Map(params.map((p) => [`${p.make}|${p.model}`, p])).values());
}

export function generateMetadata({ params }) {
  const make = safeDecode(params.make);
  const model = safeDecode(params.model);
  const imageMake = getCarField(make, model, "img");

  const title = `${make} ${model} Spare Parts in UAE | OEM & Aftermarket`;
  const description = `Genuine and aftermarket ${make} ${model} spare parts available in UAE. Fast delivery to Dubai, Abu Dhabi and Sharjah. Suspension, AC, engine, brakes and more. Inquire now for price and availability.`;
  const canonical = `${SITE}/search-by-make/${encodeURIComponent(make)}/${encodeURIComponent(model)}`;
  const ogImages = [
    ...(imageMake ? [{ url: `${SITE}/img/car-logos/${imageMake}`, alt: `${make} ${model} spare parts` }] : []),
    { url: `${SITE}/icons/icon-512x512.png`, width: 512, height: 512, alt: "car parts" },
  ];

  return {
    title,
    description,
    openGraph: { title, description, url: canonical, siteName: "EMIRATESCAR", images: ogImages, locale: "en_US", type: "website" },
    twitter: { card: "summary_large_image", title, description, images: [ogImages[0].url] },
    icons: {
      icon: `${SITE}/icons/favicon-32x32.png`,
      shortcut: `${SITE}/icons/icon-96x96.png`,
      apple: `${SITE}/icons/icon-192x192.png`,
      other: { rel: "apple-touch-icon-precomposed", url: `${SITE}/icons/icon-152x152.png` },
    },
    category: `Vehicle Parts & Accessories > ${make} > ${model}`,
    alternates: { canonical },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    other: {
      "product:brand": make,
      "product:model": model,
      "product:category": `Vehicle Parts & Accessories > ${make} > ${model}`,
      // JSON-LD is rendered as a real <script> in the page body (metadata.other only makes <meta> tags)
    },
  };
}

/* ───────────────────────── page ───────────────────────── */

export default function Model({ params, searchParams = {} }) {
  const make = safeDecode(params.make);
  const model = safeDecode(params.model);

  // Bail out early, before any heavy work
  if (excludedMakesSet.has(make)) notFound();
  const carRows = carDataByMakeModel[`${norm(make)}-${norm(model)}`];
  if (!carRows?.length) notFound();

  const imageMake = getCarField(make, model, "img");
  const description = getCarField(make, model, "description");
  const models = getModels(make);
  const hasSEO = carRows.some((car) => car.seo === true);

  const makeLower = norm(make);
  const modelLower = norm(model);
  const matchesMM = (c) => norm(c.make) === makeLower && norm(c.model) === modelLower;

  const makeModelFiltered = products.filter((p) => p.compatibility?.some(matchesMM));

  // Query-string filters (unchanged behaviour)
  const cats = new Set(toArray(searchParams["filter_car_parts[]"]));
  const engs = new Set(toArray(searchParams["engine[]"]));
  const compats = new Set(toArray(searchParams["compatibility[]"]));
  const query = (searchParams.search || "").toString().toLowerCase();

  const filtered = makeModelFiltered.filter((product) => {
    if (cats.size && !cats.has(product.category)) return false;
    if (query) {
      const hit =
        product.partname?.toLowerCase().includes(query) ||
        product.engine?.some((e) => e.toLowerCase().includes(query)) ||
        product.compatibility?.some((c) => `${c.make} ${c.model} ${c.years ?? ""}`.toLowerCase().includes(query));
      if (!hit) return false;
    }
    if (engs.size && !product.engine?.some((e) => engs.has(e))) return false;
    if (
      compats.size &&
      !product.compatibility?.some((c) => compats.has(`${c.make} ${c.model} ${c.years ? `(${c.years})` : ""}`))
    )
      return false;
    return true;
  });

  // JSON-LD list: first 50 matching products (URL + name only, no fabricated ratings)
  const schemaItems = makeModelFiltered.slice(0, 50).map((p) => {
    const compat = p.compatibility.find(matchesMM);
    return {
      name: `${make} ${model} ${p.partname} ${p.partnumber}`,
      href: productUrl(p, compat, make, model),
    };
  });
  const jsonLd = buildSchema(make, model, schemaItems, imageMake);

  const categoryTiles = PartsData.filter((post) => selectedParts.includes(post.parts));
  const makeUrl = `/search-by-make/${encodeURIComponent(make)}`;

  const sectionTitle = `text-2xl font-bold text-gray-900 sm:text-3xl ${poppins.className}`;

  return (
    <div className={`mx-auto max-w-7xl px-4 pb-16 sm:px-6 ${roboto.className}`}>
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="py-4 text-sm text-gray-500">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <li><Link href="/" className="hover:text-blue-600 hover:underline">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href="/search-by-make" className="hover:text-blue-600 hover:underline">Car Makes</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href={makeUrl} className="hover:text-blue-600 hover:underline">{make}</Link></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="font-medium text-gray-900">{model}</li>
        </ol>
      </nav>

      {/* Hero */}
      <header className="overflow-hidden rounded-3xl border bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <div className="grid items-center gap-6 p-6 sm:p-10 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 xxl:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
              Expert parts · Seamless performance
            </p>
            <h1 className={`mt-3 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl ${poppins.className}`}>
              <span className="text-blue-600">{make} {model} Spare Parts</span>{" "}
              – Genuine, OEM &amp; Used Auto Parts from Dubai with Delivery Across UAE
            </h1>

            <ul className="mt-5 flex flex-wrap gap-2 text-sm">
              {["Genuine & OEM", "Used & aftermarket", "Fitment checked", "Delivery across UAE"].map((chip) => (
                <li key={chip} className="rounded-full border bg-white px-3 py-1 font-medium text-gray-700">
                  ✓ {chip}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#myForm"
                title="Inquire about vehicle parts online"
                className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-sm hover:bg-blue-700"
              >
                Get Best Price
              </a>
              <a
                href="#parts"
                className="rounded-xl border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-800 hover:border-blue-600 hover:text-blue-600"
              >
                Browse parts
              </a>
            </div>
          </div>

          {imageMake && (
            <div className="hidden justify-center md:flex xl:flex xxl:flex lg:flex">
              <Image
                src={`/img/car-logos/${imageMake}`}
                alt={`${make} ${model} spare parts`}
                priority
                width={320}
                height={320}
                className="h-auto w-full max-w-xs object-contain drop-shadow-lg"
              />
            </div>
          )}
        </div>
      </header>

      {/* Inquiry form */}
      <div className="mx-auto mt-8 max-w-2xl rounded-2xl border bg-white p-4 shadow-sm sm:p-6">
        <FormMakeModelRender formsData={CarData} mke={make} modl={model} page={`/${make}/${model}`} />
      </div>

      {/* Products */}
      <section id="parts" className="mt-12 scroll-mt-20">
        {makeModelFiltered.length > 0 && (
          <Product make={make} model={model} products={filtered} allProducts={makeModelFiltered} />
        )}
      </section>

      {/* Shop by category */}
      <section className="mt-14">
        <h2 className={sectionTitle}>
          Shop <span className="text-blue-600">{make} {model}</span> parts by category
        </h2>
        <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 xxl:grid-cols-6">
          {categoryTiles.map((post) => {
            const href = hasSEO
              ? `/search-by-make/${encodeURIComponent(make)}/${encodeURIComponent(model)}/${encodeURIComponent(post.category)}/${encodeURIComponent(post.parts)}`
              : `/search-by-make/${encodeURIComponent(make)}/${encodeURIComponent(model)}#myForm`;
            return (
              <li key={`${post.category}-${post.parts}`}>
                <Link
                  href={href}
                  className="flex h-full flex-col items-center rounded-2xl border bg-white p-4 text-center transition hover:border-blue-600 hover:shadow-md"
                >
                  <span className="flex h-24 w-24 items-center justify-center">
                    <Image
                      src={post.img || "/img/parts/car-spare-parts.png"}
                      alt={`${make} ${model} ${post.parts}`}
                      width={96}
                      height={96}
                      className="max-h-full max-w-full object-contain"
                    />
                  </span>
                  <span className="mt-3 text-sm font-medium text-gray-800">
                    {make} {model} {post.parts}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Why us */}
      <section className="mx-auto mt-14 max-w-4xl space-y-4 text-gray-700">
        <h2 className={sectionTitle}>Why Emirates-car.com?</h2>
        <p>
          EMIRATESCAR is the online dealer in <span className="font-medium text-blue-600">{make} {model}</span>{" "}
          spare parts and for any car brand running on the roads of UAE. We find the correct used, genuine
          (otherwise called OEM parts) and aftermarket parts that match your fitment. We have experienced
          professionals who can find the parts at an affordable and reasonable price. We deal in used and genuine{" "}
          {make} {model} parts and aftermarket {make} {model} parts such as engine parts, mechanical parts,
          electrical and electronic parts, body parts and lights, AC parts and service and maintenance parts.
        </p>
        <p>
          You can inquire about {make} {model} spare parts by simply submitting the{" "}
          <a href="#myForm" className="text-blue-600 underline hover:text-blue-800" title={`${make} ${model} parts`}>
            online inquiry form
          </a>
          . You can get a callback, WhatsApp chat or email after submitting your inquiry.
        </p>
        {description && <div dangerouslySetInnerHTML={{ __html: description }} />}
        <p>
          We deal with auto spare parts from any country, including{" "}
          {COUNTRIES.map((c, i) => (
            <span key={c}>
              <Link href={`/spare-parts/${c.toLowerCase()}-auto-spare-parts`} className="text-blue-600 hover:underline">
                {c}
              </Link>
              {i < COUNTRIES.length - 1 ? ", " : ""}
            </span>
          ))}{" "}
          brands in UAE. We also operate in main areas such as{" "}
          {AREAS.map((a, i) => (
            <span key={a}>
              <Link
                href={`/search-by-brands-in-uae/${encodeURIComponent(make)}/${encodeURIComponent(a)}`}
                className="text-blue-600 hover:underline"
              >
                {a}
              </Link>
              {i < AREAS.length - 1 ? ", " : ""}
            </span>
          ))}
          , etc. You can check our catalogue at{" "}
          <Link href="/catalogs" className="text-blue-600 underline" title={`${make} ${model}`}>
            /catalogs
          </Link>
          . We provide auto spare parts for any vehicle, including:
        </p>
        <ul className="grid gap-2 sm:grid-cols-2">
          {["New auto spare parts in UAE", "Used auto spare parts in UAE", "Genuine auto spare parts in UAE", "Aftermarket auto spare parts in UAE"].map((t) => (
            <li key={t} className="rounded-xl border bg-white px-4 py-2 text-sm font-medium">✓ {t}</li>
          ))}
        </ul>
      </section>

      {/* Other models */}
      <section className="mt-14 rounded-3xl bg-gray-50 p-6 sm:p-10">
        <h2 className={sectionTitle}>
          Search <span className="text-blue-600">{make} {model}</span> spare parts by model
        </h2>
        <div className="mt-4">
          <SearchModel make={make} car={models} />
        </div>
        <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xxl:grid-cols-4 xl:grid-cols-4">
          {models.map((post) => (
            <li key={`${post.make}-${post.model}`}>
              <Link
                href={`/search-by-make/${post.make}/${encodeURIComponent(post.model)}`}
                title={`${post.make} ${post.model} spare parts`}
                className="block h-full rounded-xl border bg-white p-3 text-center text-sm font-medium text-gray-900 hover:border-blue-600"
              >
                {make} <span className="text-blue-600">{post.model.replace("%2F", "/")}</span> parts
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <TenEntries />

      {/* Parts directory */}
      <section className="mt-14">
        <h2 className={`${sectionTitle} text-center`}>
          List of Genuine and Aftermarket {make} {model} spare parts in UAE
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xxl:grid-cols-3">
          {PART_GROUPS.map((group) => (
            <div key={group.title} className="rounded-2xl border bg-white p-5">
              <h3 className="text-lg font-semibold text-blue-600">
                {make} {model} {group.title}
              </h3>
              <ul className="mt-3 space-y-1.5 text-gray-700">
                {group.parts.map(([label, slug]) => (
                  <li key={label}>
                    <Link
                      href={`/search-by-part-name/${encodeURIComponent(slug || label)}`}
                      className="hover:text-blue-600 hover:underline"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/get-in-touch"
            className="inline-block rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700"
          >
            View All Parts
          </Link>
        </div>
      </section>

      <section className="mt-10 text-center text-xl font-bold text-red-600 underline">
        <HondaOfferButton />
      </section>

      {/* Genuine vs aftermarket */}
      <section className="mx-auto mt-14 max-w-4xl" aria-labelledby="oemvsaftermarket">
        <h2 id="oemvsaftermarket" className={`${sectionTitle} text-center`}>
          Genuine {make} {model} parts vs aftermarket {make} {model} parts
        </h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border bg-white p-6">
            <h3 className="font-semibold text-gray-900">Why aftermarket parts can be better</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-gray-700">
              <li>More affordable than genuine parts.</li>
              <li>Some aftermarket parts match genuine parts in quality.</li>
              <li>Readily available because they are manufactured to be equivalent to genuine parts.</li>
              <li>Can come from several manufacturers, while genuine parts usually come from one.</li>
            </ul>
          </div>
          <div className="rounded-2xl border bg-white p-6">
            <h3 className="font-semibold text-gray-900">Why genuine parts can be better</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-gray-700">
              <li>Aftermarket parts are not standardized because they are manufactured as duplicates of genuine parts.</li>
              <li>Genuine parts are generally higher in quality.</li>
              <li>Genuine parts carry a warranty, unlike most aftermarket parts.</li>
            </ul>
          </div>
        </div>
        <p className="mt-6 text-center text-gray-700">
          Weigh the pros and cons and decide which kind of part you need. We can supply both.
        </p>
      </section>

      {/* Availability */}
      <section className="mt-14 rounded-3xl bg-gray-50 p-6 sm:p-10">
        <h2 className={sectionTitle}>
          Availability of <span className="text-blue-600">{make} {model} spare parts</span> in UAE
        </h2>
        <ul className="mt-6 flex flex-wrap gap-3">
          {CITIES.map((city) => (
            <li key={city}>
              <Link
                href={`/search-by-brands-in-uae/${encodeURIComponent(make)}/${encodeURIComponent(city)}`}
                title={`${make} ${model} spare parts ${city}`}
                className="block rounded-full border bg-white px-5 py-2 text-sm font-medium text-gray-900 hover:border-blue-600 hover:text-blue-600"
              >
                {city}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* JSON-LD: real <script> tag, server-rendered so it appears in View Page Source */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </div>
  );
}