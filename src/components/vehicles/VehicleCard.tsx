import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Car, Fuel, Gauge, Heart, MapPin, Star } from "lucide-react";
import { Vehicle } from "@/types/vehicle";
import { formatCurrency } from "@/lib/utils";

interface VehicleCardProps {
	vehicle: Vehicle;
}

export default function VehicleCard({ vehicle }: VehicleCardProps) {
	const {
		id,
		title,
		make,
		model,
		year,
		thumbnail,
		price,
		priceType,
		bodyStyle,
		fuelType,
		mileage,
		rating,
		location,
		availableModes,
	} = vehicle;

	const getFuelIcon = (type: string) => {
		switch (type) {
			case "electric":
				return "⚡";
			case "hybrid":
				return "⚡/⛽";
			default:
				return "⛽";
		}
	};

	return (
		<div className="bg-white rounded-xl shadow-card overflow-hidden transition-all hover:shadow-lg">
			<div className="relative">
				<Link href={`/existing-user/my-cars/${id}`} className="block">
					<img
						src={thumbnail}
						alt={`${make} ${model}`}
						className="h-48 w-full object-cover"
					/>
				</Link>
				<button
					type="button"
					className="absolute top-3 right-3 bg-white/80 p-2 rounded-full backdrop-blur-sm hover:bg-white transition-colors"
				>
					<Heart className="h-5 w-5 text-gray-600" />
				</button>

				<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
					<div className="flex justify-between items-center">
						<div className="flex items-center space-x-1">
							<Badge
								variant="outline"
								className="bg-white/90 text-gray-800 px-2 py-0.5 text-xs font-medium"
							>
								{availableModes.includes("buy") && "Buy"}
							</Badge>
							{availableModes.includes("lease") && (
								<Badge
									variant="outline"
									className="bg-white/90 text-gray-800 px-2 py-0.5 text-xs font-medium"
								>
									Lease
								</Badge>
							)}
							{availableModes.includes("rent") && (
								<Badge
									variant="outline"
									className="bg-white/90 text-gray-800 px-2 py-0.5 text-xs font-medium"
								>
									Rent
								</Badge>
							)}
						</div>
						{rating && (
							<div className="flex items-center bg-white/90 px-2 py-0.5 rounded text-sm">
								<Star className="h-3.5 w-3.5 text-car360-orange mr-1 fill-car360-orange" />
								<span className="font-medium">{rating}</span>
							</div>
						)}
					</div>
				</div>
			</div>

			<div className="p-4">
				<Link href={`/existing-user/my-cars/${id}`} className="block">
					<h3 className="font-medium text-lg text-gray-900 mb-1 truncate">
						{title}
					</h3>
					<p className="text-sm text-gray-600 mb-3">
						{year} {make} {model}
					</p>
				</Link>

				<div className="flex justify-between items-baseline mb-3">
					<div>
						<span className="text-lg font-bold text-gray-900">
							{formatCurrency(price)}
						</span>
						{priceType && (
							<span className="text-sm text-gray-600 ml-1">{priceType}</span>
						)}
					</div>
				</div>

				<div className="grid grid-cols-2 gap-2 mb-4">
					<div className="flex items-center text-sm text-gray-600">
						<Car className="h-4 w-4 text-gray-400 mr-1.5" />
						<span className="capitalize">{bodyStyle}</span>
					</div>
					<div className="flex items-center text-sm text-gray-600">
						<Fuel className="h-4 w-4 text-gray-400 mr-1.5" />
						<span>
							{getFuelIcon(fuelType)}{" "}
							{fuelType.charAt(0).toUpperCase() + fuelType.slice(1)}
						</span>
					</div>
					<div className="flex items-center text-sm text-gray-600">
						<Gauge className="h-4 w-4 text-gray-400 mr-1.5" />
						<span>
							{mileage === 0 ? "New" : `${mileage.toLocaleString()} km`}
						</span>
					</div>
					<div className="flex items-center text-sm text-gray-600">
						<MapPin className="h-4 w-4 text-gray-400 mr-1.5" />
						<span className="truncate">{location}</span>
					</div>
				</div>

				<Link
					href={`/existing-user/my-cars/${id}`}
					className="block w-full bg-car360-blue hover:bg-car360-blue-dark text-white text-center py-2 rounded-md transition-colors"
				>
					View Details
				</Link>
			</div>
		</div>
	);
}
