"use client";

import { Variants, motion } from "framer-motion";
import Link from "next/link";
import React from "react";

const fadeUp: Variants = {
  hidden: { y: 60, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", duration: 0.9 },
  },
};

const fadeLeft: Variants = {
  hidden: { x: 80, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", duration: 0.9 },
  },
};

const fadeRight: Variants = {
  hidden: { x: -80, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", duration: 0.9 },
  },
};

const dishes = [
  {
    title: "Empanadas",
    description:
      "Chaussons dorés garnis de viande, d'oignon et d'épices, cuits au four selon la recette familiale transmise de génération en génération.",
  },
  {
    title: "Asado",
    description:
      "L'art du barbecue argentin — viandes d'exception saisies à feu vif, servies avec chimichurri maison et accompagnements généreux.",
  },
  {
    title: "Dulce de leche",
    description:
      "Le trésor sucré de l'Argentine. Retrouvez-le dans nos desserts maison : alfajores, flans et créations gourmandes qui concluent chaque repas en beauté.",
  },
];

function IntroRestaurant() {
  return (
    <>
      {/* ── SECTION 1 : Présentation ─────────────────────────────── */}
      <section className="w-full bg-whiteSmokedBG py-24">
        <div className="w-5/6 mx-auto flex flex-col lg:flex-row items-center gap-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-15%" }}
            variants={fadeRight}
            className="lg:w-1/2 w-full"
          >
            <img
              src="/img/deco/argentina-flag.webp"
              alt="El Bodegon - Restaurant Argentin à Toulouse, cuisine traditionnelle"
              className="w-full object-cover rounded-sm shadow-2xl aspect-square"
            />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-15%" }}
            variants={fadeLeft}
            className="lg:w-1/2 w-full flex flex-col gap-6"
          >
            <span className="font-RedHatMonoLight text-goldColor tracking-widest text-xs uppercase border-b border-goldColor/30 pb-2 w-fit">
              Restaurant Argentin · Toulouse
            </span>
            <h2 className="font-RedHatMonoLight text-darkColor text-4xl lg:text-5xl leading-tight">
              L'Âme de<br />l'Argentine
            </h2>
            <article className="font-RedHatMonoLight text-darkColor/70 text-sm leading-relaxed">
              Au cœur de Toulouse, El Bodegon vous invite à un voyage culinaire
              au cœur de l'Argentine. Fondé par deux passionnés originaires de
              Buenos Aires, notre restaurant perpétue les recettes authentiques
              et les saveurs d'un pays où la table est un art de vivre. Des
              empanadas croustillantes à l'asado fumant, chaque plat est une
              déclaration d'amour à la cuisine de nos terres.
            </article>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/menu"
                className="font-RedHatMonoLight text-sm tracking-widest border-2 border-darkColor text-darkColor px-6 py-3 hover:bg-darkColor hover:text-goldColor transition-colors duration-200"
              >
                VOIR LA CARTE
              </Link>
              <Link
                href="/reservation"
                className="font-RedHatMonoLight text-sm tracking-widest bg-darkColor text-goldColor border-2 border-darkColor px-6 py-3 hover:bg-transparent hover:text-darkColor transition-colors duration-200"
              >
                RÉSERVER UNE TABLE
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 2 : Les propriétaires ────────────────────────── */}
      <section className="w-full bg-darkColor py-24">
        <div className="w-5/6 mx-auto flex flex-col lg:flex-row items-center gap-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-15%" }}
            variants={fadeUp}
            className="lg:w-1/2 w-full flex flex-col gap-6"
          >
            <span className="font-RedHatMonoLight text-goldColor tracking-widest text-xs uppercase border-b border-goldColor/30 pb-2 w-fit">
              Nos Fondateurs
            </span>
            <h2 className="font-RedHatMonoLight text-goldColor text-4xl lg:text-5xl leading-tight">
              Authentiquement<br />Argentins
            </h2>
            <article className="font-RedHatMonoLight text-goldColor/60 text-sm leading-relaxed">
              Derrière chaque plat, il y a une histoire. Nés et élevés en
              Argentine, nos fondateurs ont grandi au rythme des asados
              dominicaux, des empanadas préparées en famille et du mate partagé
              entre amis. En s'installant à Toulouse, leur envie était simple :
              faire vivre leur culture à travers la cuisine, et offrir à chacun
              un bout d'Argentine à table.
            </article>
            <article className="font-RedHatMonoLight text-goldColor/60 text-sm leading-relaxed">
              Ici, rien n'est laissé au hasard. Les recettes sont celles de
              leurs grandmères, les produits sont soigneusement sélectionnés,
              et l'accueil est celui qu'on réserve aux amis de toujours.
              Bienvenue à El Bodegon — bienvenue chez eux.
            </article>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-15%" }}
            variants={fadeLeft}
            className="lg:w-1/2 w-full"
          >
            <img
              src="/img/person/team-carbo-1.webp"
              alt="Les propriétaires d'El Bodegon - Restaurant Argentin à Toulouse"
              className="w-full object-cover rounded-sm shadow-2xl"
            />
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 3 : La cuisine ────────────────────────────────── */}
      <section className="w-full bg-whiteSmokedBG py-24">
        <div className="w-5/6 mx-auto flex flex-col items-center gap-14">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={fadeUp}
            className="flex flex-col items-center gap-3 text-center"
          >
            <span className="font-RedHatMonoLight text-goldColor tracking-widest text-xs uppercase border-b border-goldColor/30 pb-2">
              Cuisine Traditionnelle
            </span>
            <h2 className="font-RedHatMonoLight text-darkColor text-4xl lg:text-5xl">
              Nos Spécialités
            </h2>
            <p className="font-RedHatMonoLight text-darkColor/60 text-sm max-w-xl leading-relaxed">
              Chaque plat est préparé avec soin, dans le respect des traditions
              culinaires argentines — des saveurs franches, des portions
              généreuses, et un savoir-faire transmis avec passion.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {dishes.map((dish, i) => (
              <motion.div
                key={dish.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-10%" }}
                variants={{
                  hidden: { y: 40, opacity: 0 },
                  visible: {
                    y: 0,
                    opacity: 1,
                    transition: { type: "spring", duration: 0.8, delay: i * 0.15 },
                  },
                }}
                className="flex flex-col gap-4 border-t-2 border-darkColor pt-6"
              >
                <h3 className="font-RedHatMonoLight text-darkColor text-2xl tracking-wide">
                  {dish.title}
                </h3>
                <p className="font-RedHatMonoLight text-darkColor/60 text-sm leading-relaxed">
                  {dish.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="flex flex-wrap gap-4 justify-center pt-4"
          >
            <Link
              href="/menu"
              className="font-RedHatMonoLight text-sm tracking-widest bg-darkColor text-goldColor border-2 border-darkColor px-8 py-3 hover:bg-transparent hover:text-darkColor transition-colors duration-200"
            >
              DÉCOUVRIR NOTRE MENU
            </Link>
            <Link
              href="/reservation"
              className="font-RedHatMonoLight text-sm tracking-widest border-2 border-darkColor text-darkColor px-8 py-3 hover:bg-darkColor hover:text-goldColor transition-colors duration-200"
            >
              RÉSERVER UNE TABLE
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default IntroRestaurant;
