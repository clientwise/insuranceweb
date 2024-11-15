import * as React from "react";

interface Props {
  title: string;
  description: string;
}

export default function InfoCard({ title, description }: Props) {
  return (
    <div className=" bg-white p-3">
      <p className="text-dark cursor-pointer font-rubik text-sm">{title}</p>
      <p className="text-dark cursor-pointer font-rubik text-lg">
        {description}
      </p>
    </div>
  );
}
