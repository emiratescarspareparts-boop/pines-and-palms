import '../../../styles/globals.css';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#2563eb',
};

const schema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "France Spare Parts",
  "about": {
    "@type": "Country",
    "name": "France"
  },
  "url": "https://www.emirates-car.com/spare-parts/french-auto-spare-parts",
  "description": "A comprehensive collection of Used, New, Genuine, OEM, Aftermarket spare parts for France car makes including Renault, Peugeot, Citroen and Bugatti"
};

export const metadata = {
  title:
    'Online France Auto Spare Parts in UAE - New | Used | Genuine | Aftermarket | OEM',
  description:
    'Buy Online and Get delivered France Used, New, Genuine / Original / OEM, Aftermarket auto spare parts Online in UAE Body parts, Interior and exterior parts, suspension parts, headlight, fog lights and other lighting parts, performance parts and more',
  openGraph: {
    images: 'https://www.emirates-car.com/favicon.png',
    title:
      'Online France Auto Spare Parts in UAE - New | Used | Genuine | Aftermarket | OEM',
    description:
      'Buy Online and Get delivered France Used, New, Genuine / Original / OEM, Aftermarket auto spare parts Online in UAE Body parts, Interior and exterior parts, suspension parts, headlight, fog lights and other lighting parts, performance parts and more',
    url: 'https://www.emirates-car.com/spare-parts/french-auto-spare-parts',
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
      'Online France Auto Spare Parts in UAE - New | Used | Genuine | Aftermarket | OEM',
    url: 'https://www.emirates-car.com/spare-parts/french-auto-spare-parts',
    description:
      'Buy Online and Get delivered France Used, New, Genuine / Original / OEM, Aftermarket auto spare parts Online in UAE Body parts, Interior and exterior parts, suspension parts, headlight, fog lights and other lighting parts, performance parts and more',
    images: ['https://www.emirates-car.com/icons/favicon-32x32.png'],
  },
  icons: {
    icon: 'https://www.emirates-car.com/icons/favicon-32x32.png',
    shortcut: 'https://www.emirates-car.com/icons/icon-96x96.png',
    apple: 'https://www.emirates-car.com/icons/icon-192x192.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: 'https://www.emirates-car.com/icons/icon-152x152.png',
    },
  },
  alternates: {
    canonical: `https://www.emirates-car.com/spare-parts/french-auto-spare-parts`,
  },
  category: 'french origin car parts',
  other: {
    "script:ld+json": JSON.stringify(schema),
  },
};
export default function RootLayout({ children }) {
  return (
    <>{children}</>
  );
}
