"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
	analyzeAccidentImage,
	analyzeAccidentQuery,
	type AnalysisResponse,
} from "@/app/api/garage-recommendation/actions";

export function GarageRecommendationForm() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [textDescription, setTextDescription] = useState("");

	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		if (!file.type.includes("image")) {
			toast.error("Please upload an image file");
			return;
		}

		setImageFile(file);
		const reader = new FileReader();
		reader.onload = (event: ProgressEvent<FileReader>) => {
			setImagePreview(event.target?.result as string);
		};
		reader.readAsDataURL(file);
	};

	const handleSubmitImage = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!imageFile) {
			toast.error("Please upload an image");
			return;
		}

		setIsLoading(true);
		try {
			// Create FormData for the server action
			const formData = new FormData();
			formData.append("image", imageFile);

			// Call the server action
			const result = await analyzeAccidentImage(formData);

			if (!result.success) {
				throw new Error(result.error || "Failed to analyze image");
			}

			toast.success("Analysis complete! Showing recommended garages");
			router.push("/existing-user/garage/recommendations?method=image");
		} catch (error) {
			console.error("Error submitting image:", error);
			toast.error(
				error instanceof Error
					? error.message
					: "Failed to analyze image. Please try again",
			);
		} finally {
			setIsLoading(false);
		}
	};

	const handleSubmitText = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!textDescription.trim()) {
			toast.error("Please describe your car issue");
			return;
		}

		setIsLoading(true);
		try {
			// Create FormData for the server action
			const formData = new FormData();
			formData.append("query", textDescription);

			// Call the server action
			const result = await analyzeAccidentQuery(formData);

			if (!result.success) {
				throw new Error(result.error || "Failed to analyze description");
			}

			toast.success("Analysis complete! Showing recommended garages");
			router.push(
				`/existing-user/garage/recommendations?method=text&q=${encodeURIComponent(textDescription)}`,
			);
		} catch (error) {
			console.error("Error submitting description:", error);
			toast.error(
				error instanceof Error
					? error.message
					: "Failed to analyze description. Please try again",
			);
		} finally {
			setIsLoading(false);
		}
	};

	const handleImageUploadKeyDown = (
		e: React.KeyboardEvent<HTMLButtonElement>,
	) => {
		if (e.key === "Enter" || e.key === " ") {
			document.getElementById("image-upload")?.click();
		}
	};

	return (
		<Tabs defaultValue="image" className="w-full max-w-3xl mx-auto">
			<TabsList className="grid w-full grid-cols-2 mb-8">
				<TabsTrigger value="image">Upload Image</TabsTrigger>
				<TabsTrigger value="text">Describe Issue</TabsTrigger>
			</TabsList>

			<TabsContent value="image">
				<Card>
					<CardHeader>
						<CardTitle>Upload an Image</CardTitle>
						<CardDescription>
							Take a photo of your car issue and upload it for analysis
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSubmitImage} className="space-y-6">
							<div className="grid w-full items-center gap-4">
								<div className="flex flex-col space-y-2">
									<button
										type="button"
										className={cn(
											"border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-muted/50 transition-colors",
											imagePreview ? "border-primary" : "border-muted",
										)}
										onClick={() =>
											document.getElementById("image-upload")?.click()
										}
										onKeyDown={handleImageUploadKeyDown}
										aria-label="Upload image"
									>
										{imagePreview ? (
											<div className="relative w-full h-64">
												<Image
													src={imagePreview}
													alt="Car issue preview"
													fill
													className="object-contain rounded-md"
												/>
											</div>
										) : (
											<div className="py-12">
												<p>Click or drag and drop to upload an image</p>
												<p className="text-sm text-muted-foreground mt-1">
													Supported formats: JPG, PNG, WEBP
												</p>
											</div>
										)}
										<Input
											id="image-upload"
											type="file"
											accept="image/*"
											className="hidden"
											onChange={handleImageUpload}
										/>
									</button>
								</div>
							</div>

							<Button
								type="submit"
								disabled={!imageFile || isLoading}
								className="w-full"
							>
								{isLoading ? "Analyzing..." : "Analyze Image"}
							</Button>
						</form>
					</CardContent>
				</Card>
			</TabsContent>

			<TabsContent value="text">
				<Card>
					<CardHeader>
						<CardTitle>Describe Your Issue</CardTitle>
						<CardDescription>
							Describe the issue with your car in your own words
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSubmitText} className="space-y-6">
							<div className="grid w-full items-center gap-4">
								<div className="flex flex-col space-y-2">
									<Textarea
										placeholder="For example: My car is making a strange noise when braking, or there's a rattling sound from the engine..."
										rows={5}
										value={textDescription}
										onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
											setTextDescription(e.target.value)
										}
									/>
								</div>
							</div>

							<Button
								type="submit"
								disabled={!textDescription.trim() || isLoading}
								className="w-full"
							>
								{isLoading ? "Analyzing..." : "Find Recommendations"}
							</Button>
						</form>
					</CardContent>
				</Card>
			</TabsContent>
		</Tabs>
	);
}
