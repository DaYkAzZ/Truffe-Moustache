"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export default function Page() {
  const [step, setStep] = useState(0);
  const router = useRouter();

  const pages = [
    {
      title: "Trouvez votre compagnon de rêve",
      text: "waf waf",
      image: "/images/icons/onboardingFirst.svg",
      bgColor: "#FFBC11",
    },
    {
      title:
        "Salut toi !\nMoi c'est Moustaches, ton guide poilu préféré.\nBienvenue sur notre appli d'adoption !",
      text: "Ici, tu peux rencontrer ton futur compagnon à plumes, à poils ou à écailles...Quel que soit ton style, on t'aide à trouver l'animal qui te correspond vraiment.",
      image: "/images/icons/onboardingChat.svg",
      bgColor: "#FFBC11",
    },
    {
      title: "Comment ça marche ? C'est simple !",
      text: "Tu nous dis ce que tu recherches, ton mode de vie, et nous, on s'occupe de te proposer des profils d'animaux qui te correspondent. Mais attention… pas n'importe comment !",
      image: "/images/icons/onboardingChat.svg",
      bgColor: "#FFBC11",
    },
    {
      title: "Je te présente Truffe, notre super assistant canin",
      text: "C'est une IA maline comme tout (même si c'est un chien) ! Il va analyser tes réponses et t'aider à trouver le match parfait. Prêt(e) à rencontrer ton futur meilleur pote ?",
      image: "/images/icons/onboardingChienChat.svg",
      bgColor: "#FFBC11",
    },
    {
      title: "Hello l’ami ! Je suis Truffe, ton assistant au flair infaillible",
      text: "Grâce à moi, tu vas rencontrer le pote idéal — celui qui t’ira comme une truffe au museau ! Prêt(e) ? Alors suis-moi, on va matcher du bonheur !",
      image: "/images/icons/onboardingChien.svg",
      bgColor: "#FFBC11",
    },
  ];

  const handleNext = () => {
    if (step < pages.length - 1) {
      setStep(step + 1);
    } else {
      router.push("/pages/Home");
    }
  };

  return (
    <div
      className="min-h-screen max-w-[393px] mx-auto relative flex flex-col items-center justify-center px-6 overflow-hidden"
      style={{ backgroundColor: pages[step].bgColor }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.4 }}
          className="absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center text-center px-6 pt-6 pb-32"
        >
          <img
            src={pages[step].image}
            alt={pages[step].title}
            className="w-[250px] h-auto mb-6"
          />
          <h1 className="text-2xl text-white font-bold mb-4 whitespace-pre-line leading-snug">
            {pages[step].title}
          </h1>
          <p className="text-white">{pages[step].text}</p>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={handleNext}
        className="z-10 mt-auto mb-10 bg-white text-black px-6 py-3 rounded-full font-semibold shadow-md"
      >
        {step === pages.length - 1 ? "Commencer" : "Suivant"}
      </button>
    </div>
  );
}
