import type { Metadata } from "next";
import Link from "next/link";
import {
	ArrowLeft,
	MapPin,
	Phone,
	Star,
	StarHalf,
	Wrench,
	AlertCircle,
	Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
	title: "Recommended Garages | Car360",
	description: "View recommended garages for your car issues",
};

// Fallback data for demonstrations or when the API is unavailable
const FALLBACK_RECOMMENDATIONS = {
	accident_type: "collision",
	damage: "rear bumper",
	severity: "minor",
	recommended_garages: [
		{
			name: "Gargash DIFC",
			location: "DIFC",
			justification:
				"Specializes in head-on collisions and front-end damage, which are common in collision accidents.",
		},
		{
			name: "Gargash Jumeirah",
			location: "Jumeirah",
			justification:
				"Offers expertise in front and rear-end damage, which are typical in collision scenarios.",
		},
		{
			name: "Gargash Services",
			location: "Al Quoz",
			justification:
				"Specializes in rear-end damage and frame alignment, both relevant to collision repairs.",
		},
	],
};

// Map severity levels to badge variants
const getSeverityBadge = (severity: string | undefined) => {
	if (!severity) return "secondary";

	switch (severity.toLowerCase()) {
		case "minor":
			return "outline";
		case "moderate":
			return "secondary";
		case "severe":
			return "destructive";
		default:
			return "secondary";
	}
};

// Map service center locations to random phone numbers for demo
const LOCATION_PHONES: Record<string, string> = {
	DIFC: "+971 4 384 4444",
	Jumeirah: "+971 4 347 5911",
	"Al Quoz": "+971 4 389 9955",
	"Dubai Marina": "+971 4 425 7788",
	"Business Bay": "+971 4 363 1122",
};

export default function GarageRecommendationsPage({
	searchParams,
}: {
	searchParams: { method?: string; q?: string };
}) {
	const { method, q } = searchParams;

	// In a production app, this data would be fetched from the server
	// Either using server actions (for authenticated requests) or directly from a data provider
	const analysisData = FALLBACK_RECOMMENDATIONS;

	// Extract data from the analysis
	const { accident_type, damage, severity, recommended_garages } = analysisData;

	// Get problem description based on method
	const problemDescription =
		method === "text" && q ? q : "Uploaded image analysis";

	return (
		<main className="container mx-auto py-8 px-4">
			<div className="flex items-center gap-2 mb-6">
				<Button variant="ghost" size="icon" asChild>
					<Link href="/existing-user/garage">
						<ArrowLeft className="h-5 w-5" />
					</Link>
				</Button>
				<h1 className="text-3xl font-bold">Recommended Garages</h1>
			</div>

			<div className="bg-card border rounded-lg shadow-sm p-6 mb-8">
				<div className="space-y-4">
					<div className="border-l-4 border-primary pl-4 py-2">
						<h2 className="text-lg font-semibold mb-1">Analysis Summary</h2>
						<p className="text-muted-foreground">"{problemDescription}"</p>
					</div>

					{/* Analysis details */}
					{accident_type && damage && (
						<div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
							{accident_type && (
								<div className="bg-secondary/10 rounded-lg p-3 flex flex-col items-center justify-center text-center">
									<div className="bg-secondary/20 p-2 rounded-full mb-2">
										<AlertCircle className="h-5 w-5 text-secondary-foreground" />
									</div>
									<span className="text-sm font-medium">Incident Type</span>
									<span className="text-sm">{accident_type}</span>
								</div>
							)}
							{damage && (
								<div className="bg-muted rounded-lg p-3 flex flex-col items-center justify-center text-center">
									<div className="bg-muted/70 p-2 rounded-full mb-2">
										<Wrench className="h-5 w-5" />
									</div>
									<span className="text-sm font-medium">Damage Type</span>
									<span className="text-sm">{damage}</span>
								</div>
							)}
							{severity && (
								<div
									className={`bg-${getSeverityBadge(severity)}/10 rounded-lg p-3 flex flex-col items-center justify-center text-center`}
								>
									<div
										className={`bg-${getSeverityBadge(severity)}/20 p-2 rounded-full mb-2`}
									>
										<Shield
											className={`h-5 w-5 text-${getSeverityBadge(severity)}`}
										/>
									</div>
									<span className="text-sm font-medium">Severity Level</span>
									<span className="text-sm capitalize">{severity}</span>
								</div>
							)}
						</div>
					)}
				</div>
			</div>

			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{recommended_garages?.map((garage, index) => {
					// Generate placeholder data for demo purposes
					const rating = 4.5 + Math.random() * 0.5;
					const phone = LOCATION_PHONES[garage.location] || "+971 4 123 4567";

					return (
						<Card
							key={`${garage.name}-${garage.location}`}
							className="overflow-hidden"
						>
							<div className="relative h-48 w-full bg-muted">
								<img
									src="/images/szr.webp"
									alt={garage.name}
									className="object-cover w-full h-full"
								/>
								<div className="absolute top-2 right-2">
									<Badge variant="success">Available today</Badge>
								</div>
							</div>

							<CardHeader>
								<CardTitle>{garage.name}</CardTitle>
								<CardDescription className="flex items-center gap-1">
									<div className="flex">
										{[...Array(Math.floor(rating))].map((_, i) => (
											<Star
												key={`star-${garage.name}-${i}`}
												className="h-4 w-4 fill-primary text-primary"
											/>
										))}
										{rating % 1 >= 0.5 && (
											<StarHalf className="h-4 w-4 fill-primary text-primary" />
										)}
									</div>
									<span className="ml-1">{rating.toFixed(1)}</span>
									<span className="mx-2">•</span>
									<MapPin className="h-4 w-4" />
									<span>{garage.location}</span>
								</CardDescription>
							</CardHeader>

							<CardContent className="space-y-4">
								{/* Justification */}
								<div className="text-sm text-muted-foreground border-l-2 border-primary/20 pl-3 py-1 italic">
									"{garage.justification}"
								</div>

								<div className="flex items-start gap-2 text-sm">
									<MapPin className="h-4 w-4 mt-0.5 shrink-0" />
									<span>{garage.location}, Dubai, UAE</span>
								</div>

								<div className="flex items-center gap-2 text-sm">
									<Phone className="h-4 w-4 shrink-0" />
									<span>{phone}</span>
								</div>
							</CardContent>

							<CardFooter className="flex gap-2">
								<Button className="w-full">Book Service</Button>
								<Button variant="outline" className="w-full">
									Contact
								</Button>
							</CardFooter>
						</Card>
					);
				})}
			</div>

			<div className="mt-8 text-center text-muted-foreground">
				<p>Can't find what you're looking for?</p>
				<Button variant="link" asChild>
					<Link href="/existing-user/garage">Try another search</Link>
				</Button>
			</div>
		</main>
	);
}
