'use client';
import Link from 'next/link';
import React, { useState } from 'react';

export default function GetInTouchForm() {
  const [Make, setMake] = useState('');
  const [Model, setModel] = useState('');
  const [Email, setEmail] = useState('');
  const [Whatsappno, setWhatsappno] = useState('');
  const [Partname, setPartname] = useState('');
  const [Name, setName] = useState('');
  const [Address, setAddress] = useState('');
  const [Year, setYear] = useState('');
  const [Code, setCode] = useState('');

  function handleMakeChange(event) {
    setMake(event.target.value);
    console.log(Make);
  }
  function handleAddressChange(event) {
    setAddress(event.target.value);
    console.log(Address);
  }
  function handleModelChange(event) {
    setModel(event.target.value);
    console.log(Model);
  }
  function handleWhatsAppNoChange(event) {
    setWhatsappno(event.target.value);
    console.log(Whatsappno);
  }
  function handleEmailChange(event) {
    setEmail(event.target.value);
    console.log(Email);
  }
  function handlePartChange(event) {
    setPartname(event.target.value);
    console.log(Partname);
  }
  function handleNameChange(event) {
    setName(event.target.value);
  }
  function handleYearChange(event) {
    setYear(event.target.value);
  }
  function handleCodeChange(event) {
    setCode(event.target.value);
  }
  async function handleSubmit(event) {
    event.preventDefault();
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
    fetch(`/api/g_sheet`, {
      method: 'POST',
      body: JSON.stringify({
        Timestamp: dateTime,
        brand: Make,
        contact: Code + Whatsappno,
        name: Name,
        description:
          'Customer Name: ' +
          Name +
          '\n' +
          'Address: ' +
          Address +
          '\n' +
          'Vehicle: ' +
          Make +
          ' ' +
          Model +
          ' ' +
          Year +
          '\n' +
          'Part List: ' +
          Partname,
        partList: Partname,
        email: Email,
        year: Year,
        model: Model,
        address: Address
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    alert('Form submitted. We will contact you shortly ;)');
    setCode('');
    setName('');
    setYear('');
    setMake('');
    setModel('');
    setAddress('');
    setEmail('');
    setPartname('');
    setWhatsappno('');
  }
  return (
    <div className='max-w-4xl mx-auto my-5 xs:mx-3 xxs:mx-3 md:mx-4'>
      <form
        id="myForm"
        method="POST"
        onSubmit={handleSubmit}
        className="w-full shadow-xl px-8 py-8 xs:px-1 xs:py-2 sm:py-3 s:py-2 xxs:px-1 sm:px-3 md:px-3 lg:px-8 xxl:px-8 xl:px-8"
      >
        <div className="grid grid-cols-1 pt-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 xs:mt-3"
            htmlFor="model"
          >
            Name
          </label>
          <div className="relative">
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 xs:py-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 xs:text-xs"
              id="name"
              type="text"
              placeholder="Name"
              onChange={handleNameChange}
              value={Name}
              autoComplete="off"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 xs:grid-cols-1 xs:grid s:grid s:grid-cols-1 pt-3">
          <div>
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 xs:mt-3"
              htmlFor="year"
            >
              Year
            </label>
            <div className="relative">
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 xs:py-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 xs:text-xs"
                id="year"
                type="text"
                placeholder="Year"
                onChange={handleYearChange}
                value={Year}
                autoComplete="off"
                required
              />
            </div>
          </div>
          <div>
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 xs:mt-3"
              htmlFor="make"
            >
              Make
            </label>
            <input
              id="make"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 xs:py-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 xs:text-xs"
              type="text"
              onChange={handleMakeChange}
              placeholder="Your car Make"
              value={Make}
              required
            />
          </div>
          <div>
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 xs:mt-3"
              htmlFor="model"
            >
              Model
            </label>
            <input
              id="model"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 xs:py-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 xs:text-xs"
              type="text"
              placeholder="Your car Model"
              onChange={handleModelChange}
              value={Model}
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 xs:grid-cols-1 xxs:grid-cols-1 s:grid-cols-1 pt-3">
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-2/5 px-3 mb-6 xs:mb-0 md:mb-0">
              <label
                htmlFor="Code"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 xs:mt-3"
              >
                CODE
              </label>
              <input
                id="Code"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 xs:py-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 xs:text-xs"
                type="text"
                placeholder="Eg. +971, +27 ..."
                onChange={handleCodeChange}
                value={Code}
                required
              />
            </div>
            <div className="w-3/5 pr-2 mb-6 xs:mb-0 md:mb-0">
              <label
                htmlFor="whatsappno"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 xs:mt-3"
              >
                WhatsApp no
              </label>
              <input
                id="whatsappno"
                name="entry.902626710"
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 xs:py-1 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 xs:text-xs "
                type="text"
                placeholder="WhatsApp No"
                onChange={handleWhatsAppNoChange}
                value={Whatsappno}
                required
              />
            </div>
          </div>
          <div>
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 xs:mt-3"
              htmlFor="city"
            >
              Location
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 xs:py-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 xs:text-xs"
              id="city"
              type="text"
              placeholder="(Area, Emirates) or (City, Country)"
              onChange={handleAddressChange}
              value={Address}
              autoComplete="off"
            />
          </div>
          <div>
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 xs:mt-3"
              htmlFor="email"
            >
              Email(Optional)
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 xs:py-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 xs:text-xs"
              id="email"
              type="text"
              placeholder="Mail ID"
              onChange={handleEmailChange}
              value={Email}
              autoComplete="off"
              name="entry.113755516"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 pt-3">
          <div>
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 xs:mt-3"
              htmlFor="partname"
            >
              PART NAME
            </label>
            <textarea
              id="partname"
              name="entry.1660104041"
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 xs:py-1 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 xs:text-xs"
              type="text"
              rows={5}
              placeholder="Eg. AC Compressor, Radiator, Gearbox, Antenna, Door glass, Driving light..."
              onChange={handlePartChange}
              value={Partname}
              required
              autoComplete="off"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 pt-3">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl xs:text-xs"
          >
            Submit
          </button>
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
