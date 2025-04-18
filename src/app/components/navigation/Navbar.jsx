"use client";

import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <motion.div
      className="bg-white fixed bottom-0 left-0 w-screen p-5 shadow-lg"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <div className="flex flex-row justify-center items-center">
        <motion.div
          className="mx-8"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <Link href="/pages/Home">
            {pathname === "/pages/Home" ? (
              <Image
                src="/images/icons/petsprint-active.svg" // Version orange de l'icône
                width={32}
                height={32}
                alt="icône pattes active"
              />
            ) : (
              <Image
                src="/images/icons/petsprint.svg" // Version normale de l'icône
                width={32}
                height={32}
                alt="icône pattes"
              />
            )}
          </Link>
        </motion.div>

        <motion.div
          className="mx-8"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <Link href="/pages/Niche">
            {pathname === "/pages/Niche" ? (
              <Image
                src="/images/icons/niche-active.svg" // Version orange de l'icône
                width={32}
                height={32}
                alt="icône niche active"
              />
            ) : (
              <Image
                src="/images/icons/niche.svg" // Version normale de l'icône
                width={32}
                height={32}
                alt="icône niche"
              />
            )}
          </Link>
        </motion.div>

        <motion.div
          className="mx-8"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <Link href="/pages/CoursDressage">
            {pathname === "/pages/CoursDressage" ? (
              <Image
                src="/images/icons/cours-active.svg" // Version orange de l'icône
                width={32}
                height={32}
                alt="icône cours dressage"
              />
            ) : (
              <Image
                src="/images/icons/cours.svg" // Version normale de l'icône
                width={32}
                height={32}
                alt="icône cours"
              />
            )}
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
