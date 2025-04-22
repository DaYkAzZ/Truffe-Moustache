"use client";

import React, { useEffect, useState } from "react";
import data from "../../data/data_100.json";
// Removed direct import of the video file

const ProductDescription = ({ category, id }) => {
  const [animal, setAnimal] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const numId = typeof id === "string" ? parseInt(id, 10) : id;
    const foundAnimal = data[category]?.find((a) => a.id === numId);
    setAnimal(foundAnimal);
  }, [category, id]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Init check

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!animal)
    return (
      <div className="h-screen w-full flex items-center justify-center bg-black text-white">
        <p className="text-xl">Animal introuvable</p>
      </div>
    );

  return (
    <div className="relative w-full max-w-[393px] mx-auto">
      {/* Bouton retour */}
      <button
        onClick={() => (window.location.href = "/pages/Home")}
        className={`fixed top-4 left-4 px-4 py-2 rounded-full shadow-md z-10 transition-all duration-300 ${
          isScrolled ? "bg-[#FFBC11] text-white" : "bg-white text-black"
        }`}
      >
        Retour
      </button>

      {/* Image de l'animal */}
      <div className="relative mb-24">
        <img
          src={animal.image || "/images/default.png"}
          alt={`Photo de ${animal.name}`}
          className="w-full h-[240px] object-cover object-top"
        />
        <div className="absolute bottom-[-60px] left-1/2 -translate-x-1/2 w-[367px] h-[100px] bg-white/20 backdrop-blur-xl flex items-center px-4 rounded-3xl shadow-lg">
          <div className="flex w-full p-[16px] items-center justify-between">
            <div>
              <h2 className="text-black text-2xl font-semibold">
                {animal.name}
              </h2>
              <p className="text-[#5F5F63] text-sm">
                {animal.race} · {animal.age} ans · {animal.poids} kg
              </p>
            </div>
            <img
              src={`/images/icons/sex-${animal.sexe}.svg`}
              alt={`Sexe de ${animal.name}`}
              className="object-contain -scale-250px"
            />
          </div>
        </div>
      </div>

      {/* À propos */}
      <div className="flex px-4 mt-8">
        <div>
          <img src="/images/icons/pet.svg" alt="pet" />
        </div>
        <div>
          <span className="px-4 font-semibold text-lg mb-8">
            A propos de {animal.name}
          </span>
        </div>
      </div>
      <div className="flex items-center mt-4">
        <div className="bg-[rgba(255,188,17,0.1)] w-[100px] h-[80px] rounded-xl flex flex-col justify-center items-center mx-auto">
          <span className="text-[#5F5F63] font-semibold">Poids</span>
          <p className="text-[#FFBC11]">{animal.poids} Kg</p>
        </div>
        <div className="bg-[rgba(255,188,17,0.1)] w-[100px] h-[80px] rounded-xl flex flex-col justify-center items-center mx-auto">
          <span className="text-[#5F5F63] font-semibold">Gabarit</span>
          <p className="text-[#FFBC11]">{animal.gabarit}</p>
        </div>
        <div className="bg-[rgba(255,188,17,0.1)] w-[100px] h-[80px] rounded-xl flex flex-col justify-center items-center mx-auto">
          <span className="text-[#5F5F63] font-semibold">Couleur</span>
          <p className="text-[#FFBC11]">{animal.couleur}</p>
        </div>
      </div>
      <p className="text-[#a1a1a1] px-4 mt-8 text-lg">{animal.description}</p>

      {/* Comportement */}
      <div className="flex px-4 mt-8">
        <div>
          <img src="/images/icons/comportement.svg" alt="pet" />
        </div>
        <div>
          <span className="px-4 font-semibold text-lg mt-8">
            Son comportement
          </span>
        </div>
      </div>
      <div className="m-2 inline-flex items-center justify-center p-4 h-[50px] rounded-full border border-[#FFBC11] bg-white text-black mt-6">
        <span className="text-md">{animal.tags[0]}</span>
      </div>
      <div className="m-2 inline-flex items-center justify-center p-4 h-[50px] rounded-full border border-[#FFBC11] bg-white text-black mt-6">
        <span className="text-md">{animal.tags[1]}</span>
      </div>
      <div className="m-2 inline-flex items-center justify-center p-4 h-[50px] rounded-full border border-[#FFBC11] bg-white text-black mt-6">
        <span className="text-md">{animal.tags[2]}</span>
      </div>

      {/* video */}
      <div className="flex px-4 mt-8 items-center">
        <div>
          <img src="/images/icons/present.svg" alt="pet" />
        </div>
        <div>
          <span className="px-4 font-semibold text-lg mt-8">
            Présentation de {animal.name}
          </span>
        </div>
      </div>
      <div className="px-4">
        <video width="370" height="240" controls>
          <source src="/videos/presentation.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Calendly */}
      <div className="px-4 flex flex-col justify-center w-full mt-15">
        <div className="flex items-center mb-8">
          <img src="/images/icons/calendar.svg" alt="calendly" />
          <span className="px-4 font-semibold text-lg">
            Rencontrer {animal.name}
          </span>
        </div>
        <iframe
          className="w-[350px] h-[500px]"
          src="https://calendly.com/m_rannou4-etu-webschoolfactory/30min"
        ></iframe>
      </div>
    </div>
  );
};

export default ProductDescription;
