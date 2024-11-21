import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import type { Selection } from "@nextui-org/react";
import { DropdownType } from "@/src/types";

interface DropdownComponentProps {
  data: DropdownType[];
  initialSelectedKey?: string | number;
  onSelectionChange: (selectedKey: string | number) => void;
  buttonClassName?: string;
}

const DropdownComponent: React.FC<DropdownComponentProps> = ({
  data,
  initialSelectedKey = "",
  onSelectionChange,
  buttonClassName = "",
}) => {
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([String(initialSelectedKey)])
  );

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  const handleSelectionChange = (newSelectedKeys: Selection) => {
    setSelectedKeys(newSelectedKeys);
    onSelectionChange(Array.from(newSelectedKeys)[0] || "");
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          variant="bordered"
          className={`capitalize text-black font-rubik text-base ${buttonClassName}`}
        >
          {selectedValue || "Select"}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Dropdown Menu"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={handleSelectionChange}
      >
        {data.map(({ key, value }) => (
          <DropdownItem
            key={String(key)}
            className="capitalize text-black font-rubik text-base"
          >
            {value}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropdownComponent;
