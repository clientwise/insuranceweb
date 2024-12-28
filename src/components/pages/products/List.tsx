import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Spinner,
  Pagination,
  Input,
  SortDescriptor,
} from "@nextui-org/react";
import Action from "./Action.tsx";
import { CiSearch } from "react-icons/ci";
import Row from "../../Row.tsx";
import Button from "../../Button.tsx";
import Spacer from "../../Spacer.tsx";
import { DropdownType, InsuranceListType } from "@/src/types.ts";
import DropdownComponent from "../../common/Dropdown.tsx";
import { CsvSVG, DownloadSVG } from "@/src/assets/images/Images.js";

interface Props {
  insurance: InsuranceListType[];
  loading: boolean;
  onOpen: () => void;
  onRowAction: (clientId: React.Key) => void;
}

const COLUMNS = [
  {
    name: "Sr No.",
    key: "sr_no",
    sortable: true,
  },
  {
    name: "Product ID",
    key: "product_id",
  },
  {
    name: "Product Name",
    key: "name",
    sortable: true,
  },
  {
    name: "Type",
    key: "type",
    sortable: true,

  },
 
  {
    name: "Description",
    key: "description",
  },
  {
    name: "Commission %",
    key: "commission",
    sortable: true,

  },
  {
    name: "View Details",
    key: "action",
  },
];

