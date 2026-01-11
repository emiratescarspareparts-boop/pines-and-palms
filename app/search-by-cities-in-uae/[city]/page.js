import Link from 'next/link';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Contents from '../../../components/Contents';
import CarData from "../../../public/lib/car-data.json"
import CitiesData from "../../../public/lib/cities.json"
import PartsData from "../../../public/lib/parts.json"
import FormOnly from '../../../components/FormOnly';
import { Fira_Sans, Playfair_Display } from 'next/font/google';
import { MapPin } from 'lucide-react';
import DubaiContent from './DubaiContent';
import SearchCity from '../../../components/SearchCity';
export const revalidate = 86400;
export const runtime = 'nodejs';
export const dynamicParams = false;

const firaSans = Fira_Sans({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fira-sans',
});

const playfair_display = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair-display',
});

function getMake() {
  const uniqueMakes = {};
  for (let i = 0; i < CarData.length; i++) {
    const car = CarData[i];
    if (!uniqueMakes[car.make]) {
      uniqueMakes[car.make] = car;
    }
  }
  return Object.values(uniqueMakes);
}

const excludedMakes = [
  'Buick', 'Eagle', 'Lotus', 'Plymouth', 'Pontiac', 'Saab', 'Subaru',
  'Geo', 'Oldsmobile', 'Isuzu', 'Saturn', 'Corbin', 'Holden',
  'Spyker', 'Spyker Cars', 'Aston Martin', 'Panoz', 'Foose', 'Morgan', 'Aptera',
  'Smart', 'SRT', 'Roush Performance', 'Pagani', 'Mobility Ventures LLC',
  'RUF Automobile', 'Koenigsegg', 'Karma', 'Polestar', 'STI', 'Kandi', 'Abarth',
  'Dorcen', 'Foton', 'W Motors', 'Opel', 'Skoda', 'Hillman', 'Austin', 'Fillmore',
  'Maybach', 'Merkur', 'Rambler', 'Shelby', 'Studebaker', 'Great Wall GWM', 'Zeekr', 'ZNA', 'GAC', 'Gs7', 'Hongqi',
  'W Motor', 'JAC', 'Jaecoo', 'Jetour', 'TANK', 'Soueast', 'Zarooq Motors', 'Changan', 'Maxus', 'Haval', 'Zotye', 'Sandstorm',
  'Chery', 'Geely', 'BAIC', 'Bestune'
];


export function generateStaticParams() {
  try {
    const params = [];

    for (let i = 0; i < CitiesData.length; i++) {
      const item = CitiesData[i];

      if (!item || !item.city) continue;

      params.push({
        city: item.city,
      });
    }

    return params;
  } catch (error) {
    console.error("Error generating static params from JSON:", error);
    return [];
  }
}



export function generateMetadata({ params }) {
  const { city } = params;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Auto Spare Parts Sales",
        "name": `Online Auto Spare Parts in ${city}`,
        "url": `https://www.emirates-car.com/search-by-cities-in-uae/${encodeURIComponent(city)}`,
        "areaServed": {
          "@type": "City",
          "name": `${city}`,
          "url": `https://www.emirates-car.com/search-by-cities-in-uae/${encodeURIComponent(city)}`
        },
        "provider": {
          "@type": "LocalBusiness",
          "name": "EMIRATESCAR"
        }
      }
    ]
  }
  return {
    title: `Auto spare parts in ${decodeURIComponent(city)}, Order Online from Dubai Dealers UAE - Best Prices`,
    description: `Used, New, Genuine / Original / OEM, Aftermarket car Online in ${decodeURIComponent(city)} UAE`,
    openGraph: {
      images: '/favicon.png',
      title: `Auto spare parts Order Online from Dubai Dealers in ${decodeURIComponent(city)}, UAE - Best Prices |
          Emirates-car.com`,
      description: `Used, New, Genuine / Original / OEM, Aftermarket auto spare parts Online in ${decodeURIComponent(city)}  uae`,
      url: 'https://www.emirates-car.com/search-by-cities-in-uae/' + city,
      image: 'https://emirates-car.com/img/car-spare-parts.png',
      siteName: 'EMIRATESCAR',
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
      title: `Quick Car Auto Spare Parts Order Online in ${decodeURIComponent(city)} (UAE) |
          Emirates-car.com`,
      url: 'https://www.emirates-car.com/search-by-cities-in-uae/' + city,
      description: `Buy Online and Get delivered Used, New, Genuine / Original / OEM, Aftermarket auto spare parts Online in ${decodeURIComponent(city)}  uae`,
      images: ['https://emirates-car.com/favicon.png'],
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
    category: `Auto spare parts in ${decodeURIComponent(city)}`,
    alternates: {
      canonical: `https://www.emirates-car.com/search-by-cities-in-uae/${city}`,
    },
    keywords:
      'auto parts in ' +
      city +
      ', ' +
      'car parts in' +
      city +
      ', ' +
      'Spare parts in ' +
      city +
      ', auto spare parts, emirates auto parts',
    other: {
      "script:ld+json": JSON.stringify(schema),
    },
  };
}

