"use client";

import * as React from "react";
import Button from "@/src/components/Button";
import Row from "@/src/components/Row";
import Spacer from "@/src/components/Spacer";
import { Formik, Form as FormikForm } from "formik";
import * as Yup from "yup";
import Input from "@/src/components/Input";
import { AddAgentApi } from "@/src/apis";
import useApi from "@/src/hooks/useApi";
import useToast from "@/src/hooks/useToast";
import { useRouter } from "next/navigation";
import Select from "../../common/Select";
import { SelectType } from "@/src/types";
import DatePicker from "../../DatePicker";

interface Props {
  onClose?: () => void;
}

interface BankDetails {
  accountNumber: string;
  ifscCode: string;
  bankName: string;
}

interface FormValues {
  name: string;
  email: string;
  bankDetails: BankDetails;
  dateOfJoining: string;
  panNumber: string;
  userType: string;
  userAccess: string[];
}

const dropdownData: SelectType[] = [
  { label: "Health", value: "health" },
  { label: "General", value: "general" },
  { label: "Life", value: "life" },
];

export default function AddAgent({ onClose }: Props) {
  const { makeApiCall } = useApi();
  const { showToast } = useToast();
  const router = useRouter();

  // Initialize the state with the appropriate type
  const [InitialValues, setInitialValues] = React.useState<FormValues>({
    name: "",
    email: "",
    bankDetails: {
      accountNumber: "",
      ifscCode: "",
      bankName: "",
    },
    dateOfJoining: "",
    panNumber: "",
    userType: "ind",
    userAccess: [], // This is correctly typed as an array of strings
  });

  // Validation schema for form
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    bankDetails: Yup.object().shape({
      accountNumber: Yup.string().required("Account number is required"),
      ifscCode: Yup.string().required("IFSC code is required"),
      bankName: Yup.string().required("Bank name is required"),
    }),
    dateOfJoining: Yup.string()
      .required("Date of joining is required")
      .matches(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
    panNumber: Yup.string().required("PAN number is required"),
  });

  const handleSubmit = React.useCallback(
    (values: FormValues) => {
      const {
        name,
        email,
        bankDetails,
        dateOfJoining,
        panNumber,
        userType,
        userAccess,
      } = values;
      makeApiCall(
        AddAgentApi(
          name,
          email,
          bankDetails,
          dateOfJoining,
          panNumber,
          userType,
          userAccess
        )
      )
        .then(() => {
          showToast("Agent Added successfully", { type: "success" });
          router.push("/dashboard/agents");
          if (onClose) onClose();
        })
        .catch((error) => {
          console.error("Error adding agent:", error);
          showToast("Agent addition failed", { type: "error" });
        });
    },
    [makeApiCall, router, showToast, onClose]
  );

  const handleShowSource = React.useCallback((data: string) => {
    const selectedData = data.split(",").map((item) => item.trim());
    console.log(selectedData, "Selected data");
    setInitialValues((prevValues) => ({
      ...prevValues,
      userAccess: selectedData,
    }));
  }, []);

  return (
    <section className="bg-white">
      <div className="py-8 px-4 mx-auto max-w-2xl">
        <Formik
          initialValues={InitialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <FormikForm>
            <Input name="name" label="Name" placeholder="Enter Name" />
            <Spacer size="xs" />
            <Input name="email" label="Email" placeholder="Enter email" />
            <Spacer size="xs" />

            <h3>Bank Details</h3>
            <Input
              name="bankDetails.accountNumber"
              label="Account Number"
              placeholder="Enter Account Number"
            />
            <Spacer size="xs" />
            <Input
              name="bankDetails.ifscCode"
              label="IFSC Code"
              placeholder="Enter IFSC Code"
            />
            <Spacer size="xs" />
            <Input
              name="bankDetails.bankName"
              label="Bank Name"
              placeholder="Enter Bank Name"
            />
            <Spacer size="xs" />

            <DatePicker
              name="dateOfJoining"
              label="Date of Joining"
              title="End Date"
            />

            <Spacer size="xs" />
            <Input
              name="panNumber"
              label="PAN Number"
              placeholder="Enter PAN Number"
            />
            <Spacer size="xs" />
            <Select
              label="User Access"
              item={dropdownData}
              name="userAccess"
              onSelect={handleShowSource}
              placeholder="User Access"
              selectionMode="multiple"
            />

            <Row justifyContent="center">
              <Button
                color="warning"
                className="text-base font-normal font-rubik text-white"
                type="submit"
              >
                Submit
              </Button>
            </Row>
          </FormikForm>
        </Formik>
      </div>
    </section>
  );
}
