import '../styles/globals.css';
import Navbar from '../components/nav';
import Script from 'next/script';
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
const homepageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://www.emirates-car.com/#website",
      "url": "https://www.emirates-car.com/",
      "name": "EMIRATESCAR",
    },
    {
      "@type": "Organization",
      "@id": "https://www.emirates-car.com/#organization",
      "name": "EMIRATESCAR",
      "url": "https://www.emirates-car.com/",
      "logo": "https://www.emirates-car.com/img/car-spare-parts.png",
      "sameAs": [
        "https://www.facebook.com/emirates.auto.parts",
        "https://www.instagram.com/emiratescar_parts/",
        "https://x.com/emiratescarpart",
        "https://www.linkedin.com/company/emirates-car-auto-parts/"
      ]
    },
    {
      "@type": "AutoPartsStore",
      "name": "EMIRATESCAR",
      "url": "https://www.emirates-car.com/",
      "areaServed": [
        { "@type": "City", "name": "Total Abu Al Bukhoosh Abu Dhabi", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Total%20Abu%20Al%20Bukhoosh%20Abu%20Dhabi" },
        { "@type": "City", "name": "Abu Dhabi", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Abu%20Dhabi" },
        { "@type": "City", "name": "Abu Musa Island", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Abu%20Musa%20Island" },
        { "@type": "City", "name": "Ahmed bin Rashid Free Zone (UAQ FTZ) (Umm Al Quwain)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Ahmed%20bin%20Rashid%20Free%20Zone%20(UAQ%20FTZ)%20(Umm%20Al%20Quwain)" },
        { "@type": "City", "name": "Ajman", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Ajman" },
        { "@type": "City", "name": "Al Ain (Abu Dhabi)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Al%20Ain%20(Abu%20Dhabi)" },
        { "@type": "City", "name": "Al Barsha (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Al%20Barsha%20(Dubai)" },
        { "@type": "City", "name": "Al Dhafra or Western Region (Abu Dhabi)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Al%20Dhafra%20or%20Western%20Region%20(Abu%20Dhabi)" },
        { "@type": "City", "name": "Al Fujairah", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Al%20Fujairah" },
        { "@type": "City", "name": "Al Hamriyah (Sharjah)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Al%20Hamriyah%20(Sharjah)" },
        { "@type": "City", "name": "AlJazeera Port (Ras al Khaimah)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/AlJazeera%20Port%20(Ras%20al%20Khaimah)" },
        { "@type": "City", "name": "Al Jeer Port (Ras al Khaimah)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Al%20Jeer%20Port%20(Ras%20al%20Khaimah)" },
        { "@type": "City", "name": "Al Mafraq (Abu Dhabi)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Al%20Mafraq%20(Abu%20Dhabi)" },
        { "@type": "City", "name": "Al Quoz (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Al%20Quoz%20(Dubai)" },
        { "@type": "City", "name": "Al Sufouh (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Al%20Sufouh%20(Dubai)" },
        { "@type": "City", "name": "Al Ruways Industrial City (Abu Dhabi)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Al%20Ruways%20Industrial%20City%20(Abu%20Dhabi)" },
        { "@type": "City", "name": "Arzanah Island (Abu Dhabi)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Arzanah%20Island%20(Abu%20Dhabi)" },
        { "@type": "City", "name": "Das Island (Abu Dhabi)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Das%20Island%20(Abu%20Dhabi)" },
        { "@type": "City", "name": "Deira (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Deira%20(Dubai)" },
        { "@type": "City", "name": "Dibba Al Fujairah (Fujairah)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Dibba%20Al%20Fujairah%20(Fujairah)" },
        { "@type": "City", "name": "Dubai", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Dubai" },
        { "@type": "City", "name": "Dubai World Central (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Dubai%20World%20Central%20(Dubai)" },
        { "@type": "City", "name": "Esnnad (Abu Dhabi)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Esnnad%20(Abu%20Dhabi)" },
        { "@type": "City", "name": "Sea Port (Fateh Terminal)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Sea%20Port%20(Fateh%20Terminal)" },
        { "@type": "City", "name": "Free Port (Abu Dhabi)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Free%20Port%20(Abu%20Dhabi)" },
        { "@type": "City", "name": "Habshan (Abu Dhabi)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Habshan%20(Abu%20Dhabi)" },
        { "@type": "City", "name": "Abu Hail (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Abu%20Hail%20(Dubai)" },
        { "@type": "City", "name": "Hamriya Free Zone Port", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Hamriya%20Free%20Zone%20Port" },
        { "@type": "City", "name": "Al Jarf (Abu Dhabi)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Al%20Jarf%20(Abu%20Dhabi)" },
        { "@type": "City", "name": "Hatta (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Hatta%20(Dubai)" },
        { "@type": "City", "name": "Sea Port (Hulaylah Terminal)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Sea%20Port%20(Hulaylah%20Terminal)" },
        { "@type": "City", "name": "Sea Port (Indooroodilly)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Sea%20Port%20(Indooroodilly)" },
        { "@type": "City", "name": "Mina Jebel Ali (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Mina%20Jebel%20Ali%20(Dubai)" },
        { "@type": "City", "name": "Jebel Ali Free Zone (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Jebel%20Ali%20Free%20Zone%20(Dubai)" },
        { "@type": "City", "name": "Al Dhannah City or Jebel Dhanna (Abu Dhabi)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Al%20Dhannah%20City%20or%20Jebel%20Dhanna%20(Abu%20Dhabi)" },
        { "@type": "City", "name": "Jumeirah (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Jumeirah%20(Dubai)" },
        { "@type": "City", "name": "Kalba (Sharjah)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Kalba%20(Sharjah)" },
        { "@type": "City", "name": "Khalidiya (Abu Dhabi)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Khalidiya%20(Abu%20Dhabi)" },
        { "@type": "City", "name": "Khor Fakkan (Sharjah)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Khor%20Fakkan%20(Sharjah)" },
        { "@type": "City", "name": "Masfut (Ajman)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Masfut%20(Ajman)" },
        { "@type": "City", "name": "Khalid Port (Sharjah)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Khalid%20Port%20(Sharjah)" },
        { "@type": "City", "name": "Khalifa City (Abu Dhabi)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Khalifa%20City%20(Abu%20Dhabi)" },
        { "@type": "City", "name": "Mina Rashid Port", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Mina%20Rashid%20Port" },
        { "@type": "City", "name": "Mina Saqr (Ras al Khaimah)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Mina%20Saqr%20(Ras%20al%20Khaimah)" },
        { "@type": "City", "name": "Mina Zayed (Abu Dhabi)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Mina%20Zayed%20(Abu%20Dhabi)" },
        { "@type": "City", "name": "Minhad (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Minhad%20(Dubai)" },
        { "@type": "City", "name": "Mirfa (Abu Dhabi)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Mirfa%20(Abu%20Dhabi)" },
        { "@type": "City", "name": "Mubarek Tower (Sharjah)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Mubarek%20Tower%20(Sharjah)" },
        { "@type": "City", "name": "Mubarraz Island (Abu Dhabi)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Mubarraz%20Island%20(Abu%20Dhabi)" },
        { "@type": "City", "name": "Musaffah (Abu Dhabi)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Musaffah%20(Abu%20Dhabi)" },
        { "@type": "City", "name": "Mussafah", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Mussafah" },
        { "@type": "City", "name": "Offshore Marine Services (Fujairah)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Offshore%20Marine%20Services%20(Fujairah)" },
        { "@type": "City", "name": "Port Rashid or Al Mina (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Port%20Rashid%20or%20Al%20Mina%20(Dubai)" },
        { "@type": "City", "name": "Ras Al Khor Port", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Ras%20Al%20Khor%20Port" },
        { "@type": "City", "name": "Rak Maritime City (Ras al Khaimah)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Rak%20Maritime%20City%20(Ras%20al%20Khaimah)" },
        { "@type": "City", "name": "Ras al Khaimah", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Ras%20al%20Khaimah" },
        { "@type": "City", "name": "Ras Al Khor (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Ras%20Al%20Khor%20(Dubai)" },
        { "@type": "City", "name": "Al Ras (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Al%20Ras%20(Dubai)" },
        { "@type": "City", "name": "Al Reem Island (Abu Dhabi)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Al%20Reem%20Island%20(Abu%20Dhabi)" },
        { "@type": "City", "name": "Al Ruways Industrial City (Abu Dhabi)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Al%20Ruways%20Industrial%20City%20(Abu%20Dhabi)" },
        { "@type": "City", "name": "Ruwais Port Abu Dhabi (Abu Dhabi)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Ruwais%20Port%20Abu%20Dhabi%20(Abu%20Dhabi)" },
        { "@type": "City", "name": "Saadiyat Island (Abu Dhabi)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Saadiyat%20Island%20(Abu%20Dhabi)" },
        { "@type": "City", "name": "Sharjah", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Sharjah" },
        { "@type": "City", "name": "Al Sila (Abu Dhabi)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Al%20Sila%20(Abu%20Dhabi)" },
        { "@type": "City", "name": "Stevin Rock (Ras al Khaimah)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Stevin%20Rock%20(Ras%20al%20Khaimah)" },
        { "@type": "City", "name": "Sweihan (Abu Dhabi)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Sweihan%20(Abu%20Dhabi)" },
        { "@type": "City", "name": "The Palm Jumeirah (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/The%20Palm%20Jumeirah%20(Dubai)" },
        { "@type": "City", "name": "Umm al Nar (Abu Dhabi)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Umm%20al%20Nar%20(Abu%20Dhabi)" },
        { "@type": "City", "name": "Umm al Quwain", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Umm%20al%20Quwain" },
        { "@type": "City", "name": "Al Qurayyah (Fujairah)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Al%20Qurayyah%20(Fujairah)" },
        { "@type": "City", "name": "Yas Island (Abu Dhabi)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Yas%20Island%20(Abu%20Dhabi)" },
        { "@type": "City", "name": "Zirku Island (Abu Dhabi)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Zirku%20Island%20(Abu%20Dhabi)" },
        { "@type": "City", "name": "Sheikh Zayed Road (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Sheikh%20Zayed%20Road%20(Dubai)" },
        { "@type": "City", "name": "Business Bay (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Business%20Bay%20(Dubai)" },
        { "@type": "City", "name": "Downtown Dubai (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Downtown%20Dubai%20(Dubai)" },
        { "@type": "City", "name": "Al Bada'a (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Al%20Bada'a%20(Dubai)" },
        { "@type": "City", "name": "Al Satwa (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Al%20Satwa%20(Dubai)" },
        { "@type": "City", "name": "Za'abeel (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Za'abeel%20(Dubai)" },
        { "@type": "City", "name": "Trade Centre (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Trade%20Centre%20(Dubai)" },
        { "@type": "City", "name": "Al Karama (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Al%20Karama%20(Dubai)" },
        { "@type": "City", "name": "Oud Metha (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Oud%20Metha%20(Dubai)" },
        { "@type": "City", "name": "Al Jaddaf (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Al%20Jaddaf%20(Dubai)" },
        { "@type": "City", "name": "Al Wasl (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Al%20Wasl%20(Dubai)" },
        { "@type": "City", "name": "Al Safa (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Al%20Safa%20(Dubai)" },
        { "@type": "City", "name": "Umm Suqeim (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Umm%20Suqeim%20(Dubai)" },
        { "@type": "City", "name": "Jumeirah Village Circle (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Jumeirah%20Village%20Circle%20(Dubai)" },
        { "@type": "City", "name": "Dubai Investments Park (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Dubai%20Investments%20Park%20(Dubai)" },
        { "@type": "City", "name": "Mirdif (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Mirdif%20(Dubai)" },
        { "@type": "City", "name": "Al Twar (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Al%20Twar%20(Dubai)" },
        { "@type": "City", "name": "Al Khawaneej (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Al%20Khawaneej%20(Dubai)" },
        { "@type": "City", "name": "Al Warqa (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Al%20Warqa%20(Dubai)" },
        { "@type": "City", "name": "Dubai Silicon Oasis (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Dubai%20Silicon%20Oasis%20(Dubai)" },
        { "@type": "City", "name": "Al Thammam (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Al%20Thammam%20(Dubai)" },
        { "@type": "City", "name": "Golf City (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Golf%20City%20(Dubai)" },
        { "@type": "City", "name": "Umm Ramool (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Umm%20Ramool%20(Dubai)" },
        { "@type": "City", "name": "Al Qusais (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Al%20Qusais%20(Dubai)" },
        { "@type": "City", "name": "Al Nahda (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Al%20Nahda%20(Dubai)" },
        { "@type": "City", "name": "Al Rashidiya (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Al%20Rashidiya%20(Dubai)" },
        { "@type": "City", "name": "Nad al Sheba (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Nad%20al%20Sheba%20(Dubai)" }
      ],
      "makes": [
        { "@type": "Brand", "name": "Acura" },
        { "@type": "Brand", "name": "Audi" },
        { "@type": "Brand", "name": "Buick" },
        { "@type": "Brand", "name": "Eagle" },
        { "@type": "Brand", "name": "Ford" },
        { "@type": "Brand", "name": "Honda" },
        { "@type": "Brand", "name": "Lamborghini" },
        { "@type": "Brand", "name": "Land Rover" },
        { "@type": "Brand", "name": "Lexus" },
        { "@type": "Brand", "name": "Lincoln" },
        { "@type": "Brand", "name": "Lotus" },
        { "@type": "Brand", "name": "Maserati" },
        { "@type": "Brand", "name": "Mazda" },
        { "@type": "Brand", "name": "Mercedes-Benz" },
        { "@type": "Brand", "name": "Mercury" },
        { "@type": "Brand", "name": "Mitsubishi" },
        { "@type": "Brand", "name": "Nissan" },
        { "@type": "Brand", "name": "Plymouth" },
        { "@type": "Brand", "name": "Pontiac" },
        { "@type": "Brand", "name": "Porsche" },
        { "@type": "Brand", "name": "Saab" },
        { "@type": "Brand", "name": "Subaru" },
        { "@type": "Brand", "name": "Suzuki" },
        { "@type": "Brand", "name": "Volkswagen" },
        { "@type": "Brand", "name": "Chevrolet" },
        { "@type": "Brand", "name": "Toyota" },
        { "@type": "Brand", "name": "Alfa Romeo" },
        { "@type": "Brand", "name": "BMW" },
        { "@type": "Brand", "name": "Cadillac" },
        { "@type": "Brand", "name": "Chrysler" },
        { "@type": "Brand", "name": "Daihatsu" },
        { "@type": "Brand", "name": "Dodge" },
        { "@type": "Brand", "name": "Geo" },
        { "@type": "Brand", "name": "GMC" },
        { "@type": "Brand", "name": "Hyundai" },
        { "@type": "Brand", "name": "Infiniti" },
        { "@type": "Brand", "name": "Isuzu" },
        { "@type": "Brand", "name": "Jaguar" },
        { "@type": "Brand", "name": "Jeep" },
        { "@type": "Brand", "name": "Oldsmobile" },
        { "@type": "Brand", "name": "Saturn" },
        { "@type": "Brand", "name": "Volvo" },
        { "@type": "Brand", "name": "Hummer" },
        { "@type": "Brand", "name": "Kia" },
        { "@type": "Brand", "name": "Holden" },
        { "@type": "Brand", "name": "Corbin" },
        { "@type": "Brand", "name": "Daewoo" },
        { "@type": "Brand", "name": "Mini" },
        { "@type": "Brand", "name": "Maybach" },
        { "@type": "Brand", "name": "Scion" },
        { "@type": "Brand", "name": "Spyker" },
        { "@type": "Brand", "name": "Aston Martin" },
        { "@type": "Brand", "name": "Bentley" },
        { "@type": "Brand", "name": "Panoz" },
        { "@type": "Brand", "name": "Rolls-Royce" },
        { "@type": "Brand", "name": "Spyker Cars" },
        { "@type": "Brand", "name": "Ferrari" },
        { "@type": "Brand", "name": "Morgan" },
        { "@type": "Brand", "name": "Peugeot" },
        { "@type": "Brand", "name": "Foose" },
        { "@type": "Brand", "name": "Aptera" },
        { "@type": "Brand", "name": "Smart" },
        { "@type": "Brand", "name": "Bugatti" },
        { "@type": "Brand", "name": "Tesla" },
        { "@type": "Brand", "name": "Ram" },
        { "@type": "Brand", "name": "Fiat" },
        { "@type": "Brand", "name": "McLaren" },
        { "@type": "Brand", "name": "BYD" },
        { "@type": "Brand", "name": "Mobility Ventures LLC" },
        { "@type": "Brand", "name": "Pagani" },
        { "@type": "Brand", "name": "Roush Performance" },
        { "@type": "Brand", "name": "SRT" },
        { "@type": "Brand", "name": "Genesis" },
        { "@type": "Brand", "name": "Karma" },
        { "@type": "Brand", "name": "Koenigsegg" },
        { "@type": "Brand", "name": "RUF Automobile" },
        { "@type": "Brand", "name": "STI" },
        { "@type": "Brand", "name": "Polestar" },
        { "@type": "Brand", "name": "Kandi" },
        { "@type": "Brand", "name": "Abarth" },
        { "@type": "Brand", "name": "Bestune" },
        { "@type": "Brand", "name": "BAIC" },
        { "@type": "Brand", "name": "Geely" },
        { "@type": "Brand", "name": "Chery" },
        { "@type": "Brand", "name": "Dorcen" },
        { "@type": "Brand", "name": "Great Wall GWM" },
        { "@type": "Brand", "name": "Zeekr" },
        { "@type": "Brand", "name": "ZNA" },
        { "@type": "Brand", "name": "Foton" },
        { "@type": "Brand", "name": "GAC" },
        { "@type": "Brand", "name": "Gs7" },
        { "@type": "Brand", "name": "Hongqi" },
        { "@type": "Brand", "name": "W Motors" },
        { "@type": "Brand", "name": "JAC" },
        { "@type": "Brand", "name": "Jaecoo" },
        { "@type": "Brand", "name": "Jetour" },
        { "@type": "Brand", "name": "TANK" },
        { "@type": "Brand", "name": "Soueast" },
        { "@type": "Brand", "name": "Zarooq Motors" },
        { "@type": "Brand", "name": "Changan" },
        { "@type": "Brand", "name": "Maxus" },
        { "@type": "Brand", "name": "Opel" },
        { "@type": "Brand", "name": "Seres" },
        { "@type": "Brand", "name": "Skoda" },
        { "@type": "Brand", "name": "Exeed" },
        { "@type": "Brand", "name": "Haval" },
        { "@type": "Brand", "name": "Zotye" },
        { "@type": "Brand", "name": "Sandstorm" },
        { "@type": "Brand", "name": "Renault" }
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.emirates-car.com/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Do you sell genuine spare parts in UAE?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, we supply genuine OEM parts, as well as used and aftermarket options to suit your budget."
          }
        },
        {
          "@type": "Question",
          "name": "Can I buy used or aftermarket parts to save costs?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, we offer used and aftermarket spare parts that are tested for quality and performance."
          }
        },
        {
          "@type": "Question",
          "name": "Do you deliver parts across UAE?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, we deliver spare parts to Dubai, Abu Dhabi, Sharjah, Ajman, and other Emirates. International shipping is also available."
          }
        },
        {
          "@type": "Question",
          "name": "How do I know if a part fits my Car?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can share your car's VIN or model details with us, and we will confirm compatibility before shipping."
          }
        },
        {
          "@type": "Question",
          "name": "Do your spare parts come with warranty?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, all new and OEM spare parts come with a standard warranty. Used parts are tested but carry limited warranty."
          }
        }
      ]
    },
  ]
};

export const metadata = {
  title:
    'Auto Spare Parts Order Online in UAE from Dubai dealers | Emirates-car.com',
  description:
    'Buy Car spare parts Online and Get delivered Used, New, Genuine / Original / OEM, Aftermarket auto spare parts Online in UAE for German, American, Korean, Japanese models',
  metadataBase: new URL('https://www.emirates-car.com'),
  manifest: 'https://www.emirates-car.com/manifest.json',
  verification: {
    google: '2dbXrKrxCBjzz1bLwaw_6nd4YEhhviwPLiGq6fLXPoU',
    yandex: '1a59e5a3d5ee0eeb',
    yahoo: 'yahoo',
    other: {
      me: ['emiratesautomobileparts@gmail.com', 'https://www.emirates-car.com'],
    },
  },
  alternates: {
    canonical: 'https://www.emirates-car.com',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title:
      'Auto Spare Parts Order Online in UAE from Dubai dealers | Emirates-car.com',
    description:
      'Buy Online and Get delivered Used, New, Genuine / Original / OEM, Aftermarket auto spare parts Online in UAE for German, American, Korean, Japanese models',
    url: 'https://www.emirates-car.com',
    siteName: 'EMIRATESCAR',
    images: [
      {
        url: 'https://www.emirates-car.com/icon-192x192.png',
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
    title: 'Car spare parts',
    description:
      'Buy Online and Get delivered Used, New, Genuine / Original / OEM, Aftermarket auto spare parts Online in UAE for German, American, Korean, Japanese models',
    images: 'https://www.emirates-car.com/favicon.png',
  },
  icons: {
    icon: 'https://www.emirates-car.com/favicon.png',
    shortcut: 'https://www.emirates-car.com/icons/icon-96x96.png',
    apple: 'https://www.emirates-car.com/icons/icon-192x192.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: 'https://www.emirates-car.com/icons/icon-152x152.png',
    },
  },
  category: 'Automotive > Auto Parts Store',
  other: {
    "script:ld+json": JSON.stringify(homepageSchema),
  },
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
