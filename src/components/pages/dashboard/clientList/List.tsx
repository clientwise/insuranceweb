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
  Chip,
} from "@nextui-org/react";

import { CiFilter, CiSearch } from "react-icons/ci";
import { ClientType, SelectType } from "@/src/types.js";
import Action from "./Action";
import Row from "@/src/components/Row";
import Button from "@/src/components/Button";
import Select from "@/src/components/common/Select";

interface Props {
  clientList: ClientType[];
  loading: boolean;
}

const COLUMNS = [
  {
    name: "Sr No.",
    key: "sr_no",
    sortable: true,
  },
  {
    name: "Name",
    key: "Name",
    sortable: true,
  },

  {
    name: "Contact",
    key: "Contact",
  },
  {
    name: "Status",
    key: "Status",
  },
  {
    name: "Action",
    key: "action",
  },
];

export default function ClientsList({ clientList, loading }: Props) {
  const [filterValue, setFilterValue] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  const [showFilter, setShowFilter] = React.useState(false);
  const [selectedState, setSelectedState] = React.useState("all"); // State for selected filter
  const [tempselectedState, setTempSelectedState] = React.useState("all"); // Temp state for selected filter
  const [dropdownFilter, setDropdownFilters] = React.useState<SelectType[]>([]);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "sr_no",
    direction: "ascending",
  });

  React.useEffect(() => {
    const dropdownOptionsData: SelectType[] = clientList
      .map((item: ClientType) => ({
        value: item.name,
        label: item.name,
      }))
      .filter(
        (option, index, self) =>
          index === self.findIndex((o) => o.value === option.value)
      );

    dropdownOptionsData.unshift({ value: "all", label: "All" });

    setDropdownFilters(dropdownOptionsData);
  }, [clientList]);

  const pages = React.useMemo(() => {
    if (clientList.length === 0) {
      return 1;
    }
    return Math.ceil((clientList?.length ?? 1) / rowsPerPage);
  }, [clientList, rowsPerPage]);

  const hasSearchFilter = Boolean(filterValue);
  const [page, setPage] = React.useState(1);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...clientList];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(filterValue.toLowerCase()) ||
          user.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    if (selectedState !== "all" && selectedState) {
      filteredUsers = filteredUsers.filter(
        (user) => user.name === selectedState
      );
    }

    return filteredUsers;
  }, [clientList, hasSearchFilter, selectedState, filterValue]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  // Handle the state selection change
  const handleStateSelect = (value: string) => {
    setTempSelectedState(value);
  };

  const renderStatus = React.useCallback((item: ClientType) => {
    switch (item?.status) {
      case "0":
        return (
          <Chip variant="flat" color="success" size="sm">
            Upload aadhaar
          </Chip>
        );
      case "1":
        return (
          <Chip color="danger" variant="flat" size="sm">
            Signature pending
          </Chip>
        );
      case "2":
        return (
          <Chip variant="flat" color="warning" size="sm">
            Upload PAN
          </Chip>
        );
      case "3":
        return (
          <Chip variant="flat" color="success" size="sm">
            Signature pending
          </Chip>
        );
      default:
        return (
          <Chip variant="flat" color="success" size="sm">
            Upload PAN
          </Chip>
        );
    }
  }, []);

  const renderCell = React.useCallback(
    (client: ClientType, columnKey: React.Key) => {
      const index = clientList.map((object) => object.id).indexOf(client.id);
      switch (columnKey) {
        case "sr_no":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{index + 1}</p>
            </div>
          );
        case "Name":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{client.name}</p>
            </div>
          );
        case "Contact":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{client.phone}</p>
            </div>
          );
        case "Status":
          return renderStatus(client);
        case "action":
          return (
            <div className="flex">
              <Action item={client} />
            </div>
          );
        default:
          return null;
      }
    },
    [clientList, renderStatus]
  );

  const bottomContent = React.useMemo(() => {
    return (
      <div className="px-2 flex justify-between items-center">
        <Pagination
          showControls
          classNames={{
            item: "bg-pageBackground w-6 h-6 min-w-4 font-poppins",
            cursor: "w-6 h-6 min-w-4 font-poppins",
          }}
          color="default"
          isDisabled={hasSearchFilter}
          page={page}
          total={pages}
          variant="light"
          onChange={setPage}
        />
        <div className="flex justify-between items-center">
          <label className="flex items-center text-small font-poppins text-black font-light ">
            Items per page:&nbsp;
            <select
              className="border-none shadow-sm outline-none text-default-400 text-small font-poppins font-light px-1 py-0 rounded-md"
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
        "font-poppins",
        "font-regular",
        "text-sm",
      ],
      td: [
        "group-data-[first=true]:first:before:rounded-none",
        "group-data-[first=true]:last:before:rounded-none",
        "group-data-[middle=true]:before:rounded-none",
        "group-data-[last=true]:first:before:rounded-none",
        "group-data-[last=true]:last:before:rounded-none",
        "font-poppins",
        "font-normal",
        "text-textColorGrey",
      ],
      table: "max-h-[200px]",
      wrapper: "table-wrapper",
    }),
    []
  );

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: ClientType, b: ClientType) => {
      const first = a[sortDescriptor.column as keyof ClientType] as number;
      const second = b[sortDescriptor.column as keyof ClientType] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const topContent = React.useMemo(() => {
    return (
      <div className="relative flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end my-2">
          <Input
            isClearable
            className="focus:outline-none focus:border-none"
            classNames={{
              base: "w-full sm:max-w-[44%] focus:outline-none focus:border-none",
              inputWrapper:
                "border-0 focus:border-0 focus:outline-none focus:border-none",
              input: "border-0 focus:outline-none focus:border-none",
            }}
            placeholder="Search by schedule number..."
            size="sm"
            startContent={<CiSearch />}
            value={filterValue}
            onClear={() => {
              setFilterValue("");
              setSelectedState("all");
            }}
            onValueChange={onSearchChange}
          />

          <div className="flex gap-3">
            <Row>
              <Button
                color="default"
                variant="bordered"
                startContent={<CiFilter size={18} />}
                className="font-poppins"
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
          </div>
        </div>
        {showFilter && (
          <div className="absolute top-full mt-2 right-0 w-[20%] px-6 py-4 rounded shadow-xl z-10 bg-white">
            <p className="text-black text-base leading-8 font-poppins font-medium mt-[4%] bg-white">
              Filter
            </p>
            <div className="w-full h-5" />

            <Select
              name="filter"
              item={dropdownFilter}
              label="State"
              placeholder="State"
              onSelect={handleStateSelect}
              className="font-poppins text-xl font-light"
            />
            <div>
              <Row>
                <Button
                  color="default"
                  className="font-poppins font-light text-sm bg-buttonprimary text-white w-[100%] mt-4"
                  size="md"
                  radius="sm"
                  onClick={() => {
                    setSelectedState(tempselectedState);
                    setShowFilter(false);
                  }}
                >
                  Filter
                </Button>
              </Row>{" "}
            </div>
          </div>
        )}
      </div>
    );
  }, [
    filterValue,
    onSearchChange,
    showFilter,
    selectedState,
    tempselectedState,
    dropdownFilter,
  ]);

  return (
    <div className="flex flex-col">
      <Table
        selectionMode="single"
        classNames={classNames}
        bottomContent={bottomContent}
        bottomContentPlacement="inside"
        sortDescriptor={sortDescriptor}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={COLUMNS}>
          {(column) => (
            <TableColumn
              allowsSorting={column.sortable}
              key={column.key}
              align={column.key === "action" ? "end" : "start"}
              width={column.key === "action" ? 100 : undefined}
              className="text-center"
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
              key={`${item.id}-${item.id}`}
              className="cursor-pointer h-12"
            >
              {(columnKey) => (
                <TableCell className=" text-center ">
                  {renderCell(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
