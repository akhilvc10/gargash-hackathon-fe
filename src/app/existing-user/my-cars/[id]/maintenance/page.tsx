import VehicleDiagnosticsTable from "@/components/anomalies/vehicle-diagnostics-table";
import { diagnosticsData } from "@/data/diagnostics-data";
export default function MaintenancePage() {
	return (
		<div className="container mx-auto py-8">
			<h1 className="text-2xl font-bold mb-6">Vehicle Diagnostics</h1>
			<p className="mb-6 text-muted-foreground">
				Review the diagnostic report for your vehicle below. Systems with
				anomalies are highlighted in red.
			</p>
			<VehicleDiagnosticsTable data={diagnosticsData} />
		</div>
	);
}
