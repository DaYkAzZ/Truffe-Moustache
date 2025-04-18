import React from "react";
import cours from "@/app/data/dressage.json";
import Image from "next/image";

export default function CoursCard() {
  return (
    <div className="mx-5">
      <h1 className="text-lg font-bold">Les bases</h1>
      {cours.cours_dressage.map((item) => {
        return (
          <div
            key={item.id}
            className="my-2 bg-[#FFBC11] text-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex flex-row justify-between items-center">
              <div>
                <Image
                  src={
                    item.type_animal === "Chien"
                      ? "/images/icons/dog.svg"
                      : item.type_animal === "Chat"
                      ? "/images/icons/cat.svg"
                      : item.type_animal === "Rongeur"
                      ? "/images/icons/rabbit.svg"
                      : item.type_animal === "Reptile"
                      ? "/images/icons/snake.svg"
                      : item.type_animal.includes("Chien" && "Chat")
                      ? "/images/icons/cat.svg" && "/images/icons/dog.svg"
                      : "images/icons/pet.svg"
                  }
                  width={60}
                  height={60}
                  alt="animal"
                  className="bg-white rounded-full p-2"
                />
              </div>
              <div>
                <h1>{item.title}</h1>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
