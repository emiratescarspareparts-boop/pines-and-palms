import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Poppins, Roboto } from "next/font/google";
import SearchModel from "../../../components/SearchModel";
import HondaOfferButton from "../../../components/HondaOfferButton";
import TenEntries from "../../../components/tenentries";
import PartsAccordion from "../../../components/Parts-Accordion";
import products from "../../../public/products.json";
import CarData from "../../../public/lib/car-data.json";
import PartsData from "../../../public/lib/parts.json";
import Product from "./Product";
import FormMakeRender from "../../../components/FormMakeRender";

export const revalidate = 86400;
export const dynamic = "force-static";
export const fetchCache = "force-cache";
export const dynamicParams = true;

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

const ALL_MAKES_BY_TRAFFIC = [
  "BYD", "Cadillac", "Lexus", "Honda", "Toyota", "Exeed",
  "Hyundai", "Mitsubishi", "Mazda", "Lincoln", "Hummer",
  "Mercedes-Benz", "Audi", "Nissan", "Daihatsu", "Ram",
  "Volkswagen", "Jeep", "Renault", "Fiat", "Chevrolet",
  "Ford", "Land Rover", "Kia", "Dodge", "Infiniti",
  "Peugeot", "Mercury", "Bugatti", "Daewoo", "Volvo",
  "BMW", "McLaren", "Jaguar", "Porsche", "Maserati",
  "Ferrari", "Subaru", "Tesla", "Scion", "Bentley",
  "Suzuki", "GMC", "Mini", "Rolls-Royce", "Alfa Romeo",
  "Citroen", "Chrysler", "Dacia", "Saturn",
];

const CITIES = ["Abu Dhabi", "Ajman", "Dubai", "Al Ain", "Sharjah", "Ras al Khaimah", "Fujairah"];
const AREAS = ["Dubai", "Sharjah", "Abu Dhabi", "Ajman", "Al Quoz", "Palm Jumeirah", "Deira"];
const COUNTRIES = ["Japanese", "American", "German", "Chinese", "Korean", "French", "British"];

// Built once at module load (build time)
const carDataByMake = {};
for (const car of CarData) {
  (carDataByMake[car.make.toLowerCase()] ||= []).push(car);
}

/* ───────────────────────── helpers ───────────────────────── */

const safeDecode = (s = "") => {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
};
const norm = (s) => (s || "").toString().trim().toLowerCase();
const toArray = (v) => (Array.isArray(v) ? v : v ? [v] : []);

function getModels(make) {
  const cars = carDataByMake[norm(make)];
  if (!cars?.length) return [];
  const unique = {};
  for (const car of cars) if (!unique[car.model]) unique[car.model] = car;
  return Object.values(unique);
}

function getMakeField(make, field) {
  const cars = carDataByMake[norm(make)];
  if (!cars?.length) return "";
  for (const car of cars) if (car[field]) return car[field];
  return "";
}

function productUrl(product, compat, make) {
  const slugRaw = `${product.partname}-${make}-${compat.model || ""}${compat.years ? `-${compat.years}` : ""}-${product.partnumber}-${product.id}`;
  return `/search-by-make/${encodeURIComponent(make)}/${encodeURIComponent(compat.model || "")}/${encodeURIComponent(product.category)}/${encodeURIComponent(product.subcategory)}/${encodeURIComponent(slugRaw)}`;
}

function buildSchema(make, items) {
  const pageUrl = `${SITE}/search-by-make/${encodeURIComponent(make)}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#page`,
        name: `${make} Spare Parts | Emirates Car`,
        url: pageUrl,
        description: `Find genuine, OEM, and aftermarket spare parts for all ${make} models.`,
        about: { "@type": "Brand", name: make },
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
      { "@type": "Organization", "@id": `${SITE}/#organization`, name: "Emirates Car", url: SITE },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: "Car Makes", item: `${SITE}/search-by-make/` },
          { "@type": "ListItem", position: 3, name: `${make} Spare Parts`, item: pageUrl },
        ],
      },
    ],
  };
}

/* ───────────────────────── static params + metadata ───────────────────────── */

export function generateStaticParams() {
  return ALL_MAKES_BY_TRAFFIC.filter((make) => !excludedMakesSet.has(make)).map((make) => ({
    make: encodeURIComponent(make.replace(/ /g, "%20")),
  }));
}

