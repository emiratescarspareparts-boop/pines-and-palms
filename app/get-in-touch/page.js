import React from 'react';
import Link from 'next/link';
import Footer from '../../components/footer';
import Social from '../../components/Social';
import GetInTouchForm from '../../components/GetInTouchForm';
export const revalidate = 1814400;
export const runtime = 'edge';
export const fetchCache = 'force-cache';
export const dynamicParams = false;
export const dynamic = 'force-static';

export default async function Forms() {
  return (
    <div>
      <div className="container place-content-center mx-auto py-6">
        <Social />
        <div className="text-center">
          <Link
            href="/honda-accord-8th-gen-parts"
            className="underline animate-pulse text-red-600 hover:text-red-800"
          >
            {' '}
            Check Offers On Honda Accord 8th Generation 2008, 2009, 2010, 2011,
            2012
          </Link>
        </div>

        <div className="flex s:grid s:grid-cols-1 xs:grid xs:grid-cols-1 2xs:grid 2xs:grid-cols-1 sm:grid sm:grid-cols-1 shadow-2xl ">
          <GetInTouchForm />
        </div>
      </div>
      <Footer />
    </div>
  );
}
