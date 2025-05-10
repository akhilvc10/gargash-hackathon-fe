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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";

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
	const isMobile = useMediaQuery("(max-width: 768px)");

	const toggleGroup = (group: string) => {
		setExpandedGroups((prev) => ({
			...prev,
			[group]: !prev[group],
		}));
	};

	return (
		<div className="w-full overflow-hidden rounded-lg border">
			<div className="overflow-x-auto">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[40%] md:w-[30%]">System</TableHead>
							<TableHead className="w-[15%]">Status</TableHead>
							<TableHead className="hidden md:table-cell">Details</TableHead>
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
								</TableRow>

								{/* Mobile description row */}
								{item.description && isMobile && (
									<TableRow className="md:hidden bg-inherit">
										<TableCell
											colSpan={3}
											className="py-2 px-4 text-sm text-red-600 dark:text-red-400 border-t-0"
										>
											{item.description}
										</TableCell>
									</TableRow>
								)}

								{/* Expanded sub-groups */}
								{expandedGroups[item.group] && (
									<TableRow className="bg-inherit">
										<TableCell
											colSpan={3}
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
	);
}
