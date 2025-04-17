'use client';

import React, { useEffect, useState } from 'react';
import data from '../../data/data.json';

const ProductDescription = ({ category, id }) => {
  const [animal, setAnimal] = useState(null);
  
  useEffect(() => {
    const foundAnimal = data[category]?.find(a => a.id === id);
    setAnimal(foundAnimal);
  }, [category, id]);
  
  if (!animal) return <p>Animal introuvable</p>;
  
  return (
    <div className="relative w-full max-w-[393px] mx-auto">
      {/* Image de l'animal */}
      <div className="relative mb-24"> {/* Ajout d'un conteneur avec margin-bottom */}
        <img
          src={animal.image || '/images/default.png'}
          alt={`Photo de ${animal.name}`}
          className="w-full h-[240px] object-cover object-top"
        />
        
        {/* Carte d'informations */}
        <div className="absolute bottom-[-60px] left-1/2 -translate-x-1/2 w-[367px] h-[100px] bg-white/10 backdrop-blur-xl flex items-center px-4 rounded-3xl shadow-md">
          <div className="flex w-full p-[16px] items-center justify-between">
            <div>
              <h2 className="text-white text-2xl font-semibold">{animal.name}</h2>
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
      
      {/* Description avec un margin-top bien séparé */}
      <div className='flex items-center'>
        <div className='bg-[rgba(255,188,17,0.1)] w-[100px] h-[80px] rounded-xl flex flex-col justify-center items-center mx-auto'>
          <span className='text-[#5F5F63]'>Poids</span>
          <p className='text-[#FFBC11]'>{animal.poids}</p>
        </div>
        <div className='bg-[rgba(255,188,17,0.1)] w-[100px] h-[80px] rounded-xl flex flex-col justify-center items-center mx-auto'>
          <span className='text-[#5F5F63]'>Gabarit</span>
          <p className='text-[#FFBC11]'>{animal.gabarit}</p>
        </div>
        <div className='bg-[rgba(255,188,17,0.1)] w-[100px] h-[80px] rounded-xl flex flex-col justify-center items-center mx-auto'>
          <span className='text-[#5F5F63]'>Couleur</span>
          <p className='text-[#FFBC11]'>{animal.couleur}</p>
        </div>
      </div>
      
      <div className='flex px-4 mt-8'>
        <div>
          <img src="/images/icons/pet.svg" alt="pet" />
        </div>
        <div>
          <p className='px-4'>à propos de {animal.name}</p>
        </div>
      </div>
      <p className="text-[#a1a1a1] text-xs px-4 mt-8">{animal.description}</p>

      <iframe className='w-[350px] h-[500px]' src="https://calendly.com/m_rannou4-etu-webschoolfactory/30min"></iframe>

    </div>
  );
};

export default ProductDescription;