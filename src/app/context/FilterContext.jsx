"use client";

import React, { createContext, useState, useContext } from "react";

// Création du contexte
const FilterContext = createContext();

// Hook personnalisé pour utiliser le contexte des filtres
export const useFilterContext = () => useContext(FilterContext);

// Provider du contexte
export function FilterProvider({ children }) {
  // État pour contrôler l'affichage de la popup de filtres
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // État pour stocker le filtre actif à afficher dans la popup
  const [activeFilter, setActiveFilter] = useState("all");

  // États pour stocker les valeurs des différents filtres
  const [species, setSpecies] = useState(null);
  const [breed, setBreed] = useState(null);
  const [age, setAge] = useState([0, 20]); // Valeurs min et max pour le slider
  const [gender, setGender] = useState(null);
  const [size, setSize] = useState(null);

  // Fonction pour ouvrir la popup avec un filtre spécifique
  const openFilterWithTab = (tab) => {
    setActiveFilter(tab);
    setIsFilterOpen(true);
  };

  // Fonction pour fermer la popup
  const closeFilter = () => {
    setIsFilterOpen(false);
  };

  // Fonction pour appliquer les filtres
  const applyFilters = () => {
    // Logique pour appliquer les filtres
    closeFilter();
  };

  // Fonction pour réinitialiser les filtres
  const resetFilters = () => {
    setSpecies(null);
    setBreed(null);
    setAge([0, 20]);
    setGender(null);
    setSize(null);
  };

  // Valeurs à exposer via le contexte
  const value = {
    isFilterOpen,
    setIsFilterOpen,
    activeFilter,
    setActiveFilter,
    openFilterWithTab,
    closeFilter,
    applyFilters,
    resetFilters,
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
  };

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
}

export default FilterProvider;
