import { GetClientAllPolicy } from "@/src/apis";
import useApi from "@/src/hooks/useApi";
import { PolicyType } from "@/src/types";
import React from "react";
import PolicyList from "./policyList/List";

interface Props {
  clientId: string;
  openPolicyAddModal: () => void;
}

const PolicyDetails = ({ clientId, openPolicyAddModal }: Props) => {
  const { makeApiCall } = useApi();

  console.log(clientId, "Policy For clientid");

  const [policies, setPolicies] = React.useState<PolicyType[]>([]);
  const [loading, setLoading] = React.useState(true);

  //api call for client list
  React.useEffect(() => {
    setLoading(true);
    makeApiCall(GetClientAllPolicy(clientId))
      .then((response) => {
        console.log("Policy list response", response);
        setPolicies(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setLoading(false));
  }, [clientId, makeApiCall]);

  return (
    <div className=" mt-[8%]">
      <div className="flex flex-row justify-between items-center  mb-6">
        <h1 className="text-black text-3xl font-light font-rubik">
          Policy Details
        </h1>
        <button
          onClick={openPolicyAddModal}
          className="text-textLink text-base font-light font-rubik"
        >
          Add Policy
        </button>
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
