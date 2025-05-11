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
import { ArrowRight, Car, MessageSquare, Wrench, Home } from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
	title: "User Flow | Gargash Motors",
	description: "Choose your user flow to get personalized experience",
};

export default function UserFlowPage() {
	return (
		<div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex flex-col items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
			<div className="text-center mb-12 max-w-3xl">
				<div className="mb-6 flex justify-center">
					<div className="h-16 flex items-center justify-center">
						<Image
							src="/images/logo.avif"
							alt="Gargash Motors"
							width={200}
							height={100}
						/>
					</div>
				</div>
				<h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-3">
					Welcome to Gargash Car360
				</h1>
				<div className="h-1 w-24 bg-primary mx-auto my-4 rounded-full" />
				<p className="mt-4 text-xl text-gray-500">
					Choose your journey for a personalized experience
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full mx-auto">
				{/* New User Card */}
				<Card className="relative overflow-hidden border border-muted hover:border-primary hover:shadow-xl transition-all duration-300 h-full group rounded-xl">
					<div className="absolute top-0 right-0 bg-primary text-white px-4 py-2 rounded-bl-xl text-sm font-medium">
						New User
					</div>
					<CardHeader className="pt-12 pb-6">
						<CardTitle className="text-2xl font-bold flex items-center gap-2">
							<span className="bg-primary/10 p-2 rounded-full text-primary">
								<Car size={20} />
							</span>
							New to Gargash?
						</CardTitle>
						<CardDescription className="text-base mt-2">
							Let us help you find your perfect vehicle and answer your
							questions
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6 pb-8">
						<FeatureItem
							title="AI-Based Car Recommender"
							description="Get personalized vehicle recommendations based on your preferences and needs"
							icon={<Car className="text-primary" size={20} />}
						/>
						<FeatureItem
							title="AI Chatbot"
							description="Ask any questions about our vehicles, services, or financing options"
							icon={<MessageSquare className="text-primary" size={20} />}
						/>
					</CardContent>
					<CardFooter className="pt-4 pb-6">
						<Button
							asChild
							size="lg"
							className="w-full group-hover:bg-primary/90 transition-all"
						>
							<Link
								href="/user-preferences"
								className="flex items-center justify-center"
							>
								Get Started
								<ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
							</Link>
						</Button>
					</CardFooter>
				</Card>

				{/* Existing User Card */}
				<Card className="relative overflow-hidden border border-muted hover:border-secondary hover:shadow-xl transition-all duration-300 h-full group rounded-xl">
					<div className="absolute top-0 right-0 bg-secondary text-secondary-foreground px-4 py-2 rounded-bl-xl text-sm font-medium">
						Existing User
					</div>
					<CardHeader className="pt-12 pb-6">
						<CardTitle className="text-2xl font-bold flex items-center gap-2">
							<span className="bg-primary/10 p-2 rounded-full text-primary">
								<Home size={20} />
							</span>
							Already a Customer?
						</CardTitle>
						<CardDescription className="text-base mt-2">
							Access premium services to manage and maintain your vehicle
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6 pb-8">
						<FeatureItem
							title="Smart Maintenance"
							description="Schedule service, get maintenance reminders, and view your vehicle's health"
							icon={<Wrench size={20} />}
						/>
						<FeatureItem
							title="Smart Garage Assistance"
							description="Access your vehicle documents, service history, and warranty information"
							icon={<Home size={20} />}
						/>
					</CardContent>
					<CardFooter className="pt-4 pb-6">
						<Button
							asChild
							variant="secondary"
							size="lg"
							className="w-full group-hover:bg-secondary/90 transition-all"
						>
							<Link
								href="/existing-user"
								className="flex items-center justify-center"
							>
								Access Dashboard
								<ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
							</Link>
						</Button>
					</CardFooter>
				</Card>
			</div>

			<div className="mt-12 text-center text-sm text-muted-foreground">
				<p>© 2025 Gargash Motors. All rights reserved.</p>
			</div>
		</div>
	);
}

function FeatureItem({
	title,
	description,
	icon,
}: {
	title: string;
	description: string;
	icon: React.ReactNode;
}) {
	return (
		<div className="flex items-start space-x-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
			<div className="flex-shrink-0 bg-background border border-muted rounded-full p-3 shadow-sm">
				{icon}
			</div>
			<div>
				<h3 className="font-medium mb-1">{title}</h3>
				<p className="text-sm text-muted-foreground leading-relaxed">
					{description}
				</p>
			</div>
		</div>
	);
}
