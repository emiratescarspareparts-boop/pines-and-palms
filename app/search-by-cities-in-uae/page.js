import Social from '../../components/Social';
import FormComponent from '../../components/FormComponent';
import Link from 'next/link';
import Count from '../../components/service-countup';
import SearchCity from '../../components/SearchCity';
import { Fira_Sans, Playfair_Display } from 'next/font/google';
import CarData from "../../public/lib/car-data.json"
import CitiesData from "../../public/lib/cities.json"
import PartsData from "../../public/lib/parts.json"
import Image from 'next/image';
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
  title: 'Quick Car Auto Spare Part Order Online in UAE | Emirates-car.com',
  description:
    'Buy Online and Get delivered Used, New, Genuine / Original / OEM, Aftermarket auto spare parts Online in UAE',
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

            <div className="grid grid-cols-4 xxl:grid-cols-4 xl:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {grouped[baseCity].map((city) => (
                <div
                  key={city.id}
                  className="border rounded-sm p-4 hover:shadow-stone-500 hover:drop-shadow-lg"
                ><Link
                  href={`/search-by-cities-in-uae/${city.city}`}
                  as={`/search-by-cities-in-uae/[city]`}
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
      <div className="place-content-center grid grid-cols-1 gap-3 xs:grid-cols-1 xs:grid s:grid s:grid-cols-1 py-5 xl:mx-10 lg:mx-10 md:mx-10 sm:mx-5 xs:mx-2 xs:py-0 2xs:mx-2 s:mx-2  md:ml-11 my-5 mx-10">
        <FormComponent formsData={modelsform} postFilter={partsposts} />
      </div>
      <div className="mx-10 xs:mx-4 2xs:mx-4 sm:mx-4 md:mx-5 mt-10 border border-gray-100 shadow-sm my-10">
        <div>
          <h1 className="text-blue-600 text-4xl md:text-lg lg:text-2xl font-extrabold xs:text-base 2xs:text-xs mx-10 ">
            &nbsp;&nbsp;
            <nobr className="text-blue-700 text-6xl md:text-4xl xs:text-sm lg:text-2xl sm:text-xl">
              &nbsp;<i className="fa fa-map-pin" aria-hidden="true"></i>
            </nobr>
            &nbsp;&nbsp; SELECT YOUR PARTS BY LOCATION IN U.A.E
          </h1>
          <SearchCity cities={cities} />
          <p className="text-gray-600 text-base md:text-lg lg:text-2xl font-normal font-sans xs:text-xs 2xs:text-xs mx-10 xs:ml-3 underline">
            <nobr className="text-blue-400 no-underline">
              <i className="fal fa-car-garage"></i> Current
              path:&nbsp;&nbsp;
            </nobr>
            index{'>>>'}
          </p>

          <ul className="grid grid-cols-4 xs:ml-4 md:mx-4 sm:ml-0 xs:grid xs:grid-cols-2 sm:grid sm:grid-cols-3 md:grid md:grid-cols-3 2xs:grid 2xs:grid-cols-3 gap-1 2xs:mx-4 md:ml-11 mr-3 my-10 ">
            {cities.map((post, i) => (
              <li key={i}>

                <div className="border border-blue-800 h-full p-3">
                  <p className="text-center text-lg xs:text-2xl xs:text-center font-mono text-blue-500 underline hover:text-blue-700 focus:text-blue-700 ">
                    {post.city}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div>
            <Social />
            <Count />
          </div>
          <div className="place-content-center grid grid-cols-1 gap-3 xs:grid-cols-1 xs:grid s:grid s:grid-cols-1 py-5 xl:mx-10 lg:mx-10 md:mx-10 sm:mx-5 xs:mx-2 xs:py-0 2xs:mx-2 s:mx-2  md:ml-11 my-10 mx-10">
            <h1 className="text-base font-medium text-gray-500 p-5">
              We deal with any country auto spare parts including japanese,
              american, german, chinese, indian, Korean, french, british in
              UAE. We also operate in main cities such as dubai, sharjah,
              abu dhabi, ajman, al quoz, jumeirah, deira etc. You can check
              our catalogue at{' '}
              <Link
                href="/search-by-part-name"
                className="text-blue-400 underline"
              >
                /search-by-part-name
              </Link>
              .We also deal in brands such as{' '}
              {makeData.map((p, i) => (
                <Link key={i} href={'/search-by-make/' + p.make}>
                  {p.make}
                  {' in UAE, '}
                </Link>
              ))}
            </h1>
            <p className="text-base font-medium text-gray-500 p-5">
              UAE Automobile industry is slowly shifting towards a service
              oriented business model based on consumer data and customer
              experience. Now companies are trying to adapt to the current
              need of the trends Markets. They rely on consumer data for
              knowing the sale interest of the customers based on the
              experience through analytics software. Owners are now thinking
              ways to accommodate the market through the trends analytics in
              order to keep the company into their targeted level.
              Previously there were cars running on petrol in which UAE is
              one of the largest producer and diesel. Since the beginning
              era of electric vehicle have started, many people are opting
              for electric vehicles in spite of its shortcomings because it
              is more affordable comapared to vehicle running on diesel or
              petrol. By this transition there is no difference in usage of
              irreversible energy.
            </p>
            <p className="text-base font-medium text-gray-500 p-5">
              We provide auto spare parts for any vehicles including :
              <ul className="list-disc">
                <li>New auto spare parts</li>
                <li>Used auto spare parts</li>
                <li>Genuine auto spare parts</li>
                <li>Aftermarket auto spare parts</li>
              </ul>
            </p>
          </div>
        </div>
      </div>
      <div className="xs:grid xs:grid-cols-1 2xs:w-full sm:w-full md:w-full text-5xl lg:text-4xl md:text-base sm:text-2xl text-blue-600 font-bold py-4 sm:mt-5 md:mt-5 lg:mx-2 xs:text-xl  xl:text-lg 2xs:text-2xl px-5  text-justify font-sans">
        SEARCH PART BY MAKE
      </div>
      <div className="xs:grid xs:grid-cols-1 2xs:w-full sm:w-full md:w-full 2xs:grid 2xs:grid-cols-1 sm:grid sm:grid-cols-1 pb-4 sm:mt-5 lg:mx-2 xs:text-xs xl:text-lg 2xs:text-xs px-5  text-justify font-sans">
        {makeData.map((post, i) => (
          <div key={i}>
            <Link
              href="/search-by-make/[make]"
              as={'/search-by-make/' + post.make}
              title={post.make + ' spare parts sharjah'}
            >
              <p className="text-base hover:text-blue-700 focus:text-blue-700 xs:px-3 h-full text-gray-500">
                <i className="fa fa-mars-stroke" aria-hidden="true"></i>{' '}
                {post.make}
              </p>
            </Link>
          </div>
        ))}
      </div>

    </div>
  );
}
