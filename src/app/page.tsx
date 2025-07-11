"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Navigation from "@/components/Navigation";
import CarList from "@/components/CarList";
import Footer from "@/components/Footer";
import ControlPanel from "@/components/Access/ControlPanel";

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

export default function Home() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <>
    <ControlPanel/>
    <div className={`bg-[#001135] ${animate ? "fade-in" : ""}`}>
      <Navigation/>
      <div className="h-[20rem] lg:h-auto">
         <div className='inset-0 flex items-center justify-center'>
            <div className="flex lg:mt-12 xl:mt-32 xl:mb-16 xl:gap-52 fade-in">
              <div className="w-1/2">
                <h1 className={`relative text-5xl mt-12 ml-4 mb-2 z-10 font-serif lg:text-7xl xl:text-8xl transition-all duration-500 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{ transitionDelay: '100ms' }}>Quality</h1>
                <h1 className={`relative text-5xl ml-4 mb-2 z-10 font-serif lg:text-7xl xl:text-8xl transition-all duration-500 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{ transitionDelay: '300ms' }}>Honesty</h1>
                <h1 className={`relative text-5xl ml-4 mb-12 z-10 font-serif lg:text-7xl xl:text-8xl transition-all duration-500 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{ transitionDelay: '500ms' }}>Trust</h1>
                <Link href="/cars" className={`bg-[#daab35] py-2 px-1 font-bold border-[1px] ml-5 text-sm lg:text-lg lg:py-3 lg:px-2 transition-all duration-500 ${animate ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '700ms' }}>DRIVE NOW</Link>
              </div>
              <div className={`w-1/2 transition-opacity duration-1000 ${animate ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '900ms' }}>
              <Image className="block w-full h-72 lg:h-96 xl:h-[40rem] object-cover object-left"
                src="/img/asset/heropage_1_land_cruiser.jpg"
                width={2000} height={2000}
                alt={"Land Cruiser"}
                />
              </div>
            </div>
         </div>
      </div>
      <div className="inset-0 lg:flex items-center justify-center">
        <div className="flex flex-col bg-[#000d2a]">
          <h1 className={`relative text-4xl mt-12 ml-4 mb-12 z-10 font-serif sm:text-center transition-all duration-500 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{ transitionDelay: '500ms' }}>IN STOCK</h1>
          <CarList/>
          <div>
          </div>
          <div className="text-center mb-24">
          <Link 
            href="/cars"
            className={`tracking-widest bg-[#daab35] py-4 px-4 font-bold underline text-black border-[1px] border-white transition-opacity duration-500 ${animate ? 'opacity-100' : 'opacity-0'}`}
            style={{ transitionDelay: '700ms' }}
            >
            SHOP MORE
          </Link>
          </div>
        </div>
      </div>
      <Footer/>
    </div>

    
    </>
  );
}
