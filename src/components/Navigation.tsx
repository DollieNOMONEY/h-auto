'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Navigation() {
  const [menuOpened, setMenuOpened] = useState(false);

  function openMenu() {
    if (!menuOpened) {
      // Find the scroller using its class name
      const scroller = document.querySelector('.wrapper');
      
      // Scroll it to the top
      scroller?.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setMenuOpened(!menuOpened);
  }

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) {
        setMenuOpened(false);
      }
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className='w-full sticky top-0 z-40'> 
      <div className='flex flex-col justify-between'> 
        <div className='w-full'>
          <div className='relative flex justify-between lg:justify-around items-center py-5 px-4 z-50 bg-[#001135]'>
            <Link href="/">
              <Image
                src="/img/logo/logo.jpg"
                alt="H-Auto"
                width={590}
                height={590}
                className='object-contain w-10'
                priority 
              />
            </Link>

            <div className='flex gap-5'>
              <button
                onClick={openMenu}
                className='text-2xl opacity-75 md:hidden transition-transform duration-200 ease-out hover:scale-110 active:scale-90 focus:outline-none focus:ring-2 focus:ring-[#f3cd4d]'
                aria-label="Toggle menu"
              >
                ☰
              </button>

              <div className='hidden md:flex gap-5'>
                <Link
                  href="/"
                  className='text-xs uppercase px-3 py-1 rounded transition duration-300 ease-in-out hover:bg-[#f3cd4d] hover:text-black focus:outline-none focus:ring-2 focus:ring-[#f3cd4d]'
                >
                  Home
                </Link>
                <Link
                  href="/cars"
                  className='text-xs uppercase px-3 py-1 rounded transition duration-300 ease-in-out hover:bg-[#f3cd4d] hover:text-black focus:outline-none focus:ring-2 focus:ring-[#f3cd4d]'
                >
                  Garage
                </Link>
                <Link
                  href="/contact"
                  className='text-xs uppercase px-3 py-1 rounded transition duration-300 ease-in-out hover:bg-[#f3cd4d] hover:text-black focus:outline-none focus:ring-2 focus:ring-[#f3cd4d]'
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile menu overlay */}
          {menuOpened && (
            <div
              className='fixed inset-0 bg-[#000000a3] backdrop-blur-sm z-40 opacity-100 transition-opacity duration-300 ease-out'
            >
              <div
                className='flex flex-col justify-start bg-[#001135] top-0 left-0 h-auto w-full p-6 space-y-4'
              >
                <div className='mb-12'/>
                {/* <input
                  placeholder='SEARCH'
                  className='w-full p-2 border-b-2 border-gray-500 bg-transparent text-xs text-white placeholder-white focus:outline-none focus:border-[#f3cd4d]'
                /> */}
                <Link
                  href="/"
                  className='block w-full uppercase text-xs py-3 px-2 rounded hover:bg-[#f3cd4d] hover:text-black focus:outline-none focus:ring-2 focus:ring-[#f3cd4d]'
                >
                  Home
                </Link>
                <Link
                  href="/cars"
                  className='block w-full uppercase text-xs py-3 px-2 rounded hover:bg-[#f3cd4d] hover:text-black focus:outline-none focus:ring-2 focus:ring-[#f3cd4d]'
                >
                  Garage
                </Link>
                <Link
                  href="/contact"
                  className='block w-full uppercase text-xs py-3 px-2 rounded hover:bg-[#f3cd4d] hover:text-black focus:outline-none focus:ring-2 focus:ring-[#f3cd4d]'
                >
                  Contact
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
