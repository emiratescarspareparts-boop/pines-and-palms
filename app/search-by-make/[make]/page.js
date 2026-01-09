import SearchModel from '../../../components/SearchModel';
import Link from 'next/link';
import HondaOfferButton from '../../../components/HondaOfferButton';
import Image from 'next/image';
import TenEntries from '../../../components/tenentries';
import PartsAccordion from '../../../components/Parts-Accordion';
import { notFound } from 'next/navigation';
import products from "../../../public/products.json"
import { Fira_Sans, Playfair_Display } from 'next/font/google';
import CarData from "../../../public/lib/car-data.json"
import PartsData from "../../../public/lib/parts.json"
import Product from './Product';
import FormMakePart from '../../../components/FormMakePart';
export const revalidate = 86400;
export const runtime = 'nodejs';
export const dynamicParams = false;

const IMAGE_BASE_PATH = '/img/honda-eighth-gen';

const imagePaths = {
  ABS: `${IMAGE_BASE_PATH}/ABS.webp`,
  AirFilter: `${IMAGE_BASE_PATH}/Air_Filter.webp`,
  AirSuspension: `${IMAGE_BASE_PATH}/Air_Suspension_Module.webp`,
  AxleAssembly: `${IMAGE_BASE_PATH}/Axle_Assembly_Rear.webp`,
  BrakePads: `${IMAGE_BASE_PATH}/Brake_Pads.webp`,
  CatalyticConverter: `${IMAGE_BASE_PATH}/Catalytic_Converter.webp`,
  CylinderHead: `${IMAGE_BASE_PATH}/Cylinder_Head.webp`,
  Distributor: `${IMAGE_BASE_PATH}/Distributor.webp`,
  Engine: `${IMAGE_BASE_PATH}/Engine.webp`,
  ExhaustManifold: `${IMAGE_BASE_PATH}/Exhaust_Manifold.webp`,
  GearBox: `${IMAGE_BASE_PATH}/Gearbox.webp`,
  Grille: `${IMAGE_BASE_PATH}/Grille.webp`,
  Headlight: `${IMAGE_BASE_PATH}/Headlight.webp`,
  MasterCylinderKit: `${IMAGE_BASE_PATH}/Master_Cylinder.webp`,
  Radiator: `${IMAGE_BASE_PATH}/Radiator.webp`,
  RearBumper: `${IMAGE_BASE_PATH}/Rear_Bumper_Assembly.webp`,
  ReverseLight: `${IMAGE_BASE_PATH}/Reverse_Light.webp`,
  Rim: `${IMAGE_BASE_PATH}/Rim.webp`,
  SeatBelt: `${IMAGE_BASE_PATH}/Seat_Belt.webp`,
  ShockAbsorber: `${IMAGE_BASE_PATH}/Shock_Absorber.webp`,
  SideMirror: `${IMAGE_BASE_PATH}/Side_Mirror.webp`,
  SteeringWheel: `${IMAGE_BASE_PATH}/Steering_Wheel.webp`,
  Wheel: `${IMAGE_BASE_PATH}/Wheel.webp`,
  MudFlap: `${IMAGE_BASE_PATH}/Mud_Flap.webp`,
}



const playfair_display = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair-display',
});

const firaSans = Fira_Sans({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fira-sans',
});

const excludedMakes = [
  'Buick', 'Eagle', 'Lotus', 'Plymouth', 'Pontiac', 'Saab', 'Subaru',
  'Alpha Romeo', 'Geo', 'Oldsmobile', 'Isuzu', 'Saturn', 'Corbin', 'Holden',
  'Spyker', 'Spyker Cars', 'Aston Martin', 'Panoz', 'Foose', 'Morgan', 'Aptera',
  'Smart', 'SRT', 'Roush Performance', 'Pagani', 'Mobility Ventures LLC',
  'RUF Automobile', 'Koenigsegg', 'Karma', 'Polestar', 'STI', 'Kandi', 'Abarth',
  'Dorcen', 'Foton', 'W Motors', 'Opel', 'Skoda', 'Hillman', 'Austin', 'Fillmore',
  'Maybach', 'Merkur', 'Rambler', 'Shelby', 'Studebaker', 'Great Wall GWM', 'Zeekr',
  'ZNA', 'GAC', 'Gs7', 'Hongqi', 'W Motor', 'JAC', 'Jaecoo', 'Jetour', 'TANK',
  'Soueast', 'Zarooq Motors', 'Changan', 'Maxus', 'Haval', 'Zotye', 'Sandstorm',
  'Chery', 'Geely', 'BAIC', 'Bestune'
];

const excludedMakesSet = new Set(excludedMakes);

