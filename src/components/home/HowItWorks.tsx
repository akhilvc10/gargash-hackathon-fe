import { Check, Search, Car, Compass, CreditCard } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: <Search className="h-8 w-8 text-car360-blue" />,
      title: "Discover",
      description: "Browse our extensive inventory of new and used vehicles, with detailed information and 360° views."
    },
    {
      icon: <Car className="h-8 w-8 text-car360-blue" />,
      title: "Choose",
      description: "Select the perfect vehicle and transaction mode - buy, lease, or rent - that fits your lifestyle."
    },
    {
      icon: <Compass className="h-8 w-8 text-car360-blue" />,
      title: "Personalize",
      description: "Customize your payment plans, add services, and select delivery or pickup options."
    },
    {
      icon: <CreditCard className="h-8 w-8 text-car360-blue" />,
      title: "Complete",
      description: "Securely finalize your transaction online with digital contracts and easy payments."
    }
  ];
  
  const features = [
    "AI-powered vehicle recommendations",
    "Digital contracts & paperwork",
    "Secure online payments",
    "Predictive maintenance alerts",
    "Flexible financing options",
    "Concierge delivery service"
  ];
  
  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl font-bold mb-4">How Car360 Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Car360 simplifies the entire automotive experience, from discovery to ownership,
            with a seamless end-to-end digital platform.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full"
            >
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-50 mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-blue-50 rounded-2xl p-6 md:p-8">
          <div className="mb-6">
            <h3 className="text-2xl font-bold">Key Features</h3>
            <p className="text-gray-600">What makes Car360 different from traditional car buying</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center py-2">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-car360-blue flex items-center justify-center">
                  <Check className="h-5 w-5 text-white" />
                </div>
                <span className="ml-3 text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
