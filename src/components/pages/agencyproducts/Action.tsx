import * as React from "react";
import Row from "@/src/components/Row";
import { ProductType } from "@/src/types";
import Button from "../../Button";

interface Props {
  item: ProductType;
  removeProductItem: (item: ProductType) => void;
}

export default function Action({ item, removeProductItem }: Props) {
  const removeProduct = React.useCallback(() => {
    removeProductItem(item);
  }, [item, removeProductItem]);
  return (
    <Row>
      <div className="flex flex-row items-center justify-center gap-3">
        <Button
          size="sm"
          type="button"
          radius="full"
          className="bg-transparent"
          onClick={removeProduct}
        >
          <p className="text-textLink text-base font-light font-rubik">
            Remove
          </p>
        </Button>
        <button className="text-textColorGrey cursor-pointer font-rubik">
          <p className="text-textLink text-base font-light font-rubik">Pause</p>
        </button>
        <button className="text-textColorGrey cursor-pointer font-rubik">
          <p className="text-textLink text-base font-light font-rubik">Edit</p>
        </button>
      </div>
    </Row>
  );
}
