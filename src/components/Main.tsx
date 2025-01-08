"use client";
import * as React from "react";
import Body from "./Body";
import { ToastContainer } from "react-toastify";
import { LocationProps } from "./Breadcrumb";
import DashHeader from "./pages/dashboard/DashHeader";
import Sidebar, { SidebarItem } from "./SideBarNew";
import { usePathname } from "next/navigation";
import Bottombar from "./pages/dashboard/Bottombar";
import { useDisclosure } from "@nextui-org/react";
import {
  Clients,
  Home,
  Marketing,
  NoticeBoard,
  Payouts,
  ProductSVG,
  Transaction,
} from "../assets/images/Images";
import { nextLocalStorage } from "../utils/nextLocalStorage";

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
            className="mt-14 ml-4"
            style={{ marginLeft: "16rem" }}
            // transition-all ${
            //   expandedMain ? "sm:ml-72" : "sm:ml-24"
            // }`}
          >
            {children}
          </div>
        </div>
      </Body>
      <Bottombar />
    </>
  );
}

function SidebarNew({}: { setExpandedMain: (expanded: boolean) => void }) {
  const pathname = usePathname();
  const is_admin = nextLocalStorage()?.getItem("is_admin") ?? "";

  const isClientsPage = pathname === "/dashboard/clients";
  const isClientDetailPage = pathname.startsWith("/dashboard/clients/");

  if (is_admin == "true") {
    return (
      <Sidebar>
        <SidebarItem
          icon={
            <Home color={pathname === "/dashboard/home" ? "#fff" : "#683FDB"} />
          }
          text={"Home"}
          active={pathname === "/dashboard/home"}
          href="/dashboard/home"
        />
        <SidebarItem
          icon={
            <Home
              color={pathname === "/dashboard/agents" ? "#fff" : "#683FDB"}
            />
          }
          text={"Agents"}
          active={pathname === "/dashboard/agents"}
          href="/dashboard/agents"
        />
        <SidebarItem
          icon={
            <ProductSVG
              color={
                pathname === "/dashboard/agencyproducts" ? "#fff" : "#683FDB"
              }
            />
          }
          text={"Products"}
          active={pathname === "/dashboard/agencyproducts"}
          href="/dashboard/agencyproducts"
        />
        <SidebarItem
          icon={
            <ProductSVG
              color={
                pathname === "/dashboard/agencymarketing" ? "#fff" : "#683FDB"
              }
            />
          }
          text={"Marketing"}
          active={pathname === "/dashboard/agencymarketing"}
          href="/dashboard/agencymarketing"
        />
      </Sidebar>
    );
  }

  return (
    <Sidebar>
      <SidebarItem
        icon={<Home color={pathname === "/dashboard" ? "#fff" : "#683FDB"} />}
        text={"Dashboard"}
        active={pathname === "/dashboard"}
        href="/dashboard"
      />
      <SidebarItem
        icon={
          <Clients
            color={isClientsPage || isClientDetailPage ? "#fff" : "#683FDB"}
          />
        }
        text={"Clients"}
        active={isClientsPage || isClientDetailPage}
        href="/dashboard/clients"
      />
      <SidebarItem
        icon={
          <Marketing
            color={pathname === "/dashboard/marketing" ? "#fff" : "#683FDB"}
          />
        }
        text={"Marketing"}
        active={pathname === "/dashboard/marketing"}
        href="/dashboard/marketing"
      />
      <SidebarItem
        icon={
          <ProductSVG
            color={pathname === "/dashboard/products" ? "#fff" : "#683FDB"}
          />
        }
        text={"Products"}
        active={pathname === "/dashboard/products"}
        href="/dashboard/products"
      />
      <SidebarItem
        icon={
          <Transaction
            color={pathname === "/dashboard/payouts" ? "#fff" : "#683FDB"}
          />
        }
        text={"Payouts"}
        active={pathname === "/dashboard/payouts"}
        href="/dashboard/payouts"
      />
      <SidebarItem
        icon={
          <NoticeBoard
            color={pathname === "/dashboard/notice-board" ? "#fff" : "#683FDB"}
          />
        }
        text={"Notice Board"}
        active={pathname === "/dashboard/noticeboard"}
        href="/dashboard/noticeboard"
      />
    </Sidebar>
  );
}
