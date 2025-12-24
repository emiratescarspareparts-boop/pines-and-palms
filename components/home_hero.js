import React from 'react';
import Image from 'next/image';
import NewCar from '../public/img/icons/new-car.png';
import UsedCar from '../public/img/icons/used-car.png';
import Genuine from '../public/img/icons/genuine.png';
import AfterMarket from '../public/img/icons/aftermarket.png';
import Britain from '../public/img/icons/united-kingdom.png';
import Indian from '../public/img/icons/india.png';
import Japan from '../public/img/icons/japan.png';
import Korean from '../public/img/icons/south-korea.png';
import USA from '../public/img/icons/usa.png';
import Germany from '../public/img/icons/germany.png';
import China from '../public/img/icons/china.png';
import France from '../public/img/icons/france.png';
import Link from 'next/link';
import FormComponent from './FormComponent';
import { getFormModel, getParts } from '../app/page';
import StaticParts from './StaticParts';
import HeroCarousel from './HeroCarousel';
import products from "../public/products.json"
import ProductFilter from './ProductFilter';

export default async function HomeHero({ searchParams }) {
  const modelforms = await getFormModel();
  const partsposts = await getParts();
  const {
    "filter_car_parts[]": categories = [],
    "engine[]": engines = [],
    "compatibility[]": compats = [],
    search = "",
    featured,
  } = searchParams || {};

  const selectedCategories = Array.isArray(categories)
    ? categories
    : [categories].filter(Boolean);

  const selectedEngines = Array.isArray(engines)
    ? engines
    : [engines].filter(Boolean);

  const selectedCompats = Array.isArray(compats)
    ? compats
    : [compats].filter(Boolean);

  const query = search?.toLowerCase() || "";

  // All products
  const allProducts = products;

  // STEP 1 — FILTER ALL RULES
  let filtered = allProducts.filter(product => {
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);

    const matchesSearch =
      product.partname.toLowerCase().includes(query) ||
      product.partnumber.toLowerCase().includes(query) ||
      product.engine?.some(e => e.toLowerCase().includes(query)) ||
      product.compatibility?.some(c =>
        `${c.make} ${c.model} ${c.years ?? ""}`.toLowerCase().includes(query)
      );

    const matchesEngine =
      selectedEngines.length === 0 ||
      product.engine?.some(e => selectedEngines.includes(e));

    const matchesCompatibility =
      selectedCompats.length === 0 ||
      product.compatibility?.some(c =>
        selectedCompats.includes(
          `${c.make} ${c.model} ${c.years ? `(${c.years})` : ""}`
        )
      );

    return (
      matchesCategory &&
      matchesSearch &&
      matchesEngine &&
      matchesCompatibility
    );
  });

  // STEP 2 — FILTER FEATURED ONLY
  if (featured === "true") {
    filtered = filtered.filter(p => p.featured === "true");
  }
  return (
    <div>






    </div>
  );
}
