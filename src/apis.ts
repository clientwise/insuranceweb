"use client";
import { onePiece } from "./utils/AxiosInterceptor";

export const LoginApi = (email: string, is_admin: boolean) => {
  return onePiece.post(
    "/login",
    { email, is_admin },
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


export const Agentlogin = (email: string, password: string) => {
  return onePiece.post(
    "/api/auth-agent/login",
    { email: email, password: password },
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
      agent_id:localStorage.getItem("id")
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

export const AgencyBasicDetailsApi = (
  agencyName: string,
  agencyEmail: string,
  brokerCode: string,
  panNumber: string,
  gstNumber: string,
  registeredAddress: {
    line1: string;
    city: string;
    state: string;
    pincode: string;
  },
  billingAddress: {
    line1: string;
    city: string;
    state: string;
    pincode: string;
  }
) => {
  return onePiece.post(
    "/save-profile",
    {
      agencyName,
      agencyEmail,
      brokerCode,
      panNumber,
      gstNumber,
      registeredAddress,
      billingAddress,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        agent_id: localStorage.getItem("id"),
      },
    }
  );
};

export const AgencyBankingDetailsApi = (
  accountNumber: string,
  ifscCode: string,
  bankName: string
) => {
  return onePiece.post(
    "/save-bank-details",
    {
      accountNumber,
      ifscCode,
      bankName,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        agent_id: localStorage.getItem("id"),
      },
    }
  );
};

export const AgencyAgreementDetailsApi = (formData: FormData) => {
  return onePiece.post(
    "/save-bank-details", // Adjust the API endpoint as needed
    formData, // Send the formData directly
    {
      headers: {
        "Content-Type": "multipart/form-data", // Important for file uploads
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        agent_id: localStorage.getItem("id"),
      },
    }
  );
};

export const GetsAgentsDetails = (agencyId: number) => {
  return onePiece.get(`/api/agents/${agencyId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  });
};

export const AddAgentApi = (
  name: string,
  email: string,
  bankDetails: {
    accountNumber: string;
    ifscCode: string;
    bankName: string;
  },
  dateOfJoining: string,
  panNumber: string,
  userType: string,
  userAccess: string[]
) => {
  const agencyId = localStorage.getItem("agency_id");
  return onePiece.post(
    `/api/agents/${agencyId}/add`,
    {
      name,
      email,
      bankDetails,
      dateOfJoining,
      panNumber,
      userType,
      userAccess,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    }
  );
};

export const AgentMultipleAddApi = (formData: FormData) => {
  return onePiece.post("/save-bank-details", formData, {
    headers: {
      "Content-Type": "multipart/form-data", // Important for file uploads
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      agent_id: localStorage.getItem("id"),
    },
  });
};

export const GetsAgencyProducts = (agencyId: number) => {
  return onePiece.get(`/api/products/${agencyId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  });
};

export const AddAgencyProductApi = (
  product_id: number,
  insurer_name: string,
  product_name: string,
  category: string,
  type: string,
  agent_commission_percentage: number,
  agency_commission_percentage: number,
  description: string,
  status: string,
  policy_state_date: string,
  policy_expiry_date: string,
  agency_id: string,
  policy_document: File | FileList,
  policy_sales_brochure: File | FileList
) => {
  const formData = new FormData();
  formData.append("product_id", product_id.toString());
  formData.append("insurer_name", insurer_name);
  formData.append("product_name", product_name);
  formData.append("category", category);
  formData.append("type", type);
  formData.append(
    "agent_commission_percentage",
    agent_commission_percentage.toString()
  );
  formData.append(
    "agency_commission_percentage",
    agency_commission_percentage.toString()
  );
  formData.append("description", description);
  formData.append("status", status);
  formData.append("policy_state_date", policy_state_date);
  formData.append("policy_expiry_date", policy_expiry_date);
  formData.append("agency_id", agency_id);

  if (policy_document) {
    if (policy_document instanceof FileList) {
      Array.from(policy_document).forEach((file) =>
        formData.append("policy_document", file)
      );
    } else {
      formData.append("policy_document", policy_document);
    }
  }

  if (policy_sales_brochure) {
    if (policy_sales_brochure instanceof FileList) {
      Array.from(policy_sales_brochure).forEach((file) =>
        formData.append("policy_sales_brochure", file)
      );
    } else {
      formData.append("policy_sales_brochure", policy_sales_brochure);
    }
  }

  return onePiece.post("/api/products/add", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  });
};

export const GetsAgencyMarketingItems = (agencyId: number) => {
  return onePiece.get(`/api/communications/training-materials/${agencyId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  });
};

export const AddAgencyMarketingApi = (
  agency_id: string,
  content_category: string,
  content_header: string,
  content_subheader: string,
  content_type: string,
  language: string,
  product_type: string,
  status: string,
  content_file: File | FileList,
  content_url: string
) => {
  const formData = new FormData();
  formData.append("agency_id", agency_id);
  formData.append("content_category", content_category);
  formData.append("content_header", content_header);
  formData.append("content_subheader", content_subheader);
  formData.append("content_type", content_type || "");
  formData.append("language", language);
  formData.append("product_type", product_type);
  formData.append("status", status);
  formData.append("content_url", content_url || "");

  if (content_file) {
    if (content_file instanceof FileList) {
      Array.from(content_file).forEach((file) =>
        formData.append("content_file", file)
      );
    } else {
      formData.append("content_file", content_file);
    }
  }

  return onePiece.post(
    "/api/communications/upload-training-material",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    }
  );
};
