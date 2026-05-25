"use client";

import { Variants, motion } from "framer-motion";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import CustomHeroBannerVideo from "@/components/CustomHeroBannerVideo";
import React from "react";

const fadeLeft: Variants = {
  hidden: { x: 80, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { type: "spring", duration: 0.8 } },
};

const fadeRight: Variants = {
  hidden: { x: -80, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { type: "spring", duration: 0.8 } },
};

const fadeUp: Variants = {
  hidden: { y: 60, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", duration: 0.8 } },
};

function AboutPage() {
  return (
    <>
      <Navbar />
      <CustomHeroBannerVideo title="Notre Histoire" video="/img/deco/bg_video.mp4" />

      {/* ── L'histoire ─────────────────────────────────────────── */}
      <section className="w-full bg-whiteSmokedBG py-24">
        <div className="w-5/6 mx-auto flex flex-col lg:flex-row items-center gap-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20%" }}
            variants={fadeRight}
            className="lg:w-1/2 w-full"
          >
            <img
              src="/img/person/team-carbo-1.webp"
              alt="Les propriétaires d'El Bodegon - Restaurant Argentin à Toulouse"
              className="w-full object-cover shadow-2xl"
            />
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20%" }}
            variants={fadeLeft}
            className="lg:w-1/2 w-full flex flex-col gap-5"
          >
            <span className="font-RedHatMonoLight text-goldColor tracking-widest text-xs uppercase border-b border-goldColor/30 pb-2 w-fit">
              Nos Fondateurs
            </span>
            <h2 className="font-RedHatMonoLight text-darkColor text-4xl lg:text-5xl leading-tight">
              Deux Argentins<br />à Toulouse
            </h2>
            <article className="font-RedHatMonoLight text-darkColor/70 text-sm leading-relaxed">
              El Bodegon est né d'une conviction : la cuisine argentine méritait
              sa place à Toulouse. Nés et élevés en Argentine, nos fondateurs
              ont traversé l'Atlantique avec leurs recettes, leurs souvenirs et
              une envie folle de partager leur culture culinaire avec le monde.
            </article>
            <article className="font-RedHatMonoLight text-darkColor/70 text-sm leading-relaxed">
              Ici, tout est authentique. Les recettes viennent de leurs familles,
              les ingrédients sont soigneusement choisis, et chaque plat raconte
              une histoire — celle d'un pays où manger ensemble est bien plus
              qu'un repas, c'est un art de vivre.
            </article>
          </motion.div>
        </div>
      </section>

      {/* ── La cuisine ─────────────────────────────────────────── */}
      <section className="w-full bg-darkColor py-24">
        <div className="w-5/6 mx-auto flex flex-col lg:flex-row items-center gap-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20%" }}
            variants={fadeRight}
            className="lg:w-1/2 w-full flex flex-col gap-5"
          >
            <span className="font-RedHatMonoLight text-goldColor tracking-widest text-xs uppercase border-b border-goldColor/30 pb-2 w-fit">
              En Cuisine
            </span>
            <h2 className="font-RedHatMonoLight text-goldColor text-4xl lg:text-5xl leading-tight">
              Des Recettes<br />de Grand-Mère
            </h2>
            <article className="font-RedHatMonoLight text-goldColor/60 text-sm leading-relaxed">
              Derrière les fourneaux, la passion argentine s'exprime pleinement.
              Empanadas pliées à la main, asado cuit lentement, chimichurri
              préparé chaque matin — chaque recette est fidèle à celles que
              nos grandmères préparaient les dimanches à Buenos Aires.
            </article>
            <article className="font-RedHatMonoLight text-goldColor/60 text-sm leading-relaxed">
              Aucun compromis sur la qualité, aucune concession sur
              l'authenticité. Juste la vraie cuisine argentine, préparée avec
              amour, servie avec le sourire.
            </article>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20%" }}
            variants={fadeLeft}
            className="lg:w-1/2 w-full"
          >
            <img
              src="/img/person/louisa-1.webp"
              alt="Cuisine traditionnelle argentine - El Bodegon Toulouse"
              className="w-full object-cover shadow-2xl"
            />
          </motion.div>
        </div>
      </section>

      {/* ── L'accueil ──────────────────────────────────────────── */}
      <section className="w-full bg-whiteSmokedBG py-24">
        <div className="w-5/6 mx-auto flex flex-col lg:flex-row items-center gap-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20%" }}
            variants={fadeRight}
            className="lg:w-1/2 w-full"
          >
            <img
              src="/img/person/louis-1.webp"
              alt="Accueil chaleureux - El Bodegon Toulouse"
              className="w-full object-cover shadow-2xl"
            />
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20%" }}
            variants={fadeLeft}
            className="lg:w-1/2 w-full flex flex-col gap-5"
          >
            <span className="font-RedHatMonoLight text-goldColor tracking-widest text-xs uppercase border-b border-goldColor/30 pb-2 w-fit">
              En Salle
            </span>
            <h2 className="font-RedHatMonoLight text-darkColor text-4xl lg:text-5xl leading-tight">
              L'Hospitalité<br />Argentine
            </h2>
            <article className="font-RedHatMonoLight text-darkColor/70 text-sm leading-relaxed">
              En Argentine, on ne reçoit pas des clients — on reçoit des amis.
              C'est dans cet esprit qu'El Bodegon vous accueille : avec chaleur,
              générosité et la sincérité de ceux qui partagent ce qu'ils aiment.
            </article>
            <article className="font-RedHatMonoLight text-darkColor/70 text-sm leading-relaxed">
              Que vous soyez en amoureux, en famille ou entre amis, vous
              repartirez le cœur plein et l'envie de revenir.
            </article>
          </motion.div>
        </div>
      </section>

      {/* ── Citation ───────────────────────────────────────────── */}
      <section className="w-full bg-darkColor py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="w-5/6 lg:w-2/3 mx-auto flex flex-col items-center gap-6 text-center"
        >
          <p className="font-RedHatMonoLight text-goldColor/60 text-lg lg:text-xl leading-relaxed italic">
            &ldquo;La comida es el idioma universal del amor.&rdquo;
          </p>
          <span className="font-RedHatMonoLight text-goldColor/30 text-xs tracking-widest uppercase">
            — La nourriture est le langage universel de l'amour.
          </span>
        </motion.div>
      </section>

      <Footer />
    </>
  );
}

export default AboutPage;
