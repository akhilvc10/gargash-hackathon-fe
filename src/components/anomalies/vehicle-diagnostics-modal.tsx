"use client";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import mockSensorData from "@/data/mockSensorData.json";
import { LineChart } from "@/components/ui/chart";

// Define types for mockSensorData
interface AnomalyDay {
	date: string;
	anomalies: number;
}

interface SensorCategory {
	[categoryName: string]: AnomalyDay[];
}

interface SensorGroup {
	[groupName: string]: SensorCategory[];
}

interface MonthlySummary {
	sensor_group: string;
	total_anomalies: number;
}

interface VehicleDiagnosticsModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	selectedGroup: string | null;
}

export function VehicleDiagnosticsModal({
	open,
	onOpenChange,
	selectedGroup,
}: VehicleDiagnosticsModalProps) {
	// Find sensor data for the selected group
	const sensorGroupData = selectedGroup
		? (mockSensorData.daily_trend.find(
				(group) => Object.keys(group)[0] === selectedGroup,
			) as SensorGroup | undefined)
		: null;

	// Get monthly summary data for the selected group
	const monthlySummary = selectedGroup
		? (mockSensorData.monthly_summary.find(
				(item) => item.sensor_group === selectedGroup,
			) as MonthlySummary | undefined)
		: null;

	// Get the actual sensor categories from the selected group
	const sensorCategories =
		sensorGroupData && selectedGroup
			? (sensorGroupData[
					selectedGroup as keyof typeof sensorGroupData
				] as SensorCategory[])
			: [];

	// Prepare data for the trend chart
	const prepareTrendChartData = () => {
		if (!sensorCategories.length) return [];

		const chartData: {
			date: string;
			[key: string]: string | number;
		}[] = [];

		// Get a list of all dates from the first category (assuming all categories have the same dates)
		const firstCategory = sensorCategories[0];
		const firstCategoryName = Object.keys(firstCategory)[0];
		const dates = firstCategory[firstCategoryName].map((day) => day.date);

		// Create a data point for each date
		for (const [index, date] of dates.entries()) {
			const dataPoint: {
				date: string;
				[key: string]: string | number;
			} = { date };

			// Add anomaly count for each category
			for (const category of sensorCategories) {
				const categoryName = Object.keys(category)[0];
				dataPoint[categoryName] = category[categoryName][index]?.anomalies || 0;
			}

			chartData.push(dataPoint);
		}

		// Return only last 14 days of data
		return chartData.slice(-14);
	};

	// Get all category names for the chart
	const categoryNames = sensorCategories.map(
		(category) => Object.keys(category)[0],
	);

	// Prepare chart data
	const trendChartData = prepareTrendChartData();

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<div className="flex items-center justify-between">
						<DialogTitle className="text-2xl font-bold">
							{selectedGroup}
						</DialogTitle>
						<Button
							variant="ghost"
							size="icon"
							onClick={() => onOpenChange(false)}
						>
							<X className="h-4 w-4" />
						</Button>
					</div>
					<DialogDescription>
						{sensorCategories.length} categories monitored over 30 days
					</DialogDescription>

					{monthlySummary && (
						<Badge
							variant="outline"
							className="text-base py-1.5 px-3 bg-red-50 text-red-700 mt-2"
						>
							<AlertCircle className="h-4 w-4 mr-2" />
							{monthlySummary.total_anomalies} Total Anomalies
						</Badge>
					)}
				</DialogHeader>

				{/* Trend Chart Section */}
				{trendChartData.length > 0 && (
					<div className="mt-6 border rounded-lg p-4">
						<h3 className="text-lg font-medium mb-4">
							Anomaly Trend (Last 14 Days)
						</h3>
						<div className="h-64">
							<LineChart
								data={trendChartData}
								index="date"
								categories={categoryNames}
								valueFormatter={(value) => `${value}`}
								showLegend={true}
								yAxisWidth={40}
							/>
						</div>
					</div>
				)}

				<div className="mt-6 space-y-6">
					{sensorCategories.map((category) => {
						const categoryName = Object.keys(category)[0];
						const anomalyData = category[categoryName];

						// Calculate total anomalies for this category
						const totalCategoryAnomalies = anomalyData.reduce(
							(sum: number, day: AnomalyDay) => sum + day.anomalies,
							0,
						);

						// Find days with anomalies
						const anomalyDays = anomalyData.filter(
							(day: AnomalyDay) => day.anomalies > 0,
						);

						return (
							<div
								key={`category-${categoryName}`}
								className="border rounded-lg p-4"
							>
								<div className="flex justify-between items-center mb-3">
									<h3 className="text-lg font-medium">{categoryName}</h3>
									<Badge
										variant={
											totalCategoryAnomalies > 10 ? "destructive" : "outline"
										}
									>
										{totalCategoryAnomalies} anomalies
									</Badge>
								</div>

								{anomalyDays.length > 0 ? (
									<div className="space-y-2 mt-3">
										<h4 className="text-sm font-medium text-muted-foreground">
											Days with anomalies:
										</h4>
										<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
											{anomalyDays.map((day: AnomalyDay) => (
												<div
													key={`anomaly-${categoryName}-${day.date}`}
													className={cn(
														"flex justify-between items-center p-2 rounded-md text-sm",
														day.anomalies > 2
															? "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400"
															: "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400",
													)}
												>
													<span>{new Date(day.date).toLocaleDateString()}</span>
													<span className="font-semibold">
														{day.anomalies} anomalies
													</span>
												</div>
											))}
										</div>
									</div>
								) : (
									<p className="text-sm text-muted-foreground">
										No anomalies detected in this period
									</p>
								)}
							</div>
						);
					})}
				</div>
			</DialogContent>
		</Dialog>
	);
}
