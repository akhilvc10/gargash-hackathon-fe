"use client";

import { useState, useEffect } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart } from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle, ArrowLeft, ChevronRight, X } from "lucide-react";
import sensorData from "@/data/mockSensorData.json";
import { cn } from "@/lib/utils";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";

// Define types for the data structure
type AnomalyItem = {
	date: string;
	anomalies: number;
};

type Category = {
	[key: string]: AnomalyItem[];
};

// Define a type for the group data structure
type GroupData = {
	[key: string]: Category[];
};

type SensorGroup = {
	sensor_group: string;
	total_anomalies: number;
};

export default function AnomalyDashboard() {
	const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
	const [modalOpen, setModalOpen] = useState(false);
	const [mounted, setMounted] = useState(false);

	// Find the selected group data
	const groupData = selectedGroup
		? sensorData.daily_trend.find(
				(group) => Object.keys(group)[0] === selectedGroup,
			)
		: null;

	// Extract categories from the selected group
	const categories: Category[] = groupData
		? (groupData[
				selectedGroup as keyof typeof groupData
			] as unknown as Category[])
		: [];

	// Calculate total anomalies across all groups
	const totalAnomalies = sensorData.monthly_summary.reduce(
		(sum, group) => sum + group.total_anomalies,
		0,
	);

	// Get top 3 groups with most anomalies
	const topGroups = [...sensorData.monthly_summary]
		.sort((a, b) => b.total_anomalies - a.total_anomalies)
		.slice(0, 3);

	const handleGroupClick = (groupName: string) => {
		setSelectedGroup(groupName);
		setModalOpen(true);
		toast(`Analyzing ${groupName} anomalies`, {
			description: "Displaying detailed sensor data",
		});
	};

	// Client-side only to avoid hydration issues
	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	return (
		<div className="container mx-auto p-6 bg-slate-50">
			<div className="mb-6">
				<h1 className="text-2xl font-bold mb-4">Vehicle Sensor Analytics</h1>
			</div>

			{/* Overview Stats */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
				<Card>
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium text-muted-foreground">
							Total Anomalies
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="flex items-center">
							<AlertCircle className="h-5 w-5 text-red-500 mr-2" />
							<span className="text-3xl font-bold">{totalAnomalies}</span>
						</div>
						<p className="text-xs text-muted-foreground mt-2">
							Across all sensor groups in the last 30 days
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium text-muted-foreground">
							Most Affected System
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-lg font-semibold truncate">
							{topGroups[0]?.sensor_group}
						</div>
						<div className="flex items-center mt-1">
							<AlertCircle className="h-4 w-4 text-red-500 mr-2" />
							<span className="font-medium">
								{topGroups[0]?.total_anomalies} anomalies
							</span>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium text-muted-foreground">
							Monitoring Period
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-lg font-semibold">Apr 10 - May 9, 2025</div>
						<p className="text-xs text-muted-foreground mt-1">
							30 days of continuous monitoring
						</p>
					</CardContent>
				</Card>
			</div>

			{/* Sensor Groups Grid */}
			<h2 className="text-xl font-semibold mb-4">Sensor Groups</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
				{sensorData.monthly_summary.map((group) => (
					<Card
						key={group.sensor_group}
						className={`cursor-pointer transition-all hover:shadow-md border-l-4 ${
							group.total_anomalies > 120
								? "border-l-red-500"
								: group.total_anomalies > 90
									? "border-l-amber-500"
									: "border-l-emerald-500"
						}`}
						onClick={() => handleGroupClick(group.sensor_group)}
					>
						<CardHeader className="pb-2">
							<CardTitle className="text-base font-medium flex items-center justify-between">
								<span className="truncate mr-2">{group.sensor_group}</span>
								<ChevronRight className="h-4 w-4 text-muted-foreground" />
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="flex items-center justify-between">
								<div className="flex items-center">
									<AlertCircle
										className={cn(
											"h-5 w-5 mr-2",
											group.total_anomalies > 120
												? "text-red-500"
												: group.total_anomalies > 90
													? "text-amber-500"
													: "text-emerald-500",
										)}
									/>
									<span className="text-2xl font-bold">
										{group.total_anomalies}
									</span>
								</div>
								<Badge
									variant={
										group.total_anomalies > 120
											? "destructive"
											: group.total_anomalies > 90
												? "outline"
												: "secondary"
									}
								>
									{group.total_anomalies > 120
										? "High"
										: group.total_anomalies > 90
											? "Medium"
											: "Low"}
								</Badge>
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			{/* Detail Modal */}
			<Dialog open={modalOpen} onOpenChange={setModalOpen}>
				<DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
					<DialogHeader>
						<div className="flex items-center justify-between">
							<DialogTitle className="text-2xl font-bold">
								{selectedGroup}
							</DialogTitle>
							<Button
								variant="ghost"
								size="icon"
								onClick={() => setModalOpen(false)}
							>
								<X className="h-4 w-4" />
							</Button>
						</div>
						<DialogDescription>
							{categories.length} categories monitored over 30 days
						</DialogDescription>

						<Badge
							variant="outline"
							className="text-base py-1.5 px-3 bg-red-50 text-red-700 mt-2"
						>
							<AlertCircle className="h-4 w-4 mr-2" />
							{
								sensorData.monthly_summary.find(
									(g) => g.sensor_group === selectedGroup,
								)?.total_anomalies
							}{" "}
							Total Anomalies
						</Badge>
					</DialogHeader>

					{/* Category Tabs */}
					<div className="mt-4">
						<Tabs
							defaultValue={
								categories.length > 0 ? Object.keys(categories[0])[0] : ""
							}
						>
							<ScrollArea className="w-full whitespace-nowrap pb-4">
								<TabsList className="mb-4 h-auto inline-flex">
									{categories.map((category) => (
										<TabsTrigger
											key={Object.keys(category)[0]}
											value={Object.keys(category)[0]}
										>
											{Object.keys(category)[0]}
										</TabsTrigger>
									))}
								</TabsList>
							</ScrollArea>

							{categories.map((category) => {
								const categoryName = Object.keys(category)[0];
								const anomalyData = category[categoryName] as AnomalyItem[];

								// Calculate stats
								const totalAnomalies = anomalyData.reduce(
									(sum: number, item: AnomalyItem) => sum + item.anomalies,
									0,
								);
								const maxAnomalies = Math.max(
									...anomalyData.map((item: AnomalyItem) => item.anomalies),
								);
								const avgAnomalies = totalAnomalies / anomalyData.length;

								// Find peak days
								const peakDays = anomalyData
									.filter(
										(item: AnomalyItem) => item.anomalies === maxAnomalies,
									)
									.map((item: AnomalyItem) => {
										const date = new Date(item.date);
										return `${date.getMonth() + 1}/${date.getDate()}`;
									})
									.join(", ");

								// Transform data for chart
								const chartData = anomalyData.map((item: AnomalyItem) => ({
									date: item.date,
									anomalies: item.anomalies,
								}));

								return (
									<TabsContent
										key={categoryName}
										value={categoryName}
										className="space-y-4"
									>
										<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
											<Card>
												<CardHeader className="pb-2">
													<CardTitle className="text-sm font-medium text-muted-foreground">
														Total Anomalies
													</CardTitle>
												</CardHeader>
												<CardContent>
													<div className="text-2xl font-bold">
														{totalAnomalies}
													</div>
												</CardContent>
											</Card>

											<Card>
												<CardHeader className="pb-2">
													<CardTitle className="text-sm font-medium text-muted-foreground">
														Peak Anomalies
													</CardTitle>
												</CardHeader>
												<CardContent>
													<div className="text-2xl font-bold">
														{maxAnomalies}
													</div>
													<p className="text-xs text-muted-foreground mt-1">
														{peakDays
															? `On ${peakDays}`
															: "No anomalies detected"}
													</p>
												</CardContent>
											</Card>

											<Card>
												<CardHeader className="pb-2">
													<CardTitle className="text-sm font-medium text-muted-foreground">
														Daily Average
													</CardTitle>
												</CardHeader>
												<CardContent>
													<div className="text-2xl font-bold">
														{avgAnomalies.toFixed(1)}
													</div>
												</CardContent>
											</Card>
										</div>

										<div className="h-[350px] mt-4">
											<LineChart
												data={chartData}
												categories={["anomalies"]}
												index="date"
												colors={["#ef4444"]}
												valueFormatter={(value) => `${value} anomalies`}
												yAxisWidth={40}
												showLegend={false}
											/>
										</div>
									</TabsContent>
								);
							})}
						</Tabs>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
}
