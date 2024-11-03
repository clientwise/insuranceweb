import { Colors } from "@/src/assets/colors";
import React from "react";
import { Cake } from "lucide-react";
import Button from "../../Button";
import { TodaysEventsType } from "@/src/types";

interface Props {
  event?: TodaysEventsType;
}

const WishCard = ({ event }: Props) => {
  return (
    <div className="p-2 border rounded-md shadow-md mb-1">
      <div className="flex justify-between">
        <div className="flex items-center ">
          <div className="mr-4">
            <Cake color="grey" />
          </div>
          <div style={{ color: Colors.textprimary }} className="flex-col ">
            <p className="text-base font-normal font-poppins text-black">
              {event?.event_type}
            </p>
            <p className="text-xs font-semibold font-poppins">
              {event?.date_of_event}
            </p>
          </div>
        </div>

        <Button
          style={{ color: Colors.textprimary }}
          className=" bg-yellow-500"
          size="sm"
        >
          <p className="text-xs font-normal font-poppins text-white">
            Send Wishes
          </p>
        </Button>
      </div>
    </div>
  );
};

export default WishCard;
