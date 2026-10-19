import {
  LucideContact2,
  LucideHome,
  LucideMapPin,
  LucideMapPinCheckInside,
  LucideNavigation,
  LucideTags,
} from "lucide-react";

export function NavbarItems(isUserNotLogin) {
  const navItems = [
    {
      name: "Home",
      path: "/",
      render: true,
      icon: <LucideHome size={16} />,
      mobile: true,
    },
    {
      name: "Tour",
      path: "/tours",
      render: true,
      icon: <LucideMapPin size={16} />,
      mobile: true,
    },

    {
      name: "Booking",
      path: "/booking",
      render: isUserNotLogin,
      icon: <LucideTags size={16} />,
      mobile: true,
    },
    {
      name: "Perjalanan",
      path: "/trip",
      render: isUserNotLogin,
      icon: <LucideNavigation size={16} />,
      mobile: true,
    },

    {
      name: "Histori",
      path: "/tripMe",
      render: isUserNotLogin,
      icon: <LucideMapPinCheckInside size={16} />,
    },
    {
      name: "Services",
      path: "/services",
      render: true,
      icon: <LucideContact2 size={16} />,
    },
  ];

  const navUserNotLogin = navItems.filter((s) => !s.render);
  const navMobile = navItems?.filter((s) => s.mobile);

  return { navItems, navUserNotLogin, navMobile };
}
