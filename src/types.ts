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
export type DropdownType = {
  key: string;
  value: string | number;
};

export type SelectType = {
  label: string;
  value: string | number;
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
  date_of_event: string;
  description: string;
  event_type: string;
  id: number;
};

export type ClientType = {
  address: string;
  age: number;
  email: string;
  name: string;
  id: number;
  phone: string;
  profession: string;
  status: string;
};
