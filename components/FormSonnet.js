'use client';
import { useState, useEffect } from 'react';
import { ChevronRight, Car, User, MapPin, Phone, Mail, CheckCircle, TimerIcon, FerrisWheel } from 'lucide-react';

export default function FormSonnet({ formsData = [] }) {
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
    const [Condition, setCondition] = useState('');
    const [Timing, setTiming] = useState('');

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
        'Antenna',
        'Anti-Lock Brake Control Module',
        'Anti-Theft Control Module',
        'Axle Assembly',
        'Axle Assembly',
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
        'Bumper Assembly',
        'Bumper Cover',
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
        const today = new Date();
        const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
        const dateTime = date + ' ' + time;
        const partsText = getSelectedParts().join(', ');

        const submissionInfo = {
            date: dateTime,
            vehicle: `${Year} ${Make} ${Model}`,
            parts: partsText,
            name: Name,
            location: textCity,
            phone: Code + Whatsappno,
            email: Email,
            condition: Condition,
            timing: Timing,
        };

        setSubmissionData(submissionInfo);

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
                condition: Condition || '',
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        setCurrentStep(4)
        setName('');
        setCode('');
        setYear('');
        setMake('');
        setModel('');
        setAddress('');
        setCityText('');
        setCondition('')
        setTiming('');
        setEmail('');
        setText('');
        setWhatsappno('');
        setPartInputs([{ id: 1, value: '', showSuggestions: false, isCustom: false, customName: '' }]);
        setNextPartId(2);
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

    const canProceedStep2 = getSelectedParts().length > 0;


    const handlePartInputChange = (id, value) => {
        const matches = formPartname.filter(part => {
            const regex = new RegExp(`${value}`, 'gi');
            return part.match(regex);
        });

        setPartInputs(partInputs.map(part => {
            if (part.id === id) {
                return { ...part, value, showSuggestions: value.length > 0 && matches.length > 0, suggestions: matches };
            }
            return part;
        }));
    };



    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-10 px-4 sm:px-2 xxs:px-2 xs:px-2">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 xl:grid-cols-2 xxl:grid-cols-2 lg:grid-cols-2 lg:gap-8 xl:gap-8 xxl:gap-8 gap-4 items-start">

                    {/* Marketing Content */}
                    <div className="lg:sticky lg:top-8 space-y-6 xs:space-y-3 xxs:space-y-3">
                        <div className="bg-gradient-to-br from-blue-700 via-blue-700 to-blue-300 rounded-3xl p-12 lg:p-12 xl:p-12 xxl:p-12 xs:p-5 xxs:p-5 sm:p-5 md:p-12 text-white shadow-2xl">
                            <h4 className="text-5xl xxs:text-3xl xs:text-3xl s:text-3xl font-bold mb-6 leading-tight">
                                Find Your Perfect Auto Parts
                            </h4>
                            <p className="text-xl xl:text-base xxl:text-base xs:text-base s:text-base mb-8 text-blue-100">
                                Get instant quotes with optimal rates pre-compared and filtered from verified suppliers across the UAE. Quality parts, competitive prices, fast delivery.
                            </p>

                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="bg-white/20 rounded-full p-3 backdrop-blur-sm">
                                        <CheckCircle className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-1">Verified Suppliers</h3>
                                        <p className="text-blue-100 text-xl xl:text-base xxl:text-base xs:text-base s:text-base">We have a community of 500+ trusted auto parts suppliers partnered with us.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-white/20 rounded-full p-3 backdrop-blur-sm">
                                        <CheckCircle className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-1">Dedicated services</h3>
                                        <p className="text-blue-100 text-xl xl:text-base xxl:text-base xs:text-base s:text-base">Get 100% professional assistance from our expert</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-white/20 rounded-full p-3 backdrop-blur-sm">
                                        <CheckCircle className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-1">Best Prices</h3>
                                        <p className="text-blue-100 text-xl xl:text-base xxl:text-base xs:text-base s:text-base">Our optimal rates saves you up to 40% on parts</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 pt-8 border-t border-white/20">
                                <div className="grid grid-cols-3 gap-6 text-center">
                                    <div>
                                        <div className="text-4xl xl:text-xl xxl:text-xl xs:text-xl s:text-xl font-bold mb-2">500+</div>
                                        <div className="text-sm text-blue-100">Suppliers</div>
                                    </div>
                                    <div>
                                        <div className="text-4xl xl:text-xl xxl:text-xl xs:text-xl s:text-xl  font-bold mb-2">50K+</div>
                                        <div className="text-sm text-blue-100">Parts Found</div>
                                    </div>
                                    <div>
                                        <div className="text-4xl xl:text-xl xxl:text-xl xs:text-xl s:text-xl  font-bold mb-2">98%</div>
                                        <div className="text-sm text-blue-100">Satisfaction</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-8 shadow-lg">
                            <h3 className="text-2xl font-bold mb-4 text-gray-800">How It Works</h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="bg-gradient-to-br from-blue-500 to-blue-300 text-blue-50 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">1</div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800">Fill the Form</h4>
                                        <p className="text-gray-600 text-sm">Tell us about your vehicle and parts needed</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="bg-gradient-to-br from-blue-500 to-blue-300 text-blue-50 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">2</div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800">Get Quotes</h4>
                                        <p className="text-gray-600 text-sm">Receive the best pre-compared optimal rates from us.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="bg-gradient-to-br from-blue-500 to-blue-300 text-blue-50 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">3</div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800">Get delivered the same day</h4>
                                        <p className="text-gray-600 text-sm">Select best rates and get parts delivered</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Multi-Step Form */}
                    <div className="bg-white rounded-3xl shadow-2xl overflow-visible">
                        {/* Progress Bar */}
                        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-6" id="myForm">
                            <div className="flex items-center justify-between mb-4">
                                {[1, 2, 3, 4].map((step) => (
                                    <div key={step} className="flex items-center flex-1">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${currentStep >= step ? 'bg-white text-purple-600' : 'bg-white/30 text-white'
                                            }`}>
                                            {step}
                                        </div>
                                        {step < 4 && (
                                            <div className={`flex-1 h-1 mx-2 rounded transition-all ${currentStep > step ? 'bg-white' : 'bg-white/30'
                                                }`} />
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="text-white text-center">
                                <h2 className="text-2xl font-bold">
                                    {currentStep === 1 && 'Vehicle Details'}
                                    {currentStep === 2 && 'Parts Details'}
                                    {currentStep === 3 && 'Personal Information'}
                                    {currentStep === 4 && 'Inquiry Submitted Successfully!'}
                                </h2>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit}
                            method="POST" className="p-8">


                            {/* Step 2: Vehicle Info */}
                            {currentStep === 1 && (
                                <div className="space-y-6 animate-fadeIn">
                                    <div className="space-y-4">
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
                                            <select
                                                required
                                                onChange={(e) => setYear(e.target.value)}
                                                value={Year}
                                                className="w-full border-2 border-gray-200 rounded-xl py-3 px-4 text-gray-700 focus:outline-none focus:border-purple-500 transition-colors"
                                                disabled={!Make || !Model}
                                            >
                                                <option value="" disabled defaultValue>Select vehicle Year</option>
                                                {[...new Set(
                                                    formsData
                                                        .filter(s => s.make === Make && s.model === Model)
                                                        .flatMap(s => Array.isArray(s.year) ? s.year : [])
                                                )]
                                                    .sort((a, b) => b - a)
                                                    .map((year, i) => (
                                                        <option key={i} value={year}>{year}</option>
                                                    ))}
                                            </select>
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
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                            <FerrisWheel className="w-4 h-4" />
                                            Part Name
                                        </label>
                                        {partInputs.map(part => (
                                            <div key={part.id} className="relative">
                                                <div className="flex gap-2">
                                                    <input
                                                        className="w-full border-2 border-gray-200 rounded-xl py-3 px-4 text-gray-700 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                                                        placeholder={part.isCustom ? 'Custom part name' : 'Type Parts Name'}
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
                                                    <div className="absolute z-10 mt-1 w-full bg-white border rounded-xl shadow-lg max-h-64 overflow-y-auto">
                                                        <div
                                                            className="px-4 py-2 text-blue-500 font-semibold cursor-pointer"
                                                            onClick={() => updatePartValue(part.id, 'custom')}
                                                        >
                                                            ➕ Custom part
                                                        </div>
                                                        {part.suggestions.map(s => (
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
                                    </div>
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                                            <FerrisWheel className="w-4 h-4" />
                                            Part Condition/Type
                                        </label>

                                        <div className="grid grid-cols-4 xs:grid-cols-2 xxs:grid-cols-2 sm:grid-cols-2 gap-3">
                                            {['Used', 'New', 'Genuine', 'Aftermarket/Tijari', 'Any'].map(option => {
                                                const isChecked = Condition.includes(option);

                                                return (
                                                    <label
                                                        key={option}
                                                        className={`flex items-center gap-3 border-2 rounded-xl px-4 py-3 cursor-pointer transition-colors           ${isChecked
                                                            ? 'border-purple-500 bg-purple-50'
                                                            : 'border-gray-200 hover:border-purple-400'
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
                                                            {option}
                                                        </span>
                                                    </label>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                                            <TimerIcon className="w-4 h-4" />
                                            When do you need the part
                                        </label>

                                        <div className="grid grid-cols-3 gap-3">
                                            {['Urgent', 'Not Urgent', 'Just Quote'].map(option => (
                                                <label
                                                    key={option}
                                                    className={`flex items-center gap-3 border-2 rounded-xl px-4 py-3 cursor-pointer transition-colors ${Timing === option
                                                        ? 'border-purple-500 bg-purple-50'
                                                        : 'border-gray-200 hover:border-purple-400'
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


                                    <div className="flex gap-3 pt-4">
                                        <button
                                            type="button"
                                            onClick={prevStep}
                                            className="flex-1 px-4 py-4 rounded-xl font-bold text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors"
                                        >
                                            Back
                                        </button>

                                        <button
                                            type="button"
                                            onClick={nextStep}
                                            disabled={!canProceedStep2}
                                            className={`w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all ${canProceedStep2
                                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
                                                : 'bg-gray-300 cursor-not-allowed'
                                                }`}
                                        >
                                            Continue to Vehicle Details
                                            <ChevronRight className="w-5 h-5" />
                                        </button>

                                    </div>
                                </div>
                            )}
                            {/* Step 1: Personal Info */}
                            {currentStep === 3 && (
                                <div className="space-y-6 animate-fadeIn">
                                    <div className="space-y-4">
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
                                            <div className=" z-10 mt-1 w-full bg-white rounded-xl max-h-64 overflow-y-auto">
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
                                            disabled={!canProceedStep3}
                                            className={`flex-1 py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all ${canProceedStep3
                                                ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg hover:shadow-xl'
                                                : 'bg-gray-300 cursor-not-allowed'
                                                }`}
                                        >
                                            <CheckCircle className="w-5 h-5" />
                                            Submit Request
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
            </div>

            <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
        </div>
    );
}