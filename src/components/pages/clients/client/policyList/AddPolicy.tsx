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
      status: "pending",
      inception_date: "",
      frequency: "Annual",
      next_due_date: "2024-01-01",
      maturity_date: "2024-01-01",
      policy_type:"",
      business_type:"",
      policy_id:""
    }),
    []
  );


  const handleSubmit = React.useCallback(
  
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (values: any) => {
      return makeApiCall(
        postPolicyApi(
          values.name,
          "ICIC PRu",
         1000,
          "19",
          "Ayush",
          "44",
          "Motor",
          "New",
          "pending",
          "policy_name",
          "2024-12-12",
      
          
           // Add the missing argument here
        )
      )
        .then(() => {
          onClose();
          showToast("Policy added successfully", { type: "success" });
        })
        .catch(() => showToast("Failed to add policy", { type: "error" }));
    },
    [makeApiCall, clientId, showToast]
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
            maturity_date: Yup.date().required("Maturity date is required"),
            policy_type: Yup.string().required("Policy Type is required"),
            business_type: Yup.string().required("Business Type is required"),
            policy_id: Yup.string().required("Business Type is required"),

          })}
        >
          {() => (
            <FormikForm onSubmit={handleSubmit}>
              <Select
                name="productName" // Or whatever name you want to use
                label="Product Name"
                placeholder="Select a product"
                item={policyOptions}
              />
                   <Spacer size="xs" />

            <div style={{ display: 'flex', gap: '2rem' }}> {/* Add gap for spacing */}
     
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
        name="status"
        data={[
          { key: "active", value: "Active" },
          { key: "inactive", value: "Inactive" },
        ]}
        label="Status"
      />
       <Dropdown
        name="frequency"
        data={[
          { key: "Monthly", value: "monthly" },
          { key: "Annially", value: "annually" },
        ]}
        label="Premium Frequency"
      />
    </div>              <Spacer size="xs" />

                <div style={{ display: 'flex', gap: '2rem' }}> 
                <div style={{ display: 'contents' }}> 
              <Input
                name="amount"
                label="Premium"
                placeholder="Enter policy premium"
              />
                   <Input
                name="policy_id"
                label="Policy Number"
                placeholder="Enter client policy id"
              />
                          <Spacer size="xs" />
                          </div></div>
           
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
