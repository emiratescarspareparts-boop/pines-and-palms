import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const IMAGE_BASE_PATH = '/img/honda-eighth-gen';

const imagePaths = {
  ABS: `${IMAGE_BASE_PATH}/ABS.webp`,
  AirFilter: `${IMAGE_BASE_PATH}/Air_Filter.webp`,
  AirSuspension: `${IMAGE_BASE_PATH}/Air_Suspension_Module.webp`,
  AxleAssembly: `${IMAGE_BASE_PATH}/Axle_Assembly_Rear.webp`,
  BrakePads: `${IMAGE_BASE_PATH}/Brake_Pads.webp`,
  CatalyticConverter: `${IMAGE_BASE_PATH}/Catalytic_Converter.webp`,
  CylinderHead: `${IMAGE_BASE_PATH}/Cylinder_Head.webp`,
  Distributor: `${IMAGE_BASE_PATH}/Distributor.webp`,
  Engine: `${IMAGE_BASE_PATH}/Engine.webp`,
  ExhaustManifold: `${IMAGE_BASE_PATH}/Exhaust_Manifold.webp`,
  GearBox: `${IMAGE_BASE_PATH}/Gearbox.webp`,
  Grille: `${IMAGE_BASE_PATH}/Grille.webp`,
  Headlight: `${IMAGE_BASE_PATH}/Headlight.webp`,
  MasterCylinderKit: `${IMAGE_BASE_PATH}/Master_Cylinder.webp`,
  Radiator: `${IMAGE_BASE_PATH}/Radiator.webp`,
  RearBumper: `${IMAGE_BASE_PATH}/Rear_Bumper_Assembly.webp`,
  ReverseLight: `${IMAGE_BASE_PATH}/Reverse_Light.webp`,
  Rim: `${IMAGE_BASE_PATH}/Rim.webp`,
  SeatBelt: `${IMAGE_BASE_PATH}/Seat_Belt.webp`,
  ShockAbsorber: `${IMAGE_BASE_PATH}/Shock_Absorber.webp`,
  SideMirror: `${IMAGE_BASE_PATH}/Side_Mirror.webp`,
  SteeringWheel: `${IMAGE_BASE_PATH}/Steering_Wheel.webp`,
  Wheel: `${IMAGE_BASE_PATH}/Wheel.webp`,
  MudFlap: `${IMAGE_BASE_PATH}/Mud_Flap.webp`,
}

