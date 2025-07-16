"use client"

import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import Navigation from '@/components/Navigation'
import Footer from "@/components/Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTelegramPlane } from '@fortawesome/free-brands-svg-icons'
import { type CarWithBrand, deleteCar } from '@/app/_actions/carActions';

import Link from 'next/link';
import { useRouter } from 'next/navigation'; 

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';


export default function CarDetailClient({ car }: { car: CarWithBrand }) {
    const [animate, setAnimate] = useState(false);
    // state for interactive image gallery
    const [currentImage, setCurrentImage] = useState(car.imageUrls[0]);

    const [user] = useAuthState(auth);
    const router = useRouter();

    useEffect(() => {
        setAnimate(true);
    }, []);

    const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this car listing? This cannot be undone.");
    if (confirmed) {
        try {
            const result = await deleteCar(car.id, car.imageUrls);
            if (result.success) {
                alert("Car deleted successfully.");
                router.push('/');
            } else {
                throw new Error(result.error);
            }
        } catch (error) {
            alert("Failed to delete car.");
            console.error(error);
        }
    }
  };


    return (
        <div className="bg-[#001135] text-white">
            <Navigation/>
            <div className='lg:flex items-center justify-center'>
                <div className='lg:grid lg:grid-cols-2 lg:gap-12 items-start justify-center lg:mx-12 lg:mt-24 lg:mb-24 max-w-screen-xl mx-auto'>
                    
                    {/* image gallery section */}
                    <div className={`w-full transition-all duration-700 ease-out ${animate ? 'fade-in delay-100' : 'opacity-0 translate-y-5'}`}>
                        <div className="relative w-full h-96 lg:h-[32rem] mb-4">
                            <div className="relative w-full h-96">
                                <Image
                                    sizes="(max-width: 768px) 100vw, 640px"
                                    key={currentImage}
                                    src={currentImage}
                                    alt={car.name}
                                    fill
                                    style={{ objectFit: 'contain' }}
                                />
                            </div>
                        </div>
                        <div className="flex gap-2 p-2 overflow-x-auto mb-12">
                            {car.imageUrls.map((imgUrl, index) => (
                                <div
                                    key={index}
                                    className={`relative w-24 h-24 flex-shrink-0 cursor-pointer rounded-md overflow-hidden border-2 ${currentImage === imgUrl ? 'border-[#daab35]' : 'border-transparent'}`}
                                    onClick={() => setCurrentImage(imgUrl)}
                                >
                                    <Image
                                        src={imgUrl}
                                        alt={`${car.name} thumbnail ${index + 1}`}
                                        fill
                                        className="object-cover"
                                        sizes="100px"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {/* car details */}
                    <div className={`mx-6 lg:mx-0 lg:w-full transition-all duration-700 ease-out ${animate ? 'fade-in delay-500' : 'opacity-0 translate-y-5'}`}>
                        <p className={`text-2xl font-bold transition-all duration-700 ${animate ? 'fade-in delay-500' : 'opacity-0 translate-y-5'}`}>
                            {car.name}
                        </p>
                        <p className={`uppercase text-sm mb-3 transition-all duration-700 ${animate ? 'fade-in delay-500' : 'opacity-0 translate-y-5'}`}>
                            {car.brandName}
                        </p>
                        <p className={`text-[#daab35] text-lg mb-3 transition-all duration-700 ${animate ? 'fade-in delay-500' : 'opacity-0 translate-y-5'}`}>
                            {car.price}
                        </p>
                        <p className={`text-sm text-gray-300 mb-10 transition-all duration-700 whitespace-pre-line ${animate ? 'fade-in delay-1000' : 'opacity-0 translate-y-5'}`}>
                            {car.description}
                        </p>
                        <a
                            className={`whitespace-nowrap flex items-center justify-center gap-4 w-full lg:w-64 bg-[#daab35] rounded-full px-4 py-3 text-black font-bold text-lg mb-10 transition-all duration-300 ease-out transform hover:scale-105 active:scale-95`}
                            href="https://t.me/KIM_HENG_016"
                            target="_blank"
                            rel="noreferrer noopener"
                        >
                            <FontAwesomeIcon icon={faTelegramPlane} className="w-6 h-6"/>
                            Contact via Telegram
                        </a>

                        {user?.uid === process.env.NEXT_PUBLIC_OWNER_UID && (
                            <div className="mt-8 border-t border-gray-700 pt-6 flex items-center gap-4 mb-12">
                            <Link
                                href={`/edit-car/${car.id}`}
                                className="bg-blue-600 text-white font-bold py-2 px-6 rounded-full hover:bg-blue-700 transition-colors"
                            >
                                Update
                            </Link>
                            <button
                                onClick={handleDelete}
                                className="bg-red-600 text-white font-bold py-2 px-6 rounded-full hover:bg-red-700 transition-colors"
                            >
                                Delete
                            </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}