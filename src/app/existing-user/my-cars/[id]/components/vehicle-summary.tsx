"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";

interface VehicleSummaryProps {
	price: number;
	dealershipName: string;
}

export function VehicleSummary({ price, dealershipName }: VehicleSummaryProps) {
	return (
		<Card className="sticky top-6">
			<CardHeader>
				<CardTitle>Vehicle Summary</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="space-y-6">
					<div>
						<h3 className="text-lg font-medium mb-2">Purchase Details</h3>
						<dl className="space-y-2">
							<div className="flex justify-between">
								<dt className="text-muted-foreground">Purchase Date</dt>
								<dd>January 15, 2023</dd>
							</div>
							<div className="flex justify-between">
								<dt className="text-muted-foreground">Purchase Price</dt>
								<dd className="font-medium">{formatCurrency(price)}</dd>
							</div>
							<div className="flex justify-between">
								<dt className="text-muted-foreground">Dealership</dt>
								<dd>{dealershipName}</dd>
							</div>
							<Separator className="my-3" />
							<div className="flex justify-between">
								<dt className="text-muted-foreground">Warranty Until</dt>
								<dd>January 15, 2028</dd>
							</div>
							<div className="flex justify-between">
								<dt className="text-muted-foreground">Next Service Due</dt>
								<dd>December 15, 2023</dd>
							</div>
						</dl>
					</div>

					<div className="space-y-3">
						<Button className="w-full" variant="default">
							Book a Service
						</Button>
						<Button className="w-full" variant="outline">
							View Warranty Details
						</Button>
						<Button className="w-full" variant="outline">
							View Owner's Manual
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
