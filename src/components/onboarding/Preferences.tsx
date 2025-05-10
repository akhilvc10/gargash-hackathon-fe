import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

interface PreferencesProps {
  onComplete: () => void;
  onBack: () => void;
  language: "en" | "ar";
}

type InterestOption = "Purchase" | "Lease" | "Rent";
type VehicleTypeOption = "Sedan" | "SUV" | "Crossover" | "Sports" | "Luxury" | "Electric" | "Hybrid" | "Compact";
type BudgetRangeOption = "Up to AED 100K" | "AED 100K - 250K" | "Above AED 250K";

const Preferences = ({ onComplete, onBack, language }: PreferencesProps) => {
  const [selectedInterests, setSelectedInterests] = useState<InterestOption[]>([]);
  const [selectedVehicleTypes, setSelectedVehicleTypes] = useState<VehicleTypeOption[]>([]);
  const [selectedBudgetRange, setSelectedBudgetRange] = useState<BudgetRangeOption | null>(null);

  const interestOptions: InterestOption[] = ["Purchase", "Lease", "Rent"];
  const vehicleTypeOptions: VehicleTypeOption[] = [
    "Sedan", "SUV", "Crossover", "Sports", "Luxury", "Electric", "Hybrid", "Compact"
  ];
  const budgetRangeOptions: BudgetRangeOption[] = [
    "Up to AED 100K", "AED 100K - 250K", "Above AED 250K"
  ];

  const toggleInterest = (option: InterestOption) => {
    setSelectedInterests(prev => 
      prev.includes(option)
        ? prev.filter(item => item !== option)
        : [...prev, option]
    );
  };

  const toggleVehicleType = (option: VehicleTypeOption) => {
    setSelectedVehicleTypes(prev => 
      prev.includes(option)
        ? prev.filter(item => item !== option)
        : [...prev, option]
    );
  };

  const handleSavePreferences = () => {
    if (selectedInterests.length === 0) {
      toast.error("Please select at least one interest");
      return;
    }

    if (selectedVehicleTypes.length === 0) {
      toast.error("Please select at least one vehicle type");
      return;
    }

    if (!selectedBudgetRange) {
      toast.error("Please select a budget range");
      return;
    }

    // Save preferences to state or API
    const preferences = {
      interests: selectedInterests,
      vehicleTypes: selectedVehicleTypes,
      budgetRange: selectedBudgetRange
    };
    
    console.log("Saving preferences:", preferences);
    
    toast.success("Preferences saved successfully!");
    onComplete();
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-4 overflow-hidden font-sans">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900 to-blue-700 z-0" />

      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10 z-0">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-blue-400 filter blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-blue-300 filter blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <Card className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-md text-white border-white/20 shadow-xl rounded-lg">
        <CardHeader className="rounded-t-lg">
          <CardTitle className="text-2xl font-bold text-center">
            Tell us about your preferences
          </CardTitle>
          <CardDescription className="text-blue-100 text-center">
            Help us understand what you're looking for so we can make better recommendations.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-3">
            <h3 className="text-white font-medium">What are you interested in?</h3>
            <div className="grid grid-cols-3 gap-2">
              {interestOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => toggleInterest(option)}
                  className={`py-2 px-4 rounded-md transition-all duration-200 text-sm font-medium ${
                    selectedInterests.includes(option)
                      ? "bg-white text-blue-900"
                      : "bg-white/20 text-white hover:bg-white/30"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-white font-medium">Vehicle type preference</h3>
            <div className="grid grid-cols-2 gap-2">
              {vehicleTypeOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => toggleVehicleType(option)}
                  className={`py-2 px-4 rounded-md transition-all duration-200 text-sm font-medium ${
                    selectedVehicleTypes.includes(option)
                      ? "bg-white text-blue-900"
                      : "bg-white/20 text-white hover:bg-white/30"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-white font-medium">Budget range</h3>
            <div className="grid grid-cols-1 gap-2">
              {budgetRangeOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => setSelectedBudgetRange(option)}
                  className={`py-3 px-4 rounded-md transition-all duration-200 text-sm font-medium ${
                    selectedBudgetRange === option
                      ? "bg-white text-blue-900"
                      : "bg-white/20 text-white hover:bg-white/30"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 mt-6">
            <Button
              type="button"
              onClick={handleSavePreferences}
              className="w-full bg-white text-blue-900 hover:bg-blue-50 font-semibold py-3 rounded-md transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Save Preferences
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="w-full border-white/20 text-white hover:bg-white/10 font-semibold py-3 rounded-md transition-all duration-300"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="relative z-10 mt-8 text-white/60 text-sm text-center">
        © 2025 Car360 by Gargash Group. All rights reserved.
      </div>
    </div>
  );
};

export default Preferences; 