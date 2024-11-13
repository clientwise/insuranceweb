"use client";

import * as React from "react";
import Button from "@/src/components/Button";
import Row from "@/src/components/Row";
import Spacer from "@/src/components/Spacer";
import { Formik, Form as FormikForm } from "formik";
import * as Yup from "yup";
import Input from "@/src/components/Input";
import { ClientType } from "@/src/types";
import useApi from "@/src/hooks/useApi";
import { AddClientApi } from "@/src/apis";
import useToast from "@/src/hooks/useToast";
import { useRouter } from "next/navigation";

interface Props {
  onClose: () => void;
}
export default function AddClient({}: Props) {
  // eslint-disable-next-line
  const { makeApiCall } = useApi();
  const { showToast } = useToast();
  const router = useRouter();

  const [initialValues] = React.useState<ClientType>({
    name: "",
    phone: "",
    email: "",
    age: "",
    profession: "",
    address: "",
    id: 0,
    status: "",
  });

  const validationSchema = Yup.object().shape(
    {
      name: Yup.string().required("Client name is required"),
      phone: Yup.string().when("email", {
        is: (email: string) => !email,
        then: () =>
          Yup.string()
            .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
            .required("Client phone is required"),
        otherwise: () => Yup.string(),
      }),
      email: Yup.string().when("phone", {
        is: (phone: string) => !phone,
        then: () =>
          Yup.string()
            .email("Invalid email format")
            .required("Client email is required"),
        otherwise: () => Yup.string(),
      }),
      age: Yup.string().required("Client age is required"),
      profession: Yup.string().required("Client profession is required"),
      address: Yup.string().required("Client address is required"),
    },
    [
      ["name", "email"],
      ["email", "phone"],
    ]
  );

  const handleSubmit = React.useCallback(
    ({ name, phone, email, age, profession, address }: ClientType) => {
      console.log(
        name,
        phone,
        email,
        age,
        profession,
        address,
        typeof age,
        "Sending client details"
      );
      return makeApiCall(
        AddClientApi(name, phone, email, parseFloat(age), profession, address)
      )
        .then(() => {
          showToast("Client Added successfully", { type: "success" });
          router.push("/dashboard/clients");
        })
        .catch(() => {
          showToast("Client addition failed", { type: "error" });
        });
    },
    []
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
            <Input name="name" label="Name " placeholder="Enter Name " />
            <Spacer size="xs" />
            <Input name="phone" label="Phone" placeholder="Enter Phone " />
            <Spacer size="xs" />
            <Input name="email" label="Email" placeholder="Enter email " />
            <Spacer size="xs" />
            <Input
              name="age"
              label="Age"
              placeholder="Enter age "
              type="number"
            />
            <Spacer size="xs" />
            <Input
              name="profession"
              label="Profession"
              placeholder="Enter profession "
            />
            <Spacer size="xs" />
            <Input
              name="address"
              label="Address"
              placeholder="Enter address "
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
