import React from 'react';
import Image from 'next/image';
import NewCar from '../public/img/icons/new-car.png';
import UsedCar from '../public/img/icons/used-car.png';
import Genuine from '../public/img/icons/genuine.png';
import AfterMarket from '../public/img/icons/aftermarket.png';
import Britain from '../public/img/icons/united-kingdom.png';
import Indian from '../public/img/icons/india.png';
import Japan from '../public/img/icons/japan.png';
import Korean from '../public/img/icons/south-korea.png';
import USA from '../public/img/icons/usa.png';
import Germany from '../public/img/icons/germany.png';
import China from '../public/img/icons/china.png';
import France from '../public/img/icons/france.png';
import Link from 'next/link';
import FormComponent from './FormComponent';
import { getFormModel, getParts } from '../app/page';
import StaticParts from './StaticParts';
import HeroCarousel from './HeroCarousel';
import products from "../public/products.json"
import ProductFilter from './ProductFilter';

export default async function HomeHero({ searchParams }) {
  const modelforms = await getFormModel();
  const partsposts = await getParts();
  const {
    "filter_car_parts[]": categories = [],
    "engine[]": engines = [],
    "compatibility[]": compats = [],
    search = "",
    featured,
  } = searchParams || {};

  const selectedCategories = Array.isArray(categories)
    ? categories
    : [categories].filter(Boolean);

  const selectedEngines = Array.isArray(engines)
    ? engines
    : [engines].filter(Boolean);

  const selectedCompats = Array.isArray(compats)
    ? compats
    : [compats].filter(Boolean);

  const query = search?.toLowerCase() || "";

  // All products
  const allProducts = products;

  // STEP 1 — FILTER ALL RULES
  let filtered = allProducts.filter(product => {
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);

    const matchesSearch =
      product.partname.toLowerCase().includes(query) ||
      product.partnumber.toLowerCase().includes(query) ||
      product.engine?.some(e => e.toLowerCase().includes(query)) ||
      product.compatibility?.some(c =>
        `${c.make} ${c.model} ${c.years ?? ""}`.toLowerCase().includes(query)
      );

    const matchesEngine =
      selectedEngines.length === 0 ||
      product.engine?.some(e => selectedEngines.includes(e));

    const matchesCompatibility =
      selectedCompats.length === 0 ||
      product.compatibility?.some(c =>
        selectedCompats.includes(
          `${c.make} ${c.model} ${c.years ? `(${c.years})` : ""}`
        )
      );

    return (
      matchesCategory &&
      matchesSearch &&
      matchesEngine &&
      matchesCompatibility
    );
  });

  // STEP 2 — FILTER FEATURED ONLY
  if (featured === "true") {
    filtered = filtered.filter(p => p.featured === "true");
  }
  return (
    <div>
      <section
        className="py-5 xxs:px-7 sm:px-7 s:py-6 lg:mx-6 md:mx-6 xs:mx-2 xxs:mx-2 s:mx-2 max-w-7xl mx-auto"
        aria-label="Spare parts by country of origin"
      >
        <div className="bg-backgroundlight rounded-sm">
          <div className="grid grid-cols-2 xs:grid-cols-1 sm:grid-cols-2 xxs:grid-cols-1 xs:text-center xs:pt-5">
            <div>
              <div className="ml-8 md:ml-8 xs:ml-1 xxs:ml-4 mt-10 sm:mt-12 md:mt-10 lg:mt-20 xl:mt-28 xs:mt-2 xs:text-left">
                <h2 className="block text-3xl md:text-lg lg:text-2xl font-medium text-gray-800 lg:leading-tight dark:text-white font-poppins">
                  Expert Parts <span className="text-blue-600">Seamless Performance</span>
                </h2>

                <p className="mt-3 text-5xl xl:text-4xl xxl:text-4xl lg:text-4xl md:text-xl xs:text-lg xxs:text-lg sm:text-lg s:text-lg font-extrabold font-head text-gray-900">
                  Your Partner in Automotive Excellence with Quality Auto Spare Parts.
                </p>

                <div className="mt-5">
                  <div className="py-3  w-1/2 lg:w-full xs:w-full xxs:w-3/4 mr-auto rounded-lg shadow-md">
                    <a
                      href="/#myForm"
                      title="Inquire about vehicle parts online"
                      className="flex items-center justify-center py-2 text-xl border border-transparent font-medium rounded-sm text-white bg-blue-600 hover:bg-blue-700"
                    >
                      Inquire Now
                    </a>
                  </div>
                </div>

                <p className="mt-10 mb-3 hidden xl:block xxl:block lg:block md:block text-sm text-gray-700">
                  We deal with auto parts for German, Japanese, Chinese, French, British origin cars.
                </p>
                <div className='xs:hidden xxs:hidden sm:hidden s:hidden xl:block xxl:block lg:block md:block'>
                  <div className="grid grid-cols-8 md:grid-cols-4 lg:grid-cols-4 gap-2 place-content-center mb-10">
                    {[
                      { src: Germany, alt: "German car auto spare parts", label: "Germany", href: "/spare-parts/german-auto-spare-parts" },
                      { src: Britain, alt: "British car auto spare parts", label: "Britain", href: "/spare-parts/british-auto-spare-parts" },
                      { src: Japan, alt: "Japanese car auto spare parts", label: "Japan", href: "/spare-parts/japanese-auto-spare-parts" },
                      { src: Korean, alt: "Korean car auto spare parts", label: "Korean", href: "/spare-parts/korean-auto-spare-parts" },
                      { src: USA, alt: "American car auto spare parts", label: "USA", href: "/spare-parts/american-auto-spare-parts" },
                      { src: Indian, alt: "Indian car auto spare parts", label: "Indian", href: "/spare-parts/indian-auto-spare-parts" },
                      { src: China, alt: "Chinese car auto spare parts", label: "China", href: "/spare-parts/chinese-auto-spare-parts" },
                      { src: France, alt: "French car auto spare parts", label: "French", href: "/spare-parts/french-auto-spare-parts" },
                    ].map(({ src, alt, label, href }) => (
                      <Link key={label} href={href}>
                        <figure className="flex flex-col items-center text-center">
                          <Image
                            src={src}
                            alt={alt}
                            height={50}
                            width={50}
                            className="my-1 px-2 py-1"
                          />
                          <figcaption className="text-sm rounded-2xl border border-blue-500 hover:bg-blue-500 px-2 py-1">
                            {label}
                          </figcaption>
                        </figure>
                      </Link>
                    ))}
                  </div>
                </div>


              </div>
            </div>

            <div className="xxs:hidden xs:hidden">
              <HeroCarousel />
            </div>
          </div>
        </div>
      </section>

      <div className="text-center mx-auto py-10 xs:py-5 xxs:py-5">
        <div className="grid grid-cols-4 text-center gap-2 xs:grid xs:grid-cols-4 s:grid s:grid-cols-2 xs:gap-1 xxs:text-sm xxs:grid xxs:grid-cols-2 md:px-2 xs:pb-5 s:pb-10 mx-8 xxs:mx-2 xs:mx-2 s:mx-4">

          {/* New Parts */}
          <div className="text-base lg:text-base sm:text-xs md:text-sm bg-gradient-to-r from-blue-500 via-blue-200 to-blue-500 rounded-sm lg:mx-6 py-2 shadow-2xl xs:text-xs s:text-xs xs:shadow-none sm:shadow-none">
            <figure className="flex flex-col items-center">
              <Image
                src={NewCar}
                alt="automotive parts store"
                priority
                width={50}
                height={50}
              />
              <figcaption className="mt-2">New parts</figcaption>
            </figure>
          </div>

          {/* Used Parts */}
          <div className="text-base lg:text-base sm:text-xs md:text-sm bg-gradient-to-r from-blue-500 via-blue-200 to-blue-500 rounded-sm lg:mx-6 shadow-2xl xs:shadow-none s:shadow-none sm:shadow-none xs:text-xs s:text-xs">
            <figure className="flex flex-col items-center">
              <Image
                src={UsedCar}
                alt="auto spare parts in dubai"
                priority
                width={50}
                height={50}
              />
              <figcaption className="mt-2">Used parts</figcaption>
            </figure>
          </div>

          {/* Genuine Parts */}
          <div className="text-base lg:text-base sm:text-xs md:text-sm bg-gradient-to-r from-blue-500 via-blue-200 to-blue-500 rounded-sm lg:mx-6 py-2 shadow-2xl xs:text-xs s:text-xs s:shadow-none xs:shadow-none sm:shadow-none">
            <figure className="flex flex-col items-center">
              <Image
                src={Genuine}
                alt="automobile spare parts"
                priority
                width={50}
                height={50}
              />
              <figcaption className="mt-2">Genuine parts</figcaption>
            </figure>
          </div>

          {/* Aftermarket Parts */}
          <div className="text-base lg:text-base sm:text-xs md:text-sm bg-gradient-to-r from-blue-500 via-blue-200 to-blue-500 rounded-sm lg:mx-6 py-2 shadow-2xl xs:text-xs s:text-xs s:shadow-none xs:shadow-none sm:shadow-none">
            <figure className="flex flex-col items-center">
              <Image
                src={AfterMarket}
                alt="aftermarket auto body parts"
                priority
                width={50}
                height={50}
              />
              <figcaption className="mt-2">Aftermarket parts</figcaption>
            </figure>
          </div>

        </div>
      </div>

      <FormComponent formsData={modelforms} postFilter={partsposts} />


      <div className="bg-bglight">
        <h3 className="text-black text-4xl my-10 text-center md:text-2xl lg:text-2xl font-bold xs:text-xl xxs:text-2xl pt-10">
          Popular <span className="text-blue-500">Country Origin</span> Spare parts
        </h3>

        <div className="grid grid-cols-8 gap-4 xs:grid-cols-4 xxs:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 place-content-center my-10 pb-10 xs:px-2 xxs:px-2">

          {/* Britain */}
          <div className="flex justify-center text-center">
            <figure>
              <Link href="/spare-parts/british-auto-spare-parts">
                <Image
                  src={Britain}
                  alt="british car auto spare parts"
                  priority
                  height={50}
                  width={50}
                />
              </Link>
              <figcaption className="text-sm">Britain</figcaption>
            </figure>
          </div>

          {/* Indian (no link) */}
          <div className="flex justify-center text-center">
            <figure>
              <Image
                src={Indian}
                alt="indian car auto spare parts"
                priority
                height={50}
                width={50}
              />
              <figcaption className="text-sm">Indian</figcaption>
            </figure>
          </div>

          {/* Japan */}
          <div className="flex justify-center text-center">
            <figure>
              <Link href="/spare-parts/japanese-auto-spare-parts">
                <Image
                  src={Japan}
                  alt="japan car auto spare parts"
                  priority
                  height={50}
                  width={50}
                />
              </Link>
              <figcaption className="text-sm">Japan</figcaption>
            </figure>
          </div>

          {/* Korean */}
          <div className="flex justify-center text-center">
            <figure>
              <Link href="/spare-parts/korean-auto-spare-parts">
                <Image
                  src={Korean}
                  alt="korean car auto spare parts"
                  priority
                  height={50}
                  width={50}
                />
              </Link>
              <figcaption className="text-sm">Korean</figcaption>
            </figure>
          </div>

          {/* American */}
          <div className="flex justify-center text-center">
            <figure>
              <Link href="/spare-parts/american-auto-spare-parts">
                <Image
                  src={USA}
                  alt="united states car auto spare parts"
                  priority
                  height={50}
                  width={50}
                />
              </Link>
              <figcaption className="text-sm">American</figcaption>
            </figure>
          </div>

          {/* German */}
          <div className="flex justify-center text-center">
            <figure>
              <Link href="/spare-parts/german-auto-spare-parts">
                <Image
                  src={Germany}
                  alt="german car auto spare parts"
                  priority
                  height={50}
                  width={50}
                />
              </Link>
              <figcaption className="text-sm">German</figcaption>
            </figure>
          </div>

          {/* China */}
          <div className="flex justify-center text-center">
            <figure>
              <Link href="/get-in-touch">
                <Image
                  src={China}
                  alt="chinese car auto spare parts"
                  priority
                  height={50}
                  width={50}
                />
              </Link>
              <figcaption className="text-sm">China</figcaption>
            </figure>
          </div>

          {/* French */}
          <div className="flex justify-center text-center">
            <figure>
              <Link href="/spare-parts/french-auto-spare-parts">
                <Image
                  src={France}
                  alt="french car auto spare parts"
                  priority
                  height={50}
                  width={50}
                />
              </Link>
              <figcaption className="text-sm xs:text-xs s:text-xs">French</figcaption>
            </figure>
          </div>

        </div>
      </div>

    </div>
  );
}
