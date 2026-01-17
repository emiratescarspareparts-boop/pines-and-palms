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
      "@id": "www.emirates-car.com",
      "url": "www.emirates-car.com",
      "name": "EMIRATESCAR",
      "publisher": { "@id": "www.emirates-car.com#organization" },
      "potentialAction": {
        "@type": "SearchAction",
        "@id": "www.emirates-car.com#search-action",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "www.emirates-car.com/search-by-part-name/{search_term_string}"
        },
        "queryInput": "required name=search_term_string"
      }
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
      "@type": "OnlineBusiness",
      "@id": "www.emirates-car.com#onlinebusiness",
      "name": "EMIRATESCAR",
      "url": "www.emirates-car.com",
      "logo": "www.emirates-car.comimg/car-spare-parts.png",
      "description": "Leading provider of genuine and aftermarket car spare parts in the UAE. Inquiries accepted 24/7 via online form and WhatsApp.",
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "contactType": "customer support",
          "url": "https://www.emirates-car.com/contact",
          "contactOption": ["TollFree", "HearingImpairedSupported"],
          "availableLanguage": ["English", "Arabic", "Urdu", "Hindi"],
          "hoursAvailable": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "opens": "00:00",
            "closes": "23:59"
          },
          "description": "24/7 Online Inquiry Form"
        },
        {
          "@type": "ContactPoint",
          "contactType": "sales",
          "url": "www.emirates-car.com/contact",
          "description": "Online Inquiry Form"
        }
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Al Khabeisi",
        "addressLocality": "Dubai",
        "addressCountry": "AE"
      },
      "areaServed": [
        { "@type": "City", "name": "Total Abu Al Bukhoosh Abu Dhabi", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Total%20Abu%20Al%20Bukhoosh%20Abu%20Dhabi", "sameAs": "https://www.wikidata.org/wiki/Q21738012" },
        { "@type": "City", "name": "Abu Dhabi", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Abu%20Dhabi", "sameAs": "https://www.wikidata.org/wiki/Q187712" },
        { "@type": "City", "name": "Abu Musa Island", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Abu%20Musa%20Island", "sameAs": "https://www.wikidata.org/wiki/Q167217" },
        { "@type": "City", "name": "Ahmed bin Rashid Free Zone (UAQ FTZ) (Umm Al Quwain)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Ahmed%20bin%20Rashid%20Free%20Zone%20(UAQ%20FTZ)%20(Umm%20Al%20Quwain)", "sameAs": "https://www.wikidata.org/wiki/Q112811150" },
        { "@type": "City", "name": "Ajman", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Ajman", "sameAs": "https://www.wikidata.org/wiki/Q159477" },
        { "@type": "City", "name": "Al Ain (Abu Dhabi)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Al%20Ain%20(Abu%20Dhabi)", "sameAs": "https://www.wikidata.org/wiki/Q234600" },
        { "@type": "City", "name": "Al Barsha (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Al%20Barsha%20(Dubai)", "sameAs": "https://www.wikidata.org/wiki/Q3545254" },
        { "@type": "City", "name": "Al Dhafra or Western Region (Abu Dhabi)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Al%20Dhafra%20or%20Western%20Region%20(Abu%20Dhabi)", "sameAs": "https://www.wikidata.org/wiki/Q4703864" },
        { "@type": "City", "name": "Al Fujairah", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Al%20Fujairah", "sameAs": "https://www.wikidata.org/wiki/Q4045" },
        { "@type": "City", "name": "Al Hamriyah (Sharjah)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Al%20Hamriyah%20(Sharjah)", "sameAs": "https://www.wikidata.org/wiki/Q4703978" },
        { "@type": "City", "name": "AlJazeera Port (Ras al Khaimah)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/AlJazeera%20Port%20(Ras%20al%20Khaimah)", "sameAs": "https://www.wikidata.org/wiki/Q111387282" },
        { "@type": "City", "name": "Al Jeer Port (Ras al Khaimah)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Al%20Jeer%20Port%20(Ras%20al%20Khaimah)", "sameAs": "https://www.wikidata.org/wiki/Q4704646" },
        { "@type": "City", "name": "Al Mafraq (Abu Dhabi)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Al%20Mafraq%20(Abu%20Dhabi)", "sameAs": "https://www.wikidata.org/wiki/Q111150366" },
        { "@type": "City", "name": "Al Quoz (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Al%20Quoz%20(Dubai)", "sameAs": "https://www.wikidata.org/wiki/Q4116867" },
        { "@type": "City", "name": "Al Sufouh (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Al%20Sufouh%20(Dubai)", "sameAs": "https://www.wikidata.org/wiki/Q4117124" },
        { "@type": "City", "name": "Al Ruways Industrial City (Abu Dhabi)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Al%20Ruways%20Industrial%20City%20(Abu%20Dhabi)", "sameAs": "https://www.wikidata.org/wiki/Q1023786" },
        { "@type": "City", "name": "Arzanah Island (Abu Dhabi)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Arzanah%20Island%20(Abu%20Dhabi)", "sameAs": "https://www.wikidata.org/wiki/Q21738149" },
        { "@type": "City", "name": "Das Island (Abu Dhabi)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Das%20Island%20(Abu%20Dhabi)", "sameAs": "https://www.wikidata.org/wiki/Q1167106" },
        { "@type": "City", "name": "Deira (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Deira%20(Dubai)", "sameAs": "https://www.wikidata.org/wiki/Q3021334" },
        { "@type": "City", "name": "Dibba Al Fujairah (Fujairah)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Dibba%20Al%20Fujairah%20(Fujairah)", "sameAs": "https://www.wikidata.org/wiki/Q3696182" },
        { "@type": "City", "name": "Dubai", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Dubai", "sameAs": "https://www.wikidata.org/wiki/Q612" },
        { "@type": "City", "name": "Dubai World Central (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Dubai%20World%20Central%20(Dubai)", "sameAs": "https://www.wikidata.org/wiki/Q5310628" },
        { "@type": "City", "name": "Esnnad (Abu Dhabi)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Esnnad%20(Abu%20Dhabi)", "sameAs": "https://www.wikidata.org/wiki/Q16240669" },
        { "@type": "City", "name": "Sea Port (Fateh Terminal)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Sea%20Port%20(Fateh%20Terminal)", "sameAs": "https://www.wikidata.org/wiki/Q16240669" },
        { "@type": "City", "name": "Free Port (Abu Dhabi)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Free%20Port%20(Abu%20Dhabi)", "sameAs": "https://www.wikidata.org/wiki/Q15177997" },
        { "@type": "City", "name": "Habshan (Abu Dhabi)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Habshan%20(Abu%20Dhabi)", "sameAs": "https://www.wikidata.org/wiki/Q5636978" },
        { "@type": "City", "name": "Abu Hail (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Abu%20Hail%20(Dubai)", "sameAs": "https://www.wikidata.org/wiki/Q4117480" },
        { "@type": "City", "name": "Hamriya Free Zone Port", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Hamriya%20Free%20Zone%20Port", "sameAs": "https://www.wikidata.org/wiki/Q5646373" },
        { "@type": "City", "name": "Al Jarf (Abu Dhabi)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Al%20Jarf%20(Abu%20Dhabi)", "sameAs": "https://www.wikidata.org/wiki/Q26199926" },
        { "@type": "City", "name": "Hatta (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Hatta%20(Dubai)", "sameAs": "https://www.wikidata.org/wiki/Q770233" },
        { "@type": "City", "name": "Sea Port (Hulaylah Terminal)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Sea%20Port%20(Hulaylah%20Terminal)", "sameAs": "https://www.wikidata.org/wiki/Q11926174" },
        { "@type": "City", "name": "Mina Jebel Ali (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Mina%20Jebel%20Ali%20(Dubai)", "sameAs": "https://www.wikidata.org/wiki/Q509588" },
        { "@type": "City", "name": "Jebel Ali Free Zone (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Jebel%20Ali%20Free%20Zone%20(Dubai)", "sameAs": "https://www.wikidata.org/wiki/Q1686089" },
        { "@type": "City", "name": "Al Dhannah City or Jebel Dhanna (Abu Dhabi)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Al%20Dhannah%20City%20or%20Jebel%20Dhanna%20(Abu%20Dhabi)", "sameAs": "https://en.wikipedia.org/wiki/Al_Dhannah" },
        { "@type": "City", "name": "Jumeirah (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Jumeirah%20(Dubai)", "sameAs": "https://www.wikidata.org/wiki/Q1142971" },
        { "@type": "City", "name": "Kalba (Sharjah)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Kalba%20(Sharjah)", "sameAs": "https://www.wikidata.org/wiki/Q2204078" },
        { "@type": "City", "name": "Khalidiya (Abu Dhabi)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Khalidiya%20(Abu%20Dhabi)", "sameAs": "https://www.wikidata.org/wiki/Q56389623" },
        { "@type": "City", "name": "Khor Fakkan (Sharjah)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Khor%20Fakkan%20(Sharjah)", "sameAs": "https://www.wikidata.org/wiki/Q764279" },
        { "@type": "City", "name": "Masfut (Ajman)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Masfut%20(Ajman)", "sameAs": "https://www.wikidata.org/wiki/Q3133042" },
        { "@type": "City", "name": "Khalid Port (Sharjah)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Khalid%20Port%20(Sharjah)", "sameAs": "https://www.wikidata.org/wiki/Q130783776" },
        { "@type": "City", "name": "Khalifa City (Abu Dhabi)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Khalifa%20City%20(Abu%20Dhabi)", "sameAs": "https://www.wikidata.org/wiki/Q6399642" },
        { "@type": "City", "name": "Mina Rashid Port", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Mina%20Rashid%20Port", "sameAs": "https://www.wikidata.org/wiki/Q3773278" },
        { "@type": "City", "name": "Mina Saqr (Ras al Khaimah)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Mina%20Saqr%20(Ras%20al%20Khaimah)", "sameAs": "https://www.wikidata.org/wiki/Q21737947" },
        { "@type": "City", "name": "Mina Zayed (Abu Dhabi)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Mina%20Zayed%20(Abu%20Dhabi)", "sameAs": "https://www.wikidata.org/wiki/Q3180182" },
        { "@type": "City", "name": "Minhad (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Minhad%20(Dubai)", "sameAs": "https://www.wikidata.org/wiki/Q21735732" },
        { "@type": "City", "name": "Mirfa (Abu Dhabi)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Mirfa%20(Abu%20Dhabi)", "sameAs": "https://www.wikidata.org/wiki/Q12241826" },
        { "@type": "City", "name": "Mubarek Tower (Sharjah)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Mubarek%20Tower%20(Sharjah)", "sameAs": "www.wikidata.org" },
        { "@type": "City", "name": "Mubarraz Island (Abu Dhabi)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Mubarraz%20Island%20(Abu%20Dhabi)", "sameAs": "https://www.wikidata.org/wiki/Q6929357" },

        { "@type": "City", "name": "Musaffah (Abu Dhabi)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Musaffah%20(Abu%20Dhabi)", "sameAs": "https://www.wikidata.org/wiki/Q6946294" },

        { "@type": "City", "name": "Mussafah", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Mussafah", "sameAs": "https://www.wikidata.org/wiki/Q6946294" },

        { "@type": "City", "name": "Offshore Marine Services (Fujairah)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Offshore%20Marine%20Services%20(Fujairah)", "sameAs": null },

        { "@type": "City", "name": "Port Rashid or Al Mina (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Port%20Rashid%20or%20Al%20Mina%20(Dubai)", "sameAs": "https://www.wikidata.org/wiki/Q7247027" },

        { "@type": "City", "name": "Ras Al Khor Port", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Ras%20Al%20Khor%20Port", "sameAs": null },

        { "@type": "City", "name": "Rak Maritime City (Ras al Khaimah)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Rak%20Maritime%20City%20(Ras%20al%20Khaimah)", "sameAs": null },

        { "@type": "City", "name": "Ras al Khaimah", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Ras%20al%20Khaimah", "sameAs": "https://www.wikidata.org/wiki/Q1705" },

        { "@type": "City", "name": "Ras Al Khor (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Ras%20Al%20Khor%20(Dubai)", "sameAs": "https://www.wikidata.org/wiki/Q7277415" },

        { "@type": "City", "name": "Al Ras (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Al%20Ras%20(Dubai)", "sameAs": "https://www.wikidata.org/wiki/Q4708103" },

        { "@type": "City", "name": "Al Reem Island (Abu Dhabi)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Al%20Reem%20Island%20(Abu%20Dhabi)", "sameAs": "https://www.wikidata.org/wiki/Q4707829" },

        { "@type": "City", "name": "Al Ruways Industrial City (Abu Dhabi)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Al%20Ruways%20Industrial%20City%20(Abu%20Dhabi)", "sameAs": "https://www.wikidata.org/wiki/Q7386185" },

        { "@type": "City", "name": "Ruwais Port Abu Dhabi (Abu Dhabi)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Ruwais%20Port%20Abu%20Dhabi%20(Abu%20Dhabi)", "sameAs": null },

        { "@type": "City", "name": "Saadiyat Island (Abu Dhabi)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Saadiyat%20Island%20(Abu%20Dhabi)", "sameAs": "https://www.wikidata.org/wiki/Q7396071" },

        { "@type": "City", "name": "Sharjah", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Sharjah", "sameAs": "https://www.wikidata.org/wiki/Q1764" },

        { "@type": "City", "name": "Al Sila (Abu Dhabi)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Al%20Sila%20(Abu%20Dhabi)", "sameAs": "https://www.wikidata.org/wiki/Q4707804" },

        { "@type": "City", "name": "Stevin Rock (Ras al Khaimah)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Stevin%20Rock%20(Ras%20al%20Khaimah)", "sameAs": "https://www.wikidata.org/wiki/Q7611866" },

        { "@type": "City", "name": "Sweihan (Abu Dhabi)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Sweihan%20(Abu%20Dhabi)", "sameAs": "https://www.wikidata.org/wiki/Q7651983" },

        { "@type": "City", "name": "The Palm Jumeirah (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/The%20Palm%20Jumeirah%20(Dubai)", "sameAs": "https://www.wikidata.org/wiki/Q205144" },

        { "@type": "City", "name": "Umm al Nar (Abu Dhabi)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Umm%20al%20Nar%20(Abu%20Dhabi)", "sameAs": "https://www.wikidata.org/wiki/Q7876791" },

        { "@type": "City", "name": "Umm al Quwain", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Umm%20al%20Quwain", "sameAs": "https://www.wikidata.org/wiki/Q1752" },

        { "@type": "City", "name": "Al Qurayyah (Fujairah)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Al%20Qurayyah%20(Fujairah)", "sameAs": "https://www.wikidata.org/wiki/Q4708063" },

        { "@type": "City", "name": "Yas Island (Abu Dhabi)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Yas%20Island%20(Abu%20Dhabi)", "sameAs": "https://www.wikidata.org/wiki/Q8050214" },

        { "@type": "City", "name": "Zirku Island (Abu Dhabi)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Zirku%20Island%20(Abu%20Dhabi)", "sameAs": "https://www.wikidata.org/wiki/Q8075945" },

        { "@type": "City", "name": "Sheikh Zayed Road (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Sheikh%20Zayed%20Road%20(Dubai)", "sameAs": "https://www.wikidata.org/wiki/Q3480466" }, { "@type": "City", "name": "Business Bay (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Business%20Bay%20(Dubai)", "sameAs": "https://www.wikidata.org/wiki/Q861642" },

        { "@type": "City", "name": "Downtown Dubai (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Downtown%20Dubai%20(Dubai)", "sameAs": "https://www.wikidata.org/wiki/Q3033346" },

        { "@type": "City", "name": "Al Bada'a (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Al%20Bada'a%20(Dubai)", "sameAs": null },

        { "@type": "City", "name": "Al Satwa (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Al%20Satwa%20(Dubai)", "sameAs": "https://www.wikidata.org/wiki/Q4712486" },

        { "@type": "City", "name": "Za'abeel (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Za'abeel%20(Dubai)", "sameAs": "https://www.wikidata.org/wiki/Q8076079" },

        { "@type": "City", "name": "Trade Centre (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Trade%20Centre%20(Dubai)", "sameAs": null },

        { "@type": "City", "name": "Al Karama (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Al%20Karama%20(Dubai)", "sameAs": "https://www.wikidata.org/wiki/Q4708050" },

        { "@type": "City", "name": "Oud Metha (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Oud%20Metha%20(Dubai)", "sameAs": "https://www.wikidata.org/wiki/Q7112544" },

        { "@type": "City", "name": "Al Jaddaf (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Al%20Jaddaf%20(Dubai)", "sameAs": "https://www.wikidata.org/wiki/Q4708046" },

        { "@type": "City", "name": "Al Wasl (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Al%20Wasl%20(Dubai)", "sameAs": "https://www.wikidata.org/wiki/Q4708066" },

        { "@type": "City", "name": "Al Safa (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Al%20Safa%20(Dubai)", "sameAs": "https://www.wikidata.org/wiki/Q4708060" },

        { "@type": "City", "name": "Umm Suqeim (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Umm%20Suqeim%20(Dubai)", "sameAs": "https://www.wikidata.org/wiki/Q7876801" },

        { "@type": "City", "name": "Jumeirah Village Circle (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Jumeirah%20Village%20Circle%20(Dubai)", "sameAs": "https://www.wikidata.org/wiki/Q6317066" },

        { "@type": "City", "name": "Dubai Investments Park (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Dubai%20Investments%20Park%20(Dubai)", "sameAs": "https://www.wikidata.org/wiki/Q5281524" },

        { "@type": "City", "name": "Mirdif (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Mirdif%20(Dubai)", "sameAs": "https://www.wikidata.org/wiki/Q6873216" },

        { "@type": "City", "name": "Al Twar (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Al%20Twar%20(Dubai)", "sameAs": "https://www.wikidata.org/wiki/Q4708064" },

        { "@type": "City", "name": "Al Khawaneej (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Al%20Khawaneej%20(Dubai)", "sameAs": "https://www.wikidata.org/wiki/Q4708049" },

        { "@type": "City", "name": "Al Warqa (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Al%20Warqa%20(Dubai)", "sameAs": "https://www.wikidata.org/wiki/Q4708065" },

        { "@type": "City", "name": "Dubai Silicon Oasis (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Dubai%20Silicon%20Oasis%20(Dubai)", "sameAs": "https://www.wikidata.org/wiki/Q5281527" },

        { "@type": "City", "name": "Al Thammam (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Al%20Thammam%20(Dubai)", "sameAs": null },

        { "@type": "City", "name": "Golf City (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Golf%20City%20(Dubai)", "sameAs": null },

        { "@type": "City", "name": "Umm Ramool (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Umm%20Ramool%20(Dubai)", "sameAs": "https://www.wikidata.org/wiki/Q7876800" },

        { "@type": "City", "name": "Al Qusais (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Al%20Qusais%20(Dubai)", "sameAs": "https://www.wikidata.org/wiki/Q4708055" },

        { "@type": "City", "name": "Al Nahda (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Al%20Nahda%20(Dubai)", "sameAs": "https://www.wikidata.org/wiki/Q4708054" },

        { "@type": "City", "name": "Al Rashidiya (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Al%20Rashidiya%20(Dubai)", "sameAs": "https://www.wikidata.org/wiki/Q4708059" },

        { "@type": "City", "name": "Nad al Sheba (Dubai)", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Nad%20al%20Sheba%20(Dubai)", "sameAs": "https://www.wikidata.org/wiki/Q6961602" },

        { "@type": "City", "name": "Al Aweer", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Al%20Aweer", "sameAs": "https://www.wikidata.org/wiki/Q4708044" },

        { "@type": "City", "name": "Dubai South", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Dubai%20South", "sameAs": "https://www.wikidata.org/wiki/Q65060386" },

        { "@type": "City", "name": "Dubai Media City", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Dubai%20Media%20City", "sameAs": "https://www.wikidata.org/wiki/Q5281526" },

        { "@type": "City", "name": "Al Mankhool", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Al%20Mankhool", "sameAs": "https://www.wikidata.org/wiki/Q4708052" },

        { "@type": "City", "name": "Al Mizhar", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Al%20Mizhar", "sameAs": "https://www.wikidata.org/wiki/Q4708053" },

        { "@type": "City", "name": "Nad Al Hamar", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Nad%20Al%20Hamar", "sameAs": "https://www.wikidata.org/wiki/Q6961601" },

        { "@type": "City", "name": "Dubai Festival City", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Dubai%20Festival%20City", "sameAs": "https://www.wikidata.org/wiki/Q5281525" },

        { "@type": "City", "name": "Dubai International City", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Dubai%20International%20City", "sameAs": "https://www.wikidata.org/wiki/Q5281528" },

        { "@type": "City", "name": "Bu Shaghara", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Bu%20Shaghara", "sameAs": null },

        { "@type": "City", "name": "Discovery Gardens", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Discovery%20Gardens", "sameAs": "https://www.wikidata.org/wiki/Q5281529" },

        { "@type": "Place", "name": "Arabian Ranches", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Arabian%20Ranches", "sameAs": "https://www.wikidata.org/wiki/Q4789374" },

        { "@type": "City", "name": "Dubai Motor City", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Dubai%20Motor%20City", "sameAs": "https://www.wikidata.org/wiki/Q5281523" },

        { "@type": "Place", "name": "Damac Hills", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Damac%20Hills", "sameAs": "https://www.wikidata.org/wiki/Q65060383" },

        { "@type": "City", "name": "Wadi Al Safa", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Wadi%20Al%20Safa", "sameAs": null },

        { "@type": "City", "name": "Muhaisnah", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Muhaisnah", "sameAs": "https://www.wikidata.org/wiki/Q6936740" },

        { "@type": "City", "name": "Muweileh", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Muweileh", "sameAs": "https://www.wikidata.org/wiki/Q6949624" },

        { "@type": "City", "name": "Al Jafiliyah", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Al%20Jafiliyah", "sameAs": "https://www.wikidata.org/wiki/Q4708047" },

        { "@type": "City", "name": "Al Mamzar", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Al%20Mamzar", "sameAs": "https://www.wikidata.org/wiki/Q4708051" },

        { "@type": "City", "name": "Al Sajaa", "url": "https://www.emirates-car.com/search-by-cities-in-uae/Al%20Sajaa", "sameAs": null }
      ],
      "brand": [
        { "@type": "Brand", "name": "Acura", "url": "https://www.emirates-car.com/search-by-make/Acura", "sameAs": "https://www.wikidata.org/wiki/Q48251" },

        { "@type": "Brand", "name": "Audi", "url": "https://www.emirates-car.com/search-by-make/Audi", "sameAs": "https://www.wikidata.org/wiki/Q23317" },

        { "@type": "Brand", "name": "Buick", "url": "https://www.emirates-car.com/search-by-make/Buick", "sameAs": "https://www.wikidata.org/wiki/Q81701" },

        { "@type": "Brand", "name": "Eagle", "url": "https://www.emirates-car.com/search-by-make/Eagle", "sameAs": "https://www.wikidata.org/wiki/Q128207" },

        { "@type": "Brand", "name": "Ford", "url": "https://www.emirates-car.com/search-by-make/Ford", "sameAs": "https://www.wikidata.org/wiki/Q44294" },

        { "@type": "Brand", "name": "Honda", "url": "https://www.emirates-car.com/search-by-make/Honda", "sameAs": "https://www.wikidata.org/wiki/Q9584" },

        { "@type": "Brand", "name": "Lamborghini", "url": "https://www.emirates-car.com/search-by-make/Lamborghini", "sameAs": "https://www.wikidata.org/wiki/Q35920" },

        { "@type": "Brand", "name": "Land Rover", "url": "https://www.emirates-car.com/search-by-make/Land%20Rover", "sameAs": "https://www.wikidata.org/wiki/Q156698" },

        { "@type": "Brand", "name": "Lexus", "url": "https://www.emirates-car.com/search-by-make/Lexus", "sameAs": "https://www.wikidata.org/wiki/Q201807" },

        { "@type": "Brand", "name": "Lincoln", "url": "https://www.emirates-car.com/search-by-make/Lincoln", "sameAs": "https://www.wikidata.org/wiki/Q620123" },

        { "@type": "Brand", "name": "Lotus", "url": "https://www.emirates-car.com/search-by-make/Lotus", "sameAs": "https://www.wikidata.org/wiki/Q163099" },

        { "@type": "Brand", "name": "Maserati", "url": "https://www.emirates-car.com/search-by-make/Maserati", "sameAs": "https://www.wikidata.org/wiki/Q190567" },

        { "@type": "Brand", "name": "Mazda", "url": "https://www.emirates-car.com/search-by-make/Mazda", "sameAs": "https://www.wikidata.org/wiki/Q170027" },

        { "@type": "Brand", "name": "Mercedes-Benz", "url": "https://www.emirates-car.com/search-by-make/Mercedes-Benz", "sameAs": "https://www.wikidata.org/wiki/Q15370" },

        { "@type": "Brand", "name": "Mercury", "url": "https://www.emirates-car.com/search-by-make/Mercury", "sameAs": "https://www.wikidata.org/wiki/Q318585" },

        { "@type": "Brand", "name": "Mitsubishi", "url": "https://www.emirates-car.com/search-by-make/Mitsubishi", "sameAs": "https://www.wikidata.org/wiki/Q36033" },

        { "@type": "Brand", "name": "Nissan", "url": "https://www.emirates-car.com/search-by-make/Nissan", "sameAs": "https://www.wikidata.org/wiki/Q175720" },

        { "@type": "Brand", "name": "Plymouth", "url": "https://www.emirates-car.com/search-by-make/Plymouth", "sameAs": "https://www.wikidata.org/wiki/Q207134" },

        { "@type": "Brand", "name": "Pontiac", "url": "https://www.emirates-car.com/search-by-make/Pontiac", "sameAs": "https://www.wikidata.org/wiki/Q27304" },

        { "@type": "Brand", "name": "Porsche", "url": "https://www.emirates-car.com/search-by-make/Porsche", "sameAs": "https://www.wikidata.org/wiki/Q40993" },

        { "@type": "Brand", "name": "Saab", "url": "https://www.emirates-car.com/search-by-make/Saab", "sameAs": "https://www.wikidata.org/wiki/Q191458" },

        { "@type": "Brand", "name": "Subaru", "url": "https://www.emirates-car.com/search-by-make/Subaru", "sameAs": "https://www.wikidata.org/wiki/Q309739" },
        { "@type": "Brand", "name": "Suzuki", "url": "https://www.emirates-car.com/search-by-make/Suzuki", "sameAs": "https://www.wikidata.org/wiki/Q181642" },
        { "@type": "Brand", "name": "Volkswagen", "url": "https://www.emirates-car.com/search-by-make/Volkswagen", "sameAs": "https://www.wikidata.org/wiki/Q246" },
        { "@type": "Brand", "name": "Chevrolet", "url": "https://www.emirates-car.com/search-by-make/Chevrolet", "sameAs": "https://www.wikidata.org/wiki/Q15340" },
        { "@type": "Brand", "name": "Toyota", "url": "https://www.emirates-car.com/search-by-make/Toyota", "sameAs": "https://www.wikidata.org/wiki/Q53268" },
        { "@type": "Brand", "name": "Alfa Romeo", "url": "https://www.emirates-car.com/search-by-make/Alfa%20Romeo", "sameAs": "https://www.wikidata.org/wiki/Q183915" },
        { "@type": "Brand", "name": "BMW", "url": "https://www.emirates-car.com/search-by-make/BMW", "sameAs": "https://www.wikidata.org/wiki/Q26678" },
        { "@type": "Brand", "name": "Cadillac", "url": "https://www.emirates-car.com/search-by-make/Cadillac", "sameAs": "https://www.wikidata.org/wiki/Q27454" },
        { "@type": "Brand", "name": "Chrysler", "url": "https://www.emirates-car.com/search-by-make/Chrysler", "sameAs": "https://www.wikidata.org/wiki/Q215374" },
        { "@type": "Brand", "name": "Daihatsu", "url": "https://www.emirates-car.com/search-by-make/Daihatsu", "sameAs": "https://www.wikidata.org/wiki/Q170243" },
        { "@type": "Brand", "name": "Dodge", "url": "https://www.emirates-car.com/search-by-make/Dodge", "sameAs": "https://www.wikidata.org/wiki/Q202880" },
        { "@type": "Brand", "name": "Geo", "url": "https://www.emirates-car.com/search-by-make/Geo", "sameAs": "https://www.wikidata.org/wiki/Q150578" },
        { "@type": "Brand", "name": "GMC", "url": "https://www.emirates-car.com/search-by-make/GMC", "sameAs": "https://www.wikidata.org/wiki/Q24986" },
        { "@type": "Brand", "name": "Hyundai", "url": "https://www.emirates-car.com/search-by-make/Hyundai", "sameAs": "https://www.wikidata.org/wiki/Q55931" },
        { "@type": "Brand", "name": "Infiniti", "url": "https://www.emirates-car.com/search-by-make/Infiniti", "sameAs": "https://www.wikidata.org/wiki/Q27454" },
        { "@type": "Brand", "name": "Isuzu", "url": "https://www.emirates-car.com/search-by-make/Isuzu", "sameAs": "https://www.wikidata.org/wiki/Q180237" },
        { "@type": "Brand", "name": "Jaguar", "url": "https://www.emirates-car.com/search-by-make/Jaguar", "sameAs": "https://www.wikidata.org/wiki/Q20107" },
        { "@type": "Brand", "name": "Jeep", "url": "https://www.emirates-car.com/search-by-make/Jeep", "sameAs": "https://www.wikidata.org/wiki/Q2178" },
        { "@type": "Brand", "name": "Oldsmobile", "url": "https://www.emirates-car.com/search-by-make/Oldsmobile", "sameAs": "https://www.wikidata.org/wiki/Q132010" },
        { "@type": "Brand", "name": "Saturn", "url": "https://www.emirates-car.com/search-by-make/Saturn", "sameAs": "https://www.wikidata.org/wiki/Q134780" },
        { "@type": "Brand", "name": "Volvo", "url": "https://www.emirates-car.com/search-by-make/Volvo", "sameAs": "https://www.wikidata.org/wiki/Q2159" },
        { "@type": "Brand", "name": "Hummer", "url": "https://www.emirates-car.com/search-by-make/Hummer", "sameAs": "https://www.wikidata.org/wiki/Q152416" },
        { "@type": "Brand", "name": "Kia", "url": "https://www.emirates-car.com/search-by-make/Kia", "sameAs": "https://www.wikidata.org/wiki/Q24674" },
        { "@type": "Brand", "name": "Holden", "url": "https://www.emirates-car.com/search-by-make/Holden", "sameAs": "https://www.wikidata.org/wiki/Q31342" },
        { "@type": "Brand", "name": "Daewoo", "url": "https://www.emirates-car.com/search-by-make/Daewoo", "sameAs": "https://www.wikidata.org/wiki/Q207538" },
        { "@type": "Brand", "name": "Mini", "url": "https://www.emirates-car.com/search-by-make/Mini", "sameAs": "https://www.wikidata.org/wiki/Q223511" },
        { "@type": "Brand", "name": "Maybach", "url": "https://www.emirates-car.com/search-by-make/Maybach", "sameAs": "https://www.wikidata.org/wiki/Q178710" },
        { "@type": "Brand", "name": "Scion", "url": "https://www.emirates-car.com/search-by-make/Scion", "sameAs": "https://www.wikidata.org/wiki/Q154606" },
        { "@type": "Brand", "name": "Aston Martin", "url": "https://www.emirates-car.com/search-by-make/Aston%20Martin", "sameAs": "https://www.wikidata.org/wiki/Q46856" },
        { "@type": "Brand", "name": "Bentley", "url": "https://www.emirates-car.com/search-by-make/Bentley", "sameAs": "https://www.wikidata.org/wiki/Q22676" },
        { "@type": "Brand", "name": "Rolls-Royce", "url": "https://www.emirates-car.com/search-by-make/Rolls-Royce", "sameAs": "https://www.wikidata.org/wiki/Q2240" },
        { "@type": "Brand", "name": "Ferrari", "url": "https://www.emirates-car.com/search-by-make/Ferrari", "sameAs": "https://www.wikidata.org/wiki/Q1257" },
        { "@type": "Brand", "name": "Morgan", "url": "https://www.emirates-car.com/search-by-make/Morgan", "sameAs": "https://www.wikidata.org/wiki/Q186918" },
        { "@type": "Brand", "name": "Peugeot", "url": "https://www.emirates-car.com/search-by-make/Peugeot", "sameAs": "https://www.wikidata.org/wiki/Q176040" },
        { "@type": "Brand", "name": "Bugatti", "url": "https://www.emirates-car.com/search-by-make/Bugatti", "sameAs": "https://www.wikidata.org/wiki/Q21624" },
        { "@type": "Brand", "name": "Tesla", "url": "https://www.emirates-car.com/search-by-make/Tesla", "sameAs": "https://www.wikidata.org/wiki/Q478214" },
        { "@type": "Brand", "name": "Fiat", "url": "https://www.emirates-car.com/search-by-make/Fiat", "sameAs": "https://www.wikidata.org/wiki/Q27597" },
        { "@type": "Brand", "name": "McLaren", "url": "https://www.emirates-car.com/search-by-make/McLaren", "sameAs": "https://www.wikidata.org/wiki/Q190575" },
        { "@type": "Brand", "name": "BYD", "url": "https://www.emirates-car.com/search-by-make/BYD", "sameAs": "https://www.wikidata.org/wiki/Q1431076" },
        { "@type": "Brand", "name": "Pagani", "url": "https://www.emirates-car.com/search-by-make/Pagani", "sameAs": "https://www.wikidata.org/wiki/Q158349" },
        { "@type": "Brand", "name": "Genesis", "url": "https://www.emirates-car.com/search-by-make/Genesis", "sameAs": "https://www.wikidata.org/wiki/Q28467875" },
        { "@type": "Brand", "name": "Koenigsegg", "url": "https://www.emirates-car.com/search-by-make/Koenigsegg", "sameAs": "https://www.wikidata.org/wiki/Q206229" },
        { "@type": "Brand", "name": "Polestar", "url": "https://www.emirates-car.com/search-by-make/Polestar", "sameAs": "https://www.wikidata.org/wiki/Q4876005" },
        { "@type": "Brand", "name": "Abarth", "url": "https://www.emirates-car.com/search-by-make/Abarth", "sameAs": "https://www.wikidata.org/wiki/Q175262" },
        { "@type": "Brand", "name": "BAIC", "url": "https://www.emirates-car.com/search-by-make/BAIC", "sameAs": "https://www.wikidata.org/wiki/Q812702" },
        { "@type": "Brand", "name": "Geely", "url": "https://www.emirates-car.com/search-by-make/Geely", "sameAs": "https://www.wikidata.org/wiki/Q182803" },
        { "@type": "Brand", "name": "Chery", "url": "https://www.emirates-car.com/search-by-make/Chery", "sameAs": "https://www.wikidata.org/wiki/Q180611" },
        { "@type": "Brand", "name": "Great Wall GWM", "url": "https://www.emirates-car.com/search-by-make/Great%20Wall%20GWM", "sameAs": "https://www.wikidata.org/wiki/Q835655" },
        { "@type": "Brand", "name": "Hongqi", "url": "https://www.emirates-car.com/search-by-make/Hongqi", "sameAs": "https://www.wikidata.org/wiki/Q1102841" },
        { "@type": "Brand", "name": "W Motors", "url": "https://www.emirates-car.com/search-by-make/W%20Motors", "sameAs": "https://www.wikidata.org/wiki/Q16222341" },
        { "@type": "Brand", "name": "JAC", "url": "https://www.emirates-car.com/search-by-make/JAC", "sameAs": "https://www.wikidata.org/wiki/Q611697" },
        { "@type": "Brand", "name": "Jetour", "url": "https://www.emirates-car.com/search-by-make/Jetour", "sameAs": "https://www.wikidata.org/wiki/Q108460272" },
        { "@type": "Brand", "name": "Soueast", "url": "https://www.emirates-car.com/search-by-make/Soueast", "sameAs": "https://www.wikidata.org/wiki/Q7569713" },
        { "@type": "Brand", "name": "Zarooq Motors", "url": "https://www.emirates-car.com/search-by-make/Zarooq%20Motors", "sameAs": "https://www.wikidata.org/wiki/Q55629779" },
        { "@type": "Brand", "name": "Changan", "url": "https://www.emirates-car.com/search-by-make/Changan", "sameAs": "https://www.wikidata.org/wiki/Q184115" },
        { "@type": "Brand", "name": "Maxus", "url": "https://www.emirates-car.com/search-by-make/Maxus", "sameAs": "https://www.wikidata.org/wiki/Q65073355" },
        { "@type": "Brand", "name": "Opel", "url": "https://www.emirates-car.com/search-by-make/Opel", "sameAs": "https://www.wikidata.org/wiki/Q188052" },
        { "@type": "Brand", "name": "Skoda", "url": "https://www.emirates-car.com/search-by-make/Skoda", "sameAs": "https://www.wikidata.org/wiki/Q12405" },
        { "@type": "Brand", "name": "Haval", "url": "https://www.emirates-car.com/search-by-make/Haval", "sameAs": "https://www.wikidata.org/wiki/Q28146073" },
        { "@type": "Brand", "name": "Zotye", "url": "https://www.emirates-car.com/search-by-make/Zotye", "sameAs": "https://www.wikidata.org/wiki/Q8072476" },
        { "@type": "Brand", "name": "Renault", "url": "https://www.emirates-car.com/search-by-make/Renault", "sameAs": "https://www.wikidata.org/wiki/Q6686" },
        { "@type": "Brand", "name": "Dacia", "url": "https://www.emirates-car.com/search-by-make/Dacia", "sameAs": "https://www.wikidata.org/wiki/Q19155" }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "@id": "www.emirates-car.com#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "www.emirates-car.com"
        }
      ]
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.emirates-car.com/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Do you deal in genuine spare parts in UAE?",
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
    'Buy Auto spare parts in UAE | Order Online from Dubai dealer | Used, New, Genuine and Aftermarket | Emirates-car.com',
  description:
    'We have compared 100+ suppliers so you dont have to. Get the best price. Get professional assistance from Experienced dealer. Fast shipping and delivery available accross 8 Emirates.',
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
      'Buy Auto spare parts in UAE | Order Online from Dubai dealer | Used, New, Genuine and Aftermarket | Emirates-car.com',
    description:
      'We have compared 100+ suppliers so you dont have to. Get the best price. Get professional assistance from Experienced dealer. Fast shipping and delivery available accross 8 Emirates.',
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
      'We have compared 100+ suppliers so you dont have to. Get the best price. Get professional assistance from Experienced dealer. Fast shipping and delivery available accross 8 Emirates.',
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
