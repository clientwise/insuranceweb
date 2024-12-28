"use client";

import * as React from "react";
import Button from "@/src/components/Button";
import Row from "@/src/components/Row";
import Spacer from "@/src/components/Spacer";
import { Formik, Form as FormikForm } from "formik";
import * as Yup from "yup";
import Input from "@/src/components/Input";
import useApi from "@/src/hooks/useApi";
import { AgencyBankingDetailsApi } from "@/src/apis"; // Assuming you have this API method
import useToast from "@/src/hooks/useToast";

export default function AgencyBankinginfo() {
  const { makeApiCall } = useApi();
  const { showToast } = useToast();

  // Initial values only for banking info
  const [initialValues] = React.useState({
    accountNumber: "",
    ifscCode: "",
    bankName: "",
  });

  // Validation schema for banking info
  const validationSchema = Yup.object().shape({
    accountNumber: Yup.string()
      .matches(/^\d{10}$/, "Account number must be exactly 10 digits")
      .required("Account number is required"),
    ifscCode: Yup.string()
      .matches(/^[A-Za-z]{4}0[A-Z0-9a-z]{6}$/, "Invalid IFSC code")
      .required("IFSC code is required"),
    bankName: Yup.string().required("Bank name is required"),
  });

  const handleSubmit = React.useCallback(
    ({
      accountNumber,
      ifscCode,
      bankName,
    }: {
      accountNumber: string;
      ifscCode: string;
      bankName: string;
    }) => {
      return makeApiCall(
        AgencyBankingDetailsApi(accountNumber, ifscCode, bankName)
      )
        .then((response) => {
          showToast(response?.message, { type: "success" });
          localStorage.setItem("profile_status", response?.status);
        })
        .catch(() => {
          showToast("Failed to update Banking Info", { type: "error" });
        });
    },
    [makeApiCall, showToast]
  );

  return (
    <section className="bg-white">
      <div className="px-4 mx-auto max-w-2xl">
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validateOnBlur
          validateOnChange
          validationSchema={validationSchema}
          enableReinitialize
        >
          <FormikForm>
            <Input
              name="accountNumber"
              label="Account Number"
              placeholder="Enter Account Number"
            />
            <Spacer size="xs" />
            <Input
              name="ifscCode"
              label="IFSC Code"
              placeholder="Enter IFSC Code"
            />
            <Spacer size="xs" />
            <Input
              name="bankName"
              label="Bank Name"
              placeholder="Enter Bank Name"
            />
            <Spacer size="xs" />

            <Row justifyContent="center">
              <Button
                color="warning"
                className="text-base font-normal font-rubik text-white"
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
