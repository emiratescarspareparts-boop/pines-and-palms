import Head from 'next/head';
import Link from 'next/link';
import Footer from '../../components/footer';
import Social from '../../components/Social';
import FormBattery from '../../components/FormBattery';
import BatteryAccordion from '../../components/Battery-Accordion';
import BatterySlider from '../../components/Battery-Slider';
export const revalidate = 1814400;
export const runtime = 'nodejs';
export const dynamicParams = false;
import CarData from "../../public/lib/car-data.json"
import { Fira_Sans, Playfair_Display } from 'next/font/google';
import { BadgeCheck, Car, Clock, LeafyGreen, LinkIcon, MapPin, Recycle, Zap } from 'lucide-react';

const playfair_display = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair-display",
});

const firaSans = Fira_Sans({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fira-sans',
});

export const metadata = {
  title: 'Car Battery Replacement services in UAE | Emirates-car.com',
  description:
    "Car Battery replacement services at Home | Dubai & Sharjah"
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
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 xs:grid-cols-1 xxs:grid-cols-1 mx-auto xl:px-10 xs:px-3 xxs:px-4 md:px-5 lg:px-6 mt-5 border-2 p-5 rounded-sm">
          <div className='mt-20 xs:mt-5 xxs:mt-5 sm:mt-5 md:mt-5 lg:mt-10'>
            <h1 className={`flex items-center font-bold text-3xl mt-3 xs:text-2xl ${playfair_display.className}`}>
              Car Battery Replacement Services in Dubai & Sharjah <span><a href="#myBatteryForm"><LinkIcon className="text-blue-500 h-12 w-12 md:hidden lg:hidden xxl:hidden xl:hidden xs:h-5 xxs:h-5" /></a></span>
            </h1>
            <ul className='space-y-3 mt-5'>
              <li className="flex items-start gap-3">
                <Clock className={`w-5 h-5 text-blue-600 flex-shrink-0 mt-1 ${firaSans.className}`} />
                <span>24/7 emergency car battery replacement services available round the clock</span>
              </li>
              <li className="flex items-start gap-3">
                <Car className={`w-5 h-5 text-red-600 flex-shrink-0 mt-1 ${firaSans.className}`} />
                <span>On-site car battery replacement at your location for maximum convenience</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className={`w-5 h-5 text-black flex-shrink-0 mt-1 ${firaSans.className}`} />
                <span>Services available across Dubai and Sharjah with quick response times</span>
              </li>
              <li className="flex items-start gap-3">
                <BadgeCheck className={`w-5 h-5 text-yellow-400 flex-shrink-0 mt-1 ${firaSans.className}`} />
                <span>Instant professional installation by certified technicians</span>
              </li>
              <li className="flex items-start gap-3">
                <Recycle className={`w-5 h-5 text-green-600 flex-shrink-0 mt-1 ${firaSans.className}`} />
                <span>Safe old Battery Disposal</span>
              </li>
            </ul>
          </div>
          <div><FormBattery formsData={modelforms} /></div>
        </div>
        <div className="text-center mt-2 text-red-400 text-sm xs:text-xs">
          **Make not found above?{' '}
          <Link href="/get-in-touch">
            <nobr className="text-blue-500 text-sm underline">
              Get in touch with us {'>>'}**
            </nobr>
          </Link>{' '}
        </div>
        <BatterySlider />

        <div className="place-content-center text-center pt-10 xl:mx-36 lg:mx-10 md:mx-10 sm:mx-5 xs:mx-2 xs:py-0 2xs:mx-2 s:mx-2  md:ml-11 my-10 mx-10">
          <p className="text-blue-600 text-center text-4xl md:text-lg lg:text-2xl font-extrabold xs:text-xl 2xs:text-xl s:text-xl">
            FAQ SESSION
          </p>
          <BatteryAccordion />
        </div>

      </div>

    </div>
  );
}

