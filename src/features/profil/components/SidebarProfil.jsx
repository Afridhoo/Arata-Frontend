import Sidebars from "../../../components/SideBarsCompoenents/Sidebars";
import NewLoading from "@/components/loading/NewLoading";
import { UserNotExist } from "@/components/UserNotExist";
import { useAuth } from "@/utils/AuthContext";

export default function SidebarProfil() {
  const { isUserNotLogin, isAuthPending } = useAuth();

  if (isAuthPending) return <NewLoading />;
  if (!isUserNotLogin) return <UserNotExist />;

  return <Sidebars />;
}
