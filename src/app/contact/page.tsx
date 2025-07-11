"use client"
import React, { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function Contact() {
  const [animate, setAnimate] = useState(false);
    
  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className={`bg-[#001135] ${animate ? "fade-in" : ""}`}>
        <Navigation/>
        <Footer/>
    </div>
  )
}
