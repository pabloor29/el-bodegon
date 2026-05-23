import type { Metadata } from "next";
import Footer from "../../components/Footer";
import HeroBanner from "../../components/HeroBanner";
import MainPage from "../../components/MainPage";
import Navbar from "../../components/Navbar";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "El Bodegon - Restaurant Argentin à Toulouse | Cuisine Traditionnelle Argentine",
  description: "El Bodegon, restaurant argentin authentique à Toulouse. Empanadas, asado, dulce de leche — des recettes traditionnelles préparées par des propriétaires argentins. 6 rue de la Fonderie, Toulouse. Réservez en ligne !",
  keywords: [
    "restaurant argentin Toulouse",
    "El Bodegon Toulouse",
    "cuisine argentine Toulouse",
    "empanadas Toulouse",
    "asado Toulouse",
    "restaurant Buenos Aires Toulouse",
    "restaurant argentin authentique",
    "bodegon Toulouse",
    "restaurant rue de la Fonderie Toulouse",
    "cuisine traditionnelle argentine Toulouse",
    "réservation restaurant argentin Toulouse",
  ],
  alternates: {
    canonical: "https://www.elbodegon-toulouse.fr",
  },
};

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <Navbar />
      <HeroBanner />
      <MainPage />
      <Footer />
      <Analytics />
    </main>
  );
}
