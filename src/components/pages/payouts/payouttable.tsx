"use client";

import { nextLocalStorage } from "@/src/utils/nextLocalStorage";
import * as React from "react";

interface Notice {
  id: number;
  title: string;
  description: string;
  date: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export default function NoticeboardTable() {
  const [notices, setNotices] = React.useState<Notice[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const agency_id = nextLocalStorage()?.getItem("agency_id") ?? "";
  const authToken = nextLocalStorage()?.getItem("authToken") ?? "";

  React.useEffect(() => {
    const fetchNotices = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://staging.api.mypolicymate.in/api/notice-board/agency/" +
            agency_id,
          {
            headers: {
              Authorization: `Bearer ${authToken}`, // Replace with your actual auth token
            },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch notices");
        console.log("response of notice");
        const data = await response.json();
        const activeNotices = data.notices.filter(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (notice: any) => notice.status === "active"
        );

        setNotices(activeNotices || []); // Adjust based on the actual response structure
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotices();
  }, [agency_id, authToken]);

  if (isLoading) return <div>Loading...</div>;

  if (notices.length === 0) return <div>No notices available.</div>;

  return (
    <div className="table-container">
      <table className="table-auto border-collapse border border-gray-400 w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Notice Type</th>
            <th className="border border-gray-300 px-4 py-2">Date</th>
            <th className="border border-gray-300 px-4 py-2">Title</th>
            <th className="border border-gray-300 px-4 py-2">Description</th>
            <th className="border border-gray-300 px-4 py-2">Download</th>
          </tr>
        </thead>
        <tbody>
          {notices.map((notice) => (
            <tr key={notice.id}>
              <td className="border border-gray-300 px-4 py-2">
                {notice.CreatedAt.split("T")[0]}
              </td>

              <td className="border border-gray-300 px-4 py-2">
                {notice.content_type}
              </td>

              <td className="border border-gray-300 px-4 py-2">
                {notice.title}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {notice.content}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {notice.content_url}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
