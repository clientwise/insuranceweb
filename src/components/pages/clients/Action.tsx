import * as React from "react";
import Row from "@/src/components/Row";
import { ClientType } from "@/src/types";
import { CalendarRange, Mail } from "lucide-react";

interface Props {
  item: ClientType;
}

export default function Action({}: Props) {
  return (
    <Row>
      <div className="flex flex-row items-center justify-center gap-3">
        <button className="text-textColorGrey cursor-pointer font-poppins">
          <CalendarRange />
        </button>
        <button className="text-textColorGrey cursor-pointer font-poppins">
          <Mail />
        </button>
      </div>
    </Row>
  );
}
