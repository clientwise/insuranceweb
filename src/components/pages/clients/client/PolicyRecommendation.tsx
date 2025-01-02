import { GetClientDetails } from "@/src/apis";
import InfoCard from "@/src/components/cards/InfoCard";
import useApi from "@/src/hooks/useApi";
import { ClientData } from "@/src/types";
import React from "react";
import aiLogo from "@/src/assets/ai.svg";
import Image from 'next/image'
interface Props {
  clientId: string
  ;
}

const PolicyRecommendation = ({ clientId }: Props) => {
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
    <div style={{ display: 'flex', alignItems: 'center' }}>
{/* <Image 
        src={aiLogo} // Path to your SVG in the 'public' directory
        alt="My Logo"
        width={25} 
        height={25} 
      />     */}
    <p>AI Insights</p>
      <div><p style={{font:"#33333"}}> Scan through all existing policies of the customer and recommend new policies</p>
          </div></div>
   
  );
};

export default PolicyRecommendation;
