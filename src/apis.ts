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

//add policy
export const postEventApi = (
  date_of_event: string,
  event_type: string,
  description: string,
  client_id: number
) => {
  return onePiece.post(
    "/event",
    {
      date_of_event,
      event_type,
      description,
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

//client details

//clients events
export const GetClientDetails = (clientId: string) => {
  return onePiece.get(`/client/${clientId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      agent_id: localStorage.getItem("id"),
    },
  });
};

//marketing
export const GetMarketing = () => {
  return onePiece.get(`/marketing-content`, {
    headers: {
      "Content-Type": "text/plain",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  });
};

//dashboard news api

//client list
export const GetDashboardNews = () => {
  return onePiece.get(`/dashboard-news/1`, {
    headers: {
      "Content-Type": "text/plain",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  });
};

//all products api
export const GetInsuranceList = () => {
  return onePiece.get(`/get-insurance-list`, {
    headers: {
      "Content-Type": "text/plain",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      agent_id: localStorage.getItem("id"),
    },
  });
};

//add policy
export const cobrandImageApi = (image_url: string) => {
  const agent_id = localStorage.getItem("id");
  return onePiece.post(
    "/co-brand-image",
    {
      image_url,
      agent_id,
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
