import type { Metadata } from "next";
import CustomHeroBannerVideo from "@/components/CustomHeroBannerVideo";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Événements Privés",
  description: "El Bodegon accueille vos événements privés à Toulouse : anniversaires, repas d'entreprise, asado privatif. Restaurant argentin privatisable, 6 rue de la Fonderie.",
  alternates: {
    canonical: "https://www.elbodegon-toulouse.fr/evenements",
  },
};

const events = [
  {
    title: "Anniversaires",
    description:
      "Célébrez votre anniversaire dans un cadre chaleureux et authentique. Nous préparons un menu personnalisé et un dessert argentin maison pour rendre ce moment inoubliable.",
  },
  {
    title: "Repas d'Entreprise",
    description:
      "Un cadre original et convivial pour vos déjeuners ou dîners professionnels. Notre salle privatisable accueille jusqu'à 40 personnes dans une ambiance argentina unique.",
  },
  {
    title: "Asado Privatif",
    description:
      "Vivez l'expérience ultime de la culture argentine : un asado privatif préparé par nos fondateurs, autour du feu, avec chimichurri maison et vins sélectionnés.",
  },
  {
    title: "Événements Familiaux",
    description:
      "Baptêmes, communions, retrouvailles familiales — El Bodegon met son savoir-faire et son hospitalité argentine au service de vos moments de partage.",
  },
];

function EvenementsPage() {
  return (
    <>
      <Navbar />
      <CustomHeroBannerVideo title="Événements" video="/img/deco/bg_video.mp4" />

      {/* ── Intro ─────────────────────────────────────────────── */}
      <section className="w-full bg-whiteSmokedBG py-24">
        <div className="w-5/6 mx-auto flex flex-col items-center gap-16">
          <div className="flex flex-col items-center gap-3 text-center">
            <span className="font-RedHatMonoLight text-goldColor tracking-widest text-xs uppercase border-b border-goldColor/30 pb-2">
              Événements Privés
            </span>
            <h2 className="font-RedHatMonoLight text-darkColor text-4xl lg:text-5xl">
              Privatisez El Bodegon
            </h2>
            <p className="font-RedHatMonoLight text-darkColor/60 text-sm max-w-xl leading-relaxed">
              Notre salle est disponible pour vos événements privés. Nous créons
              avec vous un menu sur mesure, dans le respect des traditions
              culinaires argentines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            {events.map((event, i) => (
              <div
                key={event.title}
                className="flex flex-col gap-4 border-t-2 border-darkColor pt-6"
              >
                <h3 className="font-RedHatMonoLight text-darkColor text-2xl tracking-wide">
                  {event.title}
                </h3>
                <p className="font-RedHatMonoLight text-darkColor/60 text-sm leading-relaxed">
                  {event.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA dark ──────────────────────────────────────────── */}
      <section className="w-full bg-darkColor py-24">
        <div className="w-5/6 mx-auto flex flex-col items-center gap-8 text-center">
          <span className="font-RedHatMonoLight text-goldColor tracking-widest text-xs uppercase border-b border-goldColor/30 pb-2">
            Organisons ensemble
          </span>
          <h2 className="font-RedHatMonoLight text-goldColor text-3xl lg:text-4xl max-w-xl leading-tight">
            Un Événement à la Hauteur de vos Attentes
          </h2>
          <p className="font-RedHatMonoLight text-goldColor/50 text-sm max-w-lg leading-relaxed">
            Contactez-nous pour discuter de votre projet. Nous élaborerons
            ensemble un menu, un programme et une mise en scène qui feront de
            votre événement un moment unique.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="font-RedHatMonoLight text-xs tracking-widest border-2 border-goldColor text-goldColor px-8 py-3 hover:bg-goldColor hover:text-darkColor transition-colors duration-200 uppercase"
            >
              Nous contacter
            </Link>
            <Link
              href="/reservation"
              className="font-RedHatMonoLight text-xs tracking-widest bg-goldColor text-darkColor border-2 border-goldColor px-8 py-3 hover:bg-transparent hover:text-goldColor transition-colors duration-200 uppercase"
            >
              Faire une demande
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default EvenementsPage;
