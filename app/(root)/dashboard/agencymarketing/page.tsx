"use client";
import React from "react";
import Spacer from "@/src/components/Spacer";
import { AgencyMarketingItemType } from "@/src/types";
import useApi from "@/src/hooks/useApi";
import {
  cobrandImageApi,
  GetsAgencyMarketingItems,
  UpdateStatusProduct,
} from "@/src/apis";
import { useDisclosure } from "@nextui-org/react";
import { nextLocalStorage } from "@/src/utils/nextLocalStorage";
import DropdownComponent from "@/src/components/common/Dropdown";
import Row from "@/src/components/common/Row";
import AgencyBlogCard from "@/src/components/pages/agencymarketing/AgencyBlogCard";
import Button from "@/src/components/Button";
import { Colors } from "@/src/assets/colors";
import AgencyMarketingAddModal from "@/src/components/pages/agencymarketing/AgencyMarketingAddModal";
import useToast from "@/src/hooks/useToast";

const Agents = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [marketingItems, setMarketingItems] = React.useState<
    AgencyMarketingItemType[]
  >([]);

  const { makeApiCall } = useApi();
  const { showToast } = useToast();

  const [loading, setLoading] = React.useState(true);

  const [selectedCategory, setSelectedCategory] = React.useState<
    string | number
  >("");
  const [selectedProductType, setSelectedProductType] = React.useState<
    string | number
  >("");
  const [selectedLanguage, setSelectedLanguage] = React.useState<
    string | number
  >("");

  React.useEffect(() => {
    const agency_id = nextLocalStorage()?.getItem("agency_id") ?? "";

    setLoading(true);
    makeApiCall(GetsAgencyMarketingItems(parseInt(agency_id)))
      .then((response) => {
        console.log("products list response", response);
        setMarketingItems(response?.products);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setLoading(false));
  }, [makeApiCall, setLoading]);

  const onopentoggle = React.useCallback(() => {
    onOpenChange();
  }, [onOpenChange]);

  const oncloseModal = React.useCallback(() => {
    onClose();
  }, [onClose]);

  const handleImageClick = React.useCallback(
    (content_url: string) => {
      const trimmedUrl = content_url.trim();
      makeApiCall(cobrandImageApi(trimmedUrl))
        .then((response) => {
          console.log("cobrand api image response", response);
          if (response) {
            const blob = new Blob([response]);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "downloaded-image.png";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
          }
        })
        .catch((error) => {
          console.error("Error during API call or file download:", error);
        })
        .finally(() => setLoading(false));
    },
    [makeApiCall]
  );

  const handleStatusChange = React.useCallback(
    (status: string | number, blog: AgencyMarketingItemType) => {
      makeApiCall(UpdateStatusProduct(blog?.sno, status, blog?.agency_id))
        .then((response) => {
          console.log("upcdated the status of product", response);
          if (response.success == true) {
            showToast("Status updated successfully", { type: "success" });
          }
        })
        .catch((error) => {
          console.error("Error during API call or file download:", error);
          showToast("Status  updation failed", { type: "error" });
        });
    },
    [makeApiCall, showToast]
  );

  const filteredContent = marketingItems.filter((item) => {
    const categoryMatch = selectedCategory
      ? item.content_category === selectedCategory
      : true;
    const productTypeMatch = selectedProductType
      ? item.product_type === selectedProductType
      : true;
    const languageMatch = selectedLanguage
      ? item.language === selectedLanguage
      : true;

    return categoryMatch && productTypeMatch && languageMatch;
  });

  const resetFilters = () => {
    setSelectedCategory("");
    setSelectedProductType("");
    setSelectedLanguage("");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="text-black bg-pageBackground px-1 min-h-screen ">
      <Spacer size="sm" />
      <p className="text-2xl font-normal font-rubik text-black ">Marketing</p>
      <Spacer size="xs" />

      <div>
        <AgencyMarketingAddModal
          onOpen={onOpen}
          isOpen={isOpen}
          onOpenChange={onopentoggle}
          onClose={oncloseModal}
          clientId={"2"}
        />
        <div className="flex flex-row  justify-between">
          <Row className="flex flex-row gap-2">
            <DropdownComponent
              data={[
                { key: "Marketing", value: "Marketing" },
                { key: "Finance", value: "Finance" },
                { key: "Healthcare", value: "Healthcare" },
              ]}
              initialSelectedKey={selectedCategory}
              onSelectionChange={setSelectedCategory}
              buttonClassName=" border-0  border-b-2 border-textprimary  rounded-none text-textprimary  min-w-20"
              placeholder="Category"
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
              placeholder="Product Type"
            />
            <Spacer orientation="horizontal" size="xs" />

            <DropdownComponent
              data={[
                { key: "English", value: "English" },
                { key: "Hindi", value: "Hindi" },
                { key: "Spanish", value: "Spanish" },
              ]}
              initialSelectedKey={selectedLanguage}
              onSelectionChange={setSelectedLanguage}
              buttonClassName=" border-0  border-b-2 border-textprimary rounded-none text-textprimary  min-w-20"
              placeholder="Language"
            />
            <Spacer orientation="horizontal" size="xs" />

            {selectedCategory != "" ||
            selectedProductType != "" ||
            selectedLanguage != "" ? (
              <p
                onClick={resetFilters}
                className="px-2 py-font-rubik text-textLink rounded-md mt-[1vh] cursor-pointer"
              >
                Reset Filters
              </p>
            ) : null}
          </Row>
          <Button
            style={{ color: Colors.textprimary }}
            className="rounded-lg bg-yellow-500"
            size="md"
            onClick={onOpen}
          >
            <p className="text-base font-normal font-rubik text-white">
              + Add New
            </p>
          </Button>
        </div>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredContent.map((data, index) => (
            <AgencyBlogCard
              key={index}
              blog={data}
              onImageClick={handleImageClick}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Agents;
