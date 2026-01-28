'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const postCities = ['Total Abu Al Bukhoosh Abu Dhabi',
  'Abu Dhabi',
  'Abu Musa Island',
  'Ahmed bin Rashid Free Zone',
  'Ajman',
  'Al Ain',
  'Al Barsha',
  'Al Dhafra or Western Region',
  'Al Fujairah',
  'Al Hamriyah',
  'AlJazeera Port',
  'Al Jeer Port',
  'Al Mafraq',
  'Al Quoz',
  'Al Sufouh',
  'Al Ruways Industrial City',
  'Arzanah Island',
  'Das Island',
  'Deira',
  'Dibba Al Fujairah',
  'Dubai',
  'Dubai World Central',
  'Esnnad',
  'Sea Port',
  'Free Port',
  'Habshan',
  'Abu Hail',
  'Hamriya Free Zone Port',
  'Al Jarf',
  'Hatta',
  'Sea Port',
  'Sea Port',
  'Mina Jebel Ali',
  'Jebel Ali Free Zone',
  'Al Dhannah City or Jebel Dhanna',
  'Jumeirah',
  'Kalba',
  'Khalidiya',
  'Khor Fakkan',
  'Masfut',
  'Khalid Port',
  'Khalifa City',
  'Mina Rashid Port',
  'Mina Saqr',
  'Mina Zayed',
  'Minhad',
  'Mirfa',
  'Mubarek Tower',
  'Mubarraz Island',
  'Musaffah',
  'Mussafah',
  'Offshore Marine Services',
  'Port Rashid or Al Mina',
  'Ras Al Khor Port',
  'Rak Maritime City',
  'Ras al Khaimah',
  'Ras Al Khor',
  'Al Ras',
  'Al Reem Island',
  'Al Ruways Industrial City',
  'Ruwais Port Abu Dhabi',
  'Saadiyat Island',
  'Sharjah',
  'Al Sila',
  'Stevin Rock',
  'Sweihan',
  'The Palm Jumeirah',
  'Umm al Nar',
  'Umm al Quwain',
  'Al Qurayyah',
  'Yas Island',
  'Zirku Island',
  'Sheikh Zayed Road',
  'Business Bay',
  'Downtown Dubai',
  'Al Badaa',
  'Al Satwa',
  'Zaabeel',
  'Trade Centre',
  'Al Karama',
  'Oud Metha',
  'Al Jaddaf',
  'Al Wasl',
  'Al Safa',
  'Umm Suqeim',
  'Jumeirah Village Circle',
  'Dubai Investments Park',
  'Mirdif',
  'Al Twar',
  'Al Khawaneej',
  'Al Warqa',
  'Dubai Silicon Oasis',
  'Al Thammam',
  'Golf City',
  'Umm Ramool',
  'Al Qusais',
  'Al Nahda',
  'Al Rashidiya',
  'Nad al Sheba',]

