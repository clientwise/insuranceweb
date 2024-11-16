import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import AddPolicy from "./policyList/AddPolicy";
import AddEvent from "./eventsList/AddEvent";

interface Props {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  onClose: () => void;
  type: string;
  clientId: string;
}

export default function EditDataModal({
  isOpen,
  onOpenChange,
  onClose,
  type,
  clientId,
}: Props) {
  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
        scrollBehavior={"inside"}
        size="2xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-textColorSecondary">
                {type === "add_client_details"
                  ? "Edit Personal Details"
                  : type === "add_policy_details"
                  ? "Add Policy"
                  : type === "add_event_details"
                  ? "Add Event Details"
                  : "Add Event"}
              </ModalHeader>

              <ModalBody>
                {type === "add_client_details" && (
                  <p className="text-black"> ADD Personal Events</p>
                )}
                {type === "add_policy_details" && (
                  <AddPolicy clientId={clientId} onClose={onClose} />
                )}
                {type === "add_event_details" && (
                  <AddEvent clientId={clientId} onClose={onClose} />
                )}
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
