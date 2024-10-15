"use client";
import React from "react";
import ClientNumbersList from "@/src/components/pages/clients/List";
import Spacer from "@/src/components/Spacer";
import { Client } from "@/src/types";

const Clients = () => {
  const [rentalLoading, setRentalLoading] = React.useState(false);
  // const [clientRentalNumbers, setClientIRentalNumbers] = React.useState<
  //   Client[]
  // >([]);

  const dummyClientList: Client[] = [
    {
      ID: 1,
      Name: "John Doe",
      UpdatedAt: "2023-10-01T12:00:00Z",
      DeletedAt: null,
      Contact: "john.doe@example.com",
      Status: 1,
      PhoneNumber: "123-456-7890",
      Date: "2023-09-25",
      Amount: 5000,
      Profession: "Software Engineer",
    },
    {
      ID: 2,
      Name: "Jane Smith",
      UpdatedAt: "2023-10-02T14:30:00Z",
      DeletedAt: null,
      Contact: "jane.smith@example.com",
      Status: 0,
      PhoneNumber: "987-654-3210",
      Date: "2023-09-26",
      Amount: 7500,
      Profession: "Graphic Designer",
    },
    {
      ID: 3,
      Name: "Alice Johnson",
      UpdatedAt: "2023-10-03T09:15:00Z",
      DeletedAt: null,
      Contact: "alice.johnson@example.com",
      Status: 1,
      PhoneNumber: "555-123-4567",
      Date: "2023-09-27",
      Amount: 3000,
      Profession: "Project Manager",
    },
    {
      ID: 4,
      Name: "Bob Brown",
      UpdatedAt: "2023-09-28T11:45:00Z",
      DeletedAt: "2023-10-05T10:00:00Z",
      Contact: "bob.brown@example.com",
      Status: 2,
      PhoneNumber: "222-333-4444",
      Date: "2023-09-28",
      Amount: 1500,
      Profession: "Data Analyst",
    },
  ];

  return (
    <div>
      <div className="text-black bg-pageBackground px-10 min-h-screen ">
        <Spacer size="sm" />
        <ClientNumbersList clients={dummyClientList} loading={rentalLoading} />
      </div>
    </div>
  );
};

export default Clients;
