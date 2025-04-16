import Navbar from "@/app/components/navigation/Navbar";
import React from "react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <h1 className="text-3xl font-bold m-10">J'adopte un compagnon</h1>
      <div className="mt-auto">
        <Navbar />
      </div>
    </div>
  );
}