const baseCity = [{
  "id": 1,
  "city": "Abu Dhabi",
  "link": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d465132.6090253298!2d54.27841778442708!3d24.38657289151084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5e440f723ef2b9%3A0xc7cc2e9341971108!2sAbu%20Dhabi%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sin!4v1640018687052!5m2!1sen!2sin",
  "description": "Abu Dhabi, also spelled Abū Ẓaby. Abu Dhabi, the capital of the United Arab Emirates, sits off the mainland on an island in the Persian (Arabian) Gulf. Its focus on oil exports and commerce is reflected by the skyline’s modern towers and shopping megacenters such as Abu Dhabi and Marina malls. The city of Abu Dhabi is located on an island Beneath white-marble domes, the vast Sheikh Zayed Grand Mosque features an immense Persian carpet, crystal chandeliers and capacity for 41,000 worshipers."
},
{
  "id": 2,
  "city": "Ajman",
  "link": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d230658.57689222984!2d55.39307659945978!3d25.40346278803545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5764dd8fbe79%3A0xcda090de6445a819!2sAjman%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sin!4v1640009886379!5m2!1sen!2sin",
  "description": "After Abu Dhabi, Sharjah and Al Ain, Ajman is the fifth largest city in United Arab Emirates. A paper published by researchers from Ajman university explains the URBANISATION IN AJMAN: PUSHING BY HOUSING DEVELOPMENT, published on febrauary, 2020. It is published in a motto of developing the Ajman city."
},
{
  "id": 3,
  "city": "Dubai",
  "link": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d462562.65102636546!2d54.94754444558808!3d25.075759435668097!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sDubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sin!4v1640016582896!5m2!1sen!2sin",
  "description": "."
},
{
  "id": 4,
  "city": "Al Ain",
  "link": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d232921.30495584515!2d55.60677819193463!3d24.192928130526976!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e8ab145cbd5a049%3A0xf56f8cea5bf29f7f!2sAl%20Ain%20-%20Abu%20Dhabi%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sin!4v1640018189460!5m2!1sen!2sin",
  "description": "Al Ain is a inland oasis city. It shares eastern border with Oman. Its called a garden city because it is loaded with palm grooves trees and natural springs. It has Archeological park to the north and tombs on mountain of Jebel al Hafeet and its remains are displayed on the National museum in the central part of Al Ain. So naturally, Al Ain is more adventourous to attract tourist. A new project is initiated by the name `Plan Al Ain 2030`. It is expected to complete by 2030. The paper released by faculty of UAEU. It outlines the Foundation, Economics, urban structure framework and overall patterns"
},
{
  "id": 5,
  "city": "Sharjah",
  "link": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d230818.9387004767!2d55.41516106289569!3d25.319455944500426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5f5fede7964b%3A0x2a830aa19c1f6d89!2sAl%20Sharjah%20-%20Sharjah%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sin!4v1640011943348!5m2!1sen!2sin",
  "description": "."
},
{
  "id": 6,
  "city": "Ras al Khaimah",
  "link": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d922252.0033869754!2d55.44538869425926!3d25.453407942583034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ef6710e4cd209a7%3A0xb99e670ca684e20f!2sRas%20al%20Khaimah%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sin!4v1640012402585!5m2!1sen!2sin",
  "description": "."
}, {
  "id": 7,
  "city": "Fujairah",
  "link": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114828.64793224298!2d54.86883979250164!3d24.890725154679558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ef4323d9028b95f%3A0xa6c1b11bdbb33cbc!2sFujairah%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sin!4v1640018083168!5m2!1sen!2sin",
  "description": "A sheikhdom of the United Arab Emirates on the Gulf of Oman. It joined the federation in 1971. Fujairah City (Arabic: الفجيرة‎) is the capital of the emirate of Fujairah in the United Arab Emirates. It is the seventh-largest city in UAE. Metro population is about 1,52,000"
}
];



const carDataByMakeModel = {};
const carDataByMake = {};

for (let i = 0; i < CarData.length; i++) {
  const car = CarData[i];

  const key = `${car.make.toLowerCase()}-${car.model.toLowerCase()}`;
  if (!carDataByMakeModel[key]) {
    carDataByMakeModel[key] = [];
  }
  carDataByMakeModel[key].push(car);

  const makeLower = car.make.toLowerCase();
  if (!carDataByMake[makeLower]) {
    carDataByMake[makeLower] = [];
  }
  carDataByMake[makeLower].push(car);
}

