import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import LoadingIndicator from "@/components/loading-indicator";
import { ArrowLeft, Settings, ShieldAlert } from "lucide-react";

export const metadata: Metadata = {
	title: "Existing User | Gargash Motors",
	description:
		"Access maintenance tools and garage assistance for your vehicle",
};

export default function ExistingUserPage() {
	return (
		<div className="min-h-screen bg-gradient-to-b from-background to-secondary/5">
			<div className="container max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
				<div className="flex flex-col items-start space-y-6 mb-12">
					<Button
						asChild
						variant="ghost"
						size="sm"
						className="group transition-all hover:translate-x-[-2px]"
					>
						<Link href="/userflow" className="flex items-center gap-2">
							<ArrowLeft size={16} className="group-hover:animate-pulse" />
							Back to options
						</Link>
					</Button>

					<div className="space-y-4">
						<h1 className="text-3xl font-bold tracking-tight md:text-4xl">
							Welcome Back
						</h1>
						<p className="text-lg text-muted-foreground max-w-2xl">
							Manage and maintain your Gargash vehicle with our smart,
							AI-powered tools
						</p>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
					{/* Smart Maintenance Card */}
					<Card className="group relative overflow-hidden border border-muted bg-background/60 backdrop-blur-sm hover:shadow-md transition-all duration-300">
						<div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
						<CardHeader>
							<div className="mb-5 flex items-center gap-4">
								<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
									<Settings className="h-6 w-6" />
								</div>
								<div>
									<CardTitle className="text-xl">Smart Maintenance</CardTitle>
									<CardDescription className="text-sm mt-1">
										AI-powered vehicle maintenance system
									</CardDescription>
								</div>
							</div>
						</CardHeader>
						<CardContent className="pb-8">
							<p className="mb-8 text-muted-foreground text-sm leading-relaxed">
								Access real-time diagnostics, service reminders, and
								personalized maintenance schedules tailored to your driving
								habits and vehicle model.
							</p>
							<div className="flex justify-start">
								<Button
									asChild
									variant="default"
									className="relative overflow-hidden group-hover:bg-primary transition-colors"
								>
									<Link
										href="/existing-user/my-cars"
										className="flex items-center gap-2"
									>
										View my cars
										<LoadingIndicator
											variant="default"
											className="ml-1 size-3"
										/>
									</Link>
								</Button>
							</div>
						</CardContent>
					</Card>

					{/* AI Damage Assessment Card */}
					<Card className="group relative overflow-hidden border border-muted bg-background/60 backdrop-blur-sm hover:shadow-md transition-all duration-300">
						<div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
						<CardHeader>
							<div className="mb-5 flex items-center gap-4">
								<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
									<ShieldAlert className="h-6 w-6" />
								</div>
								<div>
									<CardTitle className="text-xl">
										AI Damage Assessment
									</CardTitle>
									<CardDescription className="text-sm mt-1">
										Intelligent diagnostics for your vehicle
									</CardDescription>
								</div>
							</div>
						</CardHeader>
						<CardContent className="pb-8">
							<p className="mb-8 text-muted-foreground text-sm leading-relaxed">
								Upload photos of vehicle damage and receive instant AI analysis,
								repair estimates, and connections to certified repair facilities
								near you.
							</p>
							<div className="flex justify-start">
								<Button
									asChild
									variant="default"
									className="relative overflow-hidden group-hover:bg-primary transition-colors"
								>
									<Link
										href="/existing-user/garage"
										className="flex items-center gap-2"
									>
										Analyze Damage
										<LoadingIndicator
											variant="default"
											className="ml-1 size-3"
										/>
									</Link>
								</Button>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
