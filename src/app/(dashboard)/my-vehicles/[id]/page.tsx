import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
	ChevronLeft,
	Calendar,
	Gauge,
	Car,
	Fuel,
	BadgeCheck,
	MapPin,
	PlugZap,
	Wallet,
	Share2,
	Heart,
	ArrowRight,
	MessageSquare,
	CalendarClock,
	Info,
} from "lucide-react";
import { notFound } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { mockVehicles } from "@/data/mockVehicles";
import { formatCurrency } from "@/lib/utils";
import AnomalyDashboard from "@/components/anomalies/anomaly-dashboard";

export async function generateMetadata({ params }) {
	const vehicle = mockVehicles.find((v) => v.id === params.id);

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

export default function VehicleDetailPage({ params }) {
	const vehicle = mockVehicles.find((v) => v.id === params.id);

	if (!vehicle) {
		notFound();
	}

	const getFuelIcon = (type: string) => {
		switch (type) {
			case "electric":
				return <PlugZap className="h-4 w-4 mr-1.5 text-green-500" />;
			case "hybrid":
				return <Fuel className="h-4 w-4 mr-1.5 text-blue-500" />;
			default:
				return <Fuel className="h-4 w-4 mr-1.5 text-gray-500" />;
		}
	};

	// Create status badge based on vehicle condition
	const getConditionBadge = (condition: string) => {
		switch (condition.toLowerCase()) {
			case "new":
				return (
					<Badge className="bg-emerald-500 hover:bg-emerald-600">New</Badge>
				);
			case "excellent":
				return (
					<Badge className="bg-green-500 hover:bg-green-600">Excellent</Badge>
				);
			case "good":
				return <Badge className="bg-blue-500 hover:bg-blue-600">Good</Badge>;
			case "fair":
				return <Badge className="bg-amber-500 hover:bg-amber-600">Fair</Badge>;
			default:
				return <Badge className="bg-gray-500 hover:bg-gray-600">Used</Badge>;
		}
	};

	return (
		<div className="container mx-auto py-10 px-4 max-w-7xl">
			{/* Breadcrumb navigation */}
			<div className="flex items-center justify-between mb-8">
				<Link
					href="/my-vehicles"
					className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
				>
					<ChevronLeft className="h-4 w-4 mr-1.5" />
					Back to My Vehicles
				</Link>

				<div className="flex items-center gap-3">
					<Button size="sm" variant="outline" className="h-9 gap-1.5">
						<Share2 className="h-4 w-4" />
						<span className="hidden sm:inline">Share</span>
					</Button>
					<Button size="sm" variant="outline" className="h-9 gap-1.5">
						<Heart className="h-4 w-4" />
						<span className="hidden sm:inline">Save</span>
					</Button>
				</div>
			</div>

			{/* Vehicle header section with title and key specs */}
			<div className="mb-6">
				<div className="flex flex-wrap items-baseline justify-between gap-4 mb-3">
					<h1 className="text-3xl font-bold tracking-tight">{vehicle.title}</h1>
					<div className="text-right">
						<div className="text-2xl font-bold text-gray-900">
							{formatCurrency(vehicle.price)}
						</div>
						{vehicle.priceType && (
							<div className="text-sm text-gray-500">{vehicle.priceType}</div>
						)}
					</div>
				</div>

				<div className="flex flex-wrap items-center gap-3 mb-3">
					{getConditionBadge(vehicle.condition)}

					<div className="flex items-center gap-1.5 text-sm">
						<Calendar className="h-4 w-4 text-gray-500" />
						<span>{vehicle.year}</span>
					</div>

					<div className="flex items-center gap-1.5 text-sm">
						<Car className="h-4 w-4 text-gray-500" />
						<span className="capitalize">{vehicle.bodyStyle}</span>
					</div>

					<div className="flex items-center gap-1.5 text-sm">
						{getFuelIcon(vehicle.fuelType)}
						<span className="capitalize">{vehicle.fuelType}</span>
					</div>

					<div className="flex items-center gap-1.5 text-sm">
						<Gauge className="h-4 w-4 text-gray-500" />
						<span>
							{vehicle.mileage === 0
								? "New"
								: `${vehicle.mileage.toLocaleString()} km`}
						</span>
					</div>

					<div className="flex items-center gap-1.5 text-sm">
						<MapPin className="h-4 w-4 text-gray-500" />
						<span>{vehicle.location}</span>
					</div>
				</div>
			</div>

			{/* Tabs moved to directly under vehicle title */}
			<Card className="border-0 shadow-md mb-8">
				<CardContent className="p-0">
					<Tabs defaultValue="details" className="w-full">
						<div className="border-b">
							<div className="px-6 pt-6">
								<TabsList className="grid grid-cols-3 w-full">
									<TabsTrigger value="details">Vehicle Details</TabsTrigger>
									<TabsTrigger value="intelligence">
										Smart Intelligence
									</TabsTrigger>
									<TabsTrigger value="maintenance">
										Smart Maintenance
									</TabsTrigger>
								</TabsList>
							</div>
						</div>

						<TabsContent value="details" className="space-y-6">
							<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
								{/* Left column - Images and details */}
								<div className="col-span-2 space-y-8">
									{/* Vehicle image gallery */}
									<Card className="overflow-hidden border-0 shadow-md">
										<CardContent className="p-0">
											<div className="aspect-[16/9] w-full relative overflow-hidden">
												<Image
													src={vehicle.images[0]}
													alt={vehicle.title}
													fill
													priority
													sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
													className="object-cover transition-transform hover:scale-105 duration-500"
												/>
											</div>

											<div className="grid grid-cols-4 gap-2 p-2 bg-gray-50">
												{vehicle.images.slice(0, 4).map((img, i) => (
													<div
														key={i}
														className="aspect-[4/3] relative rounded-md overflow-hidden cursor-pointer"
													>
														<Image
															src={img}
															alt={`${vehicle.title} - Image ${i + 1}`}
															fill
															sizes="(max-width: 768px) 25vw, 150px"
															className="object-cover hover:opacity-90 transition-opacity"
														/>
														{i === 3 && vehicle.images.length > 4 && (
															<div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white font-medium">
																+{vehicle.images.length - 4} more
															</div>
														)}
													</div>
												))}
											</div>
										</CardContent>
									</Card>
								</div>

								{/* Right column - Pricing and actions */}
								<div className="space-y-6">
									{/* Dealership info */}
									<Card className="border-0 shadow-md">
										<CardHeader className="pb-2">
											<CardTitle>Dealership Information</CardTitle>
										</CardHeader>
										<CardContent>
											<div className="space-y-4">
												<div className="flex items-center gap-3">
													<div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
														<BadgeCheck className="h-5 w-5 text-blue-500" />
													</div>
													<div>
														<div className="font-semibold">
															{vehicle.dealershipName}
														</div>
														<div className="text-sm text-gray-500">
															{vehicle.location}
														</div>
													</div>
												</div>

												<div className="flex justify-between pt-1">
													<Button
														variant="outline"
														size="sm"
														className="flex-1 mr-2"
													>
														<MessageSquare className="h-4 w-4 mr-2" />
														Message
													</Button>
													<Button
														variant="outline"
														size="sm"
														className="flex-1"
													>
														<Info className="h-4 w-4 mr-2" />
														Details
													</Button>
												</div>
											</div>
										</CardContent>
									</Card>

									{/* Pricing card */}
									<Card className="border-0 shadow-md">
										<CardHeader className="pb-2">
											<CardTitle>Pricing Options</CardTitle>
											<CardDescription>
												Choose your preferred payment option
											</CardDescription>
										</CardHeader>
										<CardContent className="space-y-4">
											{vehicle.availableModes.includes("buy") && (
												<Card className="bg-gradient-to-r from-gray-50 to-white border">
													<CardHeader className="py-3 px-4">
														<div className="flex items-center justify-between">
															<CardTitle className="text-base font-medium flex items-center">
																<Wallet className="h-4 w-4 text-gray-500 mr-2" />
																Purchase
															</CardTitle>
															<Badge
																variant="secondary"
																className="bg-gray-100 text-gray-700"
															>
																Recommended
															</Badge>
														</div>
													</CardHeader>
													<CardContent className="py-2 px-4">
														<div className="space-y-1.5 text-sm">
															<div className="flex justify-between">
																<span className="text-gray-600">MSRP</span>
																<span>
																	{formatCurrency(
																		vehicle.pricing.buy?.msrp || 0,
																	)}
																</span>
															</div>
															<div className="flex justify-between font-medium">
																<span>Offer Price</span>
																<span className="text-lg text-blue-600">
																	{formatCurrency(
																		vehicle.pricing.buy?.offer || 0,
																	)}
																</span>
															</div>
															<div className="flex justify-between">
																<span className="text-gray-600">
																	Est. Monthly
																</span>
																<span>
																	{formatCurrency(
																		vehicle.pricing.buy?.monthlyPayment || 0,
																	)}
																	/mo
																</span>
															</div>
														</div>
													</CardContent>
												</Card>
											)}

											{vehicle.availableModes.includes("lease") && (
												<Card className="border">
													<CardHeader className="py-3 px-4">
														<CardTitle className="text-base font-medium flex items-center">
															<Wallet className="h-4 w-4 text-gray-500 mr-2" />
															Lease
														</CardTitle>
													</CardHeader>
													<CardContent className="py-2 px-4">
														<div className="space-y-1.5 text-sm">
															<div className="flex justify-between font-medium">
																<span>Monthly Payment</span>
																<span className="text-blue-600">
																	{formatCurrency(
																		vehicle.pricing.lease?.monthlyPayment || 0,
																	)}
																	/mo
																</span>
															</div>
															<div className="flex justify-between">
																<span className="text-gray-600">Term</span>
																<span>
																	{vehicle.pricing.lease?.term || 0} months
																</span>
															</div>
															<div className="flex justify-between">
																<span className="text-gray-600">
																	Mileage Limit
																</span>
																<span>
																	{vehicle.pricing.lease?.mileageLimit?.toLocaleString() ||
																		0}
																	/year
																</span>
															</div>
														</div>
													</CardContent>
												</Card>
											)}

											{vehicle.availableModes.includes("rent") && (
												<Card className="border">
													<CardHeader className="py-3 px-4">
														<CardTitle className="text-base font-medium flex items-center">
															<Wallet className="h-4 w-4 text-gray-500 mr-2" />
															Rent
														</CardTitle>
													</CardHeader>
													<CardContent className="py-2 px-4">
														<div className="space-y-1.5 text-sm">
															<div className="flex justify-between">
																<span className="text-gray-600">
																	Daily Rate
																</span>
																<span>
																	{formatCurrency(
																		vehicle.pricing.rent?.dailyRate || 0,
																	)}
																	/day
																</span>
															</div>
															<div className="flex justify-between">
																<span className="text-gray-600">
																	Weekly Rate
																</span>
																<span>
																	{formatCurrency(
																		vehicle.pricing.rent?.weeklyRate || 0,
																	)}
																	/week
																</span>
															</div>
															<div className="flex justify-between font-medium">
																<span>Monthly Rate</span>
																<span className="text-blue-600">
																	{formatCurrency(
																		vehicle.pricing.rent?.monthlyRate || 0,
																	)}
																	/month
																</span>
															</div>
														</div>
													</CardContent>
												</Card>
											)}
										</CardContent>
									</Card>
								</div>
							</div>
							<div>
								<h3 className="text-xl font-semibold mb-3">
									About this Vehicle
								</h3>
								<p className="text-gray-700 leading-relaxed">
									{vehicle.description}
								</p>
							</div>

							<div>
								<h3 className="text-xl font-semibold mb-4">
									Key Specifications
								</h3>
								<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
									<Card className="bg-gray-50 border-0">
										<CardContent className="p-4">
											<div className="text-xs text-gray-500 mb-1">Make</div>
											<div className="font-medium">{vehicle.make}</div>
										</CardContent>
									</Card>
									<Card className="bg-gray-50 border-0">
										<CardContent className="p-4">
											<div className="text-xs text-gray-500 mb-1">Model</div>
											<div className="font-medium">{vehicle.model}</div>
										</CardContent>
									</Card>
									<Card className="bg-gray-50 border-0">
										<CardContent className="p-4">
											<div className="text-xs text-gray-500 mb-1">Year</div>
											<div className="font-medium">{vehicle.year}</div>
										</CardContent>
									</Card>
									<Card className="bg-gray-50 border-0">
										<CardContent className="p-4">
											<div className="text-xs text-gray-500 mb-1">
												Body Style
											</div>
											<div className="font-medium capitalize">
												{vehicle.bodyStyle}
											</div>
										</CardContent>
									</Card>
									<Card className="bg-gray-50 border-0">
										<CardContent className="p-4">
											<div className="text-xs text-gray-500 mb-1">
												Fuel Type
											</div>
											<div className="font-medium capitalize">
												{vehicle.fuelType}
											</div>
										</CardContent>
									</Card>
									<Card className="bg-gray-50 border-0">
										<CardContent className="p-4">
											<div className="text-xs text-gray-500 mb-1">Mileage</div>
											<div className="font-medium">
												{vehicle.mileage === 0
													? "New"
													: `${vehicle.mileage.toLocaleString()} km`}
											</div>
										</CardContent>
									</Card>
									<Card className="bg-gray-50 border-0">
										<CardContent className="p-4">
											<div className="text-xs text-gray-500 mb-1">Color</div>
											<div className="font-medium">{vehicle.color}</div>
										</CardContent>
									</Card>
									<Card className="bg-gray-50 border-0">
										<CardContent className="p-4">
											<div className="text-xs text-gray-500 mb-1">
												Interior Color
											</div>
											<div className="font-medium">{vehicle.interiorColor}</div>
										</CardContent>
									</Card>
									<Card className="bg-gray-50 border-0">
										<CardContent className="p-4">
											<div className="text-xs text-gray-500 mb-1">
												Condition
											</div>
											<div className="font-medium capitalize">
												{vehicle.condition}
											</div>
										</CardContent>
									</Card>
								</div>
							</div>

							<div>
								<h3 className="text-xl font-semibold mb-4">
									Technical Specifications
								</h3>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
									<div className="space-y-4">
										<div className="flex justify-between items-center py-2 border-b border-gray-100">
											<span className="text-gray-600">Engine</span>
											<span className="font-medium">
												{vehicle.specs.engine}
											</span>
										</div>
										<div className="flex justify-between items-center py-2 border-b border-gray-100">
											<span className="text-gray-600">Transmission</span>
											<span className="font-medium">
												{vehicle.specs.transmission}
											</span>
										</div>
										<div className="flex justify-between items-center py-2 border-b border-gray-100">
											<span className="text-gray-600">Horsepower</span>
											<span className="font-medium">
												{vehicle.specs.horsepower} hp
											</span>
										</div>
										<div className="flex justify-between items-center py-2 border-b border-gray-100">
											<span className="text-gray-600">Torque</span>
											<span className="font-medium">
												{vehicle.specs.torque}
											</span>
										</div>
									</div>
									<div className="space-y-4">
										<div className="flex justify-between items-center py-2 border-b border-gray-100">
											<span className="text-gray-600">Fuel Economy</span>
											<span className="font-medium">
												{vehicle.specs.fuelEconomy}
											</span>
										</div>
										<div className="flex justify-between items-center py-2 border-b border-gray-100">
											<span className="text-gray-600">Acceleration</span>
											<span className="font-medium">
												{vehicle.specs.acceleration}
											</span>
										</div>
										<div className="flex justify-between items-center py-2 border-b border-gray-100">
											<span className="text-gray-600">Drivetrain</span>
											<span className="font-medium">
												{vehicle.specs.drivetrain}
											</span>
										</div>
									</div>
								</div>
							</div>
						</TabsContent>

						<TabsContent value="intelligence">
							<AnomalyDashboard />
						</TabsContent>

						<TabsContent value="maintenance" className="hidden">
							<TabsContent value="maintenance">
								<div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6">
									<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
										<div>
											<h3 className="text-xl font-semibold mb-2">
												Smart Maintenance Schedule
											</h3>
											<p className="text-gray-700">
												Keep your {vehicle.make} {vehicle.model} in top
												condition with our AI-recommended maintenance schedule.
											</p>
										</div>
										<Badge
											variant="outline"
											className="bg-blue-100 text-blue-800 border-blue-200 px-3 py-1.5 text-sm flex items-center"
										>
											<BadgeCheck className="h-4 w-4 mr-1.5" />
											AI Optimized
										</Badge>
									</div>

									<div className="grid grid-cols-1 gap-4">
										<Card className="bg-white shadow-sm border-0 border-l-4 border-l-amber-500">
											<CardContent className="p-4">
												<div className="flex justify-between items-start">
													<div>
														<h4 className="font-semibold">Oil Change Due</h4>
														<p className="text-sm text-gray-600 mt-1">
															Recommended within the next 500 km or 2 weeks
														</p>
													</div>
													<Badge
														variant="outline"
														className="bg-amber-50 text-amber-700 border-amber-200"
													>
														Upcoming
													</Badge>
												</div>
												<div className="mt-3 flex justify-end">
													<Button
														variant="outline"
														size="sm"
														className="text-xs h-8"
													>
														Schedule Service
													</Button>
												</div>
											</CardContent>
										</Card>

										<Card className="bg-white shadow-sm border-0 border-l-4 border-l-green-500">
											<CardContent className="p-4">
												<div className="flex justify-between items-start">
													<div>
														<h4 className="font-semibold">Tire Rotation</h4>
														<p className="text-sm text-gray-600 mt-1">
															Last performed: 2 months ago. Next scheduled: In 4
															months
														</p>
													</div>
													<Badge
														variant="outline"
														className="bg-green-50 text-green-700 border-green-200"
													>
														Complete
													</Badge>
												</div>
											</CardContent>
										</Card>

										<Card className="bg-white shadow-sm border-0 border-l-4 border-l-blue-500">
											<CardContent className="p-4">
												<div className="flex justify-between items-start">
													<div>
														<h4 className="font-semibold">Annual Service</h4>
														<p className="text-sm text-gray-600 mt-1">
															Comprehensive inspection and service due in 3
															months
														</p>
													</div>
													<Badge
														variant="outline"
														className="bg-blue-50 text-blue-700 border-blue-200"
													>
														Scheduled
													</Badge>
												</div>
												<div className="mt-3 flex justify-end">
													<Button
														variant="outline"
														size="sm"
														className="text-xs h-8"
													>
														View Details
													</Button>
												</div>
											</CardContent>
										</Card>

										<Card className="bg-white shadow-sm border-0 border-l-4 border-l-purple-500">
											<CardContent className="p-4">
												<div className="flex justify-between items-start">
													<div>
														<h4 className="font-semibold">
															Battery Health Check
														</h4>
														<p className="text-sm text-gray-600 mt-1">
															Battery health at 87%. Recommended replacement: In
															10-12 months
														</p>
													</div>
													<Badge
														variant="outline"
														className="bg-purple-50 text-purple-700 border-purple-200"
													>
														Monitored
													</Badge>
												</div>
											</CardContent>
										</Card>

										<div className="flex justify-center mt-2">
											<Button
												variant="link"
												size="sm"
												className="text-blue-600"
											>
												View Full Maintenance History
												<ArrowRight className="h-4 w-4 ml-1" />
											</Button>
										</div>
									</div>
								</div>
							</TabsContent>
						</TabsContent>
					</Tabs>
				</CardContent>
			</Card>

			{/* Main content */}
		</div>
	);
}

// Generate static paths for all vehicles
export function generateStaticParams() {
	return mockVehicles.slice(0, 4).map((vehicle) => ({
		id: vehicle.id,
	}));
}
