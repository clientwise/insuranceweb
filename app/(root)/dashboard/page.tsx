"use client";

import DataShowCard from "@/src/components/pages/home/DataShowCard";
import React from "react";
import { People, CoinBag, Money } from "@/src/assets/images/Images.js";
import { Colors } from "@/src/assets/colors";
import Spacer from "@/src/components/Spacer";
import ClientsList from "@/src/components/pages/dashboard/clientList/List";
import { ClientList } from "@/src/types";
import WishCard from "@/src/components/pages/home/WishCard";

const Home: React.FC = () => {
  const data = [
    { label: "Active Clients", number: "253", logo: <People /> },
    { label: "Total AUM", number: "5690 K", logo: <Money /> },
    { label: "Total Income", number: "₹410 K", logo: <CoinBag /> },
  ];

  const wishData = [
    { label: "John Doe", date: "10th October" },
    { label: "Jane Smith", date: "25th December" },
    { label: "Alice Johnson", date: "1st January" },
  ];

  const dummyClientList: ClientList[] = [
    {
      ID: 1,
      Name: "John Doe",
      UpdatedAt: "2023-10-01T12:00:00Z",
      DeletedAt: null,
      Contact: "john.doe@example.com",
      Status: 1,
    },
    {
      ID: 2,
      Name: "Jane Smith",
      UpdatedAt: "2023-10-02T14:30:00Z",
      DeletedAt: null,
      Contact: "jane.smith@example.com",
      Status: 0,
    },
    {
      ID: 3,
      Name: "Alice Johnson",
      UpdatedAt: "2023-10-03T09:15:00Z",
      DeletedAt: null,
      Contact: "alice.johnson@example.com",
      Status: 1,
    },
    {
      ID: 4,
      Name: "Bob Brown",
      UpdatedAt: "2023-09-28T11:45:00Z",
      DeletedAt: "2023-10-05T10:00:00Z",
      Contact: "bob.brown@example.com",
      Status: 2,
    },
  ];

  return (
    <div>
      <div className="container mx-auto py-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.map((item, index) => (
            <DataShowCard
              key={index}
              label={item.label}
              number={item.number}
              logo={item.logo}
            />
          ))}
        </div>
      </div>
      <div className="flex gap-2">
        <div className="w-[65%]">
          <div className="flex flex-row justify-between items-center">
            <p
              style={{ color: Colors.textBase }}
              className="text-xl font-normal font-poppins text-black "
            >
              Active Leads
            </p>
            <p
              style={{ color: Colors.textLink }}
              className="text-sm font-ligh
              t font-poppins text-black mr-2"
            >
              View all
            </p>
          </div>

          <Spacer size="xs" />
          <ClientsList clientList={dummyClientList} loading={false} />
        </div>

        <div className="w-[35%]">
          <p
            style={{ color: Colors.textBase }}
            className="text-xl font-normal font-poppins text-black "
          >
            Upcoming Events
          </p>

          <div className="p-4">
            {wishData.map((wish, index) => (
              <WishCard key={index} label={wish.label} date={wish.date} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
