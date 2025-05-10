import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
	title: "User Flow | Gargash Motors",
	description: "Choose your user flow to get personalized experience",
};

export default function UserFlowPage() {
	return (
		<div className="container max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
			<div className="text-center mb-12">
				<h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
					Welcome to Gargash Motors
				</h1>
				<p className="mt-4 text-xl text-gray-500">
					Choose your journey for a personalized experience
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
				{/* New User Card */}
				<Card className="relative overflow-hidden border-2 hover:border-primary hover:shadow-lg transition-all duration-300 h-full">
					<div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 rounded-bl-lg text-sm font-medium">
						New User
					</div>
					<CardHeader className="pt-10">
						<CardTitle className="text-2xl">New to Gargash?</CardTitle>
						<CardDescription>
							Let us help you find your perfect vehicle and answer your
							questions
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<FeatureItem
							title="AI-Based Car Recommender"
							description="Get personalized vehicle recommendations based on your preferences and needs"
							icon="🚗"
						/>
						<FeatureItem
							title="AI Chatbot"
							description="Ask any questions about our vehicles, services, or financing options"
							icon="💬"
						/>
					</CardContent>
					<CardFooter>
						<Button asChild className="w-full">
							<Link href="/user-preferences">Get Started</Link>
						</Button>
					</CardFooter>
				</Card>

				{/* Existing User Card */}
				<Card className="relative overflow-hidden border-2 hover:border-primary hover:shadow-lg transition-all duration-300 h-full">
					<div className="absolute top-0 right-0 bg-secondary text-secondary-foreground px-4 py-1 rounded-bl-lg text-sm font-medium">
						Existing User
					</div>
					<CardHeader className="pt-10">
						<CardTitle className="text-2xl">Already a Customer?</CardTitle>
						<CardDescription>
							Access premium services to manage and maintain your vehicle
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<FeatureItem
							title="Smart Maintenance"
							description="Schedule service, get maintenance reminders, and view your vehicle's health"
							icon="🔧"
						/>
						<FeatureItem
							title="Smart Garage Assistance"
							description="Access your vehicle documents, service history, and warranty information"
							icon="🏠"
						/>
					</CardContent>
					<CardFooter>
						<Button asChild variant="secondary" className="w-full">
							<Link href="/existing-user">Access Dashboard</Link>
						</Button>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
}

function FeatureItem({
	title,
	description,
	icon,
}: { title: string; description: string; icon: string }) {
	return (
		<div className="flex items-start space-x-4">
			<div className="flex-shrink-0 bg-muted rounded-full p-3 text-2xl">
				{icon}
			</div>
			<div>
				<h3 className="font-medium">{title}</h3>
				<p className="text-sm text-muted-foreground">{description}</p>
			</div>
		</div>
	);
}
