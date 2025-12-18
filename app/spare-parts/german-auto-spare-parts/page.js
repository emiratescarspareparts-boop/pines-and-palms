import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import FormComponent from '../../../components/FormComponent';
import Accordon from './Accordion';
import StaticCities from '../../../components/StaticCities';
import Contents from '../../../components/Contents';
import HeroCarousel from '../../../components/HeroCarousel';
import SearchMake from '../../../components/SearchMake';
import CarData from "../../../public/lib/car-data.json"
import PartsData from "../../../public/lib/parts.json"

export default function German() {
  const modelforms = CarData;
  const partsposts = PartsData;
  return (
    <div>
      <div className="py-5 xxs:px-7 sm:px-7 s:py-6 lg:mx-6 md:mx-6 xs:mx-2 xxs:mx-2 max-w-7xl mx-auto">
        <div className="bg-backgroundlight rounded-sm">
          <div className="grid grid-cols-2 xs:grid xs:grid-cols-1 s:grid s:grid-cols-1 xs:text-center sm:grid sm:grid-cols-2 xxs:grid xxs:grid-cols-1 xs:pt-5 s:pt-5">
            <div>
              <div className="ml-8 md:ml-8 xs:ml-1 xxs:ml-4 xxs:mt-8 xs:px-5 sm:ml-6 lg:ml-1 xl:ml-20 sm:mx-auto mt-10 sm:mt-12 md:mt-10 lg:mt-20 lg:px-8 xl:mt-28 xs:mt-2 xs:text-left s:mt-2">
                <div className="lg:text-left">
                  <h2 className="block text-3xl sm:text-sm xs:text-base xxs:text-base md:text-lg lg:text-2xl font-medium font-poppins text-gray-800  lg:leading-tight dark:text-white">
                    <span class="block">
                      Expert Parts&nbsp;
                      <span class="block text-blue-600 xl:inline">
                        Seamless Performance
                      </span>
                    </span>
                  </h2>
                  <h1 className="mt-3 text-5xl lg:text-4xl sm:text-lg xs:text-xl xxs:text-xl md:text-xl font-head font-extrabold">
                    Used / Genuine / Aftermarket <span className='text-blue-500'>German</span> auto spare parts in
                    UAE
                  </h1>
                  <div className="mt-5 sm:mt-5 xxs:my-5 xs:my-5 lg:justify-start">
                    <div className="py-3 px-4 sm:py-0 sm:px-0 w-1/2 lg:w-full xs:w-full xxs:w-3/4 xs:mx-auto s:w-full sm:w-3/4 md:w-full md:mx-auto md:px-0 md:py-0 xs:py-0 xs:px-0 xxs:px-0 xxs:py-0 lg:px-0 lg:py-0 xl:px-0 xl:py-0 xxl:px-0 xxl:py-0 rounded-lg shadow-md sm:shadow-none">
                      <Link
                        href="/spare-parts/american-auto-spare-parts/#myForm"
                        title="vehicle parts online"
                        className="flex items-center justify-center py-2 xs:py-2 xxs:py-1 sm:py-0 text-xl sm:text-base xl:text-xl border border-transparent font-medium rounded-sm text-white bg-blue-600 hover:bg-blue-700 md:py-2 md:text-md md:text-lg md:px-5 xs:text-sm xxs:text-sm xxs:my-2 lg:my-2 s:text-sm s:my-2 focus:filter brightness-125"
                      >
                        Inquire Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="xxs:hidden xs:hidden">
              <HeroCarousel />
            </div>
          </div>
        </div>
        <FormComponent formsData={modelforms} postFilter={partsposts} />
        <h3 className="text-black text-4xl text-center md:text-2xl lg:text-2xl font-bold xs:text-xl xxs:text-2xl pt-10">
          Search for <span className="text-blue-500">American</span> Auto spare
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
      </div>
      <Accordon />
      <StaticCities />

      <Contents />

    </div>
  );
}
