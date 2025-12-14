import React from 'react';
import Hero from '../components/home_hero';
import Count from '../components/service-countup';
import Featured from '../components/featured';
import Link from 'next/link';
import Image from 'next/image';
import TenEntries from '../components/tenentries';
import Contents from '../components/Contents';
import StaticCities from '../components/StaticCities';
import MainAccordion from '../components/Main-Accordion';
import "../public/main.css"
import CarData from "../public/lib/car-data.json"
import CitiesData from "../public/lib/cities.json"
import PartsData from "../public/lib/parts.json"
export const revalidate = 1814400;
export const runtime = 'edge';
export const fetchCache = 'force-cache';
export const dynamicParams = false;


export async function getMake() {
  const uniqueMakeArray = [
    ...new Map(CarData.map(item => [item.make, item])).values()
  ];

  return uniqueMakeArray;
}

export async function getYear() {
  const uniqueYearArray = [
    ...new Map(CarData.map(item => [item.year, item])).values()
  ];

  return uniqueYearArray;
}

export async function getFormModel() {
  return CarData;
}

export async function getCity() {
  return CitiesData;
}

export async function getParts() {
  return PartsData;
}

export default async function Home() {

  return (
    <div>
      <Hero />
      <div className="max-w-7xl mx-auto font-sans">
        <section aria-label="Top American Spare Parts" className="pt-10">
          <h2 className="text-black text-4xl text-center md:text-2xl lg:text-2xl font-bold xs:text-xl xxs:text-2xl">
            Top American Spare parts
          </h2>
          <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-7 md:mx-4 sm:mx-3 xs:grid xs:grid-cols-2 sm:grid sm:grid-cols-3 xxs:grid xxs:grid-cols-2 s:grid s:grid-cols-2 gap-1 xs:mx-2 s:mx-2 xxs:mx-2 md:ml-11 my-10 mx-10">

            {[
              { href: "/search-by-make/Ford", alt: "Ford spare parts Dubai", label: "Ford", src: "/img/car-logos/ford.webp" },
              { href: "/search-by-make/GMC", alt: "GMC spare parts in UAE", label: "GMC", src: "/img/car-logos/gmc.webp" },
              { href: "/search-by-make/Chevrolet", alt: "Chevrolet spare parts in UAE", label: "Chevrolet", src: "/img/car-logos/chevrolet.webp" },
              { href: "/search-by-make/Jeep", alt: "Jeep spare parts in UAE", label: "Jeep", src: "/img/car-logos/jeep.webp" },
              { href: "/search-by-make/Hummer", alt: "Hummer parts online", label: "Hummer", src: "/img/car-logos/hummer.webp" },
              { href: "/search-by-make/Cadillac", alt: "Cadillac spare parts Sharjah", label: "Cadillac", src: "/img/car-logos/cadillac.webp" },
              { href: "/search-by-make/Lincoln", alt: "Lincoln spare parts Sharjah", label: "Lincoln", src: "/img/car-logos/lincoln.webp" },
              { href: "/search-by-make/Dodge", alt: "Dodge spare parts Dubai", label: "Dodge", src: "/img/car-logos/dodge.webp" },
              { href: "/search-by-make/Chrysler", alt: "Chrysler spare parts in UAE", label: "Chrysler", src: "/img/car-logos/chrysler.webp" },
              { href: "/search-by-make/Mercury", alt: "Mercury spare parts in Dubai", label: "Mercury", src: "/img/car-logos/mercury.webp" },
              { href: "/search-by-make/Buick", alt: "Buick spare parts in UAE", label: "Buick", src: "/img/car-logos/buick.webp" },
              { href: "/search-by-make/Ram", alt: "Ram spare parts in UAE", label: "Ram", src: "/img/car-logos/ram.webp" },
            ].map(({ href, alt, label, src }) => (
              <figure key={label} className="border hover:border-blue-600 py-3 text-center rounded-sm">
                <a href={href} className="flex flex-col items-center no-underline" aria-label={`${label} spare parts`}>
                  <Image
                    alt={alt}
                    src={src}
                    className="object-scale-down"
                    height={50}
                    width={50}
                  />
                  <figcaption className="m-1 w-3/5 bg-darkblue hover:bg-blue-400 font-bold text-white text-sm hover:text-gray-800 rounded-sm px-2 py-1 mt-2">
                    {label}
                  </figcaption>

                </a>
              </figure>
            ))}

          </div>
        </section>

        {/*Japanese */}

        <section aria-label="Top Japanese Spare Parts" className="pt-10">
          <h2 className="text-black text-4xl text-center md:text-2xl lg:text-2xl font-bold xs:text-xl xxs:text-2xl">
            Top Japanese Spare parts
          </h2>
          <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-7 md:mx-4 sm:mx-3 xs:grid xs:grid-cols-2 sm:grid sm:grid-cols-3 xxs:grid xxs:grid-cols-2 s:grid s:grid-cols-2 gap-1 xs:mx-4 s:mx-4 xxs:mx-4 md:ml-11 my-10 mx-10">
            {[
              { href: "/search-by-make/Toyota", alt: "Auto parts Toyota", label: "Toyota", src: "/img/car-logos/toyota.webp" },
              { href: "/search-by-make/Mitsubishi", alt: "Mitsubishi spare parts in UAE", label: "Mitsubishi", src: "/img/car-logos/mitsubishi.webp" },
              { href: "/search-by-make/Lexus", alt: "Lexus spare parts in UAE", label: "Lexus", src: "/img/car-logos/lexus.webp" },
              { href: "/search-by-make/Nissan", alt: "Spare parts Nissan", label: "Nissan", src: "/img/car-logos/nissan.webp" },
              { href: "/search-by-make/Infiniti", alt: "Infiniti spare parts in UAE", label: "Infiniti", src: "/img/car-logos/infiniti.webp" },
              { href: "/search-by-make/Honda", alt: "Honda spare parts in UAE", label: "Honda", src: "/img/car-logos/honda.webp" },
              { href: "/search-by-make/Mazda", alt: "Mazda spare parts in UAE", label: "Mazda", src: "/img/car-logos/mazda.webp" },
              { href: "/search-by-make/Subaru", alt: "Subaru spare parts in UAE", label: "Subaru", src: "/img/car-logos/subaru.webp" },
              { href: "/search-by-make/Suzuki", alt: "Suzuki spare parts in UAE", label: "Suzuki", src: "/img/car-logos/suzuki.webp" },
              { href: "/search-by-make/Daihatsu", alt: "Daihatsu spare parts in UAE", label: "Daihatsu", src: "/img/car-logos/daihat.webp" },
              { href: "/search-by-make/Isuzu", alt: "Isuzu spare parts in UAE", label: "Isuzu", src: "/img/car-logos/isuzu.webp" },
            ].map(({ href, alt, label, src }) => (
              <figure key={label} className="border hover:border-blue-600 py-3 text-center rounded-sm">
                <a href={href} className="flex flex-col items-center no-underline" aria-label={`${label} spare parts`}>

                  <Image
                    alt={alt}
                    src={src}
                    className="object-scale-down"
                    height={50}
                    width={50}
                  />
                  <figcaption className="m-1 w-3/5 bg-darkblue hover:bg-blue-400 font-bold text-white text-sm hover:text-gray-800 rounded-sm px-2 py-1 mt-2">
                    {label}
                  </figcaption>

                </a>
              </figure>
            ))}
          </div>
        </section>


        {/*Britain */}
        <section aria-label="Top Britain Spare Parts" className="pt-10">
          <h2 className="text-black text-4xl text-center md:text-2xl lg:text-2xl font-bold xs:text-xl xxs:text-2xl">
            Top Britain Spare parts
          </h2>
          <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-5 md:mx-4 sm:mx-3 xs:grid xs:grid-cols-2 sm:grid sm:grid-cols-3 xxs:grid xxs:grid-cols-2 s:grid s:grid-cols-2 gap-1 xs:mx-4 s:mx-4 xxs:mx-4 md:ml-11 my-10 mx-10">
            {[
              { href: "/search-by-make/Aston Martin", alt: "Aston Martin spare parts in UAE", label: "Aston Martin", src: "/img/car-logos/aston_martin.webp" },
              { href: "/search-by-make/Bentley", alt: "Bentley spare parts in UAE", label: "Bentley", src: "/img/car-logos/bentley.webp" },
              { href: "/search-by-make/Jaguar", alt: "Jaguar spare parts in UAE", label: "Jaguar", src: "/img/car-logos/jaguar.webp" },
              { href: "/search-by-make/Land Rover", alt: "Land Rover spare parts in UAE", label: "Land Rover", src: "/img/car-logos/land_rover.webp" },
              { href: "/search-by-make/Lotus", alt: "Lotus spare parts in UAE", label: "Lotus", src: "/img/car-logos/lotus.webp" },
              { href: "/search-by-make/McLaren", alt: "McLaren spare parts in UAE", label: "McLaren", src: "/img/car-logos/mclaren.webp" },
              { href: "/search-by-make/Mini", alt: "Mini spare parts in UAE", label: "Mini", src: "/img/car-logos/mini.webp" },
              { href: "/search-by-make/Rolls-Royce", alt: "Rolls Royce spare parts in UAE", label: "Rolls Royce", src: "/img/car-logos/rolls-royce.webp" },
            ].map(({ href, alt, label, src }) => (
              <figure key={label} className="border hover:border-blue-600 py-3 text-center rounded-sm">
                <a href={href} className="flex flex-col items-center no-underline" aria-label={`${label} spare parts`}>

                  <Image
                    alt={alt}
                    src={src}
                    className="object-scale-down"
                    height={50}
                    width={50}
                  />
                  <figcaption className="m-1 w-3/5 bg-darkblue hover:bg-blue-400 font-bold text-white text-sm hover:text-gray-800 rounded-sm px-2 py-1 mt-2">
                    {label}
                  </figcaption>

                </a>
              </figure>
            ))}
          </div>
        </section>

        {/*French */}
        <section aria-label="Top French Spare Parts" className="pt-10">
          <h2 className="text-black text-4xl text-center md:text-2xl lg:text-2xl font-bold xs:text-xl xxs:text-2xl">
            Top French Spare parts
          </h2>
          <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-5 md:mx-4 sm:mx-3 xs:grid xs:grid-cols-2 sm:grid sm:grid-cols-3 xxs:grid xxs:grid-cols-2 s:grid s:grid-cols-2 gap-1 xs:mx-4 s:mx-4 xxs:mx-4 md:ml-11 my-10 mx-10">
            {[
              { href: "/search-by-make/Peugeot", alt: "Peugeot spare parts in UAE", label: "Peugeot", src: "/img/car-logos/peugeot.webp" },
              { href: "/search-by-make/Citroen", alt: "Citroen spare parts in UAE", label: "Citroen", src: "/img/car-logos/citroen.webp" },
              { href: "/search-by-make/Renault", alt: "Renault spare parts in UAE", label: "Renault", src: "/img/car-logos/renault.webp" },
              { href: "/search-by-make/Mobility Ventures LLC", alt: "Mobility Ventures LLC spare parts in UAE", label: "Mobility Ventures LLC", src: "/img/car-logos/venturi.webp" },
              { href: "/search-by-make/Bugatti", alt: "Bugatti spare parts in UAE", label: "Bugatti", src: "/img/car-logos/bugatti.webp" },
            ].map(({ href, alt, label, src }) => (
              <figure key={label} className="border hover:border-blue-600 py-3 text-center rounded-sm">
                <a href={href} className="flex flex-col items-center no-underline" aria-label={`${label} spare parts`}>

                  <Image
                    alt={alt}
                    src={src}
                    className="object-scale-down"
                    height={50}
                    width={50}
                  />
                  <figcaption className="m-1 w-3/5 bg-darkblue hover:bg-blue-400 font-bold text-white text-sm hover:text-gray-800 rounded-sm px-2 py-1 mt-2">
                    {label}
                  </figcaption>

                </a>
              </figure>
            ))}
          </div>
        </section>

        {/*German */}
        <section aria-label="Top German Spare Parts" className="pt-10">
          <h2 className="text-black text-4xl text-center md:text-2xl lg:text-2xl font-bold xs:text-xl xxs:text-2xl">
            Top German Spare parts
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 md:mx-4 sm:mx-3 xs:grid xs:grid-cols-2 sm:grid sm:grid-cols-3 xxs:grid xxs:grid-cols-2 s:grid s:grid-cols-2 gap-1 xs:mx-4 s:mx-4 xxs:mx-4 md:ml-11 my-10 mx-10">
            {[
              {
                href: "/search-by-make/Mercedes-Benz",
                alt: "Mercedes Benz spare parts in UAE",
                label: "Mercedes Benz",
                src: "/img/car-logos/mercedesbenz.webp",
              },
              {
                href: "/search-by-make/BMW",
                alt: "BMW spare parts in UAE",
                label: "BMW",
                src: "/img/car-logos/BMW.webp",
              },
              {
                href: "/search-by-make/Volkswagen",
                alt: "Volkswagen spare parts in UAE",
                label: "Volkswagen",
                src: "/img/car-logos/volkswagon.webp",
              },
              {
                href: "/search-by-make/Jaguar",
                alt: "Jaguar spare parts in UAE",
                label: "Jaguar",
                src: "/img/car-logos/jaguar.webp",
              },
              {
                href: "/search-by-make/Land%20Rover",
                alt: "Land Rover spare parts in UAE",
                label: "Land Rover",
                src: "/img/car-logos/land_rover.webp",
              },
              {
                href: "/search-by-make/Porsche",
                alt: "Porsche spare parts in UAE",
                label: "Porsche",
                src: "/img/car-logos/porsche.webp",
              },
            ].map(({ href, alt, label, src }) => (
              <figure key={label} className="border hover:border-blue-600 py-3 text-center rounded-sm">
                <a href={href} className="flex flex-col items-center no-underline" aria-label={`${label} spare parts`}>

                  <Image
                    alt={alt}
                    src={src}
                    className="object-scale-down"
                    height={50}
                    width={50}
                  />
                  <figcaption className="m-1 bg-darkblue w-3/5 hover:bg-blue-400 font-bold text-white text-sm hover:text-gray-800 rounded-sm px-2 py-1 mt-2">
                    {label}
                  </figcaption>

                </a>
              </figure>
            ))}
          </div>
        </section>

        {/*Korean */}
        <section aria-label="Top Korean Spare Parts" className="pt-10">
          <h2 className="text-black text-4xl text-center md:text-2xl lg:text-2xl font-bold xs:text-xl xxs:text-2xl">
            Top Korean Spare parts
          </h2>
          <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-3 md:mx-4 sm:mx-3 xs:grid xs:grid-cols-2 sm:grid sm:grid-cols-3 xxs:grid xxs:grid-cols-2 s:grid s:grid-cols-2 gap-1 xs:mx-4 s:mx-4 xxs:mx-4 md:ml-11 my-10 mx-10">
            {[
              {
                href: "/search-by-make/Hyundai",
                alt: "Hyundai spare parts in UAE",
                label: "Hyundai",
                src: "/img/car-logos/hyundai.webp",
              },
              {
                href: "/search-by-make/Kia",
                alt: "Kia spare parts in UAE",
                label: "Kia",
                src: "/img/car-logos/kia.webp",
              },
              {
                href: "/search-by-make/Daewoo",
                alt: "Daewoo spare parts in UAE",
                label: "Daewoo",
                src: "/img/car-logos/daewoo.webp",
              },
            ].map(({ href, alt, label, src }) => (
              <figure key={label} className="border hover:border-blue-600 py-3 text-center rounded-sm">
                <a href={href} className="flex flex-col items-center no-underline" aria-label={`${label} spare parts`}>

                  <Image
                    alt={alt}
                    src={src}
                    className="object-scale-down"
                    height={50}
                    width={50}
                  />
                  <figcaption className="m-1 bg-darkblue w-3/5 hover:bg-blue-400 font-bold text-white text-sm hover:text-gray-800 rounded-sm px-2 py-1 mt-2">
                    {label}
                  </figcaption>

                </a>
              </figure>
            ))}
          </div>
        </section>


        <TenEntries />
        <MainAccordion />

        <div className="mx-auto py-10">
          <Count />
        </div>
        <section aria-labelledby="popular-brands-title" className="pt-10 mx-10">
          <h2
            id="popular-brands-title"
            className="text-black text-4xl text-center md:text-2xl lg:text-2xl font-bold xs:text-xl xxs:text-2xl"
          >
            Popular Brands
          </h2>

          <ul
            className="grid grid-cols-5 md:grid-cols-4 sm:grid-cols-4 lg:grid-cols-4 xs:grid-cols-2 xxs:grid-cols-2 s:grid-cols-2 gap-1 xs:mx-4 s:mx-4 xxs:mx-4 md:ml-11 my-10"
            role="list"
          >
            {[
              { name: 'Toyota', href: '/search-by-make/Toyota', src: '/img/car-logos/toyota.webp', alt: 'Toyota spare parts Sharjah' },
              { name: 'Mitsubishi', href: '/search-by-make/Mitsubishi', src: '/img/car-logos/mitsubishi.webp', alt: 'Mitsubishi parts Dubai' },
              { name: 'Mercedes-Benz', href: '/search-by-make/Mercedes-benz', src: '/img/car-logos/mercedesbenz.webp', alt: 'Mercedes Benz parts Sharjah' },
              { name: 'Nissan', href: '/search-by-make/Nissan', src: '/img/car-logos/nissan.webp', alt: 'Nissan parts Dubai' },
              { name: 'Ford', href: '/search-by-make/Ford', src: '/img/car-logos/ford.webp', alt: 'Ford parts Ajman' },
              { name: 'Hyundai', href: '/search-by-make/Hyundai', src: '/img/car-logos/hyundai.webp', alt: 'Hyundai spare parts Dubai' },
              { name: 'Volkswagen', href: '/search-by-make/Volkswagen', src: '/img/car-logos/volkswagon.webp', alt: 'Volkswagen parts UAE' },
              { name: 'Honda', href: '/search-by-make/Honda', src: '/img/car-logos/honda.webp', alt: 'Honda spare parts UAE' },
              { name: 'Lexus', href: '/search-by-make/Lexus', src: '/img/car-logos/lexus.webp', alt: 'Lexus spare parts Sharjah' },
              { name: 'Volvo', href: '/search-by-make/Volvo', src: '/img/car-logos/volvo.webp', alt: 'Volvo parts UAE' },
              { name: 'Kia', href: '/search-by-make/Kia', src: '/img/car-logos/kia.webp', alt: 'Kia spare parts UAE' },
              { name: 'Porsche', href: '/search-by-make/Porsche', src: '/img/car-logos/porsche.webp', alt: 'Porsche parts UAE' },
              { name: 'Chevrolet', href: '/search-by-make/Chevrolet', src: '/img/car-logos/chevrolet.webp', alt: 'Chevrolet spare parts UAE' },
              { name: 'Land Rover', href: '/search-by-make/Land Rover', src: '/img/car-logos/land_rover.webp', alt: 'Land Rover parts UAE' },
            ].map((brand) => (
              <li key={brand.name}>
                <a href={brand.href} className="block border h-full hover:border-blue-600 py-3" aria-label={`${brand.name} spare parts`}>

                  <figure className="flex flex-col items-center justify-center">
                    <Image
                      src={brand.src}
                      alt={brand.alt}
                      className="object-scale-down"
                      width={50}
                      height={50}
                    />
                    <figcaption className="text-center mt-2 w-3/5 bg-darkblue hover:bg-blue-400 font-bold text-white text-sm hover:text-gray-800 rounded-sm px-2 py-1">
                      {brand.name}
                    </figcaption>
                  </figure>

                </a>
              </li>
            ))}
          </ul>
        </section>

      </div>
      <StaticCities />

      <Contents />
    </div>
  );
}
