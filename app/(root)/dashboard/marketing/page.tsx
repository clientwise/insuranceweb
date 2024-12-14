"use client";
import React from "react";
import Spacer from "@/src/components/Spacer";
import MarketUpdates from "@/src/components/pages/marketing/MarketUpdates";

const Marketing = () => {
  return (
    <div>
      <div className="text-black bg-pageBackground px-10 min-h-screen ">
        <Spacer size="sm" />
        <p className="text-2xl font-normal font-rubik text-black ">Marketing</p>
        <Spacer size="xs" />
        <div>
          <MarketUpdates />
        </div>
      </div>
    </div>
  );
};

export default Marketing;
