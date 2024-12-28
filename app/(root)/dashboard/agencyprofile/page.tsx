"use client";

import React, { useEffect, useState } from "react";
import Spacer from "@/src/components/Spacer";
import { Accordion, AccordionItem } from "@nextui-org/react";
import AgencyBasicProfile from "@/src/components/pages/agencyprofile/AgencyBasicProfile";
import AgencyBankinginfo from "@/src/components/pages/agencyprofile/AgencyBanking";
import AgencyAgreement from "@/src/components/pages/agencyprofile/AgencyAgreement";
import InfoCard from "@/src/components/cards/InfoCard";

const AgencyProfile = () => {
  const [disabledTabs, setDisabledTabs] = useState<string[]>([]);

  useEffect(() => {
    const savedStatus = localStorage.getItem("profile_status");

    if (savedStatus) {
      const activeTab = parseInt(savedStatus, 10);

      if (activeTab === 1) {
        setDisabledTabs(["2", "3"]);
      } else if (activeTab === 2) {
        setDisabledTabs(["1", "3"]);
      } else if (activeTab === 3) {
        setDisabledTabs(["1", "2"]);
      }
    }
  }, []);

  return (
    <div>
      <div className="text-black bg-pageBackground px-10 min-h-screen">
        <Spacer size="sm" />
        <p className="text-2xl font-normal font-rubik text-black">
          Agency Profile
        </p>
        <Spacer size="xs" />
        <div className="flex flex-row my-8 gap-8">
          <InfoCard
            title="Status"
            description={"Active / Activation Pending"}
          />
          <InfoCard title="Date of joining" description={"29th Feb, 2022"} />
          <InfoCard title="Relationship manager" description={"Shyaam kumar"} />
        </div>

        <Accordion variant="splitted" disabledKeys={disabledTabs}>
          <AccordionItem
            key="1"
            aria-label="Basic Profile Info"
            title="Basic Profile Info"
          >
            <AgencyBasicProfile />
          </AccordionItem>
          <AccordionItem key="2" aria-label="Banking Info" title="Banking Info">
            <AgencyBankinginfo />
          </AccordionItem>
          <AccordionItem key="3" aria-label="Agreement" title="Agreement">
            <AgencyAgreement />
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default AgencyProfile;
