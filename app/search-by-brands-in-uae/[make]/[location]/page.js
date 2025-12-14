import React from 'react';
import Hero_img from '../../../../public/img/car-spare-parts.png';
import TenEntries from '../../../../components/tenentries';
import Contents from '../../../../components/Contents';
import ABS from '../../../../public/img/honda-eighth-gen/Anti_Lock_Braking_System.webp';
import AirFilter from '../../../../public/img/honda-eighth-gen/Air_Filter.webp';
import AirSuspension from '../../../../public/img/honda-eighth-gen/Air_Suspension_Module.webp';
import AxleAssembly from '../../../../public/img/honda-eighth-gen/Axle_Assembly_Rear.webp';
import BrakePads from '../../../../public/img/honda-eighth-gen/Brake_Pads.webp';
import CatalyticConverter from '../../../../public/img/honda-eighth-gen/Catalytic_Converter.webp';
import CylinderHead from '../../../../public/img/honda-eighth-gen/Cylinder_Head.webp';
import Distributor from '../../../../public/img/honda-eighth-gen/Distributor.webp';
import Engine from '../../../../public/img/honda-eighth-gen/Engine.webp';
import ExhaustManifold from '../../../../public/img/honda-eighth-gen/Exhaust_Manifold.webp';
import GearBox from '../../../../public/img/honda-eighth-gen/Gearbox.webp';
import Grille from '../../../../public/img/honda-eighth-gen/Grille.webp';
import Headlight from '../../../../public/img/honda-eighth-gen/Headlight.webp';
import MasterCylinderKit from '../../../../public/img/honda-eighth-gen/Master_Cylinder.webp';
import Radiator from '../../../../public/img/honda-eighth-gen/Radiator.webp';
import RearBumper from '../../../../public/img/honda-eighth-gen/Rear_Bumper_Assembly.webp';
import ReverseLight from '../../../../public/img/honda-eighth-gen/Reverse_Light.webp';
import Rim from '../../../../public/img/honda-eighth-gen/Rim.webp';
import SeatBelt from '../../../../public/img/honda-eighth-gen/Seat_Belt.webp';
import ShockAbsorber from '../../../../public/img/honda-eighth-gen/Shock_Absorber.webp';
import SideMirror from '../../../../public/img/honda-eighth-gen/Side_Mirror.webp';
import SteeringWheel from '../../../../public/img/honda-eighth-gen/Steering_Wheel.webp';
import Wheel from '../../../../public/img/honda-eighth-gen/Wheel.webp';
import MudFlap from '../../../../public/img/honda-eighth-gen/Mud_Flap.webp';
import { getCity, getFormModel, getParts, getMake } from '../../../page';
import Image from 'next/image';
import FormComponent from '../../../../components/FormComponent';
import SearchModel from '../../../../components/SearchModel';
import Link from 'next/link';
import SearchCity from '../../../../components/SearchCity';
import Footer from '../../../../components/footer';
import HondaOfferButton from '../../../../components/HondaOfferButton';
import PartsAccordion from '../../../../components/Parts-Accordion';
import { redirect } from 'next/navigation';
import ProductFilter from './ProductFilter';
import products from "../../../../public/products.json"
import { Fira_Sans, Playfair_Display } from 'next/font/google';
import CarData from "../../../../public/lib/car-data.json"
import baseCityData from "../../../../public/lib/basecity.json"
export const revalidate = 1814400;
export const runtime = 'edge';
export const fetchCache = 'force-cache';
export const dynamicParams = false;

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

