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
      icon: <LucideHome />,
      mobile: true,
    },
    {
      name: "Tour",
      path: "/tours",
      render: true,
      icon: <LucideMapPin />,
      mobile: true,
    },

    {
      name: "Booking",
      path: "/booking",
      render: isUserNotLogin,
      icon: <LucideTags />,
      mobile: true,
    },
    {
      name: "Perjalanan",
      path: "/trip",
      render: isUserNotLogin,
      icon: <LucideNavigation />,
      mobile: true,
    },

    {
      name: "Histori",
      path: "/tripMe",
      render: isUserNotLogin,
      icon: <LucideMapPinCheckInside />,
    },
    {
      name: "Services",
      path: "/services",
      render: true,
      icon: <LucideContact2 />,
    },
  ];

  const navUserNotLogin = navItems.filter((s) => !s.render);
  const navMobile = navItems?.filter((s) => s.mobile);

  return { navItems, navUserNotLogin, navMobile };
}
