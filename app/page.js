import Count from '../components/service-countup';
import Image from 'next/image';
import TenEntries from '../components/tenentries';
import Contents from '../components/Contents';
import StaticCities from '../components/StaticCities';
import MainAccordion from '../components/Main-Accordion';
import "../public/main.css"
import HeroCarousel from '../components/HeroCarousel';
import CarData from "../public/lib/car-data.json"
import PartsData from "../public/lib/parts.json"
import Link from 'next/link';
import { Fira_Sans, Playfair_Display } from 'next/font/google';
import FormOnly from '../components/FormOnly';
import SearchPartsComponent from '../components/SearchPart';
import SearchBar from './catalogs/SearchBar';
import products from "../public/products.json"

export const revalidate = 1814400;
export const runtime = 'nodejs';
export const dynamicParams = false;

const playfair_display = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair-display',
});

const firaSans = Fira_Sans({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fira-sans',
});

const homepageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "www.emirates-car.com",
      "url": "https://www.emirates-car.com",
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
          "url": "https://www.emirates-car.com/contact",
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
    'Auto spare parts in UAE | Order Online from Dubai dealer | Used, New, Genuine and Aftermarket | Emirates-car.com',
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
    images: 'https://www.emirates-car.com/icons/favicon-32x32.png',
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
  category: 'Vehicle Parts & Accessories',
  other: {
    "script:ld+json": JSON.stringify(homepageSchema),
  },
};

const selectedParts = ["Battery", "Alternator", "Steering Rack", "AC Compressor", "AC Condenser", "AC Evaporator",
  "Air Bag Assembly", "Anti-Lock Brake Control Module (ABS)", "Axle Assembly", "Axle Shaft", "Brake Booster", "Bumpers", "Accessories", "Body Kits",
  "Camshaft", "Carburetor", "Catalytic Convertor", "Body Control Module (BCM)", "Coil (Ignition)", "Cooling Fans Assembly (Rad. & Cond.)"
  , "Crankshaft", "Cylinder Head", "Dashboard Assembly", "Differential Assembly", "Engine Assembly", "Engine Mount"
  , "Exhaust Manifold", "Fender (Front)", "Fender (Rear)", "Flywheel", "Fog Light", "Fuel Injection Pump", "Fuel Pump", "Grille",
  "Gearbox", "Headlight Assembly", "Speedometer Cluster", "Intake Manifold", "Lower Control Arm", "Upper Control Arm", "Master Cylinder", "Mirrors", "Oil Pump", "Piston"
  , "Steering Box", "Radiator", "Steering Wheel", "Spoiler", "Starter", "Suspension", "Taillight", "Throttle Body Assembly", "Turbocharger", "Water Pump", "Wheel", "Brake Disc", "Bonnet", "Engine Gasket", "Shock Absorber"
]


