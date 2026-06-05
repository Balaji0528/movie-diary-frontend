import React from 'react'

import { FaUserCircle } from "react-icons/fa";

function ProfileSkeleton() {
  return (
    <div className="animate-pulse">

      <div className="flex flex-col md:flex-row md:justify-between gap-10 mt-8 border-b border-gray-800 pb-8">

        <div className="flex gap-4 items-center">

          <FaUserCircle className="text-[#2c3440] text-8xl" />

          <div>
            <div className="h-8 w-52 bg-[#3b4554] rounded mb-3" />

            <div className="h-4 w-32 bg-[#3b4554] rounded" />
          </div>

        </div>

        <div className="flex gap-8 items-center">

          <div>
            <div className="h-10 w-12 bg-[#3b4554] rounded mb-2" />
            <div className="h-4 w-24 bg-[#3b4554] rounded" />
          </div>

          <div>
            <div className="h-10 w-12 bg-[#3b4554] rounded mb-2" />
            <div className="h-4 w-24 bg-[#3b4554] rounded" />
          </div>

        </div>

      </div>

    </div>
  );
}

export default ProfileSkeleton;