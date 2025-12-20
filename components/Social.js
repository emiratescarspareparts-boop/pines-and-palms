'use client';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  fab,
  faFacebook,
  faInstagram,
  faPinterest,
  faTumblr,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';

export default function Social() {
  return (
    <div className="bg-bglight ">
      <div className="grid grid-cols-5 place-items-center gap-4 text-center pt-5">
        <div>
          <a
            href="https://www.facebook.com/emirates.auto.parts"
            title="used car parts"
            className="px-3 py-2 flex items-center text-xl leading-snug text-white hover:opacity-75"
          >
            <FontAwesomeIcon
              icon={faFacebook}
              className="text-blue-700 text-4xl xs:text-3xl sm:text-xl md:text-4xl lg:text-4xl"
            />
          </a>
        </div>
        <div>
          <a
            href="https://www.instagram.com/emiratescar_parts/"
            title="car trends"
            className="px-3 py-2 flex items-center text-xl leading-snug text-white hover:opacity-75"
            target="_newtab"
          >
            <FontAwesomeIcon
              icon={faInstagram}
              className="text-purple-800 text-4xl xs:text-3xl sm:text-xl md:text-4xl lg:text-4xl"
            />
          </a>
        </div>
        <div>
          <a
            href="https://twitter.com/emiratescarpart"
            title="emirates car parts news"
            className="px-3 py-2 flex items-center text-xl leading-snug text-white hover:opacity-75"
            target="_newtab"
          >
            <FontAwesomeIcon
              icon={faTwitter}
              className="text-blue-400 text-4xl xs:text-3xl sm:text-xl md:text-4xl lg:text-4xl"
            />
          </a>
        </div>
        <div>
          <a
            href="https://emirates-car.tumblr.com/"
            title="emirates car parts"
            className="px-3 py-2 flex items-center text-xl leading-snug text-white hover:opacity-75"
            target="_newtab"
          >
            <FontAwesomeIcon
              icon={faTumblr}
              className="text-black text-4xl xs:text-3xl sm:text-xl md:text-4xl lg:text-4xl"
            />
          </a>
        </div>
        <div>
          <a
            href="https://in.pinterest.com/emiratesautomobileparts/"
            title="emirates car parts"
            className="px-3 py-2 flex items-center text-xl leading-snug text-white hover:opacity-75"
            target="_newtab"
          >
            <FontAwesomeIcon
              icon={faPinterest}
              className="text-red-700 text-4xl xs:text-3xl sm:text-xl md:text-4xl lg:text-4xl"
            />
          </a>
        </div>
        <div>
          <a
            href="https://www.linkedin.com/in/emirates-car-771929232/"
            title="emirates car parts career"
            className="px-3 py-2 flex items-center text-xl leading-snug text-white hover:opacity-75"
            target="_newtab"
          >
            <i className="fab fa-linkedin text-blue-500 text-4xl xs:text-3xl sm:text-xl md:text-4xl lg:text-4xl"></i>
          </a>
        </div>
      </div>
    </div>
  );
}
