import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import CustomHeroBannerImage from "@/components/CustomHeroBannerImage";
import CustomHeroBannerVideo from "@/components/CustomHeroBannerVideo";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";

export const metadata: Metadata = {
  title: "Réservation",
  description: "Réservez votre table à El Bodegon, restaurant argentin à Toulouse. Réservation en ligne rapide et simple. 6 rue de la Fonderie, 31000 Toulouse.",
  alternates: {
    canonical: "https://www.elbodegon-toulouse.fr/reservation",
  },
};

function ReservationPage() {
  return (
    <>
      <Navbar />
      <CustomHeroBannerVideo title="Réservation" video="/img/deco/bg_video.mp4" />
      <ContactForm />
      <Footer />
    </>
  );
}

export default ReservationPage;
