import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Calendar, Gauge, Car, Fuel, BadgeCheck, MapPin, PlugZap, Wallet } from "lucide-react";
import { notFound } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import MainLayout from "@/components/layout/MainLayout";
import { mockVehicles } from "@/data/mockVehicles";
import { formatCurrency } from "@/lib/utils";
import AnomalyDashboard from "@/components/anomalies/anomaly-dashboard";

interface VehicleDetailPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: VehicleDetailPageProps): Promise<Metadata> {
  const vehicle = mockVehicles.find(v => v.id === params.id);
  
  if (!vehicle) {
    return {
      title: "Vehicle Not Found | Car360",
    };
  }
  
  return {
    title: `${vehicle.year} ${vehicle.make} ${vehicle.model} | Car360`,
    description: vehicle.description,
  };
}

export default function VehicleDetailPage({ params }: VehicleDetailPageProps) {
  const vehicle = mockVehicles.find(v => v.id === params.id);
  
  if (!vehicle) {
    notFound();
  }
  
  const getFuelIcon = (type: string) => {
    switch(type) {
      case "electric":
        return <PlugZap className="h-4 w-4 mr-1.5 text-green-500" />;
      case "hybrid":
        return <Fuel className="h-4 w-4 mr-1.5 text-blue-500" />;
      default:
        return <Fuel className="h-4 w-4 mr-1.5 text-gray-500" />;
    }
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        {/* Back button */}
        <Link 
          href="/my-vehicles" 
          className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 mb-6"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to My Vehicles
        </Link>
        
        {/* Vehicle title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">{vehicle.title}</h1>
          <div className="flex items-center flex-wrap gap-2 text-sm text-gray-600">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1.5" />
              <span>{vehicle.year}</span>
            </div>
            <span>•</span>
            <div className="flex items-center">
              <Car className="h-4 w-4 mr-1.5" />
              <span className="capitalize">{vehicle.bodyStyle}</span>
            </div>
            <span>•</span>
            <div className="flex items-center">
              {getFuelIcon(vehicle.fuelType)}
              <span className="capitalize">{vehicle.fuelType}</span>
            </div>
            <span>•</span>
            <div className="flex items-center">
              <Gauge className="h-4 w-4 mr-1.5" />
              <span>{vehicle.mileage === 0 ? "New" : `${vehicle.mileage.toLocaleString()} km`}</span>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Images and details */}
          <div className="col-span-2 space-y-8">
            {/* Vehicle images */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="aspect-[16/9] rounded-lg overflow-hidden mb-4">
                <div className="w-full h-full bg-gray-200">
                  <div 
                    className="w-full h-full bg-center bg-cover"
                    style={{ backgroundImage: `url(${vehicle.images[0]})` }}
                  ></div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {vehicle.images.slice(0, 3).map((img, i) => (
                  <div key={i} className="aspect-[4/3] rounded-lg bg-gray-200 overflow-hidden">
                    <div 
                      className="w-full h-full bg-center bg-cover"
                      style={{ backgroundImage: `url(${img})` }}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Tabs for details */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <Tabs defaultValue="details">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="intelligence">Smart Intelligence</TabsTrigger>
                  <TabsTrigger value="maintenance">Smart Maintenance</TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="space-y-4">
                  <p className="text-gray-700">{vehicle.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <span className="text-xs text-gray-500 block">Make</span>
                      <span className="font-medium">{vehicle.make}</span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <span className="text-xs text-gray-500 block">Model</span>
                      <span className="font-medium">{vehicle.model}</span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <span className="text-xs text-gray-500 block">Year</span>
                      <span className="font-medium">{vehicle.year}</span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <span className="text-xs text-gray-500 block">Body Style</span>
                      <span className="font-medium capitalize">{vehicle.bodyStyle}</span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <span className="text-xs text-gray-500 block">Fuel Type</span>
                      <span className="font-medium capitalize">{vehicle.fuelType}</span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <span className="text-xs text-gray-500 block">Mileage</span>
                      <span className="font-medium">{vehicle.mileage === 0 ? "New" : `${vehicle.mileage.toLocaleString()} km`}</span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <span className="text-xs text-gray-500 block">Color</span>
                      <span className="font-medium">{vehicle.color}</span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <span className="text-xs text-gray-500 block">Interior Color</span>
                      <span className="font-medium">{vehicle.interiorColor}</span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <span className="text-xs text-gray-500 block">Condition</span>
                      <span className="font-medium capitalize">{vehicle.condition}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                    <div className="flex flex-col space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Engine</span>
                        <span className="font-medium text-right">{vehicle.specs.engine}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between">
                        <span className="text-gray-600">Transmission</span>
                        <span className="font-medium text-right">{vehicle.specs.transmission}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between">
                        <span className="text-gray-600">Horsepower</span>
                        <span className="font-medium text-right">{vehicle.specs.horsepower} hp</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between">
                        <span className="text-gray-600">Torque</span>
                        <span className="font-medium text-right">{vehicle.specs.torque}</span>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Fuel Economy</span>
                        <span className="font-medium text-right">{vehicle.specs.fuelEconomy}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between">
                        <span className="text-gray-600">Acceleration</span>
                        <span className="font-medium text-right">{vehicle.specs.acceleration}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between">
                        <span className="text-gray-600">Drivetrain</span>
                        <span className="font-medium text-right">{vehicle.specs.drivetrain}</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="intelligence" className="space-y-6">
                  <AnomalyDashboard />
                </TabsContent>
                
                <TabsContent value="maintenance" className="space-y-6">
                  <div className="bg-gray-50 p-5 rounded-lg">
                    <h3 className="font-medium mb-3 text-lg">Smart Maintenance Schedule</h3>
                    <p className="text-gray-700 mb-4">
                      Keep your {vehicle.make} {vehicle.model} in top condition with our AI-recommended maintenance schedule.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="bg-white rounded-lg p-4 border border-gray-200 border-l-4 border-l-amber-500">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">Oil Change Due</h4>
                            <p className="text-sm text-gray-600 mt-1">
                              Recommended within the next 500 km or 2 weeks
                            </p>
                          </div>
                          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                            Upcoming
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-lg p-4 border border-gray-200 border-l-4 border-l-green-500">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">Tire Rotation</h4>
                            <p className="text-sm text-gray-600 mt-1">
                              Last performed: 2 months ago. Next scheduled: In 4 months
                            </p>
                          </div>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            Complete
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-lg p-4 border border-gray-200 border-l-4 border-l-blue-500">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">Annual Service</h4>
                            <p className="text-sm text-gray-600 mt-1">
                              Comprehensive inspection and service due in 3 months
                            </p>
                          </div>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            Scheduled
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-lg p-4 border border-gray-200 border-l-4 border-l-purple-500">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">Battery Health Check</h4>
                            <p className="text-sm text-gray-600 mt-1">
                              Battery health at 87%. Recommended replacement: In 10-12 months
                            </p>
                          </div>
                          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                            Monitored
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
          
          {/* Right column - Pricing and actions */}
          <div className="space-y-6">
            {/* Pricing card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Vehicle Information</h2>
              
              <div className="flex flex-col space-y-4 mb-6">
                <div className="flex justify-between items-baseline">
                  <span className="text-gray-600">Price</span>
                  <div className="text-right">
                    <span className="text-xl font-bold text-gray-900">{formatCurrency(vehicle.price)}</span>
                    {vehicle.priceType && (
                      <span className="text-sm text-gray-500 ml-1">{vehicle.priceType}</span>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Available Modes</span>
                  <div className="flex flex-wrap justify-end gap-1">
                    {vehicle.availableModes.map((mode) => (
                      <Badge key={mode} variant="outline" className="capitalize">
                        {mode}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Dealership</span>
                  <span className="font-medium text-right">{vehicle.dealershipName}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Location</span>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                    <span>{vehicle.location}</span>
                  </div>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              {/* Pricing options */}
              <div className="space-y-4">
                <h3 className="font-medium">Pricing Options</h3>
                
                {vehicle.availableModes.includes("buy") && (
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <Wallet className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="font-medium">Purchase</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">MSRP</span>
                        <span>{formatCurrency(vehicle.pricing.buy?.msrp || 0)}</span>
                      </div>
                      <div className="flex justify-between font-medium">
                        <span>Offer Price</span>
                        <span>{formatCurrency(vehicle.pricing.buy?.offer || 0)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Est. Monthly</span>
                        <span>{formatCurrency(vehicle.pricing.buy?.monthlyPayment || 0)}/mo</span>
                      </div>
                    </div>
                  </div>
                )}
                
                {vehicle.availableModes.includes("lease") && (
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <Wallet className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="font-medium">Lease</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between font-medium">
                        <span>Monthly Payment</span>
                        <span>{formatCurrency(vehicle.pricing.lease?.monthlyPayment || 0)}/mo</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Term</span>
                        <span>{vehicle.pricing.lease?.term || 0} months</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Mileage Limit</span>
                        <span>{vehicle.pricing.lease?.mileageLimit?.toLocaleString() || 0}/year</span>
                      </div>
                    </div>
                  </div>
                )}
                
                {vehicle.availableModes.includes("rent") && (
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <Wallet className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="font-medium">Rent</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Daily Rate</span>
                        <span>{formatCurrency(vehicle.pricing.rent?.dailyRate || 0)}/day</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Weekly Rate</span>
                        <span>{formatCurrency(vehicle.pricing.rent?.weeklyRate || 0)}/week</span>
                      </div>
                      <div className="flex justify-between font-medium">
                        <span>Monthly Rate</span>
                        <span>{formatCurrency(vehicle.pricing.rent?.monthlyRate || 0)}/month</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="space-y-3">
                <button className="w-full bg-car360-blue hover:bg-car360-blue-dark text-white font-medium py-2.5 px-4 rounded-md transition-colors">
                  Contact Dealership
                </button>
                <button className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2.5 px-4 rounded-md transition-colors">
                  Book a Test Drive
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

// Generate static paths for all vehicles
export function generateStaticParams() {
  return mockVehicles.slice(0, 4).map(vehicle => ({
    id: vehicle.id
  }));
} 