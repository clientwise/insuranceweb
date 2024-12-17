// components/Header.js
"use client";

import React from "react";
import {
  Navbar,
  NavbarContent,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
import Image from "next/image";
import BellIcon from "../../../assets/bell.svg";
import { useRouter } from "next/navigation";
import { nextLocalStorage } from "@/src/utils/nextLocalStorage";
import { Search } from "lucide-react";

interface DashHeaderProps {
  onOpen: () => void;
}
export default function DashHeader({ onOpen }: DashHeaderProps) {
  const router = useRouter();
  const name = nextLocalStorage()?.getItem("name") ?? "";

  // const userData = JSON.parse(nextLocalStorage()?.getItem("user_data") ?? "");

  const handleLogout = React.useCallback(() => {
    localStorage.clear();
    router.replace("/");
  }, [router]);

  const handleUpdateProfile = React.useCallback(() => {
    // router.replace("/updateprofile");
    onOpen();
  }, [onOpen]);

  return (
    <Navbar className="p-0 h-[7vh]  flex flex-row justify-between">
      <NavbarContent className="hidden sm:flex gap-3">
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[32rem] h-8 rounded-2xl",
            input: "text-small border-0	",
            inputWrapper: "font-normal font-rubik text-default-500 ",
          }}
          placeholder="Search ..."
          size="sm"
          startContent={<Search />}
          type="search"
        />
      </NavbarContent>

      <NavbarContent
        as="div"
        className=" flex flex-row justify-center items-center"
        justify="end"
      >
        {/* <Input
          classNames={{
            base: "max-w-full sm:max-w-[10rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
          startContent={<SearchIcon />}
          type="search"
        /> */}

        <p className="font-normal font-rubik text-sm text-tableHeaderColor">
          {name != "" ? name : ""}
        </p>

        <Image className="mr-2" height={20} src={BellIcon} alt="File" />

        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="https://cdn1.vectorstock.com/i/1000x1000/77/10/men-faceless-profile-vector-13567710.jpg"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold text-black font-rubik">
                Signed in as
              </p>
              <p className="font-semibold text-black font-rubik">
                {name != "" ? name : ""}
              </p>
            </DropdownItem>

            <DropdownItem key="help_and_feedback">
              <p
                onClick={handleUpdateProfile}
                className="font-semibold text-black font-rubik"
              >
                Update Profile
              </p>
            </DropdownItem>

            <DropdownItem key="help_and_feedback">
              <p className="font-semibold text-black font-rubik">
                Help & Feedback
              </p>
            </DropdownItem>
            <DropdownItem key="logout" color="danger" onClick={handleLogout}>
              <p className="font-semibold text-black font-rubik">Log Out</p>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
