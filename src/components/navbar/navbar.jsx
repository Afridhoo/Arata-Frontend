import { Outlet, Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { UseGetMe } from "../../features/auth/hooks/useAuth";
import { FiBell, FiHeart } from "react-icons/fi";
import LogoWebsite from "../../assets/LogoWebsite.png";
import Scroll from "../Scroll";
import { Button } from "../ui/button";
import { LucideUser2 } from "lucide-react";
import { useAuth } from "@/utils/AuthContext";
import { UserNotExist } from "../UserNotExist";

function navbarItems(isUserNotLogin) {
  const navItems = [
    { name: "Tours", path: "/tours", render: true },
    { name: "Booking", path: "/booking", render: isUserNotLogin },
    { name: "Perjalanan", path: "/trip", render: isUserNotLogin },
    { name: "Histori Perjalanan", path: "/tripMe", render: isUserNotLogin },
    { name: "Services", path: "/services", render: true },
  ];

  const navUserNotLogin = navItems.filter((s) => !s.render);

  return { navItems, navUserNotLogin };
}
const handleSplit = (s) => s.split("/")[1]?.toLowerCase();

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isUserNotLogin, user: User } = useAuth();

  const navbar = navbarItems(isUserNotLogin);
  const { navItems, navUserNotLogin } = navbar;

  const { pathname } = useLocation();
  const checkIsIdPath = handleSplit(pathname);
  const check = navUserNotLogin?.some(
    (s) => handleSplit(s.path) === checkIsIdPath,
  );

  if (check && checkIsIdPath) return <UserNotExist />;

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Scroll setIsScrolled={setIsScrolled} num={20} />

      <nav
        className={`fixed top-0 z-[9999] w-full transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 backdrop-blur-md shadow-lg py-3  "
            : "bg-white py-5 shadow-sm"
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <img src={LogoWebsite} alt="Logo" />
            </div>
          </Link>

          {/* Nav Links */}
          <div className="flex ml-20 items-center justify-center gap-6">
            {navItems
              ?.filter((s) => s.render)
              .map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-sm font-semibold   transition-colors duration-300 relative   ${handleSplit(item.path) === checkIsIdPath ? "underline underline-offset-4  text-emerald-700 " : "text-slate-600 hover:text-teal-600 after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-teal-500 after:transition-all after:duration-300 hover:after:w-full"}`}
                >
                  {item.name}
                </Link>
              ))}
          </div>

          {/* Right Side Actions */}
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
      </nav>
      {/* Main Content Area */}
      <main className="pt-24">
        <Outlet />
      </main>
    </div>
  );
}
