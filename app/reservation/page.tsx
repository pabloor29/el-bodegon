import type { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";

export const dynamic = 'force-dynamic';
import ContactForm from "@/components/ContactForm";
import type { DayHours } from "@/components/ContactForm";
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

// Expands a {debut, fin} period into every individual date string YYYY-MM-DD
function expandPeriod(debut: string, fin: string): string[] {
  const dates: string[] = [];
  const current = new Date(debut);
  const end = new Date(fin);
  while (current <= end) {
    const y = current.getFullYear();
    const m = String(current.getMonth() + 1).padStart(2, "0");
    const d = String(current.getDate()).padStart(2, "0");
    dates.push(`${y}-${m}-${d}`);
    current.setDate(current.getDate() + 1);
  }
  return dates;
}

async function getReservationData(): Promise<{
  openingHours: DayHours[] | null;
  blockedDates: string[];
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

  const [hoursResult, closedDaysResult, holidaysResult] = await Promise.all([
    supabase
      .from("opening_hours")
      .select("hours")
      .eq("restaurant_id", restaurantId)
      .single(),
    supabase
      .from("closed_days")
      .select("days")
      .eq("restaurant_id", restaurantId)
      .maybeSingle(),
    supabase
      .from("holidays")
      .select("periods")
      .eq("restaurant_id", restaurantId)
      .maybeSingle(),
  ]);

  const openingHours: DayHours[] | null = hoursResult.data?.hours ?? null;
  const closedDays: string[] = closedDaysResult.data?.days ?? [];

  const holidayPeriods: { debut: string; fin: string }[] =
    holidaysResult.data?.periods ?? [];
  const holidayDates: string[] = holidayPeriods.flatMap((p) =>
    expandPeriod(p.debut, p.fin)
  );

  return { openingHours, blockedDates: [...closedDays, ...holidayDates] };
}

async function ReservationPage() {
  const { openingHours, blockedDates } = await getReservationData();

  return (
    <>
      <Navbar />
      <CustomHeroBannerVideo title="Réservation" video="/img/deco/bg_video.mp4" />
      <ContactForm openingHours={openingHours} blockedDates={blockedDates} />
      <Footer />
    </>
  );
}

export default ReservationPage;
