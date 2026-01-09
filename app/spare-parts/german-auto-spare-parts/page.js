import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Accordon from './Accordion';
import StaticCities from '../../../components/StaticCities';
import Contents from '../../../components/Contents';
import SearchMake from '../../../components/SearchMake';
import CarData from "../../../public/lib/car-data.json"
import { Fira_Sans, Playfair_Display } from 'next/font/google';
import products from "../../../public/products.json"
import Product from './Product';
import FormOnly from '../../../components/FormOnly';


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

const schema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "German Spare Parts",
  "about": {
    "@type": "Country",
    "name": "German"
  },
  "url": "https://www.emirates-car.com/spare-parts/german-auto-spare-parts",
  "description": "A comprehensive collection of Used, New, Genuine, OEM, Aftermarket spare parts for German car makes including Mercedes benz, BMW, Jaguar, Land Rover, Porche."
};


export const metadata = {
  title:
    'German Auto Spare Parts in UAE - New | Used | Genuine | Aftermarket | OEM',
  description:
    'Buy German Used, New, Genuine / Original / OEM, Aftermarket auto spare parts in UAE Body parts, Interior and exterior parts, suspension parts, headlight, fog lights and other lighting parts, performance parts and more',
  openGraph: {
    images: 'https://emirates-car.com/favicon.png',
    title:
      'German Auto Spare Parts in UAE - New | Used | Genuine | Aftermarket | OEM',
    description:
      'Buy German Used, New, Genuine / Original / OEM, Aftermarket auto spare parts in UAE Body parts, Interior and exterior parts, suspension parts, headlight, fog lights and other lighting parts, performance parts and more',
    url: 'https://www.emirates-car.com/spare-parts/german-auto-spare-parts',
    image: 'https://emirates-car.com/img/car-spare-parts.png',
    siteName: 'Emirates Auto Parts',
    images: [
      {
        url: 'https://emirates-car.com/icon-192x192.png',
        width: 192,
        height: 192,
      },
      {
        url: 'https://emirates-car.com/icons/icon-512x512.png',
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
    title:
      'German Auto Spare Parts in UAE - New | Used | Genuine | Aftermarket | OEM',
    url: 'https://www.emirates-car.com/spare-parts/german-auto-spare-parts',
    description:
      'Buy German Used, New, Genuine / Original / OEM, Aftermarket auto spare parts in UAE Body parts, Interior and exterior parts, suspension parts, headlight, fog lights and other lighting parts, performance parts and more',
    images: ['https://emirates-car.com/favicon.png'],
  },
  icons: {
    icon: 'https://emirates-car.com/favicon.png',
    shortcut: 'https://emirates-car.com/icons/icon-96x96.png',
    apple: 'https://emirates-car.com/icons/icon-192x192.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: 'https://emirates-car.com/icons/icon-152x152.png',
    },
  },
  alternates: {
    canonical: `https://www.emirates-car.com/spare-parts/german-auto-spare-parts}`,
  },
  category: 'german origin spare parts',
  other: {
    "script:ld+json": JSON.stringify(schema),
  },
};

export default function German() {
  const modelforms = CarData;

  const allowedMakes = ["Mercedes-Benz", "Audi", "BMW", "Land Rover", "Volkswagen", "Porsche", "Jaguar", "Volvo", "Bentley"];
  const allowedMakesLower = allowedMakes.map(m => m.toLowerCase());

  const makeModelFiltered = products.filter(product => {
    if (!product.compatibility) return false;

    return product.compatibility.some(c => {
      const compatMake = c.make?.toLowerCase();
      return compatMake && allowedMakesLower.includes(compatMake);
    });
  });

  return (
    <div className='max-w-7xl  mx-auto md:px-0 lg:px-0 xs:px-0 xxs:px-0 sm:px-2'>
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
                    German Auto Spare Parts
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

            <div className="xxs:hidden xs:hidden s:hidden">
              <Image
                src={'/img/car-logos/germanautoparts.png'}
                alt={'german spare parts'}
                className="ml-20 md:ml-5 lg:ml-8 lg:mt-10 xl:mt-10 xxl:mt-10 xl:ml-16 xxl:ml-16 shadow-slate-600 rounded-sm"
                width={300}
                height={300}
              />
            </div>
          </div>
        </div>
      </header>
      <div className='sm:max-w-xl lg:max-w-2xl md:max-w-xl xl:max-w-2xl xxl:max-w-2xl mx-auto xs:mx-3 xxs:mx-3 sm:mx-5'>
        <FormOnly formsData={modelforms} />
      </div>
      <section>
        {makeModelFiltered.length > 0 ? (
          <Product
            products={makeModelFiltered}
            allProducts={makeModelFiltered}
          />
        ) : (
          <></>
        )}
      </section>


      <h3 className="text-black text-4xl text-center md:text-2xl lg:text-2xl font-bold xs:text-xl xxs:text-2xl pt-10">
        Search for <span className="text-blue-500">German</span> Auto spare
        parts
      </h3>
      <SearchMake posts={modelforms} />
      <div className="bg-bglight max-w-7xl mx-auto font-sans">
        <div className="grid grid-cols-3 md:grid md:grid-cols-3 lg:grid-cols-3 md:mx-4 sm:mx-3 xs:grid xs:grid-cols-2 sm:grid sm:grid-cols-3 xxs:grid xxs:grid-cols-2 s:grid s:grid-cols-2 gap-1 xs:mx-4 s:mx-4 xxs:mx-4 md:ml-11 my-10 mx-10">
          <div>
            <Link href="/search-by-make/Mercedes-Benz">
              <div className="border h-full  hover:border-blue-600 py-3 ">
                <div className="flex justify-center">
                  <Image
                    alt="Mercedes Benz spare parts in uae"
                    src="/img/car-logos/mercedesbenz.webp"
                    className="object-scale-down "
                    height={50}
                    width={50}
                  />
                  <br />
                </div>
                <p className="text-center m-1 bg-darkblue hover:bg-blue-400  font-bold text-white text-sm hover:text-gray-800 rounded-sm">
                  Mercedes Benz
                </p>
              </div>
            </Link>
          </div>
          <div>
            <Link href="/search-by-make/BMW">
              <div className="border h-full  hover:border-blue-600 py-3 ">
                <div className="flex justify-center">
                  <Image
                    alt="BMW spare parts in uae"
                    src="/img/car-logos/BMW.webp"
                    className="object-scale-down "
                    height={50}
                    width={50}
                  />
                  <br />
                </div>
                <p className="text-center m-1 bg-darkblue hover:bg-blue-400  font-bold text-white text-sm hover:text-gray-800 rounded-sm">
                  BMW
                </p>
              </div>
            </Link>
          </div>
          <div>
            <Link href="/search-by-make/Volkswagen">
              <div className="border h-full  hover:border-blue-600 py-3 ">
                <div className="flex justify-center">
                  <Image
                    alt="Volkswagen spare parts in uae"
                    src="/img/car-logos/volkswagon.webp"
                    className="object-scale-down "
                    height={50}
                    width={50}
                  />
                  <br />
                </div>
                <p className="text-center m-1 bg-darkblue hover:bg-blue-400  font-bold text-white text-sm hover:text-gray-800 rounded-sm">
                  Volkswagen
                </p>
              </div>
            </Link>
          </div>
          <div>
            <Link href="/search-by-make/Jaguar">
              <div className="border h-full  hover:border-blue-600 py-3 ">
                <div className="flex justify-center">
                  <Image
                    alt="Jaguar spare parts in uae"
                    src="/img/car-logos/jaguar.webp"
                    className="object-scale-down "
                    height={50}
                    width={50}
                  />
                  <br />
                </div>
                <p className="text-center m-1 bg-darkblue hover:bg-blue-400  font-bold text-white text-sm hover:text-gray-800 rounded-sm">
                  Jaguar
                </p>
              </div>
            </Link>
          </div>
          <div>
            <Link href="/search-by-make/Land%20Rover">
              <div className="border h-full  hover:border-blue-600 py-3 ">
                <div className="flex justify-center">
                  <Image
                    alt="land rover spare parts in uae"
                    src="/img/car-logos/land_rover.webp"
                    className="object-scale-down "
                    height={50}
                    width={50}
                  />
                  <br />
                </div>
                <p className="text-center m-1 bg-darkblue hover:bg-blue-400  font-bold text-white text-sm hover:text-gray-800 rounded-sm">
                  Land Rover
                </p>
              </div>
            </Link>
          </div>
          <div>
            <Link href="/search-by-make/Porsche">
              <div className="border h-full  hover:border-blue-600 py-3 ">
                <div className="flex justify-center">
                  <Image
                    alt="Porsche spare parts in uae"
                    src="/img/car-logos/porsche.webp"
                    className="object-scale-down "
                    height={50}
                    width={50}
                  />
                  <br />
                </div>
                <p className="text-center m-1 bg-darkblue hover:bg-blue-400  font-bold text-white text-sm hover:text-gray-800 rounded-sm">
                  Porsche
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <Accordon />
      <StaticCities />

      <Contents />

    </div>
  );
}
