"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Camera, Upload, X, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type DiagnosisResult = {
  issue: string;
  recommendation: string;
  severity: "low" | "medium" | "high";
  nearbyGarages: { name: string; distance: string; rating: number }[];
};

export function SmartGarageAssistant() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [diagnosisResult, setDiagnosisResult] = useState<DiagnosisResult | null>(null);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // Check file type
    if (!file.type.includes("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleCameraCapture = () => {
    // In a real implementation, we would use the device camera
    // For now, we'll just simulate by clicking the file input
    document.getElementById("image-upload")?.click();
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
    setDiagnosisResult(null);
  };

  const handleAnalyze = () => {
    if (!uploadedImage) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis (in a real app, this would call an API)
    setTimeout(() => {
      setIsAnalyzing(false);
      
      // Mock diagnosis result
      setDiagnosisResult({
        issue: "Worn brake pads",
        recommendation: "Replace front brake pads within 500km",
        severity: "medium",
        nearbyGarages: [
          { name: "AutoPro Service Center", distance: "1.2km", rating: 4.8 },
          { name: "Car360 Certified Workshop", distance: "3.5km", rating: 4.9 },
          { name: "Quick Fix Auto", distance: "4.7km", rating: 4.5 },
        ],
      });
      
      toast({
        title: "Analysis complete",
        description: "We've diagnosed your vehicle issue",
      });
    }, 2000);
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
    setUploadedImage(null);
    setDiagnosisResult(null);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low": return "text-green-600";
      case "medium": return "text-amber-600";
      case "high": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  return (
    <>
      <Button 
        size="lg"
        className="bg-white text-car360-blue hover:bg-blue-50"
        onClick={handleOpenDialog}
      >
        Try It Now
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Smart Garage Assistant</DialogTitle>
            <DialogDescription>
              Upload a photo of your car issue and our AI will diagnose the problem and recommend nearby service centers.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            {!uploadedImage ? (
              <div className="grid gap-4">
                <div 
                  className="border-2 border-dashed rounded-lg p-8 text-center hover:border-car360-blue transition-colors cursor-pointer"
                  onClick={() => document.getElementById("image-upload")?.click()}
                >
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-sm text-gray-600">Drag and drop an image or click to browse</p>
                </div>
                
                <div className="flex justify-center gap-4">
                  <Button
                    variant="outline"
                    onClick={() => document.getElementById("image-upload")?.click()}
                    className="flex-1"
                  >
                    <Upload className="mr-2 h-4 w-4" /> Upload Photo
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleCameraCapture}
                    className="flex-1"
                  >
                    <Camera className="mr-2 h-4 w-4" /> Take Photo
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid gap-4">
                <div className="relative">
                  <img 
                    src={uploadedImage} 
                    alt="Uploaded car issue" 
                    className="rounded-lg w-full h-64 object-cover"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full h-8 w-8 p-1"
                    onClick={handleRemoveImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                {!diagnosisResult && (
                  <Button 
                    onClick={handleAnalyze} 
                    disabled={isAnalyzing}
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
                        Analyzing...
                      </>
                    ) : "Analyze Image"}
                  </Button>
                )}
                
                {diagnosisResult && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="mb-4">
                      <h4 className="font-semibold text-lg mb-1">Diagnosis Results</h4>
                      <p className="text-gray-600 mb-2">Issue detected: <span className="font-medium">{diagnosisResult.issue}</span></p>
                      <p className={`font-medium ${getSeverityColor(diagnosisResult.severity)}`}>
                        {diagnosisResult.recommendation}
                      </p>
                    </div>
                    
                    <h4 className="font-semibold mb-2">Recommended Service Centers</h4>
                    <div className="space-y-2">
                      {diagnosisResult.nearbyGarages.map((garage, index) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-white rounded border hover:border-car360-blue cursor-pointer">
                          <div>
                            <p className="font-medium">{garage.name}</p>
                            <div className="flex items-center text-sm text-gray-500">
                              <span>{garage.distance} away</span>
                              <span className="mx-2">•</span>
                              <span>★ {garage.rating}</span>
                            </div>
                          </div>
                          <Button size="sm" variant="outline" className="text-car360-blue">
                            Book
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDialogOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
