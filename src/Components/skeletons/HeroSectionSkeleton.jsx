import React from 'react'

function HeroSectionSkeleton() {
  return (
    <div className="relative h-[70vh] rounded-2xl overflow-hidden animate-pulse mb-12">

      <div className="absolute inset-0 bg-[#2c3440]" />

      <div className="absolute bottom-16 left-10 z-10">

        <div className="h-12 w-72 bg-[#3b4554] rounded mb-4" />

        <div className="h-4 w-96 bg-[#3b4554] rounded mb-3" />

        <div className="h-4 w-80 bg-[#3b4554] rounded mb-6" />

        <div className="flex gap-4">
          <div className="h-12 w-36 bg-[#3b4554] rounded-lg" />
          <div className="h-12 w-32 bg-[#3b4554] rounded-lg" />
        </div>

      </div>

    </div>
  );
}

export default HeroSectionSkeleton;