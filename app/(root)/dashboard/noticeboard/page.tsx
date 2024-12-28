"use client";
import React from "react";
import Spacer from "@/src/components/Spacer";
import NoticeboardTable from "@/src/components/pages/noticeboard/noticetable";

const NoticeBoard = () => {
  return (
    <div>
      <div className="text-black bg-pageBackground px-2 min-h-screen ">
        <Spacer size="sm" />
        <p className="text-lg font-normal font-rubik text-black ">NoticeBoard</p>
        <Spacer size="xs" />
        <div>
          <NoticeboardTable />
        </div>
      </div>
    </div>
  );
};

export default NoticeBoard;
