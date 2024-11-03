"use client";
import React from "react";
import Spacer from "@/src/components/Spacer";
import { Card, CardBody, Tabs, Tab } from "@nextui-org/react"; // Import necessary components
import FundMaterial from "@/src/components/pages/marketing/FundMaterial";
import MarketUpdates from "@/src/components/pages/marketing/MarketUpdates";

const Marketing = () => {
  // const [clientRentalNumbers, setClientIRentalNumbers] = React.useState<
  //   Client[]
  // >([]);

  return (
    <div>
      <div className="text-black bg-pageBackground px-10 min-h-screen ">
        <Spacer size="sm" />
        <p className="text-2xl font-normal font-poppins text-black ">
          Marketing
        </p>
        <Spacer size="xs" />
        <div>
          <Tabs aria-label="Inventory Details Tabs">
            <Tab key="promotional" title="Promotional Items">
              <Card>
                <CardBody></CardBody>
              </Card>
            </Tab>
            <Tab key="fund_material" title="Fund Material">
              <Card>
                <CardBody>
                  <FundMaterial />
                </CardBody>
              </Card>
            </Tab>
            <Tab key="market_updates" title="Market Updates">
              <Card>
                <CardBody>
                  <MarketUpdates />
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Marketing;