function getCityData(city) {
  const decodedCity = decodeURIComponent(city);

  for (let i = 0; i < CitiesData.length; i++) {
    const item = CitiesData[i];

    if (item && item.city === decodedCity) {
      return item;
    }
  }

  return null;
}

export default function City({ params }) {
  const cityData = getCityData(params.city);

  if (!cityData) {
    notFound();
  }

  const makedatas = getMake();
  const partsposts = PartsData;
  const modelsform = CarData;
  const cities = CitiesData;

  return (
    <div className='max-w-7xl mx-auto'>
      <h1 className={`text-4xl xxs:text-2xl xs:text-2xl sm:text-2xl text-center font-bold text-gray-900 my-6 ${playfair_display.className}`}>
        Search Genuine, OEM & Used Auto parts in{' '}
        <span className="text-blue-700 block mt-2">{cityData.city}</span>
      </h1>
      <header
        className="px-4 xxs:px-2 xs:px-2 s:px-2"
        aria-label="Spare parts by country of origin"
      >
        <div >
          <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-2 xxl:grid-cols-2 lg:grid-cols-2 gap-8 xs:gap-2 xxs:gap-2 xxs:p-2 xs:p-2 sm:p-4 p-8">
            {/* Left Side - Your Form Component */}
            <div className="order-1 md:order-1">
              <FormOnly formsData={modelsform} />
            </div>

            {/* Right Side - H1 and CTA */}
            <div className="order-2 md:order-2 flex flex-col justify-center">
              <iframe
                src={cityData.link}
                className="w-full h-full pointer-events-none"
                allowFullScreen
                loading="lazy"
                title="Location Map"
              ></iframe>
            </div>
          </div>
        </div>
      </header>

      <section aria-labelledby='list of towns and cities in dubai'>
        {cityData.city === "Dubai" &&
          <div>
            <h3 className="text-black text-4xl my-10 text-center md:text-2xl lg:text-2xl font-bold xs:text-xl xxs:text-2xl pt-10">
              Discover Car Parts in Dubai
            </h3>

            <div className="grid grid-cols-5 md:grid-cols-4 lg:grid-cols-5 mx-10 md:mx-4 sm:mx-3 xs:grid xs:grid-cols-2 sm:grid sm:grid-cols-3 xxs:grid xxs:grid-cols-2 s:grid s:grid-cols-3 gap-1 xs:mx-4 s:mx-4 xxs:mx-4 md:ml-11 my-10 pb-10 font-sans">
              <div className={`flex flex-1 text-center m-1 text-sm xl:text-xl xxl:text-xl font-medium font-sans rounded-sm w-max ${firaSans.className}  rounded-sm`}>
                <MapPin size={32} color="darkblue" /> Downtown Dubai
              </div>
              <div className={`flex flex-1 text-center m-1 text-sm xl:text-xl xxl:text-xl font-medium font-sans rounded-sm w-max ${firaSans.className}  rounded-sm`}>
                <MapPin size={32} color="darkblue" /> Palm Jumeirah
              </div>
              <div className={`flex flex-1 text-center m-1 text-sm xl:text-xl xxl:text-xl font-medium font-sans rounded-sm w-max ${firaSans.className}  rounded-sm`}>
                <MapPin size={32} color="darkblue" /> Barsha
              </div>
              <div className={`flex flex-1 text-center m-1 text-sm xl:text-xl xxl:text-xl font-medium font-sans rounded-sm w-max ${firaSans.className}  rounded-sm`}>
                <MapPin size={32} color="darkblue" /> Dubai Silicon Oasis
              </div>
              <div className={`flex flex-1 text-center m-1 text-sm xl:text-xl xxl:text-xl font-medium font-sans rounded-sm w-max ${firaSans.className}  rounded-sm`}>
                <MapPin size={32} color="darkblue" /> Dubai Media City
              </div>
              <div className={`flex flex-1 text-center m-1 text-sm xl:text-xl xxl:text-xl font-medium font-sans rounded-sm w-max ${firaSans.className}  rounded-sm`}>
                <MapPin size={32} color="darkblue" /> Business Bay
              </div>
              <div className={`flex flex-1 text-center m-1 text-sm xl:text-xl xxl:text-xl font-medium font-sans rounded-sm w-max ${firaSans.className}  rounded-sm`}>
                <MapPin size={32} color="darkblue" /> Dubai Marina
              </div>
              <div className={`flex flex-1 text-center m-1 text-sm xl:text-xl xxl:text-xl font-medium font-sans rounded-sm w-max ${firaSans.className}  rounded-sm`}>
                <MapPin size={32} color="darkblue" /> Za'abeel
              </div>
              <div className={`flex flex-1 text-center m-1 text-sm xl:text-xl xxl:text-xl font-medium font-sans rounded-sm w-max ${firaSans.className}  rounded-sm`}>
                <MapPin size={32} color="darkblue" /> Al Twar
              </div>
              <div className={`flex flex-1 text-center m-1 text-sm xl:text-xl xxl:text-xl font-medium font-sans rounded-sm w-max ${firaSans.className}  rounded-sm`}>
                <MapPin size={32} color="darkblue" /> Mirdif
              </div>
              <div className={`flex flex-1 text-center m-1 text-sm xl:text-xl xxl:text-xl font-medium font-sans rounded-sm w-max ${firaSans.className}  rounded-sm`}>
                <MapPin size={32} color="darkblue" /> Deira
              </div>
              <div className={`flex flex-1 text-center m-1 text-sm xl:text-xl xxl:text-xl font-medium font-sans rounded-sm w-max ${firaSans.className}  rounded-sm`}>
                <MapPin size={32} color="darkblue" /> Bur Dubai
              </div>
              <div className={`flex flex-1 text-center m-1 text-sm xl:text-xl xxl:text-xl font-medium font-sans rounded-sm w-max ${firaSans.className}  rounded-sm`}>
                <MapPin size={32} color="darkblue" /> Karama
              </div>
              <div className={`flex flex-1 text-center m-1 text-sm xl:text-xl xxl:text-xl font-medium font-sans rounded-sm w-max ${firaSans.className}  rounded-sm`}>
                <MapPin size={32} color="darkblue" /> Al Nahda
              </div>
              <div className={`flex flex-1 text-center m-1 text-sm xl:text-xl xxl:text-xl font-medium font-sans rounded-sm w-max ${firaSans.className}  rounded-sm`}>
                <MapPin size={32} color="darkblue" /> Al Qusais
              </div>
              <div className={`flex flex-1 text-center m-1 text-sm xl:text-xl xxl:text-xl font-medium font-sans rounded-sm w-max ${firaSans.className}  rounded-sm`}>
                <MapPin size={32} color="darkblue" /> Nad Al Hammar
              </div>
              <div className={`flex flex-1 text-center m-1 text-sm xl:text-xl xxl:text-xl font-medium font-sans rounded-sm w-max ${firaSans.className}  rounded-sm`}>
                <MapPin size={32} color="darkblue" /> Al Khawaneej
              </div>
              <div className={`flex flex-1 text-center m-1 text-sm xl:text-xl xxl:text-xl font-medium font-sans rounded-sm w-max ${firaSans.className}  rounded-sm`}>
                <MapPin size={32} color="darkblue" /> Mizhar
              </div>
              <div className={`flex flex-1 text-center m-1 text-sm xl:text-xl xxl:text-xl font-medium font-sans rounded-sm w-max ${firaSans.className}  rounded-sm`}>
                <MapPin size={32} color="darkblue" /> Ras Al Khor
              </div>
              <div className={`flex flex-1 text-center m-1 text-sm xl:text-xl xxl:text-xl font-medium font-sans rounded-sm w-max ${firaSans.className}  rounded-sm`}>
                <MapPin size={32} color="darkblue" /> Abu Hail
              </div>
              <div className={`flex flex-1 text-center m-1 text-sm xl:text-xl xxl:text-xl font-medium font-sans rounded-sm w-max ${firaSans.className}  rounded-sm`}>
                <MapPin size={32} color="darkblue" /> Hatta
              </div>
              <div className={`flex flex-1 text-center m-1 text-sm xl:text-xl xxl:text-xl font-medium font-sans rounded-sm w-max ${firaSans.className}  rounded-sm`}>
                <MapPin size={32} color="darkblue" /> Al Awir
              </div>
              <div className={`flex flex-1 text-center m-1 text-sm xl:text-xl xxl:text-xl font-medium font-sans rounded-sm w-max ${firaSans.className}  rounded-sm`}>
                <MapPin size={32} color="darkblue" /> Dubai South
              </div>
              <div className={`flex flex-1 text-center m-1 text-sm xl:text-xl xxl:text-xl font-medium font-sans rounded-sm w-max ${firaSans.className}  rounded-sm`}>
                <MapPin size={32} color="darkblue" /> Wadi al Safa
              </div>
              <div className={`flex flex-1 text-center m-1 text-sm xl:text-xl xxl:text-xl font-medium font-sans rounded-sm w-max ${firaSans.className}  rounded-sm`}>
                <MapPin size={32} color="darkblue" /> Damac Hills
              </div>
              <div className={`flex flex-1 text-center m-1 text-sm xl:text-xl xxl:text-xl font-medium font-sans rounded-sm w-max ${firaSans.className}  rounded-sm`}>
                <MapPin size={32} color="darkblue" /> Dubai Motor City
              </div>
              <div className={`flex flex-1 text-center m-1 text-sm xl:text-xl xxl:text-xl font-medium font-sans rounded-sm w-max ${firaSans.className}  rounded-sm`}>
                <MapPin size={32} color="darkblue" /> Arabian Ranches
              </div>
              <div className={`flex flex-1 text-center m-1 text-sm xl:text-xl xxl:text-xl font-medium font-sans rounded-sm w-max ${firaSans.className}  rounded-sm`}>
                <MapPin size={32} color="darkblue" /> Discovery Gardens
              </div>
              <div className={`flex flex-1 text-center m-1 text-sm xl:text-xl xxl:text-xl font-medium font-sans rounded-sm w-max ${firaSans.className}  rounded-sm`}>
                <MapPin size={32} color="darkblue" /> Dubai International City
              </div>
              <div className={`flex flex-1 text-center m-1 text-sm xl:text-xl xxl:text-xl font-medium font-sans rounded-sm w-max ${firaSans.className}  rounded-sm`}>
                <MapPin size={32} color="darkblue" /> Dubai Festival City
              </div>
              <div className={`flex flex-1 text-center m-1 text-sm xl:text-xl xxl:text-xl font-medium font-sans rounded-sm w-max ${firaSans.className}  rounded-sm`}>
                <MapPin size={32} color="darkblue" /> Al Mankhool
              </div>
              <div className={`flex flex-1 text-center m-1 text-sm xl:text-xl xxl:text-xl font-medium font-sans rounded-sm w-max ${firaSans.className}  rounded-sm`}>
                <MapPin size={32} color="darkblue" /> Muhaisnah
              </div>
              <div className={`flex flex-1 text-center m-1 text-sm xl:text-xl xxl:text-xl font-medium font-sans rounded-sm w-max ${firaSans.className}  rounded-sm`}>
                <MapPin size={32} color="darkblue" /> Muweileh
              </div>
              <div className={`flex flex-1 text-center m-1 text-sm xl:text-xl xxl:text-xl font-medium font-sans rounded-sm w-max ${firaSans.className}  rounded-sm`}>
                <MapPin size={32} color="darkblue" /> Jafiliyah
              </div>
              <div className={`flex flex-1 text-center m-1 text-sm xl:text-xl xxl:text-xl font-medium font-sans rounded-sm w-max ${firaSans.className}  rounded-sm`}>
                <MapPin size={32} color="darkblue" /> Al Raffa
              </div>
              <div className={`flex flex-1 text-center m-1 text-sm xl:text-xl xxl:text-xl font-medium font-sans rounded-sm w-max ${firaSans.className}  rounded-sm`}>
                <MapPin size={32} color="darkblue" /> Oud Metha
              </div>
              <div className={`flex flex-1 text-center m-1 text-sm xl:text-xl xxl:text-xl font-medium font-sans rounded-sm w-max ${firaSans.className}  rounded-sm`}>
                <MapPin size={32} color="darkblue" /> Al Sufouh
              </div>
              <div className={`flex flex-1 text-center m-1 text-sm xl:text-xl xxl:text-xl font-medium font-sans rounded-sm w-max ${firaSans.className}  rounded-sm`}>
                <MapPin size={32} color="darkblue" /> Emirates Hills
              </div>
              <div className={`flex flex-1 text-center m-1 text-sm xl:text-xl xxl:text-xl font-medium font-sans rounded-sm w-max ${firaSans.className}  rounded-sm`}>
                <MapPin size={32} color="darkblue" /> Al Furjan
              </div>
              <div className={`flex flex-1 text-center m-1 text-sm xl:text-xl xxl:text-xl font-medium font-sans rounded-sm w-max ${firaSans.className}  rounded-sm`}>
                <MapPin size={32} color="darkblue" /> Al Barari
              </div>
              <div className={`flex flex-1 text-center m-1 text-sm xl:text-xl xxl:text-xl font-medium font-sans rounded-sm w-max ${firaSans.className}  rounded-sm`}>
                <MapPin size={32} color="darkblue" /> Bluewaters Island
              </div>
              <div className={`flex flex-1 text-center m-1 text-sm xl:text-xl xxl:text-xl font-medium font-sans rounded-sm w-max ${firaSans.className}  rounded-sm`}>
                <MapPin size={32} color="darkblue" /> Dubai Hills
              </div>
              <div className={`flex flex-1 text-center m-1 text-sm xl:text-xl xxl:text-xl font-medium font-sans rounded-sm w-max ${firaSans.className}  rounded-sm`}>
                <MapPin size={32} color="darkblue" /> Umm Suqeim
              </div>
              <div className={`flex flex-1 text-center m-1 text-sm xl:text-xl xxl:text-xl font-medium font-sans rounded-sm w-max ${firaSans.className}  rounded-sm`}>
                <MapPin size={32} color="darkblue" /> JBR
              </div>
              <div className={`flex flex-1 text-center m-1 text-sm xl:text-xl xxl:text-xl font-medium font-sans rounded-sm w-max ${firaSans.className}  rounded-sm`}>
                <MapPin size={32} color="darkblue" /> Jumeirah Village Circle
              </div>
              <div className={`flex flex-1 text-center m-1 text-sm xl:text-xl xxl:text-xl font-medium font-sans rounded-sm w-max ${firaSans.className}  rounded-sm`}>
                <MapPin size={32} color="darkblue" /> Jumeirah Park
              </div>
              <div className={`flex flex-1 text-center m-1 text-sm xl:text-xl xxl:text-xl font-medium font-sans rounded-sm w-max ${firaSans.className}  rounded-sm`}>
                <MapPin size={32} color="darkblue" /> Jumeirah Lake Towers
              </div>
              <div className={`flex flex-1 text-center m-1 text-sm xl:text-xl xxl:text-xl font-medium font-sans rounded-sm w-max ${firaSans.className}  rounded-sm`}>
                <MapPin size={32} color="darkblue" /> MBR City
              </div>
              <div className={`flex flex-1 text-center m-1 text-sm xl:text-xl xxl:text-xl font-medium font-sans rounded-sm w-max ${firaSans.className}  rounded-sm`}>
                <MapPin size={32} color="darkblue" /> Tilal Al Ghaf
              </div>
              <div className={`flex flex-1 text-center m-1 text-sm xl:text-xl xxl:text-xl font-medium font-sans rounded-sm w-max ${firaSans.className}  rounded-sm`}>
                <MapPin size={32} color="darkblue" /> Dubailand
              </div>
              <div className={`flex flex-1 text-center m-1 text-sm xl:text-xl xxl:text-xl font-medium font-sans rounded-sm w-max ${firaSans.className}  rounded-sm`}>
                <MapPin size={32} color="darkblue" /> Al Jaddaf
              </div>
              <div className={`flex flex-1 text-center m-1 text-sm xl:text-xl xxl:text-xl font-medium font-sans rounded-sm w-max ${firaSans.className}  rounded-sm`}>
                <MapPin size={32} color="darkblue" /> Dubai Creek Harbour
              </div>
              <div className={`flex flex-1 text-center m-1 text-sm xl:text-xl xxl:text-xl font-medium font-sans rounded-sm w-max ${firaSans.className}  rounded-sm`}>
                <MapPin size={32} color="darkblue" /> MBR City
              </div>
              <div className={`flex flex-1 text-center m-1 text-sm xl:text-xl xxl:text-xl font-medium font-sans rounded-sm w-max ${firaSans.className}  rounded-sm`}>
                <MapPin size={32} color="darkblue" /> Al Bada
              </div>
              <div className={`flex flex-1 text-center m-1 text-sm xl:text-xl xxl:text-xl font-medium font-sans rounded-sm w-max ${firaSans.className}  rounded-sm`}>
                <MapPin size={32} color="darkblue" /> Al Satwa
              </div>
              <div className={`flex flex-1 text-center m-1 text-sm xl:text-xl xxl:text-xl font-medium font-sans rounded-sm w-max ${firaSans.className}  rounded-sm`}>
                <MapPin size={32} color="darkblue" /> Abu Hail
              </div>
              <div className={`flex flex-1 text-center m-1 text-sm xl:text-xl xxl:text-xl font-medium font-sans rounded-sm w-max ${firaSans.className}  rounded-sm`}>
                <MapPin size={32} color="darkblue" /> Golf City
              </div>
              <div className={`flex flex-1 text-center m-1 text-sm xl:text-xl xxl:text-xl font-medium font-sans rounded-sm w-max ${firaSans.className}  rounded-sm`}>
                <MapPin size={32} color="darkblue" /> Al Warqa
              </div>
              <div className={`flex flex-1 text-center m-1 text-sm xl:text-xl xxl:text-xl font-medium font-sans rounded-sm w-max ${firaSans.className}  rounded-sm`}>
                <MapPin size={32} color="darkblue" /> Nad al Sheba
              </div>
              <div className={`flex flex-1 text-center m-1 text-sm xl:text-xl xxl:text-xl font-medium font-sans rounded-sm w-max ${firaSans.className}  rounded-sm`}>
                <MapPin size={32} color="darkblue" /> Al Wasl
              </div>
              <div className={`flex flex-1 text-center m-1 text-sm xl:text-xl xxl:text-xl font-medium font-sans rounded-sm w-max ${firaSans.className}  rounded-sm`}>
                <MapPin size={32} color="darkblue" /> Trade Centre
              </div>
              <div className={`flex flex-1 text-center m-1 text-sm xl:text-xl xxl:text-xl font-medium font-sans rounded-sm w-max ${firaSans.className}  rounded-sm`}>
                <MapPin size={32} color="darkblue" /> Umm Ramool
              </div>
              <div className={`flex flex-1 text-center m-1 text-sm xl:text-xl xxl:text-xl font-medium font-sans rounded-sm w-max ${firaSans.className}  rounded-sm`}>
                <MapPin size={32} color="darkblue" /> Dubai Investment Park
              </div>
              <div className={`flex flex-1 text-center m-1 text-sm xl:text-xl xxl:text-xl font-medium font-sans rounded-sm w-max ${firaSans.className}  rounded-sm`}>
                <MapPin size={32} color="darkblue" /> Al Mamzar
              </div>
            </div>
          </div>}
        <div className="place-content-center mx-auto">
          <div className="p-3 shadow-md">
            <a
              href="#myForm"
              title="Inquire about vehicle parts online"
              className="flex items-center  w-3/4 mx-auto justify-center py-2 border border-transparent font-medium rounded-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              Inquire Now
            </a>
          </div>
        </div>

      </section>


      <section className="bg-bglight">
        <h3 className="text-black text-4xl my-10 text-center md:text-2xl lg:text-2xl font-bold xs:text-xl xxs:text-2xl pt-10">
          Search Car parts in <span className="text-blue-500">{cityData.city}</span>
        </h3>

        <div className="grid grid-cols-7 md:grid-cols-5 lg:grid-cols-7 mx-10 md:mx-4 sm:mx-3 xs:grid xs:grid-cols-2 sm:grid sm:grid-cols-5 xxs:grid xxs:grid-cols-3 s:grid s:grid-cols-3 gap-1 xs:mx-4 s:mx-4 xxs:mx-4 md:ml-11 my-10 pb-10 font-sans">
          {makedatas
            .filter((post) => !excludedMakes.includes(post.make))
            .map((post, i) => {
              const uaeCities = ['Abu Dhabi', 'Ajman', 'Al Ain', 'Al Quoz', 'Dubai', 'Ras Al Khaimah', 'Sharjah', 'Deira', 'Palm Jumeirah'];
              const isUAECity = uaeCities.includes(cityData.city);

              const href = isUAECity
                ? `/search-by-brands-in-uae/${post.make}/${cityData.city}`
                : `/search-by-make/${post.make}`;

              return (
                <div key={i}>
                  <Link
                    href={href}
                    title={post.make + ' spare parts ' + cityData.city}
                  >
                    <div className="border h-full hover:border-blue-600 py-3 bg-gray-100">
                      <div className="flex justify-center">
                        <Image
                          alt={post.make + ' spare parts ' + cityData.city}
                          src={'/img/car-logos/' + post.img}
                          className="object-scale-down shadow-xl"
                          height={50}
                          width={50}
                        />
                      </div>
                      <p className={`text-center p-2 font-bold text-base hover:text-gray-800 ${firaSans.className}`}>
                        {post.make}
                      </p>
                    </div>
                  </Link>
                </div>
              );
            })}
        </div>
      </section>
      <iframe
        src={cityData.link}
        className="w-full h-full  pointer-events-none"
        height={300}
        width="100%"
        allowFullScreen="null"
        loading="lazy"
      ></iframe>
      <section className="bg-bglight">
        <h3 className="text-black text-4xl my-10 text-center md:text-2xl lg:text-2xl font-bold xs:text-xl xxs:text-2xl pt-10">
          Search <span className="text-blue-500">{cityData.city}</span> Spare
          parts by Model
        </h3>
        <div aria-label='search spare parts in dubai'><SearchCity cities={cities} citypage={cityData.city} /></div>

        <div className="grid grid-cols-7 md:grid-cols-5 lg:grid-cols-7 mx-10 md:mx-4 sm:mx-3 xs:grid xs:grid-cols-2 sm:grid sm:grid-cols-3 xxs:grid xxs:grid-cols-3 s:grid s:grid-cols-3 gap-1 xs:mx-4 s:mx-4 xxs:mx-4 md:ml-11 my-10 pb-10 font-sans">
          {partsposts.map((post, i) => (
            <div key={i}>
              <Link
                href="/search-by-part-name/[parts]"
                as={'/search-by-part-name/' + post.parts}
                title={post.parts + ' in ' + cityData.city}
              >
                <div className="border-blue-800 h-full hover:border-blue-900 bg-white rounded-sm">
                  <p className={`text-center p-2 font-bold text-base hover:text-gray-800 ${firaSans.className}`} >
                    {post.parts}
                  </p>
                </div>
              </Link>
            </div>
          ))
          }
        </div >
      </section>
      <Contents />
    </div >
  );
}
