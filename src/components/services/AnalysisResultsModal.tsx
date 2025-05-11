"use client";

import type { AnalysisResponse } from "@/app/api/garage-recommendation/actions";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
	AlertTriangle,
	Car,
	Clock,
	MapPin,
	Phone,
	Star,
	PenToolIcon as Tool,
	Wrench,
	ThumbsUp,
	Award,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AnalysisResultsModalProps {
	isOpen: boolean;
	onOpenChange: (isOpen: boolean) => void;
	analysisResult: AnalysisResponse | null;
}

export function AnalysisResultsModal({
	isOpen,
	onOpenChange,
	analysisResult,
}: AnalysisResultsModalProps) {
	if (!analysisResult) {
		return null;
	}

	const getSeverityColor = (severity: string | undefined) => {
		if (!severity) return "bg-gray-100";

		const severityLower = severity.toLowerCase();
		if (severityLower.includes("minor") || severityLower.includes("low")) {
			return "bg-green-100 text-green-800";
		} else if (
			severityLower.includes("moderate") ||
			severityLower.includes("medium")
		) {
			return "bg-yellow-100 text-yellow-800";
		} else if (
			severityLower.includes("major") ||
			severityLower.includes("high") ||
			severityLower.includes("severe")
		) {
			return "bg-red-100 text-red-800";
		}
		return "bg-gray-100";
	};

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[700px] p-0 overflow-hidden rounded-lg">
				<DialogHeader className="px-6 pt-6 pb-4 bg-gradient-to-r from-slate-50 to-slate-100">
					<div className="flex items-center gap-2">
						<Car className="h-5 w-5 text-slate-600" />
						<DialogTitle className="text-xl">Analysis Results</DialogTitle>
					</div>
					<DialogDescription className="mt-1.5">
						Based on your vehicle damage assessment, we've identified the
						following details and recommended garages.
					</DialogDescription>
				</DialogHeader>

				<div className="max-h-[65vh] overflow-y-auto">
					{/* Damage Assessment Section */}
					{(analysisResult.accident_type ||
						analysisResult.damage ||
						analysisResult.severity) && (
						<div className="px-6 py-5 bg-white">
							<h3 className="text-base font-medium flex items-center gap-2 mb-4">
								<AlertTriangle className="h-4 w-4 text-slate-600" />
								<span>Damage Assessment</span>
							</h3>

							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
								{analysisResult.accident_type && (
									<div className="bg-slate-50 rounded-lg p-4">
										<p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1.5">
											Incident Type
										</p>
										<p className="text-sm font-medium">
											{analysisResult.accident_type}
										</p>
									</div>
								)}

								{analysisResult.damage && (
									<div className="bg-slate-50 rounded-lg p-4">
										<p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1.5">
											Damage
										</p>
										<p className="text-sm font-medium">
											{analysisResult.damage}
										</p>
									</div>
								)}

								{analysisResult.severity && (
									<div className="bg-slate-50 rounded-lg p-4">
										<p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1.5">
											Severity
										</p>
										<Badge
											variant="outline"
											className={cn(
												"text-sm font-medium px-2.5 py-0.5",
												getSeverityColor(analysisResult.severity),
											)}
										>
											{analysisResult.severity}
										</Badge>
									</div>
								)}
							</div>
						</div>
					)}

					<Separator />

					{/* Recommended Garages Section */}
					{analysisResult.recommended_garages &&
						analysisResult.recommended_garages.length > 0 && (
							<div className="px-6 py-5">
								<h3 className="text-base font-medium flex items-center gap-2 mb-4">
									<Wrench className="h-4 w-4 text-slate-600" />
									<span>Recommended Garages</span>
								</h3>

								<div className="space-y-4">
									{analysisResult.recommended_garages.map((garage, index) => (
										<Card
											key={garage.name}
											className="overflow-hidden border-slate-200 transition-all hover:shadow-md"
										>
											<CardHeader className="py-3 px-4 bg-gradient-to-r from-slate-50 to-white">
												<div className="flex justify-between items-center gap-2">
													<div className="flex-1">
														<CardTitle className="text-base flex items-center gap-1.5">
															{index === 0 && (
																<Award className="h-4 w-4 text-amber-500" />
															)}
															{garage.name}
														</CardTitle>
														<div className="flex items-center gap-3 mt-1">
															<CardDescription className="flex items-center">
																<MapPin className="h-3 w-3 mr-1 text-slate-400" />
																{garage.location}
															</CardDescription>
															{garage.rating && (
																<Badge
																	variant="outline"
																	className="bg-amber-50 text-amber-700 border-amber-200 text-xs"
																>
																	<Star className="h-3 w-3 mr-1 fill-amber-500 text-amber-500" />
																	{garage.rating}
																</Badge>
															)}
														</div>
													</div>
													<Button size="sm" className="shrink-0">
														Enquire
													</Button>
												</div>
											</CardHeader>

											<CardContent className="py-3 px-4">
												<div className="flex items-start gap-2 text-sm text-slate-600">
													<ThumbsUp className="h-4 w-4 text-slate-400 mt-0.5 shrink-0" />
													<p>{garage.justification}</p>
												</div>

												{garage.specialties && (
													<div className="mt-2 flex flex-wrap gap-1">
														{garage.specialties
															.split(",")
															.map((specialty, i) => (
																<Badge
																	key={i}
																	variant="secondary"
																	className="text-xs"
																>
																	{specialty.trim()}
																</Badge>
															))}
													</div>
												)}
											</CardContent>

											{(garage.phone || garage.hours) && (
												<CardFooter className="flex justify-between items-center gap-2 bg-slate-50 py-2 px-4 text-xs text-slate-500">
													{garage.phone && (
														<div className="flex items-center">
															<Phone className="h-3 w-3 mr-1" />
															{garage.phone}
														</div>
													)}
													{garage.hours && (
														<div className="flex items-center ml-auto">
															<Clock className="h-3 w-3 mr-1" />
															{garage.hours}
														</div>
													)}
												</CardFooter>
											)}
										</Card>
									))}
								</div>
							</div>
						)}
				</div>

				<DialogFooter className="px-6 py-4 bg-slate-50">
					<Button
						onClick={() => onOpenChange(false)}
						className="w-full sm:w-auto"
					>
						Close
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
