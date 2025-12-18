import Head from 'next/head';
import Link from 'next/link';
import Footer from '../../components/footer';
import Social from '../../components/Social';
import FormBattery from '../../components/FormBattery';
import BatteryAccordion from '../../components/Battery-Accordion';
import BatterySlider from '../../components/Battery-Slider';
export const revalidate = 1814400;
export const runtime = 'edge';
export const dynamicParams = false;
import CarData from "../../public/lib/car-data.json"

export const metadata = {
  title: 'Quick Car Battery Replacement services in UAE | Emirates-car.com',
  description:
    "Don't panic, we know your car battery dead. Contact us right away to get your car battery replacement services in Dubai, sharjah, Abu dhabi, Ajman, Al quoz and other cities irrespective of any car brands."
};

export default function CarBatteryDubai() {
  const modelforms = CarData;
  return (
    <div>
      <Head>
        <title>
          Quick Car Battery Replacement services in UAE | Emirates-car.com
        </title>
        <meta
          property="og:title"
          content="Quick Car Battery Replacement services in UAE | Emirates-car.com"
        />
        <meta property="og:site_name" content="Emirates-car" />
        <meta
          property="og:url"
          content="https://www.emirates-car.com/car-battery-replacement-services-in-uae"
        />
        <meta
          property="og:description"
          content="Don't panic, we know your car battery dead. Contact us right away to get your helping hands in Dubai, sharjah, Abu dhabi, Ajman, Al quoz and other cities irrespective of any car brands."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://emirates-car.com/img/car-auto-parts/battery.png"
        />
        <meta property="twitter:url" content="https://www.emirates-car.com" />
        <meta
          property="twitter:title"
          content="Quick Car Battery Replacement services in UAE | Emirates-car.com"
        />
        <meta
          property="twitter:description"
          content="Don't panic, we know your car battery dead. Contact us right away to get your helping hands in Dubai, sharjah, Abu dhabi, Ajman, Al quoz and other cities irrespective of any car brands."
        />
        <meta
          property="twitter:image"
          content="https://emirates-car.com/img/car-spare-parts.png"
        />
        <link
          rel="canonical"
          href="https://www.emirates-car.com/car-battery-replacement-services-in-uae"
        />
      </Head>
      <div className="grid grid-cols-2 xs:grid xs:grid-cols-1 s:grid s:grid-cols-1 xs:mx-auto xs:text-center sm:grid sm:grid-cols-2  2xs:grid 2xs:grid-cols-1 xs:pt-5 s:pt-5">
        <div>
          <div className="mt-10 ml-8 max-w-full sm:mt-12 sm:ml-6 md:mt-16 lg:mt-20 lg:ml-1 lg:px-8 xl:mt-28 md:ml-7 xl:ml-20 xs:mt-2 xs:text-left 2xs:mt-2 s:mt-2">
            <div className="sm:ml-5 lg:text-left xs:text-center">
              <h1 className="tracking-tight font-extrabold xl:text-6xl sm:text-3xl md:text-4xl lg:text-5xl xs:text-2xl s:text-xl xs:font-sans">
                <span className="block xl:inline">
                  Car Battery Replacement &nbsp;
                  <span className="block text-blue-600 xl:inline">
                    Services in UAE
                  </span>
                </span>
              </h1>
              <p className="mt-3 text-base text-gray-400 sm:mt-5 sm:text-xs md:mt-5 md:text-sm lg:mx-0 xs:text-sm xl:text-lg s:text-sm 2xs:text-sm font-serif">
                The only inquiry form you will need to get your car battery
                change right away on your spot in Dubai, Sharjah, Abu dhabi, Al
                quoz, Ajman, Ras al Khaimah and all the locations in uae.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex lg:justify-start xs:pb-20 s:pb-20">
                <div className="w-1/2 lg:w-40 xs:w-48 xs:mx-auto s:w-48 s:mx-auto 2xs:w-auto 2xs:mx-auto rounded-lg shadow-md">
                  <Link
                    href="https://emirates-car.com/#myForm"
                    className="flex items-center justify-center px-8 py-2 xl:text-xl border border-transparent font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-2 md:text-md mg:text-lg md:px-5 xs:py-2 xs:text-xs xs:my-2 2xs:text-sm 2xs:my-2 s:text-sm s:my-2 focus:filter brightness-125"
                  >
                    Order Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 sm:mt-12 md:mt-16 lg:mt-5 ">
          <BatterySlider />
        </div>
      </div>
      <div className="container mx-auto xl:px-10 xs:px-3 md:px-5 lg:px-6 mt-10">
        <div

          style={{ backgroundColor: '#FAFAFA' }}
        >
          <p
            className="font-extrabold text-5xl xs:text-base md:text-2xl lg:text-2xl text-center p-2"
            style={{ color: 'red', backgroundColor: 'yellow' }}
          >
            QUICKLY FILL IN YOUR DETAILS TO GET IT REPLACED ON SPOT!
          </p>
          <FormBattery formsData={modelforms} />
        </div>

        <div className="text-center mt-2 text-red-400 text-sm xs:text-xs">
          **Make not found above?{' '}
          <Link href="/get-in-touch">
            <nobr className="text-blue-500 text-sm underline">
              Get in touch with us {'>>'}**
            </nobr>
          </Link>{' '}
        </div>
      </div>

      <Social />
      <div className="place-content-center text-center pt-10 xl:mx-36 lg:mx-10 md:mx-10 sm:mx-5 xs:mx-2 xs:py-0 2xs:mx-2 s:mx-2  md:ml-11 my-10 mx-10">
        <p className="text-blue-600 text-center text-4xl md:text-lg lg:text-2xl font-extrabold xs:text-xl 2xs:text-xl s:text-xl">
          FAQ SESSION
        </p>
        <BatteryAccordion />
      </div>

      <div className="place-content-center text-center pt-10 xl:mx-36 lg:mx-10 md:mx-10 sm:mx-5 xs:mx-2 xs:py-0 2xs:mx-2 s:mx-2  md:ml-11 my-10 mx-10">
        <p className="text-blue-600 text-center text-4xl md:text-lg lg:text-2xl font-extrabold xs:text-xl 2xs:text-xl s:text-xl">
          EMIRATES-CAR.COM | WHY ARE WE SPECIAL?
        </p>
        <div className="grid grid-cols-3 text-center gap-2 xs:grid xs:grid-cols-1 xs:gap-1 2xs:text-sm 2xs:grid 2xs:grid-cols-1 s:grid s:grid-cols-1 md:px-2 pt-10 xs:pt-5 mx-8 2xs:mx-5 s:mx-4 xs:mx-5">
          <div className="font-extrabold uppercase bg-gradient-to-r from-blue-500 via-blue-200 to-blue-500 rounded-xl lg:mx-6 py-2 shadow-2xl xs:shadow-none sm:shadow-none xs:text-xs text-center">
            <h1 className="text-2xl text-blue-800 lg:text-base  font-semibold font-mono">
              <i className="fas fa-check-circle fa-2x"></i>
            </h1>

            <h1 className="text-xl lg:text-xl sm:text-base xs:text-base s:text-base 2xs:text-base md:text-sm font-extrabold p-1">
              Warranty Guaranteed
            </h1>
          </div>
          <div className="font-extrabold  uppercase bg-gradient-to-r from-blue-500 via-blue-200 to-blue-500 rounded-xl lg:mx-6 py-2 shadow-2xl xs:shadow-none sm:shadow-none xs:text-xs text-center">
            <h1 className="text-2xl text-blue-800 lg:text-base sm:text-xs md:text-sm font-extrabold">
              <i className="fas fa-money-check fa-2x"></i>
            </h1>

            <h1 className="text-xl lg:text-xl sm:text-base xs:text-base s:text-base 2xs:text-base md:text-sm font-extrabold">
              Easy payment
            </h1>
          </div>
          <div className="font-extrabold uppercase bg-gradient-to-r from-blue-500 via-blue-200 to-blue-500 rounded-xl lg:mx-6 py-2 shadow-2xl xs:shadow-none sm:shadow-none xs:text-xs text-center">
            <h1 className="text-2xl text-blue-800 lg:text-base  font-semibold font-mono">
              <i className="fas fa-wrench fa-2x"></i>
            </h1>
            <h1 className="text-xl lg:text-xl sm:text-base xs:text-base s:text-base 2xs:text-base md:text-sm font-extrabold">
              Professional Services
            </h1>
          </div>
        </div>
        <div className="grid grid-cols-3 text-center gap-2 xs:grid xs:grid-cols-1 xs:gap-1 2xs:text-sm 2xs:grid 2xs:grid-cols-1 s:grid s:grid-cols-1 md:px-2 pt-10 xs:pt-5 mx-8 2xs:mx-5 s:mx-4 xs:mx-5">
          <div className="font-extrabold uppercase bg-gradient-to-r from-blue-500 via-blue-200 to-blue-500 rounded-xl lg:mx-6 py-2 shadow-2xl xs:shadow-none sm:shadow-none xs:text-xs text-center">
            <h1 className="text-2xl text-blue-800 lg:text-base  font-semibold font-mono">
              <i className="fas fa-phone fa-2x"></i>
            </h1>
            <h1 className="text-xl lg:text-xl sm:text-base xs:text-base s:text-base 2xs:text-base md:text-sm font-extrabold p-1">
              Quick response
            </h1>
          </div>
          <div className="font-extrabold  uppercase bg-gradient-to-r from-blue-500 via-blue-200 to-blue-500 rounded-xl lg:mx-6 py-2 shadow-2xl xs:shadow-none sm:shadow-none xs:text-xs text-center">
            <h1 className="text-2xl text-blue-800 lg:text-base sm:text-xs md:text-sm font-extrabold">
              <i className="fas fa-clock fa-2x"></i>
            </h1>
            <h1 className="text-xl lg:text-xl sm:text-base xs:text-base s:text-base 2xs:text-base md:text-sm font-extrabold">
              24/7 Support
            </h1>
          </div>
          <div className="font-extrabold uppercase bg-gradient-to-r from-blue-500 via-blue-200 to-blue-500 rounded-xl lg:mx-6 py-2 shadow-2xl xs:shadow-none sm:shadow-none xs:text-xs text-center">
            <h1 className="text-2xl text-blue-800 lg:text-base  font-semibold font-mono">
              <i className="fas fa-truck fa-2x"></i>
            </h1>
            <h1 className="text-xl lg:text-xl sm:text-base xs:text-base s:text-base 2xs:text-base md:text-sm font-extrabold">
              Delivery On the Spot
            </h1>
          </div>
        </div>
      </div>
      <div className="place-content-center text-center pt-10 xl:mx-36 lg:mx-10 md:mx-10 sm:mx-5 xs:mx-2 xs:py-0 2xs:mx-2 s:mx-2  md:ml-11 my-10 mx-10">
        <p className="text-blue-600 text-center text-4xl md:text-lg lg:text-2xl font-extrabold xs:text-xl 2xs:text-xl s:text-xl">
          ABOUT Emirates-car
        </p>
        <p className="text-lg text-gray-800 py-4 sm:mt-5 sm:text-base md:mt-5 md:text-sm lg:mx-0 lg:text-base xs:text-sm 2xs:text-sm s:text-sm xs:mx-2">
          We also are dealing with auto spare parts for car, heavy truck, van,
          buses, coupe, SUV, prime, Petrol based vehicles, Diesel based
          vehicles, Used spare parts, After market parts, Genuine spare parts
          and New parts etc in UAE. Contact us for any inquiry.
        </p>
        <p className="text-lg text-gray-800 py-4 sm:mt-5 sm:text-base md:mt-5 md:text-sm lg:mx-0 lg:text-base xs:text-sm 2xs:text-sm s:text-sm xs:mx-2">
          Explore from our immensively large-scale auto spare parts website,
          your New / Used / Genuine / Aftermarket auto spare parts for your
          Vehicle needs - Car / Jeep / Van / Truck / Buses in Your city in UAE
          especially in the main cities like Dubai, Sharjah, Abu dhabi, Ajman
          and other city.
        </p>
        <p className="text-lg text-gray-800 py-4 sm:mt-5 sm:text-base md:mt-5 md:text-sm lg:mx-0 lg:text-base xs:text-sm 2xs:text-sm s:text-sm xs:mx-2">
          You can search Your spare parts by:
          <li className="text-blue-500 hover:text-blue-800 list-none underline">
            {' '}
            <i className="fas fa-car"></i>{' '}
            <Link href="/search-by-make">
              Car Make Model
            </Link>
          </li>
          <li className="text-blue-500 hover:text-blue-800 list-none underline">
            {' '}
            <i className="fas fa-bolt"></i>{' '}
            <Link href="/search-by-part-name">
              Car Spare parts
            </Link>
          </li>
          <li className="text-blue-500 hover:text-blue-800 list-none underline">
            {' '}
            <i className="fas fa-map-pin"></i>{' '}
            <Link href="/search-by-cities-in-uae">
              Location in UAE
            </Link>
          </li>
        </p>
      </div>
      <Footer />
    </div>
  );
}

