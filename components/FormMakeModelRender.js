'use client';
import { useState, useEffect } from 'react';
import {
    ChevronRight, Car, User, MapPin, Phone, Mail, CheckCircle,
    TimerIcon, FerrisWheel, CarFront, Settings, CarFrontIcon, Plus
} from 'lucide-react';
import { Fira_Sans, Playfair_Display } from 'next/font/google';

const playfair_display = Playfair_Display({
    subsets: ['latin'], display: 'swap', variable: '--font-playfair-display',
});
const firaSans = Fira_Sans({
    weight: ['400', '700'], subsets: ['latin'], display: 'swap', variable: '--font-fira-sans',
});

const POST_FILTER = [
    'AC Compressor', 'AC Condenser', 'AC Condenser Cooling Fan', 'AC Controls', 'AC Evaporator',
    'AC Evaporator Housing', 'AC Selector', 'Air Bag Assembly', 'Air Bag Control Module',
    'Air Bag Detector', 'Air Cleaner Assembly', 'Air Flow Meter', 'Air Injection Pump',
    'Air Ride Compressor', 'Air Ride Control Module', 'Air Filter', 'Alternator', 'Antenna',
    'Anti-Lock Brake Control Module', 'Anti-Theft Control Module', 'Axle Assembly', 'Axle Beam',
    'Axle Shaft', 'Back Glass', 'Backup Light', 'Battery', 'Bed', 'Bell Housing', 'Belt Tensioner',
    'Blower Motor', 'Body Control Module', 'Brake Booster', 'Brake Pads', 'Bumper Assembly',
    'Bumper Cover', 'Bumper Shock', 'Cab Clip', 'Caliper', 'Camshaft', 'Carburetor',
    'Carrier Assembly', 'Cassette Player', 'Catalytic Convertor', 'CD Changer', 'CD Player',
    'Chassis Control Module', 'Clock', 'Coil', 'Coil Spring', 'Column Shift Lever', 'Column Switch',
    'Computer', 'Console', 'Control Module', 'Convertible Top', 'Convertible Top Motor',
    'Coolant Reservoir', 'Cooling Fans Assembly', 'Cornering Light', 'Cowl', 'Crankshaft',
    'Cruise Control Module', 'Cylinder Block', 'Cylinder Head', 'Dashboard Assembly', 'Dashboard Pad',
    'Decklid', 'Decklid Pull Down Motor', 'Differential Assembly', 'Differential Case', 'Distributor',
    'Door Assembly', 'Door Glass', 'Door Handle', 'Door Lock Control Module', 'Door Motor',
    'Door Switch', 'Door Vent Glass', 'Door Vent Glass Regulator', 'Door Window Control Module',
    'Door Window Motor', 'Door Window Regulator', 'Drive Shaft', 'Driving Light', 'Engine Assembly',
    'Engine Block', 'Engine Control Module', 'Engine Mount', 'Engine Oil Cooler',
    'Engine Wiring Harness', 'Exhaust Manifold', 'Fan Blade', 'Fan Clutch', 'Fan Control Module',
    'Fender', 'Flywheel', 'Fog Light', 'Frame', 'Front End Assembly', 'Fuel Door',
    'Fuel Injection Pump', 'Fuel Pump', 'Fuel Sending Unit', 'Fuel Tank', 'Fuse Box', 'Glove Box',
    'GPS Control Module', 'GPS Screen', 'Grille', 'Gearbox', 'Hard Top', 'Harmonic Balancer',
    'Hatchback', 'Hatchback Glass', 'Header Panel Assembly', 'Headlight Assembly',
    'Headlight Bezel|Door', 'Headlight Control Module', 'Headlight Motor', 'Headlight Switch',
    'Heads Up Display', 'Heater Controls', 'Heater Core', 'Hood', 'Hood Hinge', 'Hood Piston|Strut',
    'Horn', 'Hub', 'Hub Cap', 'Ignition Control Module', 'Ignition Switch', 'Information Panel',
    'Instrument Cluster', 'Intake Manifold', 'Intercooler', 'Jack', 'Keyless Entry Control Module',
    'Knee Assembly', 'Knuckle', 'Leaf Spring', 'Lower Control Arm', 'Marker Light', 'Mass Air Flow Sensor',
    'Master Cylinder', 'Mirror', 'Mud Flaps', 'Multi-Function Control Module',
    'Navigation Control Module', 'Nose', 'Oil Pan', 'Oil Pump', 'Oxygen Sensor', 'Owners Manual',
    'Parklight', 'Pickup Bed', 'Pickup Cap|Topper', 'Piston', 'Power Steering Box',
    'Power Steering Control Module', 'Power Steering Control Valve', 'Power Steering Pump',
    'Proportioning Valve', 'Quarter Glass', 'Quarter Panel Assembly', 'Quarter Window Regulator',
    'Radiator', 'Radiator Cooling Fan', 'Radiator Shroud', 'Radiator Support', 'Radio', 'Rear Clip',
    'Relay', 'Reverse Light', 'Rim', 'Ring Gear and Pinion', 'Rocker Panel', 'Roll Bar',
    'Roof Assembly', 'Roof Glass', 'Roof Rack', 'Rotor', 'Running Board', 'Seat', 'Seat Belt',
    'Seat Belt Motor', 'Seat Belt Track', 'Seat Control Module', 'Seat Track',
    'Security System Control Module', 'Shifter Assembly', 'Shock Absorber', 'Slave Cylinder',
    'Soft Top', 'Spare Tire', 'Spare Tire Carrier', 'Speaker', 'Speedometer Cluster', 'Spindle',
    'Spoiler', 'Starter', 'Steering Box', 'Steering Column', 'Steering Rack', 'Steering Wheel',
    'Strut Assembly', 'Stub Axle', 'Sun Visor', 'Sunroof Assembly', 'Sunroof Glass', 'Sunroof Motor',
    'Supercharger', 'Suspension Assembly', 'Suspension Control Module', 'Suspension Crossmember',
    'Tailgate', 'Tailgate Glass', 'Tailgate Window Regulator', 'Taillight',
    'Temperature Control Module', 'Temperature Controls', 'Third Brake Light',
    'Throttle Body Assembly', 'Timing Cover', 'Tire', 'Torsion Bar', 'Traction Control Module',
    'Trailer Hitch', 'Trailing Arm', 'Transfer Case Adapter', 'Transfer Case Assembly',
    'Transfer Case Control Module', 'Transfer Case Shift Motor', 'Transmission Assembly',
    'Transmission Control Module', 'Transmission Torque Converter', 'T-Top', 'Turbocharger',
    'Turn Signal Light', 'Upper Control Arm', 'Vacuum Pump', 'Valance', 'Valve Cover',
    'Voltage Regulator', 'Washer Fluid Reservoir', 'Washer Motor', 'Water Pump', 'Wheel',
    'Wheel Cover', 'Windshield', 'Wiper Arm', 'Wiper Motor', 'Wiper Transmission', 'Bonnet',
    'Spark Plug', 'Toe Arms', 'Fender Liner', 'Suspension', 'AC Filter', 'Brake Disc', 'Fuel Filter',
    'Engine Gasket', 'Transmission Gear Filter', 'Oil Filter', 'Daytime Running Lights',
];

