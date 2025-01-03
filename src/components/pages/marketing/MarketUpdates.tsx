import { cobrandImageApi, GetMarketing } from "@/src/apis";
import useApi from "@/src/hooks/useApi";
import { MarketingContent } from "@/src/types";
import React from "react";
import BlogCard from "./BlogCard";
import DropdownComponent from "../../common/Dropdown";
import Row from "../../common/Row";
import Spacer from "../../common/Spacer";

const MarketUpdates = () => {
  const { makeApiCall } = useApi();

  const [content, setContent] = React.useState<MarketingContent[]>([]);
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
    setLoading(true);
    makeApiCall(GetMarketing())
      .then((response) => {
        const activeProducts = response?.products?.filter(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (product: any) => product?.status === "active"
        );
        setContent(activeProducts);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setLoading(false));
  }, [makeApiCall]);

  const handleImageClick = React.useCallback(
    (content_file_url: string) => {
      const trimmedUrl = content_file_url.trim();

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

  const filteredContent = content.filter((item) => {
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

  // Function to reset filters
  const resetFilters = () => {
    setSelectedCategory("");
    setSelectedProductType("");
    setSelectedLanguage("");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <Row className="flex flex-row gap-2">
        <DropdownComponent
          data={[
            { key: "Marketing", value: "Marketing" },
            { key: "Finance", value: "Finance" },
            { key: "Sales", value: "Sales" },
          ]}
          initialSelectedKey={selectedCategory}
          onSelectionChange={setSelectedCategory}
          buttonClassName=" border-0  border-b-2 border-textprimary  rounded-none text-textprimary  min-w-20"
          placeholder="Category"
        />
        <Spacer orientation="horizontal" size="xs" />
        <DropdownComponent
          data={[
            { key: "Insurance Products", value: "Insurance" },
            { key: "Sales Tips", value: "sales" },
            { key: "Marketing Tips", value: "marketing" },
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
            className="px-2  py-font-rubik text-textLink rounded-md mt-[1vh] cursor-pointer"
            style={{ alignSelf: "center", fontSize: "14px", color: "#683fdb" }}
          >
            Reset Filters
          </p>
        ) : null}
      </Row>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredContent.map((data, index) => (
          <BlogCard key={index} blog={data} onImageClick={handleImageClick} />
        ))}
      </div>
    </div>
  );
};

export default MarketUpdates;
