"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Search,
  Car,
  Key,
  CalendarClock
} from "lucide-react";

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState("buy");
  
  return (
    <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white">
      <div className="container mx-auto px-4 py-16 md:py-20 lg:py-28">
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 md:mb-6 leading-tight">
            Your Journey to the Perfect Car Experience
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-8">
            Discover, finance, purchase, lease, rent and maintain cars entirely online through a single platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center sm:space-x-4 space-y-3 sm:space-y-0">
            <button 
              className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-3 rounded-lg font-medium text-lg shadow-lg"
            >
              Get Started
            </button>
            <button 
              className="border border-white text-white hover:bg-white/10 px-8 py-3 rounded-lg font-medium text-lg"
            >
              Learn More
            </button>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-2 mb-10 md:mb-12">
          <div className="grid grid-cols-3 gap-2 mb-4">
            <button
              className={`py-3 rounded-xl transition-all ${
                activeTab === "buy" 
                  ? "bg-white text-blue-900 font-medium shadow-sm" 
                  : "text-white hover:bg-white/10"
              }`}
              onClick={() => setActiveTab("buy")}
            >
              <Car className="h-5 w-5 mx-auto mb-1" />
              Buy
            </button>
            <button
              className={`py-3 rounded-xl transition-all ${
                activeTab === "lease" 
                  ? "bg-white text-blue-900 font-medium shadow-sm" 
                  : "text-white hover:bg-white/10"
              }`}
              onClick={() => setActiveTab("lease")}
            >
              <Key className="h-5 w-5 mx-auto mb-1" />
              Lease
            </button>
            <button
              className={`py-3 rounded-xl transition-all ${
                activeTab === "rent" 
                  ? "bg-white text-blue-900 font-medium shadow-sm" 
                  : "text-white hover:bg-white/10"
              }`}
              onClick={() => setActiveTab("rent")}
            >
              <CalendarClock className="h-5 w-5 mx-auto mb-1" />
              Rent
            </button>
          </div>
          
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                className="w-full bg-white py-3 pl-12 pr-24 rounded-xl text-gray-800 placeholder-gray-400 outline-none"
                placeholder={
                  activeTab === "buy"
                    ? "Search for cars to buy..."
                    : activeTab === "lease"
                    ? "Search for lease options..."
                    : "Find a rental car..."
                }
              />
              
              <Link
                href={`/${activeTab}`}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white py-1.5 px-4 rounded-lg transition-colors"
              >
                Search
              </Link>
            </div>
            
            <div className="mt-4 text-sm text-blue-100">
              <p className="flex flex-wrap items-center">
                <span className="mr-2">Popular:</span>
                <Link href="/vehicles?make=Tesla" className="mx-1 hover:text-white">Tesla</Link>,
                <Link href="/vehicles?make=BMW" className="mx-1 hover:text-white">BMW</Link>,
                <Link href="/vehicles?make=Mercedes" className="mx-1 hover:text-white">Mercedes</Link>,
                <Link href="/vehicles?bodyStyle=SUV" className="mx-1 hover:text-white">SUVs</Link>,
                <Link href="/vehicles?fuelType=electric" className="mx-1 hover:text-white">Electric</Link>
              </p>
            </div>
          </div>
        </div>
        
        <div className="text-center text-sm text-blue-200">
          <p>Trusted by 100,000+ customers across the UAE. Car360 is the #1 automotive platform in the region.</p>
        </div>
      </div>
    </div>
  );
} 