import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "EchoXIA — Votre assistant IA, disponible 24/7",
    template: "%s — EchoXIA",
  },
  description: site.description,
  keywords: [
    "assistant IA",
    "WhatsApp",
    "Instagram",
    "Messenger",
    "qualification de prospects",
    "prise de rendez-vous",
    "automatisation",
    "service client",
  ],
  authors: [{ name: "EchoXIA" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: site.url,
    siteName: "EchoXIA",
    title: "EchoXIA — Vos clients écrivent. EchoXIA s’occupe de la suite.",
    description: site.description,
    images: [
      {
        url: "/animations/01-reponse-instantanee.png",
        width: 1200,
        height: 900,
        alt: "EchoXIA répond instantanément à un client sur WhatsApp.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EchoXIA — Votre assistant IA, disponible 24/7",
    description: site.description,
    images: ["/animations/01-reponse-instantanee.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#2A4D85",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
