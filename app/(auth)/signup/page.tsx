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
import { jwtDecode } from "jwt-decode";

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
      const response = await fetch(
        "https://staging.api.mypolicymate.in/api/auth-agent/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      console.log(response, "response of signup");

      if (response.ok) {
        const data = await response.json();

        const token = data?.token;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const decodedToken: any = jwtDecode(token);
        nextLocalStorage()?.setItem("authToken", token);
        nextLocalStorage()?.setItem("agency_id", decodedToken.agency_id);

        nextLocalStorage()?.setItem(
          "date_of_joining",
          decodedToken.date_of_joining
        );
        nextLocalStorage()?.setItem("email", decodedToken.email);
        nextLocalStorage()?.setItem("exp", decodedToken.exp);
        nextLocalStorage()?.setItem("id", decodedToken.id);
        nextLocalStorage()?.setItem("is_agent", decodedToken.is_agent);
        nextLocalStorage()?.setItem("is_deleted", decodedToken.is_deleted);
        nextLocalStorage()?.setItem("name", decodedToken.name);
        nextLocalStorage()?.setItem("pan_number", decodedToken.pan_number);
        nextLocalStorage()?.setItem("status", decodedToken.status);
        nextLocalStorage()?.setItem("user_access", decodedToken.user_access);
        nextLocalStorage()?.setItem("user_type", decodedToken.user_type);

        router.replace("/dashboard");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
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
