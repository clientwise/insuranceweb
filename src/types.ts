import { MenuItemProps } from "@nextui-org/react";

export type User = {
  name: string;
  email: string;
  role: string;
  user_id: number;
  exp: number;
};

export type StoreType = {
  authToken?: string;
  setAuthToken: (authToken?: string) => void;
  user?: User;
  setUser: (user: User) => void;
};

// TEXT TYPES

export type FontSize = 4 | 8 | 12 | 16 | 20 | 24 | 28 | 32 | 36 | 40; // Adjust this list as needed

export type HeadingSize = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export type SubheadingSize = "subheading1" | "subheading2" | "subheading3";
export type DatePart =
  | "year"
  | "month"
  | "date"
  | "time"
  | "hours"
  | "minutes"
  | "seconds";

export type Style = {
  [key: string]: React.CSSProperties;
};

// YEAR TYPES
// export type DropdownType = {
//   key: string;
//   value: string | number;
// };

export type SelectType = {
  label: string;
  value: string | number;
};

export type DropdownType = {
  key: string;
  value: string | number;
  variant?: MenuItemProps["variant"];
  color?: MenuItemProps["color"];
};

export type Month =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";

//clientwise types

export type ClientList = {
  ID: number;
  Name: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  Contact: string;
  Status: number;
};

export type WishProps = {
  Name: string;
  Date: string;
};

export type Client = {
  ID: number;
  Name: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  Contact: string;
  Status: number;
  PhoneNumber: string;
  Date: string;
  Amount: number;
  Profession: string;
};

export type Article = {
  author: string;
  content: string;
  createdAt: string;
  description: string;
  id: string;
  image: string;
  metadata: string;
  slug: string;
  title: string;
  updatedAt: string;
};

export type TodaysEventsType = {
  client_id: string;
  client_name: string;
  date_of_event: string;
  description: string;
  event_type: string;
  id: number;
};

export type ClientType = {
  address: string;
  age: string;
  email: string;
  name: string;
  id: number;
  phone: string;
  profession: string;
  status: string;
};

export type PolicyType = {
  policy_id: string;
  name: string;
  amount: string;
  status: string;
  inception_date: string;
  frequency: string;
  next_due_date: string;
  maturity_date: string;
  client_id: number;
  agent_id: number;
  client_name: string;
};

export type EventType = {
  client_id: number;
  client_name: string;
  date_of_event: string;
  description: string;
  event_type: string;
  id: number;
};

export type ClientData = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  age: number;
  profession: string;
  status: string;
};

export type MarketingContent = {
  content_category: string;
  content_header: string;
  content_subheader: string;
  content_type: string;
  content_url: string;
  language: string;
  product_type: string;
  sno: string;
  content_file_url: string;
};

export interface NewsItem {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  news_heading: string;
  news_url: string;
  news_description: string;
  news_image_url: string;
  news_date: string;
  news_scraping_date: string;
  news_keyword: string;
  keyword_priority: number;
}

export type InsuranceListType = {
  name: string;
  type: string;
  category: string;
  product_id: string;
  commission: number;
  description: string;
  agent_commission_percentage: number;
  agency_id:number;
};

export type AddressType = {
  line1: string;
  city: string;
  state: string;
  pincode: string;
};

export type BasicInfoType = {
  agencyName: string;
  agencyEmail: string;
  brokerCode: string;
  panNumber: string;
  gstNumber: string;
  registeredAddress: AddressType;
};

export type AgentType = {
  agentId: number;
  dateOfJoining: string;
  email: string;
  name: string;
  panNumber: string;
  status: string;
  userAccess: string;
  userType: string;
};

export type ProductType = {
  agencyCommission_percentage: number;
  agent_commission_percentage: number;
  category: string;
  description: string;
  name: string;
  product_id: string;
  status: string;
};

export type AgencyMarketingItemType = {
  agency_id: string;
  content_category: string;
  content_file_url: string;
  content_header: string;
  content_subheader: string;
  content_type: string;
  language: string;
  content_url: string;
  product_type: string;
  sno: number;
  status: string;
};
