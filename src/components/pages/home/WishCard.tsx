import { Colors } from "@/src/assets/colors";
import React from "react";
import { TodaysEventsType } from "@/src/types";
import { TodayEvents } from "@/src/assets/images/Images.js";

interface Props {
  event?: TodaysEventsType;
}

const WishCard = ({ event }: Props) => {
  return (
    <div className="p-2">
  <div className="flex items-center space-x-4">
  <div style={{ color: Colors.textprimary }} className="flex"> {/* Removed flex-col */}
    <p className="text-xs font-normal font-rubik text-black">
      <TodayEvents />
    </p>
    <p className="text-xs font-normal font-rubik text-black ml-3 mr-2"> 
    Reminder for: {event?.client_name} 
    </p>
  </div>
  <div>
    <p className="text-xs font-normal font-rubik">
      {event?.description}
    </p>
  </div>
</div>

    </div>
  );
};

export default WishCard;
