"use client";

import { Variants, motion } from "framer-motion";
import React from "react";

const textVariants: Variants = {
  hidden: {
    y: 100,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 1,
    },
  },
};

function HeroBanner() {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="h-screen w-full flex justify-center items-center bg-darkColor absolute z-10"></div>
      <div className="relative z-20 flex flex-col items-center justify-center leading-none">
        <motion.h1
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={textVariants}
          className="tracking-wide z-30 md:w-2/3 w-4/5 mb-8"
        >
          <img 
            src="img/deco/argentina-flag.webp" 
            alt="El Bodegon - Restaurant Argentin à Toulouse"
            className="rounded-full border-8 border-goldColor w-60 h-60 object-cover mb-5 mx-auto"
          />
        </motion.h1>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={textVariants}
          className="tracking-wide z-30 md:w-2/3 w-4/5"
        >
          <h1 className="text-goldColor text-center font-RedHatMonoLight border-t-2 border-b-2 border-goldColor py-2 lg:text-6xl md:text-5xl text-4xl whitespace-nowrap">
            EL BODEGON
          </h1>
        </motion.div>
        <motion.h3
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={textVariants}
          className="z-10 text-goldColor text-center font-RedHatMonoLight lg:text-3xl md:text-2xl text-lg pt-10"
        >
          Restaurant Argentin · Toulouse
        </motion.h3>
      </div>
    </div>
  );
}

export default HeroBanner;
