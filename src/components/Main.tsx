"use client";
import * as React from "react";
import Body from "./Body";
import { ToastContainer } from "react-toastify";
import { LocationProps } from "./Breadcrumb";
import DashHeader from "./pages/dashboard/DashHeader";
import Sidebar, { SidebarItem } from "./SideBarNew";
import { Home, BookmarkCheckIcon, BookText } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import Bottombar from "./pages/dashboard/Bottombar";
import { useDisclosure } from "@nextui-org/react";

interface Props {
  children: React.ReactNode;
  locations?: LocationProps[];
}

export default function Main({ children }: Props) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure(); // eslint-disable-line
  const [modaltype, setModaltype] = React.useState(""); // eslint-disable-line
  const [loading, setLoading] = React.useState(false); // eslint-disable-line

  const [expandedMain, setExpandedMain] = React.useState(true);

  return (
    <>
      <ToastContainer />
      <div
        className={`fixed top-0 left-0 right-0 transition-all ${
          expandedMain ? "sm:ml-72" : "sm:ml-24"
        }`}
      >
        <DashHeader onOpen={onOpen} />
      </div>
      <Body sideView={<SidebarNew setExpandedMain={setExpandedMain} />}>
        <div className="p-4 bg-white">
          <div
            className={`mt-14 transition-all ${
              expandedMain ? "sm:ml-72" : "sm:ml-24"
            }`}
          >
            {children}
          </div>
        </div>
      </Body>
      <Bottombar />
    </>
  );
}

function SidebarNew({
  setExpandedMain,
}: {
  setExpandedMain: (expanded: boolean) => void;
}) {
  const router = useRouter(); // eslint-disable-line
  const pathname = usePathname();

  return (
    <Sidebar setExpandedMain={setExpandedMain}>
      <SidebarItem
        icon={<Home />}
        text={"Dashboard"}
        alert={pathname === "/dashboard"}
        active={pathname === "/dashboard"}
        href="/dashboard"
      />
      <SidebarItem
        icon={<BookText />}
        text={"Clients"}
        alert={pathname === "/dashboard/clients"}
        active={pathname === "/dashboard/clients"}
        href="/dashboard/clients"
      />
      <SidebarItem
        icon={<BookText />}
        text={"Marketing"}
        alert={pathname === "/dashboard/marketing"}
        active={pathname === "/dashboard/marketing"}
        href="/dashboard/marketing"
      />
      <SidebarItem
        icon={<BookmarkCheckIcon />}
        text={"Transactions"}
        alert={pathname === "/dashboard/saved"}
        active={pathname === "/dashboard/saved"}
        href="/dashboard/saved"
      />
    </Sidebar>
  );
}
