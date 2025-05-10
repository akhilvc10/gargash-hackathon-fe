"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Menu, X, User, Car, Heart, MessageSquare } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Car className="h-7 w-7 text-car360-blue" />
            <span className="text-xl font-bold text-gray-900">Car360</span>
          </Link>
          
          <nav className="hidden ml-10 md:flex md:space-x-6">
            <Link 
              href="/buy" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Buy
            </Link>
            <Link 
              href="/lease" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Lease
            </Link>
            <Link 
              href="/rent" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Rent
            </Link>
            <Link 
              href="/services" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Services
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="hidden md:flex p-2 rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-100">
            <Search className="h-5 w-5" />
          </button>
          
          <button className="hidden md:flex p-2 rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-100">
            <Heart className="h-5 w-5" />
          </button>
          
          <button className="hidden md:flex p-2 rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-100">
            <MessageSquare className="h-5 w-5" />
          </button>
          
          <Link href="/onboarding" className="hidden md:flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            <User className="h-4 w-4" />
            <span>Sign In</span>
          </Link>
          
          <Link href="/onboarding" className="hidden md:flex px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Get Started
          </Link>
          
          <button 
            className="md:hidden p-2 rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-16 bg-white z-40 md:hidden animate-fade-in">
          <div className="container pt-6 pb-8 px-6">
            <div className="flex border-b border-gray-100 pb-4 mb-4">
              <button className="w-full flex items-center justify-start p-2 text-gray-500 hover:text-gray-900">
                <Search className="h-5 w-5 mr-3" />
                Search
              </button>
            </div>
            <nav className="flex flex-col space-y-6 text-lg">
              <Link href="/buy" className="flex items-center py-2">Buy</Link>
              <Link href="/lease" className="flex items-center py-2">Lease</Link>
              <Link href="/rent" className="flex items-center py-2">Rent</Link>
              <Link href="/services" className="flex items-center py-2">Services</Link>
            </nav>
            <div className="mt-8 space-y-4">
              <Link href="/onboarding" className="flex items-center justify-center gap-2 w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                <User className="h-4 w-4" />
                <span>Sign In</span>
              </Link>
              <Link href="/onboarding" className="flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
} 