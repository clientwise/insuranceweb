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
import Action from "./Action.tsx";
import { CiFilter, CiSearch } from "react-icons/ci";
import Row from "../../Row.tsx";
import Button from "../../Button.tsx";
import Select from "../../common/Select.tsx";
import Spacer from "../../Spacer.tsx";
import { ClientType, SelectType } from "@/src/types.ts";
import { Colors } from "@/src/assets/colors.js";

interface Props {
  clients: ClientType[];
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
    name: "Name",
    key: "Name",
    sortable: true,
  },
  {
    name: "Date",
    key: "Date",
  },
  {
    name: "Amount",
    key: "Amount",
  },
  {
    name: "Profession",
    key: "Profession",
  },
  {
    name: "Status",
    key: "status",
  },
  {
    name: "Action",
    key: "action",
  },
];

export default function ClientNumbersList({
  clients,
  loading,
  onOpen,
  onRowAction,
}: Props) {
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
    const dropdownOptionsData: SelectType[] = clients
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
  }, [clients]);

  const pages = React.useMemo(() => {
    if (clients.length === 0) {
      return 1;
    }
    return Math.ceil((clients?.length ?? 1) / rowsPerPage);
  }, [clients, rowsPerPage]);

  const hasSearchFilter = Boolean(filterValue);
  const [page, setPage] = React.useState(1);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...clients];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(filterValue.toLowerCase()) ||
          user.phone.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    if (selectedState !== "all" && selectedState) {
      filteredUsers = filteredUsers.filter(
        (user) => user.name === selectedState
      );
    }

    return filteredUsers;
  }, [clients, hasSearchFilter, selectedState, filterValue]);

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
  const handleStateSelect = (value: string) => {
    setTempSelectedState(value);
  };

  const renderStatus = React.useCallback((item: ClientType) => {
    switch (item?.status) {
      case "active":
        return (
          <Chip variant="flat" color="success" size="sm">
            Active
          </Chip>
        );
      case "in_progress":
        return (
          <Chip color="danger" variant="flat" size="sm">
            In Progress
          </Chip>
        );
      case "cold_lead":
        return (
          <Chip color="danger" variant="flat" size="sm">
            Cold Lead
          </Chip>
        );
      default:
        return (
          <Chip variant="flat" color="success" size="sm">
            New Lead
          </Chip>
        );
    }
  }, []);

  const renderCell = React.useCallback(
    (client: ClientType, columnKey: React.Key) => {
      const index = clients.map((object) => object.id).indexOf(client.id);
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
        case "Amount":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {client.profession}
              </p>
            </div>
          );
        case "Date":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{client.age}</p>
            </div>
          );
        case "Profession":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {client.profession}
              </p>
            </div>
          );
        case "PhoneNumber":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{client.phone}</p>
            </div>
          );
        case "status":
          return renderStatus(client);
        case "action":
          return (
            <div className="flex">
              <Action item={client} onRowAction={onRowAction} />
            </div>
          );
        default:
          return null;
      }
    },
    [clients, onRowAction, renderStatus]
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

          <div className="flex gap-3">
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
          </div>
        </div>
        {showFilter && (
          <div className="absolute top-full mt-2 right-0 w-[20%] px-6 py-4 rounded shadow-xl z-10 bg-white">
            <p className="text-black text-base leading-8 font-rubik font-medium mt-[4%] bg-white">
              Filter
            </p>
            <div className="w-full h-5" />

            <Select
              name="filter"
              item={dropdownFilter}
              label="State"
              placeholder="State"
              onSelect={handleStateSelect}
              className="font-rubik text-xl font-light"
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
      <Spacer size="sm" />

      <div className="flex flex-row justify-between">
        <p className="text-3xl font-normal font-rubik text-black ">Clients</p>

        <Button
          style={{ color: Colors.textprimary }}
          className="rounded-lg bg-yellow-500"
          size="md"
          onClick={onOpen}
        >
          <p className="text-base font-normal font-rubik text-white">
            + Add New Client
          </p>
        </Button>
      </div>
      <Spacer size="xs" />
      <Table
        selectionMode="single"
        classNames={classNames}
        topContent={topContent}
        bottomContent={bottomContent}
        bottomContentPlacement="inside"
        sortDescriptor={sortDescriptor}
        onSortChange={setSortDescriptor}
        onRowAction={onRowAction}
        isStriped
      >
        <TableHeader columns={COLUMNS}>
          {(column) => (
            <TableColumn
              allowsSorting={column.sortable}
              key={column.key}
              align={column.key === "action" ? "end" : "start"}
              width={column.key === "action" ? 100 : undefined}
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
            <TableRow key={`${item.id}`} className="cursor-pointer h-12">
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