export default function FormBattery({ formsData }) {
  const [Make, setMake] = useState('');
  const [Model, setModel] = useState('');
  const [Year, setYear] = useState('');
  const [Whatsappno, setWhatsappno] = useState('');
  const [Address, setAddress] = useState('');
  const [Name, setName] = useState('');
  const [Code, setCode] = useState('');
  const [formCities, setFormCities] = useState([]);
  const [suggestionCity, setCitySuggestion] = useState([]);
  const [textCity, setCityText] = useState('');

  useEffect(() => {
    const loadCity = async () => {
      var city = [];
      for (var i in postCities) {
        var filtered = postCities[i];
        city.push(filtered);
      }
      setFormCities(city);
    };
    loadCity();
  }, [postCities]);
  const onSuggestionCityHandler = textCity => {
    setCityText(textCity);
    setCitySuggestion([]);
  };

  const onPartCityChange = citytext => {
    let matches = [];
    if (citytext.length > 0) {
      matches = formCities.filter(city => {
        const regex = new RegExp(`${citytext}`, 'gi');
        return city.match(regex);
      });
    }
    setCitySuggestion(matches);
    setCityText(citytext);
  };

  function handleMakeChange(event) {
    setMake(event.target.value);
  }
  function handleModelChange(event) {
    setModel(event.target.value);
  }
  function handleWhatsAppNoChange(event) {
    setWhatsappno(event.target.value);
  }
  function handleNameChange(event) {
    setName(event.target.value);
  }
  function handleYearChange(event) {
    setYear(event.target.value)
  }
  const mke = [
    'Ford',
    'Chrysler',
    'Citroen',
    'Hillman',
    'Chevrolet',
    'Cadillac',
    'BMW',
    'Austin',
    'Fairthorpe',
    'Fillmore',
    'Pontiac',
    'Studebaker',
    'Buick',
    'Rambler',
    'Plymouth',
    'Volkswagen',
    'Jensen',
    'Jetour',
    'Oldsmobile',
    'Sandstorm',
    'Haval',
    'Exeed',
    'Skoda',
    'Seres',
    'Opel',
    'Maxus',
    'Changan',
    'Zarooq Motors',
    'Soueast',
    'TANK',
    'Jaecoo',
    'JAC',
    'W Motors',
    'Hongqi',
    'GAC',
    'Foton',
    'ZNA',
    'Zeekr',
    'Great Wall GWM',
    'Dorcen',
    'Chery',
    'Geely',
    'BAIC',
    'Bestune',
    'Abarth',
    'Mercury',
    'Dodge',
    'Shelby',
    'Porsche',
    'Toyota',
    'Mercedes-Benz',
    'MG',
    'Nissan',
    'Honda',
    'Mazda',
    'Renault',
    'Audi',
    'Lincoln',
    'Lotus',
    'Maserati',
    'Mitsubishi',
    'Saab',
    'Subaru',
    'Suzuki',
    'Lamborghini',
    'Merkur',
    'Land Rover',
    'Acura',
    'Lexus',
    'Eagle',
    'Alfa Romeo',
    'Daihatsu',
    'Geo',
    'GMC',
    'Hyundai',
    'Infiniti',
    'Isuzu',
    'Jaguar',
    'Jeep',
    'Saturn',
    'Volvo',
    'Kia',
    'Holden',
    'Corbin',
    'Daewoo',
    'MINI',
    'Maybach',
    'Scion',
    'Spyker',
    'Aston Martin',
    'Bentley',
    'Panoz',
    'Rolls-Royce',
    'Spyker Cars',
    'Ferrari',
    'Hummer',
    'Morgan',
    'Peugeot',
    'Foose',
    'Aptera',
    'Smart',
    'Bugatti',
    'Tesla',
    'Ram',
    'Fiat',
    'McLaren',
    'BYD',
    'McLaren Automotive',
    'Mobility Ventures LLC',
    'Pagani',
    'Roush Performance',
    'smart',
    'SRT',
    'Genesis',
    'Karma',
    'Koenigsegg',
    'RUF Automobile',
    'STI',
    'Polestar',
    'Kandi',
  ];
  const make = mke.sort();


  function Submission(e) {
    e.preventDefault();
    const today = new Date();
    const date =
      today.getFullYear() +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      today.getDate();
    const time =
      today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    const dateTime = date + ' ' + time;
    const response = fetch(`/api/g_sheet`, {
      method: 'POST',
      body: JSON.stringify({
        Timestamp: dateTime,
        brand: Make,
        contact: Whatsappno,
        name: Name,
        description:
          'Customer Name: ' +
          Name +
          '\n' +
          'Address: ' +
          textCity +
          '\n' +
          'Vehicle: ' +
          Make +
          ' ' +
          Model +
          ' ' +
          Year + '\n' +
          'Part: ' +
          'Battery',
        email: 'Email',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    let message =
      'Timestamp: ' +
      dateTime +
      '\n' +
      'Brand: ' +
      Make +
      '\n' +
      'Model: ' +
      Model +
      '\n' +
      'Customer Name: ' +
      Name +
      '\n' +
      'Address: ' +
      Address;
    alert('Form submitted. We will contact you shortly ;)');
    let messageURI = encodeURI(message);
    setName('');
    setMake('');
    setCode('');
    setModel('');
    setCityText('');
    setCitySuggestion([])
    setWhatsappno('');
    window
      .open(
        `https://api.whatsapp.com/send?phone=+971551478994&text=${messageURI}`,
        '_blank'
      )
      .focus();
  }
  return (
    <div>
      <form
        id="myBatteryForm"
        className="w-full shadow-xl px-8 py-8 xs:px-2 xs:py-3 2xs:px-4 sm:px-4"
        method="POST"
        onSubmit={Submission}
        target="hidden_iframe"
      >
        <div className="flex flex-wrap ">
          <div className="w-full px-3 mb-6 xs:mb-0">
            <label
              className="block text-sm font-bold mb-2"
              htmlFor="whatsappno"
            >
              Name
            </label>
            <input
              className="w-full border border-gray-300 rounded-sm py-2 px-4 text-xs text-gray-500 focus:outline-none focus:border-gray-400"
              id="name"
              type="text"
              placeholder="Your name"
              name="entry.1153362739"
              value={Name}
              onChange={handleNameChange}
              autoComplete="off"
              required
            />
          </div>
        </div>
        <div className="flex flex-wrap  mb-2">
          <div className="w-1/2 md:w-1/2 px-3 mb-6 md:mb-0 xs:mb-0">
            <label
              className="block text-sm font-bold mb-2"
              htmlFor="make"
            >
              Make
            </label>
            <div className="relative">
              <select
                className="w-full border border-gray-300 rounded-sm py-2 px-4 text-xs text-gray-500 focus:outline-none focus:border-gray-400"
                id="make"
                required="required"
                value={Make}
                onChange={handleMakeChange}
              >
                <option value="" disabled>
                  Select your Make
                </option>
                {make.map((m, i) => (
                  <option key={i}>{m}</option>
                ))}{' '}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="w-1/2 md:w-1/2 pr-3">
            <label
              className="block text-sm font-bold mb-2"
              htmlFor="model"
            >
              Model
            </label>
            <div className="relative">
              <select
                className="w-full border border-gray-300 rounded-sm py-2 px-4 text-xs text-gray-500 focus:outline-none focus:border-gray-400"
                id="model"
                value={Model}
                onChange={handleModelChange}
                required
              >
                <option value="" disabled>
                  Select your Model
                </option>
                {formsData
                  .filter(s => s.make === Make)
                  .map((s, i) => (
                    <option key={i} value={s.model}>
                      {s.model}{' '}
                    </option>
                  ))}{' '}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap ">
          <div className="w-full px-3 mb-6 xs:mb-0">
            <label
              className="block text-sm font-bold mb-2"
              htmlFor="whatsappno"
            >
              Area Name, Emirates
            </label>
            <input
              className="w-full border border-gray-300 rounded-sm py-2 px-4 text-xs text-gray-500 focus:outline-none focus:border-gray-400"
              id="whatsappno"
              type="text"
              placeholder="(Area, Emirates) or (City, Country)"
              value={textCity}
              onChange={e => onPartCityChange(e.target.value)}
              autoComplete="off"
              required
            />
            <div className='z-10 mt-1 w-full bg-white rounded-xl max-h-64 overflow-y-auto'>
              {suggestionCity &&
                suggestionCity.map((s, i) => (
                  <div
                    key={i}
                    className="cursor-pointer border-gray-400 p-2"
                    onClick={() => onSuggestionCityHandler(s)}
                  >
                    {s}
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap ">
          <div className="w-full px-3 mb-6 xs:mb-0 md:mb-0">
            <label
              htmlFor="year"
              className="block text-sm font-bold mb-2"
            >
              Year
            </label>
            <input
              id="year"
              className="w-full border border-gray-300 rounded-sm py-2 px-4 text-xs text-gray-500 focus:outline-none focus:border-gray-400"
              type="text"
              placeholder="(e.g. 2020)"
              onChange={handleYearChange}
              value={Year}
              required
            />
          </div>
        </div>

        <div className="flex flex-wrap ">
          <div className="w-full px-3 mb-6 xs:mb-0 md:mb-0">
            <label
              htmlFor="whatsappno"
              className="block text-sm font-bold mb-2"
            >
              WhatsApp no
            </label>
            <input
              id="whatsappno"
              className="w-full border border-gray-300 rounded-sm py-2 px-4 text-xs text-gray-500 focus:outline-none focus:border-gray-400"
              type="text"
              placeholder="+971 5********"
              onChange={handleWhatsAppNoChange}
              value={Whatsappno}
              required
            />
          </div>
        </div>

        <div className="flex flex-wrap py-3">
          <div className="w-full px-3 mb-6 xs:mb-0">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full xs:text-xs"
            >
              Submit
            </button>
          </div>
        </div>
        <div className="flex float-left text-xs text-gray-400">
          <Link
            href="https://emirates-car.com/privacy-policy"
            target="_newtab"
            className="underline"
          >
            Privacy policy
          </Link>
          &nbsp;
          <Link
            href="https://emirates-car.com/terms-and-condition"
            target="_newtab"
            className="underline"
          >
            Terms and conditions
          </Link>
        </div>

        <div className="flex float-right text-xs text-gray-400 ">
          100% secure and trusted
        </div>
      </form>
    </div>
  );
}
