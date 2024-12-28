"use client";

import * as React from "react";
import Button from "@/src/components/Button";
import Row from "@/src/components/Row";
import Spacer from "@/src/components/Spacer";
import { Formik, Form as FormikForm } from "formik";
import * as Yup from "yup";
import Input from "@/src/components/Input";
import { BasicInfoType } from "@/src/types";
import useApi from "@/src/hooks/useApi";
import { AgencyBasicDetailsApi } from "@/src/apis"; // Assuming you have this API method
import useToast from "@/src/hooks/useToast";

export default function AgencyBasicProfile() {
  const { makeApiCall } = useApi();
  const { showToast } = useToast();

  // Updated initial values for the form
  const [initialValues] = React.useState<BasicInfoType>({
    agencyName: "",
    agencyEmail: "",
    brokerCode: "",
    panNumber: "",
    gstNumber: "",
    registeredAddress: {
      line1: "",
      city: "",
      state: "",
      pincode: "",
    },
  });

  const validationSchema = Yup.object().shape({
    agencyName: Yup.string().required("Agency name is required"),
    agencyEmail: Yup.string()
      .email("Invalid email format")
      .required("Agency email is required"),
    brokerCode: Yup.string().required("Broker code is required"),
    panNumber: Yup.string().required("PAN number is required"),
    gstNumber: Yup.string().required("GST number is required"),
    registeredAddress: Yup.object().shape({
      line1: Yup.string().required("Address Line 1 is required"),
      city: Yup.string().required("City is required"),
      state: Yup.string().required("State is required"),
      pincode: Yup.string()
        .matches(/^\d{6}$/, "Pincode must be exactly 6 digits")
        .required("Pincode is required"),
    }),
    billingAddress: Yup.object().shape({
      line1: Yup.string().required("Address Line 1 is required"),
      city: Yup.string().required("City is required"),
      state: Yup.string().required("State is required"),
      pincode: Yup.string()
        .matches(/^\d{6}$/, "Pincode must be exactly 6 digits")
        .required("Pincode is required"),
    }),
  });

  const handleSubmit = React.useCallback(
    ({
      agencyName,
      agencyEmail,
      brokerCode,
      panNumber,
      gstNumber,
      registeredAddress,
    }: BasicInfoType) => {
      return makeApiCall(
        AgencyBasicDetailsApi(
          agencyName,
          agencyEmail,
          brokerCode,
          panNumber,
          gstNumber,
          registeredAddress,
          registeredAddress
        )
      )
        .then((response) => {
          console.log(response, "Response of basic profile updation");

          showToast(response?.message, { type: "success" });
          localStorage.setItem("agency_id", response?.agency_id);
          localStorage.setItem("profile_status", response?.status);
        })
        .catch(() => {
          showToast("Agency addition failed", { type: "error" });
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
              name="agencyName"
              label="Agency Name"
              placeholder="Enter Agency Name"
            />
            <Spacer size="xs" />
            <Input
              name="agencyEmail"
              label="Agency Email"
              placeholder="Enter Agency Email"
            />
            <Spacer size="xs" />
            <Input
              name="brokerCode"
              label="Broker Code"
              placeholder="Enter Broker Code"
            />
            <Spacer size="xs" />
            <Input
              name="panNumber"
              label="PAN Number"
              placeholder="Enter PAN Number"
            />
            <Spacer size="xs" />
            <Input
              name="gstNumber"
              label="GST Number"
              placeholder="Enter GST Number"
            />
            <Spacer size="xs" />

            <Input
              name="registeredAddress.line1"
              label="Address Line 1"
              placeholder="Enter Address Line 1"
            />
            <Spacer size="xs" />
            <Input
              name="registeredAddress.city"
              label="City"
              placeholder="Enter City"
            />
            <Spacer size="xs" />
            <div className="flex flex-row gap-2 mb-4">
              <Input
                name="registeredAddress.state"
                label="State"
                placeholder="Enter State"
              />
              <Spacer size="xs" />
              <Input
                name="registeredAddress.pincode"
                label="Pincode"
                placeholder="Enter Pincode"
              />
              <Spacer size="xs" />
            </div>

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
