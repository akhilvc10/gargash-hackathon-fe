"use client";

import { useState } from "react";
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
const SEAT_OPTIONS = [2, 3, 4, 5, 6, 7] as const;

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
	seats: z.enum(SEAT_OPTIONS.map(String) as [string, ...string[]], {
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
							<FormItem className="space-y-4">
								<div className="grid gap-4 grid-cols-1 md:grid-cols-3">
									{ENGINE_TYPES.map((type) => {
										const isSelected = field.value === type;
										return (
											<div
												key={type}
												className={cn(
													"relative flex flex-col items-center rounded-xl border-2 p-6 transition-all cursor-pointer",
													isSelected
														? "border-primary bg-primary/5"
														: "hover:border-muted-foreground",
												)}
												onClick={() => field.onChange(type)}
											>
												<div
													className={cn(
														"absolute top-2 right-2 transition-opacity",
														isSelected ? "opacity-100" : "opacity-0",
													)}
												>
													<Check className="h-5 w-5 text-primary" />
												</div>
												<div className="mb-3 rounded-full bg-primary/10 p-3">
													<Fuel className="h-6 w-6 text-primary" />
												</div>
												<FormLabel className="cursor-pointer font-medium text-lg">
													{type}
												</FormLabel>
												<input
													type="radio"
													className="sr-only"
													{...field}
													value={type}
													checked={isSelected}
													onChange={() => field.onChange(type)}
												/>
											</div>
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
							<FormItem className="space-y-4">
								<div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
									{BODY_STYLES.map((style) => {
										const isSelected = field.value === style;
										return (
											<div
												key={style}
												className={cn(
													"relative flex flex-col items-center rounded-xl border-2 p-6 transition-all cursor-pointer",
													isSelected
														? "border-primary bg-primary/5"
														: "hover:border-muted-foreground",
												)}
												onClick={() => field.onChange(style)}
											>
												<div
													className={cn(
														"absolute top-2 right-2 transition-opacity",
														isSelected ? "opacity-100" : "opacity-0",
													)}
												>
													<Check className="h-5 w-5 text-primary" />
												</div>
												<div className="mb-3 rounded-full bg-primary/10 p-3">
													<CarFront className="h-6 w-6 text-primary" />
												</div>
												<FormLabel className="cursor-pointer font-medium text-lg">
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
											</div>
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
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
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
															"flex flex-row items-start space-x-3 space-y-0 rounded-lg border-2 p-4 transition-all",
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
																className="mt-1"
															/>
														</FormControl>
														<div className="space-y-1">
															<FormLabel className="font-medium cursor-pointer">
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
								<FormMessage className="mt-3" />
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
							<FormItem className="space-y-4">
								<div className="grid gap-4 grid-cols-3 sm:grid-cols-6">
									{SEAT_OPTIONS.map((seats) => {
										const seatValue = String(seats);
										const isSelected = field.value === seatValue;
										return (
											<div
												key={seats}
												className={cn(
													"relative flex flex-col items-center rounded-xl border-2 p-6 transition-all cursor-pointer",
													isSelected
														? "border-primary bg-primary/5"
														: "hover:border-muted-foreground",
												)}
												onClick={() => field.onChange(seatValue)}
											>
												<div
													className={cn(
														"absolute top-2 right-2 transition-opacity",
														isSelected ? "opacity-100" : "opacity-0",
													)}
												>
													<Check className="h-5 w-5 text-primary" />
												</div>
												<FormLabel className="cursor-pointer font-medium text-lg">
													{seats}
												</FormLabel>
												<input
													type="radio"
													className="sr-only"
													{...field}
													value={seatValue}
													checked={isSelected}
													onChange={() => field.onChange(seatValue)}
												/>
											</div>
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
		// Save preferences to cookies
		Cookies.set("userPreferences", JSON.stringify(data), { expires: 365 });

		// Show success message
		toast({
			title: "Preferences saved!",
			description: "Your preferences have been saved successfully.",
		});

		// Redirect to home page
		router.push("/");
	}

	return (
		<div className="w-full max-w-4xl mx-auto py-8 px-4">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<div className="relative">
						<div className="mb-10">
							<div className="relative mb-6">
								<Progress
									value={(step / totalSteps) * 100}
									className="h-3 w-full bg-muted rounded-full"
								/>
								<div
									className="absolute top-0 left-0 h-3 bg-gradient-to-r from-primary/80 to-primary rounded-full transition-all duration-300 ease-in-out"
									style={{ width: `${(step / totalSteps) * 100}%` }}
									aria-hidden="true"
								/>
							</div>

							<div className="mt-8 flex items-center justify-between max-w-xl mx-auto">
								{Array.from({ length: totalSteps }).map((_, index) => {
									const stepNumber = index + 1;
									const StepIconComponent =
										STEP_ICONS[stepNumber as keyof typeof STEP_ICONS];
									const isCompleted = step > stepNumber;
									const isCurrent = step === stepNumber;

									return (
										<button
											key={`step-${stepNumber}`}
											type="button"
											onClick={() => {
												// Only allow going back or to completed steps
												if (stepNumber <= step) {
													setStep(stepNumber);
												}
											}}
											className={cn(
												"flex flex-col items-center gap-2 transition-all",
												stepNumber <= step
													? "cursor-pointer"
													: "cursor-not-allowed opacity-50",
											)}
											disabled={stepNumber > step}
											aria-current={isCurrent ? "step" : undefined}
											aria-label={`${STEP_TITLES[stepNumber as keyof typeof STEP_TITLES]} ${
												isCompleted
													? "(completed)"
													: isCurrent
														? "(current step)"
														: "(upcoming step)"
											}`}
										>
											<div
												className={cn(
													"flex items-center justify-center h-14 w-14 rounded-full border-2 transition-all duration-300",
													isCompleted
														? "border-primary bg-primary text-primary-foreground scale-100"
														: isCurrent
															? "border-primary bg-primary/10 text-primary scale-110 shadow-md"
															: "border-muted bg-muted/20 text-muted-foreground scale-90",
												)}
											>
												{isCompleted ? (
													<Check className="h-7 w-7" />
												) : (
													<StepIconComponent className="h-7 w-7" />
												)}
											</div>
											<div className="flex flex-col items-center">
												<span
													className={cn(
														"text-xs font-bold uppercase tracking-wider",
														isCurrent
															? "text-primary"
															: isCompleted
																? "text-foreground"
																: "text-muted-foreground",
													)}
												>
													Step {stepNumber}
												</span>
												<span
													className={cn(
														"text-sm font-medium text-center hidden sm:block",
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
										</button>
									);
								})}
							</div>
						</div>
					</div>

					<Card className="border-2 shadow-lg">
						<CardHeader className="pb-2">
							<div className="flex items-center gap-3">
								<div className="rounded-full bg-primary/10 p-2">
									<StepIcon className="h-6 w-6 text-primary" />
								</div>
								<div>
									<CardTitle className="text-2xl font-bold">
										{STEP_TITLES[step as keyof typeof STEP_TITLES]}
									</CardTitle>
									<CardDescription className="text-base">
										{STEP_DESCRIPTIONS[step as keyof typeof STEP_DESCRIPTIONS]}
									</CardDescription>
								</div>
							</div>
						</CardHeader>
						<CardContent className="pt-6">{renderStep()}</CardContent>
						<CardFooter className="flex justify-between pt-6 border-t">
							<Button
								type="button"
								variant="outline"
								onClick={() => setStep((prev) => Math.max(prev - 1, 1))}
								disabled={step === 1}
								className="flex items-center gap-2"
								size="lg"
							>
								<ChevronLeft className="h-4 w-4" />
								<span>Previous</span>
							</Button>

							{step < totalSteps ? (
								<Button
									type="button"
									size="lg"
									className="flex items-center gap-2"
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
									size="lg"
									className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
								>
									<span>Complete</span>
									<Check className="h-4 w-4 ml-1" />
								</Button>
							)}
						</CardFooter>
					</Card>
				</form>
			</Form>
		</div>
	);
}
