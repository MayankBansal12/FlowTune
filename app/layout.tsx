import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FlowTune | an open source and ad-free music player",
  description:
    "FlowTune is a ad-free and an open source music player for playing copyright-free music.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background flex h-screen w-screen overflow-hidden`}
      >
        {children}

        <SpeedInsights />
        <Analytics />
        <Toaster richColors closeButton position="top-center" />
      </body>
      <script
        defer
        src="https://cloud.umami.is/script.js"
        data-website-id="ca8bd88e-fd6a-430f-a76f-7aa9f5ef3cc0"
      ></script>
    </html>
  );
}
