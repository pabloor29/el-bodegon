import type { Metadata } from "next";
import CustomHeroBannerImage from "@/components/CustomHeroBannerImage";
import CustomHeroBannerVideo from "@/components/CustomHeroBannerVideo";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";

export const metadata: Metadata = {
  title: "Menu & Carte",
  description: "Découvrez la carte d'El Bodegon : empanadas maison, asado, spécialités argentines, carte des vins et cocktails. Restaurant argentin à Toulouse, 6 rue de la Fonderie.",
  alternates: {
    canonical: "https://www.elbodegon-toulouse.fr/menu",
  },
};

function MenuPage() {
  return (
    <>
      <Navbar />
      <CustomHeroBannerVideo title="Menu" video="/img/deco/bg_video.mp4" />

      <div className="w-full flex justify-center items-center bg-whiteSmokedBG">
        <div className="lg:w-3/5 w-11/12 flex flex-col items-center justify-center py-20 space-y-6">
          <img
            className="w-full h-auto object-cover"
            src="/img/menu/20260409_CARBO_CARTE_PRINCIPALE.webp"
            alt="Carte principale CARBO - plats italiens et pâtes fraîches"
          />
          <img
            className="w-full h-auto object-cover"
            src="/img/menu/20260409_CARBO_CARTE_VINS.webp"
            alt="Carte des vins CARBO - sélection de vins italiens et français"
          />
          <img
            className="w-full h-auto object-cover"
            src="/img/menu/20260409_CARBO_CARTE_COCKTAILS.webp"
            alt="Carte des cocktails CARBO - cocktails maison et boissons"
          />
        </div>
      </div>

      <Footer />
    </>
  );
}

export default MenuPage;
