import React from 'react'

function DiarySkeleton() {
  return (
    <div className="space-y-6 animate-pulse">

      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="grid grid-cols-10 gap-4 items-center border-b border-gray-800 pb-6"
        >

          <div className="h-10 w-10 bg-[#3b4554] rounded-full col-span-1" />

          <div className="col-span-4 flex items-center gap-4">

            <div className="w-14 h-20 bg-[#2c3440] rounded" />

            <div>
              <div className="h-4 w-40 bg-[#3b4554] rounded mb-2" />
              <div className="h-3 w-24 bg-[#3b4554] rounded" />
            </div>

          </div>

          <div className="h-4 w-20 bg-[#3b4554] rounded col-span-2" />

          <div className="h-4 w-12 bg-[#3b4554] rounded col-span-1" />

          <div className="h-8 w-16 bg-[#3b4554] rounded col-span-1" />

          <div className="h-8 w-16 bg-[#3b4554] rounded col-span-1" />

        </div>
      ))}

    </div>
  );
}

export default DiarySkeleton;