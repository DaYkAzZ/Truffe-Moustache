"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import data from "../../../data/data.json";

export default function TruffePopUp({ onClose }) {
  const [isPopUpVisible, setPopUpVisible] = useState(true);
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [matchingAnimals, setMatchingAnimals] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    try {
      const userQuery = prompt.toLowerCase();
      const wantsDog = userQuery.includes("chien");
      const wantsCat = userQuery.includes("chat");
      const wantsSmallAnimal =
        userQuery.includes("rongeur") ||
        userQuery.includes("hamster") ||
        userQuery.includes("souris");
      const wantsReptile =
        userQuery.includes("reptile") ||
        userQuery.includes("serpent") ||
        userQuery.includes("lézard");

      const colorMatch =
        userQuery.match(/blanc|noir|gris|roux|brun|tricolore|doré/g) || [];
      const ageMatch = userQuery.match(/(\d+)\s*ans/) || [];
      const maxAge = ageMatch[1] ? parseInt(ageMatch[1]) : 999;
      const inApartment = userQuery.includes("appartement");

      let allAnimals = [];
      if (wantsDog) allAnimals = allAnimals.concat(data.Chiens || []);
      if (wantsCat) allAnimals = allAnimals.concat(data.Chats || []);
      if (wantsSmallAnimal) allAnimals = allAnimals.concat(data.Rongeurs || []);
      if (wantsReptile) allAnimals = allAnimals.concat(data.Reptiles || []);

      if (allAnimals.length === 0) {
        allAnimals = [
          ...(data.Chiens || []),
          ...(data.Chats || []),
          ...(data.Rongeurs || []),
          ...(data.Reptiles || []),
        ];
      }

      const filtered = allAnimals.filter((animal) => {
        if (animal.age > maxAge) return false;

        if (
          colorMatch.length > 0 &&
          !colorMatch.some((color) =>
            animal.couleur.toLowerCase().includes(color)
          )
        ) {
          return false;
        }

        if (inApartment && animal.gabarit === "grand") return false;

        return true;
      });

      setMatchingAnimals(filtered);

      if (filtered.length > 0) {
        setResponse(
          `J'ai trouvé ${filtered.length} animal(aux) qui correspondent à vos critères !`
        );
      } else {
        setResponse(
          "Je n'ai pas trouvé d'animaux correspondant exactement à tous vos critères. Peut-être pourriez-vous assouplir certains critères ?"
        );
      }
    } catch (error) {
      console.error("Error processing request:", error);
      setResponse(
        "Désolé, une erreur s'est produite lors de l'analyse de votre demande."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setPopUpVisible(false);
    if (onClose) onClose();
  };

  return (
    <AnimatePresence>
      {isPopUpVisible && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          {/* Fond sombre */}
          <motion.div
            className="absolute inset-0 bg-opacity-40 backdrop-blur-sm shadow-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Popup animée */}
          <motion.div
            className="relative bg-white p-6 rounded-t-2xl w-full max-w-xl max-h-[80vh] overflow-y-auto shadow-xl z-10"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={handleClose}
            >
              ✖
            </button>

            <div className="flex flex-col items-center">
              <Image
                src="/images/icons/truffe.png"
                width={50}
                height={100}
                alt="truffe icon"
              />
              <p className="mt-4 text-center text-gray-700">
                Bienvenue sur Truffe AI ! Décrivez vos critères ci-dessous.
              </p>
            </div>

            {response && (
              <div className="mt-4 p-3 bg-gray-100 rounded-lg">
                <p className="text-gray-800">{response}</p>

                {matchingAnimals.length > 0 && (
                  <div className="mt-3">
                    <h3 className="font-bold">Animaux suggérés:</h3>
                    <ul className="mt-2 space-y-2">
                      {matchingAnimals.slice(0, 3).map((animal) => (
                        <li
                          key={animal.id}
                          className="p-2 bg-white rounded border border-gray-200"
                        >
                          <div className="font-semibold">{animal.name}</div>
                          <div className="text-sm text-gray-600">
                            {animal.race}, {animal.age} ans, {animal.couleur}
                          </div>
                          <div className="text-xs mt-1 italic">
                            {animal.description
                              ? animal.description.substring(0, 70)
                              : "Aucune description disponible"}
                            ...
                          </div>
                        </li>
                      ))}
                    </ul>
                    {matchingAnimals.length > 3 && (
                      <p className="text-sm text-gray-500 mt-2">
                        + {matchingAnimals.length - 3} autres animaux
                        correspondants
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="flex items-center justify-between mt-6"
            >
              <div className="flex-grow mr-2">
                <input
                  type="text"
                  className="w-full p-2 bg-gray-200 rounded-lg"
                  placeholder="Waf waf critères ?"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
                  disabled={isLoading || !prompt.trim()}
                >
                  {isLoading ? "..." : "→"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
