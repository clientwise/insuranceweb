"use client";
import { onePiece } from "./utils/AxiosInterceptor";

export const LoginApi = (email: string) => {
  const formData = new FormData();
  formData.append("email", email);

  return onePiece.post("/request-otp", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const OtpSubmitApi = (email: string, otp: string) => {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("otp", otp);

  return onePiece.post("/verify-otp", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
