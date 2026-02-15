
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#2563eb',
};

export const metadata = {
  title: 'Online American Auto Spare Parts in UAE - New | Used | Genuine | Aftermarket | OEM',
  description: 'Buy Online and Get delivered American Used, New, Genuine / Original / OEM, Aftermarket auto spare parts Online in UAE Body parts, Interior and exterior parts, suspension parts, headlight, fog lights and other lighting parts, performance parts and more',
  openGraph: {
    title: 'Online American Auto Spare Parts in UAE - New | Used | Genuine | Aftermarket | OEM',
    description: 'Buy Online and Get delivered American Used, New, Genuine / Original / OEM, Aftermarket auto spare parts Online in UAE Body parts, Interior and exterior parts, suspension parts, headlight, fog lights and other lighting parts, performance parts and more',
    url: 'https://www.emirates-car.com/spare-parts/american-auto-spare-parts',
    siteName: 'Emirates Auto Parts',
    images: [
      {
        url: 'https://www.emirates-car.com/img/car-spare-parts.png',
        width: 1200,
        height: 630,
        alt: 'American car spare parts',
      },
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
    title: 'Online American Auto Spare Parts in UAE - New | Used | Genuine | Aftermarket | OEM',
    description: 'Buy Online and Get delivered American Used, New, Genuine / Original / OEM, Aftermarket auto spare parts Online in UAE Body parts, Interior and exterior parts, suspension parts, headlight, fog lights and other lighting parts, performance parts and more',
    images: ['https://www.emirates-car.com/icons/favicon-32x32.png'],
  },
  alternates: {
    canonical: 'https://www.emirates-car.com/spare-parts/american-auto-spare-parts',
  },
};

export default function AmericanPartsLayout({ children }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "American Spare Parts",
    "about": {
      "@type": "Country",
      "name": "American"
    },
    "url": "https://www.emirates-car.com/spare-parts/american-auto-spare-parts",
    "description": "A comprehensive collection of Used, New, Genuine, OEM, Aftermarket spare parts for american car makes including ford, Chevrolet, GMC, Jeep, Hummer, Cadillac, Dodge, Chrysler, Buick, Ram"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {children}
    </>
  );
}