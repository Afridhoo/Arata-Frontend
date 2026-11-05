import { Outlet } from "react-router-dom";

import NewLoading from "@/components/loading/NewLoading";
import { useAuth } from "@/utils/AuthContext";
import { UserNotExist } from "@/components/UserNotExist";

import CannotAcsess from "@/components/CannotAcsess";
import SiderBarRoleAction from "@/components/SideBarsCompoenents/SiderBarRoleAction";
import {
  LucideAlignEndHorizontal,
  LucideListRestart,
  LucideMapPinCheckInside,
  LucideMapPinSearch,
} from "lucide-react";
import NotActiveAccount from "./NotActiveAccount";

export default function SidebarGuides() {
  const { isUserNotLogin, user, isAuthPending } = useAuth();

  if (!isUserNotLogin) return <UserNotExist />;
  if (isAuthPending) return <NewLoading />;

  const { role, active } = user;

  if (role !== "guide") return <CannotAcsess />;
  if (!active) return <NotActiveAccount />;

  const Route = {
    navMain: [
      { url: "/guide", icon: <LucideAlignEndHorizontal />, title: "Dashboard" },
      {
        url: "tambahSkill",
        icon: <LucideListRestart />,
        title: "Tambah Skill",
      },
      {
        url: "updateStatusTour",
        icon: <LucideMapPinSearch />,
        title: "Update Status Wisata",
      },
      {
        url: "historiesGuide",
        icon: <LucideMapPinCheckInside />,
        title: "Lihat Histori Memandu",
      },
    ],
  };

  {
    return (
      <SiderBarRoleAction Route={Route} user={user}>
        <Outlet />
      </SiderBarRoleAction>
    );
  }
}
