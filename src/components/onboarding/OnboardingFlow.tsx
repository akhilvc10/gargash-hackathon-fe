"use client";

import { useState } from "react";
import SignUp from "./SignUp";
import Preferences from "./Preferences";
import StepIndicator from "./StepIndicator";
import { Card } from "@/components/ui/card";

interface OnboardingFlowProps {
  onComplete: () => void;
  language?: "en" | "ar";
}

type StepStatus = "completed" | "current" | "upcoming";

interface Step {
  id: number;
  name: string;
  status: StepStatus;
}

const OnboardingFlow = ({ onComplete, language = "en" }: OnboardingFlowProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  
  const steps: Step[] = [
    { id: 1, name: "Sign Up", status: currentStep === 1 ? "current" : currentStep > 1 ? "completed" : "upcoming" },
    { id: 2, name: "Verification", status: currentStep === 2 ? "current" : currentStep > 2 ? "completed" : "upcoming" },
    { id: 3, name: "Preferences", status: currentStep === 3 ? "current" : currentStep > 3 ? "completed" : "upcoming" },
    { id: 4, name: "Complete", status: currentStep === 4 ? "current" : "upcoming" },
  ];
  
  const handleSignUpComplete = () => {
    // In the real component, this would advance from step 1 to 2
    // After OTP verification, it would advance to step 3 (Preferences)
    // For simplicity, we're advancing directly to step 3
    setCurrentStep(3);
  };
  
  const handlePreferencesComplete = () => {
    setCurrentStep(4);
    // After a short delay, complete the whole flow
    setTimeout(() => {
      onComplete();
    }, 1500);
  };
  
  const handleBackFromPreferences = () => {
    // Go back to the first step (in reality, would go back to verification)
    setCurrentStep(1);
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      <StepIndicator currentStep={currentStep} steps={steps} />
      
      {currentStep === 1 && (
        <SignUp
          onComplete={handleSignUpComplete}
          language={language}
        />
      )}
      
      {currentStep === 3 && (
        <Preferences
          onComplete={handlePreferencesComplete}
          onBack={handleBackFromPreferences}
          language={language}
        />
      )}
      
      {currentStep === 4 && (
        <div className="relative flex flex-col items-center justify-center min-h-screen p-4 overflow-hidden font-sans">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900 to-blue-700 z-0" />

          {/* Decorative elements */}
          <div className="absolute inset-0 opacity-10 z-0">
            <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-blue-400 filter blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-blue-300 filter blur-3xl translate-x-1/2 translate-y-1/2" />
          </div>

          <Card className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-md text-white border-white/20 shadow-xl rounded-lg p-8">
            <div className="flex flex-col items-center justify-center space-y-6">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-center">Registration Complete!</h2>
              <p className="text-center text-blue-100">
                Thank you for providing your preferences. Your account has been successfully created.
              </p>
              <p className="text-center text-blue-100">
                You will be redirected to the dashboard shortly.
              </p>
            </div>
          </Card>

          <div className="relative z-10 mt-8 text-white/60 text-sm text-center">
            © 2025 Car360 by Gargash Group. All rights reserved.
          </div>
        </div>
      )}
    </div>
  );
};

export default OnboardingFlow; 