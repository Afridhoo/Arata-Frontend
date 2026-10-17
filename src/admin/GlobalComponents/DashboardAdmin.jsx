import NewLoading from "@/components/loading/NewLoading";

import { UseGetStatsBooking } from "../BookingAdmin/hooks/useBookingAdmin";

export default function DashboardAdmin() {
  const { data: StatsBooking } = UseGetStatsBooking();

  if (!StatsBooking) return <NewLoading />;

  const {
    cancelledBooking,
    confirmedBooking,
    finishedBooking,
    pendingBooking,
    revenueBooking,
    totalBooking,
  } = StatsBooking;

  console.log(
    cancelledBooking,
    confirmedBooking,
    finishedBooking,
    pendingBooking,
    revenueBooking,
    totalBooking,
  );

  console.log(123);

  return <div>Dashboakrd</div>;
}
