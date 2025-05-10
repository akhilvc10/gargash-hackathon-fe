import type { Metadata } from "next";
import { GarageRecommendationForm } from "@/components/services/GarageRecommendationForm";

export const metadata: Metadata = {
	title: "Garage Recommendations | Car360",
	description: "Get recommendations for garages based on your car issues",
};

export default function GaragePage() {
	return (
		<main className="container mx-auto py-8 px-4">
			<h1 className="text-3xl font-bold mb-6">Garage Recommendations</h1>
			<p className="mb-8 text-muted-foreground">
				Get assistance on which garage you should approach based on your car
				issue. Upload an image of the issue or describe it in your own words.
			</p>

			<GarageRecommendationForm />
		</main>
	);
}
