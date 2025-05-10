import Link from "next/link";
import { Vehicle } from "@/types/vehicle";

interface FeaturedVehiclesProps {
  vehicles: Vehicle[];
}

export default function FeaturedVehicles({ vehicles }: FeaturedVehiclesProps) {
  // Only take the first 3 vehicles for featured display
  const featuredVehicles = vehicles.slice(0, 3);
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Vehicles</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium vehicles, each representing exceptional value and quality.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredVehicles.map((vehicle) => (
            <Link 
              href={`/vehicles/${vehicle.id}`} 
              key={vehicle.id} 
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow flex flex-col h-full"
            >
              <div className="aspect-[16/9] relative overflow-hidden">
                <div 
                  className="w-full h-full bg-center bg-cover"
                  style={{ backgroundImage: `url(${vehicle.thumbnail})` }}
                ></div>
                <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {vehicle.availableModes[0].charAt(0).toUpperCase() + vehicle.availableModes[0].slice(1)}
                </div>
              </div>
              
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="font-bold text-xl mb-2 line-clamp-1">{vehicle.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-2 mb-4">{vehicle.description}</p>
                
                <div className="flex justify-between items-center mt-auto">
                  <div>
                    <p className="text-gray-500 text-xs">{vehicle.priceType}</p>
                    <p className="text-xl font-bold">${vehicle.price.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                    <span className="font-medium">{vehicle.rating}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            href="/vehicles" 
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            View All Vehicles
          </Link>
        </div>
      </div>
    </section>
  );
} 