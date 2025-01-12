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
      setErrorMessage("An error occurred. Please try again later" +error);
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
    <section className="bg-gray-50 ">
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <Image
        src={Worklist}
        alt="logo"
        className={`w-14 sm:w-24 rounded-xl mb-4`}
      />
    
      <div className="  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0  dark:border-gray-700">
 
  

        {errorMessage && (
          <div className="text-red-500 mb-4">{errorMessage}</div>
        )}
 <div className=" p-6 space-y-4 md:space-y-6 sm:p-8">
              <p className="text-lg  font-light font-rubik leading-tight tracking-tight text-gray-900 ">
                Sign in to your account
              </p>
        <Formik
          initialValues={INITIAL_VALUES}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
          enableReinitialize
        >
          <Form>
          <p className="font-light font-rubik leading-tight tracking-tight text-gray-900 ">Enter your Email</p>
          <Spacer size="xs" />

          <Input  placeholder="Email" name="email" />
          <Spacer size="xs" />
            
          <p className="font-light font-rubik leading-tight tracking-tight text-gray-900 ">
          Enter your Password</p>             
          <Spacer size="xs" />

          <Input
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
              className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:from-blue-600 dark:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800 dark:focus:ring-blue-800"
            >
                Submit
              </button>
            )}
          </div>
          </Form>
        </Formik>

        <Spacer size="xs" />
        <a href="/login" className="font-light font-rubik leading-tight tracking-tight text-gray-900 text-right" style={{fontSize: "12px"}}>Login as Agency</a>
      </div>
      </div></div>
    </section>

  );
}
