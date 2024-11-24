import { GetClientAllEvents } from "@/src/apis";
import useApi from "@/src/hooks/useApi";
import { EventType } from "@/src/types";
import React from "react";
import EventsList from "./eventsList/List";

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
    <div className=" mb-[8%]">
      <div className="flex flex-row justify-between items-center  mb-6">
        <h1 className="text-black text-3xl font-light font-rubik">
          All Events
        </h1>
        <button
          onClick={openEventAddModal}
          className="text-textLink text-base font-light font-rubik"
        >
          Add Event
        </button>
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
