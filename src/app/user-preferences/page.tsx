import { Metadata } from "next";
import { OnboardingFlow } from "@/components/onboarding/onboarding-flow";

export const metadata: Metadata = {
	title: "User Preferences",
	description:
		"Set your preferences for a personalized car browsing experience",
};

export default function UserPreferencesPage() {
	return (
		<main className="container max-w-5xl mx-auto py-10">
			<OnboardingFlow />
		</main>
	);
}
