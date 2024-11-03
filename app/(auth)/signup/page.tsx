"use client";

import * as React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Input from "@/src/components/common/Input";
import Spacer from "@/src/components/common/Spacer";
import { LoadingIcon } from "@/src/assets/images/Loading";
import { useRouter } from "next/navigation";
import Select from "@/src/components/common/Select";
import { SelectType } from "@/src/types";
import { nextLocalStorage } from "@/src/utils/nextLocalStorage";
import Image from "next/image";
import Worklist from "../../../src/assets/kuantslogo.svg";

// Example options for the select
const genderOptions: SelectType[] = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

const INITIAL_VALUES = {
  name: "",
  email: nextLocalStorage()?.getItem("email") ?? "",
  password: "",
  gender: "",
  phone: "",
  institution_name: "",
  course_field: "",
  country: "",
  username: "",
  role: "normal",
};

export default function SignUp() {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const emailLocal = nextLocalStorage()?.getItem("email");

  React.useEffect(() => {
    if (emailLocal === "") {
      localStorage.clear();
      router.replace("/login");
    }
  }, [emailLocal, router]);

  const navigateToHomePage = React.useCallback(() => {
    router.replace("/");
  }, [router]);

  const handleSubmit = React.useCallback(
    // eslint-disable-next-line
    async (values: typeof INITIAL_VALUES) => {
      setLoading(true);
      navigateToHomePage();
    },
    [navigateToHomePage]
  );

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    phone: Yup.string().required("Phone is required"),
    password: Yup.string().required("Password is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    gender: Yup.string().required("Gender is required"),
    institution_name: Yup.string().required("Company/School name is required"),
    course_field: Yup.string().required("Course field is required"),
    country: Yup.string().required("Country is required"),
  });

  return (
    <section className="bg-white">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <Image
          src={Worklist}
          alt="logo"
          className={`w-14 sm:w-24 rounded-xl mb-4`}
        />
        <h2 className="mb-4 text-2xl font-poppins font-normal text-gray-900">
          Sign Up
        </h2>
        <Formik
          initialValues={INITIAL_VALUES}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
          enableReinitialize
        >
          <Form>
            <Input label="Name" placeholder="Name" name="name" />
            <Spacer size="xs" />
            <Input
              label="Username"
              placeholder="Enter Username"
              name="username"
            />
            <Spacer size="xs" />
            <Input
              label="Password"
              placeholder="Enter Password"
              name="password"
            />
            <Spacer size="xs" />
            <Input label="Phone Number" placeholder="Phone" name="phone" />
            <Spacer size="xs" />
            <Input label="Email" placeholder="Email" name="email" />
            <Spacer size="xs" />
            <Select
              name="gender"
              label="Gender"
              placeholder="Select your gender"
              item={genderOptions}
              className="bg-white text-black rounded-md"
            />
            <Spacer size="xs" />
            <Input
              label="Organisation"
              placeholder="Organisation"
              name="institution_name"
            />
            <Spacer size="xs" />
            <Input label="Type" placeholder="Type" name="course_field" />
            <Spacer size="xs" />
            <Input label="Country" placeholder="Country" name="country" />
            <Spacer size="xs" />
            <div className="flex justify-center items-center">
              {loading ? (
                <button
                  disabled
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
                >
                  <LoadingIcon />
                  Loading...
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-5 py-2.5 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Submit
                </button>
              )}
            </div>
          </Form>
        </Formik>
      </div>
    </section>
  );
}
