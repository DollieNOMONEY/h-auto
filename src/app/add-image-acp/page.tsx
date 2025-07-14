"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Navigation from "@/components/Navigation";

export default function AddImage() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className="bg-[#001135] text-white">
      <Navigation />
      <div className="inset-0 lg:flex items-start justify-center lg:mx-12 lg:mt-24 lg:mb-24">
        <form className="w-full flex flex-col items-center">
          <h1 className="text-center text-2xl mb-5">Edit Car Information</h1>

          {/* Car Image */}
          <Image
            width={1000}
            height={1000}
            className={`w-full lg:w-[50rem] mb-12 transition-all duration-700 ease-out ${
              animate ? "fade-in delay-100" : "opacity-0 translate-y-5"
            }`}
            src="/img/asset/heropage_2.jpg"
            alt={"2025 Mercedes V Class"}
          />

          <div
            className={`mx-6 lg:mx-12 lg:w-[50rem] transition-all duration-700 ease-out ${
              animate ? "fade-in delay-500" : "opacity-0 translate-y-5"
            }`}
          >
            {/* Car Name */}
            <label className="block text-sm mb-2">Car Name</label>
            <input
              type="text"
              defaultValue="2025 Mercedes V Class"
              className={`text-xl w-full mb-4 px-4 py-2 bg-transparent border border-white rounded focus:outline-none focus:ring-2 focus:ring-[#f3cd4d] transition-all duration-700 ${
                animate ? "fade-in delay-500" : "opacity-0 translate-y-5"
              }`}
            />

            {/* Car Type */}
            <label className="block text-sm mb-2">Type</label>
            <input
              type="text"
              defaultValue="Van"
              className={`uppercase text-sm w-full mb-4 px-4 py-2 bg-transparent border border-white rounded focus:outline-none focus:ring-2 focus:ring-[#f3cd4d] transition-all duration-700 ${
                animate ? "fade-in delay-500" : "opacity-0 translate-y-5"
              }`}
            />

            {/* Car Brand */}
            <label className="block text-sm mb-2">Brand</label>
            <select
              className={`uppercase text-sm w-full mb-4 px-3 py-1.5 bg-[#001135] text-white border border-white rounded-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[#f3cd4d] transition-all duration-300 ${
                animate ? "fade-in delay-500" : "opacity-0 translate-y-5"
              }`}
            >
              <option value="Cadillac">Cadillac</option>
              <option value="Mercedes-Benz">Mercedes-Benz</option>
              <option value="NIO">NIO</option>
              <option value="GAC">GAC</option>
              <option value="Tesla">Tesla</option>
              <option value="Land Rover">Land Rover</option>
              <option value="Toyota">Toyota</option>
              <option value="BAIC">BAIC</option>
              <option value="Denza">Denza</option>
              <option value="Lexus">Lexus</option>
              <option value="More">More</option>
            </select>

            {/* Price */}
            <label className="block text-sm mb-2">Price</label>
            <input
              type="text"
              defaultValue="XXXXXX$"
              className={`text-[#daab35] text-sm w-full mb-4 px-4 py-2 bg-transparent border border-[#daab35] rounded focus:outline-none focus:ring-2 focus:ring-[#f3cd4d] transition-all duration-700 ${
                animate ? "fade-in delay-500" : "opacity-0 translate-y-5"
              }`}
            />

            {/* Description */}
            <label className="block text-sm mb-2">Description</label>
            <textarea
              defaultValue={`Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.

Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.`}
              rows={6}
              className={`w-full text-sm mb-10 px-4 py-2 bg-transparent border border-white rounded resize-none focus:outline-none focus:ring-2 focus:ring-[#f3cd4d] transition-all duration-700 ${
                animate ? "fade-in delay-1000" : "opacity-0 translate-y-5"
              }`}
            />

            <div className="flex justify-center">
              <button
                type="submit"
                className={`flex items-center justify-center gap-4 w-full lg:w-64 bg-[#daab35] rounded-full px-4 py-3 text-black text-lg mb-10 transition-all duration-300 ease-out transform
                  hover:scale-105 hover:shadow-lg
                  active:scale-95 active:shadow-md
                  focus:outline-none focus:ring-2 focus:ring-[#f3cd4d] focus:ring-offset-2
                  ${animate ? "fade-in" : "opacity-0 translate-y-5"}`}
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
