import * as React from "react";
import Row from "@/src/components/Row";
import { AgentType } from "@/src/types";
import Button from "../../Button";

interface Props {
  item: AgentType;
  onRowAction: (clientId: React.Key) => void;
  generatePassword: (item: AgentType) => void;
  revokePassword: (item: AgentType) => void;
}

export default function Action({
  item,
  onRowAction,
  generatePassword,
  revokePassword,
}: Props) {
  const generatePasswordAgent = React.useCallback(() => {
    generatePassword(item);
  }, [generatePassword, item]);
  const revokePasswordAgent = React.useCallback(() => {
    revokePassword(item);
  }, [item, revokePassword]);

  return (
    <Row>
      <div className="flex flex-row items-center justify-center gap-3">
        <button
          onClick={() => onRowAction}
          className="text-textColorGrey cursor-pointer font-rubik"
        >
          <p className="text-textLink text-base font-light font-rubik">View</p>
        </button>
        <Button
          size="sm"
          type="button"
          radius="full"
          className="bg-transparent"
          onClick={generatePasswordAgent}
        >
          <p className="text-textLink text-base font-light font-rubik">
            Generate
          </p>
        </Button>
        <Button
          size="sm"
          type="button"
          radius="full"
          className="bg-transparent"
          onClick={revokePasswordAgent}
        >
          <p className="text-textLink text-base font-light font-rubik">
            Revoke
          </p>
        </Button>
      </div>
    </Row>
  );
}