export async function generateStaticParams({ params }) {

  const excludedMakes = [
    'Acura', 'Buick', 'Eagle', 'Lotus', 'Plymouth', 'Pontiac', 'Saab', 'Subaru',
    'Alpha Romeo', 'Geo', 'Oldsmobile', 'Isuzu', 'Saturn', 'Corbin', 'Holden',
    'Spyker', 'Spyker Cars', 'Aston Martin', 'Panoz', 'Foose', 'Morgan', 'Aptera',
    'Smart', 'SRT', 'Roush Performance', 'Pagani', 'Mobility Ventures LLC',
    'RUF Automobile', 'Koenigsegg', 'Karma', 'Polestar', 'STI', 'Kandi', 'Abarth',
    'Dorcen', 'Foton', 'W Motors', 'Opel', 'Skoda', 'Hillman', 'Austin', 'Fillmore',
    'Maybach', 'Merkur', 'Rambler', 'Shelby', 'Studebaker', 'Great Wall GWM', 'Zeekr', 'ZNA', 'GAC', 'Gs7', 'Hongqi',
    'W Motor', 'JAC', 'Jaecoo', 'Jetour', 'TANK', 'Soueast', 'Zarooq Motors', 'Changan', 'Maxus', 'Haval', 'Zotye', 'Sandstorm',
    'Chery', 'Geely', 'BAIC', 'Bestune'
  ];

  try {
    const filtered = CarData.filter(car => !excludedMakes.includes(car.make));

    const uniqueMakes = Array.from(
      new Set(filtered.map(car => car.make))
    );

    const paths = [];
    uniqueMakes.forEach(make => {
      baseCityData.forEach(location => {
        paths.push({
          make,
          location: location.city,
        });
      });
    });

    return paths;
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}


export async function generateMetadata({ params }) {
  const { make, location } = params;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `Do you sell genuine ${make} spare parts in ${location}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Yes, we supply genuine OEM ${make} parts, as well as used and aftermarket options to suit your budget.`
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
        "name": `Do you deliver ${make} parts across ${location}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Yes, we deliver ${make} spare parts to Dubai, Abu Dhabi, Sharjah, Ajman, and other Emirates. International shipping is also available.`
        }
      },
      {
        "@type": "Question",
        "name": `How do I know if a part fits my ${make} in ${location}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `You can share your car's VIN or model details with us, and we will confirm compatibility before shipping.`
        }
      },
      {
        "@type": "Question",
        "name": `Do your ${make} in ${location} spare parts come with warranty?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Yes, all new and OEM ${make} spare parts come with a standard warranty. Used parts are tested but carry limited warranty.`
        }
      }
    ]
  };
  return {
    title: `Buy ${make} Spare Parts in ${decodeURIComponent(location)}, UAE -
      Best Prices`,
    description: `Buy ${make} - ${decodeURIComponent(
      location,
    )} auto spare parts Online and Get delivered Used, New, Genuine / OEM, Aftermarket in UAE`,
    openGraph: {
      images: 'https://www.emirates-car.com/favicon.png',
      title: `${make} Spare Parts in ${decodeURIComponent(location)}, UAE -
      Best Prices`,
      description: `Buy ${make} - ${decodeURIComponent(
        location,
      )} auto spare parts Online and Get delivered Used, New, Genuine / OEM, Aftermarket in UAE`,
      url: 'https://emirates-car.com/search-by-brands-in-uae/' + make + '/' + location,
      image: 'https://www.emirates-car.com/img/car-spare-parts.png',
      siteName: 'EMIRATESCAR',
      images: [
        {
          url: '/icon-192x192.png',
          width: 192,
          height: 192,
        },
        {
          url: '/icons/icon-512x512.png',
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
      title: `${make} - ${decodeURIComponent(
        location,
      )} Car Auto Spare Parts Order Online in UAE from Dubai -
      Best Prices`,
      url: 'https://www.emirates-car.com/search-by-brands-in-uae/' + make + '/' + location,
      description: `Buy ${make} - ${decodeURIComponent(
        location,
      )} auto spare parts Online and Get delivered Used, New, Genuine / OEM, Aftermarket in UAE`,
      images: ['/favicon.png'],
    },
    icons: {
      icon: '/favicon.png',
      shortcut: '/icons/icon-96x96.png',
      apple: '/icons/icon-192x192.png',
      other: {
        rel: 'apple-touch-icon-precomposed',
        url: '/icons/icon-152x152.png',
      },
    },
    alternates: {
      canonical: `https://www.emirates-car.com/search-by-brands-in-uae/${make}/${location}`,
    },
    category: `${make} ${decodeURIComponent(location)} auto spare parts`,

    other: {
      "script:ld+json": JSON.stringify(faqSchema),
    },
  };
}


async function getModel(make) {

  const filtered = CarData.filter(item => item.make === make);

  const uniqueObjectArray = [
    ...new Map(filtered.map(item => [item.model, item])).values(),
  ];

  return uniqueObjectArray;
}


async function getLocation(make) {
  const filtered = CarData.filter(item => item.make === make);

  const uniqueObjectArray = [
    ...new Map(filtered.map(item => [item.location, item])).values(),
  ];

  return uniqueObjectArray;
}

export default async function Cities({ params, searchParams }) {
  const { make, location } = params;
  const carmodel = await getModel(make);
  const partspost = await getParts();
  const cities = await getCity();
  const posts = await getMake();
  const modelsform = await getFormModel();

  const {
    "filter_car_parts[]": categories = [],
    "engine[]": engines = [],
    "compatibility[]": compats = [],
    search = ""
  } = searchParams;


  const selectedCategories = Array.isArray(categories) ? categories : [categories].filter(Boolean);
  const selectedEngines = Array.isArray(engines) ? engines : [engines].filter(Boolean);
  const selectedCompats = Array.isArray(compats) ? compats : [compats].filter(Boolean);
  const query = search?.toLowerCase() || "";

  const makeFiltered = products.filter(product =>
    product.compatibility?.some(c =>
      c.make.toLowerCase() === make.toLowerCase()
    )
  )

  const filtered = makeFiltered.filter(product => {
    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.includes(product.category);

    const matchesSearch =
      product.partname.toLowerCase().includes(query) ||
      product.partnumber.toLowerCase().includes(query) ||
      product.engine?.some(e => e.toLowerCase().includes(query)) ||
      product.compatibility?.some(c =>
        `${c.make} ${c.model} ${c.years ?? ""}`.toLowerCase().includes(query))

    const matchesEngine =
      selectedEngines.length === 0 || product.engine?.some(e => selectedEngines.includes(e));

    const matchesCompatibility =
      selectedCompats.length === 0 ||
      product.compatibility?.some(c => selectedCompats.includes(`${c.make} ${c.model} ${c.years ? `(${c.years})` : ""}`));
    return matchesCategory && matchesSearch && matchesEngine && matchesCompatibility;
  });

  const excludedMakes = [
    'Acura', 'Buick', 'Eagle', 'Lotus', 'Plymouth', 'Pontiac', 'Saab', 'Subaru',
    'Alpha Romeo', 'Geo', 'Oldsmobile', 'Isuzu', 'Saturn', 'Corbin', 'Holden',
    'Spyker', 'Spyker Cars', 'Aston Martin', 'Panoz', 'Foose', 'Morgan', 'Aptera',
    'Smart', 'SRT', 'Roush Performance', 'Pagani', 'Mobility Ventures LLC',
    'RUF Automobile', 'Koenigsegg', 'Karma', 'Polestar', 'STI', 'Kandi', 'Abarth',
    'Dorcen', 'Foton', 'W Motors', 'Opel', 'Skoda', 'Hillman', 'Austin', 'Fillmore',
    'Maybach', 'Merkur', 'Rambler', 'Shelby', 'Studebaker', 'Great Wall GWM', 'Zeekr', 'ZNA', 'GAC', 'Gs7', 'Hongqi',
    'W Motor', 'JAC', 'Jaecoo', 'Jetour', 'TANK', 'Soueast', 'Zarooq Motors', 'Changan', 'Maxus', 'Haval', 'Zotye', 'Sandstorm',
    'Chery', 'Geely', 'BAIC', 'Bestune'
  ];
  const haksMakes = ['Honda', 'Audi', 'Porsche', 'Volvo', 'Mini', 'Mercedes-Benz', 'Renault', 'Peugeot', 'Jaguar', 'Ford', 'Hummer', 'Dodge', 'GMC', 'Jeep', 'Lincoln']
  const isExcludedMake = excludedMakes.includes(make);
  if (excludedMakes.includes(make)) {
    redirect('/get-in-touch');
  }

  const images = [
    {
      images: ABS,
      name: `${make} ABS in ${decodeURIComponent(location)}`,
      alt: `${make} anti lock braking system ${decodeURIComponent(location)}`,
      link: '/search-by-part-name/Anti-Lock%20Brake%20Control%20Module%20(ABS)',
    },
    {
      images: AirFilter,
      name: `${make} Air Filter in ${decodeURIComponent(location)}`,
      alt: `${make} air filter ${decodeURIComponent(location)}`,
      link: '/get-in-touch',
    },
    {
      images: AirSuspension,
      name: `${make} Air Suspension in ${decodeURIComponent(location)}`,
      alt: `${make} Air suspension ${decodeURIComponent(location)}`,
      link: '/get-in-touch',
    },
    {
      images: AxleAssembly,
      name: `${make} Axle in ${decodeURIComponent(location)}`,
      alt: `${make} axle ${decodeURIComponent(location)}`,
      link: '/search-by-part-name/Axle%20Assembly%20(Front,%204WD)',
    },
    {
      images: BrakePads,
      name: `${make} Brake Pads in ${decodeURIComponent(location)}`,
      alt: `${make} brake pads ${decodeURIComponent(location)}`,
      link: '/get-in-touch',
    },
    {
      images: CatalyticConverter,
      name: `${make} Catalytic Convertor in ${decodeURIComponent(location)}`,
      alt: `${make} catalytic convertor ${decodeURIComponent(location)}`,
      link: '/get-in-touch',
    },
    {
      images: CylinderHead,
      name: `${make} Cylinder Head in ${decodeURIComponent(location)}`,
      alt: `${make} cylinder ${decodeURIComponent(location)}`,
      link: '/search-by-part-name/Cylinder%20Head)',
    },
    {
      images: Distributor,
      name: `${make} Distributor in ${decodeURIComponent(location)}`,
      alt: `${make} distributor ${decodeURIComponent(location)}`,
      link: '/search-by-part-name/Distributor',
    },
    {
      images: Engine,
      name: `${make} Engine in ${decodeURIComponent(location)}`,
      alt: `${make} Engine ${decodeURIComponent(location)}`,
      link: '/search-by-part-name/Engine%20Assembly',
    },
    {
      images: ExhaustManifold,
      name: `${make} Exhaust Manifold in ${decodeURIComponent(location)}`,
      alt: `${make} exhaust system ${decodeURIComponent(location)}`,
      link: '/search-by-part-name/Exhaust%20Manifold',
    },
    {
      images: GearBox,
      name: `${make} Gearbox / Transmission in ${decodeURIComponent(location)}`,
      alt: `${make} gearbox ${decodeURIComponent(location)}`,
      link: '/search-by-part-name/Transmission%20Control%20Module',
    },
    {
      images: Grille,
      name: `${make} grill in ${decodeURIComponent(location)}`,
      alt: `${make} grill ${decodeURIComponent(location)}`,
      link: '/search-by-part-name/Grille',
    },
    {
      images: Headlight,
      name: `${make} Headlight in ${decodeURIComponent(location)}`,
      alt: `${make} headlight bulb ${decodeURIComponent(location)}`,
      link: '/search-by-part-name/Headlight%20Assembly',
    },
    {
      images: MasterCylinderKit,
      name: `${make} Master Cylinder in ${decodeURIComponent(location)}`,
      alt: `${make} master cylinder ${decodeURIComponent(location)}`,
      link: '/search-by-part-name/Master%20Cylinder%20(Clutch)',
    },
    {
      images: MudFlap,
      name: `${make} Mud Flaps in ${decodeURIComponent(location)}`,
      alt: `${make} mud flaps ${decodeURIComponent(location)}`,
      link: '/get-in-touch',
    },
    {
      images: Radiator,
      name: `${make} Radiator in ${decodeURIComponent(location)}`,
      alt: `${make} radiator ${decodeURIComponent(location)}`,
      link: '/search-by-part-name/Radiator',
    },
    {
      images: RearBumper,
      name: `${make} Rear Bumper in ${decodeURIComponent(location)}`,
      alt: `${make} rear bumper ${decodeURIComponent(location)}`,
      link: '/search-by-part-name/Bumper%20Assembly%20(Rear)',
    },
    {
      images: ReverseLight,
      name: `${make} Reverse Light in ${decodeURIComponent(location)}`,
      alt: `${make} reverse light ${decodeURIComponent(location)}`,
      link: '/search-by-part-name/Reverse%20Light',
    },
    {
      images: Rim,
      name: `${make} Rims in ${decodeURIComponent(location)}`,
      alt: `${make} Rims for sale ${decodeURIComponent(location)}`,
      link: '/search-by-part-name/Rim',
    },
    {
      images: SeatBelt,
      name: `${make} Seat Belt in ${decodeURIComponent(location)}`,
      alt: `${make} seat belt ${decodeURIComponent(location)}`,
      link: '/search-by-part-name/Seat%20Belt',
    },
    {
      images: ShockAbsorber,
      name: `${make} Shock Absorber in ${decodeURIComponent(location)}`,
      alt: `${make} shock absorber ${decodeURIComponent(location)}`,
      link: '/search-by-part-name/Shock%20Absorber',
    },
    {
      images: SideMirror,
      name: `${make} Mirror in ${decodeURIComponent(location)}`,
      alt: `${make} mirrors ${decodeURIComponent(location)}`,
      link: '/search-by-part-name/Mirror%20(Rear%20View)',
    },
    {
      images: SteeringWheel,
      name: `${make} Steering Wheel in ${decodeURIComponent(location)}`,
      alt: `${make} steering wheel ${decodeURIComponent(location)}`,
      link: '/search-by-part-name/Steering%20Wheel',
    },
    {
      images: Wheel,
      name: `${make} wheels in ${decodeURIComponent(location)}`,
      alt: `${make} wheels ${decodeURIComponent(location)}`,
      link: '/search-by-part-name/Wheel',
    },
  ];
  return (
    <main className="d-flex justify-center pt-10 xs:pt-5 mx-2 font-sans">
      <div className="py-5 xxs:px-7 sm:px-7 s:py-6 lg:mx-6 md:mx-6 xs:mx-2 xxs:mx-2 max-w-7xl mx-auto">
        <div className="bg-backgroundlight rounded-sm">
          <div className="grid grid-cols-2 xs:grid xs:grid-cols-1 s:grid s:grid-cols-1 xs:text-center sm:grid sm:grid-cols-2 xxs:grid xxs:grid-cols-1 xs:pt-5 s:pt-5">
            <div>
              <div className="ml-8 md:ml-8 xs:ml-1 xxs:ml-4 xxs:mt-8 xs:px-5 sm:ml-6 lg:ml-1 xl:ml-20 sm:mx-auto mt-10 sm:mt-12 md:mt-10 lg:mt-20 lg:px-8 xl:mt-28 xs:mt-2 xs:text-left s:mt-2">
                <div className="lg:text-left">
                  <h1 className="mt-3 text-3xl lg:text-4xl sm:text-lg xs:text-xl xxs:text-xl md:text-xl font-head font-extrabold">
                    <span className="text-blue-600 xl:inline">

                      {encodeURIComponent(make)}
                    </span> Spare Parts in {decodeURIComponent(location)}, UAE&nbsp;| Used, New, Genuine & Aftermarket
                  </h1>
                  <p className="block xxl:text-xl sm:text-sm xs:text-base xxs:text-base md:text-lg lg:text-2xl font-medium font-poppins text-gray-800  lg:leading-tight pt-5">
                    Get High Quality {encodeURIComponent(make)}&nbsp; parts for all models — fast delivery across {decodeURIComponent(location)}, UAE&nbsp;
                  </p>
                  <div className="mt-5 sm:mt-5 xxs:my-5 xs:my-5 lg:justify-start">
                    <div className="py-3 px-4 sm:py-0 sm:px-0 w-1/2 lg:w-full xs:w-full xxs:w-3/4 xs:mx-auto s:w-full sm:w-3/4 md:w-full md:mx-auto md:px-0 md:py-0 xs:py-0 xs:px-0 xxs:px-0 xxs:py-0 lg:px-0 lg:py-0 xl:px-0 xl:py-0 xxl:px-0 xxl:py-0 rounded-lg shadow-md sm:shadow-none">
                      <a
                        href={'/search-by-brands-in-uae/' + make + '#myForm'}
                        title="vehicle parts online"
                        className="flex items-center justify-center py-2 xs:py-2 xxs:py-1 sm:py-0 text-xl sm:text-base xl:text-xl border border-transparent font-medium rounded-sm text-white bg-blue-600 hover:bg-blue-700 md:py-2 md:text-md md:text-lg md:px-5 xs:text-sm xxs:text-sm xxs:my-2 lg:my-2 s:text-sm s:my-2 focus:filter brightness-125"
                      >
                        Inquire Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="xxs:hidden xs:hidden hero_section_blob s:hidden">
              <Image src={Hero_img} alt={`${make} spare parts in ${decodeURIComponent(location)}`} priority />
            </div>
          </div>
        </div>
      </div>
      <section className='#myForm'>
        <FormComponent formsData={modelsform} postFilter={partspost} />
      </section>

      <div>
        <div className="bg-bglight">
          <h3 className="text-black text-4xl my-10 text-center md:text-2xl lg:text-2xl font-bold xs:text-xl xxs:text-2xl pt-10">
            Search{' '}
            <span className="text-blue-500">{encodeURIComponent(make)}</span>{' '}
            Spare parts in{' '}
            <span className="text-blue-500">
              {decodeURIComponent(location)}
            </span>
          </h3>
          <SearchModel make={make} car={carmodel} />
          <div className="grid grid-cols-4 md:grid-cols-3 lg:grid-cols-4 mx-10 md:mx-4 sm:mx-3 xs:grid xs:grid-cols-2 sm:grid sm:grid-cols-5 xxs:grid xxs:grid-cols-5 s:grid s:grid-cols-3 gap-1 xs:mx-4 s:mx-4 xxs:mx-4 md:ml-11 my-10 pb-10 font-sans">
            {carmodel.map((post, i) => (
              <div key={i}>
                <Link
                  href="/search-by-make/[make]/[model]"
                  as={'/search-by-make/' + post.make + '/' + post.model}
                  title={post.make + " " + post.model + ' spare parts ' + location}
                >
                  <div className="border-blue-800 h-full  hover:border-blue-900 bg-white rounded-sm">
                    <p className="text-center text-black text-sm font-medium hover:text-gray-800 p-2">
                      <span className='text-blue-600'>{make} {post.model}</span> {' '}
                      parts in{' '}
                      <span className='text-blue-600'>{decodeURIComponent(location)}</span>
                    </p>
                  </div>
                </Link>
              </div>
            ))}{' '}
          </div>
        </div>
      </div>

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

      <div>
        <div className="text-black text-4xl my-10 text-center md:text-2xl lg:text-2xl font-bold xs:text-xl xxs:text-2xl pt-10">
          Popular{' '}
          <span className="text-blue-500">
            Searched {encodeURIComponent(make)} Parts
          </span>{' '}
          in {decodeURIComponent(location)}
        </div>
        <div className="grid grid-cols-5 sm:gril-cols-2 xxs:grid-cols-2 gap-2 s:grid-cols-2 xs:grid-cols-1 px-5 xs:px-2 xxs:px-2 md:grid-cols-3 lg:grid-cols-3 max-w-7xl mx-auto">
          {images.map((i, k) => (
            <div key={k} className="border-2 p-5 relative bg-gray-200">
              <sup className="absolute top-0 right-0 text-xs font-bold text-white bg-red-600 rounded-sm p-1">
                Sale!
              </sup>
              <div className="h-50 flex justify-center">
                <div className="text-lg font-bold font-sans xs:text-base">
                  {i.name}
                </div>
              </div>

              <Image
                src={i.images}
                alt={i.alt}
                height={250}
                width={250}
                className="object-none object-center p-1"
                priority
              />

              <Link
                href={i.link}
                className="flex items-center justify-center px-8 py-2 my-5 text-lg border border-transparent font-medium rounded-sm text-white bg-blue-600 hover:bg-blue-700 md:py-2 md:text-lg md:px-5 xs:py-2 xs:text-xs xs:my-2 xxs:text-sm xxs:my-2 s:text-sm s:my-2 focus:filter brightness-125"
                title={i.name}
              >
                Inquire Now
              </Link>
            </div>
          ))}
        </div>
      </div>
      <TenEntries />

      <section
        aria-labelledby={`all-${make}-brands`}
        className="mt-10 shadow-sm mx-4 md:mx-4 lg:max-w-4xl lg:mx-auto xl:mx-10 bg-bglight px-5 md:px-20 lg:px-10"
      >
        <h2
          id={`all-${make}-brands`}
          className={`text-4xl md:text-3xl lg:text-3xl xs:text-2xl xxs:text-2xl font-semibold py-5 ${playfair_display.className}`}
        >
          Used, Genuine & Aftermarket parts for{" "}
          <span className="text-blue-600">{make}</span> spare parts
        </h2>

        <ul className="grid grid-cols-6 md:grid-cols-5 xs:grid-cols-2 xxs:grid-cols-3 sm:grid-cols-3 xs:gap-2 xxs:gap-2 sm:gap-2 gap-4 my-10">
          {posts.map((p, i) => (
            <li key={i} className="list-none">
              <Link
                href="/search-by-brands-in-uae/[make]/[location]"
                as={'/search-by-brands-in-uae/' + p.make + '/' + location}
                title={p.make + ' spare parts in ' + location}
                className="flex flex-col items-center justify-center border hover:border-blue-600 p-3 rounded-sm bg-white"
              >
                <Image
                  alt={`${p.make} parts`}
                  src={`/img/car-logos/${p.img}`}
                  height={90}
                  width={90}
                  className="object-contain"
                  priority
                />
                <span className={`mt-2 px-3 py-1 text-sm xl:text-2xl xxl:text-2xl font-medium font-sans text-white bg-blue-600 rounded-sm hover:bg-blue-700 text-center w-max ${firaSans.className}`}>
                  {p.make}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <PartsAccordion make={make} location={location} />
      <Contents />
    </main>
  );
}
