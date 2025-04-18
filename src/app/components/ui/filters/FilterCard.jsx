"use client";

import React, { useEffect, useRef } from "react";
import { useFilterContext } from "../../../context/FilterContext";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function FilterCard() {
  const {
    isFilterOpen,
    closeFilter,
    applyFilters,
    activeFilter,
    setActiveFilter,
    species,
    setSpecies,
    breed,
    setBreed,
    age,
    setAge,
    gender,
    setGender,
    size,
    setSize,
    resetFilters,
  } = useFilterContext();

  const cardRef = useRef(null);

  // Fonction pour fermer la popup si on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        closeFilter();
      }
    };

    if (isFilterOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFilterOpen, closeFilter]);

  // Options pour les différents filtres
  const speciesOptions = [
    { id: "dog", name: "Chien" },
    { id: "cat", name: "Chat" },
    { id: "rabbit", name: "Lapin" },
    { id: "rodent", name: "Rongeur" },
    { id: "reptile", name: "Reptile" },
  ];

  const breedOptions = {
    dog: ["Labrador", "Berger Allemand", "Bouledogue", "Caniche", "Beagle"],
    cat: ["Siamois", "Persan", "Maine Coon", "Bengal", "Sphynx"],
    rabbit: ["Lapin Nain", "Lapin Bélier", "Lapin Angora"],
    rodent: ["Hamster", "Souris", "Rat", "Chinchilla"],
    reptile: ["Lézard", "Serpent", "Tortue"],
  };

  const genderOptions = [
    { id: "male", name: "Mâle" },
    { id: "female", name: "Femelle" },
  ];

  const sizeOptions = [
    { id: "xs", name: "Très petit" },
    { id: "s", name: "Petit" },
    { id: "m", name: "Moyen" },
    { id: "l", name: "Grand" },
    { id: "xl", name: "Très grand" },
  ];

  // Gérer le changement d'âge pour le slider
  const handleAgeChange = (e) => {
    setAge([age[0], parseInt(e.target.value, 10)]);
  };

  // Fonction pour changer l'onglet actif
  const handleTabChange = (tab) => {
    setActiveFilter(tab);
  };

  // Si la popup n'est pas ouverte, ne rien afficher
  if (!isFilterOpen) return null;

  return (
    <AnimatePresence>
      {isFilterOpen && (
        <div className="backdrop-blur-sm fixed inset-0 z-50 flex justify-center items-end">
          <motion.div
            ref={cardRef}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              duration: 0.5,
            }}
            className="bg-white rounded-t-3xl w-full h-2/3 overflow-hidden flex flex-col"
          >
            {/* Header de la popup */}
            <div className="flex justify-between items-center p-4">
              <button onClick={closeFilter} className="text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <h2 className="text-lg font-semibold">Filtres</h2>
              <button onClick={resetFilters} className="text-blue-500 text-sm">
                Réinitialiser
              </button>
            </div>

            {/* Navigation par onglets */}
            <div className="flex px-4 py-2 overflow-x-auto">
              <button
                onClick={() => handleTabChange("all")}
                className={`px-3 py-1 mr-2 rounded-full ${
                  activeFilter === "all"
                    ? "bg-[#FFBC11] text-white"
                    : "bg-gray-100"
                }`}
              >
                Tout
              </button>
              <button
                onClick={() => handleTabChange("breed")}
                className={`px-3 py-1 mr-2 rounded-full ${
                  activeFilter === "breed"
                    ? "bg-[#FFBC11] text-white"
                    : "bg-gray-100"
                }`}
              >
                Race
              </button>
              <button
                onClick={() => handleTabChange("age")}
                className={`px-3 py-1 mr-2 rounded-full ${
                  activeFilter === "age"
                    ? "bg-[#FFBC11] text-white"
                    : "bg-gray-100"
                }`}
              >
                Âge
              </button>
              <button
                onClick={() => handleTabChange("gender")}
                className={`px-3 py-1 mr-2 rounded-full ${
                  activeFilter === "gender"
                    ? "bg-[#FFBC11] text-white"
                    : "bg-gray-100"
                }`}
              >
                Sexe
              </button>
              <button
                onClick={() => handleTabChange("size")}
                className={`px-3 py-1 mr-2 rounded-full ${
                  activeFilter === "size"
                    ? "bg-[#FFBC11] text-white"
                    : "bg-gray-100"
                }`}
              >
                Gabarit
              </button>
            </div>

            {/* Contenu des filtres basé sur l'onglet actif */}
            <div className="flex-1 overflow-y-auto p-4">
              {/* Filtre par espèce */}
              {(activeFilter === "all" || activeFilter === "species") && (
                <div className="mb-6">
                  <h3 className="text-md font-semibold mb-3">
                    Espèce d'animal
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {speciesOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setSpecies(option.id)}
                        className={`p-3 rounded-lg border text-left flex items-center ${
                          species === option.id
                            ? "border-[#FFBC11] bg-orange-50"
                            : "border-gray-300"
                        }`}
                      >
                        <span className="ml-2">{option.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Filtre par race */}
              {(activeFilter === "all" || activeFilter === "breed") && (
                <div className="mb-6">
                  <h3 className="text-md font-semibold mb-3">Race</h3>
                  {species ? (
                    <div className="grid grid-cols-2 gap-3">
                      {breedOptions[species]?.map((breedName, index) => (
                        <button
                          key={index}
                          onClick={() => setBreed(breedName)}
                          className={`p-3 rounded-lg border text-left ${
                            breed === breedName
                              ? "border-[#FFBC11] bg-orange-50"
                              : "border-gray-300"
                          }`}
                        >
                          {breedName}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">
                      Veuillez d'abord sélectionner une espèce
                    </p>
                  )}
                </div>
              )}

              {/* Filtre par âge */}
              {(activeFilter === "all" || activeFilter === "age") && (
                <div className="mb-6">
                  <h3 className="text-md font-semibold mb-3">Âge maximum</h3>
                  <div className="px-2">
                    <input
                      type="range"
                      min="0"
                      max="20"
                      value={age[1]}
                      onChange={handleAgeChange}
                      className="w-full"
                    />
                    <div className="flex justify-between mt-1">
                      <span>0 an</span>
                      <span>{age[1]} ans</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Filtre par sexe */}
              {(activeFilter === "all" || activeFilter === "gender") && (
                <div className="mb-6">
                  <h3 className="text-md font-semibold mb-3">Sexe</h3>
                  <div className="flex space-x-4">
                    {genderOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setGender(option.id)}
                        className={`flex-1 p-3 rounded-lg border text-center ${
                          gender === option.id
                            ? "border-[#FFBC11] bg-orange-50"
                            : "border-gray-300"
                        }`}
                      >
                        {option.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Filtre par gabarie (taille) */}
              {(activeFilter === "all" || activeFilter === "size") && (
                <div className="mb-6">
                  <h3 className="text-md font-semibold mb-3">Gabarie</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {sizeOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setSize(option.id)}
                        className={`p-3 rounded-lg border text-left ${
                          size === option.id
                            ? "border-[#FFBC11] bg-orange-50"
                            : "border-gray-300"
                        }`}
                      >
                        {option.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer avec boutons */}
            <div className="p-4">
              <div className="flex space-x-3">
                <button
                  onClick={closeFilter}
                  className="flex-1 py-3 bg-gray-100 rounded-lg font-medium"
                >
                  Retour
                </button>
                <button
                  onClick={applyFilters}
                  className="flex-1 py-3 bg-[#FFBC11] text-white rounded-lg font-medium"
                >
                  Continuer
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
