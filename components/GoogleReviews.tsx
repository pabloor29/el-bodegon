"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const reviews = [
  {
    name: "Herrera Juan",
    rating: 5,
    date: "il y a 3 mois",
    text: "Des plats 100/100 typiques et fais maison , j'ai pu voyager en Argentine tout en restant aux Carmes , ils ont beaucoup évolué depuis leur ouverture de façon très positive, des très bons Crus argentins a déguster, le petit plus , les animations en live, aussi qualitatives que leur savoir faire en cuisine !!!! Merci",
  },
  {
    name: "Ana PH",
    rating: 5,
    date: "il y a 3 mois",
    text: "Super qualité, super saveurs qui m’ont fait voyager à mes origines en Argentine. Accueil super sympa et chaleureux par les propriétaires. Feliz de haber descubierto El Bodegón. Tremendo sandwich de milanesa! Lo super recomiendo a mis compatriotas!",
  },
  {
    name: "Sandro Toulouse carrelage",
    rating: 5,
    date: "il y a 5 mois",
    text: "Excellent ! J'ai adoré, la nourriture était très savoureuse et le personnel super sympathique. C'est le meilleur endroit pour manger ARGENTIN. De plus, les portions sont généreuses et les prix restent très raisonnables. Merci encore à Reneh et Camille pour votre gentillesse à très bientôt",
  },
  {
    name: "Maria Marchán",
    rating: 5,
    date: "il y a 6 mois",
    text: "Si tu veux plonger dans une ambiance argentine unique, viens manger une bonne milanesa avec du bon Malbec mendozino, pour finir avec leur glace artisanale de Dulce de Leche et le tout en écoutant un bon tango, du folklore ou bien du rock argentin avec des musiciens venus directement d'Argentine 😍🥰✨ Magnifique endroit !",
  },
  {
    name: "Benjamin Pasqualini",
    rating: 5,
    date: "il y a 11 mois",
    text: "Cuisine authentique argentine avec des ingrédients faits maisons et frais. Un vrai accueil et une qualité au rendez vous.",
  },
];

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
    transition: { duration: 0.2 },
  }),
};

export default function GoogleReviews() {
  const [[index, direction], setIndex] = useState([0, 0]);

  const paginate = (dir: number) => {
    setIndex([(index + dir + reviews.length) % reviews.length, dir]);
  };

  const review = reviews[index];

  return (
    <section className="w-full bg-darkColor py-20 flex flex-col items-center">
      <div className="flex flex-col items-center mb-10 space-y-3">
        <span className="font-RedHatMonoLight text-goldColor tracking-widest text-xs uppercase border-b border-goldColor/30 pb-2">
          Ce qu'ils en disent
        </span>
        <div className="flex items-center space-x-3">
          <svg width="24" height="24" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
          <h2 className="font-RedHatMonoLight text-goldColor text-3xl tracking-wide">Avis Google</h2>
        </div>
        <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
          ))}
          <span className="font-RedHatMonoLight text-goldColor/60 text-sm ml-2">5 / 5</span>
        </div>
      </div>

      <div className="w-full lg:w-2/5 md:w-3/5 relative flex items-center justify-center px-4">
        <button
          onClick={() => paginate(-1)}
          aria-label="Avis précédent"
          className="absolute left-0 z-10 p-2 text-goldColor/40 hover:text-goldColor transition-colors"
        >
          <ChevronLeft size={28} />
        </button>

        <div className="w-full overflow-hidden px-10">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="bg-darkColor border border-goldColor/20 p-8 flex flex-col space-y-4"
            >
              <div className="flex space-x-1">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="font-RedHatMonoLight text-goldColor/70 text-sm leading-relaxed">
                &ldquo;{review.text}&rdquo;
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-goldColor/10">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full border border-goldColor/40 flex items-center justify-center text-goldColor font-RedHatMonoLight text-xs">
                    {review.name[0]}
                  </div>
                  <div>
                    <p className="font-RedHatMonoLight text-goldColor text-xs">{review.name}</p>
                    <p className="font-RedHatMonoLight text-goldColor/30 text-xs">{review.date}</p>
                  </div>
                </div>
                <svg width="14" height="14" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className="opacity-30">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                </svg>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          onClick={() => paginate(1)}
          aria-label="Avis suivant"
          className="absolute right-0 z-10 p-2 text-goldColor/40 hover:text-goldColor transition-colors"
        >
          <ChevronRight size={28} />
        </button>
      </div>

      <div className="flex space-x-2 mt-8">
        {reviews.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex([i, i > index ? 1 : -1])}
            aria-label={`Aller à l'avis ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index ? "bg-goldColor w-6" : "bg-goldColor/20 w-1.5"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
