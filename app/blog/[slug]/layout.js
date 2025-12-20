import '../../../styles/globals.css';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#2563eb'
};



export default function RootLayout({ children }) {
  return (
    <>{children}</>
  );
}
