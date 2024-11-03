"use client";

import React from "react";

import { gradients } from "@/src/assets/colors";
import { useRouter } from "next/navigation";

export default function About() {
  const router = useRouter();

  const navigateToHomePage = React.useCallback(() => {
    router.replace("/dashboard");
  }, [router]);

  return (
    <div>
      <div
        className="flex flex-col min-h-screen "
        style={{ background: gradients.gradientbackground }}
      >
        {/* <Header /> */}
        <div className="flex-grow">
          <p onClick={navigateToHomePage}>Root Page</p>
        </div>
        {/* <Footer /> */}
      </div>
    </div>
  );
}
