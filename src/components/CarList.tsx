"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getCars, type CarWithBrand } from '@/app/_actions/carActions';

export default function CarList({ brandName, listOtherBrands }: { brandName?: string; listOtherBrands?: boolean }) {
  const [cars, setCars] = useState<CarWithBrand[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchCars = async () => {
      setIsLoading(true);
      const { success, data } = await getCars({ brandName, listOtherBrands });
      if (success && data) {
        setCars(data);
      }
      setIsLoading(false);
    };

    fetchCars();
  }, [brandName, listOtherBrands]);

  function useScreenWidth() {
    const [width, setWidth] = useState(0);

    useEffect(() => {
      function updateSize() {
        setWidth(window.innerWidth);
      }
      if (typeof window !== 'undefined') {
        updateSize();
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
      }
    }, []);

    return width;
  }

  const screenWidth = useScreenWidth();
  const isTwoColLayout = screenWidth >= 768 && screenWidth < 1024;
  const isThreeColLayout = screenWidth >= 1024 && screenWidth < 1280;
  const isFourColLayout = screenWidth >= 1280;

  let groupSize = 1;
  if (isFourColLayout) groupSize = 4;
  else if (isThreeColLayout) groupSize = 3;
  else if (isTwoColLayout) groupSize = 2;

  if (isLoading) {
    return <p className="text-center text-gray-400 mb-24">Loading cars...</p>;
  }

  if (cars.length === 0) {
    return <p className="text-center text-gray-400 mb-24">No cars available.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center gap-12 mb-12 lg:mb-24">
      {cars.map((car, index) => {
    const rowIndex = Math.floor(index / groupSize);
    const isEvenRow = rowIndex % 2 === 0;
    const colIndex = index % groupSize;
    const isOnRightSide = colIndex === groupSize - 1 || colIndex === 2;
    
    let carOrderClass = isEvenRow ? "order-2" : "order-1";
    let barOrderClass = isEvenRow ? "order-1" : "order-2";
    if (screenWidth < 768) {
        carOrderClass = index % 2 === 0 ? "order-2" : "order-1";
        barOrderClass = index % 2 === 0 ? "order-1" : "order-2";
    }

    // --- FIXES ARE HERE ---
    // 1. Safely create a URL-friendly slug for the brand name.
    const brandSlug = (car.brandName || 'other').toLowerCase().replace(/ /g, '-');
    
    // 2. Safely get the first image, or use a placeholder if none exist.
    const imageSrc = car.imageUrls?.[0] || '/img/placeholder.jpg'; // Using optional chaining and a fallback
    // ----------------------

    return (
      <div key={car.id} 
        className={`flex justify-center items-start gap-6 w-full transition-all duration-300 ease-out transform 
          hover:scale-105 hover:shadow-lg active:scale-95 active:shadow-md
          focus:outline-none focus:ring-2 focus:ring-[#f3cd4d] focus:ring-offset-2
          ${isOnRightSide ? "origin-right" : "origin-left"}
        `}
      >
        {/* Use the new safe variables in the Link and Image components */}
        <Link href={`/cars/${brandSlug}/${car.id}`} className={`w-[75%] block cursor-pointer ${carOrderClass}`}>
          <Image
            className="w-fit mb-7"
            src={imageSrc}
            alt={car.name}
            width={500}
            height={400}
            priority={index < groupSize}
          />
          <p className="text-center text-2xl hover:underline cursor-pointer active:underline focus-visible:underline">{car.name}</p>
          <p className="text-center uppercase text-sm mb-3">{car.brandName || 'N/A'}</p> {/* Also add a fallback here */}
          <div className="flex justify-between">
            <p className="text-[#daab35] text-sm">{car.price}</p>
            <p className="text-sm hover:underline cursor-pointer active:underline focus-visible:underline">Car Detail</p>
          </div>
        </Link>
        <div className={`w-1 h-[calc(100%-100px)] mt-auto ml-2 bg-[#daab35] ${barOrderClass}`}></div>
      </div>
    );
})}
    </div>
  );
}