import type { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";

export const dynamic = 'force-dynamic';
import CustomHeroBannerVideo from "@/components/CustomHeroBannerVideo";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CreditCard, Coins } from "lucide-react";
import React from "react";

export const metadata: Metadata = {
  title: "Contact & Horaires",
  description: "Contactez El Bodegon à Toulouse. 6 rue de la Fonderie, 31000 Toulouse. Tél : +33 6 63 95 74 19. Ouvert du mardi au samedi 12h-14h30 et 18h30-22h.",
  alternates: {
    canonical: "https://www.elbodegon-toulouse.fr/contact",
  },
};

const DAYS = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
];

type DayHours = {
  midi: { debut: string; fin: string };
  soir: { debut: string; fin: string };
  closedDay: boolean;
  closedDiner: boolean;
  closedLunch: boolean;
};

async function getOpeningHours(): Promise<DayHours[] | null> {
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
    .from("opening_hours")
    .select("hours")
    .eq("restaurant_id", process.env.RESTAURANT_ID!)
    .single();

  if (error || !data) return null;
  return data.hours as DayHours[];
}

async function ContactPage() {
  const hours = await getOpeningHours();
  return (
    <>
      <Navbar />
      <CustomHeroBannerVideo title="Contact" video="/img/deco/bg_video.mp4" />

      <div className="w-full flex flex-col lg:flex-row bg-whiteSmokedBG">

        {/* ── Infos ────────────────────────────────────────────── */}
        <div className="lg:w-1/2 flex flex-col items-center justify-center py-20 px-8 gap-12">

          <div className="flex flex-col items-center lg:items-start gap-2 text-center lg:text-left">
            <span className="font-RedHatMonoLight text-goldColor tracking-widest text-xs uppercase border-b border-goldColor/30 pb-2">
              Nous trouver
            </span>
            <a
              href="https://www.google.com/maps/place/El+bodeg%C3%B3n/@43.594756,1.4411018,677m/data=!3m2!1e3!4b1!4m6!3m5!1s0x12aebd6fd0c0bdd3:0x8bb3a8d1c544df7!8m2!3d43.5947521!4d1.4436767!16s%2Fg%2F11xfqlzgcp"
              className="font-RedHatMonoLight text-darkColor hover:text-darkColor/60 transition-colors text-sm"
            >
              6 rue de la Fonderie, 31000 Toulouse
            </a>
            <a
              href="tel:+33663957419"
              className="font-RedHatMonoLight text-darkColor hover:text-darkColor/60 transition-colors text-sm"
            >
              +33 6 63 95 74 19
            </a>
            <a
              href="mailto:elbodegon@gmail.com"
              className="font-RedHatMonoLight text-darkColor hover:text-darkColor/60 transition-colors text-sm"
            >
              elbodegon@gmail.com
            </a>
          </div>

          {/* Horaires */}
          <div className="border-2 border-darkColor px-10 py-8 flex flex-col items-center gap-6 w-fit">
            <h3 className="font-RedHatMonoLight text-darkColor text-2xl tracking-widest border-b-2 border-darkColor pb-3 w-full text-center uppercase">
              Horaires
            </h3>
            {hours ? (
              <ul className="w-full space-y-3">
                {DAYS.map((day, i) => {
                  const d = hours[i];
                  return (
                    <li key={day} className="flex justify-between items-start gap-8">
                      <span className="font-RedHatMonoLight text-darkColor/50 uppercase tracking-wider text-xs w-24">
                        {day}
                      </span>
                      {d.closedDay ? (
                        <span className="font-RedHatMonoLight text-darkColor/25 md:text-base text-sm tracking-wider">
                          Fermé
                        </span>
                      ) : (
                        <div className="flex flex-col items-end gap-0.5">
                          {!d.closedLunch && d.midi.debut && (
                            <span className="font-RedHatMonoLight text-darkColor md:text-base text-sm">
                              {d.midi.debut} – {d.midi.fin}
                            </span>
                          )}
                          {!d.closedDiner && d.soir.debut && (
                            <span className="font-RedHatMonoLight text-darkColor md:text-base text-sm">
                              {d.soir.debut} – {d.soir.fin}
                            </span>
                          )}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="font-RedHatMonoLight text-darkColor/40 text-xs tracking-wider">
                Horaires non disponibles
              </p>
            )}
          </div>

          {/* Infos pratiques */}
          <div className="flex flex-col items-center lg:items-start gap-4">
            <span className="font-RedHatMonoLight text-goldColor tracking-widest text-xs uppercase border-b border-goldColor/30 pb-2">
              Infos pratiques
            </span>
            <div className="flex items-center gap-3">
              <span className="font-RedHatMonoLight text-darkColor/60 text-xs tracking-wider">
                Modes de paiement :
              </span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="text-darkColor">
                      <CreditCard size={18} />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="bg-darkColor text-goldColor font-RedHatMonoLight text-xs">
                    <p>Carte de crédit</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="text-darkColor">
                      <Coins size={18} />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="bg-darkColor text-goldColor font-RedHatMonoLight text-xs">
                    <p>Espèces</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-RedHatMonoLight text-darkColor/60 text-xs tracking-wider">Animaux acceptés</p>
              <p className="font-RedHatMonoLight text-darkColor/60 text-xs tracking-wider">🇦🇷 Espagnol (Argentine)</p>
              <p className="font-RedHatMonoLight text-darkColor/60 text-xs tracking-wider">🇬🇧 Anglais</p>
              <p className="font-RedHatMonoLight text-darkColor/60 text-xs tracking-wider">🇫🇷 Français</p>
            </div>
          </div>
        </div>

        {/* ── Google Maps ──────────────────────────────────────── */}
        <div className="lg:w-1/2 h-[500px] lg:h-auto overflow-hidden">
          <iframe
            title="El Bodegon - 6 rue de la Fonderie, Toulouse"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2887.2945946748!2d1.4411018!3d43.5947521!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12aebd6fd0c0bdd3%3A0x8bb3a8d1c544df7!2sEl%20Bodeg%C3%B3n!5e0!3m2!1sfr!2sfr!4v1700000000000!5m2!1sfr!2sfr"
          />
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ContactPage;
