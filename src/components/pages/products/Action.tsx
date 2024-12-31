import * as React from "react";
import Row from "@/src/components/Row";
import { InsuranceListType } from "@/src/types";
import { useRouter } from 'next/navigation'; // Import from next/navigation

interface Props {
  item: InsuranceListType;
  onRowAction: (productID: React.Key) => void;
}

export default function Action({ item, onRowAction }: Props) {
  const router = useRouter();

  const handleViewDetails = () => {
    // Make sure item and item.product_id are defined
    if (item && item.product_id) {  
      onRowAction(item.product_id);
      router.push(`/dashboard/products/${item.product_id}`); // Use router.push to navigate to the product details page
    } else {
      console.error("Error: item or product_id is undefined");
    }
  };

  return (
    <Row>
      <div className="flex flex-row items-center justify-center gap-3">
        <button
          onClick={handleViewDetails}
          className="text-textColorGrey cursor-pointer font-rubik"
        >
          <p className="text-textLink text-base font-light font-rubik">View</p>
        </button>
      </div>
    </Row>
  );
}