export default function Honda() {
  const images = [
    {
      images: imagePaths.ABS,
      name: 'ABS',
      alt: 'honda accord anti lock braking system',
      link:
        'https://emirates-car.com/search-by-part-name/Anti-Lock%20Brake%20Control%20Module%20(ABS)'
    },
    {
      images: imagePaths.AirFilter,
      name: 'Air Filter',
      alt: 'honda accord air filter',
      link: 'https://emirates-car.com/get-in-touch'
    },

    {
      images: imagePaths.AirSuspension,
      name: 'Air Suspension',
      alt: 'honda accord air suspension',
      link: 'https://emirates-car.com/get-in-touch'
    },

    {
      images: imagePaths.AxleAssembly,
      name: 'Axle',
      alt: 'honda accord axle',
      link:
        'https://emirates-car.com/search-by-part-name/Axle%20Assembly%20(Front,%204WD)'
    },
    {
      images: imagePaths.BrakePads,
      name: 'Brake Pads',
      alt: 'honda accord brake pads',
      link: 'https://emirates-car.com/get-in-touch'
    },
    {
      images: imagePaths.CatalyticConverter,
      name: 'Catalytic Convertor',
      alt: 'honda accord catalytic convertor',
      link: 'https://emirates-car.com/get-in-touch'
    },
    {
      images: imagePaths.CylinderHead,
      name: 'Cylinder Head',
      alt: 'honda accord cylinder',
      link: 'https://emirates-car.com/search-by-part-name/Cylinder%20Head)'
    },
    {
      images: imagePaths.Distributor,
      name: 'Distributor',
      alt: 'honda accord distributor',
      link: 'https://emirates-car.com/search-by-part-name/Distributor'
    },
    {
      images: imagePaths.Engine,
      name: 'Engine',
      alt: 'honda accord engine',
      link: 'https://emirates-car.com/search-by-part-name/Engine%20Assembly'
    },
    {
      images: imagePaths.ExhaustManifold,
      name: 'Exhaust Manifold',
      alt: 'honda accord exhaust system',
      link: 'https://emirates-car.com/search-by-part-name/Exhaust%20Manifold'
    },
    {
      images: imagePaths.GearBox,
      name: 'Gearbox / Transmission',
      alt: 'honda accord gearbox',
      link:
        'https://emirates-car.com/search-by-part-name/Transmission%20Control%20Module'
    },
    {
      images: imagePaths.Grille,
      name: 'Grille',
      alt: 'honda accord grill',
      link: 'https://emirates-car.com/search-by-part-name/Grille'
    },
    {
      images: imagePaths.Headlight,
      name: 'Headlight',
      alt: 'honda accord headlight bulb',
      link: 'https://emirates-car.com/search-by-part-name/Headlight%20Assembly'
    },
    {
      images: imagePaths.MasterCylinderKit,
      name: 'Master Cylinder',
      alt: 'honda accord master cylinder',
      link:
        'https://emirates-car.com/search-by-part-name/Master%20Cylinder%20(Clutch)'
    },
    {
      images: imagePaths.MudFlap,
      name: 'Mud Flap',
      alt: 'honda accord mud flaps',
      link: 'https://emirates-car.com/get-in-touch'
    },
    {
      images: imagePaths.Radiator,
      name: 'Radiator',
      alt: 'honda accord radiator',
      link: 'https://emirates-car.com/search-by-part-name/Radiator'
    },
    {
      images: imagePaths.RearBumper,
      name: 'Rear Bumper',
      alt: 'honda accord rear bumper',
      link:
        'https://emirates-car.com/search-by-part-name/Bumper%20Assembly%20(Rear)'
    },
    {
      images: imagePaths.ReverseLight,
      name: 'Reverse Light',
      alt: 'honda accord reverse light bulb',
      link: 'https://emirates-car.com/search-by-part-name/Reverse%20Light'
    },
    {
      images: imagePaths.Rim,
      name: 'Rims',
      alt: 'honda accord rims for sale',
      link: 'https://emirates-car.com/search-by-part-name/Rim'
    },
    {
      images: imagePaths.SeatBelt,
      name: 'Seat Belt',
      alt: 'honda accord seat belt',
      link: 'https://emirates-car.com/search-by-part-name/Seat%20Belt'
    },
    {
      images: imagePaths.ShockAbsorber,
      name: 'Shock Absorber',
      alt: 'honda accord shock absorber',
      link: 'https://emirates-car.com/search-by-part-name/Shock%20Absorber'
    },
    {
      images: imagePaths.SideMirror,
      name: 'Mirror',
      alt: 'honda accord mirrors',
      link:
        'https://emirates-car.com/search-by-part-name/Mirror%20(Rear%20View)'
    },
    {
      images: imagePaths.SteeringWheel,
      name: 'Steering Wheel',
      alt: 'honda accord steering wheel',
      link: 'https://emirates-car.com/search-by-part-name/Steering%20Wheel'
    },
    {
      images: imagePaths.Wheel,
      name: 'Wheels',
      alt: 'honda accord wheels',
      link: 'https://emirates-car.com/search-by-part-name/Wheel'
    }
  ];

  return (
    <div>
      <div className="grid grid-cols-5 gap-2 s:grid-cols-2 xs:grid-cols-2 md:grid-cols-3">
        {images.map((i, m) => (
          <div key={m} className="border-2 p-5 relative">
            <sup className="absolute top-0 right-0 text-sm font-bold text-white bg-red-600 rounded-l-xl rounded-r-xl p-1">
              Sale!!
            </sup>
            <div className="h-50">
              <h6 className="text-xl font-bold font-sans">{i.name}</h6>
            </div>

            <hr className="py-1" />
            <Image
              src={i.images}
              alt={i.alt}
              height={250}
              width={250}
              className="object-none object-center p-1"
              priority
            />

            <Link
              href={i.link}
              title={'Honda accord ' + i.name}
              className="flex items-center justify-center px-8 py-2 xl:text-xl border border-transparent font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-2 md:text-md mg:text-lg md:px-5 xs:py-2 xs:text-xs xs:my-2 2xs:text-sm 2xs:my-2 s:text-sm s:my-2 focus:filter brightness-125"
            >
              Inquire Now
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
