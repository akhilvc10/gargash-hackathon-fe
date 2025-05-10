"use client";

import { VehicleSpec } from "@/types/vehicle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface VehicleSpecsProps {
	specs: VehicleSpec;
	color: string;
	interiorColor: string;
	condition: string;
}

export function VehicleSpecs({
	specs,
	color,
	interiorColor,
	condition,
}: VehicleSpecsProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Vehicle Specifications</CardTitle>
			</CardHeader>
			<CardContent>
				<dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					<SpecItem label="Engine" value={specs.engine} />
					<SpecItem label="Transmission" value={specs.transmission} />
					<SpecItem label="Horsepower" value={`${specs.horsepower} hp`} />
					<SpecItem label="Torque" value={specs.torque} />
					<SpecItem label="Fuel Economy" value={specs.fuelEconomy} />
					<SpecItem label="Acceleration" value={specs.acceleration} />
					<SpecItem label="Drivetrain" value={specs.drivetrain} />
					<SpecItem label="Color" value={color} />
					<SpecItem label="Interior Color" value={interiorColor} />
					<SpecItem label="Condition" value={condition} />
				</dl>
			</CardContent>
		</Card>
	);
}

interface SpecItemProps {
	label: string;
	value: string;
}

function SpecItem({ label, value }: SpecItemProps) {
	return (
		<div>
			<dt className="text-sm text-muted-foreground">{label}</dt>
			<dd className="font-medium capitalize">{value}</dd>
		</div>
	);
}
