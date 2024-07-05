import type { Metadata } from "next";
import "./globals.css";

import { GeistSans } from "geist/font/sans";

import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "CraftoGram",
  description:
    "Crafto-Gram helps you create unique and engaging Instagram bios and descriptions with ease.",
  authors: [
    {
      name: "Aarab Nishchal",
      url: "https://aarab.vercel.app",
    },
  ],
  creator: "Aarab Nishchal",
  referrer: "origin-when-cross-origin",
  keywords: [
    "Instagram",
    "Bio",
    "Caption",
    "Generator",
    "AI",
    "OpenAI",
    "GPT-3",
    "Crafto",
    "Crafto-Gram",
    "CraftoGram",
    "Craftogram",
    "Crafto-Gram",
  ],
  openGraph: {
    title: "CraftoGram",
    description:
      "Crafto-Gram helps you create unique and engaging Instagram bios and descriptions with ease.",
  },
  twitter: {
    card: "summary_large_image",
    title: "CraftoGram",
    description:
      "Crafto-Gram helps you create unique and engaging Instagram bios and descriptions with ease.",
    creator: "@aarab_ii",
  },
  alternates: {
    canonical: "/",
  },
  icons: "/logo.svg",
  metadataBase: new URL("https://craftogram.vercel.app"),
  robots: "index, follow",
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
