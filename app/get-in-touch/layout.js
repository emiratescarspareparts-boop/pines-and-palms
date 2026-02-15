import '../../styles/globals.css';
import Navbar from '../../components/nav';

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
    images: 'https://www.emirates-car.com/favicon-32x32.png',
    title: 'Quick Auto Spare Parts Hunt in UAE | Emirates-car.com',
    description:
      'Explore from our immensively large-scale auto spare parts website, your New / Used / Genuine / Aftermarket auto spare parts for your Vehicle needs - Car / Jeep / Van / Truck / Buses in Your city.',
    url: 'https://www.emirates-car.com/contact',
    image: 'https://www.emirates-car.com/img/car-spare-parts.png',
    siteName: 'Emirates Auto Parts',
    images: [
      {
        url: 'https://www.emirates-car.com/icon-192x192.png',
        width: 192,
        height: 192
      },
      {
        url: 'https://www.emirates-car.com/icons/icon-512x512.png',
        width: 512,
        height: 512,
        alt: 'car parts'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quick Auto Spare Parts Hunt in UAE | Emirates-car.com',
    url:
      'https://www.emirates-car.com/blog/car-parts-you-might-need-to-check-for-your-flooded-cars',
    description:
      'Explore from our immensively large-scale auto spare parts website, your New / Used / Genuine / Aftermarket auto spare parts for your Vehicle needs - Car / Jeep / Van / Truck / Buses in Your city.',
    images: ['https://www.emirates-car.com/favicon.png']
  },
  icons: {
    icon: 'https://www.emirates-car.com/favicon-32x32.png',
    shortcut: 'https://www.emirates-car.com/icons/icon-96x96.png',
    apple: 'https://www.emirates-car.com/icons/icon-192x192.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: 'https://www.emirates-car.com/icons/icon-152x152.png'
    }
  },
  category: 'car parts',
  alternates: {
    canonical: 'https://www.emirates-car.com/get-in-touch'
  },
  keywords:
    'honda accord spare parts sharjah, honda accord spare parts, honda accord 2008 brake pads, honda accord 2009 distributor, honda accord wheel, honda accord 2012 abs, honda accord engine, honda accord gearbox, honda accord axle, honda accord air filter, honda accord carburetor'
};

export default function RootLayout({ children }) {
  return (
    <>{children}</>
  );
}
