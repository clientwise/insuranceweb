import * as React from "react";
import Row from "@/src/components/Row";
import { ClientList } from "@/src/types";
import { Mail, MessageCircleMore, MessageSquareMore } from "lucide-react";

interface Props {
  item: ClientList;
}

export default function Action({ item }: Props) {
  const handleDownloadRental = React.useCallback(() => {}, []);

  return (
    <Row>
      <div className="flex flex-row items-center justify-center gap-3">
        <button
          onClick={handleDownloadRental}
          className="text-textColorGrey cursor-pointer font-poppins"
        >
          <MessageSquareMore />
        </button>
        <button
          onClick={handleDownloadRental}
          className="text-textColorGrey cursor-pointer font-poppins"
        >
          <Mail />
        </button>
        <button
          onClick={handleDownloadRental}
          className="text-textColorGrey cursor-pointer font-poppins"
        >
          <MessageCircleMore />
        </button>
      </div>
    </Row>
  );
}
