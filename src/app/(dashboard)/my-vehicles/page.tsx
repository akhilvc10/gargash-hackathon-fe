import { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Car, Filter, Fuel, Gauge, Heart, MapPin, Star } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { mockVehicles } from "@/data/mockVehicles";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = {
  title: "My Vehicles | Car360",
  description: "View and manage your vehicle collection on Car360",
};

// In a real app, this would be filtered based on the user's collection
// For demo purposes, we're using the first 4 vehicles from the mock data
const userVehicles = mockVehicles.slice(0, 4);

export default function MyVehiclesPage() {
  return (
    <MainLayout>
      <div className="container mx-auto py-10 px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-1">My Vehicles</h1>
            <p className="text-gray-500">Manage your vehicle collection</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex gap-3">
            <button className="inline-flex items-center rounded-md px-4 py-2 text-sm border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 shadow-sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </button>
            <Link 
              href="/vehicles" 
              className="inline-flex items-center rounded-md px-4 py-2 text-sm bg-car360-blue hover:bg-car360-blue-dark text-white shadow-sm"
            >
              <Car className="h-4 w-4 mr-2" />
              Browse New Vehicles
            </Link>
          </div>
        </div>
        
        {userVehicles.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-10 text-center">
            <div className="flex justify-center">
              <Car className="h-12 w-12 text-gray-300" />
            </div>
            <h3 className="mt-4 text-lg font-medium">No vehicles in your collection</h3>
            <p className="mt-2 text-gray-500">Browse our extensive catalog to find your perfect match.</p>
            <Link 
              href="/vehicles" 
              className="mt-6 inline-flex items-center rounded-md px-4 py-2 text-sm bg-car360-blue hover:bg-car360-blue-dark text-white shadow-sm"
            >
              Browse Vehicles
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {userVehicles.map((vehicle) => (
              <div key={vehicle.id} className="bg-white rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-md">
                <div className="relative">
                  <Link href={`/my-vehicles/${vehicle.id}`} className="block">
                    <div className="relative h-48 w-full overflow-hidden bg-gray-200">
                      <div 
                        className="absolute inset-0 bg-center bg-cover transform transition-transform duration-500 hover:scale-105"
                        style={{ backgroundImage: `url(${vehicle.thumbnail})` }}
                      />
                    </div>
                  </Link>
                  <button className="absolute top-3 right-3 bg-white/80 p-2 rounded-full backdrop-blur-sm hover:bg-white transition-colors">
                    <Heart className="h-5 w-5 text-gray-600" />
                  </button>
                  
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-1">
                        <Badge variant="outline" className="bg-white/90 text-gray-800 px-2 py-0.5 text-xs font-medium">
                          {vehicle.availableModes.includes("buy") && "Buy"}
                        </Badge>
                        {vehicle.availableModes.includes("lease") && (
                          <Badge variant="outline" className="bg-white/90 text-gray-800 px-2 py-0.5 text-xs font-medium">
                            Lease
                          </Badge>
                        )}
                      </div>
                      {vehicle.rating && (
                        <div className="flex items-center bg-white/90 px-2 py-0.5 rounded text-sm">
                          <Star className="h-3.5 w-3.5 text-car360-orange mr-1 fill-car360-orange" />
                          <span className="font-medium">{vehicle.rating}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <Link href={`/my-vehicles/${vehicle.id}`} className="block">
                    <h3 className="font-medium text-lg text-gray-900 mb-1 truncate">
                      {vehicle.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </p>
                  </Link>
                  
                  <div className="flex justify-between items-baseline mb-3">
                    <div>
                      <span className="text-lg font-bold text-gray-900">
                        {formatCurrency(vehicle.price)}
                      </span>
                      {vehicle.priceType && (
                        <span className="text-sm text-gray-600 ml-1">
                          {vehicle.priceType}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Car className="h-4 w-4 text-gray-400 mr-1.5" />
                      <span className="capitalize">{vehicle.bodyStyle}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Fuel className="h-4 w-4 text-gray-400 mr-1.5" />
                      <span className="capitalize">{vehicle.fuelType}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Gauge className="h-4 w-4 text-gray-400 mr-1.5" />
                      <span>
                        {vehicle.mileage === 0 ? "New" : `${vehicle.mileage.toLocaleString()} km`}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 text-gray-400 mr-1.5" />
                      <span className="truncate">{vehicle.location}</span>
                    </div>
                  </div>
                  
                  <Link 
                    href={`/my-vehicles/${vehicle.id}`}
                    className="block w-full bg-car360-blue hover:bg-car360-blue-dark text-white text-center py-2.5 rounded-md transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
