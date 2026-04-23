import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport = {
  themeColor: "#0B3D2E",
};

export const metadata: Metadata = {
  title: "Nilanjan Saha | Living Digital Portfolio",
  description:
    "AI/ML Engineer — crafting immersive, high-performance web experiences.",
  openGraph: {
    title: "Nilanjan Saha | Living Digital Portfolio",
    description: "AI/ML Engineer.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-[var(--bg-deep)] text-[var(--fg-primary)]">
        {children}
      </body>
    </html>
  );
}
