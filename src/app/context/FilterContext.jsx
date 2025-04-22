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

  // État pour stocker les animaux filtrés
  const [filteredAnimals, setFilteredAnimals] = useState([]);
  
  // Fonction pour appliquer les filtres
  const applyFilters = () => {
    // Importer les données
    const data = require('../data/data.json');
    
    // Commencer avec tous les animaux
    let allAnimals = [];
    
    // Si une espèce spécifique est sélectionnée, utiliser cette catégorie
    if (species) {
      const categoryKey = 
        species === 'dog' ? 'Chiens' : 
        species === 'cat' ? 'Chats' : 
        species === 'reptile' ? 'Reptiles' : 
        species === 'rodent' ? 'Rongeur' : null;
      
      if (categoryKey && data[categoryKey]) {
        allAnimals = [...data[categoryKey]];
      }
    } else {
      // Sinon prendre tous les animaux
      Object.values(data).forEach(category => {
        allAnimals = [...allAnimals, ...category];
      });
    }
    
    // Appliquer les filtres
    const filtered = allAnimals.filter(animal => {
      // Filtre par race
      if (breed && animal.race !== breed) return false;
      
      // Filtre par âge
      if (age && animal.age > age[1]) return false;
      
      // Filtre par sexe
      if (gender) {
        const genderMatch = 
          gender === 'male' ? animal.sexe === 'mâle' : 
          gender === 'female' ? animal.sexe === 'femelle' : true;
        if (!genderMatch) return false;
      }
      
      // Filtre par taille/gabarit
      if (size) {
        const sizeMatch = 
          size === 'xs' ? animal.gabarit === 'très petit' : 
          size === 's' ? animal.gabarit === 'petit' : 
          size === 'm' ? animal.gabarit === 'moyen' : 
          size === 'l' ? animal.gabarit === 'grand' : 
          size === 'xl' ? animal.gabarit === 'très grand' : true;
        if (!sizeMatch) return false;
      }
      
      return true;
    });
    
    // Mettre à jour l'état avec les animaux filtrés
    setFilteredAnimals(filtered);
    
    // Fermer la popup
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
    filteredAnimals,
    setFilteredAnimals
  };

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
}

export default FilterProvider;
