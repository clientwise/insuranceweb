import {
  Home,

  BookmarkCheckIcon,
  BookText,
  Telescope,
} from "lucide-react";

export const sidebarLinks = [
  {
    imgURL: "/assets/home.svg",
    route: "/dashboard",
    label: "Dashboard",
    logocmp: <Home />,
  },
  {
    imgURL: "/assets/search.svg",
    route: "/dashboard/applied",
    label: "Applied",
    logocmp: <BookText />,
  },
  {
    imgURL: "/assets/heart.svg",
    route: "/dashboard/saved",
    label: "Saved",
    logocmp: <BookmarkCheckIcon />,
  },
  // {
  //   imgURL: "/assets/community.svg",
  //   route: "/dashboard/settings",
  //   label: "Settings",
  //   logocmp: <Wrench />,
  // },
  {
    imgURL: "/assets/community.svg",
    route: "/dashboard/myjobs",
    label: "My Jobs",
    logocmp: <Telescope />,
  },
];

export const profileTabs = [
  { value: "threads", label: "Threads", icon: "/assets/reply.svg" },
  { value: "replies", label: "Replies", icon: "/assets/members.svg" },
  { value: "tagged", label: "Tagged", icon: "/assets/tag.svg" },
];

export const communityTabs = [
  { value: "threads", label: "Threads", icon: "/assets/reply.svg" },
  { value: "members", label: "Members", icon: "/assets/members.svg" },
  { value: "requests", label: "Requests", icon: "/assets/request.svg" },
];

