import React, { memo } from 'react'
import ProductDescription from '@/app/components/ui/ProductDescription';

const page = memo(() => {
  return (
    <div className="min-h-screen w-full max-w-[393px] mx-auto bg-white">
      <ProductDescription category="Chiens" id={2}    />
    </div>
  )
})

export default page;
