import '../../styles/globals.css';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#2563eb'
};

export const metadata = {
  title:
    'Auto Spare Parts Order Online in UAE from Dubai dealers | Emirates-car.com',
  description:
    'Buy Online and Get delivered Used, New, Genuine / Original / OEM, Aftermarket auto spare parts Online in UAE for German, American, Korean, Japanese models',
  openGraph: {
    images: 'https://www.emirates-car.com/icons/icon-32x32.png',
    title:
      'Auto Spare Parts Order Online in UAE from Dubai dealers | Emirates-car.com',
    description:
      'Buy Online and Get delivered Used, New, Genuine / Original / OEM, Aftermarket auto spare parts Online in UAE for German, American, Korean, Japanese models',
    url: 'https://www.emirates-car.com/search-by-brands-in-uae',
    image: 'https://www.emirates-car.com/img/car-spare-parts.png',
    siteName: 'EMIRATESCAR',
    images: [
      {
        url: 'https://www.emirates-car.com/icons/icon-192x192.png',
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
    title:
      'Auto Spare Parts Order Online in UAE from Dubai dealers |Emirates-car.com',
    url: `https://www.emirates-car.com/search-by-brands-in-uae`,
    description:
      'Buy Online and Get delivered Used, New, Genuine / Original / OEM, Aftermarket auto spare parts Online in UAE for German, American, Korean, Japanese models',
    images: ['https://www.emirates-car.com/icons/favicon-32x32.png']
  },
  icons: {
    icon: 'https://www.emirates-car.com/icons/favicon-32x32.png',
    shortcut: 'https://www.emirates-car.com/icons/icon-96x96.png',
    apple: 'https://www.emirates-car.com/icons/icon-192x192.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: 'https://www.emirates-car.com/icons/icon-152x152.png'
    }
  },
  category: 'Vehicle Parts & Accessories > Auto Spare parts in UAE',
  alternates: {
    canonical: `https://www.emirates-car.com/search-by-brands-in-uae`
  },
  keywords:
    'how to buy auto spare parts in uae, how to search for auto spare parts in dubai sharjah, how to search for auto spare parts in dubai online, dubai spare parts market, dubai spare parts market online, auto spare parts sharjah, auto spare parts wholesalers dubai, Whats the best online auto parts store, parts market uae'
};

export default function RootLayout({ children }) {
  return (
    <>{children}</>
  );
}
