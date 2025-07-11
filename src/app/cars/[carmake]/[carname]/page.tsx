"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import Navigation from '@/components/Navigation'
import Footer from "@/components/Footer";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTelegramPlane } from '@fortawesome/free-brands-svg-icons'


export default function CarPage() {
    const [animate, setAnimate] = useState(false);
  
    useEffect(() => {
      setAnimate(true);
    }, []);
  

  return (
    <div className="bg-[#001135]">
        <Navigation/>
        <div className='inset-0 lg:flex items-start justify-center lg:mx-12 lg:mt-24 lg:mb-24'>
          <Image 
          width={1000}
          height={1000}
          className={`w-full lg:w-[50rem] mb-12 transition-all duration-700 ease-out ${animate ? 'fade-in delay-100' : 'opacity-0 translate-y-5'}`}
          src="/img/asset/heropage_2.jpg"
          alt={"2025 Mercedes V Class"}
          />
          <div className={`mx-6 lg:mx-12 lg:w-[50rem] transition-all duration-700 ease-out ${animate ? 'fade-in delay-500' : 'opacity-0 translate-y-5'}`}>
              {/* logo of car brand */}
              <p className={`text-2xl transition-all duration-700 ${animate ? 'fade-in delay-500' : 'opacity-0 translate-y-5'}`}>
                2025 Mercedes V Class
              </p>
             <p className={`uppercase text-sm mb-3 transition-all duration-700 ${animate ? 'fade-in delay-500' : 'opacity-0 translate-y-5'}`}>
              Van
              </p>
             <p className={`text-[#daab35] text-sm mb-3 transition-all duration-700 ${animate ? 'fade-in delay-500' : 'opacity-0 translate-y-5'}`}>
                XXXXXX$
              </p>
             <p className={`text-sm mb-10 transition-all duration-700 ${animate ? 'fade-in delay-1000' : 'opacity-0 translate-y-5'}`}>
                  Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
                  <br/><br/>Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
              </p>
              <button className={`flex items-center justify-center gap-4 w-full lg:w-64 bg-[#daab35] rounded-full px-4 py-3 text-white text-lg mb-10 transition-all duration-700 ${animate ? 'fade-in delay-1000' : 'opacity-0 translate-y-5'}`}>
                <FontAwesomeIcon icon={faTelegramPlane} className="w-8"/>
                Contact via Telegram
              </button>
          </div>
       </div>
        <Footer/>
    </div>
    
  )
}
