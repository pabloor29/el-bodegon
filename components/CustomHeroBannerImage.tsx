"use client";
import { Variants, motion } from "framer-motion";
import React from "react";

const textVariants: Variants = {
  hidden: { y: 60, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", duration: 1 },
  },
};

function CustomHeroBannerImage(props: any) {
  return (
    <div className="h-80 relative">
      <div className="w-full h-full bg-darkColor/70 z-40 absolute" />
      <img
        src={props.img}
        alt={props.title}
        className="h-full w-full object-cover absolute z-30"
      />
      <div className="relative z-40 h-full flex flex-col items-center justify-center gap-3 pt-24">
        <motion.h1
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={textVariants}
          className="font-RedHatMonoLight text-goldColor text-4xl lg:text-7xl tracking-widest border-t-2 border-b-2 border-goldColor py-2 px-6"
        >
          {props.title}
        </motion.h1>
      </div>
    </div>
  );
}

export default CustomHeroBannerImage;
