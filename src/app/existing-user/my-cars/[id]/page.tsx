import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
	ArrowLeft,
	Calendar,
	Car,
	Fuel,
	Gauge,
	MapPin,
	Settings,
	Tag,
	Wrench,
	Sparkles,
} from "lucide-react";

import { mockVehicles } from "@/data/mockVehicles";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { VehicleSpecs } from "./components/vehicle-specs";
import { VehicleFeatures } from "./components/vehicle-features";
import { ServiceHistory } from "./components/service-history";
import { VehicleSummary } from "./components/vehicle-summary";

export const metadata: Metadata = {
	title: "Car Details | Gargash",
	description: "View detailed information about your vehicle",
};

export default function CarDetailPage({ params }: { params: { id: string } }) {
	// Find the vehicle with the matching ID
	const vehicle = mockVehicles.find((v) => v.id === params.id);

	// If no vehicle is found, return a 404 page
	if (!vehicle) {
		notFound();
	}

	return (
		<div className="container mx-auto py-8">
			<div className="mb-6">
				<Link
					href="/existing-user/my-cars"
					className="text-muted-foreground hover:text-foreground inline-flex items-center mb-4"
				>
					<ArrowLeft className="h-4 w-4 mr-2" />
					Back to My Cars
				</Link>

				<div className="flex justify-between items-center">
					<h1 className="text-3xl font-bold tracking-tight mb-1">
						{vehicle.year} {vehicle.make} {vehicle.model}
					</h1>
					<Button className="bg-primary hover:bg-primary/90">
						<Sparkles className="mr-2 h-4 w-4" />
						Smart Maintenance
					</Button>
				</div>

				<div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
					<div className="flex items-center">
						<Calendar className="h-4 w-4 mr-1" />
						<span>{vehicle.year}</span>
					</div>
					<div className="flex items-center">
						<Gauge className="h-4 w-4 mr-1" />
						<span>{vehicle.mileage.toLocaleString()} km</span>
					</div>
					<div className="flex items-center">
						<Fuel className="h-4 w-4 mr-1" />
						<span className="capitalize">{vehicle.fuelType}</span>
					</div>
					<div className="flex items-center">
						<Car className="h-4 w-4 mr-1" />
						<span className="capitalize">{vehicle.bodyStyle}</span>
					</div>
					<div className="flex items-center">
						<MapPin className="h-4 w-4 mr-1" />
						<span>{vehicle.location}</span>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				<div className="lg:col-span-2">
					<div className="bg-white rounded-xl overflow-hidden mb-8">
						<img
							src={vehicle.images[0] || vehicle.thumbnail}
							alt={`${vehicle.make} ${vehicle.model}`}
							className="w-full h-[400px] object-cover"
						/>
					</div>

					<Tabs defaultValue="specifications" className="mb-8">
						<TabsList className="grid grid-cols-3 mb-6">
							<TabsTrigger value="specifications">
								<Settings className="h-4 w-4 mr-2" />
								Specifications
							</TabsTrigger>
							<TabsTrigger value="features">
								<Tag className="h-4 w-4 mr-2" />
								Features
							</TabsTrigger>
							<TabsTrigger value="documents">
								<Wrench className="h-4 w-4 mr-2" />
								Service History
							</TabsTrigger>
						</TabsList>

						<TabsContent value="specifications">
							<VehicleSpecs
								specs={vehicle.specs}
								color={vehicle.color}
								interiorColor={vehicle.interiorColor}
								condition={vehicle.condition}
							/>
						</TabsContent>

						<TabsContent value="features">
							<VehicleFeatures features={vehicle.features} />
						</TabsContent>

						<TabsContent value="documents">
							<ServiceHistory />
						</TabsContent>
					</Tabs>
				</div>

				<div>
					<VehicleSummary
						price={vehicle.price}
						dealershipName={vehicle.dealershipName}
					/>
				</div>
			</div>
		</div>
	);
}
