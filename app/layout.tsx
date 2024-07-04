import type { Metadata } from "next";
import "./globals.css";

import { GeistSans } from "geist/font/sans";

import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Crafto",
  description:
    "Crafto-Gram helps you create unique and engaging Instagram bios and descriptions with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(GeistSans.variable, "font-sans")}>{children}</body>
    </html>
  );
}
