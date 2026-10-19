import { UseSignOut } from "../../features/auth/hooks/useAuth";

import SiderBarRoleAction from "./SiderBarRoleAction";
import { Outlet } from "react-router-dom";
import {
  LucideHome,
  LucideNavigation,
  LucideUser2,
  LucideUserCog2,
} from "lucide-react";
import { useAuth } from "@/utils/AuthContext";

export default function Sidebars() {
  const { user } = useAuth();

  const Route = {
    navMain: [
      { url: "/", icon: <LucideHome />, title: "Kembali Ke Home" },
      {
        url: "/AccountMe",
        icon: <LucideUser2 />,
        title: "Profil",
      },
      {
        url: "/AccountMe/UpdateAccount",
        icon: <LucideUserCog2 />,
        title: "Update Akun",
      },
    ],
  };

  if (user) {
    const { role } = user;

    const handleConvert = (url, title) => {
      const format = {
        url,
        icon: <LucideNavigation />,
        title,
      };
      Route.navMain.push(format);
    };

    if (role === "admin") handleConvert("/admin", "Halaman Admin");
    if (role === "guide") handleConvert("/guide", "Halaman Pemandu");
  }

  return (
    <SiderBarRoleAction Route={Route} user={user}>
      <Outlet />
    </SiderBarRoleAction>
  );
}
