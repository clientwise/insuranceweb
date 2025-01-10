"use client";

import { nextLocalStorage } from "@/src/utils/nextLocalStorage";
import * as React from "react";
import { GetAgentCommmisions } from "@/src/apis";
import useApi from "@/src/hooks/useApi";
import { AgentCommissions } from "@/src/types";
import { Tabs, Tab } from "@nextui-org/react"; // Import Tabs and Tab from NextUI

export default function PayoutTable() {
  const [commission, setCommission] = React.useState<AgentCommissions[]>([]);
  const agency_id = nextLocalStorage()?.getItem("agency_id") ?? "";
  const agentID = nextLocalStorage()?.getItem("id") ?? "";
  const [isLoading, setLoading] = React.useState(true);
  const { makeApiCall } = useApi();
  const [selectedTab, setSelectedTab] = React.useState("tab1"); // State for selected tab

  React.useEffect(() => {
    setLoading(true);
    makeApiCall(GetAgentCommmisions(agentID, agency_id))
      .then((response) => {
        console.log("Events list response", response);
        if (response.data != null) {
          setCommission(response.data);
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setLoading(false));
  }, [agency_id, agentID, makeApiCall]);

  if (isLoading) return <div>Loading...</div>;
  if (commission.length == 0) return <div>No data Available</div>;

  const renderTable = (status: string) => (
    <div className="table-container">
      <table className="table-auto border-collapse border border-gray-400 w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Transaction ID</th>
            <th className="border border-gray-300 px-4 py-2">
              Transaction Type
            </th>
            <th className="border border-gray-300 px-4 py-2">Policy Number</th>
            <th className="border border-gray-300 px-4 py-2">Product Name</th>
            <th className="border border-gray-300 px-4 py-2">Premium Amount</th>
            <th className="border border-gray-300 px-4 py-2">
              Commission Amount
            </th>
            <th className="border border-gray-300 px-4 py-2">Sold Date</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>

            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody>
          {commission
            .filter((commission) => commission.status === status) // Filter by status
            .map((commission) => (
              <tr key={commission.transactionID}>
                <td className="border border-gray-300 px-4 py-2">
                  {commission.transactionID}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {commission.transaction_type}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {commission.policyNumber}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {commission.productName}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {commission.premiumAmount}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {commission.commissionAmount}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {commission.soldDate}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {commission.status}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
  return (
    <div className="table-container">
      <Tabs
        aria-label="Payout Tabs"
        selectedKey={selectedTab}
        onSelectionChange={(key) => setSelectedTab(key.toString())}
      >
        <Tab key="approved" title="Approved">
          {renderTable("completed")} {/* Pass "Approved" status */}
        </Tab>
        <Tab key="pending" title="Pending">
          {renderTable("pending")} {/* Pass "Approved" status */}
        </Tab>

        {/* Add more tabs as needed */}
      </Tabs>
    </div>
  );
}
