'use client';

import { useState, useEffect } from 'react';
import {
    ChevronRight,
    Car,
    Package,
    User,
    MapPin,
    Phone,
    Mail,
    CheckCircle,
} from 'lucide-react';

export default function Formchatgpt({ formsData = [], postFilter = [] }) {
    /* ---------------- STATE ---------------- */
    const [currentStep, setCurrentStep] = useState(1);

    const [Name, setName] = useState('');
    const [Email, setEmail] = useState('');
    const [Code, setCode] = useState('');
    const [Whatsappno, setWhatsappno] = useState('');
    const [Address, setAddress] = useState('');

    const [Year, setYear] = useState('');
    const [Make, setMake] = useState('');
    const [Model, setModel] = useState('');

    const [formPartname, setFormPartname] = useState([]);

    const [partInputs, setPartInputs] = useState([
        { id: 1, value: '', suggestions: [], isCustom: false },
    ]);

    /* ---------------- LOAD PARTS ---------------- */
    useEffect(() => {
        const parts = [];
        for (let i in postFilter) {
            parts.push(postFilter[i].parts);
        }
        setFormPartname(parts.flat());
    }, [postFilter]);

    /* ---------------- MAKE LIST ---------------- */
    const make = [
        'Toyota', 'Nissan', 'Honda', 'BMW', 'Mercedes-Benz', 'Audi',
        'Ford', 'Chevrolet', 'Hyundai', 'Kia', 'Mitsubishi', 'Lexus',
        'Mazda', 'Volkswagen'
    ].sort();

    /* ---------------- STEP CONTROL ---------------- */
    const nextStep = () => setCurrentStep(s => Math.min(s + 1, 3));
    const prevStep = () => setCurrentStep(s => Math.max(s - 1, 1));

    const canStep1 = Name && Code && Whatsappno;
    const canStep2 = Year && Make && Model;

    /* ---------------- PART LOGIC ---------------- */
    const addPartField = () => {
        setPartInputs([
            ...partInputs,
            { id: Date.now(), value: '', suggestions: [], isCustom: false },
        ]);
    };

    const removePartField = (id) => {
        if (partInputs.length === 1) return;
        setPartInputs(partInputs.filter(p => p.id !== id));
    };

    const updatePartValue = (id, value) => {
        setPartInputs(partInputs.map(p => {
            if (p.id !== id) return p;

            if (value === 'custom') {
                return { ...p, value: '', isCustom: true, suggestions: [] };
            }

            const matches =
                value.length > 0 && !p.isCustom
                    ? formPartname.filter(part =>
                        part.toLowerCase().includes(value.toLowerCase())
                    )
                    : [];

            return { ...p, value, suggestions: matches, isCustom: false };
        }));
    };

    const selectSuggestion = (id, value) => {
        setPartInputs(partInputs.map(p =>
            p.id === id ? { ...p, value, suggestions: [] } : p
        ));
    };

    const getSelectedParts = () =>
        partInputs.map(p => p.value.trim()).filter(Boolean);

    /* ---------------- SUBMIT ---------------- */
    async function handleSubmit(e) {
        e.preventDefault();

        const dateTime = new Date()
            .toISOString()
            .slice(0, 19)
            .replace('T', ' ');

        await fetch('/api/g_sheet', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                Timestamp: dateTime,
                brand: Make,
                contact: Code + Whatsappno,
                name: Name,
                description:
                    `Customer: ${Name}\n` +
                    `Location: ${Address}\n` +
                    `Vehicle: ${Make} ${Model} ${Year}\n` +
                    `Parts: ${getSelectedParts().join(', ')}`,
                partList: getSelectedParts().join(', '),
                email: Email,
                year: Year,
                model: Model,
                address: Address,
            }),
        });

        alert('Form submitted successfully');

        setCurrentStep(1);
        setName('');
        setEmail('');
        setCode('');
        setWhatsappno('');
        setAddress('');
        setYear('');
        setMake('');
        setModel('');
        setPartInputs([{ id: 1, value: '', suggestions: [], isCustom: false }]);
    }

    /* ---------------- UI ---------------- */
    return (
        <div className="min-h-screen bg-gradient-to-br from-darkblue via-info to-purple px-4 py-12">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10">

                {/* MARKETING */}
                <div className="text-white space-y-6">
                    <h1 className="font-head text-5xl">
                        Auto Spare Parts <span className="text-gold">Inquiry</span>
                    </h1>
                    <p className="text-lg text-white/90">
                        Fast sourcing • Best prices • WhatsApp response
                    </p>
                    <ul className="space-y-2 text-sm">
                        <li>✔ OEM & Aftermarket</li>
                        <li>✔ UAE & International</li>
                        <li>✔ Secure & Trusted</li>
                    </ul>
                </div>

                {/* FORM */}
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                    <div className="bg-gradient-to-r from-bgform to-info p-6 text-white">
                        <h2 className="text-xl font-heading">
                            Step {currentStep} of 3
                        </h2>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 space-y-6">

                        {/* STEP 1 */}
                        {currentStep === 1 && (
                            <>
                                <input className="input-modern" placeholder="Full Name" value={Name} onChange={e => setName(e.target.value)} />
                                <input className="input-modern" placeholder="Email (optional)" value={Email} onChange={e => setEmail(e.target.value)} />

                                <div className="flex gap-3">
                                    <input className="input-modern w-1/4" placeholder="+971" value={Code} onChange={e => setCode(e.target.value)} />
                                    <input className="input-modern w-3/4" placeholder="WhatsApp Number" value={Whatsappno} onChange={e => setWhatsappno(e.target.value)} />
                                </div>

                                <button type="button" disabled={!canStep1} onClick={nextStep} className="btn-primary">
                                    Continue <ChevronRight />
                                </button>
                            </>
                        )}

                        {/* STEP 2 */}
                        {currentStep === 2 && (
                            <>
                                <input className="input-modern" placeholder="Year" value={Year} onChange={e => setYear(e.target.value)} />

                                <select className="input-modern" value={Make} onChange={e => setMake(e.target.value)}>
                                    <option value="">Select Make</option>
                                    {make.map(m => <option key={m}>{m}</option>)}
                                </select>

                                <select className="input-modern" value={Model} onChange={e => setModel(e.target.value)}>
                                    <option value="">Select Model</option>
                                    {[...new Set(formsData.filter(f => f.make === Make).map(f => f.model))].map(m => (
                                        <option key={m}>{m}</option>
                                    ))}
                                </select>

                                <div className="flex gap-3">
                                    <button type="button" onClick={prevStep} className="btn-secondary">Back</button>
                                    <button type="button" disabled={!canStep2} onClick={nextStep} className="btn-primary">Continue</button>
                                </div>
                            </>
                        )}

                        {/* STEP 3 */}
                        {currentStep === 3 && (
                            <>
                                {partInputs.map(part => (
                                    <div key={part.id} className="relative">
                                        <div className="flex gap-2">
                                            <input
                                                className="input-modern flex-1"
                                                placeholder={part.isCustom ? 'Custom part name' : 'Type part name'}
                                                value={part.value}
                                                onChange={e => updatePartValue(part.id, e.target.value)}
                                            />

                                            <button type="button" onClick={addPartField} className="px-4 rounded-xl bg-info text-white font-bold">+</button>

                                            <button
                                                type="button"
                                                onClick={() => removePartField(part.id)}
                                                disabled={partInputs.length === 1}
                                                className={`px-4 rounded-xl font-bold ${partInputs.length === 1
                                                    ? 'bg-gray-300 cursor-not-allowed'
                                                    : 'bg-red-500 text-white hover:bg-red-600'
                                                    }`}
                                            >
                                                ✕
                                            </button>
                                        </div>

                                        {!part.isCustom && part.suggestions.length > 0 && (
                                            <div className="absolute z-10 mt-1 w-full bg-white border rounded-xl shadow-lg">
                                                <div
                                                    className="px-4 py-2 text-info font-semibold cursor-pointer"
                                                    onClick={() => updatePartValue(part.id, 'custom')}
                                                >
                                                    ➕ Custom part
                                                </div>
                                                {part.suggestions.slice(0, 6).map(s => (
                                                    <div
                                                        key={s}
                                                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                                        onClick={() => selectSuggestion(part.id, s)}
                                                    >
                                                        {s}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}

                                <div className="flex gap-3 pt-4">
                                    <button type="button" onClick={prevStep} className="btn-secondary">Back</button>
                                    <button type="submit" disabled={getSelectedParts().length === 0} className="btn-primary">
                                        Submit Request
                                    </button>
                                </div>
                            </>
                        )}

                    </form>
                </div>
            </div>

            {/* UTIL */}
            <style jsx>{`
        .input-modern {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
        }
        .btn-primary {
          width: 100%;
          padding: 14px;
          border-radius: 14px;
          background: linear-gradient(to right, #0d358d, #0b5cff);
          color: white;
          font-weight: bold;
          display: flex;
          justify-content: center;
          gap: 8px;
        }
        .btn-secondary {
          width: 100%;
          padding: 14px;
          border-radius: 14px;
          background: #e5e7eb;
        }
      `}</style>
        </div>
    );
}