import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getMetadataBase } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const defaultDescription =
  "A static collection of product-thinking visuals, frameworks, and experiments.";

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: {
    default: "Product Thinking",
    template: "%s · Product Thinking",
  },
  description: defaultDescription,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Product Thinking",
    title: "Product Thinking",
    description: defaultDescription,
    url: "./",
    images: [
      {
        url: "/og.png",
        width: 1376,
        height: 768,
        alt: "Product Thinking — visual mental models for product work",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Product Thinking",
    description: defaultDescription,
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
