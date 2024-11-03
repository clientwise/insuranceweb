"use client";

import * as React from "react";
import { postContactApi } from "@/src/apis";
import Button from "@/src/components/Button";
import Row from "@/src/components/Row";
import Spacer from "@/src/components/Spacer";
import useApi from "@/src/hooks/useApi";
import useToast from "@/src/hooks/useToast";
import { Formik, Form as FormikForm } from "formik";
import * as Yup from "yup";
import Input from "@/src/components/Input";

interface Props {
  onClose: () => void;
  clientId: string;
}
export default function AddClient({ onClose, clientId }: Props) {
  const { makeApiCall } = useApi();
  const { showToast } = useToast();

  // eslint-disable-next-line
  const [initialValues, setInitialValues] = React.useState({
    name: "",
    phone: "",
    email: "",
    client_id: clientId,
  });

  const validationSchema = Yup.object().shape(
    {
      name: Yup.string().required("Contact name is required"),
      phone: Yup.string().when("email", {
        is: (email: string) => !email,
        then: () =>
          Yup.string()
            .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
            .required("Contact phone is required"),
        otherwise: () => Yup.string(),
      }),
      email: Yup.string().when("phone", {
        is: (phone: string) => !phone,
        then: () =>
          Yup.string()
            .email("Invalid email format")
            .required("Contact email is required"),
        otherwise: () => Yup.string(),
      }),
    },
    [
      ["name", "email"],
      ["email", "phone"],
    ] // noSortEdges
  );

  const handleSubmit = React.useCallback(
    ({ name, phone, email }: typeof initialValues) => {
      return makeApiCall(postContactApi(name, phone, email))
        .then(() => {
          onClose();
          showToast("Form submitted successfully", { type: "success" });
        })
        .catch(() => showToast("Form submitted failed", { type: "error" }));
    },
    [makeApiCall, showToast, onClose]
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
              label="Name of client "
              placeholder="Enter Name "
            />
            <Spacer size="xs" />
            <Input
              name="phone"
              label="Phone of client"
              placeholder="Enter Phone "
            />
            <Spacer size="xs" />
            <Input
              name="email"
              label="Email of client "
              placeholder="Enter email "
            />
            <Spacer size="xs" />
            <Input
              name="age"
              label="Age of client "
              placeholder="Enter age "
              type="number"
            />
            <Spacer size="xs" />
            <Input
              name="profession"
              label="Profession of client "
              placeholder="Enter profession "
            />
            <Spacer size="xs" />
            <Input
              name="address"
              label="Address of client "
              placeholder="Enter address "
            />
            <Spacer size="xs" />
            <Row justifyContent="center">
              <Button
                color="warning"
                className="text-base font-normal font-poppins text-white"
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
