import React from "react";
import Navbar from "@/app/components/navigation/Navbar";

export default function Niche() {
  return (
    <div className="flex flex-col min-h-screen">
      <h1 className="text-3xl font-bold mx-5 my-10">Ma Niche</h1>
      <div className="mt-auto">
        <Navbar />
      </div>
    </div>
  );
}
