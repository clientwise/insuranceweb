"use client";

import ClientDetails from "@/src/components/pages/clients/client/ClientDetails";
import EditDataModal from "@/src/components/pages/clients/client/EditDataModal";
import Events from "@/src/components/pages/clients/client/Events";
import PolicyDetails from "@/src/components/pages/clients/client/PolicyDetails";
import * as React from "react";
import { useDisclosure } from "@nextui-org/react";
import Policysummary from "@/src/components/pages/clients/client/clientpolicysummary";
import PolicyRecommendation from "@/src/components/pages/clients/client/PolicyRecommendation";
interface Props {
  params: { clientId: string };
}

export default function UploadInventory({ params }: Props) {
  const { clientId } = params;
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [modaltype, setModaltype] = React.useState("add_client_details");

  const onopentoggle = React.useCallback(() => {}, []);

  const oncloseModal = React.useCallback(() => {
    onClose();
  }, [onClose]);
  const openPolicyAddModal = React.useCallback(() => {
    setModaltype("add_policy_details");
    onOpenChange();
  }, [onOpenChange]);

  const openEventAddModal = React.useCallback(() => {
    setModaltype("add_event_details");
    onOpenChange();
  }, [onOpenChange]);

  return (
    <div>
      <EditDataModal
        onOpen={onOpen}
        isOpen={isOpen}
        onOpenChange={onopentoggle}
        type={modaltype}
        onClose={oncloseModal}
        clientId={clientId}
      />
      <div>
        <ClientDetails clientId={clientId} />
        <PolicyRecommendation clientId={clientId} />
      
      </div>
    
      <div>
        <Policysummary clientId={clientId} />
      </div>
      <div>
        <PolicyDetails
          clientId={clientId}
          openPolicyAddModal={openPolicyAddModal}
        />
      </div>

      <div>
        <Events clientId={clientId} openEventAddModal={openEventAddModal} />
      </div>
    </div>
  );
}
