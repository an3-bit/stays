import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";
import herob2 from "@/assets/bg.jpg"

const HeroSection = () => {
  return (
    <section
      className="relative min-h-[70vh] flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${herob2})` }}

    >
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative z-10 flex flex-col items-center w-full px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-6 drop-shadow-lg">
          Stay in the world's most remarkable Safari Airbnbs
        </h1>
        <form className="w-full max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row items-center bg-white rounded-xl shadow-lg overflow-hidden">
            <input
              type="text"
              placeholder="Add destination"
              className="flex-1 px-6 py-4 text-base outline-none border-none bg-transparent min-w-0"
            />
            <input
              type="text"
              placeholder="Add dates"
              className="flex-1 px-6 py-4 text-base outline-none border-none bg-transparent min-w-0 border-t md:border-t-0 md:border-l border-gray-200"
            />
            <input
              type="text"
              placeholder="Add guests"
              className="flex-1 px-6 py-4 text-base outline-none border-none bg-transparent min-w-0 border-t md:border-t-0 md:border-l border-gray-200"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-orange-400 hover:bg-yellow-500 text-white font-semibold text-base rounded-none md:rounded-r-xl transition-colors"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default HeroSection;