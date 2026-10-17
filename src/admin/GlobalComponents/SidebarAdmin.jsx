import { FiNavigation } from "react-icons/fi";
import { Outlet } from "react-router-dom";

import NewLoading from "@/components/loading/NewLoading";
import {
  LucideAlignEndHorizontal,
  LucideCalendarSync,
  LucideListIndentIncrease,
  LucideMapPinPen,
  LucideTags,
  LucideUsers2,
} from "lucide-react";
import { useAuth } from "@/utils/AuthContext";
import { UserNotExist } from "@/components/UserNotExist";
import CannotAcsess from "@/components/CannotAcsess";

import SiderBarRoleAction from "@/components/SideBarsCompoenents/SiderBarRoleAction";

export default function SidebarAdmin() {
  const { isUserNotLogin, user, isAuthPending } = useAuth();

  if (!isUserNotLogin) return <UserNotExist />;
  if (isAuthPending) return <NewLoading />;

  const { role } = user;

  if (role !== "admin") return <CannotAcsess />;

  const Route = {
    navMain: [
      { url: "/admin", icon: <LucideAlignEndHorizontal />, title: "Dashboard" },
      { url: "tours", icon: <LucideMapPinPen />, title: "Tour" },
      { url: "booking", icon: <LucideTags />, title: "Booking" },

      {
        url: "setDateGuidesTour",
        icon: <LucideCalendarSync />,
        title: "Tanggal & Pemandu Tour",
      },
      { url: "addNewGuide", icon: <LucideUsers2 />, title: "Edit User" },

      {
        url: "monitoringAllTrip",
        icon: <FiNavigation />,
        title: "Monitoring Semua Trip",
      },
      {
        url: "addNewCategories",
        icon: <LucideListIndentIncrease />,
        title: "Tambah Kategori Tour Baru",
      },
    ],
  };

  return (
    <SiderBarRoleAction Route={Route} user={user}>
      <Outlet />
    </SiderBarRoleAction>
  );
}
