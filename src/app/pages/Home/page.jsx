"use client";

import Navbar from "@/app/components/navigation/Navbar";
import FilterBar from "@/app/components/ui/filters/FilterBar";
import FilterCard from "@/app/components/ui/filters/FilterCard";
import AnimalFilterBar from "@/app/components/ui/filters/AnimalFilter";
import React, { useState } from "react";
import Image from "next/image";
import TruffePastille from "@/app/components/ui/truffeAI/TruffePastille";
import { motion } from "framer-motion";
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
    <motion.div
      className="flex flex-col min-h-screen mx-5 pb-20 overflow-scroll"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      {/* HEADER */}
      <motion.div
        className="flex items-center justify-between my-6"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <h1 className="text-3xl font-bold">J'adopte un compagnon</h1>
        <Image
          src="/images/brand/logo.png"
          width={50}
          height={50}
          alt="Pets print"
        />
      </motion.div>

      {/* Filtres */}
      <motion.div
        className="sticky top-0"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.2 }}
      >
        <FilterBar />
      </motion.div>

      {/* Animal FILTRES */}
      <motion.div
        className="flex flex-col"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.3 }}
      >
        <AnimalFilterBar
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
        />
      </motion.div>

      {/* TITRE */}
      <motion.div
        className="mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.4 }}
      >
        <h2 className="text-lg font-semibold">
          {filteredAnimals
            ? `${truffeResults || "Animaux filtrés"} (${
                filteredAnimals.length
              })`
            : selectedCategory
            ? `Découvrez nos ${selectedCategory.toLowerCase()}`
            : "Ils ont besoin de vous"}
        </h2>
      </motion.div>

      {/* ANIMAUX */}
      <motion.div
        className="flex-grow"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.5 }}
      >
        <AnimalCard
          selectedCategory={selectedCategory}
          filteredAnimals={filteredAnimals}
        />
      </motion.div>

      {/* FOOTER */}
      <motion.div
        className="mb-20"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.6 }}
      >
        <TruffePastille
          onOpen={() => setIsTruffeOpen(true)}
          onResult={handleTruffeResult}
        />
      </motion.div>
      <Navbar />

      {/* Popup de filtres */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.7 }}
      >
        <FilterCard />
      </motion.div>
    </motion.div>
  );
}
