import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Home from "./pages/Home";
import SignUp from "./features/auth/pages/SignUp";

import LogIn from "./features/auth/pages/LogIn";
import BookingMe from "./features/booking/pages/BookingMe";
import BookingById from "./features/booking/pages/DetailBookingById";
import BookingProsess from "./features/booking/pages/BookingProsess";
import Payment from "./features/booking/components/Payment";
import Tours from "./features/tours/pages/Tours";
import Tour from "./features/tours/pages/Tour";

import SidebarProfil from "./features/profil/components/SidebarProfil";
import Profil from "./features/profil/pages/Profil";
import UpdateAccount from "./features/profil/pages/UpdateAccount";
import Notification from "./features/notification/pages/Notification";
import SidebarAdmin from "./admin/GlobalComponents/SidebarAdmin";
import DashboardAdmin from "./admin/GlobalComponents/DashboardAdmin";
import ToursAdmin from "./admin/ToursAdmin/pages/ToursAdmin";
import BookingAdmin from "./admin/BookingAdmin/pages/BookingAdmin";
import ReviewAdmin from "./admin/ReviewAdmin/pages/ReviewAdmin";
import NotFoundUrl from "./components/NotFoundUrl";

import SetDateTour from "./admin/DateTourAdmin/pages/SetDateTour";
import SidebarGuides from "./guides/GlobalComponents/SidebarGuides";
import DashboardGuide from "./guides/GlobalComponents/DashboardGuide";
import UpdateSkill from "./guides/UpdateSkillGuides/pages/UpdateSkill";
import UpdateTourStatus from "./guides/UpdateTourStatus/pages/UpdateTourStatus";
import AddNewGuide from "./admin/AddNewGuide/AddNewGuide";
import TripMe from "./features/TripMe/TripMe";
import MonitoringAllTrip from "./admin/MonitoringAllTrip/MonitoringAllTrip";
import HistoriesGuide from "./guides/historiesGuide/HistoriesGuide";

import Favorite from "./features/favorite/Favorite";
import TripDocumentation from "./features/TripMeHistory/TripDocumentation";
import TripMeId from "./features/TripMeHistory/TripMeId";
import Services from "./pages/Services";
import { Toaster } from "./components/ui/sonner";
import AddNewCategories from "./admin/AddNewCategories/AddNewCategories";
import DetailHistories from "./guides/historiesGuide/components/DetailHistories";


const router = createBrowserRouter([
  {
    path: "/",
    Component: Navbar,
    children: [
      { index: true, Component: Home },
      { path: "/tours", Component: Tours },
      { path: "/tour/:id", Component: Tour },
      { path: "/signup", Component: SignUp },
      { path: "/login", Component: LogIn },
      { path: "/booking", Component: BookingMe },
      { path: "/booking/:id", Component: BookingById },
      { path: "/ProsessCheckout", Component: BookingProsess },
      { path: "/payment", Component: Payment },
      { path: "/notification", Component: Notification },
      { path: "/trip", Component: TripMe },
      { path: "/tripMe", Component: TripDocumentation },
      { path: "/tripMe/:id", Component: TripMeId },
      { path: "/favorite", Component: Favorite },
      { path: "/services", Component: Services },
      { path: "/Documentation/:id", Component: DetailHistories },
    ],
  },
  {
    path: "/AccountMe",
    Component: SidebarProfil,
    children: [
      { index: true, Component: Profil },
      { path: "UpdateAccount", Component: UpdateAccount },
    ],
  },
  {
    path: "/admin",
    Component: SidebarAdmin,
    children: [
      { index: true, Component: DashboardAdmin },
      { path: "tours", Component: ToursAdmin },
      { path: "booking", Component: BookingAdmin },
      { path: "review", Component: ReviewAdmin },
      { path: "setDateGuidesTour", Component: SetDateTour },
      { path: "addNewGuide", Component: AddNewGuide },
      { path: "monitoringAllTrip", Component: MonitoringAllTrip },
      { path: "addNewCategories", Component: AddNewCategories },
    ],
  },
  {
    path: "/guide",
    Component: SidebarGuides,
    children: [
      { index: true, Component: DashboardGuide },
      { path: "tambahSkill", Component: UpdateSkill },
      { path: "updateStatusTour", Component: UpdateTourStatus },
      { path: "historiesGuide", Component: HistoriesGuide },
    ],
  },
  {
    path: "*",
    Component: NotFoundUrl,
  },
]);

export default function App() {
  return (
    <>
      <Toaster richColors position="top-center" />
      <RouterProvider router={router} />
    </>
  );
}
