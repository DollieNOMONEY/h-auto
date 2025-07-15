"use client"
import Link from 'next/link';
import React from 'react';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function ControlPanel() {
  const [user, loading] = useAuthState(auth);
  const [openPanel, setOpenPanel] = useState(false);
  const router = useRouter();


  function onButtonClicked() {
    setOpenPanel(!openPanel);
  }

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };


  if (loading) {
    return null;
  }

  if (!user || user.uid !== process.env.NEXT_PUBLIC_OWNER_UID) {
    return null;
  }

  return (
    <>
      { openPanel && (
        <div className='fixed bg-[#00000077] w-full h-dvh top-0 left-0 z-50' onClick={onButtonClicked}>
          <div className='fixed -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-[#001135] p-12'
          onClick={(e) => e.stopPropagation()}>
            <div className='flex flex-col justify-center'>
              <Link href="/add-image-acp" className="bg-[#daab35] py-2 px-1 font-bold border-[1px] text-sm mb-4 text-center">+ Add Car</Link>
              <button 
                onClick={handleLogout}
                className="bg-red-600 py-2 px-1 font-bold border-[1px] text-sm text-white"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
      <div className='fixed bottom-5 right-5 w-20 h-20 z-50'>
        <button type="button" onClick={onButtonClicked} className='bg-[#daab35] border-[#a87900] border-2 opacity-80 rounded-full text-center w-full h-full flex items-center justify-center'>
            <span className='text-5xl text-black'>+</span>
        </button>
      </div>
    </>
  )
}