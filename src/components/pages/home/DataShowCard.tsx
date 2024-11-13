import { Colors } from "@/src/assets/colors";
import React, { ReactNode } from "react";

interface Props {
  label?: string;
  number?: string;
  logo?: ReactNode;
}

const DataShowCard = ({ label, number, logo }: Props) => {
  return (
    <div className="p-4 rounded-2xl shadow-md">
      <div className="flex items-center ml-8 ">
        <div className="mr-4 ">
          {logo && <div className="logo">{logo}</div>}
        </div>
        <div
          style={{ color: Colors.textprimary }}
          className="flex-col  text-center"
        >
          <p className="text-3xl font-semibold font-rubik">{number}</p>
          <p className="text-xl font-normal font-rubik text-black opacity-50">
            {label}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DataShowCard;
