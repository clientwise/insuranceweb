"use client";

import * as React from "react";
import { postPolicyApi } from "@/src/apis";
import Button from "@/src/components/Button";
import Row from "@/src/components/Row";
import Spacer from "@/src/components/Spacer";
import useApi from "@/src/hooks/useApi";
import useToast from "@/src/hooks/useToast";
import { Formik, Form as FormikForm } from "formik";
import * as Yup from "yup";
import Input from "@/src/components/Input";
import DatePicker from "@/src/components/DatePicker";
import { DropdownType } from "@/src/types";
import { Dropdown } from "@/src/components/Dropdown";

interface Props {
  onClose: () => void;
  clientId: string;
}

export default function AddPolicy({ onClose, clientId }: Props) {
  const { makeApiCall } = useApi();
  const { showToast } = useToast();

  // Initial values for the form
  const [initialValues] = React.useState({
    name: "",
    amount: "",
    status: "active",
    inception_date: "",
    frequency: "monthly",
    next_due_date: "",
    maturity_date: "",
  });
  const StatusTypeData: DropdownType[] = React.useMemo(
    () => [
      { key: "active", value: "Active" },
      { key: "inactive", value: "Inactive" },
    ],
    []
  );

  const FrequencyTypeData: DropdownType[] = React.useMemo(
    () => [
      { key: "monthly", value: "Monthly" },
      { key: "yearly", value: "Yearly" },
    ],
    []
  );
  // Validation schema
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Policy name is required"),
    amount: Yup.string()
      .matches(/^\d+(\.\d{1,2})?$/, "Invalid amount format")
      .required("Amount is required"),
    status: Yup.string().required("Status is required"),
    inception_date: Yup.date().required("Inception date is required"),
    frequency: Yup.string().required("Frequency is required"),
    next_due_date: Yup.date().required("Next due date is required"),
    maturity_date: Yup.date().required("Maturity date is required"),
  });

  // Submit handler
  const handleSubmit = React.useCallback(
    ({
      name,
      amount,
      status,
      inception_date,
      frequency,
      next_due_date,
      maturity_date,
    }: typeof initialValues) => {
      return makeApiCall(
        postPolicyApi(
          name,
          amount,
          status,
          inception_date,
          frequency,
          next_due_date,
          maturity_date,
          parseInt(clientId)
        )
      )
        .then(() => {
          onClose();
          showToast("Policy added successfully", { type: "success" });
        })
        .catch(() => showToast("Failed to add policy", { type: "error" }));
    },
    [makeApiCall, clientId, onClose, showToast]
  );

  return (
    <section className="bg-white ">
      <div className="py-8 px-4 mx-auto max-w-2xl ">
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
              name="name"
              label="Policy Name"
              placeholder="Enter policy name"
            />
            <Spacer size="xs" />
            <Input
              name="amount"
              label="Amount"
              placeholder="Enter policy amount"
            />
            <Spacer size="xs" />
            <Dropdown data={StatusTypeData} label="Status" name="status" />
            <Spacer size="xs" />
            <DatePicker label="Inception Date" name="inception_date" />
            <Spacer size="xs" />
            <Dropdown
              data={FrequencyTypeData}
              label="Frequency"
              name="frequency"
            />
            <Spacer size="xs" />
            <DatePicker
              name="next_due_date"
              label="Next Due Date"
              placeholder="Select next due date"
            />
            <Spacer size="xs" />
            <DatePicker
              name="maturity_date"
              label="Maturity Date"
              placeholder="Select maturity date"
            />
            <Spacer size="xs" />
            <Row justifyContent="center">
              <Button color="primary">Submit</Button>
            </Row>
          </FormikForm>
        </Formik>
      </div>
    </section>
  );
}
