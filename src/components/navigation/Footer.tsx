import Link from "next/link";
import { Car, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <Car className="h-6 w-6 text-car360-blue" />
              <span className="text-xl font-bold text-white">Car360</span>
            </div>
            <p className="text-gray-400 mb-6">
              Discover, finance, purchase, lease, rent and maintain cars entirely online through a single platform.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube size={20} />
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-medium text-lg mb-4">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/buy" className="text-gray-400 hover:text-white transition-colors">
                  Buy a Car
                </Link>
              </li>
              <li>
                <Link href="/lease" className="text-gray-400 hover:text-white transition-colors">
                  Lease Options
                </Link>
              </li>
              <li>
                <Link href="/rent" className="text-gray-400 hover:text-white transition-colors">
                  Rent a Vehicle
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-white transition-colors">
                  Maintenance
                </Link>
              </li>
              <li>
                <Link href="/finance" className="text-gray-400 hover:text-white transition-colors">
                  Financing
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-medium text-lg mb-4">About</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/dealers" className="text-gray-400 hover:text-white transition-colors">
                  For Dealers
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-400 hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-medium text-lg mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/help" className="text-gray-400 hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between">
          <p className="text-gray-500">© 2025 Car360. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-500 hover:text-gray-400 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-gray-500 hover:text-gray-400 transition-colors">
              Terms
            </Link>
            <Link href="/cookies" className="text-gray-500 hover:text-gray-400 transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 