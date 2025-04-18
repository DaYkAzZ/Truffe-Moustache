"use client";

import React from "react";
import Navbar from "@/app/components/navigation/Navbar";
import AnimalCard from "@/app/components/ui/AnimalCard";
import { useFavorites } from "@/app/context/FavoritesContext";

export default function Niche() {
  const { favorites } = useFavorites();

  return (
    <div className="flex flex-col min-h-screen mx-5 pb-20 overflow-scroll">
      <h1 className="text-3xl font-bold my-6">Ma Niche</h1>

      {favorites.length > 0 ? (
        <div className="flex-grow">
          <h2 className="text-lg font-semibold mb-4">
            Mes bbs 💞 ({favorites.length})
          </h2>
          <AnimalCard showOnlyFavorites={true} />
        </div>
      ) : (
        <div className="flex-grow flex flex-col items-center justify-center">
          <p className="text-gray-500 text-center">
            Vous n'avez pas encore d'animaux favoris.
            <br />
            Ajoutez des favoris depuis la page d'accueil en cliquant sur le
            cœur.
          </p>
        </div>
      )}

      <div className="mb-20 mt-auto">
        <Navbar />
      </div>
    </div>
  );
}
