import type { Metadata } from "next";
import Link from "next/link";
import { Car, ChevronRight } from "lucide-react";

import { mockVehicles } from "@/data/mockVehicles";
import VehicleCard from "@/components/vehicles/VehicleCard";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
	title: "My Cars | Gargash",
	description: "View all of your purchased vehicles",
};

export default function MyCarsPage() {
	// In a real app, we would fetch only the cars owned by the user
	// For now, we'll use the first 4 cars from the mock data as if they were owned
	const userCars = mockVehicles.slice(0, 4);

	return (
		<div className="container mx-auto py-8">
			<div className="flex items-center justify-between mb-6">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">My Cars</h1>
					<p className="text-muted-foreground mt-1">
						View and manage all of your purchased vehicles
					</p>
				</div>
			</div>

			<Separator className="mb-8" />

			{userCars.length === 0 ? (
				<EmptyState />
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{userCars.map((vehicle) => (
						<Link
							key={vehicle.id}
							href={`/existing-user/my-cars/${vehicle.id}`}
							className="block"
						>
							<VehicleCard vehicle={vehicle} />
						</Link>
					))}
				</div>
			)}

			<div className="mt-12">
				<h2 className="text-2xl font-semibold mb-6">Vehicle Services</h2>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					<ServiceCard
						title="Maintenance Records"
						description="View service history and upcoming maintenance schedules"
						link="/existing-user/maintenance"
					/>
					<ServiceCard
						title="Warranty Information"
						description="Check your vehicle warranty status and coverage details"
						link="/existing-user/warranty"
					/>
					<ServiceCard
						title="Book a Service"
						description="Schedule your next service appointment at a Gargash service center"
						link="/existing-user/book-service"
					/>
				</div>
			</div>
		</div>
	);
}

function EmptyState() {
	return (
		<Card className="border-dashed border-2 p-8 text-center">
			<CardHeader>
				<CardTitle className="text-xl flex justify-center">
					<Car className="h-12 w-12 text-muted-foreground mb-2" />
				</CardTitle>
				<CardTitle>No cars found</CardTitle>
				<CardDescription>
					You don't have any purchased vehicles yet
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Link
					href="/vehicles"
					className="bg-car360-blue hover:bg-car360-blue-dark text-white inline-flex items-center px-4 py-2 rounded-md transition-colors"
				>
					Browse Vehicles
				</Link>
			</CardContent>
		</Card>
	);
}

interface ServiceCardProps {
	title: string;
	description: string;
	link: string;
}

function ServiceCard({ title, description, link }: ServiceCardProps) {
	return (
		<Link href={link}>
			<Card className="h-full hover:shadow-md transition-shadow">
				<CardHeader>
					<CardTitle className="text-lg">{title}</CardTitle>
					<CardDescription>{description}</CardDescription>
				</CardHeader>
				<CardContent className="pt-0">
					<div className="flex items-center text-car360-blue">
						<span className="text-sm font-medium">View details</span>
						<ChevronRight className="h-4 w-4 ml-1" />
					</div>
				</CardContent>
			</Card>
		</Link>
	);
}
