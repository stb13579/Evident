import "./globals.css";
import { Manrope } from "next/font/google";
import { headers } from "next/headers";
import type { Metadata } from "next";

import { AnalyticsProvider } from "../components/AnalyticsProvider";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Evident | Reliable account-level visibility",
  description:
    "Turn product usage into clear account-level signals. Evident delivers confident visibility without user-level tracking."
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_ID;
  const countryCode =
    headersList.get("x-vercel-ip-country") ||
    headersList.get("x-geo-country") ||
    headersList.get("cf-ipcountry");

  return (
    <html lang="en" className={manrope.variable}>
<head>
    <link rel="icon" href="/favicon-light.svg" media="(prefers-color-scheme: light)" />
    <link rel="icon" href="/favicon-dark.svg" media="(prefers-color-scheme: dark)" />
</head>
  <body className="bg-sky text-ink font-sans antialiased">
    <AnalyticsProvider measurementId={gaMeasurementId} countryCode={countryCode}>
      {children}
    </AnalyticsProvider>
  </body>
    </html>
  );
}
