"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function TruffePopUp({ onClose, onResult }) {
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
      // Appel à l'API Wit.ai via notre route d'API
      const res = await fetch("../../../api/witai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: prompt }),
      });

      if (!res.ok) {
        throw new Error(`Erreur API: ${res.status}`);
      }

      const data = await res.json();

      // Utiliser la réponse et les animaux correspondants de Wit.ai
      setResponse(data.response);
      const animals = data.animals || [];
      setMatchingAnimals(animals);

      // Transmettre les animaux au composant parent
      if (onResult && animals.length > 0) {
        onResult(animals);

        // Fermer automatiquement la popup avec un délai pour montrer les résultats
        setTimeout(() => {
          setPopUpVisible(false);
          if (onClose) onClose();
        }, 2000); // 2 secondes de délai pour voir le nombre d'animaux trouvés et apprécier l'animation
      }
    } catch (error) {
      console.error("Erreur lors de l'appel à Wit.ai:", error);
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
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 25,
              duration: 0.8,
            }}
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
                Bonjour ! Je suis Truffe, votre assistant pour trouver le
                compagnon idéal. Comment puis-je vous aider ?
              </p>
            </div>

            {response && (
              <div className="mt-4 p-3 bg-gray-100 rounded-lg">
                {matchingAnimals.length > 0 && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold">
                        Animaux trouvés: {matchingAnimals.length}
                      </h3>
                    </div>
                  </div>
                )}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="flex items-center justify-between mt-6"
            >
              <div className="flex-grow mr-2 relative">
                <input
                  type="text"
                  className="w-full p-2 bg-gray-200 rounded-lg pr-8"
                  placeholder="Décrivez l'animal que vous recherchez..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  disabled={isLoading}
                />
                {prompt && (
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                    onClick={() => setPrompt("")}
                  >
                    ✕
                  </button>
                )}
              </div>
              <div>
                <button
                  type="submit"
                  className="p-2 bg-[#FFBC11] text-white rounded-lg disabled:bg-[#FFBC11] flex items-center justify-center min-w-[40px]"
                  disabled={isLoading || !prompt.trim()}
                >
                  {isLoading ? (
                    <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    "→"
                  )}
                </button>
              </div>
            </form>

            {!response && (
              <div className="mt-4 text-gray-500 text-sm">
                <p className="font-medium">Exemples :</p>
                <div className="mt-1 flex flex-wrap gap-2">
                  {[
                    "Je cherche un chat roux",
                    "Un chien pour appartement",
                    "Un reptile discret",
                    "Je veux un chien de petite taille",
                  ].map((example) => (
                    <button
                      key={example}
                      className="px-2 py-1 bg-gray-100 rounded-full text-xs hover:bg-gray-200"
                      onClick={() => setPrompt(example)}
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
