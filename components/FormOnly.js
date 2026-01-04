'use client';
import { useState, useEffect } from 'react';
import { ChevronRight, Car, User, MapPin, Phone, Mail, CheckCircle, TimerIcon, FerrisWheel, CarFront, Settings2, Settings, CarFrontIcon, Plus, CirclePlus } from 'lucide-react';
import { Fira_Sans, Playfair_Display } from 'next/font/google';

const playfair_display = Playfair_Display({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-playfair-display',
});

const firaSans = Fira_Sans({
    weight: ['400', '700'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-fira-sans',
});

export default function FormOnly({ formsData = [] }) {
    const [currentStep, setCurrentStep] = useState(1);
    const [Year, setYear] = useState('');
    const [Make, setMake] = useState('');
    const [Model, setModel] = useState('');
    const [Email, setEmail] = useState('');
    const [Whatsappno, setWhatsappno] = useState('');
    const [formPartname, setFormPartname] = useState([]);
    const [text, setText] = useState('');
    const [suggestion, setSuggestion] = useState([]);
    const [Address, setAddress] = useState('');


    const [Name, setName] = useState('');
    const [Code, setCode] = useState('');
    const [submissionData, setSubmissionData] = useState(null);
    const [partInputs, setPartInputs] = useState([
        { id: 1, value: '', suggestions: [], isCustom: false },
    ]);
    const [nextPartId, setNextPartId] = useState(2);
    const [formCities, setFormCities] = useState([]);
    const [suggestionCity, setCitySuggestion] = useState([]);
    const [textCity, setCityText] = useState('');
    const [Condition, setCondition] = useState([]);
    const [Timing, setTiming] = useState('');
    const [currentPartInput, setCurrentPartInput] = useState('');
    const [currentPartSuggestions, setCurrentPartSuggestions] = useState([]);
    const [isCustomPart, setIsCustomPart] = useState(false);
    const [addedParts, setAddedParts] = useState([]);
    const [duplicateMessage, setDuplicateMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [yearSuggestions, setYearSuggestions] = useState([]);

    useEffect(() => {
        setYear('');
        setYearSuggestions([]);
    }, [Make, Model]);



    const postFilter = ['AC Compressor',
        'AC Condenser',
        'AC Condenser Cooling Fan',
        'AC Controls',
        'AC Evaporator',
        'AC Evaporator Housing',
        'AC Selector',
        'Air Bag Assembly',
        'Air Bag Control Module',
        'Air Bag Detector',
        'Air Cleaner Assembly',
        'Air Flow Meter',
        'Air Injection Pump',
        'Air Ride Compressor',
        'Air Ride Control Module',
        'Air Filter',
        'Alternator',
        'Antenna',
        'Anti-Lock Brake Control Module',
        'Anti-Theft Control Module',
        'Axle Assembly',
        'Axle Beam',
        'Axle Beam',
        'Axle Shaft',
        'Back Glass',
        'Backup Light',
        'Battery',
        'Bed',
        'Bell Housing',
        'Belt Tensioner',
        'Blower Motor',
        'Body Control Module',
        'Brake Booster',
        'Brake Pads',
        'Bumper Assembly',
        'Bumper Cover',
        'Bumper Shock',
        'Cab Clip',
        'Caliper',
        'Camshaft',
        'Carburetor',
        'Carrier Assembly',
        'Cassette Player',
        'Catalytic Convertor',
        'CD Changer',
        'CD Player',
        'Chassis Control Module',
        'Clock',
        'Coil',
        'Coil Spring',
        'Coil Spring',
        'Column Shift Lever',
        'Column Switch',
        'Computer',
        'Console',
        'Control Module',
        'Convertible Top',
        'Convertible Top Motor',
        'Coolant Reservoir',
        'Cooling Fans Assembly',
        'Cornering Light',
        'Cowl',
        'Crankshaft',
        'Cruise Control Module',
        'Cylinder Block',
        'Cylinder Head',
        'Dashboard Assembly',
        'Dashboard Pad',
        'Decklid',
        'Decklid Pull Down Motor',
        'Differential Assembly',
        'Differential Assembly',
        'Differential Case',
        'Distributor',
        'Door Assembly',
        'Door Assembly',
        'Door Glass',
        'Door Glass',
        'Door Handle',
        'Door Handle',
        'Door Lock Control Module',
        'Door Motor',
        'Door Switch',
        'Door Vent Glass',
        'Door Vent Glass',
        'Door Vent Glass Regulator',
        'Door Window Control Module',
        'Door Window Motor',
        'Door Window Motor',
        'Door Window Regulator',
        'Door Window Regulator',
        'Drive Shaft',
        'Drive Shaft',
        'Driving Light',
        'Engine Assembly',
        'Engine Block',
        'Engine Control Module',
        'Engine Mount',
        'Engine Oil Cooler',
        'Engine Wiring Harness',
        'Exhaust Manifold',
        'Fan Blade',
        'Fan Clutch',
        'Fan Control Module',
        'Fender',
        'Fender',
        'Flywheel',
        'Fog Light',
        'Frame',
        'Frame',
        'Front End Assembly',
        'Fuel Door',
        'Fuel Injection Pump',
        'Fuel Pump',
        'Fuel Sending Unit',
        'Fuel Tank',
        'Fuse Box',
        'Glove Box',
        'GPS Control Module',
        'GPS Screen',
        'Grille',
        'Gearbox',
        'Hard Top',
        'Harmonic Balancer',
        'Hatchback',
        'Hatchback Glass',
        'Header Panel Assembly',
        'Headlight Assembly',
        'Headlight Bezel|Door',
        'Headlight Control Module',
        'Headlight Motor',
        'Headlight Switch',
        'Heads Up Display',
        'Heater Controls',
        'Heater Core',
        'Hood',
        'Hood Hinge',
        'Hood Piston|Strut',
        'Horn',
        'Hub',
        'Hub Cap',
        'Ignition Control Module',
        'Ignition Switch',
        'Information Panel',
        'Instrument Cluster',
        'Intake Manifold',
        'Intercooler',
        'Jack',
        'Keyless Entry Control Module',
        'Knee Assembly',
        'Knuckle',
        'Leaf Spring',
        'Leaf Spring',
        'Lower Control Arm',
        'Lower Control Arm',
        'Marker Light',
        'Marker Light',
        'Mass Air Flow Sensor',
        'Master Cylinder',
        'Master Cylinder',
        'Master Cylinder',
        'Mirror',
        'Mirror',
        'Mirror',
        'Mud Flaps',
        'Multi-Function Control Module',
        'Navigation Control Module',
        'Nose',
        'Oil Pan',
        'Oil Pan',
        'Oil Pump',
        'Oxygen Sensor',
        'Owners Manual',
        'Parklight',
        'Pickup Bed',
        'Pickup Cap|Topper',
        'Piston',
        'Power Steering Box',
        'Power Steering Control Module',
        'Power Steering Control Valve',
        'Power Steering Pump',
        'Proportioning Valve',
        'Quarter Glass',
        'Quarter Panel Assembly',
        'Quarter Window Regulator',
        'Radiator',
        'Radiator Cooling Fan',
        'Radiator Shroud',
        'Radiator Support',
        'Radio',
        'Rear Clip',
        'Relay',
        'Reverse Light',
        'Rim',
        'Ring Gear and Pinion',
        'Rocker Panel',
        'Roll Bar',
        'Roof Assembly',
        'Roof Glass',
        'Roof Rack',
        'Rotor',
        'Rotor',
        'Running Board',
        'Seat',
        'Seat',
        'Seat',
        'Seat Belt',
        'Seat Belt Motor',
        'Seat Belt Track',
        'Seat Control Module',
        'Seat Track',
        'Security System Control Module',
        'Shifter Assembly',
        'Shock Absorber',
        'Slave Cylinder',
        'Soft Top',
        'Spare Tire',
        'Spare Tire Carrier',
        'Speaker',
        'Speedometer Cluster',
        'Spindle',
        'Spoiler',
        'Spoiler',
        'Starter',
        'Steering Box',
        'Steering Column',
        'Steering Rack',
        'Steering Wheel',
        'Strut Assembly',
        'Strut Assembly',
        'Stub Axle',
        'Sun Visor',
        'Sunroof Assembly',
        'Sunroof Glass',
        'Sunroof Motor',
        'Supercharger',
        'Suspension Assembly',
        'Suspension Control Module',
        'Suspension Crossmember',
        'Tailgate',
        'Tailgate Glass',
        'Tailgate Window Regulator',
        'Taillight',
        'Temperature Control Module',
        'Temperature Controls',
        'Third Brake Light',
        'Throttle Body Assembly',
        'Timing Cover',
        'Tire',
        'Torsion Bar',
        'Traction Control Module',
        'Trailer Hitch',
        'Trailing Arm',
        'Transfer Case Adapter',
        'Transfer Case Assembly',
        'Transfer Case Control Module',
        'Transfer Case Shift Motor',
        'Transmission Assembly',
        'Transmission Control Module',
        'Transmission Torque Converter',
        'T-Top',
        'Turbocharger',
        'Turn Signal Light',
        'Upper Control Arm',
        'Upper Control Arm',
        'Vacuum Pump',
        'Valance',
        'Valance',
        'Valve Cover',
        'Voltage Regulator',
        'Washer Fluid Reservoir',
        'Washer Motor',
        'Washer Motor',
        'Water Pump',
        'Wheel',
        'Wheel Cover',
        'Windshield',
        'Wiper Arm',
        'Wiper Motor',
        'Wiper Motor',
        'Wiper Transmission',
        'Bonnet',
        'Spark Plug',
        'Toe Arms',
        'Fender Liner',
        'Suspension',
        'AC Filter',
        'Brake Disc',
        'Fuel Filter',
        'Engine Gasket',
        'Transmission Gear Filter',
        'Oil Filter',]

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

    useEffect(() => {
        const loadPart = async () => {
            var part = [];
            for (var i in postFilter) {
                var filtered = postFilter[i];
                part.push(filtered);
            }
            setFormPartname(part);
        };
        loadPart();
    }, [postFilter]);

    useEffect(() => {
        setYear('');
    }, [Make, Model]);

    const onSuggestionHandler = text => {
        setText(text);
        setSuggestion([]);
    };

    const onPartFormChange = text => {
        let matches = [];
        if (text.length > 0) {
            matches = formPartname.filter(part => {
                const regex = new RegExp(`${text}`, 'gi');
                return part.match(regex);
            });
        }
        setSuggestion(matches);
        setText(text);
    };



    const ma = [
        'Ford', 'Chrysler', 'Citroen', 'Hillman', 'Chevrolet', 'Cadillac', 'BMW', 'Austin', 'Fairthorpe',
        'Fillmore', 'Pontiac', 'Studebaker', 'Buick', 'Rambler', 'Plymouth', 'Volkswagen', 'Jensen', 'Jetour',
        'Oldsmobile', 'Sandstorm', 'Haval', 'Exeed', 'Skoda', 'Seres', 'Opel', 'Maxus', 'Changan',
        'Zarooq Motors', 'Soueast', 'TANK', 'Jaecoo', 'JAC', 'W Motors', 'Hongqi', 'GAC', 'Foton', 'ZNA',
        'Zeekr', 'Great Wall GWM', 'Dorcen', 'Chery', 'Geely', 'BAIC', 'Bestune', 'Abarth', 'Mercury', 'Dodge',
        'Shelby', 'Porsche', 'Toyota', 'Mercedes-Benz', 'MG', 'Nissan', 'Honda', 'Mazda', 'Renault', 'Audi',
        'Lincoln', 'Lotus', 'Maserati', 'Mitsubishi', 'Saab', 'Subaru', 'Suzuki', 'Lamborghini', 'Merkur',
        'Land Rover', 'Acura', 'Lexus', 'Eagle', 'Alfa Romeo', 'Daihatsu', 'Geo', 'GMC', 'Hyundai', 'Infiniti',
        'Isuzu', 'Jaguar', 'Jeep', 'Saturn', 'Volvo', 'Kia', 'Holden', 'Corbin', 'Daewoo', 'MINI', 'Maybach',
        'Scion', 'Spyker', 'Aston Martin', 'Bentley', 'Panoz', 'Rolls-Royce', 'Ferrari', 'Hummer', 'Morgan',
        'Peugeot', 'Foose', 'Aptera', 'Smart', 'Bugatti', 'Tesla', 'Ram', 'Fiat', 'McLaren', 'BYD',
        'McLaren Automotive', 'Mobility Ventures LLC', 'Pagani', 'Roush Performance', 'smart', 'SRT', 'Genesis',
        'Karma', 'Koenigsegg', 'RUF Automobile', 'STI', 'Polestar', 'Kandi'
    ];
    const make = ma.sort();

    async function handleSubmit(event) {
        event.preventDefault();
        setIsLoading(true);

        try {
            const today = new Date();
            const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
            const dateTime = date + ' ' + time;

            const partsText = addedParts.join(', ');
            const conditionText = Condition.join(', ').toString();

            const submissionInfo = {
                date: dateTime,
                vehicle: `${Year} ${Make} ${Model}`,
                parts: partsText,
                name: Name,
                location: textCity,
                phone: Code + Whatsappno,
                email: Email,
                condition: conditionText,
                timing: Timing,
            };



            const response = await fetch(`/api/g_sheet`, {
                method: 'POST',
                body: JSON.stringify({
                    Timestamp: dateTime,
                    brand: Make,
                    contact: Whatsappno,
                    name: Name,
                    description: 'Customer Name: ' + Name + '\n' + 'Address: ' + textCity + '\n' + 'Vehicle: ' + Make + ' ' + Model + ' ' + Year + '\n' + 'Part List: ' + partsText + '\n' + 'Remarks: ' + Condition + ' ' + Timing,
                    partList: partsText,
                    email: Email,
                    year: Year,
                    model: Model,
                    address: textCity,
                    timing: Timing || '',
                    condition: conditionText || '',
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setSubmissionData(submissionInfo);
            setCurrentStep(4);
            setYearSuggestions('')
            setYear('')
            setMake('')
            setModel('')
            setPartInputs([{ id: 1, value: '', suggestions: [], isCustom: false }]);
            setAddedParts([]);
            setCitySuggestion('')
            setCityText('')
            setEmail('')
            setTiming('')
            setWhatsappno('')
            setName('')
            setCurrentPartInput('');
            setCurrentPartSuggestions([]);
            setIsCustomPart(false);

        } catch (error) {
            console.error('Submission error:', error);
        } finally {
            setIsLoading(false);
        }
    }

    const nextStep = () => {
        if (currentStep < 3) setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const canProceedStep1 = Year && Make && Model;
    const canProceedStep3 = Name && Whatsappno;

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

            if (p.isCustom && value !== 'custom') {
                return { ...p, value, suggestions: [] };
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


    const getSelectedParts = () =>
        partInputs.map(p => p.value.trim()).filter(Boolean);

    const canProceedStep2 = addedParts.length > 0;

    const handlePartInputChange = (value) => {
        setCurrentPartInput(value);

        const matches = value.length > 0
            ? formPartname.filter(part =>
                part.toLowerCase().includes(value.toLowerCase())
            )
            : [];

        setCurrentPartSuggestions(matches);
    };

    const addPart = () => {
        const trimmedValue = currentPartInput.trim();

        if (!trimmedValue) {
            return;
        }

        // Check if part already exists
        if (addedParts.includes(trimmedValue)) {
            setDuplicateMessage(`"${trimmedValue}" is already added!`);
            setTimeout(() => setDuplicateMessage(''), 3000);
            return;
        }

        setAddedParts([...addedParts, trimmedValue]);
        setCurrentPartInput('');
        setCurrentPartSuggestions([]);
        setDuplicateMessage('');
    };

    const removePart = (partToRemove) => {
        setAddedParts(addedParts.filter(part => part !== partToRemove));
    };

    const selectSuggestion = (value) => {
        setCurrentPartInput(value);
        setCurrentPartSuggestions([]);
    };

    const switchToCustom = () => {
        setIsCustomPart(true);
        setCurrentPartSuggestions([]);
    };
    return (
        <div>
            {/* Multi-Step Form */}
            <div className="rounded-3xl shadow-2xl  overflow-visible">

                {/* Progress Bar */}
                <div className="bg-gradient-to-r p-6 xxs:p-3" id="myForm">
                    <div>
                        <CarFrontIcon className='w-16 h-16 xs:h-10 xs:w-10 xxs:h-10 xxs:w-10 rounded-full mx-auto border-blue-800 border-4 bg-blue-900  text-white' />
                        <div className='text-center'>
                            <h6 className={`text-3xl py-10 xs:py-5 xxs:py-5 sm:py-5 ${playfair_display.className} font-bold`}>Inquiry Form</h6>
                        </div>
                    </div>
                    <div className="flex items-center mb-4">
                        {[1, 2, 3, 4].map((step) => (
                            <div key={step} className="flex items-center mx-auto text-center flex-1">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${firaSans.className} ${currentStep >= step ? 'bg-blue-400 text-blue-600' : ' bg-blue-100 text-black'
                                    }`}>
                                    {step}
                                </div>
                                {step < 4 && (
                                    <div className={`flex-1 place-content-center h-1 mx-2 rounded transition-all  ${currentStep > step ? 'bg-black' : 'bg-blue-700'}`} />
                                )}
                            </div>
                        ))}
                    </div>

                </div>

                <form onSubmit={handleSubmit}
                    method="POST" className="p-8 xs:p-4 xxs:p-4 sm:p-6 border-2 rounded-lg bg-transparent">


                    {/* Step 2: Vehicle Info */}
                    {currentStep === 1 && (
                        <div className="space-y-6 animate-fadeIn">
                            <div className="space-y-4">
                                <div className="flex items-left text-xl gap-2 font-semibold text-black mb-2">
                                    <CarFront className="w-6 h-6" />
                                    Select Your Vehicle
                                </div>

                                {/* Make field - unchanged */}
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                        <Car className="w-4 h-4" />
                                        Make
                                    </label>
                                    <select
                                        required
                                        onChange={(e) => setMake(e.target.value)}
                                        value={Make}
                                        className="w-full border-2 border-gray-200 rounded-xl py-3 px-4 text-gray-700 focus:outline-none focus:border-purple-500 transition-colors"
                                    >
                                        <option value="" disabled>Select vehicle make</option>
                                        {make.map((m, i) => (
                                            <option key={i}>{m}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Model field - unchanged */}
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                        <Car className="w-4 h-4" />
                                        Model
                                    </label>
                                    <select
                                        required
                                        onChange={(e) => setModel(e.target.value)}
                                        value={Model}
                                        className="w-full border-2 border-gray-200 rounded-xl py-3 px-4 text-gray-700 focus:outline-none focus:border-purple-500 transition-colors"
                                        disabled={!Make}
                                    >
                                        <option value="" disabled>Select vehicle model</option>
                                        {[...new Set(formsData
                                            .filter(s => s.make === Make)
                                            .map(s => s.model)
                                        )].map((model, i) => (
                                            <option key={i} value={model}>{model}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                        <Car className="w-4 h-4" />
                                        Year
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            required
                                            placeholder="Search or type year (e.g., 2020)"
                                            value={Year}
                                            onChange={(e) => {
                                                const inputValue = e.target.value;
                                                setYear(inputValue);

                                                const startYear = 1900;
                                                const endYear = 2027;

                                                // Build years using classic for loop
                                                const availableYears = [];
                                                for (let y = startYear; y <= endYear; y++) {
                                                    availableYears.push(y);
                                                }

                                                const matches =
                                                    inputValue.length > 0
                                                        ? availableYears.filter(y =>
                                                            y.toString().includes(inputValue)
                                                        )
                                                        : [];

                                                setYearSuggestions(matches);
                                            }}
                                            className="w-full border-2 border-gray-200 rounded-xl py-3 px-4 text-gray-700 focus:outline-none focus:border-purple-500 transition-colors"
                                            disabled={!Make || !Model}
                                        />

                                        {/* Year Suggestions Dropdown */}
                                        {yearSuggestions.length > 0 && Year && (
                                            <div className="absolute z-10 mt-1 w-full bg-white border-2 border-gray-200 rounded-xl shadow-lg max-h-64 overflow-y-auto">
                                                {yearSuggestions
                                                    .sort((a, b) => a - b)
                                                    .map((year, i) => (
                                                        <div
                                                            key={i}
                                                            className="px-4 py-3 cursor-pointer hover:bg-purple-50 transition-colors"
                                                            onClick={() => {
                                                                setYear(year.toString());
                                                                setYearSuggestions([]);
                                                            }}
                                                        >
                                                            {year}
                                                        </div>
                                                    ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    disabled={!canProceedStep1}
                                    className={`flex-1 py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all ${canProceedStep1
                                        ? 'bg-gradient-to-r from-blue-600 to-blue-300 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
                                        : 'bg-gray-300 cursor-not-allowed'
                                        }`}
                                >
                                    Continue to Part Details
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Parts */}
                    {currentStep === 2 && (
                        <div className='space-y-6 animate-fadeIn'>
                            <div className="flex items-left text-xl gap-2 font-semibold text-black mb-2">
                                <Settings className="w-6 h-6" />
                                Select Required Parts
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                    <FerrisWheel className="w-4 h-4" />
                                    Part Name
                                </label>

                                {/* Duplicate Message Alert */}
                                {duplicateMessage && (
                                    <div className="mb-3 bg-yellow-50 border-2 border-yellow-300 rounded-xl p-3 flex items-center gap-2 text-yellow-800 animate-fadeIn">
                                        <span className="text-xl">⚠️</span>
                                        <span className="font-semibold">{duplicateMessage}</span>
                                    </div>
                                )}

                                {/* Single Part Input Field */}
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
                                                onChange={(e) => handlePartInputChange(e.target.value)}
                                                onKeyPress={(e) => {
                                                    if (e.key === 'Enter') {
                                                        e.preventDefault();
                                                        addPart();
                                                    }
                                                }}
                                            />

                                            <button
                                                type="button"
                                                onClick={addPart}
                                                disabled={!currentPartInput.trim()}
                                                className={`px-4 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${currentPartInput.trim()
                                                    ? 'bg-green-500 hover:bg-green-600 text-white shadow-md hover:shadow-lg'
                                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                    }`}
                                            >
                                                <Plus className='w-5 h-5' />
                                                Add
                                            </button>
                                        </div>

                                        {/* Suggestions Dropdown */}
                                        {currentPartSuggestions.length > 0 && (
                                            <div className="absolute z-10 mt-1 w-full bg-white border-2 border-gray-200 rounded-xl shadow-lg max-h-64 overflow-y-auto">
                                                {currentPartSuggestions.map(s => (
                                                    <div
                                                        key={s}
                                                        className="px-4 py-3 cursor-pointer hover:bg-blue-50 transition-colors"
                                                        onClick={() => selectSuggestion(s)}
                                                    >
                                                        {s}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {/* Selected Parts Display - Always Visible */}
                                <div className="mb-4">
                                    <div className="text-sm font-semibold text-gray-700 mb-2 pb-2 border-b-2 border-gray-200">
                                        Selected Parts {addedParts.length > 0 && `(${addedParts.length})`}
                                    </div>
                                    {addedParts.length > 0 ? (
                                        <div className="flex flex-wrap gap-2">
                                            {addedParts.map((part, index) => (
                                                <div
                                                    key={index}
                                                    className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium"
                                                >
                                                    <span>{part}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => removePart(part)}
                                                        className="hover:bg-blue-200 rounded-full p-1 transition-colors"
                                                        title="Remove part"
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-gray-400 text-sm italic py-4 text-center bg-gray-50 rounded-xl">
                                            No parts added yet. Search or type a part name above and click the green Add button.
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Part Condition/Type */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                                    <FerrisWheel className="w-4 h-4" />
                                    Part Condition/Type
                                </label>

                                <div className="grid grid-cols-3 xs:grid-cols-1 xxs:grid-cols-1 sm:grid-cols-1 gap-3 xs:gap-0 xxs:gap-0 sm:gap-0">
                                    {['Used', 'New', 'Genuine', 'Non-Genuine', 'Any'].map(option => {
                                        const isChecked = Condition.includes(option);

                                        return (
                                            <label
                                                key={option}
                                                className={`flex items-center gap-3 rounded-xl px-4 py-3 xs:py-0 xxs:py-0 sm:py-1 xs:px-0 xxs:px-1 sm:px-1 cursor-pointer transition-colors ${Timing === option
                                                    ? 'bg-purple-50'
                                                    : 'hover:border-purple-400'
                                                    }`}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={isChecked}
                                                    onChange={() =>
                                                        setCondition(prev =>
                                                            isChecked
                                                                ? prev.filter(item => item !== option)
                                                                : [...prev, option]
                                                        )
                                                    }
                                                    className="w-4 h-4 accent-purple-500"
                                                />
                                                <span className="text-sm font-medium text-gray-700">
                                                    {" " + option}
                                                </span>
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Timing */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                                    <TimerIcon className="w-4 h-4" />
                                    When do you need the part
                                </label>

                                <div className="grid grid-cols-3 xs:grid-cols-1 xxs:grid-cols-1 sm:grid-cols-1 gap-3 xs:gap-0 xxs:gap-0 sm:gap-0">
                                    {['Urgent', 'Not Urgent', 'Just Quote'].map(option => (
                                        <label
                                            key={option}
                                            className={`flex items-center gap-3 rounded-xl px-4 py-3 xs:py-0 xxs:py-0 sm:py-1 xs:px-0 xxs:px-1 sm:px-1 cursor-pointer transition-colors ${Timing === option
                                                ? 'bg-purple-50'
                                                : 'hover:border-purple-400'
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name="timing"
                                                value={option}
                                                checked={Timing === option}
                                                onChange={(e) => setTiming(e.target.value)}
                                                className="w-4 h-4 accent-purple-500"
                                            />
                                            <span className="text-sm font-medium text-gray-700">
                                                {option}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Navigation Buttons */}
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    className="flex-1 border-2 border-blue-300 rounded-xl py-3 px-4 xs:px-2 xxs:px-3 text-gray-700 focus:outline-none focus:border-blue-500 transition-colors"
                                >
                                    Back
                                </button>

                                <button
                                    type="button"
                                    onClick={nextStep}
                                    disabled={addedParts.length === 0}
                                    className={`w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all ${addedParts.length > 0
                                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
                                        : 'bg-gray-300 cursor-not-allowed'
                                        }`}
                                >
                                    Continue to Personal Details
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    )}
                    {/* Step 1: Personal Info */}
                    {currentStep === 3 && (
                        <div className="space-y-6 animate-fadeIn">
                            <div className="space-y-4">
                                <div className="flex items-left text-xl gap-2 font-semibold text-black mb-2">
                                    <User className="w-6 h-6" />
                                    Contact Information
                                </div>
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                        <User className="w-4 h-4" />
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter your full name"
                                        className="w-full border-2 border-gray-200 rounded-xl py-3 px-4 text-gray-700 focus:outline-none focus:border-purple-500 transition-colors"
                                        onChange={(e) => setName(e.target.value)}
                                        value={Name}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                        <Mail className="w-4 h-4" />
                                        Email <span className="text-gray-400 font-normal">(optional)</span>
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="your.email@example.com"
                                        className="w-full border-2 border-gray-200 rounded-xl py-3 px-4 text-gray-700 focus:outline-none focus:border-purple-500 transition-colors"
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={Email}
                                    />
                                </div>

                                <div>
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                        <Phone className="w-4 h-4" />
                                        WhatsApp Number
                                    </label>
                                    <div className="flex gap-3">

                                        <input
                                            type="text"
                                            placeholder="+971501234567"
                                            className="flex-1 border-2 border-gray-200 rounded-xl py-3 px-4 text-gray-700 focus:outline-none focus:border-purple-500 transition-colors"
                                            onChange={(e) => setWhatsappno(e.target.value)}
                                            value={Whatsappno}
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                        <MapPin className="w-4 h-4" />
                                        Location
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Area, Emirates (e.g., Dubai Marina, Dubai)"
                                        className="w-full border-2 border-gray-200 rounded-xl py-3 px-4 text-gray-700 focus:outline-none focus:border-purple-500 transition-colors"
                                        onChange={e => onPartCityChange(e.target.value)}
                                        value={textCity}
                                    />
                                    <div className="z-10 mt-1 w-full bg-white rounded-xl max-h-64 overflow-y-auto">
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
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    className="flex-1 py-4 rounded-xl font-bold text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors"
                                >
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    disabled={!canProceedStep3 || isLoading}
                                    className={`flex-1 py-4 xs:py-2 xxs:py-2 sm:py-2 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all ${canProceedStep3 && !isLoading
                                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg hover:shadow-xl'
                                        : 'bg-gray-300 cursor-not-allowed'
                                        }`}
                                >
                                    {isLoading ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle className="w-5 h-5" />
                                            Submit Inquiry
                                        </>
                                    )}
                                </button>
                            </div>


                        </div>
                    )}

                    {/* Step 4: Success */}
                    {currentStep === 4 && submissionData && (
                        <div className="text-center space-y-6 animate-fadeIn">

                            <CheckCircle className="w-24 h-24 text-green-500 mx-auto" />

                            <h2 className="text-3xl font-bold text-gray-800">
                                Inquiry Submitted Successfully!
                            </h2>

                            <p className="text-gray-600">
                                Our team will contact you based on stock availability.
                            </p>

                            <div className="bg-gray-50 rounded-2xl p-6 text-left space-y-3">
                                <h3 className="font-semibold text-lg text-gray-800">
                                    Inquiry Details
                                </h3>

                                <p><strong>Name:</strong> {submissionData.name}</p>
                                <p><strong>Phone:</strong> {submissionData.phone}</p>
                                <p><strong>Email:</strong> {submissionData.email || '—'}</p>
                                <p><strong>Location:</strong> {submissionData.location}</p>
                                <p><strong>Vehicle:</strong> {submissionData.vehicle}</p>
                                <p><strong>Parts:</strong> {submissionData.parts}</p>
                                <p><strong>Condition:</strong> {submissionData.condition}</p>
                                <p><strong>Timing:</strong> {submissionData.timing}</p>
                                <p className="text-sm text-gray-400">
                                    Submitted on {submissionData.date}
                                </p>
                            </div>

                            <button
                                onClick={() => {
                                    setSubmissionData(null);
                                    setCurrentStep(1);
                                    setName('');
                                    setEmail('');
                                    setWhatsappno('');
                                    setAddress('');
                                    setYear('');
                                    setMake('');
                                    setModel('');
                                    setPartInputs([{ id: 1, value: '', suggestions: [], isCustom: false }]);
                                }}
                                className="mt-6 px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-xl"
                            >
                                Submit Another Inquiry
                            </button>
                        </div>
                    )}

                </form>

            </div>
        </div>
    )
}
