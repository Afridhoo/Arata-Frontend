import { Outlet, Link, useLocation } from "react-router-dom";
import { useState } from "react";
import Scroll from "../Scroll";
import { useAuth } from "@/utils/AuthContext";
import { UserNotExist } from "../UserNotExist";
import MobileNavbar from "./MobileNavbar";
import { useIsMobile } from "@/hooks/use-mobile";
import NavbarDekstop from "./NavbarDekstop";
import { NavbarItems } from "./NavbarItems";

const handleSplit = (s) => s.split("/")[1]?.toLowerCase();

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  const isMobile = useIsMobile();
  const { pathname } = useLocation();
  const { isUserNotLogin } = useAuth();

  const navbar = NavbarItems(isUserNotLogin);
  const { navItems, navUserNotLogin: NotLogin, navMobile } = navbar;

  const checkIsIdPath = handleSplit(pathname);
  const check = NotLogin?.some((s) => handleSplit(s.path) === checkIsIdPath);

  const getNavDefaultRender = navItems.filter((s) => s.render);
  if (check && checkIsIdPath) return <UserNotExist />;

  return (
    <div className="min-h-screen bg-slate-50 font-sans    ">
      <Scroll setIsScrolled={setIsScrolled} num={20} />

      <nav
        className={`fixed top-0 z-[9999] w-full transition-all duration-300 hidden md:flex ${
          isScrolled
            ? "bg-white/80 backdrop-blur-md shadow-lg py-3"
            : "bg-white py-5 shadow-sm"
        }`}
      >
        <NavbarDekstop
          checkIsIdPath={checkIsIdPath}
          handleSplit={handleSplit}
          getNavDefaultRender={getNavDefaultRender}
        />
      </nav>

      <nav className={"sm:hidden "}>
        <MobileNavbar navMobile={navMobile} />
      </nav>

      <main className={!isMobile ? "pt-24" : 'pb-10'}>
        <Outlet />
      </main>
    </div>
  );
}
