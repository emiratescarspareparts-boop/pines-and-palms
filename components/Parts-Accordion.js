'use client';
import React from 'react';
import 'react-accessible-accordion/dist/fancy-example.css';

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import Link from 'next/link';
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

// text-blue-700 on white passes WCAG AA (4.5:1); text-blue-500 does not.
const linkClass = 'text-blue-700 underline hover:no-underline';

// Heading level for each question. The section title is an h3,
// so the questions sit one level below it. Change both together
// if your page structure needs different levels.
const QUESTION_LEVEL = 4;

export default function PartsAccordion({ make, location }) {
  // Built once so the question text never ends up with stray spaces
  // like "sell ?" or "within the in Dubai".
  const inLocation = location ? ` in ${location}` : '';
  const fromLocation = location ? ` from ${location}` : '';

  return (
    <section
      aria-labelledby="faq-heading"
      className={`py-5 xxs:px-7 sm:px-7 s:py-6 lg:mx-6 md:mx-6 xs:mx-2 xxs:mx-2 max-w-7xl mx-auto ${firaSans.className}`}
    >
      {/* Removed animate-bounce (infinite motion fails WCAG 2.2.2) and the
          deprecated <nobr> element. */}
      <h3
        id="faq-heading"
        className={`text-4xl md:text-2xl lg:text-3xl font-semibold xs:text-2xl xxs:text-2xl py-5 ${playfair_display.className}`}
      >
        Frequently asked questions
      </h3>
      <Accordion className="my-10">
        <AccordionItem>
          <AccordionItemHeading aria-level={QUESTION_LEVEL}>
            {/* No link inside the button: interactive content nested in a
                button is invalid and makes the button name noisy. */}
            <AccordionItemButton>
              How to order {make} auto spare parts with Emirates-car.com
              {inLocation}?
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <p>
              To order spare parts with Emirates-car.com, you just have to
              submit an inquiry using the{' '}
              <Link href="/#myForm" className={linkClass}>
                inquiry form
              </Link>
              , then you are good to go.
            </p>
          </AccordionItemPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionItemHeading aria-level={QUESTION_LEVEL}>
            <AccordionItemButton>
              What are all the {make} upgrades parts do you sell{inLocation}?
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <p>
              We provide aerodynamics upgrades parts, performance upgrades
              parts, suspension upgrades parts, cooling system upgrades parts,
              transmission and drivetrain upgrades, braking system upgrades
              parts, exterior and interior upgrades parts.
            </p>
          </AccordionItemPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionItemHeading aria-level={QUESTION_LEVEL}>
            <AccordionItemButton>
              Can I find parts for discontinued {make} parts{inLocation}?
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <p>
              The best thing you can do is leave it to the professionals. They
              will provide expert advice and help you choose the right part for
              your car&apos;s requirements.
            </p>
          </AccordionItemPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionItemHeading aria-level={QUESTION_LEVEL}>
            <AccordionItemButton>
              What should I do if I&apos;m unsure whether the part I want to
              buy will fit my car?
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <p>
              The best thing you can do is leave it to the professionals. They
              will provide expert advice and help you choose the right part for
              your car&apos;s requirements.
            </p>
          </AccordionItemPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionItemHeading aria-level={QUESTION_LEVEL}>
            <AccordionItemButton>
              What types of {make} parts does Emirates-car.com sell
              {inLocation}?
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            {/* Link text now says where it goes instead of an all-caps
                brand name, which some screen readers spell out letter by
                letter. */}
            <p>
              Emirates-car.com deals in Genuine/OEM, used and aftermarket
              parts. To ask about a specific part,{' '}
              <Link href="/#myForm" className={linkClass}>
                submit an inquiry
              </Link>
              .
            </p>
          </AccordionItemPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionItemHeading aria-level={QUESTION_LEVEL}>
            <AccordionItemButton>
              What is the difference between Genuine/OEM {make} parts and
              aftermarket {make} parts?
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            {/* <h6> inside <p> is invalid HTML (it also triggers React
                hydration errors). Using separate paragraphs with <strong>
                keeps the visual look without the invalid nesting. */}
            <p>
              <strong>Genuine/OEM {make} Parts:</strong>{' '}
              These are made by the car manufacturer or their authorized
              suppliers and are identical to the original parts installed in
              your vehicle. They ensure perfect fit, quality, and warranty
              compliance but are usually more expensive.
            </p>
            <p className="mt-3">
              <strong>Aftermarket {make} Parts:</strong>{' '}
              These are made by third-party manufacturers and may not exactly
              match the original specifications. They are often cheaper and
              available in a wider variety but can vary in quality and
              durability.
            </p>
          </AccordionItemPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionItemHeading aria-level={QUESTION_LEVEL}>
            <AccordionItemButton>
              Do you provide warranty on {make} spare parts{inLocation}?
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <p>Yes, we do provide.</p>
          </AccordionItemPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionItemHeading aria-level={QUESTION_LEVEL}>
            <AccordionItemButton>
              What if the part which I bought doesn&apos;t fit my car?
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <p>
              If the part doesn&apos;t fit your car, you can return or exchange
              it within our policy timeframe, provided it&apos;s unused. For
              accurate compatibility, we recommend consulting a professional
              mechanic, and if needed, we can assist in sourcing the correct
              part for your vehicle.
            </p>
          </AccordionItemPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionItemHeading aria-level={QUESTION_LEVEL}>
            <AccordionItemButton>
              What should I do if the spare parts I received are damaged
              {inLocation}?
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <p>
              You can contact us via WhatsApp, and we will assist you with the
              replacement.
            </p>
          </AccordionItemPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionItemHeading aria-level={QUESTION_LEVEL}>
            <AccordionItemButton>
              Do you offer installation services{inLocation}?
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <p>
              We do not provide installation services directly, but we can
              recommend trusted mechanics or service centers who can assist with
              the installation of the parts.
            </p>
          </AccordionItemPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionItemHeading aria-level={QUESTION_LEVEL}>
            <AccordionItemButton>
              How long does delivery take {location ? `within ${location}` : 'within the UAE'}?
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <p>It takes around 4 to 6 days.</p>
          </AccordionItemPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionItemHeading aria-level={QUESTION_LEVEL}>
            <AccordionItemButton>
              Do you provide international shipping{fromLocation}?
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <p>Yes, we do provide.</p>
          </AccordionItemPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionItemHeading aria-level={QUESTION_LEVEL}>
            <AccordionItemButton>
              What are all the courier services available{fromLocation}?
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <p>
              We choose best courier services based on delivery speed, pricing,
              real time tracking and good coverage such as NasEx, FedEx, Aramex,
              DHL, Professional courier etc.
            </p>
          </AccordionItemPanel>
        </AccordionItem>
      </Accordion>
    </section>
  );
}