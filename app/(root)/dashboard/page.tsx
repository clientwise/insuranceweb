"use client";

import DataShowCard from "@/src/components/pages/home/DataShowCard";
import React from "react";
import { People, CoinBag, Money } from "@/src/assets/images/Images.js";
import { Colors } from "@/src/assets/colors";
import Spacer from "@/src/components/Spacer";
import ClientsList from "@/src/components/pages/dashboard/clientList/List";
import { ClientType, TodaysEventsType } from "@/src/types";
import useApi from "@/src/hooks/useApi";
import WishCard from "@/src/components/pages/home/WishCard";
import { GetClientsDetails, GetTodaysEventApi } from "@/src/apis";
import backgroundImage from "@/src/assets/Comingsoon.png";

const Home: React.FC = () => {
  const [todaysEvents, setTodaysEvents] = React.useState<TodaysEventsType[]>(
    []
  );

  const [clients, setClients] = React.useState<ClientType[]>([]);

  const { makeApiCall } = useApi();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const data = [
    { label: "Total AUM", number: "₹865.33", logo: <Money /> },
    { label: "Total Income", number: "₹12.98L", logo: <CoinBag /> },
  ];

  //api call for client list
  React.useEffect(() => {
    setLoading(true);
    makeApiCall(GetClientsDetails())
      .then((response) => {
        console.log("Client list response", response);
        setClients(response.data);
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to fetch client details.");
      })
      .finally(() => setLoading(false));
  }, [makeApiCall]);

  //api call for todays events
  React.useEffect(() => {
    makeApiCall(GetTodaysEventApi())
      .then((response) => {
        console.log("Today's events response", response);
        setTodaysEvents(response.data);
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to fetch today's events.");
      });
  }, [makeApiCall]);

  return (
    <div>
      <div className="container mx-auto pb-5">
        {error && <div className="text-red-500">{error}</div>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <DataShowCard
            key={"Active Clients"}
            label={"Active Clients"}
            number={clients.length.toString()}
            logo={<People />}
          />
          {data?.map((item) => (
            <DataShowCard
              key={item.label}
              label={item.label}
              number={item.number}
              logo={item.logo}
            />
          ))}
        </div>
      </div>
      <div className="flex gap-2 justify-between ">
        <div className="w-[65%] ">
          <div className="flex flex-row justify-between items-center">
            <p
              style={{ color: Colors.textBase }}
              className="text-2xl font-normal font-rubik text-black "
            >
              Active Leads
            </p>
            <a
              href="/clients"
              style={{ color: Colors.textLink }}
              className="text-sm font-light font-rubik text-black mr-2 "
            >
              View all
            </a>
          </div>

          <Spacer size="xs" />
          {loading ? (
            <p>Loading clients...</p>
          ) : (
            <ClientsList clientList={clients} loading={false} />
          )}
        </div>

        <div className="w-[32%]">
          <p
            style={{ color: Colors.textBase }}
            className="text-2xl font-normal font-rubik text-black  "
          >
            Upcoming Events
          </p>

          <div className="p-4 py-2 mt-3 h-[40vh] max-h-[40vh] overflow-y-auto  rounded-2xl shadow-md">
            {todaysEvents?.map((wish, index) => (
              <WishCard key={index} event={wish} />
            ))}
          </div>
        </div>
      </div>

      {/* 3-Column Layout Using Flex */}
      <div className="flex w-full py-2 mt-6 gap-4">
        <div
          className="flex-1 p-4  bg-white rounded-lg shadow-md "
          style={{
            backgroundImage: `url(${backgroundImage.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="flex-1 p-4 bg-white rounded-lg shadow-md">
          <div>
            <h1 className="text-black text-xl font-light font-rubik">
              Latest News
            </h1>
          </div>
        </div>
        <div className="flex-1 p-4 bg-white rounded-lg shadow-md">
          <div className="text-center">
            <p className="text-lg font-semibold">Right Section</p>
            <p>Content for the right section goes here.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
