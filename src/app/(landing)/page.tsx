import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HeroSection from "@/components/home/HeroSection";
import FeaturedVehicles from "@/components/home/FeaturedVehicles";
import { mockVehicles } from "@/data/mockVehicles";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import CallToAction from "@/components/home/CallToAction";
import ServiceOptions from "@/components/home/ServiceOptions";

export default function HomePage() {
  return (
    <main className="mt-20 md:mt-32">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Your entire car journey in one platform
        </h2>
        <p className="text-xl text-white/80 mb-12">
          Discover, finance, purchase, lease, rent and maintain cars entirely online through a single mobile and web app.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/onboarding"
            className="inline-flex items-center justify-center bg-white text-blue-900 px-6 py-3 rounded-md hover:bg-blue-50 font-medium text-lg"
          >
            Create an Account
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <Link
            href="/vehicles"
            className="inline-flex items-center justify-center bg-white/10 text-white border border-white/20 px-6 py-3 rounded-md hover:bg-white/20 font-medium text-lg"
          >
            Browse Vehicles
          </Link>
        </div>
      </div>

      <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {[
          {
            title: "Find Your Perfect Car",
            description: "Browse thousands of vehicles and get AI-powered recommendations based on your preferences."
          },
          {
            title: "Flexible Options",
            description: "Choose to buy, lease, or rent with transparent pricing and flexible payment plans."
          },
          {
            title: "Seamless Experience",
            description: "Complete the entire process online from application to delivery, with continuous support."
          }
        ].map((feature, index) => (
          <div key={index} className="bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/20">
            <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
            <p className="text-white/80">{feature.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
} 