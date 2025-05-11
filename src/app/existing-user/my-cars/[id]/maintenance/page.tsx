import VehicleDiagnosticsTable from "@/components/anomalies/vehicle-diagnostics-table";
import { diagnosticsData } from "@/data/diagnostics-data";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MaintenancePage({
	params,
}: { params: { id: string } }) {
	return (
		<div className="container mx-auto py-8">
			<div className="mb-6">
				<Link href={`/existing-user/my-cars/${params.id}`}>
					<Button variant="ghost" size="sm" className="gap-1">
						<ArrowLeft className="h-4 w-4" />
						Back to Car Details
					</Button>
				</Link>
			</div>
			<h1 className="text-2xl font-bold mb-6">Vehicle Diagnostics</h1>
			<p className="mb-6 text-muted-foreground">
				Review the diagnostic report for your vehicle below. Systems with
				anomalies are highlighted in red.
			</p>
			<VehicleDiagnosticsTable data={diagnosticsData} />
		</div>
	);
}
