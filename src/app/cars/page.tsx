"use client"
import React, { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation'
import CarBrandButton from '@/components/CarBrandButton'
import CarList from '@/components/CarList'
import Footer from "@/components/Footer";

export default function Cars() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className={`text-xl mb-5 mx-3 ${animate ? 'fade-in' : 'opacity-0'}`}>
        <Navigation/>
        <div className='inset-0 flex items-center justify-center lg:mx-24'>
          <div>
           <h2 className={`text-xl mb-5 mx-3 ${animate ? 'fade-in' : 'opacity-0'}`}>
            Check out the Featured Cars
          </h2>
          <div>
            <div className={`${animate ? 'fade-in delay-300' : 'opacity-0'} mx-4`}>
              <CarBrandButton name="Cadillac" image='/img/logo/logo-cadillac.png'/>
              <CarBrandButton name="Mercedes-Benz" image='/img/logo/logo-mercedes.png'/>
              <CarBrandButton name="NIO" image='/img/logo/logo-nio.png'/>
              <CarBrandButton name="GAC" image='/img/logo/logo-gac.png'/>
              <CarBrandButton name="Tesla" image='/img/logo/logo-tesla.png'/>
              <CarBrandButton name="Land Rover" image='/img/logo/logo-land-rover.png'/>
              <CarBrandButton name="Toyota" image='/img/logo/logo-toyota.png'/>
              <CarBrandButton name="BAIC" image='/img/logo/logo-baic.png'/>
              <CarBrandButton name="Denza" image='/img/logo/logo-denza.png'/>
              <CarBrandButton name="Lexus" image='/img/logo/logo-lexus.png'/>
              <CarBrandButton name="More" image='/img/logo/logo-more.png'/>      
            </div>
            <div className='mb-6'/>
            <div>
              <h1 className={`relative text-4xl mt-12 ml-4 mb-12 z-10 font-serif ${animate ? 'fade-in delay-500' : 'opacity-0'}`}>
                IN STOCK
              </h1>
             <div className={`${animate ? 'fade-in delay-700' : 'opacity-0'}`}>
                <CarList/>
              </div>
            </div>
          </div>
          </div>
        </div>
        <Footer/>
    </div>
  )
}
