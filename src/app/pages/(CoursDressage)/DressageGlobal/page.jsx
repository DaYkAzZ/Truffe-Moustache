import React from "react";
import Image from "next/image";
import Navbar from "@/app/components/navigation/Navbar";
import CoursCard from "@/app/components/ui/dressage/CoursCard";

export default function CoursDressage() {
  return (
    <div>
      <div className="flex justify-between items-center mx-5">
        <div className="my-6">
          <h1 className="text-3xl font-bold">Je dresse mon meilleur pote !</h1>
        </div>
        <div>
          <Image
            src="/images/brand/logo.png"
            width={50}
            height={50}
            alt="Pets print"
          />
        </div>
      </div>
      <div>
        <CoursCard />
      </div>
      <Navbar />
    </div>
  );
}