export function generateMetadata({ params }) {
  const make = safeDecode(params.make);
  const imageMake = getMakeField(make, "img");
  const canonical = `${SITE}/search-by-make/${encodeURIComponent(make)}`;

  const title = `${make} Spare Parts in UAE - Used, Genuine, OEM and Aftermarket`;
  const description = `Buy genuine, OEM, used & aftermarket ${make} spare parts in Dubai, Sharjah & across the UAE. Get best prices and fast quotes from trusted dealers today.`;
  const ogImages = [
    { url: imageMake ? `${SITE}/img/car-logos/${imageMake}` : `${SITE}/img/car-spare-parts.png`, alt: `${make} spare parts` },
    { url: `${SITE}/icons/icon-512x512.png`, width: 512, height: 512, alt: "car parts" },
  ];

  return {
    title,
    description,
    metadataBase: new URL(SITE),
    openGraph: { title, description, url: canonical, siteName: "EMIRATESCAR", images: ogImages, locale: "en_US", type: "website" },
    twitter: { card: "summary_large_image", title, description, images: [ogImages[0].url] },
    icons: {
      icon: `${SITE}/icons/favicon-32x32.png`,
      shortcut: `${SITE}/icons/icon-96x96.png`,
      apple: `${SITE}/icons/icon-192x192.png`,
      other: { rel: "apple-touch-icon-precomposed", url: `${SITE}/icons/icon-152x152.png` },
    },
    category: `Vehicle Parts & Accessories > ${make}`,
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
      "product:category": `Vehicle Parts & Accessories > ${make}`,
      // JSON-LD is rendered as a real <script> in the page body (metadata.other only makes <meta> tags)
    },
  };
}

/* ───────────────────────── page ───────────────────────── */

