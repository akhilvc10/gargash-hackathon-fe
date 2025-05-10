"use client";

import type { VehicleFeature } from "@/types/vehicle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface VehicleFeaturesProps {
	features: VehicleFeature[];
}

export function VehicleFeatures({ features }: VehicleFeaturesProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Vehicle Features</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="space-y-6">
					{features.map((feature) => (
						<div key={feature.category}>
							<h3 className="font-medium text-lg mb-2">{feature.category}</h3>
							<ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2">
								{feature.items.map((item) => (
									<li key={item} className="flex items-center">
										<div className="h-2 w-2 bg-car360-blue rounded-full mr-2" />
										{item}
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
