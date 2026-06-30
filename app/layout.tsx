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
  metadataBase: new URL('https://www.gta6zone.fr'),
  title: {
    default: 'GTA6Zone — La référence GTA 6 en français',
    template: '%s | GTA6Zone',
  },
  description: 'News, personnages, véhicules, armes, guides et outils pour GTA 6. Le site de référence francophone mis à jour quotidiennement.',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'GTA6Zone',
    images: [
      {
        url: '/images/gameplay1.jpg',
        width: 1280,
        height: 720,
        alt: 'GTA6Zone — La référence GTA 6 en français',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@gta6zone',
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: 'FTn8G7Rfhj1bbkbWePtUmkJovCE-1MXHSzSUTuRaX2M',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full antialiased">
      <body suppressHydrationWarning className={`${urbanist.variable} ${barlow.variable} min-h-full flex flex-col bg-zinc-950 text-white`}>
        <TopBanner />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
