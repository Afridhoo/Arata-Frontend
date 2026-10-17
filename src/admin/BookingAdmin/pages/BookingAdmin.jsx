import { useState } from "react";
import { UseGetAllBooking, UseUpdateBooking } from "../hooks/useBookingAdmin";

import TableBookingAdmin from "../components/BookingAdmin/TableBookingAdmin";
import { GetStatsBooking } from "../components/BookingAdmin/StatsBooking";
import PopupUpdate from "../components/PopupUpdate";
import TablesAdmin from "../../GlobalComponents/TablesAdmin";
import { formatCurrencyId } from "../../../utils/convertCurrency";
import { FiCalendar } from "react-icons/fi";
import { formatDateId } from "../../../utils/convertDate";
import NewLoading from "@/components/loading/NewLoading";
import { useSearchParams } from "react-router-dom";
import { GetParamsBooking } from "@/features/tours/components/Params";
import PaginationSimpel from "@/components/PaginationSimpel";

export default function BookingAdmin() {
  const [pagination, setPagination] = useState(1);
  const [paramsFilter] = useSearchParams();

  const params = GetParamsBooking(paramsFilter);

  const { data: Booking, isPending } = UseGetAllBooking({
    page: pagination,
    filter: params,
  });
  const { mutate: UpdateBooking } = UseUpdateBooking();
  const getStats = GetStatsBooking();

  const [valEditForm, setValEditForm] = useState(null);

  if (isPending) return <NewLoading />;

  const filterVal = Booking?.map((el) => ({
    id: el._id,
    data: [
      el.tour.name,
      el.user.name,
      formatCurrencyId(el.totalPrice),
      el.payment,
      el.status,
      el.bookingDate && formatDateId(el.bookingDate),
      el.quantity,
    ],
  }));

  const tabs = ["pending", "confirmed", "finished", "cancelled"];

  function handleEdit(id) {
    const value = Booking.find((el) => el._id === id);
    setValEditForm(value);
  }

  const tableHead = [
    "Tour Name",
    "User",
    "Total Price",
    "Payment",
    "Status",
    "Booking Date",
    "quantity",
  ];

  function onSucsess(id, status, tourId) {
    const value = { status, tourId };
    UpdateBooking({ value, idBooking: id });
    setValEditForm(null);
  }

  function onCancel() {
    setValEditForm(null);
  }

  return (
    <div className="p-10 pt-5">
      {valEditForm && (
        <PopupUpdate
          onSucsess={onSucsess}
          onCancel={onCancel}
          value={valEditForm}
          options={tabs}
        />
      )}

      {getStats && (
        <TablesAdmin
          headline={"Booking"}
          stats={getStats}
          params={params}
          Icon={FiCalendar}
        />
      )}

      <TableBookingAdmin
        valueTable={filterVal}
        handleEdit={handleEdit}
        tableHead={tableHead}
      />

      <PaginationSimpel
        pagination={pagination}
        setPagination={setPagination}
        lengthData={Booking?.length}
        route={"admin/booking"}
      />
    </div>
  );
}
