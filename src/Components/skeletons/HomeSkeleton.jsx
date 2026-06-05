import React from 'react'
import HeroSectionSkeleton from './HeroSectionSkeleton'
import MovieCardSkeleton from './MovieCardSkeleton'

function HomeSkeleton() {
    return (
    <>
    <HeroSectionSkeleton/>

    <section className="mb-14">
      <div className="mb-10">
        <div className="h-10 w-72 bg-[#2c3440] rounded mb-3 animate-pulse" />

        <div className="h-4 w-96 bg-[#2c3440] rounded animate-pulse" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {[...Array(12)].map((_, index) => (
          <MovieCardSkeleton key={index} />
        ))}
      </div>
    </section>

    <section>
      <div className="mb-6">
        <div className="h-8 w-64 bg-[#2c3440] rounded mb-3 animate-pulse" />

        <div className="h-4 w-80 bg-[#2c3440] rounded animate-pulse" />
      </div>

      <div className="flex gap-5 overflow-x-auto pb-4 no-scrollbar">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="min-w-45.5 max-w-45.5"
          >
            <MovieCardSkeleton />
          </div>
        ))}
      </div>
    </section>
  </>
  )
}

export default HomeSkeleton