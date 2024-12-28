"use client";

import ClientDetails from "@/src/components/pages/clients/client/ClientDetails";
import EditDataModal from "@/src/components/pages/clients/client/EditDataModal";
import Events from "@/src/components/pages/clients/client/Events";
import PolicyDetails from "@/src/components/pages/clients/client/PolicyDetails";
import * as React from "react";
import { useDisclosure } from "@nextui-org/react";
import Policysummary from "@/src/components/pages/clients/client/clientpolicysummary";
import PolicyRecommendation from "@/src/components/pages/clients/client/PolicyRecommendation";
interface Props {
  params: { clientId: string };
}
