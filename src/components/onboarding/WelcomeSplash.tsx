import { Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface WelcomeSplashProps {
  onLanguageSelect: (language: "en" | "ar") => void;
}

const WelcomeSplash = ({ onLanguageSelect }: WelcomeSplashProps) => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-4 text-white overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900 to-blue-700 z-0" />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10 z-0">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-blue-400 filter blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-blue-300 filter blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative z-10 text-center mb-12">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm">
            <Car className="h-12 w-12 text-white" />
          </div>
          <span className="text-4xl font-bold ml-4">Car360</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Welcome to Car360
        </h1>
        <p className="text-xl text-blue-100 max-w-lg mx-auto">
          Discover, finance, purchase, lease, rent and maintain cars entirely online.
        </p>
      </div>

      <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-2xl p-8 w-full max-w-md border border-white/20 shadow-xl">
        <h2 className="text-2xl font-semibold mb-8 text-center">
          Choose your language
        </h2>
        <div className="grid gap-6">
          <Button 
            onClick={() => onLanguageSelect("en")}
            className="bg-white text-blue-900 hover:bg-blue-50 h-14 text-lg font-medium tracking-wide transition-all duration-300 shadow-sm"
          >
            English
          </Button>
          <Button 
            onClick={() => onLanguageSelect("ar")}
            className="bg-white text-blue-900 hover:bg-blue-50 h-14 text-lg font-medium tracking-wide transition-all duration-300 shadow-sm"
            dir="rtl"
          >
            العربية (Arabic)
          </Button>
        </div>
      </div>
      
      <div className="relative z-10 mt-8 text-white/60 text-sm">
        © 2025 Car360 by Gargash Group. All rights reserved.
      </div>
    </div>
  );
};

export default WelcomeSplash;
