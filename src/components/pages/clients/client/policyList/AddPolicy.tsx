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
import { Dropdown } from "@/src/components/Dropdown";
import Select from "@/src/components/common/Select";
import { SelectType } from "@/src/types";

interface Props {
  onClose: () => void;
  clientId: string;
}

export default function AddPolicy({ onClose, clientId }: Props) {
  const { makeApiCall } = useApi();
  const { showToast } = useToast();
  const agencyId = localStorage.getItem("agency_id");
  const authToken = localStorage.getItem("authToken");
  const [policyOptions, setPolicyOptions] = React.useState<SelectType[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  console.log(agencyId, "Agency ID");
  React.useEffect(() => {
    if (!agencyId) {
      console.error("Agency ID is not available.");
      setIsLoading(false);
      return;
    }

    const fetchPolicyOptions = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://staging.api.mypolicymate.in/api/products/${agencyId}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`, // Add the Authorization header
            },
          }
        );
        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        console.log(data.products, "data.products", typeof data.products);
        const options = Array.isArray(data.products)
          ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
            data?.products?.map((product: any) => ({
              value: product.product_id,
              key: product.name,
            }))
          : []; // Set options to an empty array if data.products is not an array
        console.log(options, "options");
        setPolicyOptions(options);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPolicyOptions();
  }, [agencyId, authToken]);

  const initialValues = React.useMemo(
    () => ({
      name: "",
      amount: "",
      status: "active",
      inception_date: "",
      frequency: "",
      next_due_date: "",
      maturity_date: "",
    }),
    []
  );

  const handleSubmit = React.useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (values: any) => {
      return makeApiCall(
        postPolicyApi(
          values.name,
          values.amount,
          values.status,
          values.inception_date,
          values.frequency,
          values.next_due_date,
          values.maturity_date,
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

  if (isLoading) return <div>Loading policy options...</div>;

  return (
    <section className="bg-white">
      <div className="py-8 px-4 mx-auto max-w-2xl">
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={Yup.object().shape({
            name: Yup.string().required("Policy name is required"),
            amount: Yup.string()
              .matches(/^\d+(\.\d{1,2})?$/, "Invalid amount format")
              .required("Amount is required"),
            status: Yup.string().required("Status is required"),
            inception_date: Yup.date().required("Inception date is required"),
            frequency: Yup.string().required("Frequency is required"),
            next_due_date: Yup.date().required("Next due date is required"),
            maturity_date: Yup.date().required("Maturity date is required"),
          })}
        >
          {() => (
            <FormikForm>
              <Select
                name="productName" // Or whatever name you want to use
                label="Product Name"
                placeholder="Select a product"
                item={policyOptions}
              />
              <Spacer size="xs" />
              <Input
                name="amount"
                label="Amount"
                placeholder="Enter policy amount"
              />
              <Spacer size="xs" />
              <Dropdown
                data={[
                  { key: "active", value: "Active" },
                  { key: "inactive", value: "Inactive" },
                ]}
                label="Status"
                name="status"
              />
              <Spacer size="xs" />
              <DatePicker label="Inception Date" name="inception_date" />
              <Spacer size="xs" />
              <Dropdown
                data={[
                  { key: "monthly", value: "Monthly" },
                  { key: "yearly", value: "Yearly" },
                ]}
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
          )}
        </Formik>
      </div>
    </section>
  );
}
