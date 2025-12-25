import "./globals.css";
import { Manrope } from "next/font/google";
import type { Metadata } from "next";

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

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={manrope.variable}>
<head>
    <link rel="icon" href="/favicon-light.svg" media="(prefers-color-scheme: light)" />
    <link rel="icon" href="/favicon-dark.svg" media="(prefers-color-scheme: dark)" />
</head>
  <body className="bg-sky text-ink font-sans antialiased">
    {children}
  </body>
    </html>
  );
}
