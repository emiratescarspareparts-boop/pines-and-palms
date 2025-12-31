import Social from '../../components/Social';
import Link from 'next/link';
import SearchCity from '../../components/SearchCity';
import { Fira_Sans, Playfair_Display } from 'next/font/google';
import CarData from "../../public/lib/car-data.json"
import CitiesData from "../../public/lib/cities.json"
import PartsData from "../../public/lib/parts.json"
import Image from 'next/image';
import FormOnly from '../../components/FormOnly';
import CountryMap from '../Countrysitemap';
export const revalidate = 1814400;
export const runtime = 'nodejs';
export const dynamicParams = false;

const firaSans = Fira_Sans({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fira-sans',
});

const grouped = {};

for (let i = 0; i < CitiesData.length; i++) {
  const baseCity = CitiesData[i].basecity;

  if (!grouped[baseCity]) {
    grouped[baseCity] = [];
  }

  grouped[baseCity].push(CitiesData[i]);
}

const getBaseCityImage = (baseCity) => {
  const key = baseCity
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");

  switch (key) {
    case "abu dhabi":
      return "/img/flags/abudhabi.png";

    case "dubai":
      return "/img/flags/dubai.png";

    case "sharjah":
      return "/img/flags/sharjah.png";

    case "ajman":
      return "/img/flags/ajman.png";

    case "Umm Al Quwain":
      return "/img/flags/ummalquwain.png";

    case "ras al khaimah":
      return "/img/flags/rasalkhaimah.png";

    case "fujairah":
      return "/img/flags/fujairah.webp";

    default:
      return "/img/flags/uae.webp";
  }
};


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

const playfair_display = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair-display',
});


