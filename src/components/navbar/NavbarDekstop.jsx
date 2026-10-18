import { FiBell, FiHeart } from "react-icons/fi";
import LogoWebsite from "../../assets/LogoWebsite.png";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/utils/AuthContext";
import { LucideUser2 } from "lucide-react";

export default function NavbarDekstop({
  checkIsIdPath,
  getNavDefaultRender,
  handleSplit,
}) {
  const { isUserNotLogin, user: User } = useAuth();

  return (
    <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
      <Link to="/" className="flex items-center gap-3 group">
        <div className="w-10 h-10 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
          <img src={LogoWebsite} alt="Logo" />
        </div>
      </Link>

      <div className="flex ml-20 items-center justify-center gap-6">
        {getNavDefaultRender.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`text-sm font-semibold   transition-colors duration-300 relative   ${handleSplit(item.path) === checkIsIdPath ? "underline underline-offset-4  text-emerald-700 " : "text-slate-600 hover:text-teal-600 after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-teal-500 after:transition-all after:duration-300 hover:after:w-full"}`}
          >
            {item.name}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {User && (
          <div className="hidden md:flex items-center gap-1">
            <Link
              to="/notification"
              className="text-slate-600 hover:text-teal-600 p-2 rounded-full hover:bg-teal-50 transition-colors duration-300"
            >
              <FiBell className="text-xl" />
            </Link>

            <Link
              to="/favorite"
              className="text-slate-600 hover:text-teal-600 p-2 rounded-full hover:bg-teal-50 transition-colors duration-300"
            >
              <FiHeart className="text-xl" />
            </Link>
          </div>
        )}
        {!isUserNotLogin && (
          <div className="flex items-center gap-3">
            <Link to={"/login"}>
              <Button className="cursor-pointer" variant="outline">
                Log in
              </Button>
            </Link>
            <Link to={"/signup"}>
              <Button className="cursor-pointer">Sign Up</Button>
            </Link>
          </div>
        )}

        {User && (
          <Link
            to={"/AccountMe"}
            className="ml-2 w-10 h-10 rounded-full overflow-hidden border-2 border-transparent hover:border-gray-500 transition-all duration-300 shadow-sm cursor-pointer shrink-0"
          >
            {User?.photo ? (
              <img
                src={User.photo}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full bg-gray-300 h-full flex items-center justify-center ">
                <LucideUser2 size={16} />
              </div>
            )}
          </Link>
        )}
      </div>
    </div>
  );
}
