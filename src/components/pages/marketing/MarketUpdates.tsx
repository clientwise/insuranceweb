import { GetMarketing } from "@/src/apis";
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
        console.log("Marketing list response", response);
        setContent(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setLoading(false));
  }, [makeApiCall]);

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
            { key: "Healthcare", value: "Healthcare" },
          ]}
          initialSelectedKey={selectedCategory}
          onSelectionChange={setSelectedCategory}
          buttonClassName=" border-0  border-b-2 border-textprimary  rounded-none text-textprimary"
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
          buttonClassName=" border-0  border-b-2 border-textprimary  rounded-none text-textprimary"
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
          buttonClassName=" border-0  border-b-2 border-textprimary rounded-none text-textprimary"
        />
        <Spacer orientation="horizontal" size="xs" />

        <p
          onClick={resetFilters}
          className="px-2 py-font-rubik text-textLink rounded-md mt-[1vh] cursor-pointer"
        >
          Reset Filters
        </p>
      </Row>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredContent.map((data, index) => (
          <BlogCard key={index} blog={data} />
        ))}
      </div>
    </div>
  );
};

export default MarketUpdates;
