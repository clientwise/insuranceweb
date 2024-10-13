import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Providers } from "./../providers";
import Main from "@/src/components/Main";
import "react-toastify/dist/ReactToastify.css";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["italic", "normal"],
});

export const metadata: Metadata = {
  title: "Clintwise",
  description: "clintwise",
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
