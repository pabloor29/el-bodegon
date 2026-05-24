import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "El Bodegon - Restaurant Argentin à Toulouse",
    template: "%s | El Bodegon - Restaurant Argentin Toulouse",
  },
  description: "El Bodegon — restaurant argentin authentique à Toulouse. Empanadas maison, asado, dulce de leche. Fondé par des Argentins passionnés. 6 rue de la Fonderie, Toulouse. Réservez en ligne !",
  keywords: [
    "restaurant argentin Toulouse",
    "El Bodegon Toulouse",
    "cuisine argentine Toulouse",
    "empanadas Toulouse",
    "asado Toulouse",
    "restaurant argentin authentique Toulouse",
    "bodegon Toulouse",
    "restaurant rue de la Fonderie Toulouse",
    "réservation restaurant argentin Toulouse",
    "meilleur restaurant argentin Toulouse",
  ],
  authors: [{ name: "El Bodegon" }],
  creator: "El Bodegon",
  metadataBase: new URL("https://www.elbodegon-toulouse.fr"),
  alternates: {
    canonical: "https://www.elbodegon-toulouse.fr",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://www.elbodegon-toulouse.fr",
    siteName: "El Bodegon - Restaurant Argentin Toulouse",
    title: "El Bodegon - Restaurant Argentin à Toulouse",
    description: "El Bodegon — restaurant argentin authentique à Toulouse. Empanadas maison, asado, dulce de leche. Fondé par des Argentins passionnés. Réservez en ligne !",
    images: [
      {
        url: "/img/deco/argentina-flag.webp",
        width: 1200,
        height: 630,
        alt: "El Bodegon - Restaurant Argentin à Toulouse",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "El Bodegon - Restaurant Argentin à Toulouse",
    description: "El Bodegon — restaurant argentin authentique à Toulouse. Empanadas maison, asado, dulce de leche.",
    images: ["/img/deco/argentina-flag.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: "/img/deco/argentina-flag.webp",
    apple: "/img/deco/argentina-flag.webp",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "El Bodegon",
  "url": "https://www.elbodegon-toulouse.fr",
  "image": "https://www.elbodegon-toulouse.fr/img/deco/argentina-flag.webp",
  "telephone": "+33663957419",
  "email": "elbodegon@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "6 rue de la Fonderie",
    "addressLocality": "Toulouse",
    "postalCode": "31000",
    "addressCountry": "FR",
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 43.5947521,
    "longitude": 1.4436767,
  },
  "servesCuisine": ["Argentine", "Cuisine argentine", "Empanadas", "Asado"],
  "priceRange": "€€",
  "openingHours": [
    "Tu-Sa 12:00-14:30",
    "Tu-Sa 18:30-22:00",
  ],
  "hasMap": "https://www.google.com/maps/place/El+bodeg%C3%B3n/@43.594756,1.4411018",
  "currenciesAccepted": "EUR",
  "paymentAccepted": "Cash, Credit Card",
  "sameAs": [
    "https://www.instagram.com/elbodegon.toulouse31/",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
