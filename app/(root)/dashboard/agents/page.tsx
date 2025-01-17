"use client";
import React from "react";
import Spacer from "@/src/components/Spacer";
import { AgentType } from "@/src/types";
import useApi from "@/src/hooks/useApi";
import { GetsAgentsDetails } from "@/src/apis";
import { useDisclosure } from "@nextui-org/react";
import AgentNumbersList from "@/src/components/pages/agents/List";
import AgentAddModal from "@/src/components/pages/agents/AgentAddModal";
import { nextLocalStorage } from "@/src/utils/nextLocalStorage";

const Agents = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [agents, setAgents] = React.useState<AgentType[]>([]);

  const { makeApiCall } = useApi();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const agency_id = nextLocalStorage()?.getItem("agency_id") ?? "";

    setLoading(true);
    makeApiCall(GetsAgentsDetails(parseInt(agency_id)))
      .then((response) => {
        console.log("agent list response", response);
        setAgents(response?.agents);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setLoading(false));
  }, [makeApiCall]);

  const onopentoggle = React.useCallback(() => {
    onOpenChange();
  }, [onOpenChange]);

  const oncloseModal = React.useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <div>
      <div className="text-black bg-pageBackground px-1 min-h-screen ">
        <AgentAddModal
          onOpen={onOpen}
          isOpen={isOpen}
          onOpenChange={onopentoggle}
          onClose={oncloseModal}
          clientId={"2"}
        />
        <Spacer size="sm" />
        <AgentNumbersList agents={agents} loading={loading} onOpen={onOpen} />
      </div>
    </div>
  );
};

export default Agents;
