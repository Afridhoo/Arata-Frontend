import { Link } from "react-router-dom";
import Hamburger from "../Hamburger";
import { useAuth } from "@/utils/AuthContext";
import { LucideLogIn } from "lucide-react";

export default function MobileNavbar({ navItems = [] , navMobile }) {
  const { isUserNotLogin } = useAuth();

  return (
    <div>
      <div className="fixed top-3 z-[9999]  right-3">
        <Hamburger navItems={navItems} />
      </div>

      <div className="fixed bottom-1 z-[99] w-full">
        <div className=" flex  border-t bg-white border-gray-200 px-5 py-2 justify-center m-auto items-center gap-10">
          {navMobile?.map((s) => (
            <Link className="grid" to={s.path}>
              <span className="m-auto text-gray-400 w-fit ">{s.icon}</span>
              <span className="font-semibold text-[12px]">{s.name}</span>
            </Link>
          ))}
          {!isUserNotLogin && (
            <Link to={"/login"} className="grid">
              <span className="m-auto text-gray-400 w-fit ">
                <LucideLogIn />
              </span>
              <span className="font-semibold text-[12px]">login</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
