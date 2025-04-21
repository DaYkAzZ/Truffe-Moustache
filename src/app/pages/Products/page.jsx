"use client";

import React, { memo } from "react";
import ProductDescription from "@/app/components/ui/ProductDescription";
import { useSearchParams } from "next/navigation";

const Page = memo(() => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "Chiens";
  const id = parseInt(searchParams.get("id") || "1", 10);

  return (
    <div className="min-h-screen w-full max-w-[393px] mx-auto bg-white">
      <ProductDescription category={category} id={id} />
    </div>
  );
});

export default Page;
