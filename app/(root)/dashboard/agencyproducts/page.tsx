"use client";
import React from "react";
import Spacer from "@/src/components/Spacer";
import { ProductType } from "@/src/types";
import useApi from "@/src/hooks/useApi";
import { GetsAgencyProducts } from "@/src/apis";
import { useDisclosure } from "@nextui-org/react";
import { nextLocalStorage } from "@/src/utils/nextLocalStorage";
import AgencyProductList from "@/src/components/pages/agencyproducts/List";
import ProductAddModal from "@/src/components/pages/agencyproducts/ProductAddModal";

const Agents = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [products, setProducts] = React.useState<ProductType[]>([]);

  const { makeApiCall } = useApi();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const agency_id = nextLocalStorage()?.getItem("agency_id") ?? "";

    setLoading(true);
    makeApiCall(GetsAgencyProducts(parseInt(agency_id)))
      .then((response) => {
        console.log("products list response", response);
        setProducts(response?.products);
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
        <ProductAddModal
          onOpen={onOpen}
          isOpen={isOpen}
          onOpenChange={onopentoggle}
          onClose={oncloseModal}
          clientId={"2"}
        />
        <Spacer size="sm" />
        <AgencyProductList
          products={products}
          loading={loading}
          onOpen={onOpen}
        />
      </div>
    </div>
  );
};

export default Agents;
