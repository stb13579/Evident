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
      <body className="bg-sky text-ink font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
