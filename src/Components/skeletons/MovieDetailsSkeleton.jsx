import React from 'react'

function MovieDetailsSkeleton() {
  return (
    <div className="animate-pulse">

      <div className="relative min-h-screen overflow-hidden">

        <div className="absolute inset-0 bg-[#2c3440]" />

        <div className="relative z-10 max-w-7xl mx-auto px-8 py-20">

          <div className="flex flex-col md:flex-row gap-10 items-start">

            <div className="w-64 h-96 bg-[#3b4554] rounded-lg" />

            <div className="max-w-4xl">

              <div className="h-12 w-96 bg-[#3b4554] rounded mb-4" />

              <div className="h-5 w-48 bg-[#3b4554] rounded mb-6" />

              <div className="h-8 w-24 bg-[#3b4554] rounded-full mb-10" />

              <div className="space-y-3 mb-10">

                <div className="h-4 w-full bg-[#3b4554] rounded" />

                <div className="h-4 w-11/12 bg-[#3b4554] rounded" />

                <div className="h-4 w-10/12 bg-[#3b4554] rounded" />

              </div>

              <div className="flex gap-4">

                <div className="h-12 w-44 bg-[#3b4554] rounded-lg" />

                <div className="h-12 w-36 bg-[#3b4554] rounded-lg" />

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default MovieDetailsSkeleton;