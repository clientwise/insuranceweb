"use client";
import { onePiece } from "./utils/AxiosInterceptor";

export const LoginApi = (email: string) => {
  return onePiece.post(
    "/login",
    { email: email },
    {
      headers: {
        "Content-Type": "text/plain",
      },
    }
  );
};

export const OtpSubmitApi = (email: string, otp: string) => {
  return onePiece.post(
    "/otp",
    { email: email, otp: otp },
    {
      headers: {
        "Content-Type": "text/plain",
      },
    }
  );
};

//client list
export const GetClientsDetails = () => {
  return onePiece.get(`/client`, {
    headers: {
      "Content-Type": "text/plain",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      agent_id: localStorage.getItem("id"),
    },
  });
};

//today event api
export const GetTodaysEventApi = () => {
  return onePiece.get(`/today-event`, {
    headers: {
      "Content-Type": "text/plain",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  });
};

export const AddClientApi = (
  name: string,
  phone: string,
  email: string,
  age: number,
  profession: string,
  address: string
) => {
  return onePiece.post(
    "/client",
    {
      name,
      phone,
      email,
      age,
      profession,
      address,
    },
    {
      headers: {
        "Content-Type": "text/plain",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        agent_id: localStorage.getItem("id"),
      },
    }
  );
};

//client policys

export const GetClientAllPolicy = (clientId: string) => {
  return onePiece.get(`/policy/${clientId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  });
};

//add policy
export const postPolicyApi = (
  name: string,
  amount: string,
  status: string,
  inception_date: string,
  frequency: string,
  next_due_date: string,
  maturity_date: string,
  client_id: number
) => {
  return onePiece.post(
    "/policy",
    {
      name,
      amount,
      status,
      inception_date,
      frequency,
      next_due_date,
      maturity_date,
      client_id,
    },
    {
      headers: {
        "Content-Type": "text/plain",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        agent_id: localStorage.getItem("id"),
      },
    }
  );
};

//clients events
export const GetClientAllEvents = (clientId: string) => {
  return onePiece.get(`/event/${clientId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  });
};
