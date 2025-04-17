import Navbar from "@/app/components/navigation/Navbar";
import FilterBar from "@/app/components/ui/FilterBar";
import AnimalFilterBar from "@/app/components/ui/AnimalFilter";
import React from "react";
import Image from "next/image";
import TruffePastille from "@/app/components/ui/truffeAI/TruffePastille";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen mx-5">
      <div className="flex items-center justify-between my-10">
        <h1 className="text-3xl font-bold">J'adopte un compagnon</h1>
        <Image
          src="/images/icons/petsprint-active.svg"
          width={40}
          height={40}
          alt="Pets print"
        />
      </div>
      <div className="flex flex-col">
        <div>
          <FilterBar />
        </div>
        <div>
          <AnimalFilterBar />
        </div>
      </div>
      <div>
        <h2 className="text-lg">Ils ont besoins de vous</h2>
        <span>--card--</span>
      </div>
      <div className="mt-auto">
        <TruffePastille />
        <Navbar />
      </div>
    </div>
  );
}
