"use client";

import React from "react";
import data from "../../data/data.json";
import Image from "next/image";
import { useFavorites } from "../../context/FavoritesContext";

export default function AnimalCard({
  selectedCategory,
  filteredAnimals,
  showOnlyFavorites = false,
}) {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  let animals = [];

  if (showOnlyFavorites) {
    animals = favorites;
  } else if (filteredAnimals) {
    animals = filteredAnimals;
  } else if (!selectedCategory) {
    // Mode "Tous" - prendre tous les animaux de toutes les catégories
    const categories = ["Chiens", "Chats", "Rongeur", "Reptiles"];
    animals = categories.flatMap((category) => data[category] || []); // Combiner tous les animaux de toutes les catégories
  } else {
    animals = data[selectedCategory] || [];
  }

  if (animals.length === 0) {
    return <div className="text-center py-4">Aucun animal trouvé.</div>;
  }

  return (
    <div>
      {animals.map((animal, index) => (
        <div
          key={`${animal.id}-${index}`}
          className="bg-white shadow-sm p-5 my-4 rounded-lg"
        >
          <div className="flex flex-col items-center justify-between">
            <div className="object-contain">
              {/* <Image src={animal.image} width={150} height={150} alt="image" /> */}
            </div>
            <div className="flex items-center justify-between w-full mt-4">
              <h2 className="text-lg font-bold">{animal.name}</h2>
              <div className="flex flex-wrap">
                <span className="mr-2 px-2 py-1 bg-[#FFBC11] text-white rounded-full text-sm">
                  {animal.race}
                </span>
                <span className="mr-2 px-2 py-1 bg-[#FFBC11] text-white rounded-full text-sm">
                  {animal.age} ans
                </span>
              </div>
              <div className="flex items-center">
                <Image
                  src={
                    animal.espece === "chien"
                      ? "/images/icons/dog.svg"
                      : animal.espece === "chat"
                      ? "/images/icons/cat.svg"
                      : [
                          "hamster",
                          "cochon d'inde",
                          "rat",
                          "souris",
                          "chinchilla",
                        ].includes(animal.espece)
                      ? "/images/icons/rabbit.svg"
                      : ["lézard", "serpent"].includes(animal.espece)
                      ? "/images/icons/snake.svg"
                      : "/images/icons/truffe.png"
                  }
                  width={40}
                  height={40}
                  alt="espece"
                />
                <button
                  onClick={() => toggleFavorite(animal)}
                  className="ml-2"
                  aria-label={
                    isFavorite(animal.id)
                      ? "Retirer des favoris"
                      : "Ajouter aux favoris"
                  }
                >
                  {isFavorite(animal.id) ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="#FF4136"
                      stroke="#FF4136"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
