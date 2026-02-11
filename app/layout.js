import '../styles/globals.css';
import Navbar from '../components/nav';
import '@fortawesome/fontawesome-svg-core/styles.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Footer from "../components/footer"
import Analytics from '../components/Analytics.client';
import Tawk from '../components/Tawk.client';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#2563eb',
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans">
        <Analytics />
        <Tawk />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
