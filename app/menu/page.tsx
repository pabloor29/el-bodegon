import type { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";

export const dynamic = 'force-dynamic';
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

type MenuItem = {
  id: string;
  file_path: string;
  position: number;
};

async function getMenuItems(): Promise<MenuItem[]> {
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

  const { data: category, error: categoryError } = await supabase
    .from("menu_categories")
    .select("id")
    .eq("restaurant_id", process.env.RESTAURANT_ID!)
    .eq("name", "Menus")
    .single();

  if (categoryError || !category) return [];

  const { data, error } = await supabase
    .from("menu_files")
    .select("id, file_path, position")
    .eq("restaurant_id", process.env.RESTAURANT_ID!)
    .eq("category_id", category.id)
    .order("position", { ascending: true });

  if (error || !data) return [];
  return data as MenuItem[];
}

async function MenuPage() {
  const items = await getMenuItems();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;

  return (
    <>
      <Navbar />
      <CustomHeroBannerVideo title="Menu" video="/img/deco/bg_video.mp4" />

      <div className="w-full flex justify-center items-center bg-whiteSmokedBG">
        <div className="lg:w-3/5 w-11/12 flex flex-col items-center justify-center py-20 space-y-6">
          {items.map((item) => {
            const url = `${supabaseUrl}/storage/v1/object/public/menus/${item.file_path}`;
            return (
              <img
                key={item.id}
                className="w-full h-auto object-cover"
                src={url}
                alt={`Menu El Bodegon - page ${item.position + 1}`}
              />
            );
          })}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default MenuPage;
