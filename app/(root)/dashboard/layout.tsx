import type { Metadata } from "next";
import Main from "@/src/components/Main";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "ClientWise",
  description: "ClientWise",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Main>
      <main>{children}</main>
    </Main>
  );
}
