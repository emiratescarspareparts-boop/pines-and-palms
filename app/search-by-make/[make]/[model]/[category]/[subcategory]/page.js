import productsFile from "../../../../../../public/products.json";
import { Fira_Sans, Playfair_Display } from "next/font/google";
import SearchModel from "../../../../../../components/SearchModel";
import Link from "next/link";
import Image from "next/image";
import SearchMakeModelParts from "../../../../../../components/SearchMakeModelParts";
import SearchCity from "../../../../../../components/SearchCity";
import CarData from "../../../../../../public/lib/car-data.json"
import partsData from "../../../../../../public/lib/filteredparts.json"
import CitiesData from "../../../../../../public/lib/cities.json"
import Product from "./Product";
import FormMakeModel from "../../../../../../components/FormMakeModel";
import { notFound } from "next/navigation";
import { BadgeCheck, Car, Clock, Heading2, LinkIcon, MapPin, Recycle } from 'lucide-react';
import FormBattery from "../../../../../../components/FormBattery";


export const revalidate = 86400;
export const runtime = 'nodejs';
export const dynamicParams = true;

const excludedMakes = [
    'Buick', 'Eagle', 'Lotus', 'Plymouth', 'Pontiac', 'Saab', 'Subaru',
    'Alpha Romeo', 'Geo', 'Oldsmobile', 'Isuzu', 'Saturn', 'Corbin', 'Holden',
    'Spyker', 'Spyker Cars', 'Aston Martin', 'Panoz', 'Foose', 'Morgan', 'Aptera',
    'Smart', 'SRT', 'Roush Performance', 'Pagani', 'Mobility Ventures LLC',
    'RUF Automobile', 'Koenigsegg', 'Karma', 'Polestar', 'STI', 'Kandi', 'Abarth',
    'Dorcen', 'Foton', 'W Motors', 'Opel', 'Skoda', 'Hillman', 'Austin', 'Fillmore',
    'Maybach', 'Merkur', 'Rambler', 'Shelby', 'Studebaker', 'Great Wall GWM', 'Zeekr', 'ZNA', 'GAC', 'Gs7', 'Hongqi',
    'W Motor', 'JAC', 'Jaecoo', 'Jetour', 'TANK', 'Soueast', 'Zarooq Motors', 'Changan', 'Maxus', 'Haval', 'Zotye', 'Sandstorm',
    'Chery', 'Geely', 'BAIC', 'Bestune'
];

const includedMakes = [
    'Audi', 'Ford', 'Honda', 'Lamborghini', 'Land Rover', 'Lexus', 'Lincoln', 'Maserati', 'Mazda', 'Mercedes-Benz', 'Mitsubishi',
    'Nissan', 'Porsche', 'Suzuki', 'Volkswagen', 'Chevrolet', 'Toyota', 'Alfa Romeo', 'BMW', 'Cadillac', 'Chrysler'
    , 'Daihatsu', 'Dodge', 'GMC', 'Hyundai', 'Infiniti', 'Jaguar', 'Jeep', 'Volvo', 'Hummer', 'Kia', 'Daewoo', 'Mini', 'Maybach', 'Scion',
    'Aston Martin', 'Bentley', 'Rolls-Royce', 'Ferrari', 'Peugeot', 'Bugatti', 'Tesla', 'Ram', 'Fiat', 'McLaren', 'BYD',
    'Genesis', 'Abarth', 'Renault', 'Dacia'
]

const selectedParts = ["Battery", "Alternator", "Steering Rack"]


const excludedMakesSet = new Set(excludedMakes);

const playfair_display = Playfair_Display({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-playfair-display",
});

