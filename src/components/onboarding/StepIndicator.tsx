import { CheckCircle2 } from "lucide-react";

interface StepIndicatorProps {
  currentStep: number;
  steps: {
    id: number;
    name: string;
    status: "completed" | "current" | "upcoming";
  }[];
}

const StepIndicator = ({ currentStep, steps }: StepIndicatorProps) => {
  return (
    <div className="w-full max-w-3xl mx-auto py-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          
          return (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                {step.status === "completed" ? (
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white z-10">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                ) : (
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                      step.status === "current" 
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    {step.id}
                  </div>
                )}
                <span 
                  className={`mt-2 text-sm ${
                    step.status === "upcoming"
                      ? "text-gray-400"
                      : step.status === "current"
                        ? "text-blue-500 font-medium"
                        : "text-green-500 font-medium"
                  }`}
                >
                  {step.name}
                </span>
              </div>
              
              {!isLast && (
                <div 
                  className={`h-1 flex-1 mx-2 ${
                    index < currentStep - 1
                      ? "bg-green-500"
                      : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator; 