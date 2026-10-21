import { FiUserCheck, FiUsers } from "react-icons/fi";
import Headline from "../../components/Headline";
import IsActionPerRoleActive from "./IsActionPerRoleActive";
import { SectionCards } from "@/components/section-cards";

import FilterList from "@/features/tours/components/FilterList";
import FilterDateTour from "../DateTourAdmin/components/FilterDateTour";
import FilterBooking from "../BookingAdmin/components/FilterBooking";
import { Button } from "@/components/ui/button";
import TabsWithIcon from "@/components/TabsWithIcon";
import { useLocation } from "react-router-dom";
import FilterAddNewGuide from "../AddNewGuide/components/FilterAddNewGuide";

export default function TablesAdmin({
  headline,
  stats,
  categories,
  setIsActivePost,
  Icon,
  role,
  params = {},
  handleSeeUser,
  setDate,

  tabs,
  setIsActiveTabs,
}) {
  const { pathname } = useLocation();

  return (
    <div className="  w-full grid gap-10">
      <Headline role={role} headline={headline} Icon={Icon} />

      <SectionCards value={stats} />

      <div className="flex flex-wrap gap-5 justify-between border-b border-gray-300 pb-3">
        {tabs && <TabsWithIcon tabs={tabs} onClickTabs={setIsActiveTabs} />}

        <div className=" gap-2 flex-wrap flex items-center">
          {headline === "Tours" && role === "Admin" && (
            <Button onClick={() => setIsActivePost(true)}>Tambah Tour</Button>
          )}

          {role === "Admin" && (
            <FilterList
              noPaddingTop={true}
              categories={categories}
              route={"admin/tours"}
              params={params}
            />
          )}

          {pathname === "/admin/addNewGuide" && (
            <FilterAddNewGuide params={params} />
          )}

          {headline === "Booking" && <FilterBooking params={params} />}

          {setDate && <FilterDateTour params={params} />}

          {role === "Guide" && handleSeeUser && (
            <div className="flex flex-wrap gap-3">
              <IsActionPerRoleActive
                setIsActive={handleSeeUser}
                text={"Lihat Guide Bersama"}
                Icon={FiUsers}
              />
              <IsActionPerRoleActive
                setIsActive={setIsActivePost}
                text={"Absen Kehadiran User"}
                Icon={FiUserCheck}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
