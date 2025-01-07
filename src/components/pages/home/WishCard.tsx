import { Colors } from "@/src/assets/colors";
import React from "react";
import { TodaysEventsType } from "@/src/types";

interface Props {
  event?: TodaysEventsType;
}

const WishCard = ({ event }: Props) => {
  return (
    <div className="p-2">
      <div className="flex items-center"> 
      <div className="mr-4">
        
          <div style={{ color: Colors.textprimary }} className="flex-col ">
            <p className="text-base font-normal font-rubik text-black">
              {event?.client_name}
            </p>  </div>

            <div className="flex"> {/* Wrap the p tags in a flex container */}

            <p className="text-xs font-semibold font-rubik">
              {event?.date_of_event}
            </p>
            <p className="text-xs font-semibold font-rubik">
              {event?.description}
            </p>
          </div>
        </div>

      
      </div>
    </div>
  );
};

export default WishCard;