export default function MakePage({ params, searchParams = {} }) {
  const make = safeDecode(params.make);

  // Bail out early, before any heavy work
  if (excludedMakesSet.has(make)) notFound();
  const makeLower = norm(make);
  if (!carDataByMake[makeLower]?.length) notFound();

  const carmodel = getModels(make);
  const imageMake = getMakeField(make, "img");
  const description = getMakeField(make, "description");
  const makeEnc = encodeURIComponent(make);

  const makeFiltered = products.filter((p) => p.compatibility?.some((c) => norm(c.make) === makeLower));

  // Query-string filters (unchanged behaviour)
  const cats = new Set(toArray(searchParams["filter_car_parts[]"]));
  const engs = new Set(toArray(searchParams["engine[]"]));
  const compats = new Set(toArray(searchParams["compatibility[]"]));
  const query = (searchParams.search || "").toString().toLowerCase();

  const filtered = makeFiltered.filter((product) => {
    if (cats.size && !cats.has(product.category)) return false;
    if (query) {
      const hit =
        product.partname?.toLowerCase().includes(query) ||
        product.engine?.some((e) => e.toLowerCase().includes(query)) ||
        product.compatibility?.some((c) => `${c.make} ${c.model ?? ""} ${c.years ?? ""}`.toLowerCase().includes(query));
      if (!hit) return false;
    }
    if (engs.size && !product.engine?.some((e) => engs.has(e))) return false;
    if (
      compats.size &&
      !product.compatibility?.some((c) => compats.has(`${c.make} ${c.model ?? ""} ${c.years ? `(${c.years})` : ""}`))
    )
      return false;
    return true;
  });

  // JSON-LD list: first 50 products (URL + name only)
  const schemaItems = makeFiltered
    .slice(0, 50)
    .map((p) => {
      const compat = p.compatibility.find((c) => norm(c.make) === makeLower);
      return compat ? { name: `${make} ${p.partname} ${p.partnumber}`, href: productUrl(p, compat, make) } : null;
    })
    .filter(Boolean);
  const jsonLd = buildSchema(make, schemaItems);

  const categoryTiles = PartsData.filter((post) => selectedParts.includes(post.parts));
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
          <li aria-current="page" className="font-medium text-gray-900">{make}</li>
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
              <span className="text-blue-600">{make} Spare Parts</span>{" "}
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
            <div className="hidden justify-center md:flex lg:flex xl:flex xxl:flex">
              <Image
                src={`/img/car-logos/${imageMake}`}
                alt={`${make} spare parts`}
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
        <FormMakeRender formsData={CarData} mke={make} page={`/search-by-make/${make}`} />
      </div>

      {/* Products */}
      <section id="parts" className="mt-12 scroll-mt-20">
        {makeFiltered.length > 0 && <Product make={make} products={filtered} allProducts={makeFiltered} />}
      </section>

      {/* Most searched parts */}
      <section className="mt-14">
        <h2 className={sectionTitle}>
          Most searched <span className="text-blue-600">{make}</span> spare parts in UAE
        </h2>
        <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xxl:grid-cols-6 xl:grid-cols-6">
          {categoryTiles.map((post) => (
            <li key={`${post.category}-${post.parts}`}>
              <Link
                href={`/search-by-make/${makeEnc}/parts/${encodeURIComponent(post.parts)}`}
                className="flex h-full flex-col items-center rounded-2xl border bg-white p-4 text-center transition hover:border-blue-600 hover:shadow-md"
              >
                <span className="flex h-24 w-24 items-center justify-center">
                  <Image
                    src={post.img || "/img/parts/car-spare-parts.png"}
                    alt={`${make} ${post.parts}`}
                    width={96}
                    height={96}
                    className="max-h-full max-w-full object-contain"
                  />
                </span>
                <span className="mt-3 text-sm font-medium text-gray-800">
                  {make} {post.parts}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Models */}
      <section className="mt-14 rounded-3xl bg-gray-50 p-6 sm:p-10">
        <h2 className={sectionTitle}>
          Search <span className="text-blue-600">{make}</span> spare parts by model
        </h2>
        <div className="mt-4">
          <SearchModel make={make} car={carmodel} />
        </div>
        <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 xxl:grid-cols-4">
          {carmodel.map((post) => (
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
        <p className="mt-6 text-center text-sm text-gray-600">
          Model not found above?{" "}
          <Link href="/get-in-touch" className="font-medium text-blue-600 underline">
            Get in touch with us &raquo;
          </Link>
        </p>
      </section>

      {make === "Honda" && (
        <div className="mt-8 text-center">
          <HondaOfferButton />
        </div>
      )}

      {/* Availability */}
      <section className="mt-14">
        <h2 className={sectionTitle}>
          Availability of <span className="text-blue-600">{make} spare parts</span> in UAE
        </h2>
        <ul className="mt-6 flex flex-wrap gap-3">
          {CITIES.map((city) => (
            <li key={city}>
              <Link
                href={`/search-by-brands-in-uae/${makeEnc}/${encodeURIComponent(city)}`}
                title={`${make} spare parts ${city}`}
                className="block rounded-full border bg-white px-5 py-2 text-sm font-medium text-gray-900 hover:border-blue-600 hover:text-blue-600"
              >
                {city}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <TenEntries />
      <PartsAccordion make={make} />

      {/* Why us */}
      <section className="mx-auto mt-14 max-w-4xl space-y-4 text-gray-700">
        <h2 className={sectionTitle}>Why EMIRATESCAR?</h2>
        <p>
          Emirates-car.com is the online dealer in <span className="font-medium text-blue-600">{make}</span>{" "}
          spare parts and for any car brand running on the roads of UAE. We find the correct used, genuine
          (otherwise called OEM parts) and aftermarket parts that match your fitment. We have experienced
          professionals who can find the parts at an affordable and reasonable price. We deal in used and
          genuine {make} parts and aftermarket {make} parts such as engine parts, mechanical parts, electrical
          and electronic parts, body parts and lights, AC parts and service and maintenance parts.
        </p>
        <p>
          You can inquire about {make} spare parts by simply submitting the{" "}
          <a href="#myForm" className="text-blue-600 underline hover:text-blue-800" title={`${make} parts`}>
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
          brands in UAE. We ship and deliver in{" "}
          {AREAS.map((a, i) => (
            <span key={a}>
              <Link
                href={`/search-by-brands-in-uae/${makeEnc}/${encodeURIComponent(a)}`}
                className="text-blue-600 hover:underline"
              >
                {a}
              </Link>
              {i < AREAS.length - 1 ? ", " : ""}
            </span>
          ))}
          , etc. You can check our catalogue at{" "}
          <Link href="/catalogs" className="text-blue-600 underline" title={make}>
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

      {/* JSON-LD: real <script> tag, server-rendered so it appears in View Page Source */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </div>
  );
}