"use client";

import Image from "next/image";

export default function AnimalFilterBar({
  selectedCategory,
  onSelectCategory,
}) {
  const categories = [
    { name: "Tous", value: null, icon: "/images/icons/truffe.png" },
    { name: "Chiens", value: "Chiens", icon: "/images/icons/dog.svg" },
    { name: "Chats", value: "Chats", icon: "/images/icons/cat.svg" },
    { name: "Rongeurs", value: "Rongeur", icon: "/images/icons/rabbit.svg" },
    { name: "Reptiles", value: "Reptiles", icon: "/images/icons/snake.svg" },
  ];

  return (
    <div className="flex justify-between items-center my-4 overflow-x-auto pb-2 gap-2">
      {categories.map((category) => (
        <button
          key={category.name}
          onClick={() => onSelectCategory(category.value)}
          className={`flex flex-col items-center p-2 rounded-lg transition-colors flex-shrink-0 ${
            selectedCategory === category.value ||
            (selectedCategory === null && category.value === null)
              ? "bg-orange-100 border-2 border-orange-500"
              : "bg-white border-2 border-gray-200"
          }`}
        >
          <div className="p-2 rounded-full bg-gray-100">
            <Image
              src={category.icon}
              width={30}
              height={30}
              alt={category.name}
            />
          </div>
          <span className="text-xs mt-1">{category.name}</span>
        </button>
      ))}
    </div>
  );
}
