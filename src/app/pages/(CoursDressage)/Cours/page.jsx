"use client";

import React, { useEffect, useState, Suspense } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import Navbar from "@/app/components/navigation/Navbar";
import coursData from "@/app/data/dressage.json";
import Link from "next/link";

// Composant qui utilise useSearchParams
function CourseContent() {
  const searchParams = useSearchParams();
  const courseId = searchParams.get("id");
  const [course, setCourse] = useState(null);

  useEffect(() => {
    // Convertir l'ID de la chaîne de caractères vers un nombre
    const numericId = parseInt(courseId, 10);

    // Trouver le cours correspondant dans les données JSON
    const foundCourse = coursData.cours_dressage.find(
      (item) => item.id === numericId
    );

    if (foundCourse) {
      setCourse(foundCourse);
    }
  }, [courseId]);

  // Fonction pour déterminer l'icône de l'animal
  const getAnimalIcon = (typeAnimal) => {
    if (typeAnimal === "Chien") return "/images/icons/dog.svg";
    if (typeAnimal === "Chat") return "/images/icons/cat.svg";
    if (typeAnimal === "Rongeur") return "/images/icons/rabbit.svg";
    if (typeAnimal === "Reptile") return "/images/icons/snake.svg";
    if (typeAnimal.includes("Chien") && typeAnimal.includes("Chat"))
      return "/images/icons/pet.svg";
    return "/images/icons/pet.svg";
  };

  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p>Chargement du cours...</p>
        <Navbar />
      </div>
    );
  }

  return (
    <div className="pb-16">
      {/* Header */}
      <div className="flex justify-between items-center mx-5 my-6">
        <Link href="/pages/DressageGlobal">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span>Retour</span>
          </div>
        </Link>
        <div>
          <Image
            src="/images/brand/logo.png"
            width={50}
            height={50}
            alt="Truffe Moustache"
          />
        </div>
      </div>

      {/* Contenu du cours */}
      <div className="mx-5">
        <div className="bg-white text-white p-5 rounded-lg shadow-sm mb-6 border-2 border-[#FFBC11]">
          <Image
            src={course.image}
            width={300}
            height={300}
            className="object-cover rounded-lg mb-4"
            alt="image"
          />
          <div className="flex items-center mb-4 p-2 rounded-2xl bg-[#FFBC11] backdrop-blur-2xl">
            <Image
              src={getAnimalIcon(course.type_animal)}
              width={60}
              height={60}
              alt={course.type_animal}
              className="bg-white rounded-full p-2 mr-4"
            />
            <h1 className="text-2xl font-bold">{course.title}</h1>
          </div>

          <div className="bg-white text-black p-4 rounded-lg">
            <div className="mb-4">
              <h2 className="font-semibold text-lg mb-2">Description</h2>
              <p>{course.description}</p>
            </div>

            <div className="flex flex-wrap justify-between">
              <div className="mb-2">
                <span className="font-semibold">Durée:</span> {course.duration}
              </div>
              <div className="mb-2">
                <span className="font-semibold">Animal:</span>{" "}
                {course.type_animal}
              </div>
              <div className="mb-2">
                <span className="font-semibold">Niveau:</span> {course.level}
              </div>
            </div>
          </div>
        </div>
        <button className="w-full bg-[#FFBC11] text-white py-3 rounded-lg font-bold hover:bg-[#e7a90f] transition-colors">
          S'inscrire à ce cours
        </button>
      </div>
    </div>
  );
}

// Composant principal qui utilise Suspense
export default function Cours() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-screen">Chargement...</div>}>
      <CourseContent />
    </Suspense>
  );
}
