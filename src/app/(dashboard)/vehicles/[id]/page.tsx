import { mockVehicles } from "@/data/mockVehicles";
import { notFound } from "next/navigation";
import Image from "next/image";

interface VehicleDetailPageProps {
  params: {
    id: string;
  };
}

export default function VehicleDetailPage({ params }: VehicleDetailPageProps) {
  const vehicle = mockVehicles.find(v => v.id === params.id);
  
  if (!vehicle) {
    notFound();
  }
  
  return (
   
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-4">
              <div className="w-full h-full bg-gray-200">
                {/* Using a div with background-image for now until we set up proper image optimization */}
                <div 
                  className="w-full h-full bg-center bg-cover"
                  style={{ backgroundImage: `url(${vehicle.images[0]})` }}
                ></div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {vehicle.images.slice(0, 3).map((img, i) => (
                <div key={i} className="aspect-[4/3] rounded bg-gray-200 overflow-hidden">
                  <div 
                    className="w-full h-full bg-center bg-cover"
                    style={{ backgroundImage: `url(${img})` }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h1 className="text-3xl font-bold mb-2">{vehicle.title}</h1>
            <p className="text-lg text-gray-600 mb-6">{vehicle.description}</p>
            
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-sm text-gray-500">{vehicle.priceType}</span>
                <p className="text-3xl font-bold">${vehicle.price.toLocaleString()}</p>
              </div>
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {vehicle.condition === "new" ? "New" : "Used"}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-gray-100 p-3 rounded">
                <span className="text-sm text-gray-500">Make</span>
                <p className="font-medium">{vehicle.make}</p>
              </div>
              <div className="bg-gray-100 p-3 rounded">
                <span className="text-sm text-gray-500">Model</span>
                <p className="font-medium">{vehicle.model}</p>
              </div>
              <div className="bg-gray-100 p-3 rounded">
                <span className="text-sm text-gray-500">Year</span>
                <p className="font-medium">{vehicle.year}</p>
              </div>
              <div className="bg-gray-100 p-3 rounded">
                <span className="text-sm text-gray-500">Fuel Type</span>
                <p className="font-medium">{vehicle.fuelType.charAt(0).toUpperCase() + vehicle.fuelType.slice(1)}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {vehicle.availableModes.includes("buy") && (
                <div className="border border-gray-200 rounded p-4">
                  <h3 className="font-medium mb-2">Purchase</h3>
                  <div className="flex justify-between text-sm mb-1">
                    <span>MSRP</span>
                    <span>${vehicle.pricing.buy?.msrp.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium">
                    <span>Offer Price</span>
                    <span>${vehicle.pricing.buy?.offer.toLocaleString()}</span>
                  </div>
                </div>
              )}
              
              {vehicle.availableModes.includes("lease") && (
                <div className="border border-gray-200 rounded p-4">
                  <h3 className="font-medium mb-2">Lease</h3>
                  <div className="flex justify-between text-sm">
                    <span>Monthly Payment</span>
                    <span>${vehicle.pricing.lease?.monthlyPayment}/mo</span>
                  </div>
                </div>
              )}
              
              {vehicle.availableModes.includes("rent") && (
                <div className="border border-gray-200 rounded p-4">
                  <h3 className="font-medium mb-2">Rent</h3>
                  <div className="flex justify-between text-sm">
                    <span>Daily Rate</span>
                    <span>${vehicle.pricing.rent?.dailyRate}/day</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
   
  );
}

// Generate static paths for all vehicles
export function generateStaticParams() {
  return mockVehicles.map(vehicle => ({
    id: vehicle.id
  }));
} 