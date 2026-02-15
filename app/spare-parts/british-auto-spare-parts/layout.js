import '../../../styles/globals.css';

const schema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "British Spare Parts",
  "about": {
    "@type": "Country",
    "name": "British"
  },
  "url": "https://www.emirates-car.com/spare-parts/british-auto-spare-parts",
  "description": "A comprehensive collection of Used, New, Genuine, OEM, Aftermarket spare parts for korean car makes including Aston martin, Bentley, Jaguar, Land rover, Lotus, McLaren, Mini and Rolls Royce."
};

export const metadata = {
  title:
    'Online British Auto Spare Parts in UAE - New | Used | Genuine | Aftermarket | OEM',
  description:
    'Buy Online and Get delivered British Used, New, Genuine / Original / OEM, Aftermarket auto spare parts Online in UAE Body parts, Interior and exterior parts, suspension parts, headlight, fog lights and other lighting parts, performance parts and more',
  openGraph: {
    images: 'https://www.emirates-car.com/icons/favicon-32x32.png',
    title:
      'Online British Auto Spare Parts in UAE - New | Used | Genuine | Aftermarket | OEM',
    description:
      'Buy Online and Get delivered British Used, New, Genuine / Original / OEM, Aftermarket auto spare parts Online in UAE Body parts, Interior and exterior parts, suspension parts, headlight, fog lights and other lighting parts, performance parts and more',
    url: 'https://www.emirates-car.com/spare-parts/british-auto-spare-parts',
    image: 'https://www.emirates-car.com/img/car-spare-parts.png',
    siteName: 'Emirates Auto Parts',
    images: [
      {
        url: 'https://www.emirates-car.com/icons/icon-192x192.png',
        width: 192,
        height: 192,
      },
      {
        url: 'https://www.emirates-car.com/icons/icon-512x512.png',
        width: 512,
        height: 512,
        alt: 'car parts',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'Online British Auto Spare Parts in UAE - New | Used | Genuine | Aftermarket | OEM',
    url: 'https://www.emirates-car.com/spare-parts/british-auto-spare-parts',
    description:
      'Buy Online and Get delivered British Used, New, Genuine / Original / OEM, Aftermarket auto spare parts Online in UAE Body parts, Interior and exterior parts, suspension parts, headlight, fog lights and other lighting parts, performance parts and more',
    images: ['https://www.emirates-car.com/icons/favicon-32x32.png'],
  },
  icons: {
    icon: 'https://www.emirates-car.com/icons/favicon-32x32.pngg',
    shortcut: 'https://www.emirates-car.com/icons/icon-96x96.png',
    apple: 'https://www.emirates-car.com/icons/icon-192x192.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: 'https://www.emirates-car.com/icons/icon-152x152.png',
    },
  },
  alternates: {
    canonical: `https://www.emirates-car.com/spare-parts/british-auto-spare-parts}`,
  },
  category: 'Britain spare parts',
  other: {
    "script:ld+json": JSON.stringify(schema),
  },
};

export default function RootLayout({ children }) {
  return (
    <>{children}</>
  );
}
