'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faSearch } from '@fortawesome/free-solid-svg-icons'

export default function Navigation() {

    const [menuOpened, setMenuOpened] = useState(false);
    function openMenu() {
        setMenuOpened(!menuOpened);
        // if (menuOpened == true) {
        //     document.body.style.overflow = "hidden";
        // }
        // else {
        //     document.body.style.overflow = "";
        // }
    }

  return (
    <nav className='w-full sticky top-0 z-40'> 
    
        <div className='flex flex-col justify-between'> 
            <div className='w-full'>
                <div className='relative flex justify-between lg:justify-around align-middle py-5 px-4 z-50 bg-[#001135]'>
                    <Link href="/">
                        <Image
                        src="/img/logo/logo.jpg"
                        alt="H-Auto"
                        width={590}
                        height={590}
                        className='object-contain w-10'
                        />
                    </Link>
                    <div className='flex gap-5'>
                        <button onClick={openMenu} className='text-2xl opacity-75 md:hidden'>☰</button>
                        <div className='hidden md:inline'>
                            <Link href="/" className='text-xs  uppercase'>Home</Link>
                        </div>
                         <div className='hidden md:inline'>
                            <Link href="/cars" className='text-xs uppercase'>Garage</Link>
                        </div>
                        {/*<div className='hidden md:inline'>
                            <a className='text-xs  uppercase'>About Us</a>
                        </div> */}
                        <div className='hidden md:inline'>
                            <Link href="/contact" className='text-xs uppercase'>Contact</Link>
                        </div>
                    </div>
                </div>
               { menuOpened && (
                <div className='absolute top-0 left-0 w-full h-dvh bg-[#000000a3]'>
                    <div className='flex flex-col justify-between fixed bg-[#001135] top-0 left-0 h-dvh w-full z-40'>
                        <div>
                            <div className='mb-20'/>
                            <input 
                            placeholder='SEARCH'
                            className='w-full p-2 border-b-2 opacity-35 outline-0 outline-transparent text-xs'
                            />
                            <Link href="/" className='active:underline focus-visible:underline w-full p-3 uppercase text-xs  block'>Home</Link>
                            {/* <div className='w-full p-3 uppercase text-xs '>Account</div> */}
                            <Link href="/cars" className='active:underline focus-visible:underline w-full p-3 uppercase text-xs  block'>Garage</Link>
                            {/* <Link href="/" className='w-full p-3 uppercase text-xs  block'>About Us</Link> */}
                            <Link href="/contact" className='active:underline focus-visible:underline w-full p-3 uppercase text-xs  block'>Contact</Link>
                        </div>
                    </div>
                </div>
               ) }
            </div>

            {/* { menuOpened && (
                
            )} */}
        </div>

    </nav>
  )
}
