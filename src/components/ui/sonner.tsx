"use client";

import { Toaster as SonnerToaster } from "sonner";

interface ToasterProps {
  richColors?: boolean;
}

export function Toaster({ richColors = true }: ToasterProps) {
  return (
    <SonnerToaster
      theme="light"
      className="toaster group"
      richColors={richColors}
    />
  );
} 