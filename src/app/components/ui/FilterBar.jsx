import React from "react";
import Image from "next/image";

export default function FilterBar() {
  return (
    <div className="flex items-center justify-between">
      <div className="bg-[#FFBC11] flex items-center p-2 rounded-full">
        <Image
          src="/images/icons/filterSettings.svg"
          width={25}
          height={25}
          alt="filter parameter"
        />
      </div>
      <div className="rounded-3xl border-gray-400 border-1 p-2 m-1">Race</div>
      <div className="rounded-3xl border-gray-400 border-1 p-2 m-1">
        Gabarie
      </div>
      <div className="rounded-3xl border-gray-400 border-1 p-2 m-1">Âge</div>
      <div className="rounded-3xl border-gray-400 border-1 p-2 m-1">Sexe</div>
    </div>
  );
}
