import { AlertCircle, AlertTriangle } from "lucide-react";

interface DashboardSummaryProps {
	data: {
		prediction: Array<{
			group: string;
			anomaly: number;
			description?: string;
			sub_group: Array<{
				name: string;
				anomaly: number;
			}>;
		}>;
	};
}

export default function DashboardSummary({ data }: DashboardSummaryProps) {
	const anomalies = data.prediction.filter((item) => item.anomaly === 1);
	const anomalyCount = anomalies.length;
	const totalSystems = data.prediction.length;
	const healthPercentage = Math.round(
		((totalSystems - anomalyCount) / totalSystems) * 100,
	);

	// Count total components and anomalies
	const totalComponents = data.prediction.reduce(
		(acc, item) => acc + item.sub_group.length,
		0,
	);
	const componentAnomalies = data.prediction.reduce(
		(acc, item) =>
			acc + item.sub_group.filter((sub) => sub.anomaly === 1).length,
		0,
	);

	return (
		<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
			<div className="rounded-lg border p-4 flex flex-col">
				<span className="text-sm font-medium text-muted-foreground">
					Vehicle Health
				</span>
				<span className="text-2xl font-bold mt-1">{healthPercentage}%</span>
				<div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-2">
					<div
						className={`h-2.5 rounded-full ${
							healthPercentage > 80
								? "bg-green-600"
								: healthPercentage > 60
									? "bg-yellow-500"
									: "bg-red-600"
						}`}
						style={{ width: `${healthPercentage}%` }}
						aria-label={`Health score: ${healthPercentage}%`}
					></div>
				</div>
			</div>

			<div className="rounded-lg border p-4 flex flex-col">
				<span className="text-sm font-medium text-muted-foreground">
					Systems with Anomalies
				</span>
				<div className="flex items-center gap-2 mt-1">
					<span className="text-2xl font-bold">{anomalyCount}</span>
					<span className="text-muted-foreground">of {totalSystems}</span>
				</div>
				<div className="flex items-center gap-1 mt-2 text-sm">
					<AlertTriangle className="h-4 w-4 text-yellow-500" />
					<span>{componentAnomalies} component issues detected</span>
				</div>
			</div>

			{anomalyCount > 0 && (
				<div className="rounded-lg border p-4 flex flex-col md:col-span-2">
					<span className="text-sm font-medium text-muted-foreground flex items-center gap-1 mb-2">
						<AlertCircle className="h-4 w-4 text-red-600" />
						Critical Issues
					</span>
					<ul className="space-y-2">
						{anomalies.map((item) => (
							<li key={item.group} className="flex items-start gap-2">
								<AlertCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
								<div>
									<p className="font-medium text-sm">{item.group}</p>
									{item.description && (
										<p className="text-xs text-muted-foreground mt-0.5">
											{item.description}
										</p>
									)}
								</div>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}
