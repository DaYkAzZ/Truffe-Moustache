"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  // Utiliser localStorage pour stocker les favoris (mais seulement côté client)
  const [favorites, setFavorites] = useState([]);

  // Charger les favoris depuis localStorage au montage du composant
  useEffect(() => {
    const storedFavorites = localStorage.getItem("animalFavorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Mettre à jour localStorage chaque fois que les favoris changent
  useEffect(() => {
    if (favorites.length > 0) {
      localStorage.setItem("animalFavorites", JSON.stringify(favorites));
    }
  }, [favorites]);

  // Ajouter ou supprimer un animal des favoris
  const toggleFavorite = (animal) => {
    setFavorites((prevFavorites) => {
      // Vérifier si l'animal est déjà dans les favoris
      const isAlreadyFavorite = prevFavorites.some(
        (fav) => fav.id === animal.id
      );

      if (isAlreadyFavorite) {
        // Si oui, le supprimer
        const updatedFavorites = prevFavorites.filter(
          (fav) => fav.id !== animal.id
        );
        localStorage.setItem("animalFavorites", JSON.stringify(updatedFavorites));
        return updatedFavorites;
      } else {
        // Sinon, l'ajouter
        const updatedFavorites = [...prevFavorites, animal];
        localStorage.setItem("animalFavorites", JSON.stringify(updatedFavorites));
        return updatedFavorites;
      }
    });
  };

  // Vérifier si un animal est dans les favoris
  const isFavorite = (animalId) => {
    return favorites.some((animal) => animal.id === animalId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

// Hook personnalisé pour utiliser le contexte
export function useFavorites() {
  return useContext(FavoritesContext);
}
