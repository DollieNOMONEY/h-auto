"use client"
import React from 'react';
import { useState } from 'react'

export default function Ctrl() {
  const [openPanel, setOpenPanel] = useState(false);

  function onButtonClicked() {
    setOpenPanel(!openPanel);
  }

  return (
    <>
      { openPanel && (
        <div className='fixed bg-[#00000077] w-full h-dvh top-0 left-0 z-50' onClick={onButtonClicked}>
          <div className='fixed -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-[#001135] p-12'
          onClick={(e) => e.stopPropagation()}>
            <div className='flex flex-col justify-center'>
              <button className="bg-[#daab35] py-2 px-1 font-bold border-[1px] text-sm mb-4">+ Add Image</button>
              <button className="bg-[#daab35] py-2 px-1 font-bold border-[1px] text-sm">+ Edit Page</button>
            </div>
          </div>
        </div>
      )}
      <div className='fixed bottom-5 right-5 w-20 h-20 z-50'>
        <button type="button" onClick={onButtonClicked} className='bg-[#daab35] border-[#a87900] border-2 opacity-80 rounded-full text-center w-full'>
            <span className='text-7xl text-black'>+</span>
        </button>
      </div>
    </>
  )
}
