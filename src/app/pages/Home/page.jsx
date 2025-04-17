"use client";

import Navbar from "@/app/components/navigation/Navbar";
import FilterBar from "@/app/components/ui/FilterBar";
import AnimalFilterBar from "@/app/components/ui/AnimalFilter";
import React, { useState } from "react";
import Image from "next/image";
import TruffePastille from "@/app/components/ui/truffeAI/TruffePastille";
import TruffePopUp from "@/app/components/ui/truffeAI/TruffePopUp";
import AnimalCard from "@/app/components/ui/AnimalCard";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredAnimals, setFilteredAnimals] = useState(null);
  const [isTruffeOpen, setIsTruffeOpen] = useState(false);

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setFilteredAnimals(null); // reset si clic sur filtre
  };

  const handleTruffeResult = (animals) => {
    setFilteredAnimals(animals);
    setIsTruffeOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen mx-5 pb-20 overflow-scroll">
      {/* HEADER */}
      <div className="flex items-center justify-between my-6">
        <h1 className="text-3xl font-bold">J'adopte un compagnon</h1>
        <Image
          src="/images/icons/petsprint-active.svg"
          width={40}
          height={40}
          alt="Pets print"
        />
      </div>

      {/* FILTRES */}
      <div className="flex flex-col">
        <FilterBar />
        <AnimalFilterBar
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
        />
      </div>

      {/* TITRE */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold">
          {filteredAnimals
            ? `Résultats Truffe AI (${filteredAnimals.length})`
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
        <TruffePastille onOpen={() => setIsTruffeOpen(true)} />
        <Navbar />
      </div>

      {/* POPUP TRUFFE */}
      {isTruffeOpen && (
        <TruffePopUp
          onClose={() => setIsTruffeOpen(false)}
          onResult={handleTruffeResult}
        />
      )}
    </div>
  );
}
