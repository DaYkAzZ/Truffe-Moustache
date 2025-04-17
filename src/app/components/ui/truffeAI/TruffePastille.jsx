"use client";

import React, { useState } from "react";
import Image from "next/image";
import TruffePopUp from "./TruffePopUp";

export default function TruffePastille() {
  const [popUp, setPopUp] = useState(false);
  return (
    <div className="fixed bottom-20 right-2 bg-white rounded-full border-3 border-purple-500 w-fit">
      <button onClick={() => setPopUp(true)}>
        <Image
          src="/images/icons/truffe.png"
          width={50}
          height={50}
          alt="truffe ai"
        />
      </button>
      {popUp && (
        <div onClick={() => setPopUp(false)}>
          <TruffePopUp />
        </div>
      )}
    </div>
  );
}
