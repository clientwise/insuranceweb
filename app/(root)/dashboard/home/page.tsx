"use client";
import React from "react";
import Spacer from "@/src/components/Spacer";
import Image from "next/image"; 
import backgroundImage from "@/src/assets/dummydash.png";

const Marketing = () => {
  return (
    <div>
      <div className="text-black bg-pageBackground px-10 min-h-screen ">
        <Spacer size="sm" />
        <p className="text-2xl font-normal font-rubik text-black ">Dashboard</p>
        <Spacer size="xs" />
        <div className="flex-1 p-4 bg-white rounded-lg shadow-md relative"> 
          <Image
            src={backgroundImage}
            alt="Dashboard Image"
            // layout="fill" 
            // objectFit="cover" 
style={{width:"100%"}}
/>
        </div>
      </div>
    </div>
  );
};

export default Marketing;