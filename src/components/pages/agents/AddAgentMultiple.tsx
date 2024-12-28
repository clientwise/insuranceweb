"use client";

import * as React from "react";
import Button from "@/src/components/Button";
import Row from "@/src/components/Row";
import Spacer from "@/src/components/Spacer";
import { Formik, Form as FormikForm } from "formik";
import * as Yup from "yup";
import useApi from "@/src/hooks/useApi";
import { AgentMultipleAddApi } from "@/src/apis";
import useToast from "@/src/hooks/useToast";
import { useRouter } from "next/navigation";
import FileInput from "../../FileInput";

export default function AddAgentMultiple() {
  const { makeApiCall } = useApi();
  const { showToast } = useToast();
  const router = useRouter();

  const [initialValues] = React.useState({
    file: null as File | null,
  });

  const validationSchema = Yup.object().shape({
    file: Yup.mixed().required("PO Invoice is required"),
  });

  // Handle form submission
  const handleSubmit = React.useCallback(
    ({ file }: { file: File | null }) => {
      const formData = new FormData();
      if (file) {
        formData.append("agents", file);
      }
      return makeApiCall(AgentMultipleAddApi(formData))
        .then((response) => {
          showToast(response?.message, { type: "success" });
          localStorage.setItem("profile_status", response?.status);
          router.push("/dashboard/home");
        })
        .catch(() => {
          showToast("Failed to add agents ", { type: "error" });
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
            <Spacer size="xs" />
            <FileInput
              name="file"
              type="dropzone"
              label="Upload Agents"
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
