import { GetClientDetails } from "@/src/apis";
import InfoCard from "@/src/components/cards/InfoCard";
import useApi from "@/src/hooks/useApi";
import { ClientData } from "@/src/types";
import React from "react";

interface Props {
  clientId: string;
  openPolicyAddModal: () => void;
}

const ClientDetails = ({ clientId, openPolicyAddModal }: Props) => {
  const { makeApiCall } = useApi();
  const [client, setClient] = React.useState<ClientData | null>(null); // Ensure the initial state is null

  React.useEffect(() => {
    makeApiCall(GetClientDetails(clientId))
      .then((response) => {
        console.log("Client details response", response);
        setClient(response.data); // Assuming response.data is of type Client
      })
      .catch((error) => {
        console.error("Failed to fetch client details:", error);
      });
  }, [clientId, makeApiCall]);

  // If client data is still loading, you can display a loading indicator
  if (!client) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="mt-[8%] mb-[8%]">
        <h1 className="text-black text-3xl font-light font-rubik mb-6">
          Client Details
        </h1>

        <div className="flex flex-row gap-[8%]">
          {/* Left section with client name, mobile, and risk profile */}
          <div className="flex flex-col">
            <InfoCard title="Client Name" description={client.name} />
            <InfoCard title="Mobile" description={client.phone} />
            <InfoCard
              title="Risk Profile"
              description={client.status || "Unknown"}
            />
          </div>

          {/* Middle section with status and email */}
          <div>
            <InfoCard
              title="Status"
              description={client.status || "Not Provided"}
            />
            <InfoCard
              title="Email"
              description={client.email || "Not Provided"}
            />
          </div>

          {/* Right section with segment and age */}
          <div>
            <InfoCard
              title="Segment"
              description={client.profession || "Not Provided"}
            />
            <InfoCard
              title="Age"
              description={client.age?.toString() || "Not Provided"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDetails;
