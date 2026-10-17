import {
  UseGetGuideTour,
  UseGetToursBooking,
  UseUpdateDateTour,
} from "../hooks/useDateTourAdmin";
import { useState } from "react";
import TableBookingAdmin from "../../BookingAdmin/components/BookingAdmin/TableBookingAdmin";
import TablesAdmin from "../../GlobalComponents/TablesAdmin";
import { FiUserCheck } from "react-icons/fi";

import PopupUpdateDateGuide from "../components/PopupUpdateDateGuide";
import { useEffect } from "react";
import NewLoading from "@/components/loading/NewLoading";
import PaginationSimpel from "@/components/PaginationSimpel";
import { useSearchParams } from "react-router-dom";
import { GetParamsDateTour } from "@/features/tours/components/Params";
import { formatDateId } from "@/utils/convertDate";

export default function SetDateTour() {
  const [page, setPage] = useState(1);

  const [paramsFilter] = useSearchParams();
  const params = GetParamsDateTour(paramsFilter);

  const { data: Tours } = UseGetToursBooking({ page, filter: params });
  const { mutate: UpdateDateGuide, isPending } = UseUpdateDateTour();
  const {
    mutate: GetGuideTour,
    data: GuideTour,
    isPending: PendingGuide,
  } = UseGetGuideTour();

  const [isActive, setIsActive] = useState(null);
  const [isActivePopup, setIsActivePopup] = useState(null);

  useEffect(() => {
    if (GuideTour) setIsActivePopup(GuideTour);
  }, [GuideTour]);

  if (!Tours || PendingGuide || isPending) return <NewLoading />;

  const valueTable = Tours.map((el) => {
    const { startLocation } = el;
    const { from, to } = startLocation?.date || {};

    return {
      id: el._id,
      data: [
        el.name,
        el.locations.destination.length,
        el.locations.hotel.length,
        el.bookedCount,
        el.maxGroupSize,
        el.categoriesTour?.map((el) => el.categoriesTour)?.join(",") || "",
        el.guideReady?.length,
        el.guideAssigned?.length,
        from ? formatDateId(from, true) : "Belum Diatur",
        to ? formatDateId(to, true) : "Belum Diatur",
      ],
    };
  });

  function handleUpdate(value, id) {
    UpdateDateGuide({ value, id });
    setIsActivePopup(null);
  }

  const tableHead = [
    "name",
    "wisata",
    "hotel",
    "Total Booking",
    "Max Group",
    "Kategori Wisata",
    "Guide Ready",
    "Guide Ditambahkan",
    "Tanggal Keberangkatan",
    "Tanggal Selesai",
  ];

  function handleEdit(idTour) {
    GetGuideTour({ idTour });
  }
  function handleCancel() {
    setIsActivePopup(null);
  }

  return (
    <div className="p-10 pt-5">
      {isActivePopup && (
        <PopupUpdateDateGuide
          value={isActivePopup}
          onCancel={handleCancel}
          handleUpdate={handleUpdate}
        />
      )}

      <TablesAdmin
        headline={"Guide & Date Tour"}
        Icon={FiUserCheck}
        setIsActive={setIsActive}
        isActive={isActive}
        setDate={true}
        params={params}
      />

      <TableBookingAdmin
        tableHead={tableHead}
        valueTable={valueTable}
        handleEdit={handleEdit}
      />

      <PaginationSimpel
        pagination={page}
        setPagination={setPage}
        lengthData={Tours?.length}
      />
    </div>
  );
}