export function generateStaticParams() {
  try {
    const seen = new Set();
    const params = [];

    for (let i = 0; i < CarData.length; i++) {
      const make = CarData[i].make;

      if (excludedMakes.indexOf(make) !== -1) continue;

      if (!seen.has(make)) {
        seen.add(make);
        params.push({ make });
      }
    }

    return params;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}


function getModel(make) {
  const makeLower = make.toLowerCase();
  const cars = carDataByMake[makeLower];

  if (!cars || cars.length === 0) return [];

  const uniqueModels = {};
  for (let i = 0; i < cars.length; i++) {
    const car = cars[i];
    if (!uniqueModels[car.model]) {
      uniqueModels[car.model] = car;
    }
  }

  return Object.values(uniqueModels);
}

export function generateMetadata({ params }) {
  const make = decodeURIComponent(params.make);
  const productsForMake = products.filter(p =>
    p.compatibility?.some(c => c.make.toLowerCase() === make.toLowerCase())
  );

  const productListItems = productsForMake.map((product, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "item": {
      "@type": "Product",
      "@id": `https://www.emirates-car.com/search-by-make/${make}/${product.category}/${product.partname}-${product.partnumber}-${product.id}#product`,
      "name": `${product.partname} ${product.partnumber} ${make}`,
      "url": `https://www.emirates-car.com/search-by-make/${make}/${product.category}/${product.partname}-${product.partnumber}-${product.id}`,
      "image": `https://www.emirates-car.com${product.image}`,
      "description": `${product.partname} compatible with ${make} ${product.compatibility?.map(c => c.model).join(", ")}`,
      "brand": { "@type": "Brand", "name": product.compatibility[0]?.make || make },
      "mpn": product.partnumber,
      "offers": {
        "@type": "Offer",
        "url": `https://www.emirates-car.com/search-by-make/${make}/${product.category}/${product.partname}-${product.partnumber}-${product.id}`,
        "priceCurrency": product.pricing.currency,
        "price": product.pricing.price,
        "availability": "https://schema.org/InStock",
        "itemCondition": "https://schema.org/NewCondition"
      },
      "isAccessoryOrSparePartFor": {
        "@type": "Car",
        "make": { "@type": "Brand", "name": product.compatibility[0]?.make || make },
        "model": product.compatibility[0]?.model
      }
    }
  }));


  const faqSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        "divEntity": [
          {
            "@type": "Question",
            "name": `Do you deal in genuine ${make} spare parts in UAE?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `Yes, we deal in genuine OEM ${make} parts, as well as used and aftermarket options to suit your budget.`
            }
          },
          {
            "@type": "Question",
            "name": `Can I buy used or aftermarket ${make} parts to save costs?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `Yes, we offer used and aftermarket ${make} spare parts that are tested for quality and performance.`
            }
          },
          {
            "@type": "Question",
            "name": `Do you deliver ${make} parts across UAE?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `Yes, we deliver ${make} spare parts to Dubai, Abu Dhabi, Sharjah, Ajman, and other Emirates. International shipping is also available.`
            }
          },
          {
            "@type": "Question",
            "name": `How do I know if a part fits my ${make}?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `You can share your car's VIN or model details with us, and we will confirm compatibility before shipping.`
            }
          },
          {
            "@type": "Question",
            "name": `Do your ${make} spare parts come with warranty?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `Yes, all new and OEM ${make} spare parts come with a standard warranty. Used parts are tested but carry limited warranty.`
            }
          }
        ]
      },
      {
        "@type": "CollectionPage",
        "name": `${make} Spare Parts | Emirates Car`,
        "url": `https://www.emirates-car.com/search-by-make/${make}`,
        "description": `Find genuine, OEM, and aftermarket spare parts for all ${make} models.`,
        "about": { "@type": "Brand", "name": make },
        "mainEntity": {
          "@type": "ItemList",
          "itemListElement": productListItems
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.emirates-car.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Car Makes",
            "item": `https://www.emirates-car.com/search-by-makes/`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": `${make} Spare Parts`,
            "item": `https://www.emirates-car.com/search-by-make/${make}`
          }
        ]
      },
    ]
  };
  return {
    title: `${make} Spare Parts Dubai dealers UAE - Used, Genuine, OEM and Aftermarket`,
    description: `Find genuine, OEM, used & aftermarket ${make} spare parts in Dubai, Sharjah & across the UAE. Get best prices and fast quotes from trusted dealers today.`,
    metadataBase: new URL(
      `https://www.emirates-car.com/search-by-make/${encodeURIComponent(make)}`
    ),
    openGraph: {
      title: `${make} Spare Parts Dubai dealers UAE - Used, Genuine, OEM and Aftermarket`,
      description: `Find genuine, OEM, used & aftermarket ${make} spare parts in Dubai, Sharjah & across the UAE. Get best prices and fast quotes from trusted dealers today.`,
      url: 'https://www.emirates-car.com/search-by-make/' + encodeURIComponent(make),
      image: 'https://www.emirates-car.com/img/car-spare-parts.png',
      siteName: 'EMIRATESCAR',
      images: [
        'https://www.emirates-car.com/favicon.png',
        {
          url: 'https://www.emirates-car.com/icon-192x192.png',
          width: 192,
          height: 192,
        },
        {
          url: 'https://www.emirates-car.com/icons/icon-512x512.png',
          width: 512,
          height: 512,
          alt: 'car parts',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${make} Spare Parts Dubai dealers UAE - Used, Genuine, OEM and Aftermarket`,
      url: 'https://www.emirates-car.com/search-by-make/' + encodeURIComponent(make),
      description: `Find genuine, OEM, used & aftermarket ${make} spare parts in Dubai, Sharjah & across the UAE. Get best prices and fast quotes from trusted dealers today.`,
      images: ['https://www.emirates-car.com/favicon.png'],
    },
    icons: {
      icon: 'https://www.emirates-car.com/favicon.png',
      shortcut: 'https://www.emirates-car.com/icons/icon-96x96.png',
      apple: 'https://www.emirates-car.com/icons/icon-192x192.png',
      other: {
        rel: 'apple-touch-icon-precomposed',
        url: 'https://www.emirates-car.com/icons/icon-152x152.png',
      },
    },
    category: `${make} auto spare parts`,
    alternates: {
      canonical: `https://www.emirates-car.com/search-by-make/${encodeURIComponent(make)}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    other: {
      "script:ld+json": JSON.stringify(faqSchema),
    },
  };
}

function getMakeImage(make) {
  const key = `${make.toLowerCase()}`;
  const cars = carDataByMake[key];

  if (!cars || cars.length === 0) return '';

  for (const car of cars) {
    if (car.img) {
      return car.img;
    }
  }

  return '';
}


function getDescription(make) {
  const cars = carDataByMake[make.toLowerCase()];
  if (!cars || cars.length === 0) return '';

  for (let i = 0; i < cars.length; i++) {
    if (cars[i].description) {
      return cars[i].description;
    }
  }

  return '';
}
export default function MakePage({ params, searchParams }) {
  const make = decodeURIComponent(params.make);
  const carmodel = getModel(make);
  const partspost = PartsData;
  const modelsform = CarData;
  const imageMake = getMakeImage(make)
  const description = getDescription(make)

  const {
    "filter_car_parts[]": categories = [],
    "engine[]": engines = [],
    "compatibility[]": compats = [],
    search = ""
  } = searchParams;

  // Normalize filters
  const selectedCategories = Array.isArray(categories) ? categories : [categories].filter(Boolean);
  const selectedEngines = Array.isArray(engines) ? engines : [engines].filter(Boolean);
  const selectedCompats = Array.isArray(compats) ? compats : [compats].filter(Boolean);

  const query = search?.toLowerCase() || "";

  const categoriesSet = new Set(selectedCategories);
  const enginesSet = new Set(selectedEngines);
  const compatsSet = new Set(selectedCompats);

  const makeLower = make.toLowerCase();

  const makeFiltered = [];

  for (let i = 0; i < products.length; i++) {
    const product = products[i];

    if (!product.compatibility) continue;

    for (let j = 0; j < product.compatibility.length; j++) {
      const c = product.compatibility[j];

      if (c.make?.toLowerCase() === makeLower) {
        makeFiltered.push(product);
        break;
      }
    }
  }

  const filtered = [];

  for (let i = 0; i < makeFiltered.length; i++) {
    const product = makeFiltered[i];

    // Category filter
    if (categoriesSet.size > 0 && !categoriesSet.has(product.category)) {
      continue;
    }

    // Search filter
    if (query) {
      let matches = false;

      if (product.partname?.toLowerCase().includes(query)) {
        matches = true;
      }

      if (!matches && product.engine) {
        for (let j = 0; j < product.engine.length; j++) {
          if (product.engine[j].toLowerCase().includes(query)) {
            matches = true;
            break;
          }
        }
      }

      if (!matches && product.compatibility) {
        for (let j = 0; j < product.compatibility.length; j++) {
          const c = product.compatibility[j];
          const searchStr = `${c.make} ${c.model ?? ""} ${c.years ?? ""}`.toLowerCase();

          if (searchStr.includes(query)) {
            matches = true;
            break;
          }
        }
      }

      if (!matches) continue;
    }

    // Engine filter
    if (enginesSet.size > 0) {
      let hasEngine = false;

      if (product.engine) {
        for (let j = 0; j < product.engine.length; j++) {
          if (enginesSet.has(product.engine[j])) {
            hasEngine = true;
            break;
          }
        }
      }

      if (!hasEngine) continue;
    }

    // Compatibility filter (make-level)
    if (compatsSet.size > 0) {
      let hasCompat = false;

      if (product.compatibility) {
        for (let j = 0; j < product.compatibility.length; j++) {
          const c = product.compatibility[j];
          const compatStr = `${c.make} ${c.model ?? ""} ${c.years ? `(${c.years})` : ""}`;

          if (compatsSet.has(compatStr)) {
            hasCompat = true;
            break;
          }
        }
      }

      if (!hasCompat) continue;
    }

    filtered.push(product);
  }


  if (excludedMakesSet.has(make)) {
    notFound();
  }

  const data = carDataByMake[makeLower] || [];

  if (data.length === 0) {
    notFound();
  }


  const grouped = {};

  for (let i = 0; i < filtered.length; i++) {
    const item = filtered[i];

    if (!grouped[item.category]) {
      grouped[item.category] = [];
    }

    grouped[item.category].push(item.parts);
  }


  const images = [
    {
      images: imagePaths.ABS,
      name: `${make} ABS`,
      alt: `${make} anti lock braking system`,
      link: '/search-by-part-name/Anti-Lock%20Brake%20Control%20Module%20(ABS)',
    },
    {
      images: imagePaths.AirFilter,
      name: `${make} Air Filter`,
      alt: `${make} air filter`,
      link: '/get-in-touch',
    },
    {
      images: imagePaths.AirSuspension,
      name: `${make} Air Suspension`,
      alt: `${make} Air suspension`,
      link: '/get-in-touch',
    },
    {
      images: imagePaths.AxleAssembly,
      name: `${make} Axle`,
      alt: `${make} axle`,
      link: '/search-by-part-name/Axle%20Assembly%20(Front,%204WD)',
    },
    {
      images: imagePaths.BrakePads,
      name: `${make} Brake Pads`,
      alt: `${make} brake pads`,
      link: '/get-in-touch',
    },
    {
      images: imagePaths.CatalyticConverter,
      name: `${make} Catalytic Convertor`,
      alt: `${make} catalytic convertor`,
      link: '/get-in-touch',
    },
    {
      images: imagePaths.CylinderHead,
      name: `${make} Cylinder Head`,
      alt: `${make} cylinder`,
      link: '/search-by-part-name/Cylinder%20Head)',
    },
    {
      images: imagePaths.Distributor,
      name: `${make} Distributor`,
      alt: `${make} distributor`,
      link: '/search-by-part-name/Distributor',
    },
    {
      images: imagePaths.Engine,
      name: `${make} Engine`,
      alt: `${make} Engine`,
      link: '/search-by-part-name/Engine%20Assembly',
    },
    {
      images: imagePaths.ExhaustManifold,
      name: `${make} Exhaust Manifold`,
      alt: `${make} exhaust system`,
      link: '/search-by-part-name/Exhaust%20Manifold',
    },
    {
      images: imagePaths.GearBox,
      name: `${make} Gearbox / Transmission`,
      alt: `${make} gearbox`,
      link: '/search-by-part-name/Transmission%20Control%20Module',
    },
    {
      images: imagePaths.Grille,
      name: `${make} grill`,
      alt: `${make} grill`,
      link: '/search-by-part-name/Grille',
    },
    {
      images: imagePaths.Headlight,
      name: `${make} Headlight`,
      alt: `${make} headlight bulb`,
      link: '/search-by-part-name/Headlight%20Assembly',
    },
    {
      images: imagePaths.MasterCylinderKit,
      name: `${make} Master Cylinder`,
      alt: `${make} master cylinder`,
      link: '/search-by-part-name/Master%20Cylinder%20(Clutch)',
    },
    {
      images: imagePaths.MudFlap,
      name: `${make} Mud Flaps`,
      alt: `${make} mud flaps`,
      link: '/get-in-touch',
    },
    {
      images: imagePaths.Radiator,
      name: `${make} Radiator`,
      alt: `${make} radiator`,
      link: '/search-by-part-name/Radiator',
    },
    {
      images: imagePaths.RearBumper,
      name: `${make} Rear Bumper`,
      alt: `${make} rear bumper`,
      link: '/search-by-part-name/Bumper%20Assembly%20(Rear)',
    },
    {
      images: imagePaths.ReverseLight,
      name: `${make} Reverse Light`,
      alt: `${make} reverse light`,
      link: '/search-by-part-name/Reverse%20Light',
    },
    {
      images: imagePaths.Rim,
      name: `${make} Rims`,
      alt: `${make} Rims for sale`,
      link: '/search-by-part-name/Rim',
    },
    {
      images: imagePaths.SeatBelt,
      name: `${make} Seat Belt`,
      alt: `${make} seat belt`,
      link: '/search-by-part-name/Seat%20Belt',
    },
    {
      images: imagePaths.ShockAbsorber,
      name: `${make} Shock Absorber`,
      alt: `${make} shock absorber`,
      link: '/search-by-part-name/Shock%20Absorber',
    },
    {
      images: imagePaths.SideMirror,
      name: `${make} Mirror`,
      alt: `${make} mirrors`,
      link: '/search-by-part-name/Mirror%20(Rear%20View)',
    },
    {
      images: imagePaths.SteeringWheel,
      name: `${make} Steering Wheel`,
      alt: `${make} steering wheel`,
      link: '/search-by-part-name/Steering%20Wheel',
    },
    {
      images: imagePaths.Wheel,
      name: `${make} wheels`,
      alt: `${make} wheels`,
      link: '/search-by-part-name/Wheel',
    },
  ];
  return (
    <div>
      <div className='max-w-7xl mx-auto md:px-0 lg:px-0 xs:px-0 xxs:px-0 sm:px-2'>
        <header
          className="xxs:py-0 sm:px-7  xl:py-10 xxl:py-10 s:py-0 xs:py-0 lg:py-0 md:mx-0 md:py-0"
          aria-label="Spare parts by country of origin"
        >
          <div className="bg-backgroundlight rounded-sm">
            <div className="grid grid-cols-2 xs:grid-cols-1 sm:grid-cols-2 xxs:grid-cols-1 xs:text-center">
              <div>
                <div className="xs:px-3 ml-8 md:ml-8 xs:ml-1 xxs:ml-0 mt-10 xs:my-5 xl:my-5 xxl:my-5 sm:mt-12 md:mt-10 lg:mt-20 xl:mt-20 xs:text-left">
                  <h6 className="block text-lg xl:text-xl sm:text-sm xs:text-base xxs:text-base xxs:text-center md:text-lg lg:text-2xl font-medium font-poppins text-gray-800  lg:leading-tight ">
                    <span className="block">
                      Expert Parts&nbsp;
                      <span className="text-blue-600">
                        Seamless Performance
                      </span>
                    </span>
                  </h6>
                  <h1 className={`text-3xl xl:text-4xl xxl:text-4xl font-extrabold mx-auto my-5 xs:my-3 xs:text-xl xxs:text-2xl md:text-xl md:my-3 sm:text-xl xxs:text-center ${playfair_display.className}`}>
                    <span className="text-blue-600 xl:inline">
                      {make} Spare Parts
                    </span>{" "}
                    – Genuine, OEM & Used Auto Parts from Dubai with Delivery Across UAE
                  </h1>
                  <div className="mt-2 lg:pb-5 py-3 w-1/2 lg:w-2/4 xs:w-full xxs:w-2/4 xxs:mx-auto mr-auto rounded-lg shadow-md">
                    <a
                      href="#myForm"
                      title="Inquire about vehicle parts online"
                      className="flex items-center justify-center py-2 border border-transparent font-medium rounded-sm text-white bg-blue-600 hover:bg-blue-700"
                    >
                      Inquire Now
                    </a>
                  </div>
                </div>
              </div>

              <div className="xxs:hidden xs:hidden s:hidden hero_section_blob">
                <Image
                  src={'/img/car-logos/' + imageMake}
                  alt={make + ' spare parts'}
                  className="ml-20 md:ml-5 lg:ml-8 lg:mt-10 xl:mt-10 xxl:mt-10 xl:ml-16 xxl:ml-16"
                  priority
                  width={300}
                  height={300}
                />
              </div>
            </div>
          </div>
        </header>
        <div className='sm:max-w-xl lg:max-w-2xl md:max-w-xl xl:max-w-2xl xxl:max-w-2xl mx-auto xs:mx-3 xxs:mx-3 sm:mx-5'>
          <FormMakePart formsData={modelsform} mke={make} />
        </div>
        {makeFiltered.length > 0 ?
          <Product
            make={make}
            products={filtered}
            allProducts={makeFiltered}
          /> : <></>}
        <section className="mt-10 shadow-sm mx-4 md:mx-4 lg:max-w-4xl lg:mx-auto xl:mx-10 bg-bglight px-20 xs:px-3 xxs:px-3">
          <div className="container py-6">
            <h2 className={`font-bold text-3xl xs:text-2xl my-3 ${playfair_display.className}`}>
              Search <span className='text-blue-600'>{make}</span> spare parts by Model
            </h2>
            <SearchModel make={make} car={carmodel} />


            <ul className="grid grid-cols-4 md:grid-cols-3 sm:grid-cols-4 xs:grid-cols-2 xxs:grid-cols-3 gap-3 xs:gap-1 mt-10">
              {carmodel.map((post, i) => {
                return (
                  <li key={i} className="h-full">
                    <Link
                      href='/search-by-make/[make]/[model]'
                      as={`/search-by-make/${post.make}/${encodeURIComponent(post.model)}`}
                      title={`${post.make} ${post.model} spare parts`}
                      className="block border border-blue-800 hover:border-blue-900 bg-white rounded-sm h-full p-3 text-center"
                    >
                      <span className="text-center text-black text-lg font-medium hover:text-gray-800 p-2 xs:p-0 font-sans underline ">
                        {make} {post.model.replace('%2F', '/')} parts
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
        <div className="text-center mt-2 text-red-400 text-sm xs:text-xs py-5">
          **Model not found above?
          <Link href="/get-in-touch">
            <nobr className="text-blue-500 text-sm underline">
              {' '}
              Get in touch with us {'>>'}**
            </nobr>
          </Link>{' '}
        </div>


        <div className="text-center">
          {make === 'Honda' ? <HondaOfferButton /> : <></>}
        </div>


        <section aria-labelledby="featured-deals" className="mt-10 xxs:mx-3 xs:mx-3 md:mx-5 lg:max-w-4xl lg:mx-auto">
          <h2
            id="featured-deals"
            className={`text-4xl md:text-3xl lg:text-3xl font-bold xs:text-2xl xxs:text-2xl py-5 ${playfair_display.className}`}
          >
            Featured Deals on{" "}
            <span className="text-blue-600">
              {make}
            </span>
          </h2>

          <ul className="grid grid-cols-5 xxs:grid-cols-2 gap-2 s:grid-cols-1 xs:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
            {images.map((item, index) => (
              <li key={index} className="list-none border-2 p-5 relative">
                {/* Sale badge */}
                <span className="absolute top-0 right-0 text-sm font-bold text-white bg-red-600 rounded-l-xl rounded-r-xl p-1">
                  Sale!
                </span>

                <h3 className={`text-xl xl:text-2xl xxl:text-2xl font-bold font-sans ${playfair_display.className}`}>{item.name}</h3>

                <hr className="py-1" />

                {/* Product image */}
                <Image
                  src={item.images}
                  alt={item.alt}
                  height={250}
                  width={250}
                  className="object-none object-center p-1"
                  priority
                />

                {/* CTA */}
                <Link
                  href={item.link}
                  title={`${make} ${item.name}`}
                  className="items-center justify-center px-8 py-2 xl:text-xl border border-transparent font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-2 md:text-md md:px-5 xs:py-2 xs:text-xs xs:my-2 xxs:text-sm xxs:my-2 s:text-sm s:my-2 focus:filter brightness-125 mt-3 block text-center"
                >
                  Inquire Now
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10 shadow-sm mx-4 md:mx-4 lg:max-w-4xl lg:mx-auto xl:mx-10 bg-bglight px-20 xs:px-3 xxs:px-3">
          <h2 className={`text-4xl md:text-3xl xs:text-2xl xxs:text-xl sm:text-2xl font-bold mx-auto my-10 ${playfair_display.className}`}>
            Availability of <span className='text-blue-600'>{make} spare parts</span> in UAE
          </h2>

          <ul className="grid grid-cols-4 md:grid-cols-3 sm:grid-cols-4 xs:grid-cols-2 xxs:grid-cols-3 gap-3 xs:gap-1 mt-10">
            {baseCity.map((post, i) => (
              <li key={i}>
                <Link
                  href="/search-by-brands-in-uae/[make]/[city]"
                  as={'/search-by-brands-in-uae/' + make + "/" + post.city}
                  title={make + ' spare parts ' + post.city}
                  className="block border border-blue-800 hover:border-blue-900 bg-white rounded-sm h-full p-3 text-center"
                >
                  <span className="text-center text-black text-lg font-medium hover:text-gray-800 p-2 xs:p-0 font-sans underline ">
                    {post.city}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
        <TenEntries />
        <PartsAccordion make={make} />
        <section className='xs:px-3 xxs:px-3 md:px-3 lg:max-w-4xl lg:mx-auto'>
          <h3 className={`text-3xl xs:text-2xl font-semibold mx-auto my-5 xs:my-3 xxs:my-3 sm:my-3 md:my-4 ${playfair_display.className}`}>Why EMIRATESCAR?</h3>
          <p className={`text-xl font-sans text-gray-700 mx-auto xs:text-lg xl:text-lg xxs:text-lg ${firaSans.className}`}>
            Emirates-car.com is the online dealer in <span className='text-blue-600'>{make}{' '}
            </span> spare parts and for any car brands running on roads
            of UAE. We find the correct used, genuine (otherwise
            called OEM parts) and aftermarket parts that matches your fitment. We have
            experienced professional who can find the parts at affordable and
            reasonable price. We deal in Used, Genuine {make} {' '} parts and Aftermarket {make} {' '}
            parts such as Engine parts, Mechanical parts, Electrical and
            Electronic parts, Body parts and Lights, AC parts and Service and
            Maintenance parts.
          </p>
          <p className={`text-xl font-sans text-gray-700 mx-auto xs:text-lg xl:text-lg xxs:text-lg mt-3 ${firaSans.className}`}>
            You can inquire {make} {' '} spare parts by simply
            submitting the online inquiry form{' '}
            <Link
              href="/"
              target="_newtab"
              className="text-blue-500 underline hover:text-blue-900"
              title={make + ' parts'}
            >
              here
            </Link>
            . You can get callback or whatsapp chat or email after submitting your
            form inquiry.
          </p>
          {description.length > 0 ? <p
            className={`text-xl font-sans text-gray-700 mx-auto xs:text-lg xl:text-lg xxs:text-lg mt-3 ${firaSans.className}`}
            dangerouslySetInnerHTML={{ __html: description || '' }}
          ></p> : <></>}

          <p className={`text-xl font-sans text-gray-700 mx-auto xs:text-lg xl:text-lg xxs:text-lg mt-3 ${firaSans.className}`}>
            We deal with any country auto spare parts including{' '}
            <a href='/spare-parts/japanese-auto-spare-parts' className='text-blue-600'>Japanese</a>,
            {' '}<a href='/spare-parts/american-auto-spare-parts' className='text-blue-600'>American</a>,
            {' '}<a href='/spare-parts/german-auto-spare-parts' className='text-blue-600'>German</a>,
            {' '}<a href='/spare-parts/chinese-auto-spare-parts' className='text-blue-600'>Chinese</a>,
            {' '}<a href='/spare-parts/german-auto-spare-parts' className='text-blue-600'>German</a>,
            {' '}<a href='/spare-parts/korean-auto-spare-parts' className='text-blue-600'>Korean</a>,
            {' '}<a href='/spare-parts/french-auto-spare-parts' className='text-blue-600'>French</a>,
            {' '}<a href='/spare-parts/british-auto-spare-parts' className='text-blue-600'>Britain</a>,
            in UAE. We also operate in main cities such as
            {' '}<a href={`/search-by-brands-in-uae/${make}/Dubai`} className='text-blue-600'>Dubai</a>,
            {' '}<a href={`/search-by-brands-in-uae/${make}/Sharjah`} className='text-blue-600'>Sharjah</a>,
            {' '}<a href={`/search-by-brands-in-uae/${make}/Abu Dhabi`} className='text-blue-600'>Abu Dhabi</a>,
            {' '}<a href={`/search-by-brands-in-uae/${make}/Ajman`} className='text-blue-600'>Ajman</a>,
            {' '}<a href={`/search-by-brands-in-uae/${make}/Al Quoz`} className='text-blue-600'>Al Quoz</a>,
            {' '}<a href={`/search-by-brands-in-uae/${make}/Palm Jumeirah`} className='text-blue-600'>Palm Jumeirah</a>,
            {' '}<a href={`/search-by-brands-in-uae/${make}/Deira`} className='text-blue-600'>Deira</a>,
            etc. You can check our catalogue at{' '}
            <Link
              href="/catalogs"
              className="text-blue-400 underline"
              title={make}
            >
              /catalogs
            </Link>
            . We provide auto spare parts for any vehicles including :
          </p>
          <ul className={`list-disc text-xl font-sans text-gray-700 mx-auto xs:text-lg xl:text-lg xxs:text-lg mt-3 ${firaSans.className}`}>
            <li>New auto spare parts in uae</li>
            <li>Used auto spare parts in uae</li>
            <li>Genuine auto spare parts in uae</li>
            <li>Aftermarket auto spare parts in uae</li>
          </ul>
        </section>


        <section className='mx-3' aria-labelledby={`How to buy ${make} parts`}>
          <h6 className={`text-4xl xs:text-2xl xxs:text-2xl md:text-3xl text-blue-600 font-semibold mx-auto mt-10 ${playfair_display.className}`}>
            5 ways you can {make} find parts for your car.
          </h6>
          There are 5 ways you can try finding {make} spare parts for your car.
          <h5 className="text-xl xl:text-2xl xxl:text-2xl font-sans mx-auto my-5 font-bold">
            Traditional way its pros and cons
          </h5>
          <p className={`text-xl xl:text-2xl xxl:text-2xl font-sans text-gray-700 mx-auto my-5 ${firaSans.className}`}>
            You find a {make} spare parts shop nearby and go and purchase and the work
            is done. In this case, the pros is that you find nearby shop to have
            similar brands you have and that's it! you purchase it with ease. But
            the cons is when you don't find the nearby shop to have the car
            brand which you are using. There are shop who only deal with certain
            parts like the shop A sells only in honda, Mazda, BMW and shop B
            sells only Audi, Lincoln and Ferrari. So to see for next option, you
            can opt for shopping from Giant E-commerce company like Amazon,
            EBay, Flipkart etc.
          </p>
          <h5 className="text-xl xl:text-2xl xxl:text-2xl font-sans mx-auto my-5 font-bold">
            Giant E-commerce Company its pros and cons:
          </h5>
          <p className={`text-xl xl:text-2xl xxl:text-2xl font-sans text-gray-700 mx-auto my-5 ${firaSans.className}`}>
            If you don't find spare parts nearby your house location, generally
            we move on to search on internet. You search for top companies
            selling spare parts online and you end up in giant e-commerce
            company like Amazon, Flipkart,Ebay etc. Now you see the review of
            person who has already ordered spare parts. Most of the reviews says
            the parts were broken. These giant company has a very big logistics
            that they are vulnerable to be broken during or even get lost during
            the check-in process. So it is not always safe to buy spare parts
            from giant e-commerce company. Hence we see for other option which
            is the Local dealers.
          </p>
          <h5 className="text-xl xl:text-2xl xxl:text-2xl font-sans mx-auto my-5 font-bold">
            Local Dealers
          </h5>
          <p className={`text-xl xl:text-2xl xxl:text-2xl font-sans text-gray-700 mx-auto my-5 ${firaSans.className}`}>
            Local dealers are known through other person like through friends
            and family. Or he gives you his business card and he explains you
            directly the car brands he deals with. However with the current
            digital advancement, the local dealers are decreasing gradually. So
            we move to the next option to search on online marketplace.
          </p>

          <h5 className="text-xl xl:text-2xl xxl:text-2xl font-sans mx-auto my-5 font-bold">
            Online Marketplace (Only CONS!)
          </h5>
          <p className={`text-xl xl:text-2xl xxl:text-2xl font-sans text-gray-700 mx-auto my-5 ${firaSans.className}`}>
            Through Online marketplace we find spare parts for our car easily.
            But it also has lots of cons. If you search for very latest model
            used spare parts, it will not be available on marketplace. In this
            case you have to contact the car brand company directly. If you
            search for very old model, it will not be available with most of the
            car brands company itself due to numerous new brands being manufactured yearly. And also there are more spam issues
            reported from those who purchase from small vendor marketplace and
            also the larger companies. In this case you should go for Online
            dealer website.
          </p>

          <h5 className="text-xl xl:text-2xl xxl:text-2xl font-sans  mx-auto my-5 font-bold">
            Online Dealer Website ONLY PROS!
          </h5>
          <p className={`text-xl xl:text-2xl xxl:text-2xl font-sans text-gray-700 mx-auto my-5 ${firaSans.className}`}>
            Online dealers website is the easiest way to order spare parts. You
            visit a bunch of site online and submit your inquiries therein and
            dealers will contact you back through the contact information you
            submitted. If one website didnt reply you or didn't have stock, then other website will
            do. So there is plenty of website and options. Emirates-car.com is
            one such website which accept online inquiries. It deals with parts
            and accessories for honda accord, Honda civic and{' '}
            <a
              href={'/search-by-make/' + make}
              className="text-blue-500 underline hover:text-blue-900"
            >
              other honda models
            </a>
            , Infiniti models, BMW models, Audi models and many other brands.
            Visit to search parts you need.
          </p>
        </section>
        <section className="grid grid-cols-1  mt-10 mx-3">
          {/* Section heading */}
          <h3 className={`text-4xl md:text-2xl lg:text-3xl font-semibold xs:text-2xl xxs:text-2xl py-5 ${playfair_display.className}`}>
            List of Genuine & Aftermarket <span className='text-blue-600'>{make} spare parts</span>in UAE
          </h3>

          {/* Parts list */}
          <ul className="xs:grid xs:grid-cols-1 sm:grid sm:grid-cols-1 gap-2 md:w-full lg:mx-2 px-3">
            {partspost.map((post, i) => (
              <li key={i}>
                {make} {post.parts} price list
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>

  );
}
