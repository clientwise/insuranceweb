import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import { ProductType } from "@/src/types";

interface Props {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  onClose: () => void;
  clientId: string;
  type: string;
  currentItem?: ProductType; // currentItem is optional
}

export default function ProductAddModal({
  isOpen,
  onOpenChange,
  onClose,
  type,
  currentItem,
}: Props) {
  return (
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
              {type === "add_product"
                ? " Add Product"
                : type === "edit_product"
                ? " Edit Product"
                : " Add Product"}
            </ModalHeader>
            <ModalBody>
              {type === "add_product" && <AddProduct onClose={onClose} />}
              {type === "edit_product" && currentItem ? (
                <EditProduct onClose={onClose} currentItem={currentItem} />
              ) : (
                <div>Please select a product to edit.</div>
              )}
            </ModalBody>
            <ModalFooter></ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
