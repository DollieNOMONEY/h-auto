import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  name: string,
  image: string,
}

export default function CarBrandButton({name, image}: Props) {
  return (
    <div className="relative inline-flex h-14 align-middle gap-5 bg-[#00000054] py-4 px-2 mb-2 mr-2
        cursor-pointer
        transition-transform transition-shadow duration-300 ease-out
        hover:scale-105 hover:shadow-lg
        active:scale-95 active:shadow-md
        focus:outline-none focus:ring-2 focus:ring-[#f3cd4d] focus:ring-offset-2"
    >
      <Image
        src={image}
        alt={name}
        width={30}
        height={40}
        className='object-contain'
      />
      <p className="text-md h-fit">{name}</p>
      <Link className='bg-black opacity-0 absolute top-0 left-0 w-full h-full z-20 text-center' href={`/cars/${name.toLowerCase()}`}>Link</Link>
    </div>
  )
}
