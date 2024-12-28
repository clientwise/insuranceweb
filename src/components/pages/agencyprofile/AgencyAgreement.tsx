"use client";

import * as React from "react";
import Button from "@/src/components/Button";
import Row from "@/src/components/Row";
import Spacer from "@/src/components/Spacer";
import { Formik, Form as FormikForm } from "formik";
import * as Yup from "yup";
import Input from "@/src/components/Input";
import useApi from "@/src/hooks/useApi";
import { AgencyAgreementDetailsApi } from "@/src/apis";
import useToast from "@/src/hooks/useToast";
import { useRouter } from "next/navigation";
import FileInput from "../../FileInput";

export default function AgencyAgreement() {
  const { makeApiCall } = useApi();
  const { showToast } = useToast();
  const router = useRouter();

  const [initialValues] = React.useState({
    authorisedSignatoryName: "",
    authorisedSignatoryEmail: "",
    authorisedSignatoryPhone: "",
    file: null as File | null,
  });

  const validationSchema = Yup.object().shape({
    authorisedSignatoryName: Yup.string().required(
      "Authorised Signatory Name is required"
    ),
    authorisedSignatoryEmail: Yup.string()
      .email("Invalid email format")
      .required("Authorised Signatory Email is required"),
    authorisedSignatoryPhone: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
      .required("Authorised Signatory Phone is required"),
    file: Yup.mixed().required("PO Invoice is required"),
  });

  // Handle form submission
  const handleSubmit = React.useCallback(
    ({
      authorisedSignatoryName,
      authorisedSignatoryEmail,
      authorisedSignatoryPhone,
      file,
    }: {
      authorisedSignatoryName: string;
      authorisedSignatoryEmail: string;
      authorisedSignatoryPhone: string;
      file: File | null;
    }) => {
      const formData = new FormData();
      formData.append("authorisedSignatoryName", authorisedSignatoryName);
      formData.append("authorisedSignatoryEmail", authorisedSignatoryEmail);
      formData.append("authorisedSignatoryPhone", authorisedSignatoryPhone);

      if (file) {
        formData.append("file", file);
      }

      return makeApiCall(AgencyAgreementDetailsApi(formData))
        .then((response) => {
          showToast(response?.message, { type: "success" });
          localStorage.setItem("profile_status", response?.status);
          router.push("/dashboard/home");
        })
        .catch(() => {
          showToast("Failed to update agreement Info", { type: "error" });
        });
    },
    [makeApiCall, router, showToast]
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
              name="authorisedSignatoryName"
              label="Authorised Signatory Name"
              placeholder="Enter Authorised Signatory Name"
            />
            <Spacer size="xs" />
            <Input
              name="authorisedSignatoryEmail"
              label="Authorised Signatory Email"
              placeholder="Enter Authorised Signatory Email"
            />
            <Spacer size="xs" />
            <Input
              name="authorisedSignatoryPhone"
              label="Authorised Signatory Phone"
              placeholder="Enter Authorised Signatory Phone"
            />
            <Spacer size="xs" />

            <FileInput
              name="file"
              type="dropzone"
              label="Upload Agreement"
              size="small"
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
