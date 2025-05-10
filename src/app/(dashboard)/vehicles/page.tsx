import { Fragment } from 'react';
import Link from 'next/link';
import { Suspense } from 'react';

// UI Components
import { Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

// Mock Data - Would come from an API in the real app
const vehicleTypes = [
  { id: 'sedan', label: 'Sedan' },
  { id: 'suv', label: 'SUV' },
  { id: 'coupe', label: 'Coupe' },
  { id: 'convertible', label: 'Convertible' },
  { id: 'hatchback', label: 'Hatchback' },
  { id: 'pickup', label: 'Pickup' },
  { id: 'minivan', label: 'Minivan' },
  { id: 'electric', label: 'Electric' },
  { id: 'hybrid', label: 'Hybrid' },
];

const vehicleData = [
  {
    id: '1',
    name: 'Mercedes-Benz E-Class',
    year: 2023,
    price: 'AED 324,900',
    image: '/images/vehicles/car1.jpg',
    type: 'sedan',
    availableModes: ['buy', 'lease', 'rent'],
    specs: {
      mileage: '0 km',
      transmission: 'Automatic',
      engine: '2.0L 4-cylinder',
      color: 'Polar White',
    },
  },
  {
    id: '2',
    name: 'BMW X5',
    year: 2023,
    price: 'AED 399,000',
    image: '/images/vehicles/car2.jpg',
    type: 'suv',
    availableModes: ['buy', 'lease'],
    specs: {
      mileage: '0 km',
      transmission: 'Automatic',
      engine: '3.0L 6-cylinder',
      color: 'Mineral White',
    },
  },
  {
    id: '3',
    name: 'Tesla Model 3',
    year: 2023,
    price: 'AED 189,900',
    image: '/images/vehicles/car3.jpg',
    type: 'electric',
    availableModes: ['buy', 'rent'],
    specs: {
      mileage: '0 km',
      transmission: 'Electric',
      engine: 'Electric Motor',
      color: 'Pearl White',
    },
  },
  {
    id: '4',
    name: 'Toyota Land Cruiser',
    year: 2023,
    price: 'AED 355,000',
    image: '/images/vehicles/car4.jpg',
    type: 'suv',
    availableModes: ['buy', 'lease', 'rent'],
    specs: {
      mileage: '0 km',
      transmission: 'Automatic',
      engine: '5.7L V8',
      color: 'Super White',
    },
  },
  {
    id: '5',
    name: 'Audi A6',
    year: 2023,
    price: 'AED 299,000',
    image: '/images/vehicles/car5.jpg',
    type: 'sedan',
    availableModes: ['lease', 'rent'],
    specs: {
      mileage: '0 km',
      transmission: 'Automatic',
      engine: '2.0L 4-cylinder',
      color: 'Glacier White',
    },
  },
  {
    id: '6',
    name: 'Range Rover Sport',
    year: 2023,
    price: 'AED 499,000',
    image: '/images/vehicles/car6.jpg',
    type: 'suv',
    availableModes: ['buy', 'lease'],
    specs: {
      mileage: '0 km',
      transmission: 'Automatic',
      engine: '3.0L 6-cylinder',
      color: 'Fuji White',
    },
  },
];

export const metadata = {
  title: 'Vehicles | Car360',
  description: 'Browse and discover your perfect vehicle with Car360',
};

export default async function VehiclesPage({
  searchParams,
}: {
  searchParams: { query?: string; type?: string; mode?: string };
}) {
  // In a real app, you would fetch this data from an API
  // based on searchParams
  const { query, type, mode } = searchParams;
  
  // Filter vehicles based on search params
  const filteredVehicles = vehicleData.filter((vehicle) => {
    const matchesQuery = !query || 
      vehicle.name.toLowerCase().includes(query.toLowerCase());
    const matchesType = !type || vehicle.type === type;
    const matchesMode = !mode || 
      vehicle.availableModes.includes(mode as 'buy' | 'lease' | 'rent');
    
    return matchesQuery && matchesType && matchesMode;
  });

  return (
    <main className="max-w-[1400px] mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left sidebar with filters */}
        <div className="w-full md:w-64 space-y-8">
          <div>
            <h2 className="text-lg font-medium mb-3">Transaction Mode</h2>
            <div className="flex flex-col space-y-2">
              <Link 
                href={{
                  pathname: '/vehicles',
                  query: { ...searchParams, mode: 'buy' },
                }}
                className={`py-2 px-3 rounded ${mode === 'buy' ? 'bg-primary text-primary-foreground font-medium' : 'hover:bg-muted'}`}
              >
                Buy
              </Link>
              <Link 
                href={{
                  pathname: '/vehicles',
                  query: { ...searchParams, mode: 'lease' },
                }}
                className={`py-2 px-3 rounded ${mode === 'lease' ? 'bg-primary text-primary-foreground font-medium' : 'hover:bg-muted'}`}
              >
                Lease
              </Link>
              <Link 
                href={{
                  pathname: '/vehicles',
                  query: { ...searchParams, mode: 'rent' },
                }}
                className={`py-2 px-3 rounded ${mode === 'rent' ? 'bg-primary text-primary-foreground font-medium' : 'hover:bg-muted'}`}
              >
                Rent
              </Link>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-medium mb-3">Vehicle Type</h2>
            <div className="flex flex-col space-y-2">
              {vehicleTypes.map((vehicleType) => (
                <Link
                  key={vehicleType.id}
                  href={{
                    pathname: '/vehicles',
                    query: { ...searchParams, type: vehicleType.id },
                  }}
                  className={`py-2 px-3 rounded ${type === vehicleType.id ? 'bg-primary text-primary-foreground font-medium' : 'hover:bg-muted'}`}
                >
                  {vehicleType.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1">
          {/* Search and filters */}
          <div className="flex flex-col space-y-6">
            <div className="flex items-center gap-3">
              <div className="relative w-full">
                <form action="/vehicles" method="GET" className="flex items-center">
                  <div className="relative flex-1">
                    <Input
                      type="search"
                      placeholder="Search vehicles..."
                      name="query"
                      defaultValue={query}
                      className="w-full pl-3 pr-10 h-11 rounded-lg border-gray-200"
                    />
                    <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
                      <Search className="h-5 w-5 text-gray-400" />
                    </button>
                  </div>
                  {query && <input type="hidden" name="mode" value={mode || ''} />}
                  {query && <input type="hidden" name="type" value={type || ''} />}
                </form>
              </div>
              
              <div className="flex gap-3">
                <Button variant="outline" className="flex items-center gap-2 h-11 px-4">
                  <ArrowUpDown className="h-4 w-4" />
                  <span>Sort</span>
                </Button>
                
                <Button variant="outline" className="flex items-center gap-2 h-11 px-4">
                  <SlidersHorizontal className="h-4 w-4" />
                  <span>More Filters</span>
                </Button>
              </div>
            </div>

            {/* AI Recommendation Banner */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-medium">Not sure what car is right for you?</h3>
                  <p className="text-gray-600 mt-1">
                    Answer a few questions and get AI-powered recommendations.
                  </p>
                </div>
                <Link href="/recommendations">
                  <Button className="whitespace-nowrap bg-blue-600 hover:bg-blue-700 text-white">
                    Get AI Recommendations
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-8 mb-6">
            <h2 className="text-2xl font-semibold">
              {filteredVehicles.length} Vehicles
            </h2>
            <Separator className="my-4" />
          </div>

          {/* Vehicle cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Suspense fallback={<p>Loading vehicles...</p>}>
              {filteredVehicles.length > 0 ? (
                filteredVehicles.map((vehicle) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} />
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                  <h3 className="text-xl font-medium mb-2">No vehicles found</h3>
                  <p className="text-gray-500 mb-6">
                    Try adjusting your search filters to find what you're looking for.
                  </p>
                  <Link 
                    href="/vehicles"
                    className="text-primary hover:underline"
                  >
                    Clear all filters
                  </Link>
                </div>
              )}
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
}

// Vehicle Card Component
function VehicleCard({ vehicle }: { vehicle: any }) {
  return (
    <Card className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow">
      <div className="aspect-[4/3] relative">
        {vehicle.image ? (
          <img
            src={vehicle.image}
            alt={vehicle.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <p className="text-gray-400">No image available</p>
          </div>
        )}
      </div>
      <CardHeader className="px-5 py-4 pb-2">
        <CardTitle className="text-xl font-medium">
          {vehicle.year} {vehicle.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-5 py-2">
        <div className="flex flex-col gap-3">
          <p className="text-2xl font-bold text-blue-600">{vehicle.price}</p>
          <div className="grid grid-cols-2 gap-y-2 text-sm">
            <div>
              <span className="text-gray-500">Mileage:</span>{" "}
              <span className="font-medium">{vehicle.specs.mileage}</span>
            </div>
            <div>
              <span className="text-gray-500">Engine:</span>{" "}
              <span className="font-medium">{vehicle.specs.engine}</span>
            </div>
            <div>
              <span className="text-gray-500">Transmission:</span>{" "}
              <span className="font-medium">{vehicle.specs.transmission}</span>
            </div>
            <div>
              <span className="text-gray-500">Color:</span>{" "}
              <span className="font-medium">{vehicle.specs.color}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-1">
            {vehicle.availableModes.map((mode: string) => (
              <Badge key={mode} variant="outline" className="capitalize py-1">
                {mode}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between gap-3 px-5 py-4 pt-2">
        <Button variant="outline" size="sm" className="flex-1">
          Compare
        </Button>
        <Link href={`/vehicles/${vehicle.id}`} className="flex-1">
          <Button size="sm" className="w-full">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
