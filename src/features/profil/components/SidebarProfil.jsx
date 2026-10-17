import { Outlet } from "react-router-dom";

import { FiEdit, FiUser } from "react-icons/fi";
import Sidebars from "../../../components/SideBarsCompoenents/Sidebars";
import NewLoading from "@/components/loading/NewLoading";
import { UserNotExist } from "@/components/UserNotExist";
import { useAuth } from "@/utils/AuthContext";

export default function SidebarProfil() {
  const { isUserNotLogin, user, isAuthPending } = useAuth();

  if (!isUserNotLogin) return <UserNotExist />;
  if (isAuthPending) return <NewLoading />;

  const Route = [
    { to: "/AccountMe", icon: FiUser, text: "Profil" },
    { to: "UpdateAccount", icon: FiEdit, text: "Update Profil" },
  ];

  return (
    <div className="flex max-h-screen  overflow-y-auto  bg-neutral-50">
      {/* Sidebar */}

      <Sidebars User={user} Route={Route} />

      {/* Konten Utama */}
      <main className="min-w-0 flex-1 overflow-y-auto px-5 py-6 sm:px-8 sm:py-10 lg:px-12">
        <Outlet />
      </main>
    </div>
  );
}
