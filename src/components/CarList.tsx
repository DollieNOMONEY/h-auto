"use client"
import React from 'react'
import { useEffect, useState } from "react";
import Image from 'next/image'
import Link from 'next/link'
// type Props = {
//     name: string,
//     carType: string,
//     srcImage: string,
//     altImage: string,
//     view: string
// }

const carData = [
  {
    name: "Toyota Alphard 2018",
    type: "Van",
    src: "/img/asset/heropage_3.jpg",
    price: "XXXXXX$",
    href: "/cars/car-name/car-name",
  },
  {
    name: "Honda Civic 2020",
    type: "Sedan",
    src: "/img/asset/heropage_2.jpg",
    price: "XXXXXX$",
    href: "/cars/car-name/car-name",
  },
  {
    name: "Honda Civic 2020",
    type: "Sedan",
    src: "/img/asset/heropage_2.jpg",
    price: "XXXXXX$",
    href: "/cars/car-name/car-name",
  },
  {
    name: "Honda Civic 2020",
    type: "Sedan",
    src: "/img/asset/heropage_2.jpg",
    price: "XXXXXX$",
    href: "/cars/car-name/car-name",
  },
  {
    name: "Honda Civic 2020",
    type: "Sedan",
    src: "/img/asset/heropage_2.jpg",
    price: "XXXXXX$",
    href: "/cars/car-name/car-name",
  },
  {
    name: "Honda Civic 2020",
    type: "Sedan",
    src: "/img/asset/heropage_2.jpg",
    price: "XXXXXX$",
    href: "/cars/car-name/car-name",
  },
  {
    name: "Honda Civic 2020",
    type: "Sedan",
    src: "/img/asset/heropage_2.jpg",
    price: "XXXXXX$",
    href: "/cars/car-name/car-name",
  },
  {
    name: "Honda Civic 2020",
    type: "Sedan",
    src: "/img/asset/heropage_2.jpg",
    price: "XXXXXX$",
    href: "/cars/car-name/car-name",
  },
]


export default function CarList() {
  
  function useScreenWidth() {
    const [width, setWidth] = useState(0);

    useEffect(() => {
      function updateSize() {
        setWidth(window.innerWidth);
      }

      updateSize();
      window.addEventListener("resize", updateSize);
      return () => window.removeEventListener("resize", updateSize);
    }, []);

    return width;
  }

  const screenWidth = useScreenWidth();

  const isOneColLayout = screenWidth < 768;        
  const isTwoColLayout = screenWidth >= 768 && screenWidth < 1024; 
  const isThreeColLayout = screenWidth >= 1024 && screenWidth < 1280; // lg
  const isFourColLayout = screenWidth >= 1280;

  let groupSize = 1;

  if (isTwoColLayout) groupSize = 2;
  else if (isThreeColLayout) groupSize = 3;
  else if (isFourColLayout) groupSize = 4;


  return (
    // flex justify-center gap-6 mb-12
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center gap-12 mb-12 lg:mb-24">
      {carData.map((car, index) => {
        const rowIndex = Math.floor(index / groupSize);
        const isEvenRow = rowIndex % 2 === 0;

        let carOrderClass = "";
        let barOrderClass = "";

        if (isOneColLayout) {
          carOrderClass = index % 2 === 0 ? "order-2" : "order-1";
          barOrderClass = index % 2 === 0 ? "order-1" : "order-2";
        } else {
          carOrderClass = isEvenRow ? "order-2" : "order-1";
          barOrderClass = isEvenRow ? "order-1" : "order-2";
        }

        return (
          <div key={index} className="flex justify-center items-start gap-6 w-full">
            <Link href={car.href} className={`w-[75%] block cursor-pointer ${carOrderClass}`}>
              <Image
                className="w-fit mb-7"
                src={car.src}
                alt={car.name}
                width={500}
                height={400}
              />
              <p className="text-center text-2xl hover:underline cursor-pointer active:underline focus-visible:underline">{car.name}</p>
              <p className="text-center uppercase text-sm mb-3">{car.type}</p>
              <div className="flex justify-between">
                <p className="text-[#daab35] text-sm">{car.price}</p>
                <p className="text-sm hover:underline cursor-pointer active:underline focus-visible:underline">Car Detail</p>
              </div>
            </Link>
            <div className={`w-1 h-[calc(100%-100px)] mt-auto ml-2 bg-[#daab35] ${barOrderClass}`}></div>
          </div>
        );
      })}

      
       {/* <Link href="/cars/car-name/car-name" className="w-[75%] block cursor-pointer order-1"> */}
      </div>
  )
}
