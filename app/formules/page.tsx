import type { Metadata } from "next";
import CustomHeroBannerVideo from "@/components/CustomHeroBannerVideo";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Formules",
  description: "Découvrez les formules d'El Bodegon à Toulouse : formule déjeuner, formule dîner et menu dégustation. Cuisine argentine authentique, entrée, plat et dessert.",
  alternates: {
    canonical: "https://www.elbodegon-toulouse.fr/formules",
  },
};

const formules = [
  {
    label: "Formule Déjeuner",
    prix: "22€",
    description: "Du mardi au samedi, le midi",
    items: [
      "1 entrée au choix",
      "1 plat au choix",
      "1 dessert ou café",
    ],
    note: "Boissons non incluses",
  },
  {
    label: "Formule Dîner",
    prix: "35€",
    description: "Du mardi au samedi, le soir",
    items: [
      "1 entrée au choix",
      "1 plat au choix",
      "1 dessert au choix",
    ],
    note: "Boissons non incluses",
  },
  {
    label: "Menu Dégustation",
    prix: "55€",
    description: "L'expérience complète",
    items: [
      "2 entrées à partager",
      "1 plat signature",
      "Dessert maison",
      "1 verre de vin argentin",
    ],
    note: "Sur réservation uniquement",
    highlight: true,
  },
];

function FormulesPage() {
  return (
    <>
      <Navbar />
      <CustomHeroBannerVideo title="Formules" video="/img/deco/bg_video.mp4" />

      <section className="w-full bg-whiteSmokedBG py-24">
        <div className="w-5/6 mx-auto flex flex-col items-center gap-16">

          <div className="flex flex-col items-center gap-3 text-center">
            <span className="font-RedHatMonoLight text-goldColor tracking-widest text-xs uppercase border-b border-goldColor/30 pb-2">
              Nos Formules
            </span>
            <h2 className="font-RedHatMonoLight text-darkColor text-4xl lg:text-5xl">
              Le Meilleur de l'Argentine
            </h2>
            <p className="font-RedHatMonoLight text-darkColor/60 text-sm max-w-xl leading-relaxed">
              Des formules pensées pour vous faire découvrir la richesse de la
              cuisine argentine, à prix juste et dans la convivialité.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {formules.map((f) => (
              <div
                key={f.label}
                className={`flex flex-col gap-6 p-8 border-2 ${
                  f.highlight
                    ? "border-goldColor bg-darkColor"
                    : "border-darkColor/20 bg-transparent"
                }`}
              >
                <div className="flex flex-col gap-1">
                  {f.highlight && (
                    <span className="font-RedHatMonoLight text-goldColor/60 text-xs tracking-widest uppercase">
                      Recommandé
                    </span>
                  )}
                  <h3
                    className={`font-RedHatMonoLight text-xl tracking-wide ${
                      f.highlight ? "text-goldColor" : "text-darkColor"
                    }`}
                  >
                    {f.label}
                  </h3>
                  <p
                    className={`font-RedHatMonoLight text-xs tracking-wider ${
                      f.highlight ? "text-goldColor/50" : "text-darkColor/40"
                    }`}
                  >
                    {f.description}
                  </p>
                </div>

                <p
                  className={`font-RedHatMonoLight text-4xl border-t border-b py-4 ${
                    f.highlight
                      ? "text-goldColor border-goldColor/30"
                      : "text-darkColor border-darkColor/20"
                  }`}
                >
                  {f.prix}
                  <span
                    className={`text-sm ml-1 ${
                      f.highlight ? "text-goldColor/50" : "text-darkColor/40"
                    }`}
                  >
                    / pers.
                  </span>
                </p>

                <ul className="flex flex-col gap-2">
                  {f.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span
                        className={`mt-0.5 ${
                          f.highlight ? "text-goldColor" : "text-darkColor/40"
                        }`}
                      >
                        –
                      </span>
                      <span
                        className={`font-RedHatMonoLight text-sm ${
                          f.highlight ? "text-goldColor/70" : "text-darkColor/70"
                        }`}
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                <p
                  className={`font-RedHatMonoLight text-xs tracking-wider mt-auto ${
                    f.highlight ? "text-goldColor/30" : "text-darkColor/30"
                  }`}
                >
                  {f.note}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <Link
              href="/menu"
              className="font-RedHatMonoLight text-xs tracking-widest border-2 border-darkColor text-darkColor px-8 py-3 hover:bg-darkColor hover:text-goldColor transition-colors duration-200 uppercase"
            >
              Voir la carte complète
            </Link>
            <Link
              href="/reservation"
              className="font-RedHatMonoLight text-xs tracking-widest bg-darkColor text-goldColor border-2 border-darkColor px-8 py-3 hover:bg-transparent hover:text-darkColor transition-colors duration-200 uppercase"
            >
              Réserver une table
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default FormulesPage;
