import Link from 'next/link';
import React from 'react';
import FormComponent from '../../components/FormComponent';
import { getCity, getFormModel, getParts } from '../page';
import Image from 'next/image';
import Social from '../../components/Social';
import Spare from '../../public/img/car-spare-parts.png';
import SearchPartsComponent from '../../components/SearchPart';
import Footer from '../../components/footer';
export const revalidate = 1814400;
export const runtime = 'edge';
export const fetchCache = 'force-cache';
export const dynamicParams = false;

export default async function PartPage() {
  const cities = await getCity();
  const partsposts = await getParts();
  const modelsform = await getFormModel();
  return (
    <div>

      <div className="flex xs:grid xs:grid-cols-1 sm:grid sm:grid-cols-1 2xs:grid 2xs:grid-cols-1 xs:mx-auto">
        <div className="w-3/4 2xs:w-full xs:w-full sm:w-full">
          <main className="mx-10 xs:mx-4 2xs:mx-4 sm:mx-4 md:mx-5 mt-10 border border-gray-100 shadow-sm my-10">
            <h1 className="text-blue-600 text-4xl md:text-lg lg:text-2xl font-extrabold xs:text-base 2xs:text-xs mx-10">
              <Image
                src={Spare}
                alt="auto spare parts in dubai"
                height={50}
                width={50}
              />{' '}
              SEARCH YOUR PARTS BY CAR PART NAME
            </h1>

            <p className="text-gray-600 text-base md:text-lg lg:text-2xl font-normal font-sans xs:text-xs 2xs:text-xs mx-10 xs:ml-3 underline pt-4">
              <nobr className="text-blue-400 no-underline">
                <i className="fal fa-car-garage"></i> Current path:&nbsp;&nbsp;
              </nobr>
              index{'>>>'}
            </p>
            <section>
              <SearchPartsComponent partsposts={partsposts} />
              <div className="grid grid-cols-4 xs:ml-4 md:mx-4 sm:ml-0 xs:grid xs:grid-cols-2 sm:grid sm:grid-cols-2 md:grid md:grid-cols-3 2xs:grid 2xs:grid-cols-3 gap-1 2xs:mx-4 md:ml-11 m-1 my-10">
                {partsposts.map((post, i) => (
                  <div key={i}>
                    <Link
                      href="/search-by-part-name/[parts]"
                      as={'/search-by-part-name/' + post.parts}
                      title={post.parts + ' in uae'}
                    >
                      <span className="border border-blue-800 h-full p-3">
                        <p className="text-center text-lg xs:text-2xl xs:text-center font-mono text-blue-500 underline hover:text-blue-700 focus:text-blue-700 ">
                          {post.parts}
                        </p>
                      </span>
                    </Link>
                  </div>
                ))}
              </div>
            </section>

            <div className="place-content-center grid grid-cols-1 gap-3 xs:grid-cols-1 xs:grid s:grid s:grid-cols-1 py-5 xl:mx-10 lg:mx-10 md:mx-10 sm:mx-5 xs:mx-2 xs:py-0 2xs:mx-2 s:mx-2  md:ml-11 my-5 mx-10">
              <Social />
              <FormComponent formsData={modelsform} postFilter={partsposts} />
            </div>
            <div className="place-content-center grid grid-cols-1 gap-3 xs:grid-cols-1 xs:grid s:grid s:grid-cols-1 py-5 xl:mx-10 lg:mx-10 md:mx-10 sm:mx-5 xs:mx-2 xs:py-0 2xs:mx-2 s:mx-2  md:ml-11 my-10 mx-10">
              <p className="text-base font-medium text-gray-500 p-5">
                We deal with any country auto spare parts including japanese,
                american, german, chinese, indian, Korean, french, british in
                UAE. We also operate in main cities such as dubai, sharjah, abu
                dhabi, ajman, al quoz, jumeirah, deira etc. You can check our
                catalogue at{' '}
                <Link
                  href="/search-by-part-name"
                  className="text-blue-400 underline"
                >
                  https://emirates-car.com/search-by-part-name
                </Link>
                .
              </p>
              <p className="text-base font-medium text-gray-500 p-5">
                UAE Automobile industry is slowly shifting towards a service
                oriented business model based on consumer data and customer
                experience. Now companies are trying to adapt to the current
                need of the trends Markets. They rely on consumer data for
                knowing the sale interest of the customers based on the
                experience through analytics software. Owners are now thinking
                ways to accommodate the market through the trends analytics in
                order to keep the company into their targeted level. Previously
                there were cars running on petrol in which UAE is one of the
                largest producer and diesel. Since the beginning era of electric
                vehicle have started, many people are opting for electric
                vehicles in spite of its shortcomings because it is more
                affordable comapared to vehicle running on diesel or petrol. By
                this transition there is no difference in usage of irreversible
                energy.
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
          </main>
        </div>
        <div className="w-1/4 text-sm font-sans xs:w-full 2xs:w-full sm:w-full my-10">
          <div className="xs:grid xs:grid-cols-1 2xs:w-full sm:w-full md:w-full text-5xl lg:text-4xl md:text-base sm:text-2xl text-blue-400 font-bold py-4 sm:mt-5 md:mt-5 lg:mx-2 xs:text-xl  xl:text-lg 2xs:text-2xl px-5  text-justify font-sans">
            SEARCH PARTS BY COUNTRIES (U.A.E)
          </div>
          <div className="xs:grid xs:grid-cols-1 2xs:w-full sm:w-full md:w-full 2xs:grid 2xs:grid-cols-1 sm:grid sm:grid-cols-1 py-4 sm:mt-5 lg:mx-2 xs:text-xs xl:text-lg 2xs:text-xs px-5  font-sans">
            {cities.map((post, i) => (
              <div key={i}>
                <Link
                  href="/search-by-cities-in-uae/[city]"
                  as={'/search-by-cities-in-uae/' + post.city}
                  title={'car spare parts ' + post.city}
                >
                  <p className="text-base hover:text-blue-700 focus:text-blue-700  text-gray-500">
                    <i className="far fa-compass"></i> {post.city}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
