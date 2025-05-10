"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ServiceHistory() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Service History</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					{/* In a real app, we would fetch service history from an API */}
					<ServiceRecord
						date="2023-10-15"
						mileage={15000}
						serviceType="Regular Maintenance"
						description="Oil change, filter replacement, tire rotation"
						location="Gargash Service Center - Dubai"
					/>
					<ServiceRecord
						date="2023-07-22"
						mileage={10000}
						serviceType="Regular Maintenance"
						description="Oil change, filter replacement"
						location="Gargash Service Center - Dubai"
					/>
					<ServiceRecord
						date="2023-03-05"
						mileage={5000}
						serviceType="Initial Service"
						description="First service check-up"
						location="Gargash Service Center - Dubai"
					/>
				</div>
			</CardContent>
		</Card>
	);
}

interface ServiceRecordProps {
	date: string;
	mileage: number;
	serviceType: string;
	description: string;
	location: string;
}

function ServiceRecord({
	date,
	mileage,
	serviceType,
	description,
	location,
}: ServiceRecordProps) {
	const formattedDate = new Date(date).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	return (
		<div className="border-b pb-4 last:border-0 last:pb-0">
			<div className="flex justify-between items-center mb-2">
				<h4 className="font-medium">{serviceType}</h4>
				<span className="text-sm text-muted-foreground">{formattedDate}</span>
			</div>
			<p className="text-sm mb-1">{description}</p>
			<div className="flex justify-between text-sm text-muted-foreground">
				<span>{location}</span>
				<span>{mileage.toLocaleString()} km</span>
			</div>
		</div>
	);
}
