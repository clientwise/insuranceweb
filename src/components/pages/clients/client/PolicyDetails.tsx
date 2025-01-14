import { GetClientAllPolicy } from "@/src/apis";
import useApi from "@/src/hooks/useApi";
import { PolicyType } from "@/src/types";
import React from "react";
import PolicyList from "./policyList/List";
import Button from "../../../Button.tsx";

interface Props {
  clientId: string;
  openPolicyAddModal: () => void;
}

const PolicyDetails = ({ clientId, openPolicyAddModal }: Props) => {
  const { makeApiCall } = useApi();

  console.log(clientId, "Policy For clientid");

  const [policies, setPolicies] = React.useState<PolicyType[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    makeApiCall(GetClientAllPolicy(clientId))
      .then((response) => {
        if (response.data != null) {
          console.log(response.data, 'POLICY LIST')
          setPolicies(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setLoading(false));
  }, [clientId, makeApiCall]);

  return (
    <div className=" mt-[8%]">
      <div className="flex flex-row justify-between items-center  mb-6">
        <h1 className="text-black text-lg font-light font-rubik">
          Policy Detail
        </h1>
        <Button
          style={{ color: "white" }}
          className=" bg-yellow-500"
          onClick={openPolicyAddModal}
        >
          Add Policy
        </Button>
      </div>
      {loading ? (
        <p>Loading clients...</p>
      ) : (
        <PolicyList policyList={policies} loading={false} />
      )}
    </div>
  );
};

export default PolicyDetails;
