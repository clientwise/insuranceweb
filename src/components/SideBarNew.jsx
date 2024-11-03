"use client";
import React from "react";
import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import { useContext, createContext, useState } from "react";
import Link from "next/link";
import { nextLocalStorage } from "@/src/utils/nextLocalStorage";
import Logo2 from "../../src/assets/kuantslogo.svg";
import Image from "next/image";
import { gradients } from "@/src/assets/colors";

const SidebarContext = createContext();

export default function Sidebar({ children, setExpandedMain }) {
  const [expanded, setExpanded] = useState(true);
  // const name = nextLocalStorage()?.getItem("name") ?? "name";
  const email = nextLocalStorage()?.getItem("email") ?? "";
  const name = nextLocalStorage()?.getItem("name") ?? "";
  // eslint-disable-next-line
  const [data, setData] = React.useState();

  React.useEffect(() => {
    const storedData = nextLocalStorage()?.getItem("user_data");
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setData(parsedData);
      } catch (error) {
        console.log("USER DATA NOT PARSED", error);
      }
    }
  }, []);
  return (
    <div>
      {/* Sidebar for large devices */}
      <aside
        id="logo-sidebar"
        className={`fixed top-0  hidden sm:block left-0 z-40 w-64 pt-0 h-screen sm:translate-x-0 transition-all bg-orange-900 ${
          expanded ? "w-[18%]  hidden sm:block" : "w-[5%] hidden sm:block"
        }`}
      >
        <nav className="h-full flex flex-col bg-white border-r shadow-sm">
          <div className="p-4 pb-4 flex justify-between items-center">
            <Image
              src={Logo2}
              alt="logo"
              className={`overflow-hidden transition-all ${
                expanded ? "w-30" : "w-0"
              }`}
            />

            <button
              onClick={() => {
                setExpandedMain((curr) => !curr);
                setExpanded((curr) => !curr);
              }}
              className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
            >
              {expanded ? (
                <ChevronFirst color="#000" />
              ) : (
                <ChevronLast color="#000" />
              )}
            </button>
          </div>

          <SidebarContext.Provider value={{ expanded }}>
            <ul className="flex-1 px-3">{children}</ul>
          </SidebarContext.Provider>

          <div className="border-t flex p-3">
            <img // eslint-disable-line
              src="https://cdn1.vectorstock.com/i/1000x1000/77/10/men-faceless-profile-vector-13567710.jpg"
              alt=""
              className="w-6 h-6 rounded-md "
            />
            <div
              className={`
                flex justify-between items-center 
                overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
              `}
            >
              <div className="leading-4 text-black">
                <p> {name != "" ? name : ""}</p>
                <span className="text-xs text-gray-600">
                  <p className="text-black font-poppins font-light text-xs">
                    {email != "" ? email : ""}
                  </p>
                </span>
              </div>
              <MoreVertical size={14} color="#000" />
            </div>
          </div>
        </nav>
      </aside>
    </div>
  );
}

export function SidebarItem({ icon, text, active, alert, href }) {
  const { expanded } = useContext(SidebarContext);

  return (
    <Link href={href}>
      <li
        className={`relative flex items-center py-3 px-3 my-1 font-normal rounded-md cursor-pointer transition-colors group ${
          active
            ? "text-black" // Only the text color
            : "hover:bg-stone-200 text-gray-600"
        }`}
        style={{
          background: active ? gradients.sidebarActive : undefined, // Apply gradient when active
        }}
      >
        {icon}
        <span
          className={`overflow-hidden transition-all font-poppins font-light ${
            expanded ? "w-52 ml-3" : "w-0"
          }  ${
            active
              ? "text-white" // Only the text color
              : "text-black"
          }`}
        >
          {text}
        </span>
        {alert && (
          <div
            className={`absolute right-2 w-2 h-2 rounded bg-violet-300 ${
              expanded ? "" : "top-2"
            }`}
          />
        )}

        {!expanded && (
          <div
            className={`
            absolute left-full rounded-md px-2 py-1 ml-6
            bg-indigo-100 text-indigo-800 text-sm
            invisible opacity-20 -translate-x-3 transition-all
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
          `}
          >
            {text}
          </div>
        )}
      </li>
    </Link>
  );
}
