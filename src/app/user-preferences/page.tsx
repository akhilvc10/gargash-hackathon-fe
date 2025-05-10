import { Metadata } from "next";
import { OnboardingFlow } from "@/components/onboarding/onboarding-flow";

export const metadata: Metadata = {
	title: "User Preferences",
	description:
		"Set your preferences for a personalized car browsing experience",
};

export default function UserPreferencesPage() {
	return (
		<main className="container max-w-5xl mx-auto py-10 space-y-8">
			<div className="text-center space-y-2">
				<h1 className="text-3xl font-bold">Tell us what you like</h1>
				<p className="text-muted-foreground">
					Help us personalize your experience by sharing your preferences
				</p>
			</div>

			<OnboardingFlow />
		</main>
	);
}
