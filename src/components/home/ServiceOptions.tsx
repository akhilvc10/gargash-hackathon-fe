import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  Wrench, 
  Car, 
  AlertTriangle, 
  ArrowRight 
} from "lucide-react";
import { SmartGarageAssistant } from "@/components/services/SmartGarageAssistant";

export default function ServiceOptions() {
  const services = [
    {
      icon: <Shield className="h-10 w-10 text-car360-blue mb-4" />,
      title: "Extended Warranty",
      description: "Protect your investment with comprehensive coverage options.",
      link: "/services/warranty"
    },
    {
      icon: <Wrench className="h-10 w-10 text-car360-blue mb-4" />,
      title: "Maintenance Plans",
      description: "Keep your vehicle in peak condition with scheduled service packages.",
      link: "/services/maintenance"
    },
    {
      icon: <Car className="h-10 w-10 text-car360-blue mb-4" />,
      title: "Vehicle Servicing",
      description: "Book convenient service appointments at certified centers.",
      link: "/services/booking"
    },
    {
      icon: <AlertTriangle className="h-10 w-10 text-car360-blue mb-4" />,
      title: "Roadside Assistance",
      description: "24/7 emergency help whenever and wherever you need it.",
      link: "/services/roadside"
    }
  ];
  
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl font-bold mb-4">Service & Maintenance</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Complete automotive care throughout your ownership journey with predictive maintenance and expert service.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-shadow flex flex-col h-full"
            >
              <div className="mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-5">{service.description}</p>
              <div className="mt-auto">
                <Link 
                  href={service.link}
                  className="inline-flex items-center text-car360-blue hover:text-car360-blue-dark font-medium"
                >
                  Learn more
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-gradient-to-r from-car360-blue to-blue-700 text-white rounded-2xl p-6 md:p-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="mb-6 md:mb-0 text-center md:text-left">
              <h3 className="text-2xl font-bold mb-3">Smart Garage Assistant</h3>
              <p className="text-blue-100 max-w-xl">
                Upload a photo of any car issue and our AI will diagnose the problem and recommend nearby service centers.
              </p>
            </div>
            <SmartGarageAssistant />
          </div>
        </div>
      </div>
    </section>
  );
}
