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
  title:
    '8TH Generation Honda Accord 2008, 2009, 2010, 2011, 2012 parts - Used, Genuine, OEM,  Aftermarket | EMIRATESCAR',
  description:
    'Engines for 2.4L, 3.5L, 2.2L VTEC, DTEC, V6 engines , Body parts, Interior and exterior parts, suspension parts, headlight, fog lights and other lighting parts, performance parts and more',
  openGraph: {
    images: '/favicon.png',
    title:
      '8TH Generation Honda Accord 2008, 2009, 2010, 2011, 2012 parts - Used / Genuine / OEM /  Aftermarket | EMIRATESCAR',
    description:
      'Engines for 2.4L, 3.5L, 2.2L VTEC, DTEC, V6 engines , Body parts, Interior and exterior parts, suspension parts, headlight, fog lights and other lighting parts, performance parts and more',
    url: 'https://www.emirates-car.com/honda-accord-8th-gen-body-parts',
    image: 'https://www.emirates-car.com/img/car-logos/Honda.webp',
    siteName: 'EMIRATESCAR',
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
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title:
      '8TH Generation Honda Accord 2008, 2009, 2010, 2011, 2012 parts - Used / Genuine / OEM /  Aftermarket | Emirates-car.com',
    url: 'https://www.emirates-car.com/honda-accord-8th-gen-body-parts',
    description:
      'Engines for 2.4L, 3.5L, 2.2L VTEC, DTEC, V6 engines , Body parts, Interior and exterior parts, suspension parts, headlight, fog lights and other lighting parts, performance parts and more',
    images: ['https://www.emirates-car.com/favicon.png']
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
  category: 'Honda > Accord > 8th Generation parts',
  alternates: {
    canonical: 'https://www.emirates-car.com/honda-accord-8th-gen-body-parts'
  },
  keywords:
    'honda accord spare parts sharjah, honda accord spare parts, honda accord 2008 brake pads, honda body parts, honda accord spare parts, 8th gen accord parts, performance parts for honda accord, headlight, tailight, suspension parts'
};

export default function RootLayout({ children }) {
  return (
    <>{children}</>
  );
}
