'use client';

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

export default function SupplierInquiryForm() {
    const [supplierTypes, setSupplierTypes] = useState([]);
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

    async function handleSubmit(e) {
        e.preventDefault();

        const today = new Date();
        const dateTime = today.toISOString();

        await fetch('/api/g_sheet', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                Timestamp: dateTime,
                type: 'Supplier Inquiry',
                supplierType: supplierTypes.join(', '),
                whatsapp,
                country,
                email,
                partsType,
                partsCondition: partsCondition.join(', '),
                makes: makes.join(', '),
                description: `
Supplier Type: ${supplierTypes.join(', ')}
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
        setPartsCondition([]);
        setWhatsapp('');
        setCountry('');
        setEmail('');
        setPartsType('');
    }

    return (
        <div className="max-w-4xl mx-auto my-8 px-4">
            <form
                onSubmit={handleSubmit}
                className="w-full shadow-xl px-6 py-6 bg-white"
            >
                <h2 className="text-2xl font-bold text-center mb-6">
                    Spare Parts Supplier Registration
                </h2>

                {/* SUPPLIER TYPE */}
                <fieldset className="mb-4">
                    <legend className="font-semibold mb-2">You are a</legend>
                    {['Manufacturer', 'Supplier', 'Dealer', 'Wholesaler', 'Exporter'].map(
                        (type) => (
                            <label key={type} className="block text-sm">
                                <input
                                    type="checkbox"
                                    className="mr-2"
                                    checked={supplierTypes.includes(type)}
                                    onChange={() =>
                                        toggleValue(type, supplierTypes, setSupplierTypes)
                                    }
                                />
                                {type}
                            </label>
                        )
                    )}
                </fieldset>

                {/* WHATSAPP */}
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-1">
                        WhatsApp Number
                    </label>
                    <input
                        type="text"
                        required
                        placeholder="+971xxxxxxxxx"
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        className="w-full bg-gray-200 rounded px-3 py-2"
                    />
                </div>

                {/* COUNTRY */}
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-1">Country</label>
                    <input
                        type="text"
                        required
                        placeholder="UAE, India, Japan..."
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full bg-gray-200 rounded px-3 py-2"
                    />
                </div>

                {/* EMAIL */}
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-1">
                        Email (Optional)
                    </label>
                    <input
                        type="email"
                        placeholder="email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-gray-200 rounded px-3 py-2"
                    />
                </div>

                {/* PARTS TYPE */}
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-1">
                        Parts Type
                    </label>
                    <input
                        type="text"
                        placeholder="Engine, Suspension, Electrical..."
                        value={partsType}
                        onChange={(e) => setPartsType(e.target.value)}
                        className="w-full bg-gray-200 rounded px-3 py-2"
                    />
                </div>

                {/* PARTS CONDITION */}
                <fieldset className="mb-4">
                    <legend className="font-semibold mb-2">Parts Condition</legend>
                    {['Genuine', 'Aftermarket', 'Refurbished'].map((cond) => (
                        <label key={cond} className="block text-sm">
                            <input
                                type="checkbox"
                                className="mr-2"
                                checked={partsCondition.includes(cond)}
                                onChange={() =>
                                    toggleValue(cond, partsCondition, setPartsCondition)
                                }
                            />
                            {cond}
                        </label>
                    ))}
                </fieldset>

                {/* MAKES */}
                <fieldset className="mb-6">
                    <legend className="font-semibold mb-2">Supported Makes</legend>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {MAKES.map((make) => (
                            <label key={make} className="text-sm">
                                <input
                                    type="checkbox"
                                    className="mr-2"
                                    checked={makes.includes(make)}
                                    onChange={() => toggleValue(make, makes, setMakes)}
                                />
                                {make}
                            </label>
                        ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                        More brands can be added later
                    </p>
                </fieldset>

                {/* SUBMIT */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded"
                >
                    Register as Supplier
                </button>
            </form>
        </div>
    );
}