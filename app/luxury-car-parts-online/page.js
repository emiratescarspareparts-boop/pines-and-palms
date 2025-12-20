import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTools,
    faShippingFast,
    faHeadset,
} from "@fortawesome/free-solid-svg-icons";
import Footer from "../../components/footer"
import GetInTouchForm from "../../components/GetInTouchForm";
import Link from "next/link";
import Image from "next/image";
export const revalidate = 86400;
export const runtime = 'nodejs';
export const dynamicParams = false;


export default function LuxuryPartsLanding() {
    return (
        <div className="bg-[#111] text-white font-sans">
            <section
                className="relative h-[80vh] flex items-center justify-center bg-cover bg-center"
                style={{ backgroundImage: 'url(/img/luxury-cars.png)' }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-60"></div>
                <div className="relative z-10 text-center px-4">
                    <h1 className="text-5xl md:text-6xl font-bold font-serif text-gold mb-4">
                        Genuine Luxury Car Performance Parts in the UAE
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
                        Find Spare parts for luxury branded cars in UAE from Dubai dealers.
                    </p>
                </div>
            </section>

            <section className="py-12 bg-black border-b border-gray-800">
                <div className="max-w-6xl mx-auto grid xl:grid-cols-4 xxl:grid-cols-4 xs:grid-cols-2 xxs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 md:grid-cols-4 gap-10 px-4 text-center text-gray-300">
                    <div className="mx-auto group"><Link href="/search-by-make/Ferrari">
                        <div className="transition-transform duration-300 group-hover:-rotate-12">
                            <Image width={150} height={150} src="../../public/img/car-logos/ferrari.webp" />
                        </div>

                        <p className="mt-2">Ferrari</p></Link>
                    </div>
                    <div className="mx-auto group"><Link href="/search-by-make/Porsche">
                        <div className="transition-transform duration-300 group-hover:-rotate-12">
                            <Image width={150} height={150} src="../../public/img/car-logos/porsche.webp" /></div>
                        <p className="mt-2">Porsche</p></Link>
                    </div>
                    <div className="mx-auto group"><Link href="/search-by-make/Audi">
                        <div className="transition-transform duration-300 group-hover:-rotate-12">
                            <Image width={150} height={150} src="../../public/img/car-logos/audi.webp" /></div>
                        <p className="mt-2">Audi</p></Link>
                    </div>
                    <div className="mx-auto group"><Link href="/search-by-make/BMW"><div className="transition-transform duration-300 group-hover:-rotate-12">
                        <Image width={150} height={150} src="../../public/img/car-logos/audi.webp" /></div>
                        <p className="mt-2">BMW</p></Link>
                    </div>
                    <div className="mx-auto group"><Link href="/search-by-make/Mercedes-Benz">
                        <div className="transition-transform duration-300 group-hover:-rotate-12">
                            <Image width={150} height={150} src="../../public/img/car-logos/mercedesbenz.webp" /></div>
                        <p className="mt-2">Mercedes Benz</p></Link>
                    </div>
                    <div className="mx-auto group"><Link href="/search-by-make/Land%20Rover"><div className="transition-transform duration-300 group-hover:-rotate-12">
                        <Image width={150} height={150} src="../../public/img/car-logos/land_rover.webp" /></div>
                        <p className="mt-2">Range Rover</p></Link>
                    </div><div className="mx-auto group"><Link href="/search-by-make/Rolls-Royce"><div className="transition-transform duration-300 group-hover:-rotate-12">
                        <Image width={150} height={150} src="../../public/img/car-logos/rolls-royce.webp" /></div>
                        <p className="mt-2">Rolls Royce</p></Link>
                    </div>
                    <div className="mx-auto group"><Link href="/search-by-make/Bentley"><div className="transition-transform duration-300 group-hover:-rotate-12">
                        <Image width={150} height={150} src="../../public/img/car-logos/bentley.webp" /></div>
                        <p className="mt-2">Bentley</p></Link>
                    </div>
                    <div className="mx-auto group"><Link href="/search-by-make/Cadillac"><div className="transition-transform duration-300 group-hover:-rotate-12">

                        <Image width={150} height={150} src="../../public/img/car-logos/cadillac.webp" /></div>
                        <p className="mt-2">Cadillac</p></Link>
                    </div>
                    <div className="mx-auto group"><Link href="/search-by-make/Lexus"><div className="transition-transform duration-300 group-hover:-rotate-12">
                        <Image width={150} height={150} src="../../public/img/car-logos/lexus.webp" /></div>
                        <p className="mt-2">Lexus</p></Link>
                    </div>
                    <div className="mx-auto group"><Link href="/search-by-make/Jaguar"><div className="transition-transform duration-300 group-hover:-rotate-12">
                        <Image width={150} height={150} src="../../public/img/car-logos/jaguar.webp" /></div>
                        <p className="mt-2">Jaguar</p></Link>
                    </div>
                    <div className="mx-auto group"><Link href="/search-by-make/Tesla"><div className="transition-transform duration-300 group-hover:-rotate-12">
                        <Image width={150} height={150} src="../../public/img/car-logos/tesla.webp" /></div>
                        <p className="mt-2">Tesla</p></Link>
                    </div>
                    <div className="mx-auto group"><Link href="/search-by-make/Volvo"><div className="transition-transform duration-300 group-hover:-rotate-12">
                        <Image width={150} height={150} src="../../public/img/car-logos/volvo.webp" /></div>
                        <p className="mt-2">Volvo</p></Link>
                    </div>
                    <div className="mx-auto group"><Link href="/search-by-make/Genesis"><div className="transition-transform duration-300 group-hover:-rotate-12">
                        <Image width={150} height={150} src="../../public/img/car-logos/genesis.webp" /></div>
                        <p className="mt-2">Genesis</p></Link>
                    </div>
                    <div className="mx-auto group"><Link href="/search-by-make/Koenigsegg"><div className="transition-transform duration-300 group-hover:-rotate-12">
                        <Image width={150} height={150} src="../../public/img/car-logos/koenigsegg.webp" /></div>
                        <p className="mt-2">Koenigsegg</p></Link>
                    </div>
                    <div className="mx-auto group"><Link href="/search-by-make/Lamborghini"><div className="transition-transform duration-300 group-hover:-rotate-12">
                        <Image width={150} height={150} src="../../public/img/car-logos/lamborghini.webp" /></div>
                        <p className="mt-2">Lamborghini</p></Link>
                    </div>
                    <div className="mx-auto group"><Link href="/search-by-make/Maserati"><div className="transition-transform duration-300 group-hover:-rotate-12">
                        <Image width={150} height={150} src="../../public/img/car-logos/maserati.webp" /></div>
                        <p className="mt-2">Maserati</p></Link>
                    </div><div className="mx-auto group"><Link href="/search-by-make/Alfa%20Romeo"><div className="transition-transform duration-300 group-hover:-rotate-12">
                        <Image width={150} height={150} src="../../public/img/car-logos/alfa_romeo.webp" /></div>
                        <p className="mt-2">Alfa Romeo</p></Link>
                    </div>
                    <div className="mx-auto group"><Link href="/search-by-make/Aston%20Martin"><div className="transition-transform duration-300 group-hover:-rotate-12">
                        <Image width={150} height={150} src="../../public/img/car-logos/aston_martin.webp" /></div>
                        <p className="mt-2">Aston Martin</p></Link>
                    </div>
                    <div className="mx-auto group"><Link href="/search-by-make/Acura"><div className="transition-transform duration-300 group-hover:-rotate-12">
                        <Image width={150} height={150} src="../../public/img/car-logos/acura.webp" /></div>
                        <p className="mt-2">Acura</p></Link>
                    </div>
                    <div className="mx-auto group"><Link href="/search-by-make/Bugatti"><div className="transition-transform duration-300 group-hover:-rotate-12">
                        <Image width={150} height={150} src="../../public/img/car-logos/bugatti.webp" /></div>
                        <p className="mt-2">Bugatti</p></Link>
                    </div>
                    <div className="mx-auto group"><Link href="/search-by-make/Mclaren"><div className="transition-transform duration-300 group-hover:-rotate-12">
                        <Image width={150} height={150} src="../../public/img/car-logos/mclaren.webp" /></div>
                        <p className="mt-2">Mclaren</p></Link>
                    </div>
                </div>
            </section>

            <section className="py-14 bg-[#161616] px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-semibold text-gold font-serif mb-8">Why Choose Us?</h2>
                <div className="max-w-4xl mx-auto grid xl:grid-cols-3 lg:grid-cols-3 xxl:grid-cols-3 sm:grid-cols-1 xs:grid-cols-1 s:grid-cols-1 md:grid-cols-3 gap-8 text-gray-300">
                    <div>

                        <FontAwesomeIcon icon={faTools} className="text-4xl text-gold mb-3" />

                        <h3 className="text-xl font-semibold mb-2">100% Genuine Parts</h3>
                        <p>OEM & certified aftermarket spares for top-tier brands.</p>

                    </div>
                    <div>
                        <FontAwesomeIcon icon={faShippingFast} className="text-4xl text-gold mb-3" />
                        <h3 className="text-xl font-semibold mb-2">Fast UAE Delivery</h3>
                        <p>We deliver across Dubai, Abu Dhabi, Sharjah and more.</p>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faHeadset} className="text-4xl text-gold mb-3" />
                        <h3 className="text-xl font-semibold mb-2">Expert Support</h3>
                        <p>Get help choosing the right part for your luxury vehicle.</p>
                    </div>
                </div>
            </section>

            {/* Form Section */}
            <section className="bg-black py-16 px-4 border-t border-gray-800">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-4xl font-serif text-gold mb-4">Request a Part</h2>
                    <p className="text-gray-400 mb-8">
                        Fill the form below and get quotes from trusted suppliers in the UAE.
                    </p>
                    <div className="bg-gray-400 p-6 rounded-xl shadow-lg">
                        <GetInTouchForm />
                    </div>
                </div>
            </section>

            <section class=" text-gray-300">
                <div class="max-w-7xl mx-auto px-6 py-16">
                    <p class="text-lg text-center text-gray-600 max-w-3xl mx-auto mb-12">
                        Welcome to the ultimate destination for premium luxury car spare parts in the United Arab Emirates. We are proud to be the trusted supplier of genuine parts for some of the world’s most prestigious automotive brands. Our inventory covers everything from essential maintenance components to specialized performance parts, all sourced directly from reputable dealers in Dubai.
                    </p>

                    <div class="space-y-12">
                        <div>
                            <h2 class="text-2xl font-semibold text-blue-800">Why Choose Us for Luxury Car Parts?</h2>
                            <p class="mt-2 text-gray-700">
                                Our platform is built to serve car enthusiasts, repair professionals, and luxury vehicle owners who demand the highest standards of performance and reliability. Whether you drive a Ferrari, Bentley, Rolls-Royce, Porsche, or Lamborghini, you can trust us to deliver the exact part you need, when you need it.
                            </p>
                        </div>

                        <div>
                            <h3 class="text-xl font-semibold text-blue-700">1. 100% Genuine Parts, Sourced from Dubai</h3>
                            <p class="mt-2 text-gray-700">
                                We work exclusively with authorized Dubai-based dealers and certified suppliers. This ensures that every component we offer meets OEM specifications. No replicas. No low-grade substitutes. Just authentic parts that keep your vehicle running like new.
                            </p>
                        </div>

                        <div>
                            <h3 class="text-xl font-semibold text-blue-700">2. Expertly Curated Inventory</h3>
                            <ul class="list-disc list-inside mt-2 text-gray-700 space-y-1">
                                <li><strong>Electrical Components:</strong> Sensors, wiring, lighting, alternators, starters, and control modules.</li>
                                <li><strong>Engine Systems:</strong> Pistons, crankshafts, gaskets, valves, camshafts, and more.</li>
                                <li><strong>Performance Upgrades:</strong> Air filters, exhaust systems, turbos, intercoolers, and tuning kits.</li>
                                <li><strong>Suspension & Brakes:</strong> Shocks, struts, control arms, pads, rotors, and calipers.</li>
                                <li><strong>Accessories:</strong> Mirrors, bumpers, trims, infotainment systems, and seat controls.</li>
                            </ul>
                        </div>

                        <div>
                            <h3 class="text-xl font-semibold text-blue-700">3. Delivery & Pickup Available Across the UAE</h3>
                            <p class="mt-2 text-gray-700">
                                We serve all emirates — Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, and Umm Al Quwain. Get:
                            </p>
                            <ul class="list-disc list-inside mt-2 text-gray-700 space-y-1">
                                <li>Fast, secure delivery to your home or workshop</li>
                                <li>Pickup from Dubai-based warehouses</li>
                            </ul>
                        </div>

                        <div>
                            <h2 class="text-2xl font-semibold text-blue-800 mt-10">Serving All Major UAE Cities</h2>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 text-gray-700">
                                <div>
                                    <h4 class="font-semibold">Dubai</h4>
                                    <p>Same-day delivery and warehouse pickups.</p>
                                </div>
                                <div>
                                    <h4 class="font-semibold">Abu Dhabi</h4>
                                    <p>Reliable delivery with dedicated support.</p>
                                </div>
                                <div>
                                    <h4 class="font-semibold">Sharjah</h4>
                                    <p>Bulk deals for workshops and resellers.</p>
                                </div>
                                <div>
                                    <h4 class="font-semibold">Ajman, RAK, UAQ</h4>
                                    <p>Equal service and scheduled deliveries.</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 class="text-2xl font-semibold text-blue-800 mt-10">Brands We Specialize In</h2>
                            <ul class="list-disc list-inside text-gray-700 mt-4 space-y-1">
                                <li><strong>Ferrari</strong>: F8, Portofino, 488</li>
                                <li><strong>Bentley</strong>: Suspension and interior parts</li>
                                <li><strong>Porsche</strong>: 911, Cayenne, Panamera OEM parts</li>
                                <li><strong>Rolls-Royce</strong>: Ghost, Phantom, Wraith</li>
                                <li><strong>Lamborghini</strong>: Aventador, Huracán</li>
                                <li><strong>McLaren, Aston Martin, Maserati, Jaguar, Land Rover</strong></li>
                            </ul>
                        </div>

                        <div>
                            <h2 class="text-2xl font-semibold text-blue-800 mt-10">Tailored for UAE&apos;s Harsh Climate</h2>
                            <p class="mt-2 text-gray-700">
                                Our curated parts are built for heat resistance, dust filtration, and high-octane performance — helping you maintain your luxury vehicle year-round.
                            </p>
                        </div>


                        <div>
                            <h2 class="text-2xl font-semibold text-blue-800 mt-10">Quick Inquiry & Expert Support</h2>
                            <p class="mt-2 text-gray-700">
                                Not sure what part you need? Use our quick inquiry form with your car&apos;s make, model, year. Our team will get back to you through whatsapp.
                            </p>
                        </div>

                        <div>
                            <h2 class="text-2xl font-semibold text-blue-800 mt-10">Why UAE Luxury Car Owners Trust Us</h2>
                            <ul class="list-disc list-inside text-gray-700 mt-2 space-y-1">
                                <li>Authenticity guaranteed</li>
                                <li>Same-day availability in Dubai</li>
                                <li>English & Arabic support</li>
                                <li>Secure payment options</li>
                                <li>Trusted by thousands</li>
                            </ul>
                        </div>

                        <div class="bg-blue-50 p-6 mt-10 rounded-lg text-center">
                            <h2 class="text-2xl font-bold text-blue-900 mb-2">Start Your Spare Parts Request Now</h2>
                            <p class="text-gray-700 mb-4">Use our inquiry form or browse by brand, part name, or UAE city. Enjoy genuine support and fast delivery.</p>
                            <p class="text-blue-700 font-semibold">Fast. Reliable. Genuine.</p>
                            <p class="text-sm text-gray-500 mt-2">Serving: Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Umm Al Quwain</p>
                            <p class="text-sm text-gray-500">Powered by: Genuine Dealers from Dubai | Delivery + Pickup | Expert Support</p>
                        </div>
                    </div>
                </div>
            </section>


            {/* Footer */}
            <Footer />
        </div>
    );
}
