'use client';
import React from 'react';
import useSWR from 'swr';

const fetcher = async url => {
  const res = await fetch(url);
  return res.json();
};

export default function TenEntries({ make = null, model = null }) {
  const buildUrl = () => {
    const params = new URLSearchParams();
    if (make) params.append('make', make);
    if (model) params.append('model', model);
    const queryString = params.toString();
    return `/api/entries${queryString ? `?${queryString}` : ''}`;
  };

  const { data, error } = useSWR(buildUrl(), fetcher);

  // Build the title based on filters
  const getTitle = () => {
    if (make && model) {
      return `${make} ${model}`;
    } else if (make) {
      return make;
    }
    return 'Latest';
  };

  if (error) return <div className="text-center text-red-600">Error fetching data</div>;
  if (!data) return <div className="text-center">Loading...</div>;

  return (
    <section aria-label="Latest Received Inquiries" className="pt-10">
      <h2 className="text-black text-4xl text-center md:text-lg lg:text-2xl font-extrabold xs:text-xl 2xs:text-xs">
        <span className="text-red-600 animate-bounce inline-block">{getTitle()}</span> Received Inquiries
      </h2>

      {data.length === 0 ? (
        <div className="text-center pt-10 text-gray-600">
          .
        </div>
      ) : (
        <div className="pt-10 xl:mx-36 lg:mx-10 md:mx-10 sm:mx-5 xs:mx-2 2xs:mx-2 s:mx-2 md:ml-11 my-10 mx-10 overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-800" aria-label="Recent Car Part Inquiries">
            <thead>
              <tr>
                <th scope="col" className="px-4 py-2 bg-gray-800 text-white text-left">Car</th>
                <th scope="col" className="px-4 py-2 bg-gray-800 text-white text-left">Part List</th>
                <th scope="col" className="px-4 py-2 bg-gray-800 text-white text-left">Car Location</th>
              </tr>
            </thead>
            <tbody>
              {data.map((h, i) => (
                <tr key={i}>
                  <td className="border font-semibold px-4 py-2">
                    {h.Year} {h.BRAND} {h.Model}
                  </td>
                  <td className="border px-4 py-2">
                    {h.PartList}
                  </td>
                  <td className="border px-4 py-2">
                    {h.Location}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}