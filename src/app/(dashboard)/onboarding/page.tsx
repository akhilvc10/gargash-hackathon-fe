import OnboardingFlow from "@/components/onboarding/OnboardingFlow";
import { redirect } from "next/navigation";

export default function OnboardingPage() {
  const handleComplete = async () => {
    "use server";
    redirect("/dashboard");
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto pt-4">
        <header className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <h1 className="text-xl font-bold flex items-center">
              <span className="text-blue-600">Car</span>
              <span>360</span>
            </h1>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-600 hover:text-blue-600">Buy</a>
            <a href="#" className="text-gray-600 hover:text-blue-600">Lease</a>
            <a href="#" className="text-gray-600 hover:text-blue-600">Rent</a>
            <a href="#" className="text-gray-600 hover:text-blue-600">Services</a>
          </nav>
          <div className="flex items-center space-x-4">
            <a href="/signin" className="text-sm font-medium text-gray-600 hover:text-blue-600">
              Sign In
            </a>
            <a
              href="/signup"
              className="text-sm font-medium bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Get Started
            </a>
          </div>
        </header>
        
        <OnboardingFlow 
          onComplete={handleComplete}
        />
      </div>
    </main>
  );
} 