import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Check, Upload, User, Shield } from "lucide-react";

interface KYCCaptureProps {
  onComplete: () => void;
  language: "en" | "ar";
}

type KYCStep = "id-upload" | "selfie" | "consent";

const KYCCapture = ({ onComplete, language }: KYCCaptureProps) => {
  const [step, setStep] = useState<KYCStep>("id-upload");
  const [progress, setProgress] = useState(0);
  const [idUploaded, setIdUploaded] = useState(false);
  const [selfieUploaded, setSelfieUploaded] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);

  const handleNext = () => {
    if (step === "id-upload" && idUploaded) {
      setStep("selfie");
      setProgress(33);
    } else if (step === "selfie" && selfieUploaded) {
      setStep("consent");
      setProgress(66);
    } else if (step === "consent" && consentChecked) {
      setProgress(100);
      onComplete();
    }
  };

  const handleBack = () => {
    if (step === "selfie") {
      setStep("id-upload");
      setProgress(0);
    } else if (step === "consent") {
      setStep("selfie");
      setProgress(33);
    }
  };

  const simulateUpload = (type: "id" | "selfie") => {
    if (type === "id") {
      setTimeout(() => {
        setIdUploaded(true);
      }, 1500);
    } else {
      setTimeout(() => {
        setSelfieUploaded(true);
      }, 1500);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-4 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900 to-blue-700 z-0" />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10 z-0">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-blue-400 filter blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-blue-300 filter blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-medium">KYC Verification</span>
            <span className="text-white font-medium">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-white h-2.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <Card className="bg-white/10 backdrop-blur-md text-white border-white/20 shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl font-bold">
              {step === "id-upload" && "Upload ID Document"}
              {step === "selfie" && "Take a Selfie"}
              {step === "consent" && "Consent & Finish"}
            </CardTitle>
            <CardDescription className="text-blue-100">
              {step === "id-upload" && "Please upload a clear image of your Emirates ID"}
              {step === "selfie" && "Take a clear photo of yourself for verification"}
              {step === "consent" && "Review and agree to terms to complete verification"}
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-6">
            {step === "id-upload" && (
              <div className="flex flex-col items-center">
                <div 
                  className={`border-2 border-dashed rounded-lg p-8 w-full mb-6 flex flex-col items-center justify-center cursor-pointer transition-all duration-300
                    ${idUploaded ? "border-green-300 bg-green-900/20" : "border-white/30 hover:border-white/50 hover:bg-white/5"}`}
                  onClick={() => !idUploaded && simulateUpload("id")}
                >
                  {idUploaded ? (
                    <div className="text-center">
                      <div className="bg-green-500 rounded-full p-2 inline-flex mb-3">
                        <Check className="h-6 w-6 text-white" />
                      </div>
                      <p className="font-medium text-green-300">ID Successfully Uploaded</p>
                    </div>
                  ) : (
                    <>
                      <Upload className="h-10 w-10 text-white/70 mb-4" />
                      <p className="font-medium mb-2">Upload Emirates ID</p>
                      <p className="text-sm text-white/70 text-center">
                        Click to upload or drag and drop<br />
                        PNG, JPG or PDF (max. 5MB)
                      </p>
                    </>
                  )}
                </div>
                
                <div className="bg-blue-800/30 rounded-lg p-4 w-full border border-blue-500/20">
                  <p className="text-sm text-blue-100">
                    <span className="font-medium block mb-1">Requirements:</span>
                    • Both sides of Emirates ID<br />
                    • Clear, readable text<br />
                    • Full card visible in frame
                  </p>
                </div>
              </div>
            )}

            {step === "selfie" && (
              <div className="flex flex-col items-center">
                <div 
                  className={`border-2 border-dashed rounded-lg p-10 w-full mb-6 flex flex-col items-center justify-center cursor-pointer transition-all duration-300
                    ${selfieUploaded ? "border-green-300 bg-green-900/20" : "border-white/30 hover:border-white/50 hover:bg-white/5"}`}
                  onClick={() => !selfieUploaded && simulateUpload("selfie")}
                >
                  {selfieUploaded ? (
                    <div className="text-center">
                      <div className="bg-green-500 rounded-full p-2 inline-flex mb-3">
                        <Check className="h-6 w-6 text-white" />
                      </div>
                      <p className="font-medium text-green-300">Selfie Successfully Captured</p>
                    </div>
                  ) : (
                    <>
                      <div className="relative mb-4">
                        <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-md"></div>
                        <User className="h-16 w-16 text-white relative z-10" />
                      </div>
                      <p className="font-medium mb-2">Take a Selfie</p>
                      <p className="text-sm text-white/70 text-center">
                        Click to capture or upload<br />
                        The photo should show your face clearly
                      </p>
                    </>
                  )}
                </div>
                
                <div className="bg-blue-800/30 rounded-lg p-4 w-full border border-blue-500/20">
                  <p className="text-sm text-blue-100">
                    <span className="font-medium block mb-1">Requirements:</span>
                    • Good lighting<br />
                    • Face clearly visible<br />
                    • Neutral expression<br />
                    • No sunglasses or hats
                  </p>
                </div>
              </div>
            )}

            {step === "consent" && (
              <div className="space-y-4">
                <div className="bg-blue-800/30 rounded-lg p-5 border border-blue-500/20">
                  <div className="flex items-center mb-3">
                    <Shield className="h-5 w-5 text-blue-300 mr-2" />
                    <p className="text-blue-200 font-medium">Data Privacy & Usage</p>
                  </div>
                  <p className="text-sm text-blue-100 mb-4">
                    By proceeding, you agree that Car360 may:
                  </p>
                  <ul className="text-sm text-blue-100 space-y-2 list-disc pl-5">
                    <li>Verify your identity with government databases</li>
                    <li>Store your identification information securely</li>
                    <li>Conduct a credit check with AECB (UAE Credit Bureau)</li>
                    <li>Process your data in accordance with our Privacy Policy</li>
                  </ul>
                </div>
                
                <label className="flex items-center space-x-3 cursor-pointer p-2 hover:bg-white/5 rounded-md transition-colors">
                  <input 
                    type="checkbox" 
                    className="h-5 w-5 rounded border-white/30 bg-white/20 accent-blue-500"
                    checked={consentChecked}
                    onChange={() => setConsentChecked(!consentChecked)}
                  />
                  <span className="text-white">
                    I agree to the terms and provide consent for verification
                  </span>
                </label>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between pt-4 border-t border-white/10">
            {step !== "id-upload" ? (
              <Button 
                variant="outline" 
                onClick={handleBack} 
                className="border-white/20 text-white hover:bg-white/10 transition-all duration-300"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            ) : (
              <div></div>
            )}
            
            <Button 
              onClick={handleNext}
              disabled={(step === "id-upload" && !idUploaded) || 
                      (step === "selfie" && !selfieUploaded) ||
                      (step === "consent" && !consentChecked)}
              className={`${
                (step === "id-upload" && !idUploaded) || 
                (step === "selfie" && !selfieUploaded) ||
                (step === "consent" && !consentChecked)
                  ? "bg-white/50 cursor-not-allowed"
                  : "bg-white hover:bg-blue-50 shadow-sm"
              } text-blue-900 font-medium transition-all duration-300`}
            >
              {step === "consent" ? "Complete Verification" : "Continue"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="relative z-10 mt-8 text-white/60 text-sm">
        © 2025 Car360 by Gargash Group. All rights reserved.
      </div>
    </div>
  );
};

export default KYCCapture;
