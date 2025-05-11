"use client";

import { useLinkStatus } from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const spinnerVariants = cva("animate-spin rounded-full border-solid border", {
	variants: {
		variant: {
			default: "border-gray-200 border-t-gray-800",
			dark: "border-gray-700 border-t-gray-100",
		},
		size: {
			default: "h-5 w-5 border-2",
			sm: "h-4 w-4 border-2",
			lg: "h-6 w-6 border-3",
		},
	},
	defaultVariants: {
		variant: "default",
		size: "default",
	},
});

export interface SpinnerProps extends VariantProps<typeof spinnerVariants> {
	className?: string;
}

export function Spinner({ variant, size, className }: SpinnerProps) {
	return (
		<div
			role="status"
			aria-label="Loading"
			className={cn(spinnerVariants({ variant, size }), className)}
		/>
	);
}

export default function LoadingIndicator({
	variant = "default",
	size = "default",
}: SpinnerProps) {
	const { pending } = useLinkStatus();
	return pending ? <Spinner variant={variant} size={size} /> : null;
}
