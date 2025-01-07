"use client";

import DataShowCard from "@/src/components/pages/home/DataShowCard";
import React from "react";
import { People, CoinBag, Money } from "@/src/assets/images/Images.js";
import { Colors } from "@/src/assets/colors";
import Spacer from "@/src/components/Spacer";
import ClientsList from "@/src/components/pages/dashboard/clientList/List";
import { AgentCommissions, ClientType, NewsItem, TodayNoticeType, TodaysEventsType } from "@/src/types";
import useApi from "@/src/hooks/useApi";
import { nextLocalStorage } from "@/src/utils/nextLocalStorage";

import WishCard from "@/src/components/pages/home/WishCard";
import {
  GetAgentCommmisions,
  GetClientsDetails,
  GetDashboardNews,
  GetDashboardNotice,
  GetTodaysEventApi,
} from "@/src/apis";
import backgroundImage from "@/src/assets/Comingsoon.png";

const Home: React.FC = () => {
  const [todaysEvents, setTodaysEvents] = React.useState<TodaysEventsType[]>(
    []
  );


  const [clients, setClients] = React.useState<ClientType[]>([]);
  const [news, setNews] = React.useState<NewsItem[]>([]);
  const [notice, setNotice] = React.useState<TodayNoticeType[]>([]);
  const [commission, setCommission] = React.useState<AgentCommissions[]>([]);
  const [totalPremium, setTotalPremium] = React.useState(0);
  const [completedPolicies, setCompletedPolicies] = React.useState(0);

  const { makeApiCall } = useApi();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const data = [
    { status: "completed", premiumAmount: 0, label: "Total Policy Sold", number: "0", logo: <Money /> },
    { status: "completed", premiumAmount: 0, label: "Total Commission", number: "0", logo: <CoinBag /> },
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


  //api call for client list
  React.useEffect(() => {
    setLoading(true);
    const agentID = nextLocalStorage()?.getItem("id")  ?? ""; 
    const agency_id = nextLocalStorage()?.getItem("agency_id")  ?? "";

    makeApiCall(GetAgentCommmisions(agentID, agency_id))
      .then((response) => {
        console.log("commisson", response.data)
        setCommission(response.data);
        const totals = calculateTotals(data);
        setTotalPremium(totals.totalPremium);
        setCompletedPolicies(totals.completedPolicies);
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to fetch client details.");
      })
      .finally(() => setLoading(false));
  }, [makeApiCall]);

  React.useEffect(() => {
    makeApiCall(GetTodaysEventApi())
      .then((response) => {
        if (response.data != null) {
          setTodaysEvents(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to fetch today's events.");
      });
  }, [makeApiCall]);

  React.useEffect(() => {
    setLoading(true);
    makeApiCall(GetDashboardNotice())
      .then((response) => {
        // Assuming response.data is an object with a 'notice' property that is an array
        if (Array.isArray(response.notices)) { 
          setNotice(response.notices);
        } else {
          console.error("Invalid notice data format:", response.data);
          // Handle the case where response.data.notice is not an array
        }
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to fetch dashboard news.");
      })
      .finally(() => setLoading(false));
  }, [makeApiCall]);


  //api call for dashbaord news
  React.useEffect(() => {
    setLoading(true);
    makeApiCall(GetDashboardNews())
      .then((response) => {

        setNews(response);
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to fetch  dashboard news.");
      })
      .finally(() => setLoading(false));
  }, [makeApiCall]);
  
  function calculateTotals(data: { status: string; premiumAmount: number }[]) {
    let totalPremium = 0;
    let completedPolicies = 0;

    for (const item of data) {
      if (item.status === "completed") {
        totalPremium += item.premiumAmount;
        completedPolicies++;
      }
    }

    return { totalPremium, completedPolicies };
  }
  return (
    <div>
      <div className="container mx-auto pb-5">
        {error && <div className="text-red-500">{error}</div>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {!clients ?  (
  <div className="your-empty-state-class"> 
    {/* Content for empty clients case */}
    <DataShowCard
      key={"Active Clients"}
      label={"Active Clients"}
      number={"0"}
      logo={<People />}
    />
     
       {data?.map((item) => (
      <DataShowCard
        key={item.label}
        label={item.label}
        number={item.number}
        logo={item.logo}
      />
    ))}   {/* You can add a button or other elements here */}
  </div>
) : (
  <>
    <DataShowCard
      key={"Active Clients"}
      label={"Active Clients"}
      number={clients.length.toString()}
      logo={<People />}
    />
    <DataShowCard
      key={"Policy Sold/In Process"}
      label={"Policy Sold"}
      number={completedPolicies.toString()}
      logo={<Money />}
    />
    <DataShowCard
      key={"Total Commission Till Date"}
      label={"Total Commission"}
      number={totalPremium.toString()}
      logo={<CoinBag />}
    />
  </>
)}
        </div>
      </div>
      <div className="flex gap-2 justify-between ">
        <div className="w-[65%] ">
          <div className="flex flex-row justify-between items-center">
            <p
              style={{ color: Colors.textBase }}
              className="text-lg font-normal font-rubik text-black "
            >
              Active Leads
            </p>
            <a
              href="/dashboard/clients"
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
            className="text-lg font-normal font-rubik text-black  "
          >
            Upcoming Events
          </p>

          <div className="p-4 py-2 mt-3 h-[40vh] max-h-[40vh] overflow-y-auto rounded-2xl shadow-md">
            {todaysEvents?.length == 0 ? (
              <p className="text-sm font-normal font-rubik text-black">
                No events
              </p>
            ) : (
              todaysEvents?.map((wish, index) => (
                <WishCard key={index} event={wish} />
              ))
            )}
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

        <div className="flex-1 p-4 rounded-lg shadow-md">
          <div>
          <h1>Latest Industry News</h1>
            <p
              style={{ color: Colors.textBase }}
              className="text-xs font-normal font-rubik text-black"
              onClick={() => window.open(news[0]?.news_url, "_blank")}
            >
              {news[0]?.news_heading}
            </p>
            <p
              style={{ color: Colors.textBase }}
              className="text-xs font-normal font-rubik text-black"
            >
              {new Date(news[0]?.news_date).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div
          className="flex-1 p-4  bg-white rounded-lg shadow-md "
        ><h1>             Notice
</h1>
<p
              style={{ color: Colors.textBase }}
              className="text-xs font-normal font-rubik text-black"
            >
 {notice[0]?.title}             </p>
            <p
              style={{ color: Colors.textBase }}
              className="text-xs font-normal font-rubik text-black"
            >
   {notice[0]?.content}        
              </p>
        </div>
        </div>
    </div>
  );
};

export default Home;
