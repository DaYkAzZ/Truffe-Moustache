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
          <span className='text-[#5F5F63] font-semibold'>Poids</span>
          <p className='text-[#FFBC11]'>{animal.poids} Kg</p>
        </div>
        <div className='bg-[rgba(255,188,17,0.1)] w-[100px] h-[80px] rounded-xl flex flex-col justify-center items-center mx-auto'>
          <span className='text-[#5F5F63] font-semibold'>Gabarit</span>
          <p className='text-[#FFBC11]'>{animal.gabarit}</p>
        </div>
        <div className='bg-[rgba(255,188,17,0.1)] w-[100px] h-[80px] rounded-xl flex flex-col justify-center items-center mx-auto'>
          <span className='text-[#5F5F63] font-semibold'>Couleur</span>
          <p className='text-[#FFBC11]'>{animal.couleur}</p>
        </div>
      </div>
      
      <div className='flex px-4 mt-8'>
        <div>
          <img src="/images/icons/pet.svg" alt="pet" />
        </div>
        <div>
          <p className='px-4 font-semibold text-lg'>à propos de {animal.name}</p>
        </div>
      </div>
      <p className="text-[#a1a1a1] px-4 mt-8 font-semibold text-base text-lg">{animal.description}</p>

      {/* Comportement */}
      <div className='flex px-4 mt-8'>
        <div>
          <img src="/images/icons/comportement.svg" alt="pet" />
        </div>
        <div>
          <span className='px-4 font-semibold text-lg mt-8'>Son comportement</span>
      </div>
      </div>
      <div className=" ml-4 inline-flex items-center justify-center p-4 h-[50px] rounded-full border border-[#FFBC11] bg-white text-black mt-15">
        <span className="text-lg">{animal.sociabilite}</span>
      </div>



      {/* Calendly */}
      <div className="flex justify-center w-full mt-15">
        <iframe 
          className="w-[350px] h-[500px]" 
          src="https://calendly.com/m_rannou4-etu-webschoolfactory/30min"
        ></iframe>
      </div>

    </div>
  );
};

export default ProductDescription;