const POST_CITIES = [
    'Total Abu Al Bukhoosh Abu Dhabi', 'Abu Dhabi', 'Abu Musa Island', 'Ahmed bin Rashid Free Zone',
    'Ajman', 'Al Ain', 'Al Barsha', 'Al Dhafra or Western Region', 'Al Fujairah', 'Al Hamriyah',
    'AlJazeera Port', 'Al Jeer Port', 'Al Mafraq', 'Al Quoz', 'Al Sufouh',
    'Al Ruways Industrial City', 'Arzanah Island', 'Das Island', 'Deira', 'Dibba Al Fujairah',
    'Dubai', 'Dubai World Central', 'Esnnad', 'Sea Port', 'Free Port', 'Habshan', 'Abu Hail',
    'Hamriya Free Zone Port', 'Al Jarf', 'Hatta', 'Mina Jebel Ali', 'Jebel Ali Free Zone',
    'Al Dhannah City or Jebel Dhanna', 'Jumeirah', 'Kalba', 'Khalidiya', 'Khor Fakkan', 'Masfut',
    'Khalid Port', 'Khalifa City', 'Mina Rashid Port', 'Mina Saqr', 'Mina Zayed', 'Minhad', 'Mirfa',
    'Mubarek Tower', 'Mubarraz Island', 'Musaffah', 'Mussafah', 'Offshore Marine Services',
    'Port Rashid or Al Mina', 'Ras Al Khor Port', 'Rak Maritime City', 'Ras al Khaimah',
    'Ras Al Khor', 'Al Ras', 'Al Reem Island', 'Ruwais Port Abu Dhabi', 'Saadiyat Island',
    'Sharjah', 'Al Sila', 'Stevin Rock', 'Sweihan', 'The Palm Jumeirah', 'Umm al Nar',
    'Umm al Quwain', 'Al Qurayyah', 'Yas Island', 'Zirku Island', 'Sheikh Zayed Road',
    'Business Bay', 'Downtown Dubai', 'Al Badaa', 'Al Satwa', 'Zaabeel', 'Trade Centre',
    'Al Karama', 'Oud Metha', 'Al Jaddaf', 'Al Wasl', 'Al Safa', 'Umm Suqeim',
    'Jumeirah Village Circle', 'Dubai Investments Park', 'Mirdif', 'Al Twar', 'Al Khawaneej',
    'Al Warqa', 'Dubai Silicon Oasis', 'Al Thammam', 'Golf City', 'Umm Ramool', 'Al Qusais',
    'Al Nahda', 'Al Rashidiya', 'Nad al Sheba', 'Al Awir', 'Dubai South', 'Dubai Media City',
    'Al Mankhool', 'Al Mizhar', 'Nad Al Hamar', 'Dubai Festival City', 'Dubai International City',
    'Bu Shaghara', 'Discovery Gardens', 'Arabian Ranches', 'Dubai Motor City', 'Damac Hills',
    'Wadi al Safa', 'Muhaisnah', 'Muweileh', 'Jafiliyah', 'Al Mamzar', 'Sajja', 'City Walk',
];

