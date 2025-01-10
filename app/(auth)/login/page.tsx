"use client";

import React, { useState } from "react";
import { Form, Formik } from "formik";
import Input from "@/src/components/common/Input";
import Spacer from "@/src/components/common/Spacer";
import * as Yup from "yup";
import { LoadingIcon } from "@/src/assets/images/Loading";
import OtpInput from "react-otp-input";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import useApi from "@/src/hooks/useApi";
import { LoginApi, OtpSubmitApi } from "@/src/apis";
import useToast from "@/src/hooks/useToast";
import Worklist from "../../../src/assets/kuantslogo.svg";
import Image from "next/image";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { Checkbox } from "@nextui-org/react";

interface CustomJwtPayload extends JwtPayload {
  agency_name: string;
  email: string;
  id: number;
  mobile: string;
  name: string;
}

const INTIAL_VALUES = {
  email: "",
};

const LoginPage = () => {
  const [email, setEmail] = useState(""); // eslint-disable-line
  const [loading, setLoading] = React.useState(false); // eslint-disable-line
  const [showOtp, setSetShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpLoading, setOtpLoading] = React.useState(false);
  const [checkboxChecked, setCheckboxChecked] = React.useState(false);

  const router = useRouter();

  const { makeApiCall } = useApi();
  const { showToast } = useToast();

  const navigateToSignup = React.useCallback(() => {
    router.push(`/signup`);
  }, [router]);

  const navigateToHomePage = React.useCallback(() => {
    router.replace("/dashboard");
  }, [router]);

  const handleSubmit = React.useCallback(
    ({ email }: typeof INTIAL_VALUES) => {
      setLoading(true);
      setEmail(email);
      localStorage.setItem("email", email);
      console.log("Email sending for login", email);

      return makeApiCall(LoginApi(email, checkboxChecked))
        .then((response) => {
          console.log(response, "RESPONSE OF OTP SENT");
          console.log("LOGIN SUCCESS");
          setSetShowOtp(true);
          showToast("OTP sent successfully!!", { type: "success" });
        })
        .catch((error) => {
          console.error("Login Error:- ", error);
          showToast(error.response?.data, { type: "error" });
          navigateToSignup();
        })
        .finally(() => setLoading(false));
    },
    [checkboxChecked, makeApiCall, navigateToSignup, showToast]
  );

  const otpSubmit = React.useCallback(
    (email: string, otp: string) => {
      setOtpLoading(true); // Set otpLoading to true
      return makeApiCall(OtpSubmitApi(email, otp))
        .then((response) => {
          console.log(response, "RESPONSE OF OTP verify");
          console.log("Decoding decoded");

          const decoded = jwtDecode<CustomJwtPayload>(response.token); // Use the custom type

          console.log(decoded, "Token decoded");
          if (response?.success == true) {
            console.log("OTP VERIfy SUCCESS");
            showToast("OTP verified successfully!!", { type: "success" });
            localStorage.setItem("authToken", response?.token);
            localStorage.setItem("is_admin", response?.is_admin);
            localStorage.setItem("profile_status", response?.status);
            localStorage.setItem("agency_id", response.agency_id);
            localStorage.setItem("email", decoded.email);
            localStorage.setItem("agency_name", decoded.agency_name);
            localStorage.setItem("name", decoded.name);
            localStorage.setItem("id", decoded.id.toString());
            localStorage.setItem("mobile", decoded.mobile);

            if (checkboxChecked) {
              if (response?.status < 3) {
                router.replace("/dashboard/agencyprofile");
              } else {
                router.replace("/dashboard/home");
              }
            } else {
              navigateToHomePage();
            }
          } else {
            console.log("OTP invalid ");
            showToast("Please enter valid otp!!", { type: "error" });
          }
        })
        .catch((error) => {
          console.error("OTP VERIFY Error:- ", error);
          showToast("Some error occurred!!", { type: "error" });
          return false;
        })
        .finally(() => setOtpLoading(false));
    },
    [checkboxChecked, makeApiCall, navigateToHomePage, router, showToast]
  );

  const onOtpChange = (text: string) => {
    console.log(text, "OTPPP");
    setOtp(text);
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Please enter a valid email"),
  });

  const handleCheckTermsandconditions = React.useCallback((event: boolean) => {
    setCheckboxChecked(event);
    // setIserror(!event);
  }, []);
  return (
    <section className="bg-gray-50 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Image
          src={Worklist}
          alt="logo"
          className={`w-14 sm:w-24 rounded-xl mb-4`}
        />
      
        <div className="  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0  dark:border-gray-700">
          {showOtp ? (
            <div className="flex justify-center items-center text-black">
              <div className="flex flex-col items-center justify-center p-8  text-black w-[80%] ">
                <OtpInput
                  value={otp}
                  onChange={(text) => onOtpChange(text)}
                  numInputs={4}
                  renderSeparator={
                    <span style={{ margin: "0 0.5rem" }}>-</span>
                  }
                  inputType="number"
                  renderInput={(props, index) => <input {...props} />} // eslint-disable-line
                  // inputStyle="  border border-gray-300 rounded-md  py-4 px-1  mx-4 text-black"
                  inputStyle={{
                    border: "1px solid #666476",
                    height: "50px",
                    width: "50px",
                    borderRadius: "15px",
                  }}
                />
                <Spacer size="md" />

                <Button
                  color="primary"
                  variant="solid"
                  isLoading={otpLoading}
                  disabled={otp.length >= 4 ? false : true}
                  onClick={() => otpSubmit(email, otp)}
                >
                  Submit
                </Button>
              </div>
            </div>
          ) : (
            <div className=" p-6 space-y-4 md:space-y-6 sm:p-8">
              <p className="text-lg  font-light font-rubik leading-tight tracking-tight text-gray-900 ">
                Sign in to your account
              </p>
              <Formik
                initialValues={INTIAL_VALUES}
                onSubmit={handleSubmit}
                validateOnBlur
                validateOnChange
                validationSchema={validationSchema}
                enableReinitialize
              >
                <Form>
                 <div>
                 <p className="  font-light font-rubik leading-tight tracking-tight text-gray-900 ">
                 Enter your Email</p>
                 </div>
                 <Spacer size="xs" />

                  <Input
                 
                    placeholder="Enter email"
                    name="email"
                    type="email"
                  />
                  <Spacer size="xs" />
                  <div className="flex flex-row justify-center items-center mb-5">
                    <Checkbox onValueChange={handleCheckTermsandconditions}>
                    <p className="font-light font-rubik leading-tight tracking-tight text-gray-900">  I am an agency</p>
                    </Checkbox>
                  </div>
                  {loading ? (
                    <button
                      disabled
                      type="button"
                      className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      <LoadingIcon />
                      Sending...
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      Send OTP
                    </button>
                  )}
                </Form>
              </Formik>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