export default async function Home({ searchParams }) {
  const modelforms = CarData;
  const partsposts = PartsData;

  return (
    <div>
      <SearchBar allProducts={products} searchParams={searchParams} />
      <section
        className="py-5 xxs:py-0 xs:py-0 s:py-0 sm:px-7 lg:mx-6 md:mx-6 xs:px-0 s:px-2 max-w-7xl mx-auto"
        aria-label="auto spare parts in uae"
      >
        <div className="bg-backgroundlight rounded-sm">
          <div className="grid grid-cols-2 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-1 xxs:grid-cols-1 xs:text-center xs:pt-0">
            <div>
              <div className="lg:ml-8 md:ml-4 xl:ml-8 xxl:ml-8 xs:ml-3 xxs:ml-2 mt-40 lg:mt-28 xxs:mt-8 xxs:pt-8 sm:mt-12 md:mt-10 xs:mt-0 xs:text-center xxs:text-center md:text-center">
                <h1
                  className={`text-3xl xxs:mt-5 xs:mt-5 s:mt-5 sm:mt-5 lg:text-2xl md:text-2xl xxs:text-2xl xs:text-xl font-extrabold lg:leading-tight ${firaSans.className}`}
                >
                  Best Car Spare Parts Prices in UAE –{" "}
                  <span className="text-blue-500">Pre-Compared Quotes</span>
                </h1>

                <p className="mt-3 text-5xl xl:text-4xl xxl:text-2xl lg:text-4xl md:text-4xl xxs:text-xl xs:text-lg font-medium">
                  We Compare 100+ Suppliers So You Don&apos;t Have To. Get the Best Price Guaranteed.
                </p>


                <div className="mt-5 mx-auto sm:mx-5 md:mx-5 xxs:mx-3 xs:mx-3 xxs:my-5">
                  <div className="grid grid-cols-2 gap-2 py-3 xl:w-full xxl:w-full lg:w-full xs:w-full xxs:w-full mr-auto lg:mx-auto xl:mx-auto md:mx-auto xxl:mx-auto sm:mx-auto rounded-lg shadow-md">
                    <a
                      href="#myForm"
                      title="Inquire about vehicle parts online"
                      className="flex items-center justify-center py-2 text-xl xl:text-4xl xxl:text-4xl lg:text-lg md:text-lg xs:text-lg xxs:text-lg font-medium rounded-sm text-white bg-blue-600 hover:bg-blue-700"
                    >
                      Inquire Now
                    </a>

                    <a
                      href="/search-by-make"
                      title="Explore vehicle spare parts"
                      className="flex items-center justify-center py-2 text-xl xl:text-4xl xxl:text-4xl lg:text-lg md:text-lg xs:text-lg xxs:text-lg font-medium rounded-sm text-white bg-blue-400 hover:bg-blue-500"
                    >
                      Explore
                    </a>
                  </div>
                </div>

                {/* Description */}
                <p className="mt-10 mb-3 hidden md:block text-sm text-gray-700">
                  We deal with auto parts for German, Japanese, Chinese, French, British origin cars.
                </p>

                {/* Country Icons */}
                <div className="hidden md:block">
                  <div className="grid grid-cols-8 md:grid-cols-4 lg:grid-cols-4 gap-2 place-content-center mb-10">
                    {[
                      { src: "/img/icons/germany.png", label: "Germany", href: "/spare-parts/german-auto-spare-parts" },
                      { src: "/img/icons/united-kingdom.png", label: "Britain", href: "/spare-parts/british-auto-spare-parts" },
                      { src: "/img/icons/japan.png", label: "Japan", href: "/spare-parts/japanese-auto-spare-parts" },
                      { src: "/img/icons/south-korea.png", label: "Korean", href: "/spare-parts/korean-auto-spare-parts" },
                      { src: "/img/icons/usa.png", label: "USA", href: "/spare-parts/american-auto-spare-parts" },
                      { src: "/img/icons/india.png", label: "Indian", href: "/spare-parts/indian-auto-spare-parts" },
                      { src: "/img/icons/china.png", label: "China", href: "/spare-parts/chinese-auto-spare-parts" },
                      { src: "/img/icons/france.png", label: "French", href: "/spare-parts/french-auto-spare-parts" },
                    ].map(({ src, label, href }) => (
                      <Link key={label} href={href}>
                        <figure className="flex flex-col items-center text-center">
                          <Image
                            src={src}
                            alt={`${label} car auto spare parts`}
                            height={50}
                            width={50}
                            className="my-1 px-2 py-1"
                          />
                          <figcaption className="text-sm rounded-2xl border border-blue-500 hover:bg-blue-500 px-2 py-1">
                            {label}
                          </figcaption>
                        </figure>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="xxs:hidden xs:hidden md:hidden">
              <HeroCarousel />
            </div>
          </div>
        </div>
      </section>

      <div className='sm:max-w-xl lg:max-w-2xl md:max-w-xl xl:max-w-2xl xxl:max-w-2xl mx-auto xs:mx-3 xxs:mx-3 sm:mx-5'>
        <FormOnly formsData={modelforms} />
      </div>

      <section>
        <div className="text-center mx-auto max-w-7xl xs:px-3 xxs:px-2 xxs:mx-3 py-10 xs:py-5 xxs:py-5">
          <div className="grid grid-cols-4 text-center gap-2 xs:grid xs:grid-cols-2 s:grid s:grid-cols-2 xs:gap-1 xxs:text-sm xxs:grid xxs:grid-cols-2 xs:pb-5 s:pb-10">
            {/* New Parts */}
            <div className="text-base lg:text-base sm:text-xs md:text-sm bg-gradient-to-r from-blue-500 via-blue-200 to-blue-500 rounded-sm lg:mx-6 py-2 shadow-2xl xs:text-xs s:text-xs xs:shadow-none sm:shadow-none">
              <figure className="flex flex-col items-center">
                <Image
                  src="/img/icons/new-car.png"
                  alt="automotive parts store"
                  width={50}
                  height={50}
                />
                <figcaption className="mt-2">New parts</figcaption>
              </figure>
            </div>

            {/* Used Parts */}
            <div className="text-base lg:text-base sm:text-xs md:text-sm bg-gradient-to-r from-blue-500 via-blue-200 to-blue-500 rounded-sm lg:mx-6 shadow-2xl xs:shadow-none s:shadow-none sm:shadow-none xs:text-xs s:text-xs">
              <figure className="flex flex-col items-center">
                <Image
                  src="/img/icons/used-car.png"
                  alt="auto spare parts in dubai"
                  width={50}
                  height={50}
                />
                <figcaption className="mt-2">Used parts</figcaption>
              </figure>
            </div>

            {/* Genuine Parts */}
            <div className="text-base lg:text-base sm:text-xs md:text-sm bg-gradient-to-r from-blue-500 via-blue-200 to-blue-500 rounded-sm lg:mx-6 py-2 shadow-2xl xs:text-xs s:text-xs s:shadow-none xs:shadow-none sm:shadow-none">
              <figure className="flex flex-col items-center">
                <Image
                  src="/img/icons/genuine.png"
                  alt="automobile spare parts"
                  priority
                  width={50}
                  height={50}
                />
                <figcaption className="mt-2">Genuine parts</figcaption>
              </figure>
            </div>

            {/* Aftermarket Parts */}
            <div className="text-base lg:text-base sm:text-xs md:text-sm bg-gradient-to-r from-blue-500 via-blue-200 to-blue-500 rounded-sm lg:mx-6 py-2 shadow-2xl xs:text-xs s:text-xs s:shadow-none xs:shadow-none sm:shadow-none">
              <figure className="flex flex-col items-center">
                <Image
                  src="/img/icons/aftermarket.png"
                  alt="aftermarket auto body parts"
                  priority
                  width={50}
                  height={50}
                />
                <figcaption className="mt-2">Aftermarket parts</figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-bglight max-w-7xl mx-auto">
        <h3 className="text-black text-4xl my-10 text-center md:text-2xl lg:text-2xl font-bold xs:text-xl xxs:text-2xl pt-10">
          Popular <span className="text-blue-500">Country Origin</span> Spare parts
        </h3>

        <div className="grid grid-cols-8 gap-4 xs:grid-cols-4 xxs:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 place-content-center my-10 pb-10 xs:px-2 xxs:px-2">

          {/* Britain */}
          <div className="flex justify-center text-center">
            <figure>
              <Link href="/spare-parts/british-auto-spare-parts">
                <Image
                  src="/img/icons/united-kingdom.png"
                  alt="british car auto spare parts"
                  priority
                  height={50}
                  width={50}
                />
              </Link>
              <figcaption className="text-sm">Britain</figcaption>
            </figure>
          </div>

          <div className="flex justify-center text-center">
            <figure>
              <Image
                src="/img/icons/india.png"
                alt="indian car auto spare parts"
                priority
                height={50}
                width={50}
              />
              <figcaption className="text-sm">Indian</figcaption>
            </figure>
          </div>

          {/* Japan */}
          <div className="flex justify-center text-center">
            <figure>
              <Link href="/spare-parts/japanese-auto-spare-parts">
                <Image
                  src="/img/icons/japan.png"
                  alt="japan car auto spare parts"
                  priority
                  height={50}
                  width={50}
                />
              </Link>
              <figcaption className="text-sm">Japan</figcaption>
            </figure>
          </div>

          {/* Korean */}
          <div className="flex justify-center text-center">
            <figure>
              <Link href="/spare-parts/korean-auto-spare-parts">
                <Image
                  src="/img/icons/south-korea.png"
                  alt="korean car auto spare parts"
                  priority
                  height={50}
                  width={50}
                />
              </Link>
              <figcaption className="text-sm">Korean</figcaption>
            </figure>
          </div>

          {/* American */}
          <div className="flex justify-center text-center">
            <figure>
              <Link href="/spare-parts/american-auto-spare-parts">
                <Image
                  src="/img/icons/usa.png"
                  alt="united states car auto spare parts"
                  priority
                  height={50}
                  width={50}
                />
              </Link>
              <figcaption className="text-sm">American</figcaption>
            </figure>
          </div>

          {/* German */}
          <div className="flex justify-center text-center">
            <figure>
              <Link href="/spare-parts/german-auto-spare-parts">
                <Image
                  src="/img/icons/germany.png"
                  alt="german car auto spare parts"
                  priority
                  height={50}
                  width={50}
                />
              </Link>
              <figcaption className="text-sm">German</figcaption>
            </figure>
          </div>

          {/* China */}
          <div className="flex justify-center text-center">
            <figure>
              <Link href="/get-in-touch">
                <Image
                  src="/img/icons/china.png"
                  alt="chinese car auto spare parts"
                  priority
                  height={50}
                  width={50}
                />
              </Link>
              <figcaption className="text-sm">China</figcaption>
            </figure>
          </div>

          {/* French */}
          <div className="flex justify-center text-center">
            <figure>
              <Link href="/spare-parts/french-auto-spare-parts">
                <Image
                  src="/img/icons/france.png"
                  alt="french car auto spare parts"
                  priority
                  height={50}
                  width={50}
                />
              </Link>
              <figcaption className="text-sm xs:text-xs s:text-xs">French</figcaption>
            </figure>
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto font-sans">
        <section aria-label="Top American Spare Parts" className="pt-10">
          <h2 className="text-black text-4xl text-center md:text-2xl lg:text-2xl font-bold xs:text-xl xxs:text-2xl">
            Top American Spare parts
          </h2>
          <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-7 md:mx-4 sm:mx-3 xs:grid xs:grid-cols-2 sm:grid sm:grid-cols-3 xxs:grid xxs:grid-cols-2 s:grid s:grid-cols-2 gap-1 xs:mx-2 s:mx-2 xxs:mx-2 md:ml-11 my-10 mx-10">

            {[
              { href: "/search-by-make/Ford", alt: "Ford spare parts Dubai", label: "Ford", src: "/img/car-logos/ford.webp" },
              { href: "/search-by-make/GMC", alt: "GMC spare parts in UAE", label: "GMC", src: "/img/car-logos/gmc.webp" },
              { href: "/search-by-make/Chevrolet", alt: "Chevrolet spare parts in UAE", label: "Chevrolet", src: "/img/car-logos/chevrolet.webp" },
              { href: "/search-by-make/Jeep", alt: "Jeep spare parts in UAE", label: "Jeep", src: "/img/car-logos/jeep.webp" },
              { href: "/search-by-make/Hummer", alt: "Hummer parts online", label: "Hummer", src: "/img/car-logos/hummer.webp" },
              { href: "/search-by-make/Cadillac", alt: "Cadillac spare parts Sharjah", label: "Cadillac", src: "/img/car-logos/cadillac.webp" },
              { href: "/search-by-make/Lincoln", alt: "Lincoln spare parts Sharjah", label: "Lincoln", src: "/img/car-logos/lincoln.webp" },
              { href: "/search-by-make/Dodge", alt: "Dodge spare parts Dubai", label: "Dodge", src: "/img/car-logos/dodge.webp" },
              { href: "/search-by-make/Chrysler", alt: "Chrysler spare parts in UAE", label: "Chrysler", src: "/img/car-logos/chrysler.webp" },
              { href: "/search-by-make/Mercury", alt: "Mercury spare parts in Dubai", label: "Mercury", src: "/img/car-logos/mercury.webp" },
              { href: "/search-by-make/Buick", alt: "Buick spare parts in UAE", label: "Buick", src: "/img/car-logos/buick.webp" },
              { href: "/search-by-make/Ram", alt: "Ram spare parts in UAE", label: "Ram", src: "/img/car-logos/ram.webp" },
            ].map(({ href, alt, label, src }) => (
              <figure key={label} className="border hover:border-blue-600 py-3 text-center rounded-sm">
                <a href={href} className="flex flex-col items-center no-underline" aria-label={`${label} spare parts`}>
                  <Image
                    alt={alt}
                    src={src}
                    className="object-scale-down"
                    height={50}
                    width={50}
                  />
                  <figcaption className="m-1 w-3/5 bg-darkblue hover:bg-blue-400 font-bold text-white text-sm hover:text-gray-800 rounded-sm px-2 py-1 mt-2">
                    {label}
                  </figcaption>

                </a>
              </figure>
            ))}

          </div>
        </section>

        {/*Japanese */}

        <section aria-label="Top Japanese Spare Parts" className="pt-10">
          <h2 className="text-black text-4xl text-center md:text-2xl lg:text-2xl font-bold xs:text-xl xxs:text-2xl">
            Top Japanese Spare parts
          </h2>
          <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-7 md:mx-4 sm:mx-3 xs:grid xs:grid-cols-2 sm:grid sm:grid-cols-3 xxs:grid xxs:grid-cols-2 s:grid s:grid-cols-2 gap-1 xs:mx-4 s:mx-4 xxs:mx-4 md:ml-11 my-10 mx-10">
            {[
              { href: "/search-by-make/Toyota", alt: "Auto parts Toyota", label: "Toyota", src: "/img/car-logos/toyota.webp" },
              { href: "/search-by-make/Mitsubishi", alt: "Mitsubishi spare parts in UAE", label: "Mitsubishi", src: "/img/car-logos/mitsubishi.webp" },
              { href: "/search-by-make/Lexus", alt: "Lexus spare parts in UAE", label: "Lexus", src: "/img/car-logos/lexus.webp" },
              { href: "/search-by-make/Nissan", alt: "Spare parts Nissan", label: "Nissan", src: "/img/car-logos/nissan.webp" },
              { href: "/search-by-make/Infiniti", alt: "Infiniti spare parts in UAE", label: "Infiniti", src: "/img/car-logos/infiniti.webp" },
              { href: "/search-by-make/Honda", alt: "Honda spare parts in UAE", label: "Honda", src: "/img/car-logos/honda.webp" },
              { href: "/search-by-make/Mazda", alt: "Mazda spare parts in UAE", label: "Mazda", src: "/img/car-logos/mazda.webp" },
              { href: "/search-by-make/Subaru", alt: "Subaru spare parts in UAE", label: "Subaru", src: "/img/car-logos/subaru.webp" },
              { href: "/search-by-make/Suzuki", alt: "Suzuki spare parts in UAE", label: "Suzuki", src: "/img/car-logos/suzuki.webp" },
              { href: "/search-by-make/Daihatsu", alt: "Daihatsu spare parts in UAE", label: "Daihatsu", src: "/img/car-logos/daihat.webp" },
              { href: "/search-by-make/Isuzu", alt: "Isuzu spare parts in UAE", label: "Isuzu", src: "/img/car-logos/isuzu.webp" },
            ].map(({ href, alt, label, src }) => (
              <figure key={label} className="border hover:border-blue-600 py-3 text-center rounded-sm">
                <a href={href} className="flex flex-col items-center no-underline" aria-label={`${label} spare parts`}>

                  <Image
                    alt={alt}
                    src={src}
                    className="object-scale-down"
                    height={50}
                    width={50}
                  />
                  <figcaption className="m-1 w-3/5 bg-darkblue hover:bg-blue-400 font-bold text-white text-sm hover:text-gray-800 rounded-sm px-2 py-1 mt-2">
                    {label}
                  </figcaption>

                </a>
              </figure>
            ))}
          </div>
        </section>


        {/*Britain */}
        <section aria-label="Top Britain Spare Parts" className="pt-10">
          <h2 className="text-black text-4xl text-center md:text-2xl lg:text-2xl font-bold xs:text-xl xxs:text-2xl">
            Top Britain Spare parts
          </h2>
          <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-5 md:mx-4 sm:mx-3 xs:grid xs:grid-cols-2 sm:grid sm:grid-cols-3 xxs:grid xxs:grid-cols-2 s:grid s:grid-cols-2 gap-1 xs:mx-4 s:mx-4 xxs:mx-4 md:ml-11 my-10 mx-10">
            {[
              { href: "/search-by-make/Aston Martin", alt: "Aston Martin spare parts in UAE", label: "Aston Martin", src: "/img/car-logos/aston_martin.webp" },
              { href: "/search-by-make/Bentley", alt: "Bentley spare parts in UAE", label: "Bentley", src: "/img/car-logos/bentley.webp" },
              { href: "/search-by-make/Jaguar", alt: "Jaguar spare parts in UAE", label: "Jaguar", src: "/img/car-logos/jaguar.webp" },
              { href: "/search-by-make/Land Rover", alt: "Land Rover spare parts in UAE", label: "Land Rover", src: "/img/car-logos/land_rover.webp" },
              { href: "/search-by-make/Lotus", alt: "Lotus spare parts in UAE", label: "Lotus", src: "/img/car-logos/lotus.webp" },
              { href: "/search-by-make/McLaren", alt: "McLaren spare parts in UAE", label: "McLaren", src: "/img/car-logos/mclaren.webp" },
              { href: "/search-by-make/Mini", alt: "Mini spare parts in UAE", label: "Mini", src: "/img/car-logos/mini.webp" },
              { href: "/search-by-make/Rolls-Royce", alt: "Rolls Royce spare parts in UAE", label: "Rolls Royce", src: "/img/car-logos/rolls-royce.webp" },
            ].map(({ href, alt, label, src }) => (
              <figure key={label} className="border hover:border-blue-600 py-3 text-center rounded-sm">
                <a href={href} className="flex flex-col items-center no-underline" aria-label={`${label} spare parts`}>

                  <Image
                    alt={alt}
                    src={src}
                    className="object-scale-down"
                    height={50}
                    width={50}
                  />
                  <figcaption className="m-1 w-3/5 bg-darkblue hover:bg-blue-400 font-bold text-white text-sm hover:text-gray-800 rounded-sm px-2 py-1 mt-2">
                    {label}
                  </figcaption>

                </a>
              </figure>
            ))}
          </div>
        </section>

        {/*French */}
        <section aria-label="Top French Spare Parts" className="pt-10">
          <h2 className="text-black text-4xl text-center md:text-2xl lg:text-2xl font-bold xs:text-xl xxs:text-2xl">
            Top French Spare parts
          </h2>
          <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-5 md:mx-4 sm:mx-3 xs:grid xs:grid-cols-2 sm:grid sm:grid-cols-3 xxs:grid xxs:grid-cols-2 s:grid s:grid-cols-2 gap-1 xs:mx-4 s:mx-4 xxs:mx-4 md:ml-11 my-10 mx-10">
            {[
              { href: "/search-by-make/Peugeot", alt: "Peugeot spare parts in UAE", label: "Peugeot", src: "/img/car-logos/peugeot.webp" },
              { href: "/search-by-make/Citroen", alt: "Citroen spare parts in UAE", label: "Citroen", src: "/img/car-logos/citroen.webp" },
              { href: "/search-by-make/Renault", alt: "Renault spare parts in UAE", label: "Renault", src: "/img/car-logos/renault.webp" },
              { href: "/search-by-make/Mobility Ventures LLC", alt: "Mobility Ventures LLC spare parts in UAE", label: "Mobility Ventures LLC", src: "/img/car-logos/venturi.webp" },
              { href: "/search-by-make/Bugatti", alt: "Bugatti spare parts in UAE", label: "Bugatti", src: "/img/car-logos/bugatti.webp" },
            ].map(({ href, alt, label, src }) => (
              <figure key={label} className="border hover:border-blue-600 py-3 text-center rounded-sm">
                <a href={href} className="flex flex-col items-center no-underline" aria-label={`${label} spare parts`}>

                  <Image
                    alt={alt}
                    src={src}
                    className="object-scale-down"
                    height={50}
                    width={50}
                  />
                  <figcaption className="m-1 w-3/5 bg-darkblue hover:bg-blue-400 font-bold text-white text-sm hover:text-gray-800 rounded-sm px-2 py-1 mt-2">
                    {label}
                  </figcaption>

                </a>
              </figure>
            ))}
          </div>
        </section>

        {/*German */}
        <section aria-label="Top German Spare Parts" className="pt-10">
          <h2 className="text-black text-4xl text-center md:text-2xl lg:text-2xl font-bold xs:text-xl xxs:text-2xl">
            Top German Spare parts
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 md:mx-4 sm:mx-3 xs:grid xs:grid-cols-2 sm:grid sm:grid-cols-3 xxs:grid xxs:grid-cols-2 s:grid s:grid-cols-2 gap-1 xs:mx-4 s:mx-4 xxs:mx-4 md:ml-11 my-10 mx-10">
            {[
              {
                href: "/search-by-make/Mercedes-Benz",
                alt: "Mercedes Benz spare parts in UAE",
                label: "Mercedes Benz",
                src: "/img/car-logos/mercedesbenz.webp",
              },
              {
                href: "/search-by-make/BMW",
                alt: "BMW spare parts in UAE",
                label: "BMW",
                src: "/img/car-logos/BMW.webp",
              },
              {
                href: "/search-by-make/Volkswagen",
                alt: "Volkswagen spare parts in UAE",
                label: "Volkswagen",
                src: "/img/car-logos/volkswagon.webp",
              },
              {
                href: "/search-by-make/Jaguar",
                alt: "Jaguar spare parts in UAE",
                label: "Jaguar",
                src: "/img/car-logos/jaguar.webp",
              },
              {
                href: "/search-by-make/Land%20Rover",
                alt: "Land Rover spare parts in UAE",
                label: "Land Rover",
                src: "/img/car-logos/land_rover.webp",
              },
              {
                href: "/search-by-make/Porsche",
                alt: "Porsche spare parts in UAE",
                label: "Porsche",
                src: "/img/car-logos/porsche.webp",
              },
            ].map(({ href, alt, label, src }) => (
              <figure key={label} className="border hover:border-blue-600 py-3 text-center rounded-sm">
                <a href={href} className="flex flex-col items-center no-underline" aria-label={`${label} spare parts`}>

                  <Image
                    alt={alt}
                    src={src}
                    className="object-scale-down"
                    height={50}
                    width={50}
                  />
                  <figcaption className="m-1 bg-darkblue w-3/5 hover:bg-blue-400 font-bold text-white text-sm hover:text-gray-800 rounded-sm px-2 py-1 mt-2">
                    {label}
                  </figcaption>

                </a>
              </figure>
            ))}
          </div>
        </section>

        {/*Korean */}
        <section aria-label="Top Korean Spare Parts" className="pt-10">
          <h2 className="text-black text-4xl text-center md:text-2xl lg:text-2xl font-bold xs:text-xl xxs:text-2xl">
            Top Korean Spare parts
          </h2>
          <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-3 md:mx-4 sm:mx-3 xs:grid xs:grid-cols-2 sm:grid sm:grid-cols-3 xxs:grid xxs:grid-cols-2 s:grid s:grid-cols-2 gap-1 xs:mx-4 s:mx-4 xxs:mx-4 md:ml-11 my-10 mx-10">
            {[
              {
                href: "/search-by-make/Hyundai",
                alt: "Hyundai spare parts in UAE",
                label: "Hyundai",
                src: "/img/car-logos/hyundai.webp",
              },
              {
                href: "/search-by-make/Kia",
                alt: "Kia spare parts in UAE",
                label: "Kia",
                src: "/img/car-logos/kia.webp",
              },
              {
                href: "/search-by-make/Daewoo",
                alt: "Daewoo spare parts in UAE",
                label: "Daewoo",
                src: "/img/car-logos/daewoo.webp",
              },
            ].map(({ href, alt, label, src }) => (
              <figure key={label} className="border hover:border-blue-600 py-3 text-center rounded-sm">
                <a href={href} className="flex flex-col items-center no-underline" aria-label={`${label} spare parts`}>

                  <Image
                    alt={alt}
                    src={src}
                    className="object-scale-down"
                    height={50}
                    width={50}
                  />
                  <figcaption className="m-1 bg-darkblue w-3/5 hover:bg-blue-400 font-bold text-white text-sm hover:text-gray-800 rounded-sm px-2 py-1 mt-2">
                    {label}
                  </figcaption>

                </a>
              </figure>
            ))}
          </div>
        </section>


        <TenEntries />
        <MainAccordion />

        <div className="mx-auto py-10">
          <Count />
        </div>
        <section aria-labelledby="popular-brands-title" className="pt-10 mx-10">
          <h2
            id="popular-brands-title"
            className="text-black text-4xl text-center md:text-2xl lg:text-2xl font-bold xs:text-xl xxs:text-2xl"
          >
            Popular Brands
          </h2>

          <ul
            className="grid grid-cols-5 md:grid-cols-4 sm:grid-cols-4 lg:grid-cols-4 xs:grid-cols-2 xxs:grid-cols-2 s:grid-cols-2 gap-1 xs:mx-4 s:mx-4 xxs:mx-4 md:ml-11 my-10"
            role="list"
          >
            {[
              { name: 'Toyota', href: '/search-by-make/Toyota', src: '/img/car-logos/toyota.webp', alt: 'Toyota spare parts Sharjah' },
              { name: 'Mitsubishi', href: '/search-by-make/Mitsubishi', src: '/img/car-logos/mitsubishi.webp', alt: 'Mitsubishi parts Dubai' },
              { name: 'Mercedes-Benz', href: '/search-by-make/Mercedes-benz', src: '/img/car-logos/mercedesbenz.webp', alt: 'Mercedes Benz parts Sharjah' },
              { name: 'Nissan', href: '/search-by-make/Nissan', src: '/img/car-logos/nissan.webp', alt: 'Nissan parts Dubai' },
              { name: 'Ford', href: '/search-by-make/Ford', src: '/img/car-logos/ford.webp', alt: 'Ford parts Ajman' },
              { name: 'Hyundai', href: '/search-by-make/Hyundai', src: '/img/car-logos/hyundai.webp', alt: 'Hyundai spare parts Dubai' },
              { name: 'Volkswagen', href: '/search-by-make/Volkswagen', src: '/img/car-logos/volkswagon.webp', alt: 'Volkswagen parts UAE' },
              { name: 'Honda', href: '/search-by-make/Honda', src: '/img/car-logos/honda.webp', alt: 'Honda spare parts UAE' },
              { name: 'Lexus', href: '/search-by-make/Lexus', src: '/img/car-logos/lexus.webp', alt: 'Lexus spare parts Sharjah' },
              { name: 'Volvo', href: '/search-by-make/Volvo', src: '/img/car-logos/volvo.webp', alt: 'Volvo parts UAE' },
              { name: 'Kia', href: '/search-by-make/Kia', src: '/img/car-logos/kia.webp', alt: 'Kia spare parts UAE' },
              { name: 'Porsche', href: '/search-by-make/Porsche', src: '/img/car-logos/porsche.webp', alt: 'Porsche parts UAE' },
              { name: 'Chevrolet', href: '/search-by-make/Chevrolet', src: '/img/car-logos/chevrolet.webp', alt: 'Chevrolet spare parts UAE' },
              { name: 'Land Rover', href: '/search-by-make/Land Rover', src: '/img/car-logos/land_rover.webp', alt: 'Land Rover parts UAE' },
            ].map((brand) => (
              <li key={brand.name}>
                <a href={brand.href} className="block border h-full hover:border-blue-600 py-3" aria-label={`${brand.name} spare parts`}>

                  <figure className="flex flex-col items-center justify-center">
                    <Image
                      src={brand.src}
                      alt={brand.alt}
                      className="object-scale-down"
                      width={50}
                      height={50}
                    />
                    <figcaption className="text-center mt-2 w-3/5 bg-darkblue hover:bg-blue-400 font-bold text-white text-sm hover:text-gray-800 rounded-sm px-2 py-1">
                      {brand.name}
                    </figcaption>
                  </figure>

                </a>
              </li>
            ))}
          </ul>
        </section>

      </div>

      <section className="max-w-7xl mx-auto mt-10 shadow-sm md:mx-4 lg:max-w-4xl lg:mx-auto xl:mx-10 bg-gray-100 px-20 xs:px-3 xxs:px-3">
        <div className="container py-6">
          <h2 className={`text-black text-4xl text-center md:text-2xl lg:text-3xl font-bold xs:text-xl xxs:text-2xl pt-10 ${firaSans.className}`}>
            Search All Parts in UAE
          </h2>

          <ul className="grid grid-cols-4 md:grid-cols-3 sm:grid-cols-4 xs:grid-cols-2 xxs:grid-cols-3 gap-3 xs:gap-1 mt-10">
            {partsposts
              .filter(post => selectedParts.includes(post.parts))
              .map((post, i) => {
                return (
                  <li key={i} className="border">
                    <a href={`/search-by-part-name/${decodeURIComponent(post.parts)}`} target="_blank">
                      <div className="flex flex-col hover:border-blue-600 py-3 bg-gray-100 rounded-sm">
                        <div className="w-[120px] h-[120px] mx-auto m-3 flex items-center justify-center">
                          <Image
                            src={post.img || '/img/parts/car-spare-parts.png'}
                            alt={`${post.parts}`}
                            className="max-w-full max-h-full object-contain"
                            width={120}
                            height={120}
                          />
                        </div>
                        <p className="text-center font-sans font-medium text-base">
                          <span>{post.parts}</span>
                        </p>
                      </div>
                    </a>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </section>
      <StaticCities />

      <Contents />
    </div>
  );
}
