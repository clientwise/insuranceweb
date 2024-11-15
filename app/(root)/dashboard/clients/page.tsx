"use client";
import React from "react";
import ClientNumbersList from "@/src/components/pages/clients/List";
import Spacer from "@/src/components/Spacer";
import { ClientType } from "@/src/types";
import { useRouter } from "next/navigation";
import useApi from "@/src/hooks/useApi";
import { GetClientsDetails } from "@/src/apis";
import ClientAddModal from "@/src/components/pages/clients/ClientAddModal";
import { useDisclosure } from "@nextui-org/react";

const Clients = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [clients, setClients] = React.useState<ClientType[]>([]);

  const { makeApiCall } = useApi();
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();

  // const [clientRentalNumbers, setClientIRentalNumbers] = React.useState<
  //   Client[]
  // >([]);
  // eslint-disable-next-line
  const navigateToClientCode = React.useCallback(
    (clientId: React.Key) => {
      console.log(clientId, "Going to client code");
      router.push(`/dashboard/clients/${clientId}`);
    },
    [router]
  );

  // const handleRowAction = React.useCallback(
  //   (shipmentId: React.Key) => {
  //     router.push(`/shipment/${clientCode}/${shipmentId}`);
  //   },
  //   [clientCode, router]
  // );
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
        <ClientAddModal
          onOpen={onOpen}
          isOpen={isOpen}
          onOpenChange={onopentoggle}
          onClose={oncloseModal}
          clientId={"2"}
        />
        <Spacer size="sm" />
        <ClientNumbersList
          clients={clients}
          loading={loading}
          onOpen={onOpen}
          onRowAction={navigateToClientCode}
        />
      </div>
    </div>
  );
};

export default Clients;
