import React from 'react'

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#2563eb'
};

export const metadata = {
  title: 'Auto spare parts in UAE |  Emirates-car.com',
  description:
    'Explore from our immensively large-scale auto spare parts website, your New / Used / Genuine / Aftermarket auto spare parts for your Vehicle needs - Car / Jeep / Van / Truck / Buses in Your city.',
  openGraph: {
    images: '/favicon.png',
    title: 'Quick Auto Spare Parts Hunt in UAE | Emirates-car.com',
    description:
      'Explore from our immensively large-scale auto spare parts website, your New / Used / Genuine / Aftermarket auto spare parts for your Vehicle needs - Car / Jeep / Van / Truck / Buses in Your city.',
    url: 'https://emirates-car.com/contact',
    image: 'https://emirates-car.com/img/car-spare-parts.png',
    siteName: 'Emirates Auto Parts',
    images: [
      {
        url: 'https://emirates-car.com/icon-192x192.png',
        width: 192,
        height: 192
      },
      {
        url: 'https://emirates-car.com/icons/icon-512x512.png',
        width: 512,
        height: 512,
        alt: 'car parts'
      }
    ],
    locale: 'en_US',
    type: 'website',
    alternates: {
      canonical: 'https://emirates-car.com/contact'
    }
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quick Auto Spare Parts Hunt in UAE | Emirates-car.com',
    url:
      'https://emirates-car.com/blog/car-parts-you-might-need-to-check-for-your-flooded-cars',
    description:
      'Explore from our immensively large-scale auto spare parts website, your New / Used / Genuine / Aftermarket auto spare parts for your Vehicle needs - Car / Jeep / Van / Truck / Buses in Your city.',
    images: ['https://emirates-car.com/favicon.png']
  },
  icons: {
    icon: '/favicon.png',
    shortcut: '/icons/icon-96x96.png',
    apple: '/icons/icon-192x192.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/icons/icon-152x152.png'
    }
  },
  category: 'car parts'
};

export default function RootLayout({ children }) {
  return (
    <>{children}</>
  );
}
