'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function SearchCity({ cities, citypage }) {
  const [searchCity, setSearchCity] = useState('');
  const [recommendcities, setRecommendCity] = useState('');
  const [formCityChange, setFormCityChange] = useState('');
  useEffect(() => {
    const loadPart = async () => {
      var part = [];
      for (var i in cities) {
        var filtered = cities[i].city;
        part.push(filtered);
      }
      setFormCityChange(part);
    };
    loadPart();
  }, [cities]);

  const onCityFormChange = text => {
    let matches = [];
    if (text.length > 0) {
      matches = formCityChange.filter(part => {
        const regex = new RegExp(`${text}`, 'gi');
        return part.match(regex);
      });
    }
    setRecommendCity(matches);
    setSearchCity(text);
  };

  const onCitySuggestionHandler = searchCity => {
    setSearchCity(searchCity);
    setRecommendCity([]);
  };
  return (
    <form role="search" className="flex justify-center">
      <div className="pt-3 w-full max-w-md">
        <label htmlFor="city-search" className="sr-only">
          Search city
        </label>
        <input
          id="city-search"
          type="search"
          className="border-2 border-gray-300 w-full bg-white h-10 xs:h-6 2xs:h-6 rounded-lg text-sm focus:outline-none px-2"
          placeholder={`${citypage ? `Search your parts in ${citypage}` : "Eg Dubai, Abu Dhabi.."}`}
          onChange={e => onCityFormChange(e.target.value)}
          value={searchCity}
          autoComplete="off"
          required
        />

        {recommendcities && recommendcities.length > 0 && (
          <ul className="mt-2 overflow-y-hidden grid grid-cols-5 xs:grid-cols-1 2xs:grid-cols-1 gap-1">
            {recommendcities.map((city, i) => (
              <li key={i} className="cursor-pointer text-base bg-white">
                <Link
                  href={`/search-by-cities-in-uae/${city}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`Spare parts online in ${city}`}
                  className="block p-1 hover:underline"
                  onClick={() => onCitySuggestionHandler(city)}
                >
                  {city}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </form>
  );
}
