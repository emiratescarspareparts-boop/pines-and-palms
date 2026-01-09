'use client';
import React from 'react';
import useSWR from 'swr';
const fetcher = async url => {
  const res = await fetch(url);
  console.log(res.json())
  return res.json();
};

export default function TenEntries() {
  const { data, error } = useSWR('/api/entries', fetcher);


  if (error) return <div>Error fetching data</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <section aria-label="Latest Received Inquiries" className="pt-10">
      <h2 className="text-black text-4xl text-center md:text-lg lg:text-2xl font-extrabold xs:text-xl 2xs:text-xs">
        <span className="text-red-600 animate-bounce inline-block">Latest</span> Received Inquiry
      </h2>

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
    </section>


  );
}
