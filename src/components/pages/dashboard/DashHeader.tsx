// components/Header.js
"use client";

import React from "react";
import {
  Navbar,
  NavbarContent,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

interface DashHeaderProps {
  onOpen: () => void;
}
export default function DashHeader({}: DashHeaderProps) {
  const router = useRouter();

  // const userData = JSON.parse(nextLocalStorage()?.getItem("user_data") ?? "");

  const handleLogout = React.useCallback(() => {
    localStorage.clear();
    router.replace("/login");
  }, [router]);

  return (
    <Navbar className="p-0 h-[7vh]  flex flex-row justify-between">
      <NavbarContent className="hidden sm:flex gap-3"></NavbarContent>

      <NavbarContent
        as="div"
        className=" flex flex-row justify-center items-center"
        justify="end"
      >
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              as="button"
              name="Profile"
              size="sm"
              src="https://i.imgur.com/qPP0pny.png"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="logout" color="danger" onClick={handleLogout}>
              <p className="font-semibold text-black font-rubik">Log Out</p>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
