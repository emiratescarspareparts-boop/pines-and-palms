import React, { Component } from 'react';
import Image from "next/image";
import Nav from './nav';

export default class products extends Component {
  render() {
    return (
      <div>
        <Nav />
        <div className="grid grid-cols-8 xs:grid xs:grid-cols-2 ml-8 xs:mx-5">
          <div className="text-center">
            <Image
              src='../public/img/icons/united-kingdom.png'
              alt="used car parts"
              className="object-scale-down h-40 w-full xs:object-none"
            />
            <p className="text-gray-500 text-sm">BRITAIN</p>
          </div>
          <div className="text-center">
            <Image
              src='../public/img/icons/india.png'
              alt="used car parts dubai"
              className="object-scale-down h-40 w-full xs:object-none"
            />
            <p className="text-gray-500 text-sm">INDIAN</p>
          </div>
          <div className="text-center">
            <Image
              src='../public/img/icons/japan.png'
              alt="used spare parts dubai"
              className="object-scale-down h-40 w-full xs:object-none"
            />
            <p className="text-gray-500 text-sm">JAPANESE</p>
          </div>
          <div className="text-center">
            <Image
              src='../public/img/icons/south-korea.png'
              alt="used parts honda civic"
              className="object-scale-down h-40 w-full xs:object-none"
            />
            <p className="text-gray-500 text-sm">KOREAN</p>
          </div>
          <div className="text-center">
            <Image
              src='../public/img/icons/usa.png'
              alt="spare parts UK"
              className="object-scale-down h-40 w-full xs:object-none"
            />
            <p className="text-gray-500 text-sm">USA</p>
          </div>
          <div className="text-center">
            <Image
              src='../public/img/icons/germany.png'
              alt="german car parts"
              className="object-scale-down h-40 w-full xs:object-none"
            />
            <p className="text-gray-500 text-sm">GERMAN</p>
          </div>
          <div className="text-center">
            <Image
              src='../public/img/icons/china.png'
              alt="china car parts"
              className="object-scale-down h-40 w-full xs:object-none"
            />
            <p className="text-gray-500 text-sm">CHINESE</p>
          </div>
          <div className="text-center">
            <Image
              src='../public/img/icons/france.png'
              alt="car parts emirates"
              className="object-scale-down h-40 w-full xs:object-none"
            />
            <p className="text-gray-500 text-sm xs:text-xs">FRANCE</p>
          </div>
        </div>
      </div>
    );
  }
}
