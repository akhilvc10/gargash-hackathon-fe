"use client";

import { useState, useEffect, useRef } from "react";
import { Bot, Send, Car, ChevronRight, MessageCircle, X } from "lucide-react";
import {
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogClose,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { fetchCarInfo } from "@/lib/api";
import { toast } from "@/components/ui/use-toast";

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

interface ChatMessage {
	id: string;
	content: string;
	isBot: boolean;
	timestamp: Date;
	isBulletList?: boolean;
}

interface QuickReply {
	id: string;
	text: string;
}

interface CarApiResponse {
	user_answer: string;
	offer_types?: {
		leasing?: {
			description: string;
		};
		buying?: {
			description: string;
		};
	};
}

interface CarChatDialogProps {
	car: RecommendedCar | null;
}

// Helper function to format message with bold text
const formatMessageWithBold = (text: string) => {
	return text.split(/(\*\*.*?\*\*)/g).map((part, index) => {
		// Create a more unique key using text content and index
		const key = `${part.substring(0, 10)}-${index}`;

		if (part.startsWith("**") && part.endsWith("**")) {
			// Extract text between ** and return as bold
			const boldText = part.slice(2, -2);
			return <strong key={key}>{boldText}</strong>;
		}
		return <span key={key}>{part}</span>;
	});
};

export function CarChatDialog({ car }: CarChatDialogProps) {
	const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
	const [messageInput, setMessageInput] = useState("");
	const [isTyping, setIsTyping] = useState(false);
	const [quickReplies, setQuickReplies] = useState<QuickReply[]>([]);
	const messagesEndRef = useRef<HTMLDivElement>(null);

	// Auto scroll to bottom when messages change
	useEffect(() => {
		scrollToBottom();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Update to scroll when messages or typing state changes
	useEffect(() => {
		scrollToBottom();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [chatMessages.length, isTyping]);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	// Initialize the chat when car changes
	useEffect(() => {
		if (car) {
			initializeChat(car);
		}
	}, [car]);

	// Initialize chat with welcome messages
	const initializeChat = (car: RecommendedCar) => {
		setChatMessages([]);

		// First message with typing effect
		setIsTyping(true);
		setTimeout(() => {
			setChatMessages([
				{
					id: "1",
					content: `Hello! I'm your AI assistant for the ${car.name}. What would you like to know about this vehicle?`,
					isBot: true,
					timestamp: new Date(),
				},
			]);
			setIsTyping(false);
			scrollToBottom();

			// Car details message with bullets
			setTimeout(() => {
				setIsTyping(true);
				setTimeout(() => {
					setChatMessages((prev) => [
						...prev,
						{
							id: "2",
							content: `• Price: ${car.price}\n• Engine: ${car.engineType}\n• Body Style: ${car.bodyStyle}\n• Seats: ${car.seats}`,
							isBot: true,
							timestamp: new Date(),
							isBulletList: true,
						},
					]);
					setIsTyping(false);
					scrollToBottom();

					// Set initial quick replies
					setQuickReplies([
						{ id: "qr1", text: "Tell me about features" },
						{ id: "qr2", text: "How can I test drive?" },
						{ id: "qr3", text: "Financing options" },
					]);
				}, 600);
			}, 800);
		}, 600);
	};

	// Handle sending a message
	const handleSendMessage = async (text = messageInput) => {
		if (!text.trim() || !car) return;

		// Add user message
		const userMessage: ChatMessage = {
			id: Date.now().toString(),
			content: text,
			isBot: false,
			timestamp: new Date(),
		};

		setChatMessages((prev) => [...prev, userMessage]);
		setMessageInput("");
		setQuickReplies([]); // Clear quick replies when user sends a message
		scrollToBottom();

		// Show typing indicator
		setIsTyping(true);

		try {
			// Call the API for a response
			const response = await fetchCarInfo(text, car.name);
			const botResponse = processApiResponse(response);

			const botMessage: ChatMessage = {
				id: (Date.now() + 1).toString(),
				content: botResponse,
				isBot: true,
				timestamp: new Date(),
			};

			setChatMessages((prev) => [...prev, botMessage]);

			// Generate new quick replies based on context
			generateQuickReplies(text, car);
		} catch (error) {
			console.error("Error fetching car info:", error);
			toast.error("Failed to get a response. Please try again.");

			// Fallback to mock response in case of error
			const fallbackResponse = generateFallbackResponse(text, car);
			const botMessage: ChatMessage = {
				id: (Date.now() + 1).toString(),
				content: fallbackResponse,
				isBot: true,
				timestamp: new Date(),
			};

			setChatMessages((prev) => [...prev, botMessage]);
			generateQuickReplies(text, car);
		} finally {
			setIsTyping(false);
			scrollToBottom();
		}
	};

	// Process the API response into a formatted message
	const processApiResponse = (response: CarApiResponse): string => {
		let message = response.user_answer;

		// Add offer information if available
		if (response.offer_types) {
			if (response.offer_types.leasing?.description) {
				message += `\n\n**Leasing Option:**\n${response.offer_types.leasing.description}`;
			}

			if (response.offer_types.buying?.description) {
				message += `\n\n**Buying Option:**\n${response.offer_types.buying.description}`;
			}
		}

		return message;
	};

	// Generate a fallback response in case API fails
	const generateFallbackResponse = (
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

	// Generate quick replies based on context
	const generateQuickReplies = (lastMessage: string, car: RecommendedCar) => {
		const messageLC = lastMessage.toLowerCase();

		// Default quick replies
		const defaultReplies = [
			{ id: "qr1", text: "Tell me about features" },
			{ id: "qr2", text: "How can I test drive?" },
			{ id: "qr3", text: "Financing options" },
		];

		// Context-specific quick replies
		if (messageLC.includes("price") || messageLC.includes("cost")) {
			setQuickReplies([
				{ id: "qr1", text: "Financing options" },
				{ id: "qr2", text: "Any current promotions?" },
				{ id: "qr3", text: "Compare with other models" },
			]);
		} else if (messageLC.includes("engine") || messageLC.includes("power")) {
			setQuickReplies([
				{ id: "qr1", text: "Fuel efficiency?" },
				{ id: "qr2", text: "Performance specs" },
				{ id: "qr3", text: "Maintenance costs" },
			]);
		} else if (messageLC.includes("test drive")) {
			setQuickReplies([
				{ id: "qr1", text: "Schedule for tomorrow" },
				{ id: "qr2", text: "Which location?" },
				{ id: "qr3", text: "Documents needed?" },
			]);
		} else if (
			messageLC.includes("leasing") ||
			messageLC.includes("financing")
		) {
			setQuickReplies([
				{ id: "qr1", text: "Down payment options?" },
				{ id: "qr2", text: "What's included in leasing?" },
				{ id: "qr3", text: "Buying vs leasing" },
			]);
		} else {
			setQuickReplies(defaultReplies);
		}
	};

	// Handle enter key press
	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			handleSendMessage();
		}
	};

	const formatTimestamp = (date: Date) => {
		return date.toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	return (
		<DialogContent className="sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[85vh] h-[85vh] flex flex-col p-0 gap-0 overflow-hidden rounded-xl border">
			<DialogHeader className="py-3 px-4 border-b bg-white sticky top-0 z-10 flex flex-row items-center">
				<div className="flex items-center gap-3 flex-1">
					<div className="h-10 w-10 rounded-full bg-muted/30 flex items-center justify-center">
						<Car className="h-5 w-5 text-muted-foreground" />
					</div>
					<div className="flex-1">
						<DialogTitle className="text-lg font-medium">
							{car?.name || "Car"} Assistant
						</DialogTitle>
						<DialogDescription className="text-xs text-muted-foreground">
							Ask questions and get instant answers about this vehicle
						</DialogDescription>
					</div>
					<Badge variant="outline" className="mr-2 font-normal">
						{car?.bodyStyle || "SUV"}
					</Badge>
					<DialogClose className="w-8 h-8 rounded-full bg-muted/10 flex items-center justify-center hover:bg-muted/20">
						<X className="h-4 w-4" />
						<span className="sr-only">Close</span>
					</DialogClose>
				</div>
			</DialogHeader>

			<ScrollArea className="flex-1 overflow-auto bg-white h-[calc(100%-136px)]">
				<div className="p-4 space-y-4">
					{chatMessages.map((message, index) => (
						<div
							key={message.id}
							className={cn(
								"flex w-full",
								message.isBot ? "justify-start" : "justify-end",
								index === chatMessages.length - 1 ? "mb-6" : "",
							)}
						>
							<div className={cn("max-w-[80%]", message.isBot ? "" : "")}>
								<div
									className={cn(
										"rounded-2xl py-3",
										message.isBot
											? "bg-gray-50 px-4 rounded-tl-none"
											: "bg-black text-white px-4 rounded-tr-none",
									)}
								>
									{message.isBulletList ? (
										<div className="whitespace-pre-line text-sm leading-6">
											{formatMessageWithBold(message.content)}
										</div>
									) : (
										<div className="text-sm whitespace-pre-line">
											{formatMessageWithBold(message.content)}
										</div>
									)}
								</div>
								<div
									className={cn(
										"text-xs text-muted-foreground mt-1 px-1",
										message.isBot ? "text-left" : "text-right",
									)}
								>
									{formatTimestamp(message.timestamp)}
								</div>
							</div>
							{!message.isBot && (
								<div className="ml-2 mt-2 border rounded-full bg-muted/10 px-2 py-0.5">
									<span className="text-xs font-normal">you</span>
								</div>
							)}
						</div>
					))}

					{/* Typing indicator */}
					{isTyping && (
						<div className="flex justify-start">
							<div className="max-w-[80%]">
								<div className="bg-gray-50 px-4 py-3 rounded-2xl rounded-tl-none">
									<div className="flex items-center gap-1">
										<div
											className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
											style={{ animationDelay: "0ms" }}
										/>
										<div
											className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
											style={{ animationDelay: "300ms" }}
										/>
										<div
											className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
											style={{ animationDelay: "600ms" }}
										/>
									</div>
								</div>
							</div>
						</div>
					)}

					{/* Reference for auto-scrolling */}
					<div ref={messagesEndRef} />
				</div>
			</ScrollArea>

			{/* Quick replies */}
			{quickReplies.length > 0 && !isTyping && (
				<div className="px-4 py-3 flex flex-wrap gap-2 border-t">
					{quickReplies.map((reply) => (
						<Button
							key={reply.id}
							variant="outline"
							size="sm"
							className="rounded-full text-sm bg-white border-zinc-200 hover:bg-zinc-50 font-normal"
							onClick={() => handleSendMessage(reply.text)}
						>
							{reply.text}
							<ChevronRight className="h-3.5 w-3.5 ml-1 text-muted-foreground" />
						</Button>
					))}
				</div>
			)}

			<div className="p-4 border-t sticky bottom-0 z-10 bg-white">
				<div className="relative">
					<Input
						placeholder="Type your question about this car..."
						value={messageInput}
						onChange={(e) => setMessageInput(e.target.value)}
						onKeyDown={handleKeyPress}
						className="pr-12 bg-gray-100 h-12 pl-4 rounded-full border-0 focus-visible:ring-0 placeholder:text-gray-500"
					/>
					<Button
						type="submit"
						onClick={() => handleSendMessage()}
						disabled={!messageInput.trim() || isTyping}
						className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black hover:bg-black/90"
					>
						<Send className="h-5 w-5" />
						<span className="sr-only">Send message</span>
					</Button>
				</div>
			</div>
		</DialogContent>
	);
}
