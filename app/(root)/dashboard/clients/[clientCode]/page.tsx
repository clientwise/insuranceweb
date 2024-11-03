"use client";

import * as React from "react";

interface Props {
  params: { clientCode: string };
}

export default function UploadInventory({ params }: Props) {
  const { clientCode } = params;

  return (
    <div>
      <p>Client Individeual {clientCode}</p>
    </div>
  );
}
