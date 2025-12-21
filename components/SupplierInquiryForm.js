'use client';

import { Fira_Sans } from 'next/font/google';
import React, { useState } from 'react';

const MAKES = [
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

const firaSans = Fira_Sans({
    weight: ['400', '700'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-fira-sans',
});

export default function SupplierInquiryForm() {
    const [step, setStep] = useState(1);
    const [supplierTypes, setSupplierTypes] = useState([]);
    const [businessName, setBusinessName] = useState("");
    const [makes, setMakes] = useState([]);
    const [partsCondition, setPartsCondition] = useState([]);
    const [whatsapp, setWhatsapp] = useState('');
    const [country, setCountry] = useState('');
    const [email, setEmail] = useState('');
    const [partsType, setPartsType] = useState('');


    const toggleValue = (value, state, setState) => {
        setState(
            state.includes(value)
                ? state.filter((v) => v !== value)
                : [...state, value]
        );
    };
    const isStepValid = () => {
        switch (step) {
            case 1:
                return supplierTypes.length > 0;

            case 2:
                return (
                    businessName.trim() !== "" &&
                    whatsapp.trim() !== "" &&
                    country.trim() !== ""
                );

            case 3:
                return partsType.trim() !== "" && partsCondition.length > 0;

            case 4:
                return makes.length > 0;

            default:
                return false;
        }
    };

    const next = () => {
        if (isStepValid()) setStep((s) => Math.min(s + 1, 4));
    };

    const prev = () => setStep((s) => Math.max(s - 1, 1));


    async function handleSubmit(e) {
        e.preventDefault();

        const today = new Date();
        const dateTime = today.toISOString();

        await fetch('/api/supplier_form', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                Timestamp: dateTime,
                type: 'Supplier Inquiry',
                supplierType: supplierTypes.join(', '),
                businessName,
                whatsapp,
                country,
                email,
                partsType,
                partsCondition: partsCondition.join(', '),
                makes: makes.join(', '),
                description: `
Supplier Type: ${supplierTypes.join(', ')}
Business Name: ${businessName}
WhatsApp: ${whatsapp}
Country: ${country}
Email: ${email}
Parts Type: ${partsType}
Condition: ${partsCondition.join(', ')}
Makes: ${makes.join(', ')}
        `,
            }),
        });

        alert(
            'Form submitted! You have been added to Our supplier list, You can send your Catalog, price lists at emiratesautomobileparts@gmail.com'
        );

        // reset
        setSupplierTypes([]);
        setMakes([]);
        setBusinessName('')
        setPartsCondition([]);
        setWhatsapp('');
        setCountry('');
        setEmail('');
        setPartsType('');
    }

    return (
        <div className="max-w-4xl mx-auto my-10 px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-2xl rounded-xl overflow-hidden"
            >
                {/* HEADER */}
                <div className="bg-bgform text-white text-center py-6">
                    <h2 className="text-3xl font-heading">Supplier Registration</h2>
                    <p className="text-sm opacity-90">Step {step} of 4</p>
                </div>

                {/* PROGRESS */}
                <div className="w-full bg-bglight h-2">
                    <div
                        className="h-2 bg-info transition-all duration-500"
                        style={{ width: `${step * 25}%` }}
                    />
                </div>

                <div className="p-6 space-y-6 font-poppins">

                    {/* STEP 1 */}
                    {step === 1 && (
                        <fieldset>
                            <legend className="text-xl font-semibold mb-4">You are a</legend>
                            <div className="grid sm:grid-cols-2 gap-3">
                                {["Manufacturer", "Supplier", "Dealer", "Wholesaler", "Exporter"].map(
                                    (type) => (
                                        <label
                                            key={type}
                                            className="flex items-center gap-3 bg-bglight px-4 py-3 rounded-lg"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={supplierTypes.includes(type)}
                                                onChange={() =>
                                                    toggleValue(type, supplierTypes, setSupplierTypes)
                                                }
                                            />
                                            {type}
                                        </label>
                                    )
                                )}
                            </div>
                        </fieldset>
                    )}

                    {/* STEP 2 */}
                    {step === 2 && (
                        <>
                            <div>
                                <label className="font-semibold block mb-1">
                                    Business Name
                                </label>
                                <input
                                    required
                                    value={businessName}
                                    onChange={(e) => setBusinessName(e.target.value)}
                                    placeholder="Company / Shop Name"
                                    className="w-full bg-gray-100 px-4 py-3 rounded-lg focus:ring-2 focus:ring-info"
                                />
                            </div>

                            <div>
                                <label className="font-semibold block mb-1">
                                    WhatsApp Number
                                </label>
                                <input
                                    required
                                    value={whatsapp}
                                    onChange={(e) => setWhatsapp(e.target.value)}
                                    placeholder="+971xxxxxxxxx"
                                    className="w-full bg-gray-100 px-4 py-3 rounded-lg"
                                />
                            </div>

                            <div>
                                <label className="font-semibold block mb-1">Country</label>
                                <input
                                    required
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    placeholder="Eg. Dubai, UAE / Guangzhou , China"
                                    className="w-full bg-gray-100 px-4 py-3 rounded-lg"
                                />
                            </div>

                            <div>
                                <label className="font-semibold block mb-1">
                                    Email (Optional)
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="email@example.com"
                                    className="w-full bg-gray-100 px-4 py-3 rounded-lg"
                                />
                            </div>
                        </>
                    )}

                    {/* STEP 3 */}
                    {step === 3 && (
                        <>
                            <div>
                                <label className="font-semibold block mb-1">
                                    Parts Type
                                </label>
                                <input
                                    value={partsType}
                                    onChange={(e) => setPartsType(e.target.value)}
                                    placeholder="Engine, Suspension, Electrical..."
                                    className="w-full bg-gray-100 px-4 py-3 rounded-lg"
                                />
                            </div>

                            <fieldset>
                                <legend className="font-semibold mb-2">Parts Condition</legend>
                                <div className="grid sm:grid-cols-3 gap-3">
                                    {["Genuine", "Aftermarket", "Refurbished"].map((cond) => (
                                        <label
                                            key={cond}
                                            className="flex items-center gap-3 bg-bglight px-4 py-3 rounded-lg"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={partsCondition.includes(cond)}
                                                onChange={() =>
                                                    toggleValue(cond, partsCondition, setPartsCondition)
                                                }
                                            />
                                            {cond}
                                        </label>
                                    ))}
                                </div>
                            </fieldset>
                        </>
                    )}

                    {/* STEP 4 */}
                    {step === 4 && (
                        <fieldset>
                            <legend className="text-xl font-semibold mb-4">
                                Supported Makes
                            </legend>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {MAKES.map((make) => (
                                    <label
                                        key={make}
                                        className="flex items-center gap-2 bg-bglight px-4 py-2 rounded-lg"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={makes.includes(make)}
                                            onChange={() => toggleValue(make, makes, setMakes)}
                                        />
                                        {make}
                                    </label>
                                ))}
                            </div>
                        </fieldset>
                    )}
                </div>

                {/* FOOTER */}
                <div className="flex justify-between px-6 py-4 bg-gray-50">
                    {step > 1 && (
                        <button
                            type="button"
                            onClick={prev}
                            className="px-6 py-2 rounded-lg bg-gray-200"
                        >
                            Back
                        </button>
                    )}

                    {step < 4 ? (
                        <button
                            type="button"
                            onClick={next}
                            disabled={!isStepValid()}
                            className={`ml-auto px-6 py-2 rounded-lg text-white
                ${isStepValid()
                                    ? "bg-info hover:bg-darkblue"
                                    : "bg-gray-400 cursor-not-allowed"
                                }`}
                        >
                            Next
                        </button>
                    ) : (
                        <button
                            type="submit"
                            disabled={!isStepValid()}
                            className="ml-auto px-6 py-2 rounded-lg bg-green-600 text-white font-bold hover:bg-green-700"
                        >
                            Register Supplier
                        </button>
                    )}
                </div>
            </form>
            <section className="max-w-5xl mx-auto px-4 py-12">
                <div className="bg-bglight rounded-2xl p-6 sm:p-10 shadow-lg">
                    <h3 className="text-3xl sm:text-4xl font-heading text-darkblue mb-4 text-center">
                        Become a Supplier at EMIRATESCAR
                    </h3>

                    <p className={` text-gray-700 leading-relaxed text-base sm:text-lg ${firaSans.className}`}>
                        <span className='text-blue-800'>EMIRATESCAR</span> is a fast-growing automotive marketplace connecting genuine
                        buyers with trusted spare parts suppliers across the UAE and around the
                        world. We invite manufacturers, distributors, dealers, wholesalers, and
                        exporters to join our supplier network and expand their reach beyond
                        traditional markets. With the UAE serving as a global automotive trading
                        hub, <span className='text-blue-800'>EMIRATESCAR</span> gives you direct access to workshops, fleet owners,
                        garages, resellers, and end customers actively searching for parts every
                        day. By becoming a registered supplier, your products gain visibility
                        among high-intent buyers, increasing inquiries and qualified leads without
                        the heavy cost of marketing or sales teams. Whether you specialize in
                        genuine, aftermarket, or refurbished parts, <span className='text-blue-800'>EMIRATESCAR</span> helps you connect
                        with buyers looking for exactly what you offer. Our platform simplifies
                        lead generation, builds trust through verified supplier profiles, and
                        enables cross-border trade opportunities with customers from the Middle
                        East, Africa, Asia, and beyond.
                    </p>

                    <div className="mt-6 text-center">
                        <a
                            href="#supplier-form"
                            className="inline-block bg-info hover:bg-darkblue text-white font-poppins font-semibold px-8 py-3 rounded-lg transition"
                        >
                            Register as a Supplier
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}