import { Colors } from "@/src/assets/colors";
import React, { ReactNode } from "react";

interface Props {
  label?: string;
  number?: string;
  logo?: ReactNode;
}

const DataShowCard = ({ label, number, logo }: Props) => {
  return (
    <div className="p-4 border rounded-md shadow-md">
      <div className="flex items-center">
        <div className="mr-4">{logo && <div className="logo">{logo}</div>}</div>
        <div
          style={{ color: Colors.textprimary }}
          className="flex-col  text-center"
        >
          <p className="text-xl font-semibold font-poppins">{number}</p>
          <p className="text-xl font-normal font-poppins text-black">{label}</p>
        </div>
      </div>
    </div>
  );
};

export default DataShowCard;
