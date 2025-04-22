"use client";

import React, { memo, Suspense } from "react";
import ProductDescription from "@/app/components/ui/ProductDescription";
import { useSearchParams } from "next/navigation";

// Composant qui utilise useSearchParams
const ProductContent = memo(() => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "Chiens";
  const id = parseInt(searchParams.get("id") || "1", 10);

  return (
    <div className="min-h-screen w-full max-w-[393px] mx-auto bg-white">
      <ProductDescription category={category} id={id} />
    </div>
  );
});

// Composant principal qui utilise Suspense
const Page = () => {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-screen">Chargement...</div>}>
      <ProductContent />
    </Suspense>
  );
};

export default Page;
