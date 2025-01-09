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
import { DropdownType, PolicyPostType } from "@/src/types";

interface Props {
  onClose: () => void;
  clientId: string;
}

export default function AddPolicy({ onClose, clientId }: Props) {
  const { makeApiCall } = useApi();
  const { showToast } = useToast();
  const agencyId = localStorage.getItem("agency_id");
  const authToken = localStorage.getItem("authToken");
  const [policyOptions, setPolicyOptions] = React.useState<DropdownType[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

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
        const options = Array.isArray(data.products)
          ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
            data.products.map((product: any) => ({
              value: product.name, // 'value' is the policy_name
              key: product.product_id, // 'key' is the product_id
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

  const [initialValues] = React.useState<PolicyPostType>({
    amount: "",
    client_id: clientId,
    policy_id: "",
    policy_name: "",
    product_id: "",
    policy_type: "",
    business_type: "",
    status: "pending",
    inception_date: "",
    frequency: "Annual",
  });

  const handleSubmit = React.useCallback(
    ({
      amount,
      client_id,
      policy_id,
      policy_type,
      business_type,
      status,
      policy_name,
      product_id,
      inception_date,
      frequency,
    }: PolicyPostType) => {
      console.log(
        client_id,
        policy_id,
        policy_type,
        business_type,
        status,
        policy_name,
        product_id,
        inception_date,
        frequency,
        "Submitting details of policy"
      );
      return makeApiCall(
        postPolicyApi(
          parseInt(amount),
          parseInt(client_id),
          policy_id,
          policy_type,
          business_type,
          status,
          policy_name,
          product_id,
          inception_date,
          frequency
        )
      )
        .then(() => {
          onClose();
          showToast("Policy added successfully", { type: "success" });
        })
        .catch(() => showToast("Failed to add policy", { type: "error" }));
    },
    [makeApiCall, onClose, showToast]
  );

  if (isLoading) return <div>Loading policy options...</div>;

  return (
    <section className="bg-white">
      <div className="py-8 px-4 mx-auto max-w-2xl">
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={Yup.object().shape({
            policy_name: Yup.string().required("Policy name is required"),
            amount: Yup.string()
              .matches(/^\d+(\.\d{1,2})?$/, "Invalid amount format")
              .required("Amount is required"),
            inception_date: Yup.date().required("Inception date is required"),
            frequency: Yup.string().required("Frequency is required"),
            policy_type: Yup.string().required("Policy Type is required"),
            business_type: Yup.string().required("Business Type is required"),
            policy_id: Yup.string().required("Policy ID is required"),
          })}
        >
          {({ setFieldValue }) => (
            <FormikForm>
              <Dropdown
                data={policyOptions}
                name="product_id"
                label="Product Name"
                onSelect={(value) => {
                  const values = Array.from(value);
                  console.log(values, "selected product", typeof value);

                  const selectedOption = policyOptions.find(
                    (option) => option.key === values[0]
                  );

                  if (selectedOption) {
                    console.log(
                      selectedOption,
                      "selected option in policy product"
                    );

                    setFieldValue("product_id", selectedOption.key);
                    setFieldValue("policy_name", selectedOption.value);
                  }
                }}
              />
              <Spacer size="xs" />
              <div style={{ display: "flex", gap: "2rem" }}>
                <Dropdown
                  name="policy_type"
                  data={[
                    { key: "Health Insurance", value: "health_insurance" },
                    { key: "Motor Insurance", value: "motor_insurance" },
                    { key: "Life Insurance", value: "life_insurance" },
                  ]}
                  label="Policy Type"
                />
                <Dropdown
                  name="business_type"
                  data={[
                    { key: "Renewal", value: "Renewal" },
                    { key: "New", value: "New" },
                  ]}
                  label="Business Type"
                />
                <Dropdown
                  name="frequency"
                  data={[
                    { key: "Monthly", value: "monthly" },
                    { key: "Annually", value: "annually" }, // Corrected spelling
                  ]}
                  label="Premium Frequency"
                />
              </div>
              <Spacer size="xs" />
              <div style={{ display: "flex", gap: "2rem" }}>
                <div style={{ display: "contents" }}>
                  <Input
                    name="amount"
                    label="Premium Amount"
                    placeholder="Enter policy premium"
                  />
                  <Input
                    name="policy_id"
                    label="Policy Number"
                    placeholder="Enter client policy id"
                  />
                  <Spacer size="xs" />
                </div>
              </div>
              <Spacer size="xs" />
              <DatePicker label="Policy Start Date" name="inception_date" />
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
