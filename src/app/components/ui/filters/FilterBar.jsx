"use client";

import React from "react";
import Image from "next/image";
import { useFilterContext } from "../../../context/FilterContext";

export default function FilterBar() {
  const { openFilterWithTab } = useFilterContext();

  return (
    <div className="flex items-center justify-between">
      <div
        onClick={() => openFilterWithTab("all")}
        className="bg-[#FFBC11] flex items-center p-2 rounded-full cursor-pointer"
      >
        <Image
          src="/images/icons/filterSettings.svg"
          width={25}
          height={25}
          alt="filter parameter"
        />
      </div>
      <div
        className="rounded-3xl border-gray-400 border-1 p-2 m-1 cursor-pointer"
        onClick={() => openFilterWithTab("breed")}
      >
        Race
      </div>
      <div
        className="rounded-3xl border-gray-400 border-1 p-2 m-1 cursor-pointer"
        onClick={() => openFilterWithTab("size")}
      >
        Gabarit
      </div>
      <div
        className="rounded-3xl border-gray-400 border-1 p-2 m-1 cursor-pointer"
        onClick={() => openFilterWithTab("age")}
      >
        Âge
      </div>
      <div
        className="rounded-3xl border-gray-400 border-1 p-2 m-1 cursor-pointer"
        onClick={() => openFilterWithTab("gender")}
      >
        Sexe
      </div>
    </div>
  );
}
