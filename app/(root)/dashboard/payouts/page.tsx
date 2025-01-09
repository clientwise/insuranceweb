"use client";
import React from "react";
import Spacer from "@/src/components/Spacer";
import PayoutTable from "@/src/components/pages/payouts/payouttable";

const Payouts = () => {
    
  return (
    <div>
      <div className="text-black bg-pageBackground px-2 min-h-screen ">
        <Spacer size="sm" />
        <p className="text-lg font-normal font-rubik text-black ">Payouts </p>
        <Spacer size="xs" />
        <div>
          <PayoutTable />
        </div>
      </div>
    </div>
  );
};

export default Payouts;
