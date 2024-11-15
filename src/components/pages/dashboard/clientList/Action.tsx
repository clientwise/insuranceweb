import * as React from "react";
import Row from "@/src/components/Row";
import { ClientType } from "@/src/types";
import { Mail, MessageCircleMore, MessageSquareMore } from "lucide-react";

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
          <MessageSquareMore />
        </button>
        <button
          onClick={handleDownloadRental}
          className="text-textColorGrey cursor-pointer font-rubik"
          title="Mail"
        >
          <Mail />
        </button>
        <button
          onClick={handleDownloadRental}
          className="text-textColorGrey cursor-pointer font-rubik"
          title="Message"
        >
          <MessageCircleMore />
        </button>
      </div>
    </Row>
  );
}
