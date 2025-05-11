"use client";

import { useState, useEffect } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertCircle, X, Filter } from "lucide-react";
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

	// Get all category names for the chart
	const categoryNames = sensorCategories.map(
		(category) => Object.keys(category)[0],
	);

	// State for category filters - initialize with all categories selected by default
	const [selectedCategories, setSelectedCategories] =
		useState<string[]>(categoryNames);

	// Initialize on mount or whenever categoryNames changes
	useEffect(() => {
		if (categoryNames.length > 0 && selectedCategories.length === 0) {
			setSelectedCategories(categoryNames);
		}
	}, [categoryNames, selectedCategories]);

	// State for anomaly threshold filter
	const [anomalyThreshold, setAnomalyThreshold] = useState<number>(0);
	// State for showing filter UI
	const [showFilters, setShowFilters] = useState<boolean>(false);

	// Toggle category selection
	const toggleCategory = (categoryName: string) => {
		setSelectedCategories((prev) =>
			prev.includes(categoryName)
				? prev.filter((name) => name !== categoryName)
				: [...prev, categoryName],
		);
	};

	// Select all categories
	const selectAllCategories = () => {
		setSelectedCategories(categoryNames);
	};

	// Clear all categories
	const clearAllCategories = () => {
		setSelectedCategories([]);
	};

	// Prepare data for the trend chart with filtering
	const prepareTrendChartData = () => {
		if (!sensorCategories.length) return [];

		// Force selected categories to include at least the first category if none selected
		const activeCategories =
			selectedCategories.length > 0
				? selectedCategories
				: categoryNames.length > 0
					? [categoryNames[0]]
					: [];

		const chartData: {
			date: string;
			[key: string]: string | number;
		}[] = [];

		// Get a list of all dates from the first category (assuming all categories have the same dates)
		const firstCategory = sensorCategories[0];
		const firstCategoryName = Object.keys(firstCategory)[0];
		const dates = firstCategory[firstCategoryName].map((day) => day.date);

		// Only get the last 14 days
		const last14Days = dates.slice(-14);

		// Create a data point for each date
		for (const [index, fullDate] of last14Days.entries()) {
			// Format the date to be more readable
			const date = new Date(fullDate);
			const formattedDate = `${date.getMonth() + 1}/${date.getDate()}`;

			// Calculate the original index in the full data array
			const originalIndex = dates.indexOf(fullDate);

			const dataPoint: {
				date: string;
				[key: string]: string | number;
			} = {
				date: formattedDate,
			};

			// Add anomaly count for each category that passes the filter
			for (const category of sensorCategories) {
				const categoryName = Object.keys(category)[0];
				const anomalyValue =
					category[categoryName][originalIndex]?.anomalies || 0;

				// Only include categories that are selected
				if (activeCategories.includes(categoryName)) {
					// Only include values that meet or exceed the threshold
					dataPoint[categoryName] =
						anomalyValue >= anomalyThreshold ? anomalyValue : 0;
				}
			}

			chartData.push(dataPoint);
		}

		console.log("Prepared Chart Data:", chartData);
		console.log("Active Categories:", activeCategories);
		return chartData;
	};

	// Prepare chart data
	const trendChartData = prepareTrendChartData();

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="w-full max-w-[90vw] sm:max-w-[80vw] max-h-[90vh] overflow-y-auto">
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

				{/* Filter Controls Section */}
				<div className="mb-4">
					<div className="flex items-center justify-between">
						<h3 className="text-lg font-semibold">
							Anomaly Trend (Last 14 Days)
						</h3>
						<Button
							variant="outline"
							size="sm"
							onClick={() => setShowFilters(!showFilters)}
							className="gap-2"
						>
							<Filter className="h-4 w-4" />
							Filter
						</Button>
					</div>

					{showFilters && (
						<div className="mt-4 p-4 border rounded-lg space-y-4">
							<div>
								<p className="text-sm font-medium" id="threshold-label">
									Anomaly Threshold
								</p>
								<div className="flex items-center gap-2 mt-1">
									<input
										type="range"
										min="0"
										max="5"
										value={anomalyThreshold}
										onChange={(e) =>
											setAnomalyThreshold(Number.parseInt(e.target.value, 10))
										}
										className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
										aria-labelledby="threshold-label"
									/>
									<span className="text-sm font-medium min-w-[20px]">
										{anomalyThreshold}+
									</span>
								</div>
							</div>

							<div className="space-y-1">
								<div className="flex items-center justify-between mb-2">
									<h4 className="text-sm font-medium">Sensor Categories</h4>
									<div className="flex gap-2">
										<Button
											variant="outline"
											size="sm"
											onClick={selectAllCategories}
											className="text-xs h-8"
										>
											Select All
										</Button>
										<Button
											variant="outline"
											size="sm"
											onClick={clearAllCategories}
											className="text-xs h-8"
										>
											Clear All
										</Button>
									</div>
								</div>
								<div className="grid grid-cols-2 md:grid-cols-3 gap-2">
									{categoryNames.map((categoryName) => (
										<div
											key={categoryName}
											className="flex items-center space-x-2"
										>
											<Checkbox
												id={categoryName}
												checked={selectedCategories.includes(categoryName)}
												onCheckedChange={() => toggleCategory(categoryName)}
											/>
											<label
												htmlFor={categoryName}
												className="text-sm font-medium truncate"
											>
												{categoryName}
											</label>
										</div>
									))}
								</div>
							</div>
						</div>
					)}
				</div>

				{/* Trend Chart Section */}
				<div className="h-[400px] mt-4 border p-2 rounded-lg">
					{selectedCategories.length > 0 ? (
						<LineChart
							data={trendChartData}
							index="date"
							categories={selectedCategories}
							colors={[
								"#FF6384",
								"#36A2EB",
								"#FFCE56",
								"#4BC0C0",
								"#9966FF",
								"#FF9F40",
								"#2ECC71",
							]}
						/>
					) : (
						<div className="h-full flex items-center justify-center">
							<p className="text-muted-foreground">
								Please select at least one category to display data
							</p>
						</div>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
}
