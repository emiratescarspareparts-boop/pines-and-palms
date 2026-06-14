'use client';
import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { faCopyright, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Social from './Social';

const brands = [
  'Honda', 'Volvo', 'Infiniti', 'Volkswagen', 'Dodge',
  'Kia', 'Lexus', 'Mazda', 'Cadillac', 'Chevrolet', 'Ford',
];

const cities = [
  'Dubai', 'Sharjah', 'Abu Dhabi', 'Ras Al Khaimah',
  'Fujairah', 'Umm Al Quwain', 'Al Ain',
];

export default function Footer() {
  return (
    <div className="py-6 bg-blue-500">
      <Social />
      <div className="bg-darkblue py-10 xs:py-5 xxs:py-5 sm:py-5">
        <div className="grid grid-cols-4 xs:grid xs:grid-cols-1 s:grid s:grid-cols-1 sm:grid sm:grid-cols-1 gap-6 px-4">
          {/* About */}
          <div className="text-center">
            <h3 className="pt-5 text-white font-extrabold">
              ABOUT Emirates-car.com
            </h3>
            <p className="text-sm xs:text-xs pt-5 m-1 text-center font-medium text-yellow-400">
              EMIRATESCAR is the marketplace for Auto spare parts in UAE. The prices listed for genuine and aftermarket parts are based on approximate market rate. The consulation are provided through whatsapp in Arabic, English, Urdu. Affordable options are also discussed. Wide variety of quality options are adviced. We discuss parts of different origin of German, Japanese, Korean, American specifications. <a href="/about" className='text-blue-500 underline'>Read more</a>. For any inquiries, we highly recommend to submit the form.
            </p>
          </div>

          {/* Car Brands */}
          <div className="pt-10 xs:pt-5 xxs:pt-5 sm:pt-5 mx-auto text-center">
            <h6 className="pt-5 text-white font-extrabold">CAR BRANDS</h6>
            <ul className="flex flex-col gap-1 mt-2">
              {brands.map((brand) => (
                <li key={brand}>
                  <Link
                    href={`https://www.emirates-car.com/search-by-make/${brand}`}
                    className="text-base xs:text-sm xxs:text-sm sm:text-base text-white underline"
                  >
                    {brand} Parts
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Shortcut Links */}
          <div className="pt-10 xs:py-5 xxs:pt-5 sm:pt-5 mx-auto text-center">
            <h6 className="pt-5 text-white font-extrabold">SHORTCUT LINKS</h6>
            <ul className="flex flex-col gap-1 mt-2">
              <li>
                <Link
                  href="https://www.emirates-car.com/search-by-part-name"
                  className="text-base xs:text-sm xxs:text-sm sm:text-base text-white underline"
                >
                  All Parts
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.emirates-car.com/search-by-make"
                  className="text-base xs:text-sm xxs:text-sm sm:text-base text-white underline"
                >
                  Car Brands
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.emirates-car.com/search-by-cities-in-uae"
                  className="text-base xs:text-sm xxs:text-sm sm:text-base text-white underline"
                >
                  UAE Location
                </Link>
              </li>
            </ul>
          </div>

          {/* UAE Cities */}
          <div className="pt-10 xs:py-5 xxs:pt-5 sm:pt-5 mx-auto text-center">
            <h6 className="pt-5 text-white font-extrabold">UAE LOCATIONS</h6>
            <ul className="flex flex-col gap-1 mt-2">
              {cities.map((city) => (
                <li key={city}>
                  <Link
                    href={`https://www.emirates-car.com/search-by-cities-in-uae/${city}`}
                    className="text-base xs:text-sm xxs:text-sm sm:text-base text-white underline"
                  >
                    Auto Parts in {city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Map */}
        <div className="pt-10 px-4">
          <div className="mx-auto max-w-4xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3722504.3860201286!2d51.71183150969869!3d24.337497293019872!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5e48dfb1ab12bd%3A0x33d32f56c0080aa7!2sUnited%20Arab%20Emirates!5e0!3m2!1sen!2sin!4v1641654109734!5m2!1sen!2sin"
              title="auto spare parts dubai"
              width="100%"
              height="300"
              style={{ border: '0' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Contact */}
        <div className="text-center pt-10">
          <p className="text-white font-extrabold">Email Address</p>
          <p className="text-base xs:text-sm xxs:text-sm sm:text-base text-white underline mt-2">
            <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
            emiratesautomobileparts@gmail.com
          </p>
        </div>

        {/* Copyright */}
        <div className="text-center text-purple-200 py-10">
          <Link
            href="https://www.emirates-car.com"
            className="text-base xs:text-sm xxs:text-sm sm:text-base text-white underline"
          >
            <FontAwesomeIcon icon={faCopyright} className="text-xl leading-xl mr-1" />
            Emirates-car.com
          </Link>
        </div>
      </div>
    </div>
  );
}