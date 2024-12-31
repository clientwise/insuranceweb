import * as React from "react";

interface Props {
  title: string;
  description: string;
}

export default function InfoCard({ title, description }: Props) {
  return (
    <div className=" bg-white p-3" style={{backgroundColor: "#f9f9f9"}}>
      <p className="text-dark cursor-pointer font-rubik text-sm">{title}</p>
      <p className="text-dark cursor-pointer font-rubik text-sm">
        {description}
      </p>
    </div>
  );
}
