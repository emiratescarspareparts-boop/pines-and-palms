import Hero from '../components/home_hero';
import Count from '../components/service-countup';
import Image from 'next/image';
import TenEntries from '../components/tenentries';
import Contents from '../components/Contents';
import StaticCities from '../components/StaticCities';
import MainAccordion from '../components/Main-Accordion';
import "../public/main.css"
import HeroCarousel from '../components/HeroCarousel';
import CarData from "../public/lib/car-data.json"
import PartsData from "../public/lib/parts.json"
import Link from 'next/link';
import FormComponent from '../components/FormComponent';
import { Fira_Sans, Playfair_Display } from 'next/font/google';
import { CheckCircle } from 'lucide-react';
import FormOnly from '../components/FormOnly';

export const revalidate = 1814400;
export const runtime = 'nodejs';
export const dynamicParams = false;

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






export default async function Home() {
  const modelforms = CarData;
  const partsposts = PartsData;

  return (
    <div>

      <section
        className="py-5 xxs:py-0 xs:py-0 s:py-0 sm:px-7 lg:mx-6 md:mx-6 xs:px-0 s:px-2 max-w-7xl mx-auto"
        aria-label="auto spare parts in uae"
      >
        <div className="bg-backgroundlight rounded-sm">
          <div className="grid grid-cols-2 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-1 xxs:grid-cols-1 xs:text-center xs:pt-0">
            <div>
              <div className="lg:ml-8 md:ml-4 xl:ml-8 xxl:ml-8 xs:ml-3 xxs:ml-2 mt-40 lg:mt-28 xxs:mt-8 xxs:pt-8 sm:mt-12 md:mt-10 xs:mt-0 xs:text-center xxs:text-center md:text-center">
                <h1
                  className={`text-3xl xxs:mt-5 xs:mt-5 s:mt-5 sm:mt-5 lg:text-2xl md:text-2xl xxs:text-2xl xs:text-xl font-extrabold lg:leading-tight ${firaSans.className}`}
                >
                  Best Car Spare Parts Prices in UAE –{" "}
                  <span className="text-blue-500">Pre-Compared Quotes</span>
                </h1>

                <p className="mt-3 text-5xl xl:text-4xl xxl:text-2xl lg:text-4xl md:text-4xl xxs:text-xl xs:text-lg font-medium">
                  We Compare 100+ Suppliers So You Don&apos;t Have To. Get the Best Price Guaranteed.
                </p>

                <div className="mt-5 mx-auto sm:mx-5 md:mx-5 xxs:mx-3 xs:mx-3 xxs:my-5">
                  <div className="grid grid-cols-2 gap-2 py-3 xl:w-full xxl:w-full lg:w-full xs:w-full xxs:w-full mr-auto lg:mx-auto xl:mx-auto md:mx-auto xxl:mx-auto sm:mx-auto rounded-lg shadow-md">
                    <a
                      href="#myForm"
                      title="Inquire about vehicle parts online"
                      className="flex items-center justify-center py-2 text-xl xl:text-4xl xxl:text-4xl lg:text-lg md:text-lg xs:text-lg xxs:text-lg font-medium rounded-sm text-white bg-blue-600 hover:bg-blue-700"
                    >
                      Inquire Now
                    </a>

                    <a
                      href="/search-by-make"
                      title="Explore vehicle spare parts"
                      className="flex items-center justify-center py-2 text-xl xl:text-4xl xxl:text-4xl lg:text-lg md:text-lg xs:text-lg xxs:text-lg font-medium rounded-sm text-white bg-blue-400 hover:bg-blue-500"
                    >
                      Explore
                    </a>
                  </div>
                </div>

                {/* Description */}
                <p className="mt-10 mb-3 hidden md:block text-sm text-gray-700">
                  We deal with auto parts for German, Japanese, Chinese, French, British origin cars.
                </p>

                {/* Country Icons */}
                <div className="hidden md:block">
                  <div className="grid grid-cols-8 md:grid-cols-4 lg:grid-cols-4 gap-2 place-content-center mb-10">
                    {[
                      { src: "/img/icons/germany.png", label: "Germany", href: "/spare-parts/german-auto-spare-parts" },
                      { src: "/img/icons/united-kingdom.png", label: "Britain", href: "/spare-parts/british-auto-spare-parts" },
                      { src: "/img/icons/japan.png", label: "Japan", href: "/spare-parts/japanese-auto-spare-parts" },
                      { src: "/img/icons/south-korea.png", label: "Korean", href: "/spare-parts/korean-auto-spare-parts" },
                      { src: "/img/icons/usa.png", label: "USA", href: "/spare-parts/american-auto-spare-parts" },
                      { src: "/img/icons/india.png", label: "Indian", href: "/spare-parts/indian-auto-spare-parts" },
                      { src: "/img/icons/china.png", label: "China", href: "/spare-parts/chinese-auto-spare-parts" },
                      { src: "/img/icons/france.png", label: "French", href: "/spare-parts/french-auto-spare-parts" },
                    ].map(({ src, label, href }) => (
                      <Link key={label} href={href}>
                        <figure className="flex flex-col items-center text-center">
                          <Image
                            src={src}
                            alt={`${label} car auto spare parts`}
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

            <div className="xxs:hidden xs:hidden md:hidden">
              <HeroCarousel />
            </div>
          </div>
        </div>
      </section>

      <FormComponent formsData={modelforms} postFilter={partsposts} />

      <div className='sm:max-w-xl lg:max-w-2xl md:max-w-xl xl:max-w-2xl xxl:max-w-2xl mx-auto xs:mx-3 xxs:mx-3 sm:mx-5'>
        <FormOnly formsData={modelforms} />
      </div>

      <section>
        <div className="text-center mx-auto max-w-7xl xs:px-3 xxs:px-2 xxs:mx-3 py-10 xs:py-5 xxs:py-5">
          <div className="grid grid-cols-4 text-center gap-2 xs:grid xs:grid-cols-2 s:grid s:grid-cols-2 xs:gap-1 xxs:text-sm xxs:grid xxs:grid-cols-2 xs:pb-5 s:pb-10">
            {/* New Parts */}
            <div className="text-base lg:text-base sm:text-xs md:text-sm bg-gradient-to-r from-blue-500 via-blue-200 to-blue-500 rounded-sm lg:mx-6 py-2 shadow-2xl xs:text-xs s:text-xs xs:shadow-none sm:shadow-none">
              <figure className="flex flex-col items-center">
                <Image
                  src="/img/icons/new-car.png"
                  alt="automotive parts store"
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
                  src="/img/icons/used-car.png"
                  alt="auto spare parts in dubai"
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
                  src="/img/icons/genuine.png"
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
                  src="/img/icons/aftermarket.png"
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
      </section>




      <div className="bg-bglight max-w-7xl mx-auto">
        <h3 className="text-black text-4xl my-10 text-center md:text-2xl lg:text-2xl font-bold xs:text-xl xxs:text-2xl pt-10">
          Popular <span className="text-blue-500">Country Origin</span> Spare parts
        </h3>

        <div className="grid grid-cols-8 gap-4 xs:grid-cols-4 xxs:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 place-content-center my-10 pb-10 xs:px-2 xxs:px-2">

          {/* Britain */}
          <div className="flex justify-center text-center">
            <figure>
              <Link href="/spare-parts/british-auto-spare-parts">
                <Image
                  src="/img/icons/united-kingdom.png"
                  alt="british car auto spare parts"
                  priority
                  height={50}
                  width={50}
                />
              </Link>
              <figcaption className="text-sm">Britain</figcaption>
            </figure>
          </div>

          <div className="flex justify-center text-center">
            <figure>
              <Image
                src="/img/icons/india.png"
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
                  src="/img/icons/japan.png"
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
                  src="/img/icons/south-korea.png"
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
                  src="/img/icons/usa.png"
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
                  src="/img/icons/germany.png"
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
                  src="/img/icons/china.png"
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
                  src="/img/icons/france.png"
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
