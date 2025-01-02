import { GetClientDetails } from "@/src/apis";
import InfoCard from "@/src/components/cards/InfoCard";
import useApi from "@/src/hooks/useApi";
import { ClientData } from "@/src/types";
import React from "react";
import aiLogo from "@/src/assets/ai.svg";
import Image from 'next/image'
import { Colors } from "@/src/assets/colors.js";
import Button from "../../../Button.tsx";
interface Props {
  clientId: string;
}

const ClientDetails = ({ clientId }: Props) => {
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
      <div  className="my-3"  style={{ display: 'flex', alignItems: 'center' }}>
<Image 
        src={aiLogo} // Path to your SVG in the 'public' directory
        alt="My Logo"
        width={25} 
        height={25} 
      />    
    <span className="text-black text-lg font-light font-rubik my-1">  Client Basic Info  </span>
    <Button
          style={{ color: Colors.textprimary, marginLeft: "auto" }}
                  className=" bg-yellow-500"
          onClick={() => {}}
        >
          {client.status}
        </Button>
      </div>

        <div className="flex flex-row gap-[8%] shadow-lg p-4 rounded-lg" style={{backgroundColor:"#f9f9f9"}}>
          {/* Left section with client name, mobile, and risk profile */}
          <div className="flex flex-col">
            <InfoCard title="Client Name" description={client.name} />
            
            <InfoCard
              title="Risk Profile"
              description={client.status || "Unknown"}
            />
             <InfoCard
              title="Marital Status"
              description={client.status || "Unknown"}
            />
           
          
          </div>

          {/* Middle section with status and email */}
          <div>
          <InfoCard
              title="Email"
              description={client.email || "Not Provided"}
            />
           <InfoCard
              title="Age"
              description={client.age?.toString() || "Not Provided"}
            />
             <InfoCard
              title="Estimated Salary"
              description={client.status || "Unknown"}
            />
          </div>

          {/* Right section with segment and age */}
          <div>
          <InfoCard title="Mobile" description={client.phone} />

            <InfoCard
              title="Profession"
              description={client.profession || "Not Provided"}
            />
               <InfoCard
              title="Dependents"
              description={client.status || "Unknown"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDetails;
