import type { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";
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

type Formule = {
  id: string;
  nom: string;
  prix: number;
  description: string;
  elements: string[];
};

async function getFormules(): Promise<Formule[]> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      global: {
        fetch: (url, options) =>
          fetch(url, { ...options, cache: "no-store" }),
      },
    }
  );

  const { data, error } = await supabase
    .from("formules")
    .select("id, nom, prix, description, elements")
    .eq("restaurant_id", process.env.RESTAURANT_ID!)
    .eq("active", true)
    .order("created_at", { ascending: true });

  if (error || !data) return [];
  return data as Formule[];
}

async function FormulesPage() {
  const formules = await getFormules();
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
                key={f.id}
                className="flex flex-col gap-6 p-8 border-2 border-darkColor/20 bg-transparent"
              >
                <div className="flex flex-col gap-1">
                  <h3 className="font-RedHatMonoLight text-xl tracking-wide text-darkColor">
                    {f.nom}
                  </h3>
                  <p className="font-RedHatMonoLight text-xs tracking-wider text-darkColor/40">
                    {f.description}
                  </p>
                </div>

                <p className="font-RedHatMonoLight text-4xl border-t border-b py-4 text-darkColor border-darkColor/20">
                  {Number(f.prix) % 1 === 0
                    ? `${Math.floor(f.prix)}€`
                    : `${f.prix}€`}
                  <span className="text-sm ml-1 text-darkColor/40">/ pers.</span>
                </p>

                <ul className="flex flex-col gap-2">
                  {f.elements.map((element) => (
                    <li key={element} className="flex items-start gap-2">
                      <span className="mt-0.5 text-darkColor/40">–</span>
                      <span className="font-RedHatMonoLight text-sm text-darkColor/70">
                        {element}
                      </span>
                    </li>
                  ))}
                </ul>
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
