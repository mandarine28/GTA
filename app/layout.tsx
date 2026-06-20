import type { Metadata } from "next";
import { Urbanist, Barlow } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TopBanner from "@/components/ui/TopBanner";

const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-urbanist",
  display: "swap",
});

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-barlow",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Grand Theft Info - La référence GTA 6",
  description: "News, mises à jour hebdomadaires, base de données véhicules et armes, guides et outils pour GTA 6.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full antialiased">
      <body className={`${urbanist.variable} ${barlow.variable} min-h-full flex flex-col bg-zinc-950 text-white`}>
        <TopBanner />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
