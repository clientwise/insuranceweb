import InfoCard from "@/src/components/cards/InfoCard";
import React from "react";

const ClientDetails = () => {
  return (
    <div>
      <div className=" mt-[8%] mb-[8%]">
        <h1 className="text-black text-3xl font-light font-rubik mb-6">
          Client Details
        </h1>

        <div className="flex flex-row gap-[8%]">
          <div className="flex flex-col">
            <InfoCard title="Client name" description="Gaurav Kumar Yadav" />
            <InfoCard title="Mobile" description="+91-7524944398" />
            <InfoCard title="Risk Profile" description="New Investor" />
          </div>

          <div>
            <InfoCard title="Status" description="KYC Pending" />
            <InfoCard title="Email" description="gauravyadav00729@gmail.com" />
          </div>

          <div>
            <InfoCard title="Segment" description="New Investor" />
            <InfoCard title="Age" description="26" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDetails;