const MAKES = [
    'Ford', 'Chrysler', 'Citroen', 'Hillman', 'Chevrolet', 'Cadillac', 'BMW', 'Austin', 'Fairthorpe',
    'Fillmore', 'Pontiac', 'Studebaker', 'Buick', 'Rambler', 'Plymouth', 'Volkswagen', 'Jensen',
    'Jetour', 'Oldsmobile', 'Sandstorm', 'Haval', 'Exeed', 'Skoda', 'Seres', 'Opel', 'Maxus',
    'Changan', 'Zarooq Motors', 'Soueast', 'TANK', 'Jaecoo', 'JAC', 'W Motors', 'Hongqi', 'GAC',
    'Foton', 'ZNA', 'Zeekr', 'Great Wall GWM', 'Dorcen', 'Chery', 'Geely', 'BAIC', 'Bestune',
    'Abarth', 'Mercury', 'Dodge', 'Shelby', 'Porsche', 'Toyota', 'Mercedes-Benz', 'MG', 'Nissan',
    'Honda', 'Mazda', 'Renault', 'Audi', 'Lincoln', 'Lotus', 'Maserati', 'Mitsubishi', 'Saab',
    'Subaru', 'Suzuki', 'Lamborghini', 'Merkur', 'Land Rover', 'Acura', 'Lexus', 'Eagle',
    'Alfa Romeo', 'Daihatsu', 'Geo', 'GMC', 'Hyundai', 'Infiniti', 'Isuzu', 'Jaguar', 'Jeep',
    'Saturn', 'Volvo', 'Kia', 'Holden', 'Corbin', 'Daewoo', 'MINI', 'Maybach', 'Scion', 'Spyker',
    'Aston Martin', 'Bentley', 'Panoz', 'Rolls-Royce', 'Ferrari', 'Hummer', 'Morgan', 'Peugeot',
    'Foose', 'Aptera', 'Smart', 'Bugatti', 'Tesla', 'Ram', 'Fiat', 'McLaren', 'BYD',
    'McLaren Automotive', 'Mobility Ventures LLC', 'Pagani', 'Roush Performance', 'smart', 'SRT',
    'Genesis', 'Karma', 'Koenigsegg', 'RUF Automobile', 'STI', 'Polestar', 'Kandi',
].sort();