export const metadata = {
  title:
    'Quick Car Auto Spare Part Order Online in UAE from Dubai dealer | Emirates-car.com',
  description:
    'Buy Online and Get delivered Used, New, Genuine / Original / OEM, Aftermarket auto spare parts Online in UAE',
  openGraph: {
    images: '/favicon.png',
    title:
      'Quick Car Auto Spare Part Order Online in UAE from Dubai dealer | Emirates-car.com',
    description:
      'Buy Online and Get delivered Used, New, Genuine / Original / OEM, Aftermarket auto spare parts Online in UAE',
    url: 'https://emirates-car.com/search-by-cities-in-uae',
    image: 'https://www.emirates-car.com/img/car-spare-parts.png',
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
    title:
      'Quick Car Auto Spare Part Order Online in UAE from Dubai dealer | Emirates-car.com',
    url: 'https://emirates-car.com/search-by-cities-in-uae',
    description:
      'Buy Online and Get delivered Used, New, Genuine / Original / OEM, Aftermarket auto spare parts Online in UAE',
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
  category: 'car parts',
  alternates: {
    canonical: `https://www.emirates-car.com/search-by-cities-in-uae`,
  },
  keywords:
    'how to buy auto spare parts in uae, how to search for auto spare parts in dubai sharjah, how to search for auto spare parts in dubai online, dubai spare parts market, dubai spare parts market online, auto spare parts sharjah, auto spare parts wholesalers dubai, Whats the best online auto parts store, parts market uae',
};



export default function Cities() {
  const cities = CitiesData;
  const partsposts = PartsData;
  const modelsform = CarData;
  const makeData = getMake();

  return (
    <div className='max-w-7xl mx-auto'>

      <div className=" bg-white">
        {/* Hero Section */}
        <div className="container mx-auto px-6 py-6">
          <div className="max-w-7xl">
            {/* Eyebrow Text */}
            <div className="text-sm font-bold uppercase text-gray-600 mb-3">
              Auto spare parts in UAE
            </div>

            {/* Main Heading */}
            <h1 className={`text-3xl xl:text-4xl xxl:text-4xl font-extrabold mx-auto my-5 xs:my-3 xs:text-xl xxs:text-2xl md:text-xl md:my-3 sm:text-xl xxs:text-center ${playfair_display.className}`}>
              <span className="text-blue-600">
                Search Car Spare parts in any cities of UAE
              </span>{" "}
              – Genuine, OEM & Used Auto Parts from Dubai with Delivery Across UAE
            </h1>

            {/* Description */}
            <p className="text-lg text-gray-600 mb-10">
              Submit your inquiry - Get Free quotation - Get your car fixed
            </p>

            {/* CTA Buttons */}
            <div className="flex xl:flex-col xxl:flex-col lg:flex-col flex-col sm:flex-row gap-5 mb-12">
              <div className="grid grid-cols-2 xs:grid-cols-1 xxs:grid-cols-1 sm:grid-cols-1 gap-5">
                <button className="px-8 w-4/12 xs:w-full xxs:w-full sm:w-full md:w-64 ml-auto py-4 bg-blue-600 text-white rounded-full text-base font-medium hover:bg-blue-700 transition-colors shadow-sm">
                  <Link href="#myForm">Inquire Now</Link>
                </button>
                <button className="px-8 w-4/12 xs:w-full xxs:w-full sm:w-full md:w-64 mr-auto py-4 bg-transparent text-gray-900 rounded-full text-base font-medium border border-gray-200 hover:bg-gray-50 transition-colors">
                  Explore
                </button>
              </div>

              {/* User Counter */}
              <div className="flex items-center gap-3">
                {/* Overlapping Avatars */}
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center"><Image src="/img/flags/abudhabi.png" width={40} height={32} /></div>
                  <div className="w-12 h-12 rounded-full bg-gray-200 border-2 border-white -ml-3 flex items-center justify-center z-10"><Image src="/img/flags/ajman.png" width={40} height={32} /></div>
                  <div className="w-12 h-12 rounded-full bg-gray-200 border-2 border-white -ml-3 flex items-center justify-center z-20"><Image src="/img/flags/dubai.png" width={40} height={32} /></div>
                  <div className="w-12 h-12 rounded-full bg-gray-200 border-2 border-white -ml-3 flex items-center justify-center z-30"><Image src="/img/flags/rasalkhaimah.png" width={40} height={32} /></div>
                  <div className="w-12 h-12 rounded-full bg-gray-200 border-2 border-white -ml-3 flex items-center justify-center z-30"><Image src="/img/flags/ummalquwain.png" width={40} height={32} /></div>
                  <div className="w-12 h-12 rounded-full bg-gray-200 border-2 border-white -ml-3 flex items-center justify-center z-30"><Image src="/img/flags/uae.webp" width={40} height={32} /></div>
                  <div className="w-12 h-12 rounded-full bg-red-600 border-2 border-white -ml-5 flex items-center justify-center text-white text-sm font-bold z-40">
                    90+
                  </div>
                </div>

                {/* User Count Text */}
                <div className="text-sm text-gray-600 -ml-2">
                  <strong className="text-gray-900"></strong> Areas served in UAE
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
      <div aria-label='search spare parts in city'><SearchCity cities={cities} /></div>


      <div className="place-content-center grid grid-cols-1 gap-3 xs:grid-cols-1 xs:grid s:grid s:grid-cols-1 py-5 xl:mx-10 lg:mx-10 md:mx-10 sm:mx-5 xs:mx-2 xs:py-0 2xs:mx-2 s:mx-2  md:ml-11 my-5 mx-10">
        {Object.keys(grouped).map((baseCity) => (
          <div key={baseCity}>
            <div className="flex items-center gap-3 mb-6">
              <Image
                src={getBaseCityImage(baseCity)}
                alt={`${baseCity} auto spare parts`}
                width={40}
                height={32}
                className="object-contain"
              />
              <h3 className="text-2xl font-bold">
                {baseCity}
              </h3>
            </div>

            <div className="grid grid-cols-4 xxl:grid-cols-4 xl:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xs:grid-cols-2 xxs:grid-cols-3 gap-4 xs:gap-2 xxs:gap-2">
              {grouped[baseCity].map((city) => (
                <div
                  key={city.id}
                  className="border rounded-sm p-4 hover:shadow-stone-500 hover:drop-shadow-lg"
                ><Link
                  href={`/search-by-cities-in-uae/[city]`}
                  as={`/search-by-cities-in-uae/${city.city}`}
                  className="text-lg mt-2 inline-block hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                    <p className={`text-base font-medium ${firaSans.className}`}>{city.city}</p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className='sm:max-w-xl lg:max-w-2xl md:max-w-xl xl:max-w-2xl xxl:max-w-2xl mx-auto xs:mx-3 xxs:mx-3 sm:mx-5'>
        <FormOnly formsData={modelsform} />
      </div>
      <section className="mt-10 shadow-sm mx-4 md:mx-4 lg:max-w-4xl lg:mx-auto xl:mx-10 bg-bglight px-20 xs:px-3 xxs:px-3">
        <div className="container py-6">
          <h2 className={`font-bold text-center text-3xl xs:text-2xl my-3 ${playfair_display.className}`}>
            Search <span className='text-blue-600'>Auto spare parts</span> for All Car brands in UAE
          </h2>

          <ul className="grid grid-cols-6 md:grid-cols-5 xs:grid-cols-2 xxs:grid-cols-3 sm:grid-cols-3 xs:gap-2 xxs:gap-2 sm:gap-2 gap-4 my-10">
            {makeData.map((p, i) => (
              <li key={i} className="list-none">
                <Link
                  href="/search-by-make/[make]"
                  as={`/search-by-make/${p.make}`}
                  title={`${p.make} spare parts UAE`}
                  target='_blank'
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
                  <span className={`mt-2 px-3 py-1 text-sm xl:text-2xl xxl:text-2xl font-medium font-sans rounded-sm text-center w-max ${firaSans.className}`}>
                    <span className='text-blue-500'>{p.make}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CountryMap />


    </div>
  );
}
