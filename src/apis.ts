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
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZ2VuY3lfaWQiOjIsImFnZW5jeV9uYW1lIjoiIiwiZW1haWwiOiJnZXRjbGllbnR3aXNlQGdtYWlsLmNvbSIsImV4cCI6MTczNzkwOTczMywiaWQiOjE0LCJtb2JpbGUiOiIiLCJuYW1lIjoiIn0.XeM84bJ63ljbASCOdEnvSquiO13Qojp4WrJa1sTQnh0`,//${localStorage.getItem("authToken")}
      agent_id:"9" ,//localStorage.getItem("id")
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
  return onePiece.get(`/policy/2`, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZ2VuY3lfaWQiOjIsImFnZW5jeV9uYW1lIjoiIiwiZW1haWwiOiJnZXRjbGllbnR3aXNlQGdtYWlsLmNvbSIsImV4cCI6MTczNzkwOTczMywiaWQiOjE0LCJtb2JpbGUiOiIiLCJuYW1lIjoiIn0.XeM84bJ63ljbASCOdEnvSquiO13Qojp4WrJa1sTQnh0`,
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
  return onePiece.get(`/client/9`, {   //${clientId}
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZ2VuY3lfaWQiOjIsImFnZW5jeV9uYW1lIjoiIiwiZW1haWwiOiJnZXRjbGllbnR3aXNlQGdtYWlsLmNvbSIsImV4cCI6MTczNzkwOTczMywiaWQiOjE0LCJtb2JpbGUiOiIiLCJuYW1lIjoiIn0.XeM84bJ63ljbASCOdEnvSquiO13Qojp4WrJa1sTQnh0`, // ${localStorage.getItem("authToken")}
      agent_id: localStorage.getItem("id"),
    },
  });
};

//marketing
export const GetMarketing = () => {
  return onePiece.get(`/api/communications/training-materials/2`, {
    headers: {
      "Content-Type": "text/plain",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZ2VuY3lfaWQiOjIsImFnZW5jeV9uYW1lIjoiIiwiZW1haWwiOiJnZXRjbGllbnR3aXNlQGdtYWlsLmNvbSIsImV4cCI6MTczNzkwOTczMywiaWQiOjE0LCJtb2JpbGUiOiIiLCJuYW1lIjoiIn0.XeM84bJ63ljbASCOdEnvSquiO13Qojp4WrJa1sTQnh0`, //${localStorage.getItem("authToken")}
    },
  });
};

//dashboard news api

//client list
export const GetDashboardNews = () => {
  return onePiece.get(`/dashboard-news/3`, {
    headers: {
      "Content-Type": "text/plain",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZ2VuY3lfaWQiOjIsImFnZW5jeV9uYW1lIjoiIiwiZW1haWwiOiJnZXRjbGllbnR3aXNlQGdtYWlsLmNvbSIsImV4cCI6MTczNzkwOTczMywiaWQiOjE0LCJtb2JpbGUiOiIiLCJuYW1lIjoiIn0.XeM84bJ63ljbASCOdEnvSquiO13Qojp4WrJa1sTQnh0 `,//${localStorage.getItem("authToken")}
    },
  });
};

//all products api
export const GetInsuranceList = () => {
  return onePiece.get(`/api/products/2`, {
    headers: {
      "Content-Type": "text/plain",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZ2VuY3lfaWQiOjIsImFnZW5jeV9uYW1lIjoiIiwiZW1haWwiOiJnZXRjbGllbnR3aXNlQGdtYWlsLmNvbSIsImV4cCI6MTczNzkwOTczMywiaWQiOjE0LCJtb2JpbGUiOiIiLCJuYW1lIjoiIn0.XeM84bJ63ljbASCOdEnvSquiO13Qojp4WrJa1sTQnh0`,//${localStorage.getItem("authToken")}
      agent_id: localStorage.getItem("id"),
    },
  });
};

//add policy
export const cobrandImageApi = (image_url: string) => {
  // const agent_id = localStorage.getItem("id");
  console.log("image_url", image_url);
  const agent_id = "2";
  return onePiece.post(
    "/co-brand-image",
    {
      image_url,
      agent_id
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZ2VuY3lfaWQiOjIsImFnZW5jeV9uYW1lIjoiIiwiZW1haWwiOiJnZXRjbGllbnR3aXNlQGdtYWlsLmNvbSIsImV4cCI6MTczNzkwOTczMywiaWQiOjE0LCJtb2JpbGUiOiIiLCJuYW1lIjoiIn0.XeM84bJ63ljbASCOdEnvSquiO13Qojp4WrJa1sTQnh0`,//${localStorage.getItem("authToken")}
        // agent_id: localStorage.getItem("id"),
      },
    }
  );
};
