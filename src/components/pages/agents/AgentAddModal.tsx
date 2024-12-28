import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Tabs,
  Tab,
} from "@nextui-org/react";
import AddAgent from "./AddAgent";
import AddAgentMultiple from "./AddAgentMultiple";

interface Props {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  onClose: () => void;
  clientId: string;
}

export default function AgentAddModal({
  isOpen,
  onOpenChange,
  onClose,
}: Props) {
  const [selected, setSelected] = React.useState<React.Key>("order-details");

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
                Add Agent
              </ModalHeader>
              <ModalBody>
                <Tabs
                  aria-label="Options"
                  selectedKey={selected.toString()}
                  onSelectionChange={setSelected}
                >
                  <Tab key="single" title="Add single">
                    <AddAgent onClose={onClose} />
                  </Tab>

                  <Tab key="multiple" title="Add Multiple">
                    <AddAgentMultiple />
                  </Tab>
                </Tabs>
              </ModalBody>

              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
