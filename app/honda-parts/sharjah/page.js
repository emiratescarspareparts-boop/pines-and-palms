import React from 'react';
import Footer from '../../../components/footer';
import OtherHondaModels from '../../../components/OtherHondaModels';
import Link from 'next/link';
import FormOnly from '../../../components/FormOnly';
import CarData from "../../../public/lib/car-data.json"


export default function Sharjah() {
  const modelforms = CarData;
  return (
    <div className='max-w-5xl mx-auto'>
      <div className="w-3/4 mx-auto">
        <div>
          <h1 className="text-blue-600 text-4xl md:text-lg lg:text-2xl font-extrabold xs:text-base 2xs:text-xs">
            Honda spare Parts in Sharjah Online | Used, New, Genuine and Aftermarket stock
          </h1>
        </div>
        <div className='sm:max-w-xl lg:max-w-2xl md:max-w-xl xl:max-w-2xl xxl:max-w-2xl mx-auto xs:mx-3 xxs:mx-3 sm:mx-5'>
          <FormOnly formsData={modelforms} />
        </div>
      </div>
      <div className="grid grid-cols-1 place-content-center pt-10 xs:pt-5 mx-8">
        <div>
          <p className="text-xl font-mono text-gray-700 mx-auto">
            EMIRATESCAR is the online Dealer specialist in Honda spare
            parts running on roads of UAE. We can find the best
            genuine (otherwise called OEM parts) and aftermarket parts for any honda model
            cars. We have experienced professional who can find the parts at
            affordable and reasonable price. We deal in genuine honda parts and
            aftermarket honda parts such as honda engine parts such as Engine Assembly
            Engine Block,
            Engine Mount,
            Engine Block,
            Cylinder Head,
            Cylinder Block,
            Crankshaft,
            Camshaft,
            Piston,
            Exhaust Manifold,
            Intake Manifold,
            Ignition Switch,
            Ignition Control Module,
            TCM, honda mechanical parts such as , Engine,
            Battery,
            Alternator,
            Brake Pads,
            Radiator,
            Transmission,
            Shock Absorber,
            Catalytic Converter,
            Power Steering Pump,
            honda electrical and electronic parts such as Spark Plug
            Alternator,
            Battery,
            Ignition Switch, honda body parts such as Bonnet,
            Fender,
            Decklid,
            Grille,
            Wheel, and lights, AC parts such as AC Compressor
            AC Condenser,
            AC Selector,
            AC Controls and
            service and maintainence parts. You can order Honda spare parts by
            simply submitting the online inquiry form{' '}

            . You can get callback or whatsapp chat or email after submitting
            your form inquiry.
          </p>
          <p className="text-xl font-mono text-gray-700 mx-auto my-5">
            Honda is a car manufacturing company established in 1948. It has
            built many fuel efficient cars with vtec engine as well as luxury
            cars with v8 engine. However it has always aimed to produce fuel
            efficient engine and affordable car. According to the report in
            2018, 80,000 honda cars were registered in UAE. So the demand for
            cars spare parts in on niche.{' '}
          </p>

          <h3
            className="text-3xl font-extrabold mx-auto my-5"
            id="oemvsaftermarket"
          >
            Team Genuine VS Team Aftermarket
          </h3>
          <p className="text-xl font-mono text-gray-700 mx-auto my-5 font-bold">
            Honda aftermarket parts are better to buy for many reasons:
          </p>
          <ol className="list-disc text-xl font-mono text-gray-700 mx-auto">
            <li>It is more affordable than genuine parts</li>
            <li>Some genuine parts are similar to genuine parts itself.</li>
            <li>
              It is readily available because it is equivalently manufactured to
              genuine parts.
            </li>
            <li>
              Aftermarket parts can have more manufacturers than genuine parts
              which can be only from one main manufacturer
            </li>
          </ol>
          <p className="text-xl font-mono text-gray-700 mx-auto my-5 font-bold">
            Honda aftermarket parts are better to buy for many reasons:
          </p>
          <ol className="list-disc text-xl font-mono text-gray-700 mx-auto">
            <li>It is more affordable than genuine parts</li>
            <li>
              Aftermarket parts are not regularized or standardized because it
              is manufactured as a duplicate to genuine parts.
            </li>
            <li>Genuine parts are best in quality than aftermarket parts. </li>
            <li>
              Genuine parts have warranty unlike aftermarket parts which has no
              Warranty
            </li>
          </ol>
          <p className="text-xl font-mono text-gray-700 mx-auto">
            However, if you weigh your pros and cons and which kind of parts you
            really need, you can come to the best conclusion yourself. And we
            can serve you with both kind of parts.
          </p>
          <h4 className="text-xl font-mono text-gray-700 mx-auto font-extrabold xl:mx-10 lg:mx-10 md:mx-10 sm:mx-5 xs:mx-2 xs:py-0 2xs:mx-2 s:mx-2  md:ml-11 my-10">
            Availability of Honda parts in Sharjah:
          </h4>
          <div className="grid grid-cols-4 xs:grid-cols-1 gap-3 p-5 border-2 border-gray-500 xl:mx-10 lg:mx-10 md:mx-10 sm:mx-5 xs:mx-2 xs:py-0 2xs:mx-2 s:mx-2  md:ml-11 my-10 mx-10">
            <div>
              <Link
                href="https://emirates-car.com/search-by-cities-in-uae/Dubai"
                className="font-mono font-semibold text-blue-600 underline hover:text-blue-900"
                title={'honda spare parts dubai'}
              >
                <i className="fa fa-map-marker" aria-hidden="true"></i>&nbsp;
                Honda Parts Dubai
              </Link>
            </div>
            <div>
              {' '}
              <Link
                href="https://emirates-car.com/search-by-cities-in-uae/Sharjah"
                className="font-mono font-semibold text-blue-600 underline hover:text-blue-900"
                title={'Honda spare parts dubai'}
              >
                <i className="fa fa-map-marker" aria-hidden="true"></i>&nbsp;
                Honda Parts Sharjah
              </Link>
            </div>
            <div>
              {' '}
              <Link
                href="https://emirates-car.com/search-by-cities-in-uae/Ajman"
                className="font-mono font-semibold text-blue-600 underline hover:text-blue-900"
                title={'honda spare parts ajman'}
              >
                <i className="fa fa-map-marker" aria-hidden="true"></i>
                Honda Parts Ajman
              </Link>
            </div>
            <div>
              {' '}
              <Link
                href="https://emirates-car.com/search-by-cities-in-uae/Ras%20al%20Khaimah"
                className="font-mono font-semibold text-blue-600 underline hover:text-blue-900"
                title={'Honda spare parts ras al khaimah'}
              >
                <i className="fa fa-map-marker" aria-hidden="true"></i>
                Honda Parts Ras Al Khaimah
              </Link>
            </div>
            <div>
              <Link
                href="https://emirates-car.com/search-by-cities-in-uae/Al%20Quoz%20(Dubai)"
                className="font-mono font-semibold text-blue-600 underline hover:text-blue-900"
                title={'Honda spare parts al quoz'}
              >
                <i className="fa fa-map-marker" aria-hidden="true"></i>
                Honda Parts Al Quoz
              </Link>
            </div>
            <div>
              <Link
                href="https://emirates-car.com/search-by-cities-in-uae/Sheikh%20Zayed%20Road%20(Dubai)"
                className="font-mono font-semibold text-blue-600 underline hover:text-blue-900"
                title={'Honda spare parts dubai sheikh zayed road'}
              >
                <i className="fa fa-map-marker" aria-hidden="true"></i>
                Honda Parts Sheikh Zayed Road, Dubai
              </Link>
            </div>
            <div>
              <Link
                href="https://emirates-car.com/search-by-cities-in-uae/Deira%20(Dubai)"
                className="font-mono font-semibold text-blue-600 underline hover:text-blue-900"
                title={'honda spare parts deira'}
              >
                <i className="fa fa-map-marker" aria-hidden="true"></i>
                Honda Parts Deira
              </Link>
            </div>
          </div>
          <h4 className="text-3xl font-extrabold mx-auto my-5">
            List of different Genuine and Aftermarket Honda spare parts in
            Sharjah, UAE
          </h4>
          <div className="grid grid-cols-3 xs:grid-cols-1 place-content-center">
            <div>
              <p className="text-xl font-mono text-gray-700 mx-auto my-5 font-bold">
                Honda Engine parts
              </p>
              <ol className="list-disc text-xl font-mono text-gray-700 mx-auto">
                <li>
                  <Link
                    href="https://emirates-car.com/search-by-part-name/Engine%20Assembly"
                    className="font-mono font-semibold text-blue-600 underline hover:text-blue-900"
                  >
                    Engine Assembly
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://emirates-car.com/search-by-part-name/Engine%20Block"
                    className="font-mono font-semibold text-blue-600 underline hover:text-blue-900"
                  >
                    Engine Block
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://emirates-car.com/search-by-part-name/Engine%20Mount"
                    className="font-mono font-semibold text-blue-600 underline hover:text-blue-900"
                  >
                    Engine Mount
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://emirates-car.com/search-by-part-name/Engine%20Block"
                    className="font-mono font-semibold text-blue-600 underline hover:text-blue-900"
                  >
                    Engine Block
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://emirates-car.com/search-by-part-name/Cylinder%20Head"
                    className="font-mono font-semibold text-blue-600 underline hover:text-blue-900"
                  >
                    Cylinder Head
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://emirates-car.com/search-by-part-name/Cylinder%20Block"
                    className="font-mono font-semibold text-blue-600 underline hover:text-blue-900"
                  >
                    Cylinder Block
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://emirates-car.com/search-by-part-name/Crankshaft"
                    className="font-mono font-semibold text-blue-600 underline hover:text-blue-900"
                  >
                    Crankshaft
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://emirates-car.com/search-by-part-name/Camshaft"
                    className="font-mono font-semibold text-blue-600 underline hover:text-blue-900"
                  >
                    Camshaft
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://emirates-car.com/search-by-part-name/Piston"
                    className="font-mono font-semibold text-blue-600 underline hover:text-blue-900"
                  >
                    Piston
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://emirates-car.com/search-by-part-name/Exhaust%20Manifold"
                    className="font-mono font-semibold text-blue-600 underline hover:text-blue-900"
                  >
                    Exhaust Manifold
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://emirates-car.com/search-by-part-name/Intake%20Manifold"
                    className="font-mono font-semibold text-blue-600 underline hover:text-blue-900"
                  >
                    Intake Manifold
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://emirates-car.com/search-by-part-name/Ignition%20Switch"
                    className="font-mono font-semibold text-blue-600 underline hover:text-blue-900"
                  >
                    Ignition Switch
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://emirates-car.com/search-by-part-name/Ignition%20Control%20Module"
                    className="font-mono font-semibold text-blue-600 underline hover:text-blue-900"
                  >
                    Ignition Control Module
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://emirates-car.com/search-by-part-name/Transmission%20Control%20Module"
                    className="font-mono font-semibold text-blue-600 underline hover:text-blue-900"
                  >
                    TCM
                  </Link>
                </li>
              </ol>
            </div>

            <div>
              <p className="text-xl font-mono text-gray-700 mx-auto my-5 font-bold">
                Honda Mechanical parts
              </p>
              <ol className="list-disc text-xl font-mono text-gray-700 mx-auto">
                <li>
                  <Link
                    href="https://emirates-car.com/search-by-part-name/Engine%20Assembly"
                    className="font-mono font-semibold text-blue-600 underline hover:text-blue-900"
                  >
                    Engine
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://emirates-car.com/search-by-part-name/Engine%20Assembly"
                    className="font-mono font-semibold text-blue-600 underline hover:text-blue-900"
                  >
                    Battery
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://emirates-car.com/search-by-part-name/Engine%20Assembly"
                    className="font-mono font-semibold text-blue-600 underline hover:text-blue-900"
                  >
                    Alternator
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://emirates-car.com/search-by-part-name/Brake%20Pads"
                    className="font-mono font-semibold text-blue-600 underline hover:text-blue-900"
                  >
                    Brake Pads
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://emirates-car.com/search-by-part-name/Radiator"
                    className="font-mono font-semibold text-blue-600 underline hover:text-blue-900"
                  >
                    Radiator
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://emirates-car.com/search-by-part-name/Transmission%20Control%20Module"
                    className="font-mono font-semibold text-blue-600 underline hover:text-blue-900"
                  >
                    Transmission
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://emirates-car.com/search-by-part-name/Shock%20Absorber"
                    className="font-mono font-semibold text-blue-600 underline hover:text-blue-900"
                  >
                    Shock Absorber
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://emirates-car.com/search-by-part-name/Convertible%20Top%20Motor"
                    className="font-mono font-semibold text-blue-600 underline hover:text-blue-900"
                  >
                    Catalytic Converter
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://emirates-car.com/search-by-part-name/Power%20Steering%20Box"
                    className="font-mono font-semibold text-blue-600 underline hover:text-blue-900"
                  >
                    Power Steering
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://emirates-car.com/get-in-touch"
                    className="font-mono font-semibold text-blue-600 underline hover:text-blue-900"
                  >
                    Pump
                  </Link>
                </li>
              </ol>
            </div>

            <div>
              <p className="text-xl font-mono text-gray-700 mx-auto my-5 font-bold">
                Honda Body Parts
              </p>
              <ol className="list-disc text-xl font-mono text-gray-700 mx-auto">
                <li>
                  <Link
                    href="https://emirates-car.com/search-by-part-name/Bonnet"
                    className="font-mono font-semibold text-blue-600 underline hover:text-blue-900"
                  >
                    Bonnet
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://emirates-car.com/search-by-part-name/Fender%20(Front)"
                    className="font-mono font-semibold text-blue-600 underline hover:text-blue-900"
                  >
                    Fender
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://emirates-car.com/search-by-part-name/Decklid"
                    className="font-mono font-semibold text-blue-600 underline hover:text-blue-900"
                  >
                    Decklid
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://emirates-car.com/search-by-part-name/Grille"
                    className="font-mono font-semibold text-blue-600 underline hover:text-blue-900"
                  >
                    Grille
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://emirates-car.com/search-by-part-name/Wheel"
                    className="font-mono font-semibold text-blue-600 underline hover:text-blue-900"
                  >
                    Wheel
                  </Link>
                </li>
              </ol>
            </div>

            <div>
              <p className="text-xl font-mono text-gray-700 mx-auto my-5 font-bold">
                Honda Electrical Parts
              </p>
              <ol className="list-disc text-xl font-mono text-gray-700 mx-auto">
                <li>
                  <Link
                    href="https://emirates-car.com/search-by-part-name/Spark%20Plug"
                    className="font-mono font-semibold text-blue-600 underline hover:text-blue-900"
                  >
                    Spark Plug
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://emirates-car.com/search-by-part-name/Alternator"
                    className="font-mono font-semibold text-blue-600 underline hover:text-blue-900"
                  >
                    Alternator
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://emirates-car.com/search-by-part-name/Battery"
                    className="font-mono font-semibold text-blue-600 underline hover:text-blue-900"
                  >
                    Battery
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://emirates-car.com/search-by-part-name/Ignition%20Switch"
                    className="font-mono font-semibold text-blue-600 underline hover:text-blue-900"
                  >
                    Ignition Switch
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://emirates-car.com/get-in-touch"
                    className="font-mono font-semibold text-blue-600 underline hover:text-blue-900"
                  >
                    Many more...
                  </Link>
                </li>
              </ol>
            </div>

            <div>
              <p className="text-xl font-mono text-gray-700 mx-auto my-5 font-bold">
                Honda AC Parts
              </p>
              <ol className="list-disc text-xl font-mono text-gray-700 mx-auto">
                <li>
                  <Link
                    href="https://emirates-car.com/search-by-part-name/AC%20Compressor"
                    className="font-mono font-semibold text-blue-600 underline hover:text-blue-900"
                  >
                    AC Compressor
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://emirates-car.com/search-by-part-name/AC%20Condenser"
                    className="font-mono font-semibold text-blue-600 underline hover:text-blue-900"
                  >
                    AC Condenser
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://emirates-car.com/search-by-part-name/AC%20Selector"
                    className="font-mono font-semibold text-blue-600 underline hover:text-blue-900"
                  >
                    AC Selector
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://emirates-car.com/search-by-part-name/AC%20Controls"
                    className="font-mono font-semibold text-blue-600 underline hover:text-blue-900"
                  >
                    AC Controls
                  </Link>
                </li>
              </ol>
            </div>
          </div>
          <Link
            href="https://emirates-car.com/get-in-touch"
            target="_newtab"
            className="w-1/4 xs:w-full mx-auto flex items-center justify-center px-8 py-2 xl:text-xl border border-transparent font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-2 md:text-md mg:text-lg md:px-5 xs:py-2 xs:text-xs xs:my-2 2xs:text-sm 2xs:my-2 s:text-sm s:my-2 focus:filter brightness-125 my-5"
          >
            View All Parts
          </Link>
          <div className="grid grid-cols-1 place-content-center">
            <p className="text-3xl font-extrabold font-mono mx-auto my-5">
              5 ways you can find parts for your car.
            </p>
            There are 5 ways you can try finding spare parts for your car.
            <p className="text-xl font-mono text-gray-700 mx-auto my-5 font-bold">
              Traditional way its pros and cons
            </p>
            You find a spare parts shop nearby and go and purchase and the work
            is done. In this case, the pros is that you find nearby shop to have
            similar brands you have and thats it you purchase it with ease. But
            the cons is when you don't find the nearby shop to have the car
            brand which you are using. There are shop who only deal with certain
            parts like the shop A sells only in honda, Mazda, BMW and shop B
            sells only Audi, Lincoln and Ferrari. So to see for next option, you
            can opt for shopping from Giant E-commerce company like Amazon,
            EBay, Flipkart etc.
            <p className="text-xl font-mono text-gray-700 mx-auto my-5 font-bold">
              Giant E-commerce Company its pros and cons:
            </p>
            If you don't find spare parts nearby your house location, generally
            you move on to search on internet. You search for top companies
            selling spare parts online and you end up in giant e-commerce
            company like Amazon, Flipkart,Ebay etc. Now you see the review of
            person who has already ordered spare parts. Most of the reviews says
            the parts were broken. These giant company has a very big logistics
            that they are vulnerable to be broken during or even get lost during
            the check-in process. So it is not always safe to buy spare parts
            from giant e-commerce company. Hence you see for other option which
            is the Local dealers.
            <p className="text-xl font-mono text-gray-700 mx-auto my-5 font-bold">
              Local Dealers
            </p>
            Local dealers are known through other person like through friends
            and family. Or he gives you his business card and he explains you
            directly the car brands he deals with. However with the current
            digital advancement, the local dealers are decreasing gradually. So
            you move to the next option to search on online marketplace.
            <p className="text-xl font-mono text-gray-700 mx-auto my-5 font-bold">
              Online Marketplace (Only CONS!)
            </p>
            Through Online marketplace you find spare parts for your car easily.
            But it also has lots of cons. If you search for very latest model
            used spare parts, it will not be available on marketplace. In this
            case you have to contact the car brand company directly. If you
            search for very old model, it will not be available with most of the
            car brands company itself. And also there are more spam issues
            reported from those who purchase from small vendor marketplace and
            also the larger companies. In this case you should go for Online
            dealer website.
            <p className="text-xl font-mono text-gray-700 mx-auto my-5 font-bold">
              Online Dealer Website ONLY PROS!
            </p>
            Online dealers website is the easiest way to order spare parts. You
            visit a bunch of site online and submit your inquiries therein and
            dealers will contact you back through the contact information you
            submitted. If one website didnt reply you, then other website will
            do. So there is plenty of website and options.{' '}
            <Link
              href="https://emirates-car.com/"
              className="text-blue-500 hover:text-blue-900 underline"
            >
              Emirates-car.com
            </Link>{' '}
            is one such website which accept online inquiries. It deals with
            parts and accessories for honda accord, Honda civic and other honda
            models, Infiniti models, BMW models, Audi models and many other
            brands. Visit to search parts you need.
          </div>

          <OtherHondaModels />
          <div className="py-5">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d230818.9387004767!2d55.41516106289569!3d25.319455944500426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5f5fede7964b%3A0x2a830aa19c1f6d89!2sAl%20Sharjah%20-%20Sharjah%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sin!4v1640011943348!5m2!1sen!2sin"
              height={300}
              width="100%"
              allowFullScreen="null"
              priority
            ></iframe>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
