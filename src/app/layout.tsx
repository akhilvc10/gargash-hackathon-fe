import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Car360 - Discover, Finance, Purchase & Maintain Cars Online",
  description: "Car360 is a SaaS platform that lets customers discover, finance, purchase, lease, rent and maintain cars entirely online through a single mobile and web app.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster position="top-center" richColors closeButton/>
        {children}
      </body>
    </html>
  );
}
