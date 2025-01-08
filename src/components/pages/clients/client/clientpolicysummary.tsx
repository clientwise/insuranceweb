import { GetClientDetails } from "@/src/apis";
import InfoCard from "@/src/components/cards/InfoCard";
import useApi from "@/src/hooks/useApi";
import {  ClientType } from "@/src/types";
import React from "react";
import aiLogo from "@/src/assets/ai.svg";
import Image from 'next/image'
interface Props {
  clientId: string;
}

const Policysummary = ({ clientId }: Props) => {
  const { makeApiCall } = useApi();
  const [client, setClient] = React.useState<ClientType | null>(null); // Ensure the initial state is null

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
      <div className="my-3"   style={{ display: 'flex', alignItems: 'center' }}>
<Image 
        src={aiLogo} // Path to your SVG in the 'public' directory
        alt="My Logo"
        width={25} 
        height={25} 
      />    
    <span className="text-black text-lg font-light font-rubik ">  Client Insurance OverView  </span>
      </div>

        <div className="flex flex-row gap-[8%] shadow-lg p-4 rounded-lg" style={{backgroundColor:"#f9f9f9"}}>
          {/* Left section with client name, mobile, and risk profile */}
          <div className="flex flex-col">
            
            <InfoCard
              title="Health Policy"
              description={client.health_policy || "0"}
            />
            
            <InfoCard
              title="Total Health Premium"
              description={client.total_health_premium || "0"}
            />
          </div>

          {/* Middle section with status and email */}
          <div>
          <InfoCard
              title="Life Insurance Policies"
              description={client.life_policy || "0"}
            />
      
           
      <InfoCard
              title="Life Premium"
              description={client.total_life_premium || "0"}
            />
          </div>

          {/* Right section with segment and age */}
          <div>
          <InfoCard title="Motor Insurance" description={client.motor_policy || "0"} />

          <InfoCard
              title="Motor Premium"
              description={client.total_motor_premium || "0"}
            />
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Policysummary;
