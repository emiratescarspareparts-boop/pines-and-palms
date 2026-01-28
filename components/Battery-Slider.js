'use client';
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
import Link from 'next/link';

const settings = {
  autoplay: true,
  arrows: false,
  centerMode: false,
  autoplaySpeed: 3000,
  pauseOnHover: true,
  fade: false,
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      }
    }
  ]
};

const batteryData = [
  {
    name: 'AMARON',
    image: '/img/battery/amaron.png',
    description: 'Top level brand recommended for any vehicle makes, used largely by many car owners in UAE.'
  },
  {
    name: 'ACDELCO',
    image: '/img/battery/acdelco.webp',
    description: 'High-demand battery replacement service trusted by customers across UAE.'
  },
  {
    name: 'SOLITE',
    image: '/img/battery/solite.jpg',
    description: 'Most reliable automotive batteries at best price with superior standards.'
  },
  {
    name: 'VARTA',
    image: '/img/battery/varta.jpg',
    description: 'Best durability and high standard batteries deliverable across UAE.'
  },
  {
    name: 'SEBANG',
    image: '/img/battery/sebang.webp',
    description: 'Premium Korean battery widely used on UAE roads with exceptional standards.'
  }
];

export default function BatterySlider() {
  return (
    <div className="py-10">
      <Slider {...settings} className="px-4">
        {batteryData.map((battery, index) => (
          <div key={index} className="px-3">
            <Link href="/car-battery-replacement-services-in-uae/#myBatteryForm">
              <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col overflow-hidden border border-gray-200">
                {/* Image Container - Fixed Height */}
                <div className="relative h-64 bg-gradient-to-br from-blue-50 to-gray-50 flex items-center justify-center p-6">
                  <div className="relative w-full h-full">
                    <Image
                      alt={`${battery.name} battery`}
                      className="object-contain"
                      src={battery.image}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                </div>

                {/* Content Container - Fixed Height */}
                <div className="p-5 flex flex-col flex-grow bg-white">
                  {/* Brand Name */}
                  <h3 className="text-2xl font-extrabold text-center text-darkblue mb-3">
                    {battery.name}
                  </h3>

                  {/* Description - Fixed Height with Line Clamp */}
                  <p className="text-sm text-gray-700 text-center leading-relaxed line-clamp-3 flex-grow">
                    {battery.description}
                  </p>

                  {/* Call to Action */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <button className="w-full bg-darkblue text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300 text-sm font-semibold">
                      Order Now
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
}