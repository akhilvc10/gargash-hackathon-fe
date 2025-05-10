import type { Metadata } from "next";
import Link from "next/link";
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
	title: "Existing User | Gargash Motors",
	description:
		"Access maintenance tools and garage assistance for your vehicle",
};

export default function ExistingUserPage() {
	return (
		<div className="container max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
			<div className="mb-12">
				<Button asChild variant="outline" size="sm" className="mb-6">
					<Link href="/userflow" className="flex items-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="mr-2"
							aria-hidden="true"
						>
							<path d="m15 18-6-6 6-6" />
						</svg>
						Back to options
					</Link>
				</Button>

				<h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
					Welcome Back
				</h1>
				<p className="mt-4 text-xl text-gray-500">
					Manage and maintain your Gargash vehicle
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl">
				{/* Smart Maintenance Card */}
				<Card className="border-2 hover:border-secondary hover:shadow-lg transition-all duration-300 h-full">
					<CardHeader className="text-center">
						<div className="mx-auto mb-4 bg-secondary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center">
							<span className="text-3xl">🔧</span>
						</div>
						<CardTitle className="text-2xl">Smart Maintenance</CardTitle>
						<CardDescription>
							Keep your vehicle in top condition with our smart maintenance
							tools
						</CardDescription>
					</CardHeader>
					<CardContent className="text-center pb-6">
						<p className="mb-6 text-muted-foreground">
							Schedule service appointments, get maintenance reminders, and
							monitor your vehicle's health.
						</p>
						<Button asChild variant="secondary" className="w-full max-w-xs">
							<Link href="/existing-user/my-cars">Manage Cars</Link>
						</Button>
					</CardContent>
				</Card>

				{/* Smart Garage Assistance Card */}
				<Card className="border-2 hover:border-secondary hover:shadow-lg transition-all duration-300 h-full">
					<CardHeader className="text-center">
						<div className="mx-auto mb-4 bg-secondary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center">
							<span className="text-3xl">🏠</span>
						</div>
						<CardTitle className="text-2xl">Smart Garage Assistance</CardTitle>
						<CardDescription>
							Access your vehicle documents and service history
						</CardDescription>
					</CardHeader>
					<CardContent className="text-center pb-6">
						<p className="mb-6 text-muted-foreground">
							View your vehicle documents, warranty information, and complete
							service history in one place.
						</p>
						<Button asChild variant="secondary" className="w-full max-w-xs">
							<Link href="/existing-user/garage">Access Garage</Link>
						</Button>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
