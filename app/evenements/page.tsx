import type { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";
import CustomHeroBannerVideo from "@/components/CustomHeroBannerVideo";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";

export const metadata: Metadata = {
  title: "Événements",
  description: "El Bodegon accueille vos événements privés à Toulouse : anniversaires, repas d'entreprise, asado privatif. Restaurant argentin privatisable, 6 rue de la Fonderie.",
  alternates: {
    canonical: "https://www.elbodegon-toulouse.fr/evenements",
  },
};

const MONTHS = [
  "janvier", "février", "mars", "avril", "mai", "juin",
  "juillet", "août", "septembre", "octobre", "novembre", "décembre",
];

function formatEventDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  return `${day} ${MONTHS[month - 1]} ${year}`;
}

type EventWithFiles = {
  id: string;
  event_date: string;
  files: { file_path: string; position: number }[];
};

async function getEventsData(): Promise<{
  upcoming: EventWithFiles | null;
  past: EventWithFiles[];
}> {
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

  const restaurantId = process.env.RESTAURANT_ID!;
  const today = new Date().toISOString().split("T")[0];

  const [upcomingResult, pastResult] = await Promise.all([
    supabase
      .from("restaurant_events")
      .select("id, event_date, event_files(file_path, position)")
      .eq("restaurant_id", restaurantId)
      .gte("event_date", today)
      .order("event_date", { ascending: true })
      .limit(1)
      .maybeSingle(),
    supabase
      .from("restaurant_events")
      .select("id, event_date, event_files(file_path, position)")
      .eq("restaurant_id", restaurantId)
      .lt("event_date", today)
      .order("event_date", { ascending: false }),
  ]);

  const toEventWithFiles = (raw: any): EventWithFiles => ({
    id: raw.id,
    event_date: raw.event_date,
    files: (raw.event_files ?? []).sort(
      (a: any, b: any) => a.position - b.position
    ),
  });

  const upcoming = upcomingResult.data
    ? toEventWithFiles(upcomingResult.data)
    : null;

  const past = (pastResult.data ?? []).map(toEventWithFiles);

  return { upcoming, past };
}

async function EvenementsPage() {
  const { upcoming, past } = await getEventsData();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;

  return (
    <>
      <Navbar />
      <CustomHeroBannerVideo title="Événements" video="/img/deco/bg_video.mp4" />

      {/* ── Événement à venir ──────────────────────────────────── */}
      {upcoming && (
        <section className="w-full bg-darkColor py-16">
          <div className="w-5/6 mx-auto flex flex-col lg:flex-row items-center gap-12">

            {/* Affiche */}
            {upcoming.files[0] && (
              <div className="lg:w-1/2 w-full flex justify-center">
                <img
                  src={`${supabaseUrl}/storage/v1/object/public/events/${upcoming.files[0].file_path}`}
                  alt={`Événement El Bodegon – ${formatEventDate(upcoming.event_date)}`}
                  className="w-full max-w-md h-auto object-cover"
                />
              </div>
            )}

            {/* Texte */}
            <div className="lg:w-1/2 w-full flex flex-col gap-6">
              <span className="font-RedHatMonoLight text-goldColor/60 tracking-widest text-xs uppercase border-b border-goldColor/30 pb-2 w-fit">
                Prochain événement
              </span>
              <p className="font-RedHatMonoLight text-goldColor text-3xl lg:text-4xl tracking-widest uppercase">
                {formatEventDate(upcoming.event_date)}
              </p>
              <p className="font-RedHatMonoLight text-goldColor/60 text-sm leading-relaxed max-w-md">
                El Bodegon vous invite à vivre des soirées exceptionnelles au cœur de Toulouse.
                Concerts de musique latine, nuits de tango argentin, soirées à thème et
                dégustations de vins — chaque événement est une invitation à plonger dans
                la culture et la convivialité argentines.
              </p>
            </div>

          </div>
        </section>
      )}

      {/* ── Galerie événements passés ──────────────────────────── */}
      {past.length > 0 && (
        <section className="w-full bg-whiteSmokedBG py-16">
          <div className="w-5/6 mx-auto flex flex-col gap-10">
            <div className="flex flex-col items-center gap-2 text-center">
              <span className="font-RedHatMonoLight text-goldColor tracking-widest text-xs uppercase border-b border-goldColor/30 pb-2">
                Événements passés
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {past.flatMap((event) =>
                event.files.map((file, i) => (
                  <div key={`${event.id}-${i}`} className="flex flex-col gap-2">
                    <img
                      src={`${supabaseUrl}/storage/v1/object/public/events/${file.file_path}`}
                      alt={`Événement El Bodegon – ${formatEventDate(event.event_date)}`}
                      className="w-full h-auto object-cover"
                    />
                    <p className="font-RedHatMonoLight text-darkColor/40 text-xs tracking-widest text-center uppercase">
                      {formatEventDate(event.event_date)}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </>
  );
}

export default EvenementsPage;
