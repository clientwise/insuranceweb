import * as React from "react";
import Row from "@/src/components/Row";
import { InsuranceListType } from "@/src/types";

interface Props {
  item: InsuranceListType;
  onRowAction: (clientId: React.Key) => void;
}

export default function Action({ onRowAction }: Props) {
  return (
    <Row>
      <div className="flex flex-row items-center justify-center gap-3">
        <button
          onClick={() => onRowAction}
          className="text-textColorGrey cursor-pointer font-rubik"
        >
          <p className="text-textLink text-base font-light font-rubik">View</p>
        </button>
      </div>
    </Row>
  );
}