const firaSans = Fira_Sans({
    weight: ['400', '700'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-fira-sans',
});


const subCity = [
    {
        "id": 2,
        "city": "Abu Dhabi",
        "link": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d465132.6090253298!2d54.27841778442708!3d24.38657289151084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5e440f723ef2b9%3A0xc7cc2e9341971108!2sAbu%20Dhabi%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sin!4v1640018687052!5m2!1sen!2sin",
        "description": "Abu Dhabi, also spelled Abu zaby. Abu Dhabi, the capital of the United Arab Emirates, sits off the mainland on an island in the Persian (Arabian) Gulf. Its focus on oil exports and commerce is reflected by the skyline&apos;s modern towers and shopping megacenters such as Abu Dhabi and Marina malls. The city of Abu Dhabi is located on an island Beneath white-marble domes, the vast Sheikh Zayed Grand Mosque features an immense Persian carpet, crystal chandeliers and capacity for 41,000 worshipers."
    },
    {
        "id": 5,
        "city": "Ajman",
        "link": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d230658.57689222984!2d55.39307659945978!3d25.40346278803545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5764dd8fbe79%3A0xcda090de6445a819!2sAjman%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sin!4v1640009886379!5m2!1sen!2sin",
        "description": "After Abu Dhabi, Sharjah and Al Ain, Ajman is the fifth largest city in United Arab Emirates. A paper published by researchers from Ajman university explains the URBANISATION IN AJMAN: PUSHING BY HOUSING DEVELOPMENT, published on febrauary, 2020. It is published in a motto of developing the Ajman city."
    },
    {
        "id": 6,
        "city": "Al Ain",
        "link": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d232921.30495584515!2d55.60677819193463!3d24.192928130526976!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e8ab145cbd5a049%3A0xf56f8cea5bf29f7f!2sAl%20Ain%20-%20Abu%20Dhabi%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sin!4v1640018189460!5m2!1sen!2sin",
        "description": "Al Ain is a inland oasis city. It shares eastern border with Oman. Its called a garden city because it is loaded with palm grooves trees and natural springs. It has Archeological park to the north and tombs on mountain of Jebel al Hafeet and its remains are displayed on the National museum in the central part of Al Ain. So naturally, Al Ain is more adventourous to attract tourist. A new project is initiated by the name `Plan Al Ain 2030`. It is expected to complete by 2030. The paper released by faculty of UAEU. It outlines the Foundation, Economics, urban structure framework and overall patterns"
    },
    {
        "id": 14,
        "city": "Al Quoz",
        "link": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114828.64793224298!2d54.86883979250164!3d24.890725154679558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6964885557e3%3A0xa70149067c1c3458!2sAl%20Quoz%20-%20Dubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sin!4v1640017701389!5m2!1sen!2sin",
        "description": "Al quoz is an ex-industrial area.But now it is a residence for various art galleries for both local arts and global arts. There are boutiques which has products of home startups, It is also a residence for Pop-ups market, film screenings and stylish cafes. Many rooms and villas are available at cheap rent rate for families. If families are looking for rent near a mall and busy area, they can find it near khail mall. Al quoz area is divided into al quoz 1, al quoz 2, al quoz 3, al quoz 4 and two industrial area. Rooms are avaiable for rent at low rent prices."
    },
    {
        "id": 21,
        "city": "Dubai",
        "link": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d462562.65102636546!2d54.94754444558808!3d25.075759435668097!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sDubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sin!4v1640016582896!5m2!1sen!2sin",
        "description": "."
    },
    {
        "id": 56,
        "city": "Ras al Khaimah",
        "link": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d922252.0033869754!2d55.44538869425926!3d25.453407942583034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ef6710e4cd209a7%3A0xb99e670ca684e20f!2sRas%20al%20Khaimah%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sin!4v1640012402585!5m2!1sen!2sin",
        "description": "."
    },
    {
        "id": 63,
        "city": "Sharjah",
        "link": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d230818.9387004767!2d55.41516106289569!3d25.319455944500426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5f5fede7964b%3A0x2a830aa19c1f6d89!2sAl%20Sharjah%20-%20Sharjah%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sin!4v1640011943348!5m2!1sen!2sin",
        "description": "."
    },
    {
        "id": 64,
        "city": "Deira",
        "link": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114828.64793224298!2d54.86883979250164!3d24.890725154679558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f434f37cdae93%3A0xde756363a1b78491!2sDeira%20-%20Dubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sin!4v1640016669393!5m2!1sen!2sin",
        "description": "."
    },
    {
        "id": 65,
        "city": "Palm Jumeirah",
        "link": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14450.447161457285!2d55.12874522050363!3d25.114999342949368!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f14d4cca1c2d7%3A0x5ad3062089d93972!2sThe%20Palm%20-%20Jumeirah!5e0!3m2!1sen!2sin!4v1640011798560!5m2!1sen!2sin",
        "description": "."
    }
];

const subCityBattery = [
    {
        "id": 14,
        "city": "Al Quoz",
        "link": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114828.64793224298!2d54.86883979250164!3d24.890725154679558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6964885557e3%3A0xa70149067c1c3458!2sAl%20Quoz%20-%20Dubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sin!4v1640017701389!5m2!1sen!2sin",
        "description": "Al quoz is an ex-industrial area.But now it is a residence for various art galleries for both local arts and global arts. There are boutiques which has products of home startups, It is also a residence for Pop-ups market, film screenings and stylish cafes. Many rooms and villas are available at cheap rent rate for families. If families are looking for rent near a mall and busy area, they can find it near khail mall. Al quoz area is divided into al quoz 1, al quoz 2, al quoz 3, al quoz 4 and two industrial area. Rooms are avaiable for rent at low rent prices."
    },
    {
        "id": 21,
        "city": "Dubai",
        "link": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d462562.65102636546!2d54.94754444558808!3d25.075759435668097!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sDubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sin!4v1640016582896!5m2!1sen!2sin",
        "description": "."
    },
    {
        "id": 63,
        "city": "Sharjah",
        "link": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d230818.9387004767!2d55.41516106289569!3d25.319455944500426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5f5fede7964b%3A0x2a830aa19c1f6d89!2sAl%20Sharjah%20-%20Sharjah%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sin!4v1640011943348!5m2!1sen!2sin",
        "description": "."
    },
    {
        "id": 64,
        "city": "Deira",
        "link": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114828.64793224298!2d54.86883979250164!3d24.890725154679558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f434f37cdae93%3A0xde756363a1b78491!2sDeira%20-%20Dubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sin!4v1640016669393!5m2!1sen!2sin",
        "description": "."
    },
    {
        "id": 75,
        "city": "Downtown Dubai (Dubai)",
        "basecity": "Dubai",
        "link": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28882.15779490044!2d55.24420773921744!3d25.194124905517132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f682f700cf983%3A0xb5cc58b076c0b904!2sDowntown%20Dubai%20-%20Dubai!5e0!3m2!1sen!2sae!4v1653746865952!5m2!1sen!2sae",
        "description": "."
    },
    {
        "id": 67,
        "city": "The Palm Jumeirah (Dubai)",
        "basecity": "Dubai",
        "link": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14450.447161457285!2d55.12874522050363!3d25.114999342949368!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f14d4cca1c2d7%3A0x5ad3062089d93972!2sThe%20Palm%20-%20Jumeirah!5e0!3m2!1sen!2sin!4v1640011798560!5m2!1sen!2sin",
        "description": "."
    },
    {
        "id": 7,
        "city": "Al Barsha (Dubai)",
        "basecity": "Dubai",
        "link": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57814.79486915902!2d55.178649489795504!3d25.087481740340316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6c0fdcf8c319%3A0xc1b5948ee66f3482!2sAl%20Barsha%20-%20Dubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sin!4v1640018150770!5m2!1sen!2sin",
        "description": "One of the most popular residential districts in Dubai. Tranquil Al Barsha Pond Park is a popular spot for picnics and go-karting while sprawling Dubai Miracle Garden, open October to April, features elaborate floral displays and butterfly domes. Al Barsha is known for its affordable apartments, spacious villas, beautiful parks and abundant amenities. Mall of Emirates is Famous spot in Al Barsha for a vast shopping complex with fashion chains, skeing."
    },
    {
        "id": 91,
        "city": "Dubai Silicon Oasis (Dubai)",
        "basecity": "Dubai",
        "link": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28899.03259340412!2d55.371097592411694!3d25.122871971550747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f640f1dcd4111%3A0xcb38e7be624792c3!2sDubai%20Silicon%20Oasis%20-%20Dubai!5e0!3m2!1sen!2sae!4v1653748833788!5m2!1sen!2sae",
        "description": "."
    },
    {
        "id": 100,
        "city": "Dubai Media City",
        "basecity": "Dubai",
        "link": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14452.582935354007!2d55.149720189971106!3d25.09692767494134!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6b43c675c243%3A0x7dfdb7a273cf2c58!2sAl%20Sufouh%20-%20Dubai%20Media%20City%20-%20Dubai!5e0!3m2!1sen!2sae!4v1768240238758!5m2!1sen!2sae",
        "description": "."
    },
    {
        "id": 74,
        "city": "Business Bay (Dubai)",
        "basecity": "Dubai",
        "link": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28884.319245515573!2d55.25684224251268!3d25.185008819697657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f682def25f457%3A0x3dd4c4097970950e!2sBusiness%20Bay%20-%20Dubai!5e0!3m2!1sen!2sae!4v1653746679848!5m2!1sen!2sae",
        "description": "."
    },
    {
        "id": 78,
        "city": "Za'abeel (Dubai)",
        "basecity": "Dubai",
        "link": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57753.4752360158!2d55.26198074064301!3d25.216971374891997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f42a218e96a81%3A0x3e447be592a28dbe!2sZa&#39;abeel%20-%20Dubai!5e0!3m2!1sen!2sae!4v1653747037466!5m2!1sen!2sae",
        "description": "."
    },
    {
        "id": 88,
        "city": "Al Twar (Dubai)",
        "basecity": "Dubai",
        "link": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28866.506675027158!2d55.359246692634926!3d25.260042967466383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5db69e02de3b%3A0xe9e7c3620931818!2sAl%20Twar%20-%20Dubai!5e0!3m2!1sen!2sae!4v1653748660739!5m2!1sen!2sae",
        "description": "."
    },
    {
        "id": 88,
        "city": "Mirdif (Dubai)",
        "basecity": "Dubai",
        "link": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28875.709315222226!2d55.40611644257176!3d25.221303568617476!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f60bde888939f%3A0x2245c09926a8f686!2sMirdif%20-%20Dubai!5e0!3m2!1sen!2sae!4v1653748171642!5m2!1sen!2sae",
        "description": "."
    },
    {
        "id": 89,
        "city": "Bur Dubai",
        "basecity": "Dubai",
        "link": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28875.709315222226!2d55.40611644257176!3d25.221303568617476!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f60bde888939f%3A0x2245c09926a8f686!2sMirdif%20-%20Dubai!5e0!3m2!1sen!2sae!4v1653748171642!5m2!1sen!2sae",
        "description": "."
    },
    {
        "id": 80,
        "city": "Al Karama (Dubai)",
        "basecity": "Dubai",
        "link": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14435.078699430707!2d55.29624617055619!3d25.244681541983557!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f42d7bf391ce5%3A0xc92c59be702d25dd!2sAl%20Karama%20-%20Dubai!5e0!3m2!1sen!2sae!4v1653747225010!5m2!1sen!2sae",
        "description": "."
    },
    {
        "id": 95,
        "city": "Al Nahda (Dubai)",
        "basecity": "Dubai",
        "link": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14429.589639720007!2d55.365055320575!3d25.290848691641003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5c6ec9f09411%3A0xd41f88b4dde53bbe!2sAl%20Nahda%20-%20Dubai!5e0!3m2!1sen!2sae!4v1653749072494!5m2!1sen!2sae",
        "description": "."
    },
    {
        "id": 95,
        "city": "Al Qusais (Dubai)",
        "basecity": "Dubai",
        "link": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28863.873736147856!2d55.36501304265299!3d25.271116367137704!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5c35d410acf3%3A0xe8aff9f4de65bf11!2sAl%20Qusais%20-%20Dubai!5e0!3m2!1sen!2sae!4v1653749007703!5m2!1sen!2sae",
        "description": "."
    },
    {
        "id": 103,
        "city": "Nad Al Hamar",
        "basecity": "Dubai",
        "link": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28881.05276850138!2d55.366174890560764!3d25.198784249329417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f673e96990457%3A0x355c83d6c5cb7352!2sNadd%20Al%20Hamar%20-%20Dubai!5e0!3m2!1sen!2sae!4v1768240880289!5m2!1sen!2sae",
        "description": "."
    },
    {
        "id": 89,
        "city": "Al Khawaneej (Dubai)",
        "basecity": "Dubai",
        "link": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57747.46767215088!2d55.479733140726054!3d25.229624223386995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ef58aed5ebcecd3%3A0x2117c7a0afa7b2cd!2sAl%20Khawaneej%20-%20Dubai!5e0!3m2!1sen!2sae!4v1653748711682!5m2!1sen!2sae",
        "description": "."
    },
    {
        "id": 102,
        "city": "Al Mizhar",
        "basecity": "Dubai",
        "link": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28870.40843124673!2d55.42675944065089!3d25.24362493316412!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5e2aca0f51f5%3A0x5a5c168356870513!2sAl%20Mizhar%20-%20Dubai!5e0!3m2!1sen!2sae!4v1768240536719!5m2!1sen!2sae",
        "description": "."
    },
    {
        "id": 57,
        "city": "Ras Al Khor (Dubai)",
        "basecity": "Dubai",
        "link": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28881.528928521606!2d55.32545489253182!3d25.196776619347247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f67bdb8a14db5%3A0xd5fbd3bdddf25fa7!2sRas%20Al%20Khor%20-%20Dubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sin!4v1640012351774!5m2!1sen!2sin",
        "description": "."
    },
    {
        "id": 27,
        "city": "Abu Hail (Dubai)",
        "basecity": "Dubai",
        "link": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3605.558799809508!2d55.449605514371065!3d25.35258198382413!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5958a1402379%3A0x58f876db49b01a88!2sHail%20%26%20zafran!5e0!3m2!1sen!2sin!4v1640016172798!5m2!1sen!2sin",
        "description": "."
    },
    {
        "id": 30,
        "city": "Hatta (Dubai)",
        "basecity": "Dubai",
        "link": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57949.810882878664!2d56.0936788879294!3d24.800138124920295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ef51f2c6823f777%3A0x206ef3bcec05f58c!2sHatta%20-%20Dubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sin!4v1640015924223!5m2!1sen!2sin",
        "description": "Hatta was formally an inland exclave of Oman, its Ownership was transferred to Dubai in the year 1850. It has places to empower women such as Dubai Women Association. Latifa hospital for children and women in Hatta provides good medical facilities for women and children from gynocology to pediatric surgery and many. Hatta Hospital is a multi-specialist hospital that has 123 beds and located in the heart of the Hatta."
    },
    {
        "id": 98,
        "city": "Al Aweer",
        "basecity": "Dubai",
        "link": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57774.98911409152!2d55.55534195!3d25.1716111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ef589bdaa4e46cf%3A0xf5f905dd11e6b3c1!2sAl%20Aweer%20-%20Dubai!5e0!3m2!1sen!2sae!4v1768240073516!5m2!1sen!2sae",
        "description": "."
    },
    {
        "id": 99,
        "city": "Dubai South",
        "basecity": "Dubai",
        "link": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115810.44671250484!2d55.0707514458285!3d24.895373448271044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f74ca30ae218f%3A0xb16f9af810b72e08!2sMadinat%20Al%20Mataar%20-%20Dubai%20South%20-%20Dubai!5e0!3m2!1sen!2sae!4v1768240164998!5m2!1sen!2sae",
        "description": "."
    },
    {
        "id": 111,
        "city": "Wadi Al Safa",
        "basecity": "Dubai",
        "link": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14452.938303657562!2d55.372408189969626!3d25.09391957545039!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f648ce53e8075%3A0x4ef91d170d84098!2sWadi%20Al%20Safa%205%20-%20Dubai!5e0!3m2!1sen!2sae!4v1768241347847!5m2!1sen!2sae",
        "description": "."
    },
    {
        "id": 110,
        "city": "Damac Hills",
        "basecity": "Dubai",
        "link": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14461.501130032606!2d55.24286283993359!3d25.02133523771871!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f71df3bb401b5%3A0xeb3df09d465b5c95!2sAl%20Hebiah%20Third%20-%20DAMAC%20Hills%20-%20Dubai!5e0!3m2!1sen!2sae!4v1768241268085!5m2!1sen!2sae",
        "description": "."
    },
    {
        "id": 109,
        "city": "Dubai Motor City",
        "basecity": "Dubai",
        "link": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14458.70456250483!2d55.22827143994535!3d25.04506248371146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6e6d9f798d95%3A0x5d8a318f70af8dea!2sAl%20Hebiah%20First%20-%20Dubai%20Motor%20City%20-%20Dubai!5e0!3m2!1sen!2sae!4v1768241224320!5m2!1sen!2sae",
        "description": "."
    },
    {
        "id": 108,
        "city": "Arabian Ranches",
        "basecity": "Dubai",
        "link": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28916.812487418098!2d55.25292544025809!3d25.04759230368548!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6fb6baf8cac9%3A0xe50b9eb0c7385be0!2sWadi%20Al%20Safa%206%20-%20Arabian%20Ranches%20-%20Dubai!5e0!3m2!1sen!2sae!4v1768241169383!5m2!1sen!2sae",
        "description": "."
    },
    {
        "id": 107,
        "city": "Discovery Gardens",
        "basecity": "Dubai",
        "link": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14459.515792616256!2d55.13439948994194!3d25.03818183487383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6cd623c3f253%3A0x1bdcdc11b4126442!2sJebel%20Ali%20Village%20-%20Discovery%20Gardens%20-%20Dubai!5e0!3m2!1sen!2sae!4v1768241109328!5m2!1sen!2sae",
        "description": "."
    },
    {
        "id": 105,
        "city": "Dubai International City",
        "basecity": "Dubai",
        "link": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28889.304959394558!2d55.38933244049092!3d25.163969411866393!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f614eb88deb71%3A0x1639bd9727e18e15!2sWarsan%20First%20-%20Dubai%20International%20City%20-%20Dubai!5e0!3m2!1sen!2sae!4v1768240998382!5m2!1sen!2sae",
        "description": "."
    },
    {
        "id": 104,
        "city": "Dubai Festival City",
        "basecity": "Dubai",
        "link": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28876.047867037934!2d55.337201140603135!3d25.219877341727756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f677ee7aee0fd%3A0x9ca6e961d7706272!2sDubai%20Festival%20City%20-%20Dubai!5e0!3m2!1sen!2sae!4v1768240950016!5m2!1sen!2sae",
        "description": "."
    },
    {
        "id": 101,
        "city": "Al Mankhool",
        "basecity": "Dubai",
        "link": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14434.56069176599!2d55.28426154004708!3d25.24904174913466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43222e37f797%3A0xf13f19b46d20ffea!2sAl%20Mankhool%20-%20Dubai!5e0!3m2!1sen!2sae!4v1768240406905!5m2!1sen!2sae",
        "description": "."
    },
    {
        "id": 112,
        "city": "Muhaisnah",
        "basecity": "Dubai",
        "link": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57732.58998333974!2d55.339765060661854!3d25.26093341573077!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5e6eec88ad19%3A0x9e8d60006398c39d!2sMuhaisnah%20-%20Dubai!5e0!3m2!1sen!2sae!4v1768241430773!5m2!1sen!2sae",
        "description": "."
    },
    {
        "id": 113,
        "city": "Muweileh",
        "basecity": "Dubai",
        "link": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3606.428424556314!2d55.46725061057722!3d25.3234009264848!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5f0021cb2967%3A0x27f237e9bc7f7a5f!2sMuwaileh!5e0!3m2!1sen!2sae!4v1768241472005!5m2!1sen!2sae",
        "description": "."
    },
    {
        "id": 114,
        "city": "Al Jafiliyah",
        "basecity": "Dubai",
        "link": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14435.843289321343!2d55.27677474004165!3d25.238244500970634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f42e17c106c2d%3A0x6c5691fca0f6126d!2sAl%20Jafiliya%20-%20Dubai!5e0!3m2!1sen!2sae!4v1768241517811!5m2!1sen!2sae",
        "description": "."
    },
    {
        "id": 250,
        "city": "Al Raffa",
        "basecity": "Dubai",
        "link": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14435.843289321343!2d55.27677474004165!3d25.238244500970634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f42e17c106c2d%3A0x6c5691fca0f6126d!2sAl%20Jafiliya%20-%20Dubai!5e0!3m2!1sen!2sae!4v1768241517811!5m2!1sen!2sae",
        "description": "."
    },
    {
        "id": 81,
        "city": "Oud Metha (Dubai)",
        "basecity": "Dubai",
        "link": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14435.712087385462!2d55.30272927055401!3d25.239349192023194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f42d258d31831%3A0xf10568f2b52e566e!2sOud%20Metha%20-%20Dubai!5e0!3m2!1sen!2sae!4v1653747266044!5m2!1sen!2sae",
        "description": "."
    },
    {
        "id": 15,
        "city": "Al Sufouh (Dubai)",
        "basecity": "Dubai",
        "link": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114828.64793224298!2d54.86883979250164!3d24.890725154679558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6b6b18e24261%3A0xd6770d4a34e796dd!2sAl%20Sufouh%20-%20Dubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sin!4v1640016883117!5m2!1sen!2sin",
        "description": "Al Sufouh is divided into two area. It contains famous university such as American University in Dubai, Oracle University, Murdoch University Dubai, Islamic Azad University, University of Wollongong in Dubai (UOWD), Middlesex University Dubai, University of Bradford Regional Hub Dubai, Strathclyde Business School Dubai, Hult International Business School Dubai, Abu Dhabi University Dubai Campus. Al sufouh has lots of villas, studio for rent available."
    },
    {
        "id": 251,
        "city": "Emirates Hills",
        "basecity": "Dubai",
        "link": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114828.64793224298!2d54.86883979250164!3d24.890725154679558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6b6b18e24261%3A0xd6770d4a34e796dd!2sAl%20Sufouh%20-%20Dubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sin!4v1640016883117!5m2!1sen!2sin",
        "description": "Al Sufouh is divided into two area. It contains famous university such as American University in Dubai, Oracle University, Murdoch University Dubai, Islamic Azad University, University of Wollongong in Dubai (UOWD), Middlesex University Dubai, University of Bradford Regional Hub Dubai, Strathclyde Business School Dubai, Hult International Business School Dubai, Abu Dhabi University Dubai Campus. Al sufouh has lots of villas, studio for rent available."
    },
    {
        "id": 252,
        "city": "Al Furjan",
        "basecity": "Dubai",
        "link": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114828.64793224298!2d54.86883979250164!3d24.890725154679558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6b6b18e24261%3A0xd6770d4a34e796dd!2sAl%20Sufouh%20-%20Dubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sin!4v1640016883117!5m2!1sen!2sin",
        "description": "Al Sufouh is divided into two area. It contains famous university such as American University in Dubai, Oracle University, Murdoch University Dubai, Islamic Azad University, University of Wollongong in Dubai (UOWD), Middlesex University Dubai, University of Bradford Regional Hub Dubai, Strathclyde Business School Dubai, Hult International Business School Dubai, Abu Dhabi University Dubai Campus. Al sufouh has lots of villas, studio for rent available."
    },
    {
        "id": 253,
        "city": "Al Barari",
        "basecity": "Dubai",
        "link": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114828.64793224298!2d54.86883979250164!3d24.890725154679558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6b6b18e24261%3A0xd6770d4a34e796dd!2sAl%20Sufouh%20-%20Dubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sin!4v1640016883117!5m2!1sen!2sin",
        "description": "Al Sufouh is divided into two area. It contains famous university such as American University in Dubai, Oracle University, Murdoch University Dubai, Islamic Azad University, University of Wollongong in Dubai (UOWD), Middlesex University Dubai, University of Bradford Regional Hub Dubai, Strathclyde Business School Dubai, Hult International Business School Dubai, Abu Dhabi University Dubai Campus. Al sufouh has lots of villas, studio for rent available."
    },
    {
        "id": 254,
        "city": "Bluewaters Island",
        "basecity": "Dubai",
        "link": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114828.64793224298!2d54.86883979250164!3d24.890725154679558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6b6b18e24261%3A0xd6770d4a34e796dd!2sAl%20Sufouh%20-%20Dubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sin!4v1640016883117!5m2!1sen!2sin",
        "description": "Al Sufouh is divided into two area. It contains famous university such as American University in Dubai, Oracle University, Murdoch University Dubai, Islamic Azad University, University of Wollongong in Dubai (UOWD), Middlesex University Dubai, University of Bradford Regional Hub Dubai, Strathclyde Business School Dubai, Hult International Business School Dubai, Abu Dhabi University Dubai Campus. Al sufouh has lots of villas, studio for rent available."
    },
    {
        "id": 255,
        "city": "Dubai Hills",
        "basecity": "Dubai",
        "link": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114828.64793224298!2d54.86883979250164!3d24.890725154679558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6b6b18e24261%3A0xd6770d4a34e796dd!2sAl%20Sufouh%20-%20Dubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sin!4v1640016883117!5m2!1sen!2sin",
        "description": "Al Sufouh is divided into two area. It contains famous university such as American University in Dubai, Oracle University, Murdoch University Dubai, Islamic Azad University, University of Wollongong in Dubai (UOWD), Middlesex University Dubai, University of Bradford Regional Hub Dubai, Strathclyde Business School Dubai, Hult International Business School Dubai, Abu Dhabi University Dubai Campus. Al sufouh has lots of villas, studio for rent available."
    },
    {
        "id": 85,
        "city": "Umm Suqeim (Dubai)",
        "basecity": "Dubai",
        "description": "."
    },
    {
        "id": 256,
        "city": "JBR",
        "basecity": "Dubai",
        "description": "."
    },
    {
        "id": 257,
        "city": "Jumeirah Village Circle",
        "basecity": "Dubai",
        "description": "."
    },
    {
        "id": 258,
        "city": "Jumeirah Park",
        "basecity": "Dubai",
        "description": "."
    },
    {
        "id": 259,
        "city": "Jumeirah Lake Towers",
        "basecity": "Dubai",
        "description": "."
    },
    {
        "id": 260,
        "city": "MBR City",
        "basecity": "Dubai",
        "description": "."
    },
    {
        "id": 261,
        "city": "Tilal Al Ghaf",
        "basecity": "Dubai",
        "description": "."
    },
    {
        "id": 262,
        "city": "Dubailand",
        "basecity": "Dubai",
        "description": "."
    },
    {
        "id": 263,
        "city": "Al Jaddaf",
        "basecity": "Dubai",
        "description": "."
    },
    {
        "id": 264,
        "city": "Dubai Creek Harbor",
        "basecity": "Dubai",
        "description": "."
    },
    {
        "id": 265,
        "city": "Al Bada",
        "basecity": "Dubai",
        "description": "."
    },
    {
        "id": 266,
        "city": "Al Satwa",
        "basecity": "Dubai",
        "description": "."
    },
    {
        "id": 267,
        "city": "Golf City",
        "basecity": "Dubai",
        "description": "."
    },
    {
        "id": 268,
        "city": "Al Warqa",
        "basecity": "Dubai",
        "description": "."
    },
    {
        "id": 269,
        "city": "Nad Al Sheba",
        "basecity": "Dubai",
        "description": "."
    },
    {
        "id": 270,
        "city": "Al Wasl",
        "basecity": "Dubai",
        "description": "."
    },
    {
        "id": 271,
        "city": "Trade Centre",
        "basecity": "Dubai",
        "description": "."
    },
    {
        "id": 272,
        "city": "Umm Ramool",
        "basecity": "Dubai",
        "description": "."
    },
    {
        "id": 273,
        "city": "Dubai Investment Park",
        "basecity": "Dubai",
        "description": "."
    },
    {
        "id": 274,
        "city": "Al Mamzar",
        "basecity": "Dubai",
        "description": "."
    },
    {
        "id": 275,
        "city": "Butina",
        "basecity": "Dubai",
        "description": "."
    },
    {
        "id": 276,
        "city": "Halwan",
        "basecity": "Dubai",
        "description": "."
    },
    {
        "id": 277,
        "city": "Industrial Area 6",
        "basecity": "Dubai",
        "description": "."
    },
    {
        "id": 278,
        "city": "Bu Shaghara",
        "basecity": "Dubai",
        "description": "."
    },
    {
        "id": 279,
        "city": "Al Ghafiya",
        "basecity": "Dubai",
        "description": "."
    },
    {
        "id": 280,
        "city": "Al Badee Suburb",
        "basecity": "Dubai",
        "description": "."
    },
    {
        "id": 281,
        "city": "Al Qulayya",
        "basecity": "Dubai",
        "description": "."
    },
    {
        "id": 282,
        "city": "Al Nuaimiah",
        "basecity": "Dubai",
        "description": "."
    },
    {
        "id": 283,
        "city": "Al Ghubaibah",
        "basecity": "Dubai",
        "description": "."
    },
    {
        "id": 284,
        "city": "Al Hamriyah",
        "basecity": "Dubai",
        "description": "."
    },
    {
        "id": 285,
        "city": "Al Rolla",
        "basecity": "Dubai",
        "description": "."
    },
    {
        "id": 286,
        "city": "Al Samnan",
        "basecity": "Dubai",
        "description": "."
    },
    {
        "id": 287,
        "city": "Al Majaz",
        "basecity": "Dubai",
        "description": "."
    },

];


function getPartsData() {

    for (let i = 0; i < partsData.length; i++) {
        const item = partsData[i];
        return item;
    }

    return null;
}

function getMakeImage(make, model) {
    try {
        const imagesMap = {};
        const result = [];

        for (let i = 0; i < CarData.length; i++) {
            const item = CarData[i];

            if (
                item.make &&
                item.model &&
                item.make.toLowerCase() === make.toLowerCase() &&
                item.model.toLowerCase() === model.toLowerCase()
            ) {
                if (item.img && !imagesMap[item.img]) {
                    imagesMap[item.img] = true;
                    result.push(item.img);
                }
            }
        }

        return result;
    } catch (e) {
        console.error("Error loading image:", e.message);
        return [];
    }
}

function getPartsByCategory(category) {
    try {
        if (!category) return [];

        const result = [];

        for (let i = 0; i < partsData.length; i++) {
            const item = partsData[i];

            if (
                item.category &&
                item.category.toLowerCase() === category.toLowerCase()
            ) {
                result.push(item);
            }
        }

        return result;
    } catch (error) {
        console.error("Error filtering parts by category:", error);
        return [];
    }
}
function getPartImage(subcategory) {
    try {
        if (!subcategory) return null;

        for (let i = 0; i < partsData.length; i++) {
            const item = partsData[i];

            if (
                item.parts &&
                item.parts.toLowerCase() === subcategory.toLowerCase()
            ) {
                return item.img || null;
            }
        }

        return null;
    } catch (e) {
        console.error("Error loading image:", e.message);
        return null;
    }
}


export function generateStaticParams() {
    try {
        const unique = new Set();
        const params = [];
        const stats = {
            totalProducts: productsFile.length,
            totalPages: 0,
            byMake: {},
            byCategory: {},
            selectedPartsPages: 0,
        };

        // First, generate params from existing products
        for (const product of productsFile) {
            if (!product || !product.compatibility) continue;

            const category = product.category?.trim();  // Keep original format
            const subcategory = product.subcategory?.trim();  // Keep original format

            if (!category || !subcategory) continue;

            for (const fit of product.compatibility) {
                const make = fit.make?.trim();
                const model = fit.model?.trim();

                if (!make || !model || excludedMakesSet.has(make)) continue;

                const key = `${make}|${model}|${category}|${subcategory}`;

                // Only generate unique combinations
                if (!unique.has(key)) {
                    unique.add(key);

                    params.push({
                        make: make,
                        model: model,
                        category: category,
                        subcategory: subcategory,
                    });

                    stats.byMake[make] = (stats.byMake[make] || 0) + 1;
                    stats.byCategory[category] = (stats.byCategory[category] || 0) + 1;
                }
            }
        }

        for (const selectedPart of selectedParts) {
            const partEntry = partsData.find(
                p => p.parts.toLowerCase() === selectedPart.toLowerCase()
            );

            if (!partEntry) continue;

            const category = partEntry.category?.trim();
            const subcategory = partEntry.parts?.trim();

            // Get all unique make/model combinations from CarData
            for (const car of CarData) {
                const make = car.make?.trim();
                const model = car.model?.trim();

                if (!make || !model || excludedMakesSet.has(make)) continue;

                const key = `${make}|${model}|${category}|${subcategory}`;

                // Only add if not already generated from products
                if (!unique.has(key)) {
                    unique.add(key);

                    params.push({
                        make: make,
                        model: model,
                        category: category,
                        subcategory: subcategory,
                    });

                    // Track stats for selected parts
                    stats.selectedPartsPages++;
                    stats.byMake[make] = (stats.byMake[make] || 0) + 1;
                    stats.byCategory[category] = (stats.byCategory[category] || 0) + 1;
                }
            }
        }

        stats.totalPages = params.length;
        console.log(partsData.length);
        console.log(`
📊 Subcategory Pages Generation:
   Total Products: ${stats.totalProducts}
   Total Pages: ${stats.totalPages}
   Selected Parts Pages: ${stats.selectedPartsPages}
   
   Top Makes:
${Object.entries(stats.byMake)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 5)
                .map(([make, count]) => `     ${make}: ${count} pages`)
                .join('\n')}
   
   Top Categories:
${Object.entries(stats.byCategory)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 5)
                .map(([cat, count]) => `     ${cat}: ${count} pages`)
                .join('\n')}
        `);

        return params;
    } catch (error) {
        console.error("Error generating static params:", error);
        return [];
    }
}



export function generateMetadata({ params }) {
    const make = decodeURIComponent(params.make);
    const model = decodeURIComponent(params.model);
    const category = decodeURIComponent(params.category);
    const subcategory = decodeURIComponent(params.subcategory);
    const partImage = getPartImage(subcategory)
    const imageMake = getMakeImage(make, model);

    // Products filtered only by make
    const productsForMake = productsFile.filter((p) =>
        p.compatibility?.some(
            (c) => c.make?.toLowerCase() === make.toLowerCase()
        )
    );


    const productListItems = productsForMake.length > 0 ? productsForMake.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
            "@type": "Product",
            "@id": `https://emirates-car.com/search-by-make/${make}/${product.category}/${product.subcategory}/${product.partname}-${product.partnumber}-${product.id}#product`,
            "name": `${product.partname} ${product.partnumber} ${make}`,
            "url": `https://www.emirates-car.com/search-by-make/${make}/${model}/${product.category}/${product.subcategory}/${product.partname}-${product.partnumber}-${product.id}`,
            "image": `https://www.emirates-car.com${product.image}`,
            "description": `${product.partname} compatible with ${make}`,
            "brand": { "@type": "Brand", name: product.compatibility?.[0]?.make || make },
            "mpn": product.partnumber,
            "offers": {
                "@type": "Offer",
                "priceCurrency": product.pricing.currency,
                "price": product.pricing.price,
                "availability": "https://schema.org/InStock",
                "itemCondition": "https://schema.org/NewCondition",
            },
        },
    })) : [];

    const faqSchema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "CollectionPage",
                "name": `${make} ${model} ${subcategory} | EMIRATESCAR`,
                "url": `https://www.emirates-car.com/search-by-make/${make}/${model}/${category}/${subcategory}`,
                "mainEntity": {
                    "@type": "ItemList",
                    "itemListElement": productListItems,
                },
            },
            {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Home",
                        "item": "https://www.emirates-car.com/"
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "Car Makes",
                        "item": `https://www.emirates-car.com/search-by-make/`
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "name": `${make} Spare Parts`,
                        "item": `https://www.emirates-car.com/search-by-make/${encodeURIComponent(make)}`
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "name": `${make} ${model} Spare Parts`,
                        "item": `https://www.emirates-car.com/search-by-make/${encodeURIComponent(make)}/${encodeURIComponent(model)}`
                    },
                    {
                        "@type": "ListItem",
                        "position": 4,
                        "name": `${make} ${model} ${category} Spare Parts`,
                        "item": `https://www.emirates-car.com/search-by-make/${encodeURIComponent(make)}/${encodeURIComponent(model)}/${encodeURIComponent(category)}`
                    },
                    {
                        "@type": "ListItem",
                        "position": 4,
                        "name": `${make} ${model} ${subcategory} Spare Parts`,
                        "item": `https://www.emirates-car.com/search-by-make/${encodeURIComponent(make)}/${encodeURIComponent(model)}/${encodeURIComponent(category)}/${encodeURIComponent(subcategory)}`
                    }
                ]
            },
        ],
    };

    return {
        title: `${make} ${model} ${subcategory} | Genuine & Used Parts UAE`,
        description: `Buy ${subcategory} for ${make} ${model}. New, used & aftermarket parts with fast UAE delivery.`,
        openGraph: {
            title: `${make} ${model} ${subcategory} Parts`,
            description: `Order ${subcategory} for ${make} ${model} in UAE.`,
            images: [
                `https://www.emirates-car.com/img/car-logos/${imageMake?.[0] || "default.png"}`,
            ],
            url: `https://www.emirates-car.com/search-by-make/${make}/${model}/${category}/${subcategory}`,
            siteName: "EMIRATESCAR",
        },
        alternates: {
            canonical: `https://www.emirates-car.com/search-by-make/${make}/${model}/${category}/${subcategory}`,
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
        other: {
            "script:ld+json": JSON.stringify(faqSchema),
        },
    };
}

