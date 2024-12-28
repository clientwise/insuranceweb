"use client";
import React from "react";
import Spacer from "@/src/components/Spacer";
import { InsuranceListType } from "@/src/types";
import useApi from "@/src/hooks/useApi";
import { GetInsuranceList } from "@/src/apis";
import { useDisclosure } from "@nextui-org/react";
import ProductList from "@/src/components/pages/products/List";
import Row from "@/src/components/Row";
import DropdownComponent from "@/src/components/common/Dropdown";

const Products = () => {
  const { onOpen } = useDisclosure();
  const [insurance, setInsurance] = React.useState<InsuranceListType[]>([]);

  const { makeApiCall } = useApi();
  const [loading, setLoading] = React.useState(true);

  // eslint-disable-next-line
  const navigateToClientCode = React.useCallback((clientId: React.Key) => {
    console.log(clientId, "Going to client code");
  }, []);

  React.useEffect(() => {
    setLoading(true);
    makeApiCall(GetInsuranceList())
      .then((response) => {
        console.log("insurance list response", response);
        setInsurance(response.products);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setLoading(false));
  }, [makeApiCall]);

  const [selectedCategory, setSelectedCategory] = React.useState<
    string | number
  >("");
  const [selectedProductType, setSelectedProductType] = React.useState<
    string | number
  >("");

  // Function to reset filters
  const resetFilters = () => {
    setSelectedCategory("");
    setSelectedProductType("");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div className="text-black bg-pageBackground px-1 min-h-screen ">
        <p className="text-xl font-normal font-rubik text-black ">Products</p>
        <Spacer size="xs" />
        <Row className="flex flex-row gap-2">
          <DropdownComponent
            data={[
              { key: "icici", value: "ICICI" },
              { key: "hdfc", value: "HDFC" },
            ]}
            initialSelectedKey={selectedCategory}
            onSelectionChange={setSelectedCategory}
            buttonClassName=" border-0  border-b-2 border-textprimary  rounded-none text-textprimary  min-w-20"
            placeholder="Insurer"
          />
          <Spacer orientation="horizontal" size="xs" />
          <DropdownComponent
            data={[
              { key: "Insurance", value: "Insurance" },
              { key: "Banking", value: "Banking" },
              { key: "Investment", value: "Investment" },
            ]}
            initialSelectedKey={selectedProductType}
            onSelectionChange={setSelectedProductType}
            buttonClassName=" border-0  border-b-2 border-textprimary  rounded-none text-textprimary min-w-20"
            placeholder="Type"
          />
          <Spacer orientation="horizontal" size="xs" />
          {selectedCategory != "" || selectedProductType != "" ? (
            <p
              onClick={resetFilters}
              className="px-2 py-font-rubik text-textLink rounded-md mt-[1vh] cursor-pointer"
            >
              Reset Filters
            </p>
          ) : null}
        </Row>
        <Spacer size="sm" />
        
        <ProductList
          insurance={insurance}
          loading={loading}
          onOpen={onOpen}
          onRowAction={navigateToClientCode}
        />
      </div>
    </div>
  );
};

export default Products;
