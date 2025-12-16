'use client';
import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { faCopyright } from '@fortawesome/free-solid-svg-icons';
import Social from './Social';

export default function footer() {
  return (
    <div className="py-6 bg-blue-500">
      <div className="pb-6 xs:pb-3 p-2 sm:pb-3 2xs:pb-3">
        <h3 className="text-3xl xs:text-sm text-white uppercase text-center font-bold 2xs:text-base md:text-xl lg:text-2xl s:text-sm">
          Want to get More Buyers?&nbsp;
          <Link
            href="https://www.emirates-car.com/supplier-inquiry-form"
            target='_blank'
            className="underline text-blue-900"
          >
            Become a Supplier Now!
          </Link>
        </h3>
      </div>
      <Social />
      <div className=" bg-darkblue py-10 xs:py-5 2xs:py-5 sm:py-5">
        <div className="grid grid-cols-3 xs:grid xs:grid-cols-1 s:grid s:grid-cols-1 sm:grid sm:grid-cols-1 ">
          <div className="text-center">
            <h3 className="pt-5 text-white font-extrabold">
              ABOUT Emirates-car.com
            </h3>
            <p className="text-sm xs:text-xs pt-5 m-1 text-center font-medium text-yellow-400">
              We are dealing with auto spare parts for car, heavy truck, van,
              buses, coupe, SUV, prime, Petrol based vehicles, Diesel based
              vehicles, Used spare parts, After market parts, Genuine spare
              parts and New parts etc. Contact us for any inquiry.
            </p>
          </div>
          <div className="pt-10 xs:pt-5 2xs:pt-5 sm:pt-5 mx-auto text-center">
            <div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3722504.3860201286!2d51.71183150969869!3d24.337497293019872!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5e48dfb1ab12bd%3A0x33d32f56c0080aa7!2sUnited%20Arab%20Emirates!5e0!3m2!1sen!2sin!4v1641654109734!5m2!1sen!2sin"
                title="auto spare parts dubai"
                width="100%"
                height="100%"
                style={{ border: '0' }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
          <div className="pt-10 xs:py-5 2xs:pt-5 sm:pt-5 mx-auto text-center">
            <h6 className="pt-5 text-white font-extrabold">SHORTCUT LINKS</h6>
            <Link
              href="https://emirates-car.com/search-by-part-name"
              className="text-base xs:text-sm 2xs:text-sm sm:text-base text-white underline"
            >
              All Parts
            </Link>
            <br />
            <Link
              href="https://emirates-car.com/search-by-make"
              className="text-base xs:text-sm 2xs:text-sm sm:text-base text-white underline"
            >
              Car Brands
            </Link>
            <br />
            <Link
              href="https://emirates-car.com/search-by-cities-in-uae"
              className="text-base xs:text-sm 2xs:text-sm sm:text-base text-white underline"
            >
              UAE Location
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-3 xs:grid xs:grid-cols-1 s:grid s:grid-cols-1 sm:grid sm:grid-cols-1 ">
          <div className="pt-10 xs:py-5 2xs:pt-5 sm:pt-5 mx-auto text-center">
            <p className="pt-5 text-white font-extrabold">Email Address</p>
            <p className="text-base xs:text-sm 2xs:text-sm sm:text-base text-white underline">
              emiratesautomobileparts@gmail.com
            </p>
          </div>
        </div>

        <div className="text-center text-purple-200 py-10">
          <Link
            href="https://emirates-car.com"
            className="text-base xs:text-sm 2xs:text-sm sm:text-base text-white underline"
          >
            <FontAwesomeIcon
              icon={faCopyright}
              className="text-xl leading-xl"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