function getMake() {
    const uniqueMakes = {};
    for (let i = 0; i < CarData.length; i++) {
        const car = CarData[i];
        if (!uniqueMakes[car.make]) {
            uniqueMakes[car.make] = car;
        }
    }
    return Object.values(uniqueMakes);
}


function getModel(make) {
    try {
        const decodedMake = decodeURIComponent(make);
        const seenModels = {};
        const result = [];

        for (let i = 0; i < CarData.length; i++) {
            const item = CarData[i];

            if (!item.make || !item.model) continue;

            if (item.make === decodedMake) {
                if (!seenModels[item.model]) {
                    seenModels[item.model] = true;
                    result.push(item);
                }
            }
        }

        return result;
    } catch (error) {
        console.error("Error reading model data:", error.message);
        return [];
    }
}


export default function SubcategoryPage({ params, searchParams }) {
    const make = decodeURIComponent(params.make);
    const model = decodeURIComponent(params.model);
    const category = decodeURIComponent(params.category);
    const subcategory = decodeURIComponent(params.subcategory);
    const partImage = getPartImage(subcategory)
    const partsposts = partsData;
    const makeArray = getMake();
    const imageMake = getMakeImage(make, model);
    const modelsform = CarData;
    const cities = CitiesData;
    const relatedCategories = getPartsByCategory(category, subcategory)
    const carmodel = getModel(make);
    const genericParts = partsData;
    //lets check if this part is in the selectedParts

    const isSelectedPart = selectedParts.some(
        p => p.toLowerCase() === subcategory.toLowerCase()
    );

    const matchingProducts = productsFile.filter(product => {
        if (product.category !== category || product.subcategory !== subcategory) {
            return false;
        }

        // Check if this product fits this make/model
        return product.compatibility?.some(
            compat => compat.make === make && compat.model === model
        );
    });

    // If no products found, show 404
    if (!isSelectedPart && matchingProducts.length === 0) {
        notFound();
    }

    const normalize = (v) =>
        v?.toString().toLowerCase().trim().replace(/\s+/g, " ") || "";


    const productMatches = productsFile.filter((p) => {
        const matchesMakeModel = p.compatibility?.some(
            (c) =>
                normalize(c.make) === normalize(make) &&
                normalize(c.model) === normalize(model)
        );

        return (
            matchesMakeModel &&
            normalize(p.category) === normalize(category) &&
            normalize(p.subcategory) === normalize(subcategory)
        );
    });


    const genericMatch = genericParts.find(
        (gp) =>
            normalize(gp.parts) === normalize(subcategory) &&
            normalize(gp.category) === normalize(category)
    );

    const finalData = productMatches.length > 0 ? productMatches : genericMatch ? [genericMatch] : [];
    const hasExactMatch = productMatches.length > 0;
    const hasAnyData = finalData.length > 0;

    const isBattery = decodeURIComponent(subcategory) === 'Battery'


    return (<>

        {!hasExactMatch && (
            <div className="p-6 max-w-6xl mx-auto">
                <div className="flex items-center mt-10 xs:pt-5 s:pt-5">
                    <div>
                        <div className="mx-auto xs:ml-1 xxs:ml-4 xxs:mt-8 xs:px-5 sm:ml-6 lg:ml-1 xl:ml-20 sm:mx-auto mt-10 sm:mt-12 md:mt-10 lg:mt-20 lg:px-8 xl:mt-28 xs:mt-2 xs:text-left s:mt-2">
                            <h1 className={`mt-3 text-5xl lg:text-4xl sm:text-lg xs:text-xl xxs:text-xl md:text-xl font-head font-extrabold ${playfair_display.className}`}>
                                {decodeURIComponent(subcategory) === 'Battery' ? (<>{make} {model} <span className="flex items-center whitespace-nowrap"> Battery Replacement Serivces in UAE - Dubai & Sharjah <a href="#myBatteryForm"><LinkIcon className="text-blue-500 h-16 w-16" /></a></span></>) : (<>{make} {model} <span className="text-blue-500">{subcategory.replace(/-/g, " ")}</span> - Genuine & Aftermarket in UAE <a href="#myBatteryForm"><LinkIcon className="text-blue-500 h-16 w-16" /></a></>)}
                            </h1>
                        </div>
                    </div>
                </div>
                <div className=" mt-10 xs:pt-5 s:pt-5">
                    {isBattery ? (<>
                        <div className={`text-xl font-sans text-gray-700 mx-auto xs:text-lg xl:text-lg xxs:text-lg ${firaSans.className}`}>
                            Car Battery Replacement in Dubai and Sharjah made easy at Home, Office and at any spot. We ensure a safer disposal of battery is done.
                            You just have to submit your inquiry in the form below, our team will get back to you soon. Either you search for <span className="font-bold">"{make} {model} battery replacement in dubai"</span> or <span className="font-bold">"{make} {model} battery replacement in sharjah"</span> or <span className="font-bold">"{make} {model} battery replacement near me"</span>, we are your final destination. We will take you through the journey further.
                        </div>

                    </>) : (<><p className={`text-xl py-4 font-sans text-gray-700 mx-auto xs:text-lg xl:text-lg xxs:text-lg ${firaSans.className}`}>
                        If you are looking for {make} {model} {subcategory}, submit your inquiry below, Our team will get back to you through whatsapp based on stock availability
                    </p></>)}

                </div>

                {isBattery ? (<> <div className="grid grid-cols-2 xs:grid-cols-1 xxs:grid-cols-1 mx-auto xl:px-10 xs:px-3 xxs:px-4 md:px-5 lg:px-6 mt-5 border-2 p-5 rounded-sm">
                    <div className='mt-20 xs:mt-5 xxs:mt-5 sm:mt-5 md:mt-5 lg:mt-10'>
                        <h2 className={`flex items-center font-bold text-3xl mt-3 xs:text-2xl ${playfair_display.className}`}>
                            {make} {model} Car Battery Replacement Services in Dubai & Sharjah <span><a href="#myBatteryForm"><LinkIcon className="text-blue-500 h-12 w-12 md:hidden lg:hidden xxl:hidden xl:hidden xs:h-5 xxs:h-5" /></a></span>
                        </h2>
                        <ul className='space-y-3 mt-5'>
                            <li className="flex items-start gap-3">
                                <Clock className={`w-5 h-5 text-blue-600 flex-shrink-0 mt-1 ${firaSans.className}`} />
                                <span>24/7 emergency car battery replacement services available round the clock</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Car className={`w-5 h-5 text-red-600 flex-shrink-0 mt-1 ${firaSans.className}`} />
                                <span>On-site car battery replacement at your location for maximum convenience</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin className={`w-5 h-5 text-black flex-shrink-0 mt-1 ${firaSans.className}`} />
                                <span>Services available across Dubai and Sharjah with quick response times</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <BadgeCheck className={`w-5 h-5 text-yellow-400 flex-shrink-0 mt-1 ${firaSans.className}`} />
                                <span>Instant professional installation by certified technicians</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Recycle className={`w-5 h-5 text-green-600 flex-shrink-0 mt-1 ${firaSans.className}`} />
                                <span>Safe old Battery Disposal</span>
                            </li>
                        </ul>
                    </div>
                    <div><FormBattery formsData={modelsform} /></div>
                </div></>) : (<><div className='sm:max-w-xl lg:max-w-2xl md:max-w-xl xl:max-w-2xl xxl:max-w-2xl mx-auto xs:mx-3 xxs:mx-3 sm:mx-5'>
                    <FormMakeModel formsData={modelsform} mke={make} modl={model} />
                </div></>)}

                <div className="mt-10 xs:pt-5 s:pt-5">
                    {isBattery ? (<><h2 className={`text-4xl md:text-2xl lg:text-3xl font-semibold xs:text-2xl xxs:text-2xl py-5 ${playfair_display.className}`}>
                        {make} {model} Battery Issues
                    </h2>
                        <p className={`text-xl font-sans text-gray-700 mx-auto xs:text-lg xl:text-lg xxs:text-lg ${firaSans.className}`}>
                            To find if your battery need to be changed in easy steps, you can see the light dimming. The car battery need to be changed every 4 years. Battery is essential to start the starter motor which in turn starts the engine through spark Plug. To have a long battery life, the advice is to have long rides instead of small frequent rides. To maintain your battery from corroding, you may use distilled water to clean it very often.
                        </p></>) : (<></>)}
                </div>

                {isBattery ? (<><section>
                    <h2 className={`font-bold text-3xl text-center xs:text-2xl my-3 ${playfair_display.className}`}>
                        <span className='text-blue-600'>{make} {model} {subcategory}</span> Replacement Services Anywhere in Dubai and Sharjah
                    </h2>
                    <ul className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-5 mx-10 md:mx-4 sm:mx-3 xs:grid xs:grid-cols-2 sm:grid sm:grid-cols-3 xxs:grid xxs:grid-cols-2 s:grid s:grid-cols-3 gap-1 xs:mx-4 s:mx-4 xxs:mx-4 md:ml-11 my-10 pb-10 font-sans">
                        {subCityBattery.map((city) => (
                            <li key={city.id} className="border rounded-md overflow-hidden bg-white shadow hover:shadow-lg transition-shadow h-full flex flex-col">
                                <Link href={`/car-battery-replacement-services-in-uae`} target="_blank"
                                    title={`${make} ${model} ${subcategory} ${city.city}`}>
                                    <div className={`flex flex-1 text-center m-1 text-sm xl:text-xl xxl:text-xl font-medium font-sans rounded-sm w-max ${firaSans.className}  rounded-sm`}>
                                        <MapPin size={32} color="darkblue" />  {city.city}
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section></>) : (<></>)}

                <section className="mt-10 shadow-sm mx-4 md:mx-4 lg:max-w-4xl lg:mx-auto xl:mx-10 bg-bglight px-20 xs:px-3 xxs:px-3">
                    <div className="container py-6">
                        <h2 className={`font-bold text-center text-3xl xs:text-2xl my-3 ${playfair_display.className}`}>
                            Search <span className='text-blue-600'>{subcategory}</span> for All {make} Models
                        </h2>
                        <SearchModel make={make} subcategory={subcategory} car={carmodel} />

                        <ul className="grid grid-cols-4 md:grid-cols-3 sm:grid-cols-4 xs:grid-cols-2 xxs:grid-cols-3 gap-3 xs:gap-1 mt-10">
                            {carmodel.map((post, i) => {
                                const isBatterySubcategory = decodeURIComponent(subcategory).toLowerCase() === 'battery';

                                const hasBatteryCompatibility = productsFile.some((product) =>
                                    product.subcategory.toLowerCase() === 'battery' &&
                                    product.compatibility?.some((c) =>
                                        c.make.toLowerCase() === post.make.toLowerCase() &&
                                        c.model.toLowerCase() === post.model.toLowerCase()
                                    )
                                );
                                const isBattery = isBatterySubcategory || hasBatteryCompatibility;

                                let linkHref, linkAs;
                                if (isBattery) {
                                    linkHref = '/car-battery-replacement-services-in-uae'
                                    linkAs = '/car-battery-replacement-services-in-uae'
                                } else if (excludedMakesSet.has(post.make)) {
                                    linkHref = '/get-in-touch'
                                    linkAs = '/get-in-touch'
                                } else {
                                    linkHref = '/search-by-make/[make]/[model]/[category]/[subcategory]#myBatteryForm'
                                    linkAs = `/search-by-make/${post.make}/${encodeURIComponent(post.model)}/${category}/${subcategory}#myBatteryForm`
                                }
                                return (
                                    <li key={i} className="h-full">
                                        <Link
                                            href={linkHref}
                                            as={linkAs}
                                            title={`${post.make} ${post.model} ${subcategory}`}
                                            target="_blank"
                                            className="block border border-blue-800 hover:border-blue-900 bg-white rounded-sm h-full p-3 text-center"
                                        >
                                            <span className="text-center text-black text-lg font-medium hover:text-gray-800 p-2 xs:p-0 font-sans underline ">
                                                {post.make} {post.model.replace('%2F', '/')}<span className="text-blue-600"> {isBattery ? "Battery replacement services in UAE" : decodeURIComponent(subcategory)}</span>
                                            </span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </section>
                <section>
                    <h2 className={`font-bold text-center text-3xl xs:text-2xl my-3 ${playfair_display.className}`}>
                        Search All spare parts for <span className='text-blue-600'>{make} {model}</span>
                    </h2>
                    <SearchMakeModelParts partsposts={partsposts} make={make} model={model} category={category} />


                    <ul className="grid grid-cols-4 md:grid-cols-3 sm:grid-cols-4 xs:grid-cols-2 xxs:grid-cols-3 gap-3 xs:gap-1 mt-10">
                        {partsposts.map((post, i) => {
                            return (
                                <li key={i} className="h-full">

                                    <span className="text-center text-black text-lg font-medium hover:text-gray-800 p-2 xs:p-0 font-sans underline ">
                                        {make} {model} <span className="text-blue-500">{post.parts}</span>
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                </section>

                <section
                    aria-labelledby={`all-${make}-${model}-${subcategory}-brands`}
                    className="mt-10 shadow-sm mx-4 md:mx-4 lg:max-w-4xl lg:mx-auto xl:mx-10 bg-bglight px-5 md:px-20 lg:px-10"
                >
                    <h2
                        id={`all-${make}-brands`}
                        className={`text-4xl text-center md:text-3xl lg:text-3xl xs:text-2xl xxs:text-2xl font-semibold py-5 ${playfair_display.className}`}
                    >
                        {subcategory === 'Battery' ?
                            <> Search <span className="text-blue-500">{subcategory}</span> for Any Models
                            </> : <>Search <span className="text-blue-500">{subcategory}</span> for Any Models - Used, Genuine & Aftermarket
                            </>}
                    </h2>

                    <ul className="grid grid-cols-4 md:grid-cols-3 xs:grid-cols-1 xxs:grid-cols-1 sm:grid-cols-2 xs:gap-1 xxs:gap-1 sm:gap-1 gap-4 my-10">

                        {makeArray.map((p, i) => {

                            let linkHref, linkAs;
                            if (isBattery) {
                                linkHref = '/car-battery-replacement-services-in-uae'
                                linkAs = '/car-battery-replacement-services-in-uae'
                            } else if (excludedMakesSet.has(p.make)) {
                                linkHref = '/get-in-touch'
                                linkAs = '/get-in-touch'
                            } else {
                                linkHref = '/search-by-make/[make]/parts/[subcategory]'
                                linkAs = `/search-by-make/${encodeURIComponent(p.make)}/parts/${encodeURIComponent(subcategory)}`
                            }

                            return (

                                <li key={i} className="list-none">
                                    <Link
                                        href={linkHref}
                                        as={linkAs}
                                        title={`${p.make} ${subcategory}`}
                                        target="_blank"
                                        className="flex flex-col items-center justify-center border hover:border-blue-600 p-3 rounded-sm bg-white"
                                    >
                                        <Image
                                            alt={`${p.make}`}
                                            src={`/img/car-logos/${p.img}`}
                                            height={90}
                                            width={90}
                                            className="object-contain"
                                            priority
                                        />
                                        <span className={`mt-2 px-3 py-1 text-sm md:text-xs xl:text-2xl xxl:text-lg font-medium font-sans text-white bg-blue-600 rounded-sm hover:bg-blue-700 text-center w-max ${firaSans.className}`}>
                                            {p.make} {subcategory}
                                        </span>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </section>
                <section className="mt-10 shadow-sm mx-4 lg:max-w-4xl lg:mx-auto xl:mx-10 bg-bglight px-20 xs:px-3 xxs:px-3">
                    <div className="container py-6">

                        <h2 className={`font-bold text-center text-3xl xs:text-2xl my-3 ${playfair_display.className}`}>
                            Similar {category} Parts Categories for {make} {model}
                        </h2>

                        <ul className="grid grid-cols-4 md:grid-cols-3 sm:grid-cols-4 xs:grid-cols-2 xxs:grid-cols-3 gap-3 xs:gap-1 mt-10">

                            {relatedCategories.map((item, i) => (

                                <li key={i} className="h-full">
                                    <Link
                                        href={`/search-by-make/${make}/${encodeURIComponent(model)}/${encodeURIComponent(item.category)}`}
                                        title={`${make} ${model} ${item.category}`}
                                        target="_blank"
                                        className="block border border-blue-800 hover:border-blue-900 bg-white rounded-sm h-full p-3 text-center"
                                    >
                                        <span className="text-center text-black text-lg font-medium hover:text-gray-800 p-2 xs:p-0 font-sans underline">
                                            {make} {model} <span className="text-blue-500">{item.parts}</span>
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>

                    </div>
                </section>
                {isBattery ? (<></>) : (<><section>
                    <h2 className={`font-bold text-3xl text-center xs:text-2xl my-3 ${playfair_display.className}`}>
                        Search <span className='text-blue-600'>{make} {model} {subcategory}</span> Anywhere in UAE
                    </h2>
                    <SearchCity cities={cities} />
                    <ul className="grid grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-2 xxs:grid-cols-2 gap-4 xs:gap-2 xxs:gap-2 mt-10">
                        {subCity.map((city) => (
                            <li key={city.id} className="border rounded-md overflow-hidden bg-white shadow hover:shadow-lg transition-shadow h-full flex flex-col">
                                <Link href={`/search-by-brands-in-uae/${encodeURIComponent(make)}/${encodeURIComponent(city.city)}`} target="_blank"
                                    title={`${make} ${model} ${subcategory} dubai`}>
                                    <div className="p-3 flex-1 flex flex-col">
                                        <h3 className="text-lg font-semibold mb-2 underline text-center">{make} {model} {subcategory} <span className="text-blue-500">{city.city}</span></h3>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section></>)}

            </div>
        )}
        {hasExactMatch &&
            (<div className="p-6 xs:p-3 xxs:p-3 s:p-3 sm:p-4 max-w-6xl mx-auto">

                <div className="flex items-center mt-10 xs:pt-5 s:pt-5">
                    <div>
                        <div className="mx-auto xs:ml-1 xxs:ml-4 xxs:mt-8 xs:px-5 sm:ml-6 lg:ml-1 xl:ml-20 sm:mx-auto mt-10 sm:mt-12 md:mt-10 lg:mt-20 lg:px-8 xl:mt-28 xs:mt-2 xs:text-left s:mt-2">
                            <h1 className={`mt-3 text-5xl lg:text-4xl sm:text-lg xs:text-xl xxs:text-xl md:text-xl font-head font-extrabold ${playfair_display.className}`}>
                                {decodeURIComponent(subcategory) === 'Battery' ? (<>{make} {model} <span className="flex items-center whitespace-nowrap"> Battery Replacement Serivces in UAE - Dubai & Sharjah <a href="#myBatteryForm"><LinkIcon className="text-blue-500 h-16 w-16" /></a></span></>) : (<>{make} {model} <span className="text-blue-500">{subcategory.replace(/-/g, " ")}</span> - Genuine & Aftermarket in UAE</>)}
                            </h1>
                        </div>
                    </div>
                </div>
                <div className=" mt-10 xs:pt-5 s:pt-5">
                    {isBattery ? (<>
                        <p className={`text-xl font-sans text-gray-700 mx-auto xs:text-lg xl:text-lg xxs:text-lg ${firaSans.className}`}>
                            Car Battery Replacement in Dubai and Sharjah made easy at Home, Office and at any spot. We ensure a safer disposal of battery is done.
                            You just have to submit your inquiry in the form below, our team will get back to you soon. Either you search for <span className="font-bold">"{make} {model} battery replacement in dubai"</span> or <span className="font-bold">"{make} {model} battery replacement in sharjah"</span> or <span className="font-bold">"{make} {model} battery replacement near me"</span>, we are your final destination. We will take you through the journey further.
                        </p>

                    </>) : (<></>)}

                </div>
                {isBattery ? (<> <div className="grid grid-cols-2 xs:grid-cols-1 xxs:grid-cols-1 mx-auto xl:px-10 xs:px-3 xxs:px-4 md:px-5 lg:px-6 mt-5 border-2 p-5 rounded-sm">
                    <div className='mt-20 xs:mt-5 xxs:mt-5 sm:mt-5 md:mt-5 lg:mt-10'>
                        <h2 className={`flex items-center font-bold text-3xl mt-3 xs:text-2xl ${playfair_display.className}`}>
                            {make} {model} Car Battery Replacement Services in Dubai & Sharjah <span><a href="#myBatteryForm"><LinkIcon className="text-blue-500 h-12 w-12 md:hidden lg:hidden xxl:hidden xl:hidden xs:h-5 xxs:h-5" /></a></span>
                        </h2>
                        <ul className='space-y-3 mt-5'>
                            <li className="flex items-start gap-3">
                                <Clock className={`w-5 h-5 text-blue-600 flex-shrink-0 mt-1 ${firaSans.className}`} />
                                <span>24/7 emergency car battery replacement services available round the clock</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Car className={`w-5 h-5 text-red-600 flex-shrink-0 mt-1 ${firaSans.className}`} />
                                <span>On-site car battery replacement at your location for maximum convenience</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin className={`w-5 h-5 text-black flex-shrink-0 mt-1 ${firaSans.className}`} />
                                <span>Services available across Dubai and Sharjah with quick response times</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <BadgeCheck className={`w-5 h-5 text-yellow-400 flex-shrink-0 mt-1 ${firaSans.className}`} />
                                <span>Instant professional installation by certified technicians</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Recycle className={`w-5 h-5 text-green-600 flex-shrink-0 mt-1 ${firaSans.className}`} />
                                <span>Safe old Battery Disposal</span>
                            </li>
                        </ul>
                    </div>
                    <div><FormBattery formsData={modelsform} /></div>
                </div></>) : (<><div className='sm:max-w-xl lg:max-w-2xl md:max-w-xl xl:max-w-2xl xxl:max-w-2xl mx-auto xs:mx-3 xxs:mx-3 sm:mx-5'>
                    <FormMakeModel formsData={modelsform} mke={make} modl={model} />
                </div></>)}

                <div className="mt-10 xs:pt-5 s:pt-5">
                    {isBattery ? (<><h2 className={`text-4xl md:text-2xl lg:text-3xl font-semibold xs:text-2xl xxs:text-2xl py-5 ${playfair_display.className}`}>
                        {make} {model} Battery Issues
                    </h2>
                        <p className={`text-xl font-sans text-gray-700 mx-auto xs:text-lg xl:text-lg xxs:text-lg ${firaSans.className}`}>
                            To find if your battery need to be changed in easy steps, you can see the light dimming. The car battery need to be changed every 4 years. Battery is essential to start the starter motor which in turn starts the engine through spark Plug. To have a long battery life, the advice is to have long rides instead of small frequent rides. To maintain your battery from corroding, you may use distilled water to clean it very often.
                        </p></>) : (<></>)}
                </div>


                {isBattery ? (<><section>
                    <h2 className={`font-bold text-3xl text-center xs:text-2xl my-3 ${playfair_display.className}`}>
                        <span className='text-blue-600'>{make} {model} {subcategory}</span> Replacement Services Anywhere in Dubai and Sharjah
                    </h2>
                    <ul className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-5 mx-10 md:mx-4 sm:mx-3 xs:grid xs:grid-cols-2 sm:grid sm:grid-cols-3 xxs:grid xxs:grid-cols-2 s:grid s:grid-cols-3 gap-1 xs:mx-4 s:mx-4 xxs:mx-4 md:ml-11 my-10 pb-10 font-sans">
                        {subCityBattery.map((city) => (
                            <li key={city.id} className="border rounded-md overflow-hidden bg-white shadow hover:shadow-lg transition-shadow h-full flex flex-col">
                                <Link href={`/car-battery-replacement-services-in-uae`} target="_blank"
                                    title={`${make} ${model} ${subcategory} ${city.city}`}>
                                    <div className={`flex flex-1 text-center m-1 text-sm xl:text-xl xxl:text-xl font-medium font-sans rounded-sm w-max ${firaSans.className}  rounded-sm`}>
                                        <MapPin size={32} color="darkblue" />  {city.city}
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section></>) : (<></>)}

                {productMatches.length > 0 && (
                    <Product
                        make={make}
                        model={model}
                        subcategory={subcategory}
                        products={productMatches}
                        allProducts={productMatches}
                    />
                )}

                <section className="mt-10 shadow-sm mx-4 md:mx-4 lg:max-w-4xl lg:mx-auto xl:mx-10 bg-bglight px-20 xs:px-3 xxs:px-3">
                    <div className="container py-6">
                        <h2 className={`font-bold text-center text-3xl xs:text-2xl my-3 ${playfair_display.className}`}>
                            Search <span className='text-blue-600'>{subcategory}</span> for All {make} Models
                        </h2>
                        <SearchModel make={make} subcategory={subcategory} car={carmodel} />

                        <ul className="grid grid-cols-4 md:grid-cols-3 sm:grid-cols-4 xs:grid-cols-2 xxs:grid-cols-3 gap-3 xs:gap-1 mt-10">
                            {carmodel.map((post, i) => {
                                const isBatterySubcategory = decodeURIComponent(subcategory).toLowerCase() === 'battery';

                                const hasBatteryCompatibility = productsFile.some((product) =>
                                    product.subcategory.toLowerCase() === 'battery' &&
                                    product.compatibility?.some((c) =>
                                        c.make.toLowerCase() === post.make.toLowerCase() &&
                                        c.model.toLowerCase() === post.model.toLowerCase()
                                    )
                                );
                                const isBattery = isBatterySubcategory || hasBatteryCompatibility;

                                let linkHref, linkAs;
                                if (isBattery) {
                                    linkHref = '/car-battery-replacement-services-in-uae'
                                    linkAs = '/car-battery-replacement-services-in-uae'
                                } else if (excludedMakesSet.has(post.make)) {
                                    linkHref = '/get-in-touch'
                                    linkAs = '/get-in-touch'
                                } else {
                                    linkHref = '/search-by-make/[make]/[model]/[category]/[subcategory]#myBatteryForm'
                                    linkAs = `/search-by-make/${post.make}/${encodeURIComponent(post.model)}/${category}/${subcategory}#myBatteryForm`
                                }
                                return (
                                    <li key={i} className="h-full">
                                        <Link
                                            href={linkHref}
                                            as={linkAs}
                                            target="_blank"
                                            title={`${post.make} ${post.model} ${subcategory}`}
                                            className="block border border-blue-800 hover:border-blue-900 bg-white rounded-sm h-full p-3 text-center"
                                        >
                                            <span className="text-center text-black text-lg font-medium hover:text-gray-800 p-2 xs:p-0 font-sans underline ">
                                                {post.make} {post.model.replace('%2F', '/')}<span className="text-blue-600"> {isBattery ? "Battery replacement services in UAE" : decodeURIComponent(subcategory)}</span>
                                            </span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </section>
                <section
                    aria-labelledby={`all-${make}-${model}-${subcategory}-brands`}
                    className="mt-10 shadow-sm mx-4 md:mx-4 lg:max-w-4xl lg:mx-auto xl:mx-10 bg-bglight px-5 md:px-20 lg:px-10"
                >
                    <h2
                        id={`all-${make}-brands`}
                        className={`text-4xl text-center md:text-3xl lg:text-3xl xs:text-2xl xxs:text-2xl font-semibold py-5 ${playfair_display.className}`}
                    >
                        {subcategory === 'Battery' ?
                            <> Search <span className="text-blue-500">{subcategory}</span> for Any Models
                            </> : <>Search <span className="text-blue-500">{subcategory}</span> for Any Models - Used, Genuine & Aftermarket
                            </>}
                    </h2>

                    <ul className="grid grid-cols-4 md:grid-cols-3 xs:grid-cols-1 xxs:grid-cols-1 sm:grid-cols-2 xs:gap-1 xxs:gap-1 sm:gap-1 gap-4 my-10">

                        {makeArray.map((p, i) => {

                            let linkHref, linkAs;
                            if (isBattery) {
                                linkHref = '/car-battery-replacement-services-in-uae'
                                linkAs = '/car-battery-replacement-services-in-uae'
                            } else if (excludedMakesSet.has(p.make)) {
                                linkHref = '/get-in-touch'
                                linkAs = '/get-in-touch'
                            } else {
                                linkHref = '/search-by-make/[make]/parts/[subcategory]'
                                linkAs = `/search-by-make/${encodeURIComponent(p.make)}/parts/${encodeURIComponent(subcategory)}`
                            }

                            return (

                                <li key={i} className="list-none">
                                    <Link
                                        href={linkHref}
                                        as={linkAs}
                                        title={`${p.make} ${subcategory}`}
                                        target="_blank"
                                        className="flex flex-col items-center justify-center border hover:border-blue-600 p-3 rounded-sm bg-white"
                                    >
                                        <Image
                                            alt={`${p.make}`}
                                            src={`/img/car-logos/${p.img}`}
                                            height={90}
                                            width={90}
                                            className="object-contain"
                                            priority
                                        />
                                        <span className={`mt-2 px-3 py-1 text-sm md:text-xs xl:text-2xl xxl:text-lg font-medium font-sans text-white bg-blue-600 rounded-sm hover:bg-blue-700 text-center w-max ${firaSans.className}`}>
                                            {p.make} {subcategory}
                                        </span>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </section>

                <section
                    aria-labelledby={`all-${make}-${model}-${subcategory}-brands`}
                    className="mt-10 shadow-sm mx-4 md:mx-4 lg:max-w-4xl lg:mx-auto xl:mx-10 bg-bglight px-5 md:px-20 lg:px-10"
                >
                    <h2
                        id={`all-${make}-brands`}
                        className={`text-4xl text-center md:text-3xl lg:text-3xl xs:text-2xl xxs:text-2xl font-semibold py-5 ${playfair_display.className}`}
                    >
                        Search <span className="text-blue-500">{subcategory}</span> for Any Models - Used, Genuine & Aftermarket
                    </h2>

                    <ul className="grid grid-cols-4 md:grid-cols-3 xs:grid-cols-1 xxs:grid-cols-1 sm:grid-cols-2 xs:gap-1 xxs:gap-1 sm:gap-1 gap-4 my-10">

                        {makeArray.map((p, i) => (

                            <li key={i} className="list-none">
                                <Link
                                    href="/search-by-make/[make]/parts/[subcategory]"
                                    as={`/search-by-make/${encodeURIComponent(p.make)}/parts/${encodeURIComponent(subcategory)}`}
                                    title={`${p.make} ${subcategory}`}
                                    target="_blank"
                                    className="flex flex-col items-center justify-center border hover:border-blue-600 p-3 rounded-sm bg-white"
                                >
                                    <Image
                                        alt={`${p.make}`}
                                        src={`/img/car-logos/${p.img}`}
                                        height={90}
                                        width={90}
                                        className="object-contain"
                                        priority
                                    />
                                    <span className={`mt-2 px-3 py-1 text-sm md:text-xs xl:text-2xl xxl:text-lg font-medium font-sans text-white bg-blue-600 rounded-sm hover:bg-blue-700 text-center w-max ${firaSans.className}`}>
                                        {p.make} {subcategory}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>
                <section className="mt-10 shadow-sm mx-4 lg:max-w-4xl lg:mx-auto xl:mx-10 bg-bglight px-20 xs:px-3 xxs:px-3">
                    <div className="container py-6">

                        <h2 className={`font-bold text-center text-3xl xs:text-2xl my-3 ${playfair_display.className}`}>
                            Similar {category} Parts Categories for {make} {model}
                        </h2>

                        <ul className="grid grid-cols-4 md:grid-cols-3 sm:grid-cols-4 xs:grid-cols-2 xxs:grid-cols-3 gap-3 xs:gap-1 mt-10">

                            {relatedCategories.map((item, i) => (

                                <li key={i} className="h-full">
                                    <Link
                                        href={`/search-by-make/${make}/${encodeURIComponent(model)}/${encodeURIComponent(item.category)}`}
                                        title={`${make} ${model} ${item.category}`}
                                        target="_blank"
                                        className="block border border-blue-800 hover:border-blue-900 bg-white rounded-sm h-full p-3 text-center"
                                    >
                                        <span className="text-center text-black text-lg font-medium hover:text-gray-800 p-2 xs:p-0 font-sans underline">
                                            {make} {model} <span className="text-blue-500">{item.parts}</span>
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>

                    </div>
                </section>

                {isBattery ? (<></>) : (<><section>
                    <h2 className={`font-bold text-3xl text-center xs:text-2xl my-3 ${playfair_display.className}`}>
                        Search <span className='text-blue-600'>{make} {model} {subcategory}</span> Anywhere in UAE
                    </h2>
                    <SearchCity cities={cities} />
                    <ul className="grid grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-2 xxs:grid-cols-2 gap-4 xs:gap-2 xxs:gap-2 mt-10">
                        {subCity.map((city) => (
                            <li key={city.id} className="border rounded-md overflow-hidden bg-white shadow hover:shadow-lg transition-shadow h-full flex flex-col">
                                <Link href={`/search-by-brands-in-uae/${encodeURIComponent(make)}/${encodeURIComponent(city.city)}`} target="_blank"
                                    title={`${make} ${model} ${subcategory} dubai`}>
                                    <div className="p-3 flex-1 flex flex-col">
                                        <h3 className="text-lg font-semibold mb-2 underline text-center">{make} {model} {subcategory} <span className="text-blue-500">{city.city}</span></h3>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section></>)}

            </div>)}
    </>

    );
}