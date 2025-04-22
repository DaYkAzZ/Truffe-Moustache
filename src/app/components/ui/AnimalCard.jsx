"use client";

import React from "react";
import data from "../../data/data.json";
import Image from "next/image";
import { useFavorites } from "../../context/FavoritesContext";
import { useRouter } from "next/navigation";

export default function AnimalCard({
  selectedCategory,
  filteredAnimals,
  showOnlyFavorites = false,
}) {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const router = useRouter();
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
    return <div>Aucun animal trouvé.</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {animals.map((animal, index) => (
        <div
          key={`${animal.id}-${index}`}
          className="bg-white rounded-2xl overflow-hidden shadow-md transition-transform hover:shadow-lg cursor-pointer"
          onClick={() => {
            // Détermine la catégorie de l'animal par son espèce
            let category = "";
            if (animal.espece === "chien") category = "Chiens";
            else if (animal.espece === "chat") category = "Chats";
            else if (animal.espece === "rongeur") category = "Rongeur";
            else if (["lézard", "serpent"].includes(animal.espece))
              category = "Reptiles";
            // Redirige vers la page produit avec les paramètres nécessaires
            router.push(`/pages/Products?category=${category}&id=${animal.id}`);
            console.log(animal.espece);
          }}
        >
          {/* Image en haut occupant tout l'espace disponible */}
          <div className="relative w-full h-48 overflow-hidden">
            <Image
              src={animal.image}
              fill
              style={{ objectFit: "cover" }}
              alt={`Photo de ${animal.name}`}
              className="transition-transform hover:scale-105"
              unoptimized={animal.image.startsWith('https://')}
            />
          </div>

          {/* Contenu en bas */}
          <div className="p-4">
            {/* Section du nom et des tags */}
            <div className="flex flex-col space-y-3">
              {/* Nom de l'animal */}
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">{animal.name}</h2>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Empêche la propagation du clic
                    toggleFavorite(animal);
                  }}
                  className="focus:outline-none"
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
              {/* Tags */}
              <div className="flex justify-between items-center">
                <div>
                  <span className="px-4 mr-2 py-1.5 bg-[#FFBC11] text-white rounded-full text-sm font-medium">
                    {animal.race}
                  </span>
                  <span className="px-4 mr-2 py-1.5 bg-[#FFBC11] text-white rounded-full text-sm font-medium">
                    {animal.age} ans
                  </span>
                </div>
                <div className="bg-[#FFBC11] rounded-full p-2">
                  <Image
                    src={
                      animal.espece === "chien"
                        ? "/images/icons/dog.svg"
                        : animal.espece === "chat"
                        ? "/images/icons/cat.svg"
                        : [
                            "hamster",
                            "Cochon d'Inde",
                            "rat",
                            "souris",
                            "chinchilla",
                            "lapin",
                          ].includes(animal.espece)
                        ? "/images/icons/rabbit.svg"
                        : ["lézard", "serpent"].includes(animal.espece)
                        ? "/images/icons/snake.svg"
                        : "/images/icons/truffe.png"
                    }
                    width={24}
                    height={24}
                    alt="espece"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
