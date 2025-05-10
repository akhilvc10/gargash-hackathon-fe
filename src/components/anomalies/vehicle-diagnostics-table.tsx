"use client";

import { useState } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	AlertCircle,
	CheckCircle,
	ChevronDown,
	ChevronRight,
	Info,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { VehicleDiagnosticsModal } from "./vehicle-diagnostics-modal";
import { LineChart } from "@/components/ui/chart";
import mockSensorData from "@/data/mockSensorData.json";

interface AnomalyDay {
	date: string;
	anomalies: number;
}

interface SubGroup {
	name: string;
	anomaly: number;
}

interface DiagnosticGroup {
	group: string;
	anomaly: number;
	sub_group: SubGroup[];
	description?: string;
}

interface VehicleDiagnosticsTableProps {
	data: {
		prediction: DiagnosticGroup[];
	};
}

export default function VehicleDiagnosticsTable({
	data,
}: VehicleDiagnosticsTableProps) {
	const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
		{},
	);
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
	const isMobile = useMediaQuery("(max-width: 768px)");

	const toggleGroup = (group: string) => {
		setExpandedGroups((prev) => ({
			...prev,
			[group]: !prev[group],
		}));
	};

	const handleDetailClick = (group: string) => {
		setSelectedGroup(group);
		setModalOpen(true);
		toast(`Analyzing ${group} data`, {
			description: "Loading detailed diagnostics information",
		});
	};

	// Function to get trend data for a specific group
	const getTrendData = (groupName: string) => {
		const groupData = mockSensorData.daily_trend.find(
			(group) => Object.keys(group)[0] === groupName,
		);

		if (!groupData || !groupData[groupName as keyof typeof groupData]) {
			return [];
		}

		// Combine all categories for this group into a single trend line
		const categories = groupData[
			groupName as keyof typeof groupData
		] as unknown as Record<string, AnomalyDay[]>[];

		// Create an array of the last 14 days for charting
		const last14Days: { date: string; anomalies: number }[] = [];

		// Process each day's data across all categories
		for (let i = 0; i < 14; i++) {
			const firstCategoryKey = Object.keys(categories[0])[0];
			const date = categories[0]?.[firstCategoryKey]?.[i + 16]?.date || "";
			let totalAnomalies = 0;

			// Sum anomalies across all categories for this day
			for (const category of categories) {
				const categoryName = Object.keys(category)[0];
				totalAnomalies += category[categoryName][i + 16]?.anomalies || 0;
			}

			last14Days.push({
				date,
				anomalies: totalAnomalies,
			});
		}

		return last14Days;
	};

	return (
		<>
			<div className="w-full overflow-hidden rounded-lg border">
				<div className="overflow-x-auto">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[35%] md:w-[25%]">System</TableHead>
								<TableHead className="w-[15%]">Status</TableHead>
								<TableHead className="hidden md:table-cell w-[25%]">
									Details
								</TableHead>
								<TableHead className="hidden md:table-cell w-[20%]">
									Trend (14 days)
								</TableHead>
								<TableHead className="w-[15%]">Action</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{data.prediction.map((item) => (
								<>
									<TableRow
										key={item.group}
										className={cn(
											item.anomaly === 1
												? "bg-red-50 hover:bg-red-100 dark:bg-red-950/20 dark:hover:bg-red-950/30"
												: "",
										)}
									>
										<TableCell className="font-medium">
											<button
												type="button"
												onClick={() => toggleGroup(item.group)}
												className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
												aria-expanded={expandedGroups[item.group]}
												aria-controls={`panel-${item.group.replace(/\s+/g, "-").toLowerCase()}`}
											>
												{expandedGroups[item.group] ? (
													<ChevronDown className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
												) : (
													<ChevronRight className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
												)}
												<span className="text-left">{item.group}</span>
											</button>
										</TableCell>
										<TableCell>
											{item.anomaly === 1 ? (
												<div className="flex items-center gap-1 text-red-600 dark:text-red-400">
													<AlertCircle className="h-4 w-4 flex-shrink-0" />
													<span>Anomaly</span>
												</div>
											) : (
												<div className="flex items-center gap-1 text-green-600 dark:text-green-400">
													<CheckCircle className="h-4 w-4 flex-shrink-0" />
													<span>Normal</span>
												</div>
											)}
										</TableCell>
										<TableCell className="hidden md:table-cell">
											{item.description && (
												<p className="text-sm text-red-600 dark:text-red-400 line-clamp-2 md:line-clamp-none">
													{item.description}
												</p>
											)}
										</TableCell>
										<TableCell className="hidden md:table-cell h-16">
											{getTrendData(item.group).length > 0 && (
												<div className="h-16">
													<LineChart
														data={getTrendData(item.group).map((day) => ({
															date: day.date.slice(5), // Format as MM-DD
															anomalies: day.anomalies,
														}))}
														index="date"
														categories={["anomalies"]}
														colors={[
															item.anomaly === 1
																? "hsl(0, 91%, 65%)"
																: "hsl(142, 76%, 36%)",
														]}
														valueFormatter={(value) => `${value}`}
														showGrid={false}
														showXAxis={false}
														showLegend={false}
														yAxisWidth={20}
													/>
												</div>
											)}
										</TableCell>
										<TableCell>
											<Button
												variant="outline"
												size="sm"
												className="flex items-center gap-1 h-8 px-2 text-xs font-medium"
												onClick={(e) => {
													e.stopPropagation();
													handleDetailClick(item.group);
												}}
											>
												<Info className="h-3.5 w-3.5" />
												<span>Detail</span>
											</Button>
										</TableCell>
									</TableRow>

									{/* Mobile description row */}
									{item.description && isMobile && (
										<TableRow className="md:hidden bg-inherit">
											<TableCell
												colSpan={4}
												className="py-2 px-4 text-sm text-red-600 dark:text-red-400 border-t-0"
											>
												{item.description}
											</TableCell>
										</TableRow>
									)}

									{/* Mobile trend row */}
									{isMobile && getTrendData(item.group).length > 0 && (
										<TableRow className="md:hidden bg-inherit">
											<TableCell colSpan={4} className="py-2 px-4 border-t-0">
												<div className="h-16">
													<LineChart
														data={getTrendData(item.group).map((day) => ({
															date: day.date.slice(5), // Format as MM-DD
															anomalies: day.anomalies,
														}))}
														index="date"
														categories={["anomalies"]}
														colors={[
															item.anomaly === 1
																? "hsl(0, 91%, 65%)"
																: "hsl(142, 76%, 36%)",
														]}
														valueFormatter={(value) => `${value}`}
														showGrid={false}
														showLegend={false}
														yAxisWidth={20}
													/>
												</div>
											</TableCell>
										</TableRow>
									)}

									{/* Expanded sub-groups */}
									{expandedGroups[item.group] && (
										<TableRow className="bg-inherit">
											<TableCell
												colSpan={5}
												className="p-0 border-t-0"
												id={`panel-${item.group.replace(/\s+/g, "-").toLowerCase()}`}
											>
												<div className="pl-8 pr-4 py-3 bg-slate-50 dark:bg-slate-900/30 border-y border-slate-200 dark:border-slate-800">
													<div className="overflow-x-auto">
														<div className="grid grid-cols-1 gap-y-2">
															{item.sub_group.map((subItem) => (
																<div
																	key={`${item.group}-${subItem.name}`}
																	className={cn(
																		"flex flex-wrap md:flex-nowrap justify-between items-center gap-2 p-2 rounded-md",
																		subItem.anomaly === 1
																			? "bg-red-100/70 dark:bg-red-950/30"
																			: "bg-white dark:bg-slate-950/50",
																	)}
																>
																	<div className="font-medium text-sm w-full md:w-auto">
																		{subItem.name}
																	</div>
																	<div className="ml-auto">
																		{subItem.anomaly === 1 ? (
																			<div className="flex items-center gap-1 text-red-600 dark:text-red-400 text-sm">
																				<AlertCircle className="h-4 w-4 flex-shrink-0" />
																				<span>Anomaly</span>
																			</div>
																		) : (
																			<div className="flex items-center gap-1 text-green-600 dark:text-green-400 text-sm">
																				<CheckCircle className="h-4 w-4 flex-shrink-0" />
																				<span>Normal</span>
																			</div>
																		)}
																	</div>
																</div>
															))}
														</div>
													</div>
												</div>
											</TableCell>
										</TableRow>
									)}
								</>
							))}
						</TableBody>
					</Table>
				</div>
			</div>

			{/* Vehicle Diagnostics Modal */}
			<VehicleDiagnosticsModal
				open={modalOpen}
				onOpenChange={setModalOpen}
				selectedGroup={selectedGroup}
			/>
		</>
	);
}
