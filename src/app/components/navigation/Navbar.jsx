"use client";

import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className="bg-white fixed bottom-0 left-0 w-screen p-5">
      <div className="flex flex-row justify-center items-center">
        <div className="mx-8">
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
        </div>

        <div className="mx-8">
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
        </div>

        <div className="mx-8">
          <Link href="/Products">
            {pathname === "/" ? (
              <Image
                src="/images/icons/cours-active.svg" // Version orange de l'icône
                width={32}
                height={32}
                alt="icône compte active"
              />
            ) : (
              <Image
                src="/images/icons/cours.svg" // Version normale de l'icône
                width={32}
                height={32}
                alt="icône compte"
              />
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}
