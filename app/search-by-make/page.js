import React from 'react';
import FormComponent from '../../components/FormComponent';
import { getMake, getFormModel, getParts, getCity } from '../page';
import Image from 'next/image';
import Link from 'next/link';
import SearchMake from '../../components/SearchMake';
import HondaOfferButton from '../../components/HondaOfferButton';
import Social from '../../components/Social';
export const revalidate = 1814400;
export const runtime = 'edge';
export const fetchCache = 'force-cache';
export const dynamicParams = false;
export const dynamic = 'force-static';


export default async function Make() {
  const posts = await getMake();
  const modelforms = await getFormModel();
  const partsposts = await getParts();
  const cities = await getCity();

  return (
    <div>
      <div className="flex xs:grid xs:grid-cols-1 sm:grid sm:grid-cols-1 2xs:grid 2xs:grid-cols-1 xs:mx-auto font-sans">
        <div className="w-3/4 2xs:w-full xs:w-full sm:w-full">
          <main className="mx-10 xs:mx-4 2xs:mx-4 sm:mx-4 md:mx-5 mt-10 border border-gray-100 shadow-sm">
            <h1 className="text-blue-600 text-4xl md:text-lg lg:text-2xl font-extrabold xs:text-base 2xs:text-xs mx-10">
              <i className="fas fa-car-garage py-5"></i> AUTO SPARE PARTS ONLINE
              IN UAE
            </h1>
            <SearchMake posts={posts} />
            <p className="text-gray-600 text-base md:text-lg lg:text-2xl font-normal font-sans xs:text-xs 2xs:text-xs mx-10 xs:ml-3 underline">
              <nobr className="text-blue-400 no-underline">
                <i className="fal fa-car-garage"></i> Current path:&nbsp;&nbsp;
              </nobr>
              index{'>>>'}
            </p>

            <article>
              <div className="grid grid-cols-4 xs:ml-4 md:mx-4 sm:ml-0 xs:grid xs:grid-cols-2 sm:grid sm:grid-cols-3 md:grid md:grid-cols-3 2xs:grid 2xs:grid-cols-3 gap-1 2xs:mx-4 md:ml-11 mr-3 my-10 font-sans">
                {posts.map((post, i) => (
                  <div key={i}>
                    <Link
                      href="/search-by-make/[make]"
                      as={'/search-by-make/' + post.make}
                      title={post.make + ' spare parts'}
                    >
                      <main className="text-center text-base xs:text-xs xs:text-center font-mono text-blue-500 underline hover:text-blue-700 focus:text-blue-700 border border-gray-100">
                        <div className="flex justify-center">
                          <Image
                            alt={post.make + ' parts uae'}
                            src={'/img/car-logos/' + post.img}
                            className="object-scale-down shadow-xl"
                            height={30}
                            width={30}
                          />
                          <br />
                        </div>
                        {post.make.toUpperCase()}
                      </main>
                    </Link>
                  </div>
                ))}
              </div>
            </article>
            <div className="text-center mt-2 text-red-400 text-sm xs:text-xs">
              **Make not found above?{' '}
              <Link href="/get-in-touch">
                <nobr className="text-blue-500 text-sm underline">
                  Get in touch with us {'>>'}**
                </nobr>
              </Link>{' '}
            </div>
            <div className="place-content-center grid grid-cols-1 gap-3 xs:grid-cols-1 xs:grid s:grid s:grid-cols-1 py-5 xl:mx-10 lg:mx-10 md:mx-10 sm:mx-5 xs:mx-2 xs:py-0 2xs:mx-2 s:mx-2  md:ml-11 my-5 mx-10">
              <Social />
              <FormComponent formsData={modelforms} postFilter={partsposts} />
            </div>
            <div className="text-center">
              <HondaOfferButton />
            </div>
            <div className="place-content-center grid grid-cols-1 gap-3 xs:grid-cols-1 xs:grid s:grid s:grid-cols-1 py-5 xl:mx-10 lg:mx-10 md:mx-10 sm:mx-5 xs:mx-2 xs:py-0 2xs:mx-2 s:mx-2  md:ml-11 my-10 mx-10 font-sans">
              <p className="text-base font-medium text-gray-500 p-5">
                We deal with any country auto spare parts including japanese,
                american, german, chinese, indian, Korean, french, british in
                UAE.You can check our catalogue at{' '}
                <Link
                  href="/search-by-part-name"
                  title="spare parts"
                  className="text-blue-400 underline"
                >
                  All Parts
                </Link>
                . We deal in auto spare parts such as{' '}
                {partsposts.map((p, i) => (
                  <Link
                    href="/search-by-part-name/[parts]"
                    as={'/search-by-part-name/' + p.parts}
                    key={i}
                    title={p.parts}
                  >
                    {p.parts + ' , '}
                  </Link>
                ))}
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
                affordable compared to vehicle running on diesel or petrol. By
                this transition there is no difference in usage of irreversible
                energy.
              </p>
              <p className="text-base font-medium text-gray-500 p-5">
                We deal in Used / New / Genuine / OEM / Aftermarket auto spare
                parts in area such as abu dhabi, ras al khaimah, ras al khor,
                umm al nar, dubai, sharjah, ajman, palm jumeirah in UAE. We are
                online and accept inquiries through our website and we will get
                back to you through whatsapp and give you our price list in our
                quotation. After you are satisfied with our price we will
                arrange delivery to your convinient locations mentioned.
              </p>
            </div>
          </main>
        </div>
        <div className="w-1/4 text-sm font-sans xs:w-full 2xs:w-full sm:w-full my-10">
          <div className="xs:grid xs:grid-cols-1 2xs:w-full sm:w-full md:w-full text-5xl lg:text-4xl md:text-base sm:text-2xl text-blue-400 font-bold py-4 sm:mt-5 md:mt-5 lg:mx-2 xs:text-xl  xl:text-lg 2xs:text-2xl px-5 font-sans">
            SEARCH PARTS BY COUNTRIES (U.A.E)
          </div>
          <div className="xs:grid xs:grid-cols-1 2xs:w-full sm:w-full md:w-full 2xs:grid 2xs:grid-cols-1 sm:grid sm:grid-cols-1 py-4 sm:mt-5 lg:mx-2 xs:text-xs xl:text-lg 2xs:text-xs px-5 font-sans">
            {cities.map((post, i) => (
              <div key={i}>
                <Link
                  href="/search-by-cities-in-uae/[city]"
                  as={'/search-by-cities-in-uae/' + post.city}
                  title={'car parts ' + post.city}
                >
                  <p className="text-base hover:text-blue-700 focus:text-blue-700 h-full text-gray-500">
                    <i className="fas fa-map-marker-alt"></i> {post.city}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
