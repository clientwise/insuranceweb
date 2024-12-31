"use client";

import * as React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Input from "@/src/components/common/Input";
import Spacer from "@/src/components/common/Spacer";
import { LoadingIcon } from "@/src/assets/images/Loading";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Worklist from "../../../src/assets/kuantslogo.svg";
import { nextLocalStorage } from "@/src/utils/nextLocalStorage";

const INITIAL_VALUES = {
  email: nextLocalStorage()?.getItem("email") ?? "",
  password: "",
};

export default function SignUp() {
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const router = useRouter();
  const emailLocal = nextLocalStorage()?.getItem("email");

  React.useEffect(() => {
    if (emailLocal === null) {
      localStorage.clear();
      router.replace("/login");
    }
  }, [emailLocal, router]);

  const handleSubmit = async ({ email, password }: typeof INITIAL_VALUES) => {
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch('https://staging.api.mypolicymate.in/api/auth-agent/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Successful login
        console.log("Login successful",response.json());
        router.replace("/dashboard");
      } else {
        // Handle error responses
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Login failed");
      }
    } catch (error) {
      console.error("Login Error:", error);
      setErrorMessage("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  return (
    <section className="bg-white">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <Image
          src={Worklist}
          alt="logo"
          className={`w-14 sm:w-24 rounded-xl mb-4`}
        />
        <h2 className="mb-4 text-2xl font-rubik font-normal text-gray-900">
          Login As Agent
        </h2>

        {errorMessage && (
          <div className="text-red-500 mb-4">{errorMessage}</div>
        )}

        <Formik
          initialValues={INITIAL_VALUES}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
          enableReinitialize
        >
          <Form>
            <Input label="Email" placeholder="Email" name="email" />
            <Input
              label="Password"
              placeholder="Enter Password"
              name="password"
              type="password" 
            />
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