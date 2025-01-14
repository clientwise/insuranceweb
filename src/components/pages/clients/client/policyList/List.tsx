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
  SortDescriptor,
  Chip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

import { PolicyType, SelectType } from "@/src/types.js";

interface Props {
  policyList?: PolicyType[];
  loading: boolean;
}

const COLUMNS = [
  {
    name: "Sr No.",
    key: "sr_no",
    sortable: true,
  },
  {
    name: "Policy Name",
    key: "Policy Name",
    sortable: true,
  },


  {
    name: "Premium",
    key: "Premium",
  },
  {
    name: "Policy Type",
    key: "policy_type",
  },
  {
    name: "Business Type",
    key: "business_type",
  },

  {
    name: "Inception Date",
    key: "inception_date",
  },

  {
    name: "Status",
    key: "Status",
  },
];
/* eslint-disable */
export default function PolicyList({ policyList = [], loading }: Props) {
  const [filterValue, setFilterValue] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [showFilter, setShowFilter] = React.useState(false);
  const [selectedState, setSelectedState] = React.useState("all");
  const [tempselectedState, setTempSelectedState] = React.useState("all");
  const [dropdownFilter, setDropdownFilters] = React.useState<SelectType[]>([]);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "sr_no",
    direction: "ascending",
  });

  React.useEffect(() => {
    const dropdownOptionsData: SelectType[] = policyList
      .map((item: PolicyType) => ({
        value: item.name,
        label: item.name,
      }))
      .filter(
        (option, index, self) =>
          index === self.findIndex((o) => o.value === option.value)
      );

    dropdownOptionsData.unshift({ value: "all", label: "All" });

    setDropdownFilters(dropdownOptionsData);
  }, [policyList]);

  const pages = React.useMemo(() => {
    if (policyList?.length === 0) {
      return 1;
    }
    return Math.ceil((policyList?.length ?? 1) / rowsPerPage);
  }, [policyList, rowsPerPage]);

  const hasSearchFilter = Boolean(filterValue);
  const [page, setPage] = React.useState(1);

  const filteredItems = React.useMemo(() => {
    if (policyList?.length === 0) {
      return [];
    }

    let filteredUsers = [...policyList];

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
  }, [policyList, hasSearchFilter, selectedState, filterValue]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems?.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const onRowsPerPageChange = React.useCallback((e: any) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value: any) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const handleStatusChange = async (policyId: string, newStatus: string, amount: number) => {
    try {
      // Assuming your API endpoint is /api/policies/:id
      console.log(policyId, newStatus, amount, "policyId, newStatus, amount")
      const response = await fetch(`https://staging.api.mypolicymate.in/policy/${policyId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "Authorization":`Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({
          status: "Complete",
          amount: amount
          // Include other necessary data if needed
        })
      });

      if (response.ok) {
        // Status updated successfully

        // You might want to refetch the policy list or update the local state
        // to reflect the change immediately.
      } else {
        // Handle error responses from the API
        const errorData = await response.json();
      }
    } catch (error) {
      // Handle network errors
      console.error("Error updating policy status:", error);
    }
  };
  const renderCell = React.useCallback(
    (policy: PolicyType, columnKey: React.Key) => {
      const index = policyList
        .map((object) => object.policy_id)
        .indexOf(policy.policy_id);
      switch (columnKey) {
        case "sr_no":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{index + 1}</p>
            </div>
          );
        case "Policy Name":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{policy.policy_name}</p>
            </div>
          );
        case "Policy Type":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {policy.policy_type}
              </p>
            </div>
          );
        case "Premium":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{policy.Amount}</p>
            </div>
          );
        case "policy_type":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{policy.policy_type}</p>
            </div>
          );
        case "business_type":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{policy.buisness_type}</p>
            </div>
          );
        case "inception_date":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {policy.InceptionDate}
              </p>
            </div>
          );


        case "Status":
          return (
            <Dropdown>
              <DropdownTrigger>
                <Chip variant="flat" color="default" size="sm">
                  {policy.status}
                </Chip>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Status Actions"
                onAction={(key) => handleStatusChange(policy.PolicyId, "",policy.Amount)}
              >
                <DropdownItem key="active">Active</DropdownItem>
                <DropdownItem key="inactive">Inactive</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          );
        default:
          return null;
      }
    },
    [policyList]
  );

  const bottomContent = React.useMemo(() => {
    return (
      <div className="px-2 flex justify-between items-center">
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
              <option value="5">5</option>
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
      wrapper: "table-wrapper p-0 m-0",
      base: "min-h-[40vh] max-h-[40vh] p-0",
    }),
    []
  );

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: PolicyType, b: PolicyType) => {
      const first = a[sortDescriptor.column as keyof PolicyType] as number;
      const second = b[sortDescriptor.column as keyof PolicyType] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  return (
    <div className="flex flex-col">
      <Table
        selectionMode="single"
        classNames={classNames}
        bottomContent={bottomContent}
        bottomContentPlacement="inside"
        sortDescriptor={sortDescriptor}
        onSortChange={setSortDescriptor}
        isStriped
      >
        <TableHeader columns={COLUMNS}>
          {(column) => (
            <TableColumn
              allowsSorting={column.sortable}
              key={column.key}
              align={column.key === "action" ? "end" : "start"}
              width={column.key === "action" ? 100 : undefined}
              className="text-start"
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={!loading && "No Policies Added/Proposed to Client"}
          items={sortedItems}
          isLoading={loading}
          loadingContent={<Spinner label="Loading..." />}
        >
          {(item) => (
            <TableRow
              key={`${item.policy_id}-${item.policy_id}`}
              className="cursor-pointer h-12"
            >
              {(columnKey) => (
                <TableCell className=" text-start ">
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