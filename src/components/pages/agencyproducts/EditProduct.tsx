"use client";

import * as React from "react";
import Button from "@/src/components/Button";
import Row from "@/src/components/Row";
import Spacer from "@/src/components/Spacer";
import { Formik, Form as FormikForm } from "formik";
import * as Yup from "yup";
import Input from "@/src/components/Input";
import { UpdateAgencyProduct } from "@/src/apis";
import useApi from "@/src/hooks/useApi";
import useToast from "@/src/hooks/useToast";
import { ProductType } from "@/src/types";
import { nextLocalStorage } from "@/src/utils/nextLocalStorage";

interface Props {
  onClose?: () => void;
  currentItem: ProductType;
}

interface FormValues {
  agent_commission_percentage: string;
  agencyCommission_percentage: string;
}

export default function EditProduct({ onClose, currentItem }: Props) {
  const { makeApiCall } = useApi();
  const { showToast } = useToast();

  // Logging the currentItem to check if it's correctly passed from the parent
  console.log(currentItem, "Item got in modal page");

  // Initialize the form values with currentItem values
  const initialValues: FormValues = {
    agent_commission_percentage:
      currentItem?.agent_commission_percentage.toString() ?? "",
    agencyCommission_percentage:
      currentItem?.agencyCommission_percentage.toString() ?? "",
  };

  // Validation schema for the form
  const validationSchema = Yup.object().shape({
    agent_commission_percentage: Yup.string()
      .required("Agent commission percentage is required")
      .min(0, "Must be at least 0")
      .max(100, "Cannot be more than 100"),
    agencyCommission_percentage: Yup.string()
      .required("Agency commission percentage is required")
      .min(0, "Must be at least 0")
      .max(100, "Cannot be more than 100"),
  });

  // Handle form submission
  const handleSubmit = React.useCallback(
    (values: FormValues) => {
      const { agent_commission_percentage, agencyCommission_percentage } =
        values;
      const agency_id = nextLocalStorage()?.getItem("agency_id") ?? "";

      if (!agency_id) {
        showToast("Agency ID not found", { type: "error" });
        return;
      }

      console.log(
        agencyCommission_percentage,
        agent_commission_percentage,
        "va;ues sending to "
      );
      makeApiCall(
        UpdateAgencyProduct(
          parseInt(currentItem.product_id),
          parseFloat(agent_commission_percentage),
          parseFloat(agencyCommission_percentage),
          agency_id
        )
      )
        .then((response) => {
          if (response?.success) {
            showToast(response?.message ?? "Product updated successfully", {
              type: "success",
            });
            window.location.reload();
          } else {
            showToast("Some error occurred", { type: "error" });
          }

          if (onClose) onClose();
        })
        .catch((error) => {
          console.error("Error updating agency product:", error);
          showToast("Product update failed", { type: "error" });
        });
    },
    [makeApiCall, showToast, currentItem.product_id, onClose]
  );

  return (
    <section className="bg-white">
      <div className="py-8 px-4 mx-auto max-w-2xl">
        <Formik
          initialValues={initialValues} // Set initial values from currentItem
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {() => (
            <FormikForm>
              <Spacer size="xs" />
              <Input
                name="agent_commission_percentage"
                label="Agent Commission Percentage"
                placeholder="Enter Agent Commission Percentage"
              />
              <Spacer size="xs" />
              <Input
                name="agencyCommission_percentage"
                label="Agency Commission Percentage"
                placeholder="Enter Agency Commission Percentage"
              />
              <Spacer size="xs" />
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
          )}
        </Formik>
      </div>
    </section>
  );
}
