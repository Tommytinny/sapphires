import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed w-full top-0 z-50 bg-white border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 95 20"
                  className="h-8 sm:h-6 md:h-8 lg:h-8 xl:h-10"
                >
                  {/* Sapphires gem outline */}
                  <path
                    d="M10 2L14 6L18 2L14 10L10 2Z"
                    fill="#0ea5e9"
                    stroke="#0369a1"
                    strokeWidth="0.5"
                  />
                  {/* Inner sparkle */}
                  <path
                    d="M14 4L15 5L16 4L15 6L14 4Z"
                    fill="#ffffff"
                    opacity="0.8"
                  />
                  {/* Text "SAPPHIRES" */}
                  <text
                    x="22"
                    y="12"
                    fontFamily="unbounded Variable, sans-serif"
                    fontSize="10"
                    fontWeight="bold"
                    fill="#4b5563"
                  >
                    Sapphires
                  </text>
                </svg>
          
        </div>
        
        <div className="hidden md:flex items-center md:gap-4 lg:gap-6 md:text-sm lg:text-base">
          <a href="#features" className="text-gray-600 font-unbounded hover:text-black">Features</a>
          <a href="#faq" className="text-gray-600 font-unbounded hover:text-black">FAQ</a>
          <a href="#about" className="text-gray-600 font-unbounded hover:text-black">About US</a>
          <a href="#booking" className="px-6 py-2 bg-[#117cb4] text-[#c5e0fa] font-unbounded rounded-full md:text-xs lg:text-sm font-semiboldshadow-md hover:shadow-lg transform hover:scale-105">
            Book Raid Session
          </a>
        </div>

        <button 
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 md:hidden">
            <div className="flex flex-col gap-4 p-4">
              <a href="#features" className="text-gray-500 font-unbounded hover:text-black">Features</a>
              <a href="#faq" className="text-gray-500 font-unbounded hover:text-black">FAQ</a>
              <a href="#about" className="text-gray-500 font-unbounded hover:text-black">About Us</a>
              <a href="#booking" className="px-6 py-2 bg-[#117cb4] text-[#c5e0fa] font-unbounded rounded-full text-sm font-semibold shadow-md hover:shadow-lg transform hover:scale-105">
                Book Raid Session
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}