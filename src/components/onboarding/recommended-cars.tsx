"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
	Fuel,
	CarFront,
	Armchair,
	ArrowRight,
	Star,
	MessageSquare,
	Send,
	Bot,
} from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
	CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
	DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { CarChatDialog } from "./car-chat-dialog";

interface RecommendedCar {
	id: string;
	name: string;
	image: string;
	price: string;
	engineType: string;
	bodyStyle: string;
	features: string[];
	seats: number;
	matchScore: number;
}

interface RecommendedCarsProps {
	cars: RecommendedCar[];
}

// Chat message interface
interface ChatMessage {
	id: string;
	content: string;
	isBot: boolean;
	timestamp: Date;
}

export function RecommendedCars({ cars }: RecommendedCarsProps) {
	const router = useRouter();
	const [selectedCar, setSelectedCar] = useState<RecommendedCar | null>(null);
	const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
	const [messageInput, setMessageInput] = useState("");

	// Function to open the chat with initial bot message
	const handleOpenChat = (car: RecommendedCar) => {
		setSelectedCar(car);
		// Reset chat messages and add initial greeting
		setChatMessages([
			{
				id: "1",
				content: `Hello! I'm your AI assistant for the ${car.name}. What would you like to know about this vehicle?`,
				isBot: true,
				timestamp: new Date(),
			},
			{
				id: "2",
				content: `Here are some basic details:\n• Price: ${car.price}\n• Engine: ${car.engineType}\n• Body Style: ${car.bodyStyle}\n• Seats: ${car.seats}\n\nFeel free to ask me anything specific!`,
				isBot: true,
				timestamp: new Date(),
			},
		]);
	};

	// Function to handle sending a message
	const handleSendMessage = () => {
		if (!messageInput.trim() || !selectedCar) return;

		// Add user message
		const userMessage: ChatMessage = {
			id: Date.now().toString(),
			content: messageInput,
			isBot: false,
			timestamp: new Date(),
		};

		setChatMessages((prev) => [...prev, userMessage]);
		setMessageInput("");

		// Simulate AI response
		setTimeout(() => {
			const botResponse = generateBotResponse(messageInput, selectedCar);
			const botMessage: ChatMessage = {
				id: (Date.now() + 1).toString(),
				content: botResponse,
				isBot: true,
				timestamp: new Date(),
			};
			setChatMessages((prev) => [...prev, botMessage]);
		}, 500);
	};

	// Generate a bot response based on the message
	const generateBotResponse = (
		message: string,
		car: RecommendedCar,
	): string => {
		const messageLC = message.toLowerCase();

		if (
			messageLC.includes("price") ||
			messageLC.includes("cost") ||
			messageLC.includes("how much")
		) {
			return `The ${car.name} is priced at ${car.price}. Would you like to know about our financing options?`;
		}

		if (
			messageLC.includes("engine") ||
			messageLC.includes("power") ||
			messageLC.includes("fuel")
		) {
			return `The ${car.name} features a ${car.engineType} engine, designed for optimal performance and efficiency.`;
		}

		if (
			messageLC.includes("features") ||
			messageLC.includes("what does it have")
		) {
			return `The ${car.name} comes with ${car.features.join(", ")} ${car.features.length > 3 ? "and more!" : ""}`;
		}

		if (
			messageLC.includes("body") ||
			messageLC.includes("style") ||
			messageLC.includes("type")
		) {
			return `This is a ${car.bodyStyle} vehicle, offering a balance of style and practicality.`;
		}

		if (
			messageLC.includes("seats") ||
			messageLC.includes("seating") ||
			messageLC.includes("passengers")
		) {
			return `The ${car.name} comfortably seats ${car.seats} passengers.`;
		}

		if (messageLC.includes("test drive") || messageLC.includes("try")) {
			return "You can schedule a test drive by visiting our dealership or booking online. Would you like me to help you schedule one?";
		}

		if (messageLC.includes("thank")) {
			return "You're welcome! Is there anything else you'd like to know about this vehicle?";
		}

		return `I'd be happy to tell you more about the ${car.name}. You can ask about its features, pricing, engine specifications, or anything else you'd like to know.`;
	};

	// Handle enter key press
	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			handleSendMessage();
		}
	};

	if (!cars.length) {
		return (
			<div className="flex flex-col items-center justify-center min-h-[400px] p-8 rounded-lg border border-dashed">
				<div className="flex flex-col items-center text-center max-w-md space-y-4">
					<div className="rounded-full bg-muted p-4">
						<CarFront className="h-8 w-8 text-muted-foreground" />
					</div>
					<h3 className="text-xl font-semibold">No matches found</h3>
					<p className="text-muted-foreground">
						We couldn't find any vehicles that match your preferences. Try
						adjusting your criteria.
					</p>
					<Button onClick={() => router.push("/")} className="mt-2">
						Go to Homepage
					</Button>
				</div>
			</div>
		);
	}

	return (
		<section className="w-full py-12 px-4">
			<div className="container max-w-6xl mx-auto space-y-8">
				<div className="space-y-3 text-center">
					<h2 className="text-3xl font-bold tracking-tight">
						Your Perfect Match
					</h2>
					<p className="text-muted-foreground max-w-2xl mx-auto">
						Based on your preferences, we've selected these vehicles tailored
						specifically for you.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{cars.map((car) => (
						<Card
							key={car.id}
							className="group overflow-hidden transition-all duration-300 hover:shadow-lg border hover:border-primary/20"
						>
							<div className="relative aspect-[4/3] overflow-hidden bg-muted">
								{car.image.startsWith("/") ? (
									<div className="w-full h-full flex items-center justify-center bg-muted">
										<CarFront className="h-16 w-16 text-muted-foreground/50" />
									</div>
								) : (
									<div className="relative h-full w-full">
										<Image
											src={car.image}
											alt={car.name}
											fill
											sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
											className="object-cover transition-transform duration-500 group-hover:scale-105"
											priority
										/>
									</div>
								)}
								<Badge
									variant="secondary"
									className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm font-medium px-2.5 py-1"
								>
									<Star className="h-3.5 w-3.5 mr-1 fill-primary text-primary" />
									<span>{car.matchScore}% Match</span>
								</Badge>
							</div>

							<CardHeader className="pb-2">
								<div className="flex justify-between items-start">
									<div>
										<CardTitle className="text-xl tracking-tight">
											{car.name}
										</CardTitle>
										<CardDescription className="text-lg font-medium text-primary">
											{car.price}
										</CardDescription>
									</div>
								</div>
							</CardHeader>

							<CardContent className="space-y-4">
								<div className="grid grid-cols-3 gap-3">
									<div className="flex flex-col items-center p-2 rounded-lg bg-muted/50">
										<Fuel className="h-4 w-4 mb-1 text-muted-foreground" />
										<span className="text-xs text-center">
											{car.engineType}
										</span>
									</div>
									<div className="flex flex-col items-center p-2 rounded-lg bg-muted/50">
										<CarFront className="h-4 w-4 mb-1 text-muted-foreground" />
										<span className="text-xs text-center">{car.bodyStyle}</span>
									</div>
									<div className="flex flex-col items-center p-2 rounded-lg bg-muted/50">
										<Armchair className="h-4 w-4 mb-1 text-muted-foreground" />
										<span className="text-xs text-center">
											{car.seats} Seats
										</span>
									</div>
								</div>

								<Separator />

								<div>
									<span className="text-xs text-muted-foreground mb-2 block">
										Key Features
									</span>
									<div className="flex flex-wrap gap-1.5">
										{car.features.slice(0, 3).map((feature) => (
											<Badge
												key={feature}
												variant="outline"
												className="font-normal"
											>
												{feature}
											</Badge>
										))}
										{car.features.length > 3 && (
											<Badge
												variant="outline"
												className="bg-muted/50 hover:bg-muted font-normal"
											>
												+{car.features.length - 3} more
											</Badge>
										)}
									</div>
								</div>
							</CardContent>

							<CardFooter className="flex gap-2">
								<Button
									className="flex-1 group-hover:bg-primary/90 transition-colors"
									onClick={() => router.push(`/cars/${car.id}`)}
								>
									View Details
									<ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
								</Button>

								<Dialog onOpenChange={(open) => open && setSelectedCar(car)}>
									<DialogTrigger asChild>
										<Button
											variant="outline"
											size="icon"
											className="bg-muted/30 hover:bg-muted"
										>
											<MessageSquare className="h-4 w-4 text-primary" />
											<span className="sr-only">
												Chat with AI about {car.name}
											</span>
										</Button>
									</DialogTrigger>
									<CarChatDialog car={selectedCar} />
								</Dialog>
							</CardFooter>
						</Card>
					))}
				</div>

				<div className="flex flex-col items-center mt-12 space-y-4">
					<Button
						onClick={() => router.push("/")}
						variant="outline"
						size="lg"
						className="font-medium"
					>
						Continue to Homepage
					</Button>
					<p className="text-xs text-muted-foreground">
						You can always return to these recommendations from your profile
					</p>
				</div>
			</div>
		</section>
	);
}
