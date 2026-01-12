import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import Hero_img from '../../public/img/car-spare-parts.png';
import Social from '../../components/Social';
import PartsData from "../../public/lib/parts.json"
import CarData from "../../public/lib/car-data.json";
import FormOnly from '../../components/FormOnly';

export const revalidate = 86400;
export const runtime = 'nodejs';
export const dynamicParams = false;

function getMake() {
  const uniqueMakes = {};
  for (let i = 0; i < CarData.length; i++) {
    const car = CarData[i];
    if (!uniqueMakes[car.make]) {
      uniqueMakes[car.make] = car;
    }
  }
  return Object.values(uniqueMakes);
}


export default function Contact() {
  const partsposts = PartsData;
  const modelforms = CarData;
  const posts = getMake();

  return (
    <div>
      <h1 className="text-4xl md:text-lg lg:text-2xl text-center font-extrabold xs:text-base xxs:text-xs">
        Auto Spare parts in UAE
      </h1>
      <p className="pt-5 font-extrabold text-center">
        emiratesautomobileparts@gmail.com
      </p>
      <div className='sm:max-w-xl lg:max-w-2xl md:max-w-xl xl:max-w-2xl xxl:max-w-2xl mx-auto xs:mx-3 xxs:mx-3 sm:mx-5'>
        <FormOnly formsData={modelforms} />
      </div>
      <div className="py-6 bg-blue-500">
        <div className="pb-6 xs:pb-3 p-2 sm:pb-3 xxs:pb-3">
          <h6 className="text-3xl xs:text-sm text-white uppercase text-center font-bold xxs:text-base md:text-xl lg:text-2xl s:text-sm">
            COULD&apos;NT FIND YOUR DESIRED AUTO PARTS?{' '}
            <Link
              href="https://emirates-car.com/contact"
              className="underline text-blue-900"
            >
              CONTACT US NOW
            </Link>
          </h6>
        </div>
        <Social />
        {/*Footer*/}
        <div className="bg-blue-900 py-10 xs:py-5 xxs:py-5 sm:py-5">
          <div className="grid grid-cols-4 xs:grid-cols-1 s:grid-cols-1 sm:grid-cols-1">
            <div className="text-center mx-auto">
              <Image
                src="/img/car-spare-parts.png"
                alt="spare parts in uae"
                height={50}
                width={50}
              />
              <p className="pt-5 text-white font-extrabold">
                About EMIRATESCAR
              </p>
              <p className="text-sm xs:text-xs pt-5 m-1 text-center font-medium text-purple-400">
                We are dealing with auto spare parts for car,
                coupe, SUV, prime, Petrol based vehicles, Diesel based
                vehicles, Used spare parts, Aftermarket parts, Genuine spare
                parts and New parts. Contact us for any inquiry.
              </p>
            </div>
            <div className="pt-10 xs:pt-5 xxs:pt-5 sm:pt-5 mx-auto text-center">
              <p className="pt-5 text-white font-extrabold">SOCIAL LINKS</p>
              <p>
                <Link
                  className="text-xl leading-xl text-blue-900"
                  href="https://www.facebook.com/emirates.auto.parts"
                >
                  <i className="fab fa-2x fa-facebook"></i>
                </Link>
                &nbsp;
                <Link
                  className="text-xl leading-xl text-purple-900"
                  href="https://www.instagram.com/emiratescar_parts/"
                >
                  <i className="fab fa-2x fa-instagram"></i>
                </Link>
                &nbsp;
                <Link
                  className="text-xl leading-xl text-black"
                  href="https://emirates-car.tumblr.com/"
                >
                  <i className="fab fa-2x fa-tumblr"></i>
                </Link>
                &nbsp;
                <Link
                  className="text-xl leading-xl text-blue-300"
                  href="https://twitter.com/uaeautoparts"
                >
                  <i className="fab fa-2x fa-twitter"></i>
                </Link>
                &nbsp;
                <Link
                  className="text-xl leading-xl text-red-700"
                  href="https://in.pinterest.com/emiratesautomobileparts/"
                >
                  <i className="fab fa-2x fa-pinterest"></i>
                </Link>
                &nbsp;
                <Link
                  className="text-xl leading-xl text-blue-500"
                  href="https://in.pinterest.com/emiratesautomobileparts/"
                >
                  <i className="fab fa-2x fa-linkedin"></i>
                </Link>
              </p>
            </div>

            <div className="pt-10 xs:py-5 xxs:pt-5 sm:pt-5 mx-auto text-center">
              <p className="pt-5 text-white font-extrabold">SHORTCUT LINKS</p>
              <Link
                href="https://emirates-car.com/search-by-part-name"
                className="text-base xs:text-sm xxs:text-sm sm:text-base text-white underline"
              >
                Search parts by part name in UAE
              </Link>
              <br />
              <Link
                href="https://emirates-car.com/search-by-make"
                className="text-base xs:text-sm xxs:text-sm sm:text-base text-white underline"
              >
                Search parts by Car make in UAE
              </Link>
              <br />
              <Link
                href="https://emirates-car.com/search-by-cities-in-uae"
                className="text-base xs:text-sm xxs:text-sm sm:text-base text-white underline"
              >
                Search parts by cities in UAE
              </Link>
            </div>
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
            <div></div>
          </div>
          <p className="pt-5 text-white font-extrabold text-center xs:hidden sm:hidden xxs:hidden">
            Auto spare parts
          </p>

          <div className="grid grid-cols-10 md:grid-cols-7 xs:hidden sm:hidden xxs:hidden p-3">
            {posts.map((post, i) => (
              <div key={i}>
                <Link
                  href="https://www.emirates-car.com/search-by-make/[make]"
                  as={'https://www.emirates-car.com/search-by-make/' + post.make}
                  className="text-base text-white font-medium hover:text-gray-200 underline"
                >
                  {post.make + ' parts'}
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center text-purple-200 py-10">
            <Link
              href="https://www.emirates-car.com"
              target="_newtab"
              title="buy car parts online"
              className="text-base xs:text-sm xxs:text-sm sm:text-base text-white underline"
            >
              <i className="fa fa-copyright" aria-hidden="true"></i>
              Copyright © 2023 Emirates-car. All rights reserved.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
