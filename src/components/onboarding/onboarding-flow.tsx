"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Cookies from "js-cookie";
import {
	ChevronLeft,
	ChevronRight,
	Check,
	Fuel,
	CarFront,
	Cog,
	Armchair,
	Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
	CardFooter,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { RecommendedCars } from "@/components/onboarding/recommended-cars";
import type { CustomerInput } from "@/types/api";
import { getCarRecommendations } from "@/app/api/car-recommendation/actions";

const ENGINE_TYPES = ["Petrol", "Diesel", "Hybrid"] as const;
const BODY_STYLES = ["SUV", "Sedan", "Hatchback", "MPV"] as const;
const FEATURES_POOL = [
	"leather seats",
	"navigation",
	"bluetooth",
	"cruise control",
	"touch screen",
	"turbo",
	"sport mode",
	"sunroof",
	"rear camera",
	"lane assist",
	"blind spot monitor",
	"heated seats",
	"keyless entry",
] as const;
const SEAT_OPTIONS = ["3", "4", "5", "6", "7"] as const;

// Sample recommended cars data
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

const SAMPLE_CARS: RecommendedCar[] = [
	{
		id: "car1",
		name: "Nissan Patrol",
		image: "/cars/nissan-patrol.jpg",
		price: "AED 229,900",
		engineType: "Petrol",
		bodyStyle: "SUV",
		features: [
			"leather seats",
			"navigation",
			"bluetooth",
			"sunroof",
			"rear camera",
		],
		seats: 7,
		matchScore: 95,
	},
	{
		id: "car2",
		name: "Toyota Land Cruiser",
		image: "/cars/toyota-land-cruiser.jpg",
		price: "AED 249,000",
		engineType: "Diesel",
		bodyStyle: "SUV",
		features: [
			"leather seats",
			"navigation",
			"bluetooth",
			"sunroof",
			"lane assist",
		],
		seats: 7,
		matchScore: 92,
	},
	{
		id: "car3",
		name: "BMW 5 Series",
		image: "/cars/bmw-5-series.jpg",
		price: "AED 315,000",
		engineType: "Hybrid",
		bodyStyle: "Sedan",
		features: [
			"leather seats",
			"navigation",
			"bluetooth",
			"heated seats",
			"lane assist",
		],
		seats: 5,
		matchScore: 87,
	},
];

const FormSchema = z.object({
	engineType: z.enum(ENGINE_TYPES, {
		required_error: "Please select an engine type",
	}),
	bodyStyle: z.enum(BODY_STYLES, {
		required_error: "Please select at least one body style",
	}),
	features: z.array(z.enum(FEATURES_POOL)).min(1, {
		message: "Please select at least one feature",
	}),
	seats: z.enum(SEAT_OPTIONS, {
		required_error: "Please select number of seats",
	}),
});

type FormValues = z.infer<typeof FormSchema>;

const STEP_ICONS = {
	1: Fuel,
	2: CarFront,
	3: Cog,
	4: Armchair,
};

const STEP_TITLES = {
	1: "Engine Type",
	2: "Body Style",
	3: "Features",
	4: "Seating",
};

const STEP_DESCRIPTIONS = {
	1: "Select your preferred engine type",
	2: "Choose your ideal body style",
	3: "Select the features you're interested in",
	4: "How many seats do you need?",
};

export function OnboardingFlow() {
	const [step, setStep] = useState(1);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [recommendedCars, setRecommendedCars] = useState<
		RecommendedCar[] | null
	>(null);
	const totalSteps = 4;
	const router = useRouter();
	const { toast } = useToast();
	const StepIcon = STEP_ICONS[step as keyof typeof STEP_ICONS];

	const form = useForm<FormValues>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			features: [],
		},
	});

	function renderStep() {
		switch (step) {
			case 1:
				return (
					<FormField
						control={form.control}
						name="engineType"
						render={({ field }) => (
							<FormItem className="space-y-2">
								<div className="grid gap-3 grid-cols-1 md:grid-cols-3">
									{ENGINE_TYPES.map((type) => {
										const isSelected = field.value === type;
										return (
											<button
												key={type}
												type="button"
												className={cn(
													"relative flex items-center rounded-lg border-2 p-3 transition-all cursor-pointer w-full",
													isSelected
														? "border-primary bg-primary/5"
														: "hover:border-muted-foreground",
												)}
												onClick={() => field.onChange(type)}
												onKeyDown={(e) => {
													if (e.key === "Enter" || e.key === " ") {
														field.onChange(type);
													}
												}}
												aria-checked={isSelected}
											>
												<div className="flex items-center gap-3">
													<div className="rounded-full bg-primary/10 p-2 shrink-0">
														<Fuel className="h-4 w-4 text-primary" />
													</div>
													<FormLabel className="cursor-pointer font-medium m-0">
														{type}
													</FormLabel>
												</div>
												{isSelected && (
													<div className="absolute right-3">
														<Check className="h-4 w-4 text-primary" />
													</div>
												)}
												<input
													type="radio"
													className="sr-only"
													{...field}
													value={type}
													checked={isSelected}
													onChange={() => field.onChange(type)}
												/>
											</button>
										);
									})}
								</div>
								<FormMessage />
							</FormItem>
						)}
					/>
				);
			case 2:
				return (
					<FormField
						control={form.control}
						name="bodyStyle"
						render={({ field }) => (
							<FormItem className="space-y-2">
								<div className="grid gap-3 grid-cols-2 sm:grid-cols-4">
									{BODY_STYLES.map((style) => {
										const isSelected = field.value === style;
										return (
											<button
												key={style}
												type="button"
												className={cn(
													"relative flex flex-col items-center rounded-lg border-2 py-3 px-2 transition-all cursor-pointer w-full",
													isSelected
														? "border-primary bg-primary/5"
														: "hover:border-muted-foreground",
												)}
												onClick={() => field.onChange(style)}
												onKeyDown={(e) => {
													if (e.key === "Enter" || e.key === " ") {
														field.onChange(style);
													}
												}}
												aria-checked={isSelected}
											>
												{isSelected && (
													<div className="absolute top-1 right-1">
														<Check className="h-3 w-3 text-primary" />
													</div>
												)}
												<div className="mb-1 rounded-full bg-primary/10 p-2">
													<CarFront className="h-4 w-4 text-primary" />
												</div>
												<FormLabel className="cursor-pointer font-medium text-sm m-0">
													{style}
												</FormLabel>
												<input
													type="radio"
													className="sr-only"
													{...field}
													value={style}
													checked={isSelected}
													onChange={() => field.onChange(style)}
												/>
											</button>
										);
									})}
								</div>
								<FormMessage />
							</FormItem>
						)}
					/>
				);
			case 3:
				return (
					<FormField
						control={form.control}
						name="features"
						render={() => (
							<FormItem>
								<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
									{FEATURES_POOL.map((feature) => (
										<FormField
											key={feature}
											control={form.control}
											name="features"
											render={({ field }) => {
												return (
													<FormItem
														key={feature}
														className={cn(
															"flex items-start space-x-2 space-y-0 rounded-md border p-2 transition-all",
															field.value?.includes(feature)
																? "border-primary bg-primary/5"
																: "hover:border-muted-foreground",
														)}
													>
														<FormControl>
															<Checkbox
																checked={field.value?.includes(feature)}
																onCheckedChange={(checked: boolean) => {
																	return checked
																		? field.onChange([...field.value, feature])
																		: field.onChange(
																				field.value?.filter(
																					(value) => value !== feature,
																				),
																			);
																}}
																className="mt-0.5"
															/>
														</FormControl>
														<div>
															<FormLabel className="font-medium cursor-pointer text-sm">
																{feature.charAt(0).toUpperCase() +
																	feature.slice(1)}
															</FormLabel>
														</div>
													</FormItem>
												);
											}}
										/>
									))}
								</div>
								<FormMessage className="mt-2" />
							</FormItem>
						)}
					/>
				);
			case 4:
				return (
					<FormField
						control={form.control}
						name="seats"
						render={({ field }) => (
							<FormItem className="space-y-2">
								<div className="flex flex-wrap gap-2 justify-between">
									{SEAT_OPTIONS.map((seats) => {
										const isSelected = field.value === seats;
										return (
											<button
												key={seats}
												type="button"
												className={cn(
													"relative flex items-center justify-center rounded-lg border-2 w-16 h-16 transition-all cursor-pointer",
													isSelected
														? "border-primary bg-primary/5"
														: "hover:border-muted-foreground",
												)}
												onClick={() => field.onChange(seats)}
												onKeyDown={(e) => {
													if (e.key === "Enter" || e.key === " ") {
														field.onChange(seats);
													}
												}}
												aria-checked={isSelected}
											>
												{isSelected && (
													<div className="absolute top-1 right-1">
														<Check className="h-3 w-3 text-primary" />
													</div>
												)}
												<FormLabel className="cursor-pointer font-medium text-lg m-0">
													{seats}
												</FormLabel>
												<input
													type="radio"
													className="sr-only"
													{...field}
													value={seats}
													checked={isSelected}
													onChange={() => field.onChange(seats)}
												/>
											</button>
										);
									})}
								</div>
								<FormMessage />
							</FormItem>
						)}
					/>
				);
			default:
				return null;
		}
	}

	function onSubmit(data: FormValues) {
		setIsSubmitting(true);

		// Save preferences to cookies
		Cookies.set("userPreferences", JSON.stringify(data), { expires: 365 });

		// Transform form data to API format
		const customerInput: CustomerInput = {
			price: 0, // We don't collect price in the form, defaulting to 0 (no limit)
			engine_type: data.engineType,
			body_style: data.bodyStyle,
			seating: Number.parseInt(data.seats, 10),
			features: data.features,
		};

		// Use server action to get recommendations
		getCarRecommendations(customerInput)
			.then((response) => {
				console.log("Car recommendations response:", response);

				if (!response.success) {
					throw new Error(response.error || "Failed to get recommendations");
				}

				// Store the response in localStorage
				if (typeof window !== "undefined" && response.top_recommendations) {
					localStorage.setItem(
						"carRecommendations",
						JSON.stringify(response.top_recommendations),
					);
				}

				// Show success message
				toast({
					title: "Preferences saved!",
					description: "We've found some perfect matches for you.",
				});

				// Transform API response format to our component format
				if (
					response.top_recommendations &&
					response.top_recommendations.length > 0
				) {
					const matchingCars = response.top_recommendations.map((car) => ({
						id: `car-${Math.random().toString(36).substr(2, 9)}`,
						name: car.car_model,
						image: "/cars/placeholder.jpg", // Use placeholder as API doesn't provide images
						price: `AED ${Math.floor(Math.random() * 500000) + 100000}`, // Sample price as API doesn't provide prices
						engineType: car.specs.Engine.split(",")[0],
						bodyStyle: "SUV", // Default as API doesn't provide body style in specs
						features: Object.values(car.specs).filter(
							(spec): spec is string =>
								typeof spec === "string" &&
								spec.toLowerCase().includes("sunroof"),
						),
						seats: 5, // Default as API doesn't provide seating in specs
						matchScore: Math.floor(car.probability * 100),
					}));

					setRecommendedCars(matchingCars);
				} else {
					// Fallback to sample data if no recommendations
					setRecommendedCars(SAMPLE_CARS);
				}
			})
			.catch((error) => {
				console.error("Error fetching recommendations:", error);
				toast({
					title: "Something went wrong",
					description:
						"Could not fetch recommendations. Using sample data instead.",
					variant: "destructive",
				});
				// Fallback to sample data in case of error
				setRecommendedCars(SAMPLE_CARS);
			})
			.finally(() => {
				setIsSubmitting(false);
			});
	}

	if (recommendedCars) {
		return <RecommendedCars cars={recommendedCars} />;
	}

	return (
		<div className="w-full max-w-3xl mx-auto py-4 px-3">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
					<div className="mb-4">
						<Progress
							value={(step / totalSteps) * 100}
							className="h-2 w-full bg-muted rounded-full"
						/>

						<div className="mt-4 grid grid-cols-4 gap-1 text-xs">
							{Array.from({ length: totalSteps }).map((_, index) => {
								const stepNumber = index + 1;
								const StepIconComponent =
									STEP_ICONS[stepNumber as keyof typeof STEP_ICONS];
								const isCompleted = step > stepNumber;
								const isCurrent = step === stepNumber;

								return (
									<div
										key={`step-${stepNumber}`}
										className={cn(
											"flex flex-col items-center",
											stepNumber <= step ? "" : "opacity-50",
										)}
										aria-current={isCurrent ? "step" : undefined}
									>
										<div
											className={cn(
												"flex items-center justify-center h-8 w-8 rounded-full border transition-all mb-1",
												isCompleted
													? "border-primary bg-primary text-primary-foreground"
													: isCurrent
														? "border-primary bg-primary/10 text-primary"
														: "border-muted bg-muted/20 text-muted-foreground",
											)}
										>
											{isCompleted ? (
												<Check className="h-4 w-4" />
											) : (
												<StepIconComponent className="h-4 w-4" />
											)}
										</div>
										<span
											className={cn(
												"font-medium text-center",
												isCurrent
													? "text-primary"
													: isCompleted
														? "text-foreground"
														: "text-muted-foreground",
											)}
										>
											{STEP_TITLES[stepNumber as keyof typeof STEP_TITLES]}
										</span>
									</div>
								);
							})}
						</div>
					</div>

					<Card className="shadow-sm">
						<CardHeader className="p-4 pb-2 space-y-1">
							<div className="flex items-center gap-2">
								<div className="rounded-full bg-primary/10 p-1.5 shrink-0">
									<StepIcon className="h-4 w-4 text-primary" />
								</div>
								<div>
									<CardTitle className="text-lg">
										{STEP_TITLES[step as keyof typeof STEP_TITLES]}
									</CardTitle>
									<CardDescription className="text-sm">
										{STEP_DESCRIPTIONS[step as keyof typeof STEP_DESCRIPTIONS]}
									</CardDescription>
								</div>
							</div>
						</CardHeader>
						<CardContent className="p-4 pt-3">{renderStep()}</CardContent>
						<CardFooter className="flex justify-between p-4 border-t">
							<Button
								type="button"
								variant="outline"
								onClick={() => setStep((prev) => Math.max(prev - 1, 1))}
								disabled={step === 1}
								className="flex items-center gap-1"
								size="sm"
							>
								<ChevronLeft className="h-4 w-4" />
								<span>Back</span>
							</Button>

							{step < totalSteps ? (
								<Button
									type="button"
									size="sm"
									className="flex items-center gap-1"
									onClick={() => {
										const currentFieldName =
											step === 1
												? "engineType"
												: step === 2
													? "bodyStyle"
													: step === 3
														? "features"
														: "seats";

										form
											.trigger(currentFieldName as keyof FormValues)
											.then((isValid) => {
												if (isValid) {
													setStep((prev) => Math.min(prev + 1, totalSteps));
												}
											});
									}}
								>
									<span>Next</span>
									<ChevronRight className="h-4 w-4" />
								</Button>
							) : (
								<Button
									type="submit"
									size="sm"
									className="flex items-center gap-1 bg-green-600 hover:bg-green-700"
									disabled={isSubmitting}
								>
									{isSubmitting ? (
										<>
											<Loader2 className="h-3 w-3 animate-spin" />
											<span>Processing</span>
										</>
									) : (
										<>
											<span>Complete</span>
											<Check className="h-3 w-3" />
										</>
									)}
								</Button>
							)}
						</CardFooter>
					</Card>
				</form>
			</Form>
		</div>
	);
}