export default function FormMakeModelRender({ formsData = [], mke, modl, page }) {
    const [currentStep, setCurrentStep] = useState(1);

    // Vehicle
    const [Year, setYear] = useState('');
    const [Make, setMake] = useState(mke);
    const [Model, setModel] = useState(modl);
    const [yearSuggestions, setYearSuggestions] = useState([]);

    // Parts
    const [formPartname, setFormPartname] = useState([]);
    const [currentPartInput, setCurrentPartInput] = useState('');
    const [currentPartSuggestions, setCurrentPartSuggestions] = useState([]);
    const [addedParts, setAddedParts] = useState([]);
    const [duplicateMessage, setDuplicateMessage] = useState('');
    const [Condition, setCondition] = useState([]);
    const [Timing, setTiming] = useState('');

    // Contact
    const [Name, setName] = useState('');
    const [Email, setEmail] = useState('');
    const [Whatsappno, setWhatsappno] = useState('');
    const [textCity, setCityText] = useState('');
    const [suggestionCity, setCitySuggestion] = useState([]);
    const [formCities, setFormCities] = useState([]);

    // Submission
    const [submissionData, setSubmissionData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Load parts & cities into state once
    useEffect(() => { setFormPartname(POST_FILTER); }, []);
    useEffect(() => { setFormCities(POST_CITIES); }, []);

    // Reset year when make/model changes
    useEffect(() => { setYear(''); setYearSuggestions([]); }, [Make, Model]);

    // ── City autocomplete ──
    const onPartCityChange = val => {
        setCityText(val);
        if (val.length > 0) {
            const re = new RegExp(val, 'gi');
            setCitySuggestion(formCities.filter(c => c.match(re)));
        } else {
            setCitySuggestion([]);
        }
    };

    // ── Part autocomplete ──
    const handlePartInputChange = val => {
        setCurrentPartInput(val);
        setCurrentPartSuggestions(
            val.length > 0
                ? formPartname.filter(p => p.toLowerCase().includes(val.toLowerCase()))
                : []
        );
    };

    const addPart = () => {
        const trimmed = currentPartInput.trim();
        if (!trimmed) return;
        if (addedParts.includes(trimmed)) {
            setDuplicateMessage(`"${trimmed}" is already added!`);
            setTimeout(() => setDuplicateMessage(''), 3000);
            return;
        }
        setAddedParts(prev => [...prev, trimmed]);
        setCurrentPartInput('');
        setCurrentPartSuggestions([]);
        setDuplicateMessage('');
    };

    const removePart = part => setAddedParts(prev => prev.filter(p => p !== part));

    // ── Navigation ──
    const nextStep = () => setCurrentStep(s => Math.min(s + 1, 4));
    const prevStep = () => setCurrentStep(s => Math.max(s - 1, 1));

    const canProceedStep1 = Year && Make && Model;
    const canProceedStep2 = addedParts.length > 0 && Condition.length > 0 && !!Timing;
    const canProceedStep3 = Name && Whatsappno && textCity;

    // ── Submit ──
    async function handleSubmit(e) {
        e.preventDefault();
        if (isLoading || !canProceedStep3) return;
        setIsLoading(true);
        try {
            const now = new Date();
            const dateTime = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
            const partsText = addedParts.join(', ');
            const conditionText = Condition.join(', ');

            await fetch('/api/g_sheet', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    Timestamp: dateTime,
                    brand: Make,
                    contact: Whatsappno,
                    name: Name,
                    description: `Customer Name: ${Name}\nAddress: ${textCity}\nVehicle: ${Make} ${Model} ${Year}\nPart List: ${partsText}\nRemarks: ${conditionText} ${Timing}`,
                    partList: partsText,
                    email: Email,
                    year: Year,
                    model: Model,
                    address: textCity,
                    timing: Timing,
                    condition: conditionText,
                    page: page
                }),
            });

            setSubmissionData({
                date: dateTime, vehicle: `${Year} ${Make} ${Model}`, parts: partsText,
                name: Name, location: textCity, phone: Whatsappno, email: Email,
                condition: conditionText, timing: Timing
            });
            setCurrentStep(4);

            // Reset fields
            setYear(''); setMake(''); setModel(''); setYearSuggestions([]);
            setAddedParts([]); setCurrentPartInput(''); setCurrentPartSuggestions([]);
            setCondition([]); setTiming('');
            setName(''); setEmail(''); setWhatsappno(''); setCityText(''); setCitySuggestion([]);
        } catch (err) {
            console.error('Submission error:', err);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div>
            <div className="rounded-3xl shadow-2xl overflow-visible">

                {/* Header + Step indicator — always rendered */}
                <div className="bg-gradient-to-r p-6 xxs:p-3" id="myForm">
                    <CarFrontIcon className="w-16 h-16 xs:h-10 xs:w-10 xxs:h-10 xxs:w-10 rounded-full mx-auto border-blue-800 border-4 bg-blue-900 text-white" />
                    <div className="text-center">
                        <h6 className={`text-3xl py-10 xs:py-5 xxs:py-5 sm:py-5 ${playfair_display.className} font-bold`}>
                            Inquiry Form
                        </h6>
                    </div>
                    <div className="flex items-center mb-4">
                        {[1, 2, 3, 4].map(step => (
                            <div key={step} className="flex items-center mx-auto text-center flex-1">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${firaSans.className} ${currentStep >= step ? 'bg-blue-400 text-blue-600' : 'bg-blue-100 text-black'}`}>
                                    {step}
                                </div>
                                {step < 4 && (
                                    <div className={`flex-1 h-1 mx-2 rounded transition-all ${currentStep > step ? 'bg-black' : 'bg-blue-700'}`} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <form onSubmit={handleSubmit} method="POST"
                    className="p-8 xs:p-4 xxs:p-4 sm:p-6 border-2 rounded-lg bg-transparent">

                    {/* ── STEP 1: Vehicle ── */}
                    <div style={{ display: currentStep === 1 ? 'block' : 'none' }}
                        aria-hidden={currentStep !== 1}>
                        <div className="space-y-6 animate-fadeIn">
                            <div className="space-y-4">
                                <div className="flex items-left text-xl gap-2 font-semibold text-black mb-2">
                                    <CarFront className="w-6 h-6" /> Select Your Vehicle
                                </div>

                                <div>
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                        <Car className="w-4 h-4" /> Make
                                    </label>
                                    <select required onChange={e => setMake(e.target.value)} value={Make}
                                        className="w-full border-2 border-gray-200 rounded-xl py-3 px-4 text-gray-700 focus:outline-none focus:border-purple-500 transition-colors">
                                        <option value="" disabled>Select vehicle make</option>
                                        {MAKES.map((m, i) => <option key={i}>{m}</option>)}
                                    </select>
                                </div>

                                <div>
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                        <Car className="w-4 h-4" /> Model
                                    </label>
                                    <select required onChange={e => setModel(e.target.value)} value={Model}
                                        disabled={!Make}
                                        className="w-full border-2 border-gray-200 rounded-xl py-3 px-4 text-gray-700 focus:outline-none focus:border-purple-500 transition-colors">
                                        <option value="" disabled>Select vehicle model</option>
                                        {[...new Set(formsData.filter(s => s.make === Make).map(s => s.model))]
                                            .map((model, i) => <option key={i} value={model}>{model}</option>)}
                                    </select>
                                </div>

                                <div>
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                        <Car className="w-4 h-4" /> Year
                                    </label>
                                    <div className="relative">
                                        <input type="text" required placeholder="Search or type year (e.g., 2020)"
                                            value={Year} disabled={!Make || !Model}
                                            onKeyDown={e => { if (e.key === 'Enter' && canProceedStep1) { e.preventDefault(); nextStep(); } }}
                                            onChange={e => {
                                                const v = e.target.value;
                                                setYear(v);
                                                const all = [];
                                                for (let y = 1900; y <= 2027; y++) all.push(y);
                                                setYearSuggestions(v.length > 0 ? all.filter(y => y.toString().includes(v)) : []);
                                            }}
                                            className="w-full border-2 border-gray-200 rounded-xl py-3 px-4 text-gray-700 focus:outline-none focus:border-purple-500 transition-colors"
                                        />
                                        {yearSuggestions.length > 0 && Year && (
                                            <div className="absolute z-10 mt-1 w-full bg-white border-2 border-gray-200 rounded-xl shadow-lg max-h-64 overflow-y-auto">
                                                {[...yearSuggestions].sort((a, b) => a - b).map((yr, i) => (
                                                    <div key={i} className="px-4 py-3 cursor-pointer hover:bg-purple-50 transition-colors"
                                                        onClick={() => { setYear(yr.toString()); setYearSuggestions([]); }}>
                                                        {yr}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <button type="button" onClick={nextStep} disabled={!canProceedStep1}
                                className={`w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all ${canProceedStep1 ? 'bg-gradient-to-r from-blue-600 to-blue-300 hover:from-blue-700 hover:to-purple-700 shadow-lg' : 'bg-gray-300 cursor-not-allowed'}`}>
                                Continue to Part Details <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* ── STEP 2: Parts ── */}
                    <div style={{ display: currentStep === 2 ? 'block' : 'none' }}
                        aria-hidden={currentStep !== 2}>
                        <div className="space-y-6 animate-fadeIn">
                            <div className="flex items-left text-xl gap-2 font-semibold text-black mb-2">
                                <Settings className="w-6 h-6" /> Select Required Parts
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                    <FerrisWheel className="w-4 h-4" /> Part Name
                                </label>

                                {duplicateMessage && (
                                    <div className="mb-3 bg-yellow-50 border-2 border-yellow-300 rounded-xl p-3 flex items-center gap-2 text-yellow-800">
                                        <span className="text-xl">⚠️</span>
                                        <span className="font-semibold">{duplicateMessage}</span>
                                    </div>
                                )}

                                <select hidden aria-hidden="true"
                                    className="w-full border-2 border-gray-200 rounded-xl py-3 px-4 text-gray-700 focus:outline-none focus:border-purple-500 transition-colors">
                                    <option value="" disabled>Select vehicle make</option>
                                    {POST_FILTER.map((m, i) => <option key={i}>{m}</option>)}
                                </select>

                                <div className="mb-4">
                                    <div className="text-sm font-semibold text-gray-700 mb-2">
                                        Search or type part name, then click the green button to add
                                    </div>
                                    <div className="relative">
                                        <div className="flex gap-2">
                                            <input
                                                className="flex-1 border-2 border-blue-300 rounded-xl py-3 px-4 xs:px-2 xxs:px-3 text-gray-700 focus:outline-none focus:border-blue-500 transition-colors"
                                                placeholder="🔎 Search or type part name..."
                                                value={currentPartInput}
                                                onChange={e => handlePartInputChange(e.target.value)}
                                                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addPart(); } }}
                                            />
                                            <button type="button" onClick={addPart} disabled={!currentPartInput.trim()}
                                                className={`px-4 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${currentPartInput.trim() ? 'bg-green-500 hover:bg-green-600 text-white shadow-md' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}>
                                                <Plus className="w-5 h-5" /> Add
                                            </button>
                                        </div>
                                        {currentPartSuggestions.length > 0 && (
                                            <div className="absolute z-10 mt-1 w-full bg-white border-2 border-gray-200 rounded-xl shadow-lg max-h-64 overflow-y-auto">
                                                {currentPartSuggestions.map(s => (
                                                    <div key={s} className="px-4 py-3 cursor-pointer hover:bg-blue-50 transition-colors"
                                                        onClick={() => { setCurrentPartInput(s); setCurrentPartSuggestions([]); }}>
                                                        {s}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <div className="text-sm font-semibold text-gray-700 mb-2 pb-2 border-b-2 border-gray-200">
                                        Selected Parts {addedParts.length > 0 && `(${addedParts.length})`}
                                    </div>
                                    {addedParts.length > 0 && (
                                        <button type="button" onClick={() => { setAddedParts([]); setDuplicateMessage(''); }}
                                            className="text-sm ml-auto block text-right text-red-600 hover:text-red-800 font-semibold mb-2">
                                            ✕ Clear All Parts
                                        </button>
                                    )}
                                    {addedParts.length > 0 ? (
                                        <div className="flex flex-wrap gap-2">
                                            {addedParts.map((part, i) => (
                                                <div key={i} className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                                                    <span>{part}</span>
                                                    <button type="button" onClick={() => removePart(part)}
                                                        className="hover:bg-blue-200 rounded-full p-1 transition-colors" title="Remove part">
                                                        ✕
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-gray-400 text-sm italic py-4 text-center bg-gray-50 rounded-xl">
                                            No parts added yet. Search or type a part name above and click Add.
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Condition */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                                    <FerrisWheel className="w-4 h-4" /> Part Condition/Type
                                </label>
                                <div className="grid grid-cols-3 xs:grid-cols-1 xxs:grid-cols-1 sm:grid-cols-1 gap-3 xs:gap-0 xxs:gap-0 sm:gap-0">
                                    {['Used', 'New', 'Genuine', 'Non-Genuine', 'Any'].map(opt => (
                                        <label key={opt} className="flex items-center gap-3 rounded-xl px-4 py-3 xs:py-0 xxs:py-0 sm:py-1 cursor-pointer hover:border-purple-400">
                                            <input type="checkbox" checked={Condition.includes(opt)}
                                                onChange={() => setCondition(prev => prev.includes(opt) ? prev.filter(x => x !== opt) : [...prev, opt])}
                                                className="w-4 h-4 accent-purple-500" />
                                            <span className="text-sm font-medium text-gray-700">{opt}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Timing */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                                    <TimerIcon className="w-4 h-4" /> When do you need the part
                                </label>
                                <div className="grid grid-cols-3 xs:grid-cols-1 xxs:grid-cols-1 sm:grid-cols-1 gap-3 xs:gap-0 xxs:gap-0 sm:gap-0">
                                    {['Urgent', 'Not Urgent', 'Just Quote'].map(opt => (
                                        <label key={opt} className={`flex items-center gap-3 rounded-xl px-4 py-3 xs:py-0 xxs:py-0 sm:py-1 cursor-pointer ${Timing === opt ? 'bg-purple-50' : 'hover:border-purple-400'}`}>
                                            <input type="radio" name="timing" value={opt} checked={Timing === opt}
                                                onChange={e => setTiming(e.target.value)} className="w-4 h-4 accent-purple-500" />
                                            <span className="text-sm font-medium text-gray-700">{opt}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button type="button" onClick={prevStep}
                                    className="flex-1 border-2 border-blue-300 rounded-xl py-3 px-4 text-gray-700 focus:outline-none transition-colors">
                                    Back
                                </button>
                                <button type="button" onClick={nextStep} disabled={!canProceedStep2}
                                    className={`w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all ${canProceedStep2 ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg' : 'bg-gray-300 cursor-not-allowed'}`}>
                                    Continue to Personal Details <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* ── STEP 3: Contact ── */}
                    <div style={{ display: currentStep === 3 ? 'block' : 'none' }}
                        aria-hidden={currentStep !== 3}>
                        <div className="space-y-6 animate-fadeIn">
                            <div className="space-y-4">
                                <div className="flex items-left text-xl gap-2 font-semibold text-black mb-2">
                                    <User className="w-6 h-6" /> Contact Information
                                </div>

                                <div>
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                        <User className="w-4 h-4" /> Full Name
                                    </label>
                                    <input type="text" placeholder="Enter your full name" value={Name}
                                        onChange={e => setName(e.target.value)} required
                                        className="w-full border-2 border-gray-200 rounded-xl py-3 px-4 text-gray-700 focus:outline-none focus:border-purple-500 transition-colors" />
                                </div>

                                <div>
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                        <Mail className="w-4 h-4" /> Email <span className="text-gray-400 font-normal">(optional)</span>
                                    </label>
                                    <input type="email" placeholder="your.email@example.com" value={Email}
                                        onChange={e => setEmail(e.target.value)}
                                        className="w-full border-2 border-gray-200 rounded-xl py-3 px-4 text-gray-700 focus:outline-none focus:border-purple-500 transition-colors" />
                                </div>

                                <div>
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                        <Phone className="w-4 h-4" /> WhatsApp Number
                                    </label>
                                    <input type="text" placeholder="+971501234567" value={Whatsappno} required
                                        onChange={e => setWhatsappno(e.target.value.replace(/[^\d+]/g, ''))}
                                        className="w-full border-2 border-gray-200 rounded-xl py-3 px-4 text-gray-700 focus:outline-none focus:border-purple-500 transition-colors" />
                                </div>
                                <select hidden aria-hidden="true"
                                    className="w-full border-2 border-gray-200 rounded-xl py-3 px-4 text-gray-700 focus:outline-none focus:border-purple-500 transition-colors">
                                    {POST_CITIES.map((m, i) => <option key={i}>{m}</option>)}
                                </select>

                                <div>
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                        <MapPin className="w-4 h-4" /> Location
                                    </label>
                                    <input type="text" placeholder="Area, Emirates (e.g., Dubai Marina, Dubai)"
                                        value={textCity} onChange={e => onPartCityChange(e.target.value)}
                                        className="w-full border-2 border-gray-200 rounded-xl py-3 px-4 text-gray-700 focus:outline-none focus:border-purple-500 transition-colors" />
                                    {suggestionCity.length > 0 && (
                                        <div className="z-10 mt-1 w-full bg-white rounded-xl max-h-64 overflow-y-auto border border-gray-200">
                                            {suggestionCity.map((s, i) => (
                                                <div key={i} className="cursor-pointer p-2 hover:bg-gray-50"
                                                    onClick={() => { setCityText(s); setCitySuggestion([]); }}>
                                                    {s}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button type="button" onClick={prevStep}
                                    className="flex-1 py-4 rounded-xl font-bold text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors">
                                    Back
                                </button>
                                <button type="submit" disabled={!canProceedStep3 || isLoading}
                                    className={`flex-1 py-4 xs:py-2 xxs:py-2 sm:py-2 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all ${canProceedStep3 && !isLoading ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg' : 'bg-gray-300 cursor-not-allowed'}`}>
                                    {isLoading ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            Submitting...
                                        </>
                                    ) : (
                                        <><CheckCircle className="w-5 h-5" /> Submit Inquiry</>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* ── STEP 4: Success ── */}
                    <div style={{ display: currentStep === 4 ? 'block' : 'none' }}
                        aria-hidden={currentStep !== 4}>
                        {submissionData && (
                            <div className="text-center space-y-6 animate-fadeIn">
                                <CheckCircle className="w-24 h-24 text-green-500 mx-auto" />
                                <h2 className="text-3xl font-bold text-gray-800">Inquiry Submitted Successfully!</h2>
                                <p className="text-gray-600">Our team will contact you based on stock availability.</p>
                                <div className="bg-gray-50 rounded-2xl p-6 text-left space-y-3">
                                    <h3 className="font-semibold text-lg text-gray-800">Inquiry Details</h3>
                                    <p><strong>Name:</strong> {submissionData.name}</p>
                                    <p><strong>Phone:</strong> {submissionData.phone}</p>
                                    <p><strong>Email:</strong> {submissionData.email || '—'}</p>
                                    <p><strong>Location:</strong> {submissionData.location}</p>
                                    <p><strong>Vehicle:</strong> {submissionData.vehicle}</p>
                                    <p><strong>Parts:</strong> {submissionData.parts}</p>
                                    <p><strong>Condition:</strong> {submissionData.condition}</p>
                                    <p><strong>Timing:</strong> {submissionData.timing}</p>
                                    <p className="text-sm text-gray-400">Submitted on {submissionData.date}</p>
                                </div>
                                <button onClick={() => { setSubmissionData(null); setCurrentStep(1); }}
                                    className="mt-6 px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-xl">
                                    Submit Another Inquiry
                                </button>
                            </div>
                        )}
                    </div>

                </form>
            </div>
        </div>
    );
}