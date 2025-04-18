"use client";

import Navbar from "@/app/components/navigation/Navbar";
import FilterBar from "@/app/components/ui/filters/FilterBar";
import FilterCard from "@/app/components/ui/filters/FilterCard";
import AnimalFilterBar from "@/app/components/ui/filters/AnimalFilter";
import React, { useState } from "react";
import Image from "next/image";
import TruffePastille from "@/app/components/ui/truffeAI/TruffePastille";
// TruffePopUp est maintenant géré par TruffePastille
import AnimalCard from "@/app/components/ui/AnimalCard";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredAnimals, setFilteredAnimals] = useState(null);
  const [isTruffeOpen, setIsTruffeOpen] = useState(false);
  const [truffeResults, setTruffeResults] = useState(null);

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setFilteredAnimals(null); // reset si clic sur filtre
    setTruffeResults(null); // réinitialiser les résultats de Truffe
  };

  const handleTruffeResult = (animals) => {
    setFilteredAnimals(animals);
    setTruffeResults("Résultats de Truffe AI");
    setIsTruffeOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen mx-5 pb-20 overflow-scroll">
      {/* HEADER */}
      <div className="flex items-center justify-between my-6">
        <h1 className="text-3xl font-bold">J'adopte un compagnon</h1>
        <Image
          src="/images/brand/logo.png"
          width={50}
          height={50}
          alt="Pets print"
        />
      </div>

      {/* Filtres */}
      <div className="sticky top-0">
        <FilterBar />
      </div>

      {/* Animal FILTRES */}
      <div className="flex flex-col">
        <AnimalFilterBar
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
        />
      </div>

      {/* TITRE */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold">
          {filteredAnimals
            ? `${truffeResults || "Animaux filtrés"} (${
                filteredAnimals.length
              })`
            : selectedCategory
            ? `Découvrez nos ${selectedCategory.toLowerCase()}`
            : "Ils ont besoin de vous"}
        </h2>
      </div>

      {/* ANIMAUX */}
      <div className="flex-grow">
        <AnimalCard
          selectedCategory={selectedCategory}
          filteredAnimals={filteredAnimals}
        />
      </div>

      {/* FOOTER */}
      <div className="mb-20">
        <TruffePastille
          onOpen={() => setIsTruffeOpen(true)}
          onResult={handleTruffeResult}
        />
        <Navbar />
      </div>

      {/* Popup de filtres */}
      <FilterCard />
    </div>
  );
}
