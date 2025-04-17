"use client";

import React, { useState } from "react";
import Image from "next/image";
import TruffePopUp from "./TruffePopUp";

export default function TruffePastille() {
  const [popUp, setPopUp] = useState(false);

  const handleClose = () => {
    setPopUp(false);
  };

  return (
    <>
      {!popUp ? (
        <div className="fixed bottom-20 right-2 z-40">
          <button
            onClick={() => setPopUp(true)}
            className="bg-white rounded-full border-2 border-purple-500 p-1 shadow-lg hover:scale-105 transition-transform"
          >
            <Image
              src="/images/icons/truffe.png"
              width={50}
              height={50}
              alt="truffe ai"
              className="rounded-full"
            />
          </button>
        </div>
      ) : (
        <TruffePopUp onClose={handleClose} />
      )}
    </>
  );
}
