import React from "react";

function MovieCardSkeleton() {
  return (
    <div className="animate-pulse">

      <div className="h-72 bg-[#2c3440] rounded-lg border border-gray-700" />

      <div className="h-4 bg-[#3b4554] rounded mt-3 w-3/4" />

      <div className="h-3 bg-[#3b4554] rounded mt-2 w-1/2" />

    </div>
  );
}

export default MovieCardSkeleton;