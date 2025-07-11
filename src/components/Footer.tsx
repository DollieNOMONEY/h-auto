"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTelegramPlane, faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons'


export default function Footer() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);
  
  return (
    <div className={`w-full h-56 sm:h-64 lg:h-72 object-center relative transition-all duration-700 ease-out ${animate ? 'fade-in delay-700' : 'opacity-0 translate-y-5'}`}>
        <Image src="/img/asset/footer-img.jpg" alt="Footer background" fill className='object-cover brightness-25'/>
        <div className='absolute inset-0 flex items-center justify-center'>
          <div>
            <div className='flex items-center justify-center p-5 gap-5 sm:gap-8 lg:gap-12'>
                <Image src="/img/logo/logo.jpg" alt="Logo Icon" width={590} height={590} className='h-20 w-20'/>
                <div>
                    <p className='text-white text-md mb-5 underline break-words'>Cnr Mao Tse Toung Blvd (St: 245) & St 202 Phnom Penh Cambodia</p>
                    <p className='text-white text-md mb-5 underline break-words'>+855 12 236 789</p>
                    <div className="flex gap-4 text-white text-2xl">
                      <FontAwesomeIcon icon={faTelegramPlane} />
                      <FontAwesomeIcon icon={faFacebookF} />
                      <FontAwesomeIcon icon={faInstagram} />
                    </div>
                </div>
            </div>
          </div>
        </div>
    </div>
  )
}
