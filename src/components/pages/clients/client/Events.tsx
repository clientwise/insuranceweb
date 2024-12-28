import { GetClientAllEvents } from "@/src/apis";
import useApi from "@/src/hooks/useApi";
import { EventType } from "@/src/types";
import React from "react";
import EventsList from "./eventsList/List";
import { Colors } from "@/src/assets/colors.js";
import Button from "../../../Button.tsx";
interface Props {
  clientId: string;
  openEventAddModal: () => void;
}

const Events = ({ clientId, openEventAddModal }: Props) => {
  const { makeApiCall } = useApi();

  console.log(clientId, "Policy For clientid");

  const [events, setEvents] = React.useState<EventType[]>([]);
  const [loading, setLoading] = React.useState(true);

  //api call for events list
  React.useEffect(() => {
    setLoading(true);
    makeApiCall(GetClientAllEvents(clientId))
      .then((response) => {
        console.log("Events list response", response);
        if (response.data != null) {
          setEvents(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setLoading(false));
  }, [clientId, makeApiCall]);

  return (
    <div className=" mb-[8%] mt-5">
      <div className="flex flex-row justify-between items-center  mb-6">
        <h1 className="text-black text-lg font-light mt-4 font-rubik">
          All Events
        </h1>
        <Button
          style={{ color: Colors.primary }}
                  className=" bg-yellow-500"
          onClick={openEventAddModal}
        >
          Add Event
        </Button>
      </div>
      {loading ? (
        <p>Loading events...</p>
      ) : (
        <EventsList eventsList={events} loading={false} />
      )}
    </div>
  );
};

export default Events;
