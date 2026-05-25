"use client";

import React from "react";
import { AlignJustify, Utensils } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "./ui/sheet";
import Link from "next/link";
import { Variants, motion } from "framer-motion";

const links = [
  {
    label: "ACCUEIL",
    href: "/",
  },
  {
    label: "MENU",
    href: "/menu",
  },
  {
    label: "FORMULES",
    href: "/formules",
  },
  {
    label: "ÉVÉNEMENTS",
    href: "/evenements",
  },
  {
    label: "CONTACT",
    href: "/contact",
  },
];

const Variants: Variants = {
  hidden: {
    y: -100,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "linear",
      duration: 1,
      delay: 0.5,
    },
  },
};

function Navbar() {
  return (
    <nav className="w-full">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "30%" }}
        variants={Variants}
        className="fixed w-full h-24 backdrop-blur justify-between items-center text-white px-8 z-50 hidden lg:flex bg-darkColor/50"
      >
        <a href="/" className="py-2 flex flex-row items-center gap-4">
          <img 
            src="img/deco/argentina-flag.webp" 
            alt="Logo El Bodegon - Restaurant Argentin à Toulouse"
            className="rounded-full border-4 border-goldColor w-20 h-20 object-cover mx-auto"
          />
          <h2 className="text-goldColor font-RedHatMonoLight lg:text-2xl border-t-2 border-b-2 border-goldColor py-1">
            EL BODEGON
          </h2>
        </a>
        <div>
          <li className="flex justify-center space-x-12">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative overflow-hidden group leading-none text-goldColor font-RedHatMonoLight text-xl px-3 py-1 hover:border-t-2 hover:border-b-2 border-goldColor"
              >
                <span className="relative z-10">{link.label}</span>
              </a>
            ))}
          </li>
        </div>
        <Link
          href="/reservation"
          className="leading-none border-2 px-2 py-2 border-goldColor text-goldColor hover:text-darkColor hover:bg-goldColor font-RedHatMonoLight text-2xl"
        >
          RÉSERVATION
        </Link>
      </motion.div>

      <div className="lg:hidden fixed top-6 z-50 flex justify-between w-full px-6">
        <Sheet key="left">
          <SheetTrigger className="overflow-hidden flex justify-center items-center w-10 h-10 rounded-full shadow bg-goldColor/70">
            <AlignJustify className="text-darkColor" />
          </SheetTrigger>
          <SheetContent className="bg-darkColor/90 backdrop-blur">
            <SheetHeader>
              <SheetDescription className="h-full flex flex-col justify-between">
                <div className="mb-28">
                  {links.map((items) => (
                    <a
                      key={items.label}
                      href={items.href}
                      className="overflow-hidden h-20 w-4/5 flex items-center text-goldColor px-5 py-3"
                    >
                      <h3 className="font-RedHatMonoLight text-3xl tracking-wide">
                        {items.label}
                      </h3>
                    </a>
                  ))}
                  <a
                    href="/reservation"
                    className="overflow-hidden h-20 w-4/5 flex items-center px-5 py-3 cursor-pointer"
                  >
                    <h3 className="font-RedHatMonoLight text-goldColor text-3xl tracking-wide">
                      RÉSERVATION
                    </h3>
                  </a>
                </div>
                <div className="">
                  <img 
                    src="img/deco/argentina-flag.webp" 
                    alt="Logo El Bodegon - Restaurant Argentin à Toulouse"
                    className="rounded-full border-4 border-goldColor w-36 h-36 object-cover mx-auto"
                  />
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
        <a
          href="/reservation"
          className="shadow cursor-pointer overflow-hidden h-10 px-3 rounded-full bg-goldColor/70 flex items-center justify-center"
        >
          <h3 className="font-RedHatMonoLight text-2xl tracking-wide text-darkColor">
            RÉSERVER
          </h3>
        </a>
        {/* <a href="/reservation" className="shadow cursor-pointer overflow-hidden w-10 h-10 rounded-full bg-white flex items-center justify-center">
          <Utensils />
        </a> */}
      </div>
    </nav>
  );
}

export default Navbar;
