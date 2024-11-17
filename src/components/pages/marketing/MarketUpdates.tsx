import { GetMarketing } from "@/src/apis";
import useApi from "@/src/hooks/useApi";
import { MarketingContent } from "@/src/types";
import React from "react";
import BlogCard from "./BlogCard";

const MarketUpdates = () => {
  const { makeApiCall } = useApi();

  const [content, setContent] = React.useState<MarketingContent[]>([]);
  const [loading, setLoading] = React.useState(true);

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

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {content?.map((data, index) => (
          <BlogCard key={index} blog={data} />
        ))}
      </div>
    </div>
  );
};

export default MarketUpdates;
