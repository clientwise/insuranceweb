import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import AddMarketing from "./AddMarketing";

interface Props {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  onClose: () => void;
  clientId: string;
}

export default function AgencyMarketingAddModal({
  isOpen,
  onOpenChange,
  onClose,
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
              <ModalHeader className="flex flex-col gap-1 text-base font-normal font-rubik text-black">
                Add Content
              </ModalHeader>
              <ModalBody>
                <AddMarketing onClose={onClose} />
              </ModalBody>

              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}