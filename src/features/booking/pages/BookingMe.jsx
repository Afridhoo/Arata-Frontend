import { UseGetBookingMe } from "../hooks/useBooking";

import { useState } from "react";
import TabsProps from "../components/BookingMeComponents/TabsProps";
import NewLoading from "@/components/loading/NewLoading";
import { UserNotExist } from "@/components/UserNotExist";

import { useAuth } from "@/utils/AuthContext";
import { Button } from "@/components/ui/button";
import {
  UseCreateReview,
  UseDeleteReview,
} from "@/features/review/hooks/useReview";

export default function BookingMe() {
  const { mutate: InsertReview, isPending: loadPost } = UseCreateReview();
  const { mutate: DeleteReview, isPending: loadDelete } = UseDeleteReview();

  const { isUserNotLogin, user } = useAuth();
  const { data: Booking, isPending } = UseGetBookingMe({
    enabled: isUserNotLogin,
  });

  const [isActive, setIsActive] = useState("semua");

  if (!isUserNotLogin) return <UserNotExist />;
  if (isPending || loadPost || loadDelete) return <NewLoading />;

  function handlePostReview(value) {
    InsertReview({ value });
  }

  function handleDeleteReview(id) {
    DeleteReview({ id });
  }

  const tabs = ["semua", "pending", "confirmed", "finished", "cancelled"];

  const getValue = Booking?.filter((el) => el.status === isActive);

  const chekingVal =
    getValue?.length >= 0 && isActive !== "semua" ? getValue : Booking;
  chekingVal?.sort((a, b) => new Date(b.bookingDate) - new Date(a.bookingDate));

  return (
    <div>
      <div className="flex  w-full    mt-10  ">
        {tabs.map((el) => {
          const isActiveTab = el === isActive;
          return (
            <Button
              onClick={() => setIsActive(el)}
              key={el}
              variant={isActiveTab ? "default" : "outline"}
              className="flex-1  cursor-pointer   transition-all duration-300 ease-in-out "
            >
              {el.toUpperCase()}
            </Button>
          );
        })}
      </div>

      <TabsProps
        value={chekingVal}
        statusActive={isActive}
        userMe={user}
        handlePostReview={handlePostReview}
        handleDeleteReview={handleDeleteReview}
      />
    </div>
  );
}
