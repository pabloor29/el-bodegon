import type { Metadata } from "next";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Notre Histoire",
  description: "Découvrez l'histoire d'El Bodegon : des propriétaires argentins passionnés qui ont apporté la vraie cuisine de Buenos Aires au cœur de Toulouse. Un restaurant authentique, chaleureux et convivial.",
  alternates: {
    canonical: "https://www.elbodegon-toulouse.fr/apropos",
  },
};

export default function AproposLayout({ children }: { children: React.ReactNode }) {
  return children;
}
