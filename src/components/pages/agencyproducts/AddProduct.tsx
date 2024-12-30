"use client";

import * as React from "react";
import Button from "@/src/components/Button";
import Row from "@/src/components/Row";
import Spacer from "@/src/components/Spacer";
import { Formik, Form as FormikForm } from "formik";
import * as Yup from "yup";
import Input from "@/src/components/Input";
import { AddAgencyProductApi } from "@/src/apis";
import useApi from "@/src/hooks/useApi";
import useToast from "@/src/hooks/useToast";
import { useRouter } from "next/navigation";
import Select from "../../common/Select";
import { SelectType } from "@/src/types";
import DatePicker from "../../DatePicker";
import FileInput from "../../FileInput";
import { nextLocalStorage } from "@/src/utils/nextLocalStorage";

interface Props {
  onClose?: () => void;
}

interface FormValues {
  product_id: number;
  insurer_name: string;
  product_name: string;
  category: string;
  type: string;
  agent_commission_percentage: number;
  agency_commission_percentage: number;
  description: string;
  status: string;
  policy_state_date: string;
  policy_expiry_date: string;
  policy_document: File | null;
  policy_sales_brochure: File | null;
}

const dropdownData: SelectType[] = [
  { label: "Health", value: "health" },
  { label: "General", value: "general" },
  { label: "Life", value: "life" },
];

export default function AddProduct({ onClose }: Props) {
  const { makeApiCall } = useApi();
  const { showToast } = useToast();
  const router = useRouter();

  const InitialValues = {
    product_id: 0,
    insurer_name: "",
    product_name: "",
    category: "",
    type: "",
    agent_commission_percentage: 0,
    agency_commission_percentage: 0,
    description: "",
    status: "active",
    policy_state_date: "",
    policy_expiry_date: "",
    policy_document: null,
    policy_sales_brochure: null,
  };

  const validationSchema = Yup.object().shape({
    product_id: Yup.number().required("Product ID is required"),
    insurer_name: Yup.string().required("Insurer name is required"),
    product_name: Yup.string().required("Product name is required"),
    category: Yup.string().required("Category is required"),
    type: Yup.string().required("Type is required"),
    agent_commission_percentage: Yup.number()
      .required("Agent commission percentage is required")
      .min(0, "Must be at least 0")
      .max(100, "Cannot be more than 100"),
    agency_commission_percentage: Yup.number()
      .required("Agency commission percentage is required")
      .min(0, "Must be at least 0")
      .max(100, "Cannot be more than 100"),
    description: Yup.string().required("Description is required"),
    status: Yup.string().required("Status is required"),
    policy_state_date: Yup.string()
      .required("Policy start date is required")
      .matches(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
    policy_expiry_date: Yup.string()
      .required("Policy expiry date is required")
      .matches(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
    policy_document: Yup.mixed().required("Policy document is required"),
    policy_sales_brochure: Yup.mixed().required(
      "Policy sales brochure is required"
    ),
  });

  const handleSubmit = React.useCallback(
    (values: FormValues) => {
      const {
        product_id,
        insurer_name,
        product_name,
        category,
        type,
        agent_commission_percentage,
        agency_commission_percentage,
        description,
        status,
        policy_state_date,
        policy_expiry_date,
        policy_document,
        policy_sales_brochure,
      } = values;

      // Retrieve the agency_id from localStorage using nextLocalStorage
      const agency_id = nextLocalStorage()?.getItem("agency_id") ?? "";

      // Check if agency_id exists
      if (!agency_id) {
        showToast("Agency ID not found", { type: "error" });
        return;
      }

      // Make API call to add the agency product
      makeApiCall(
        AddAgencyProductApi(
          product_id,
          insurer_name,
          product_name,
          category,
          type,
          agent_commission_percentage,
          agency_commission_percentage,
          description,
          status,
          policy_state_date,
          policy_expiry_date,
          agency_id,
          policy_document!,
          policy_sales_brochure!
        )
      )
        .then(() => {
          showToast("Agency Product Added successfully", { type: "success" });
          router.push("/dashboard/products");
          if (onClose) onClose();
        })
        .catch((error) => {
          console.error("Error adding agency product:", error);
          showToast("Agency product addition failed", { type: "error" });
        });
    },
    [makeApiCall, router, showToast, onClose]
  );

  return (
    <section className="bg-white">
      <div className="py-8 px-4 mx-auto max-w-2xl">
        <Formik
          initialValues={InitialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <FormikForm>
            <Input
              name="product_id"
              label="Product ID"
              placeholder="Enter Product ID"
            />
            <Spacer size="xs" />
            <Input
              name="insurer_name"
              label="Insurer Name"
              placeholder="Enter Insurer Name"
            />
            <Spacer size="xs" />
            <Input
              name="product_name"
              label="Product Name"
              placeholder="Enter Product Name"
            />
            <Spacer size="xs" />
            <Select
              label="Category"
              item={dropdownData}
              name="category"
              placeholder="Select Category"
            />
            <Spacer size="xs" />
            <Select
              label="Type"
              item={dropdownData}
              name="type"
              placeholder="Select Type"
            />
            <Spacer size="xs" />
            <Input
              name="agent_commission_percentage"
              label="Agent Commission Percentage"
              placeholder="Enter Agent Commission Percentage"
            />
            <Spacer size="xs" />
            <Input
              name="agency_commission_percentage"
              label="Agency Commission Percentage"
              placeholder="Enter Agency Commission Percentage"
            />
            <Spacer size="xs" />
            <Input
              name="description"
              label="Description"
              placeholder="Enter Description"
            />
            <Spacer size="xs" />
            <Select
              label="Status"
              item={[
                { label: "Active", value: "active" },
                { label: "Inactive", value: "inactive" },
              ]}
              name="status"
              placeholder="Select Status"
            />
            <Spacer size="xs" />
            <DatePicker
              label="Policy Start Date"
              name="policy_state_date"
              title="Policy Start Date"
            />
            <Spacer size="xs" />
            <DatePicker
              label="Policy Expiry Date"
              name="policy_expiry_date"
              title="Policy Expiry Date"
            />

            <Spacer size="xs" />
            <FileInput
              type="dropzone"
              size="small"
              name="policy_document"
              label="Policy Document"
            />
            <Spacer size="xs" />
            <FileInput
              type="dropzone"
              size="small"
              name="policy_sales_brochure"
              label="Policy Sales Brochure"
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
