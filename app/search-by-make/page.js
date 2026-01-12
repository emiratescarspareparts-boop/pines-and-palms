import Image from 'next/image';
import Link from 'next/link';
import SearchMake from '../../components/SearchMake';
import CarData from "../../public/lib/car-data.json"
import CitiesData from "../../public/lib/cities.json"
import PartsData from "../../public/lib/parts.json"
import FormOnly from '../../components/FormOnly';
import { Fira_Sans, Playfair_Display } from 'next/font/google';
import SearchPartsComponent from '../../components/SearchPart';
import ShowCities from './ShowCities';
import ShowMake from './ShowMake';
import ShowParts from './ShowParts';
export const revalidate = 1814400;
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


export default function Make() {
  const posts = getMake();
  const modelforms = CarData;
  const partsposts = PartsData;
  const cities = CitiesData;

  return (
    <div className='max-w-7xl mx-auto'>
      <div className="bg-white">
        {/* Hero Section */}
        <div className="container mx-auto px-6 py-6">
          <div className="max-w-7xl">
            <div className="text-sm font-bold uppercase text-gray-600 mb-3">
              Auto spare parts in UAE
            </div>

            {/* Main Heading */}
            <h1 className={`text-3xl xl:text-4xl xxl:text-4xl font-extrabold mx-auto my-5 xs:my-3 xs:text-xl xxs:text-2xl md:text-xl md:my-3 sm:text-xl xxs:text-center ${playfair_display.className}`}>
              <span className="text-blue-600">
                Car spare parts in UAE
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
            </div>

          </div>
        </div>
        <div className='sm:max-w-xl lg:max-w-2xl md:max-w-xl xl:max-w-2xl xxl:max-w-2xl mx-auto xs:mx-3 xxs:mx-3 sm:mx-5'>
          <FormOnly formsData={modelforms} />
        </div>
        <ShowMake />
        <ShowParts />
        <ShowCities />

      </div>
      <div className="place-content-center grid grid-cols-1 gap-3 xs:grid-cols-1 xs:grid s:grid s:grid-cols-1 py-5 xl:mx-10 lg:mx-10 md:mx-10 sm:mx-5 xs:mx-2 xs:py-0 xxs:mx-2 s:mx-2  md:ml-11 my-10 mx-10 font-sans">
        <p className="text-base font-medium text-gray-500 p-5">
          If you are looking for spare parts for your car in UAE, you have landed in correct page recommended by google.
          EMIRATESCAR deal in car spare parts for any brands running in roads of UAE. We have experienced professionals who does a good job from matching compatibility to giving
          relevant consultation regarding your car symptoms/problems/signs. If you have Maintenance problems, it is likely that your car needs replacement like spark plugs, air filter, oil filter,fluids, brake pads, <a href="/car-battery-replacement-services-in-uae" className='text-blue-500'>batteries</a>, body panels, alternators etc.
          It is most likely that these parts are immediate need of your car. As parts like alternator if its problematic, then the car doesnt start. There are some parts which has to be changed immediately because of it is linked to the batteries, it fuels the battery to recharge when vehcile is started.
        </p>

      </div>
    </div>
  );
}
