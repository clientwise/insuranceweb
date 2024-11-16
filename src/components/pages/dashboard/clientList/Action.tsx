import * as React from "react";
import Row from "@/src/components/Row";
import { ClientType } from "@/src/types";
import { Mail, Message } from "@/src/assets/images/Images";

interface Props {
  item: ClientType;
}
// eslint-disable-next-line
export default function Action({ item }: Props) {
  const handleDownloadRental = React.useCallback(() => {}, []);

  return (
    <Row>
      <div className="flex flex-row items-center justify-center gap-3">
        <button
          onClick={handleDownloadRental}
          className="text-textColorGrey cursor-pointer font-rubik"
          title="Text"
        >
          <Message />
        </button>
        <button
          onClick={handleDownloadRental}
          className="text-textColorGrey cursor-pointer font-rubik"
          title="Mail"
        >
          <Mail />
        </button>
      </div>
    </Row>
  );
}
