"use client";

import * as React from "react";
import Button from "@/src/components/Button";
import Row from "@/src/components/Row";
import Spacer from "@/src/components/Spacer";
import { Formik, Form as FormikForm } from "formik";
import * as Yup from "yup";
import Input from "@/src/components/Input";
import { AddAgencyMarketingApi } from "@/src/apis";
import useApi from "@/src/hooks/useApi";
import useToast from "@/src/hooks/useToast";
import Select from "../../common/Select";
import { SelectType } from "@/src/types";
import FileInput from "../../FileInput";
import { nextLocalStorage } from "@/src/utils/nextLocalStorage";

interface Props {
  onClose?: () => void;
}

interface FormValues {
  content_category: string;
  content_header: string;
  content_subheader: string;
  content_type: string;
  language: string;
  product_type: string;
  status: string;
  content_file: File | null;
  content_url: string;
}

const dropdownData: SelectType[] = [
  { label: "Health", value: "health" },
  { label: "General", value: "general" },
  { label: "Life", value: "life" },
];

export default function AddMarketing({ onClose }: Props) {
  const { makeApiCall } = useApi();
  const { showToast } = useToast();

  const initialValues = {
    content_category: "",
    content_header: "",
    content_subheader: "",
    content_type: "",
    language: "English",
    product_type: "",
    status: "active",
    content_file: null,
    content_url: "",
  };

  const validationSchema = Yup.object().shape({
    content_category: Yup.string().required("Content Category is required"),
    content_header: Yup.string().required("Content Header is required"),
    content_subheader: Yup.string().required("Content Subheader is required"),
    content_type: Yup.string(),
    language: Yup.string().required("Language is required"),
    product_type: Yup.string().required("Product Type is required"),
    status: Yup.string().required("Status is required"),
    content_file: Yup.mixed().required("Content file is required"),
    content_url: Yup.string().url("Must be a valid URL").nullable(),
  });

  const handleSubmit = React.useCallback(
    (values: FormValues) => {
      const {
        content_category,
        content_header,
        content_subheader,
        content_type,
        language,
        product_type,
        status,
        content_file,
        content_url,
      } = values;

      const agency_id = nextLocalStorage()?.getItem("agency_id") ?? "";

      makeApiCall(
        AddAgencyMarketingApi(
          agency_id,
          content_category,
          content_header,
          content_subheader,
          content_type,
          language,
          product_type,
          status,
          content_file!,
          content_url
        )
      )
        .then(() => {
          showToast("Agency Content Added successfully", { type: "success" });
          if (onClose) onClose();
        })
        .catch((error) => {
          console.error("Error adding agency product:", error);
          showToast("Agency product addition failed", { type: "error" });
        });
    },
    [makeApiCall, showToast, onClose]
  );

  return (
    <section className="bg-white">
      <div className="py-8 px-4 mx-auto max-w-2xl">
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <FormikForm>
            <Spacer size="xs" />
            <Input
              name="content_category"
              label="Content Category"
              placeholder="Enter Content Category"
            />
            <Spacer size="xs" />
            <Input
              name="content_header"
              label="Content Header"
              placeholder="Enter Content Header"
            />
            <Spacer size="xs" />
            <Input
              name="content_subheader"
              label="Content Subheader"
              placeholder="Enter Content Subheader"
            />
            <Spacer size="xs" />
            <Input
              name="content_type"
              label="Content Type"
              placeholder="Enter Content Type"
            />
            <Spacer size="xs" />
            <Select
              label="Language"
              item={[{ label: "English", value: "English" }]}
              name="language"
              placeholder="Select Language"
            />
            <Spacer size="xs" />
            <Select
              label="Product Type"
              item={dropdownData}
              name="product_type"
              placeholder="Select Product Type"
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
            <Input
              name="content_url"
              label="Content URL"
              placeholder="Enter Content URL"
            />
            <Spacer size="xs" />
            <FileInput
              type="dropzone"
              size="small"
              name="content_file"
              label="Content File"
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