export default function ProductList({
  insurance,
  loading,
  onRowAction,
}: Props) {
  const [filterValue, setFilterValue] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  const [showFilter, setShowFilter] = React.useState(false);
  const [selectedState, setSelectedState] = React.useState("all"); // State for selected filter
  const [tempselectedState, setTempSelectedState] = React.useState("all"); // Temp state for selected filter
  const [, setDropdownFilters] = React.useState<DropdownType[]>([]);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "sr_no",
    direction: "ascending",
  });

  const data: DropdownType[] = React.useMemo(
    () => [
      { key: "new_lead", value: "New Lead" },
      { key: "active", value: "Active" },
      { key: "in_progress", value: "In Progress" },
      { key: "cold_lead", value: "Cold Lead" },
    ],
    []
  );

  React.useEffect(() => {
    const dropdownOptionsData: DropdownType[] = insurance
      .map((item: InsuranceListType) => ({
        key: item.category,
        value: item.category,
      }))
      .filter(
        (option, index, self) =>
          index === self.findIndex((o) => o.key === option.key)
      );
    console.log(dropdownOptionsData, "Created dropfown data");
    dropdownOptionsData.unshift({ value: "all", key: "All" });
    setDropdownFilters(dropdownOptionsData);
  }, [insurance]);

  const pages = React.useMemo(() => {
    if (!insurance) {
      return 1;
    }
    return Math.ceil((insurance?.length ?? 1) / rowsPerPage);
  }, [insurance, rowsPerPage]);

  const hasSearchFilter = Boolean(filterValue);
  const [page, setPage] = React.useState(1);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...insurance];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(filterValue.toLowerCase()) ||
          user.type.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    if (selectedState !== "all" && selectedState) {
      filteredUsers = filteredUsers.filter(
        (user) => user.name === selectedState
      );
    }

    return filteredUsers;
  }, [insurance, hasSearchFilter, selectedState, filterValue]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);
  // eslint-disable-next-line
  const onRowsPerPageChange = React.useCallback((e: any) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);
  // eslint-disable-next-line
  const onSearchChange = React.useCallback((value: any) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  // Handle the state selection change
  const handleStateSelect = (selectedKey: string | number) => {
    console.log(selectedKey, "Selected key in client filter dropdown");
    setTempSelectedState(selectedKey.toString());
  };

  const renderCell = React.useCallback(
    (product: InsuranceListType, columnKey: React.Key) => {
      const index = insurance
        .map((object) => object.product_id)
        .indexOf(product.product_id);
      switch (columnKey) {
        case "sr_no":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{index + 1}</p>
            </div>
          );
        case "name":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{product.name}</p>
            </div>
          );
        case "type":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{product.category}</p>
            </div>
          );
        case "category":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{product.category}</p>
            </div>
          );
          case "product_id":
            return (
              <div className="flex flex-col">
                <p className="text-bold text-sm capitalize">{product.product_id}</p>
              </div>
            );
            case "description":
              return (
                <div className="flex flex-col">
                  <p className="text-bold text-sm capitalize">{product.description}</p>
                </div>
              );
        case "commission":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize text-center">
                {product.agent_commission_percentage}%{" "}
              </p>
            </div>
          );

        case "action":
          return (
            <div className="flex">
              <Action item={product} onRowAction={onRowAction} />
            </div>
          );
        default:
          return null;
      }
    },
    [insurance, onRowAction]
  );

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          showControls
          classNames={{
            item: "bg-pageBackground w-6 h-6 min-w-4 font-rubik",
            cursor: "w-6 h-6 min-w-4 font-rubik",
          }}
          color="default"
          isDisabled={hasSearchFilter}
          page={page}
          total={pages}
          variant="light"
          onChange={setPage}
        />
        <div className="flex justify-between items-center">
          <label className="flex items-center text-small font-rubik text-black font-light ">
            Items per page:&nbsp;
            <select
              className="border-none shadow-sm outline-none text-default-400 text-small font-rubik font-light px-1 py-0 rounded-md"
              onChange={onRowsPerPageChange}
              defaultValue={"20"}
            >
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="25">25</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [hasSearchFilter, page, pages, onRowsPerPageChange]);

  const classNames = React.useMemo(
    () => ({
      th: [
        "bg-transparent",
        "text-tableHeaderColor",
        "border-b",
        "border-divider",
        "font-rubik",
        "font-regular",
        "text-sm",
      ],
      td: [
        "group-data-[first=true]:first:before:rounded-none",
        "group-data-[first=true]:last:before:rounded-none",
        "group-data-[middle=true]:before:rounded-none",
        "group-data-[last=true]:first:before:rounded-none",
        "group-data-[last=true]:last:before:rounded-none",
        "font-rubik",
        "font-normal",
        "text-textColorGrey",
      ],
      table: "min-h-[350px]",
      wrapper: "table-wrapper",
    }),
    []
  );

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: InsuranceListType, b: InsuranceListType) => {
      const first = a[
        sortDescriptor.column as keyof InsuranceListType
      ] as number;
      const second = b[
        sortDescriptor.column as keyof InsuranceListType
      ] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const topContent = React.useMemo(() => {
    return (
      <div className="relative flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="focus:outline-none focus:border-none"
            classNames={{
              base: "w-full sm:max-w-[44%] focus:outline-none focus:border-none",
              inputWrapper:
                "border-0 focus:border-0 focus:outline-none focus:border-none",
              input: "border-0 focus:outline-none focus:border-none",
            }}
            placeholder="Search by Name..."
            size="sm"
            startContent={<CiSearch />}
            value={filterValue}
            onClear={() => {
              setFilterValue("");
              setSelectedState("all");
            }}
            onValueChange={onSearchChange}
          />

          {/* <div className="flex gap-3">
            <Row>
              <Button
                color="default"
                variant="bordered"
                startContent={<CiFilter size={18} />}
                className="font-rubik"
                size="sm"
                radius="sm"
                onClick={() => {
                  setShowFilter(!showFilter);
                  setTempSelectedState(selectedState); // Reset temp state to current state
                }}
              >
                Filter
              </Button>
            </Row>
          </div> */}
        </div>
        {showFilter && (
          <div className="absolute top-full mt-2 right-0 w-[20%] px-6 py-4 rounded shadow-xl z-10 bg-white">
            <p className="text-black text-base leading-8 font-rubik font-medium mt-[4%] bg-white">
              Select Status
            </p>
            <div className="w-full h-5" />
            <DropdownComponent
              data={data}
              initialSelectedKey="Select"
              onSelectionChange={handleStateSelect}
            />
            <div>
              <Row>
                <Button
                  color="default"
                  className="font-rubik font-light text-sm bg-buttonprimary text-white w-[100%] mt-4"
                  size="md"
                  radius="sm"
                  onClick={() => {
                    setSelectedState(tempselectedState);
                    setShowFilter(false);
                  }}
                >
                  Filter
                </Button>
              </Row>
            </div>
          </div>
        )}
      </div>
    );
  }, [
    filterValue,
    onSearchChange,
    showFilter,
    data,
    selectedState,
    tempselectedState,
  ]);

  return (
    <div className="flex flex-col">

      <div className="flex flex-row justify-between">

        <div className="flex flex-row justify-between">
          {/* <button
            onClick={() => {}}
            className="text-textColorGrey cursor-pointer font-rubik mr-2"
            <p className="text-textLink text-base font-light font-rubik">
              Download
            </p>
          </button> */}
          {/* <button
            className="text-textColorGrey cursor-pointer font-rubik"
            title="Text"
          >
            <CsvSVG />
          </button> */}
          {/* <button
            className="text-textColorGrey cursor-pointer font-rubik"
            title="Text"
          >
            <DownloadSVG />
          </button> */}
        </div>
      </div>
      {/* <Spacer size="xs" /> */}
      <Table
        selectionMode="single"
        classNames={classNames}
        topContent={topContent}
        bottomContent={bottomContent}
        bottomContentPlacement="inside"
        sortDescriptor={sortDescriptor}
        onSortChange={setSortDescriptor}
        // onRowAction={onRowAction}
        isStriped
      >
        <TableHeader columns={COLUMNS}>
          {(column) => (
            <TableColumn
              allowsSorting={column.sortable}
              key={column.key}
              align={"start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={!loading && "No rows to display."}
          items={sortedItems}
          isLoading={loading}
          loadingContent={<Spinner label="Loading..." />}
        >
          {(item) => (
            <TableRow
              key={`${item.product_id}`}
              className="cursor-pointer h-12"
            >
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
