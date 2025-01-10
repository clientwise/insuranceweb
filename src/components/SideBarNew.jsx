"use client";
import React from "react";
import { useContext, createContext, useState } from "react";
import Link from "next/link";
import { nextLocalStorage } from "@/src/utils/nextLocalStorage";
import Logo2 from "../../src/assets/kuantslogo.svg";
import Image from "next/image";
import { gradients } from "@/src/assets/colors";

const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const [expanded] = useState(true);
  // const name = nextLocalStorage()?.getItem("name") ?? "name";
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
        className={`fixed top-0   hidden sm:block left-0 z-40 w-[17%] pt-0 h-screen sm:translate-x-0 transition-all ${
          expanded ? "  hidden sm:block" : "w-[5%] hidden sm:block"
        }`}
      >
        <nav className="h-full flex flex-col   shadow-lg">
          <div className="p-4 pb-4 flex justify-between items-center mb-8">
            <div className="flex flex-col">
              <Image
                src={Logo2}
                alt="logo"
                className={`overflow-hidden transition-all ${
                  expanded ? "w-30" : "w-0"
                }`}
              />
            </div>
          </div>

          <SidebarContext.Provider value={{ expanded }}>
            <ul className="flex-1 px-3">{children}</ul>
          </SidebarContext.Provider>
        </nav>
      </aside>
    </div>
  );
}

export function SidebarItem({ icon, text, active, href }) {
  const { expanded } = useContext(SidebarContext);

  return (
    <Link href={href}>
      <li
        className={`relative flex items-center py-2 px-3 my-1 mx-3 font-normal rounded-md cursor-pointer transition-colors group ${
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
          className={`overflow-hidden transition-all font-rubik font-light ${
            expanded ? "w-52 ml-3" : "w-0"
          }  ${
            active
              ? "text-white" // Only the text color
              : "text-black"
          }`}
          style={{ fontSize: "14px" }}
        >
          {text}
        </span>
        {/* {alert && (
          <div
            className={`absolute right-2 w-2 h-2 rounded bg-violet-300 ${
              expanded ? "" : "top-2"
            }`}
          />
        )} */}

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
