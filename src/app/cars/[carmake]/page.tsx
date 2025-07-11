// app/cars/[carmake]/page.tsx
"use client"
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'
import Navigation from '@/components/Navigation'
import CarList from '@/components/CarList'
import Footer from "@/components/Footer";

export default function CarMakePage() {
  const params = useParams();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const rawCarmake = params.carmake;
  const carmake = Array.isArray(rawCarmake) ? rawCarmake[0] : rawCarmake;

  if (!carmake) return null;

  return (
    <div className={`bg-[#001135] ${animate ? "fade-in" : ""}`}>
      <Navigation />
      
      <div className='mx-1'>
        <p
          className={`text-4xl text-center mb-5 font-serif transition-all duration-500 transform ${
            animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
          style={{ transitionDelay: '500ms' }}
        >
          {carmake.charAt(0).toUpperCase() + carmake.slice(1)} Cars
        </p>
        <div className={`transition-opacity duration-1000 ${animate ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '900ms' }}>
          <CarList />
        </div>
      </div>

      <Footer />
    </div>
  )
}
