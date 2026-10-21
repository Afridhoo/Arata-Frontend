import { useState } from "react";
import TableBookingAdmin from "../../BookingAdmin/components/BookingAdmin/TableBookingAdmin";
import TablesAdmin from "../../GlobalComponents/TablesAdmin";
import { statsTour } from "../components/StatsTour";
import { UseGetTours } from "../../../features/tours/hooks/useTours";

import PopupUpdateTours from "../components/PopupUpdateTours";
import {
  UseDeleteTour,
  UseGetUpdateTour,
  UseInsertTour,
} from "../hooks/useTourAdmin";
import PopupPostTour from "../components/PopupPostTour";
import Popup from "../../../components/Popup";
import { formatCurrencyId } from "../../../utils/convertCurrency";
import { FiMapPin } from "react-icons/fi";
import NewLoading from "@/components/loading/NewLoading";

import PaginationSimpel from "@/components/PaginationSimpel";
import { useSearchParams } from "react-router-dom";
import { GetParams } from "@/features/tours/components/Params";

export default function ToursAdmin() {
  const [page, setPage] = useState(1);

  const [paramsFilter] = useSearchParams();

  const params = GetParams(paramsFilter);

  const { data: DataTourAndCategories, isPending: LoadTour } = UseGetTours({
    page,
    filter: params,
  });
  const { mutate: UpdateTour, isPending: pendingUpdate } = UseGetUpdateTour();
  const { mutate: insertTour, isPending } = UseInsertTour();
  const { mutate: DeleteTour, isPending: pendingDelete } = UseDeleteTour();
  const getStatsTour = statsTour();

  const [isActivePost, setIsActivePost] = useState(null);

  const [valueEdit, setValueEdit] = useState(null);
  const [PopUpIsActive, setPopUpIsActive] = useState(null);
  const [idDelete, setIdDelete] = useState("");

  const { tour: Tour = [], categories = [] } = DataTourAndCategories || {};

  if (isPending || LoadTour || pendingUpdate || pendingDelete)
    return <NewLoading />;

  function handleSetValueEdit(id) {
    const getValueEdit = Tour?.find((el) => el._id === id);

    setValueEdit(getValueEdit);
  }

  function onSucsessEdit(value, id) {
    UpdateTour({ id, value });
    setValueEdit(null);
  }

  function onCancel() {
    setValueEdit(null);
    setIsActivePost(null);
  }

  function onSucsessPost(value) {
    insertTour({ value });
    setIsActivePost(null);
  }
  function handleIsActivePost() {
    setIsActivePost(true);
  }

  function handleDelete() {
    DeleteTour({ idDelete });
    displayPopUp();
  }

  function displayPopUp(id) {
    setPopUpIsActive((popup) => !popup);
    setIdDelete(id);
  }

  const filterVal = Tour?.map((el) => ({
    id: el._id,
    data: [
      el.name,
      formatCurrencyId(el.price),
      el.maxGroupSize,
      el.slot,
      `${el.locations.destination.length} Lokasi`,
      `${el.maxGroupSize - el.slot || 0} Users`,
    ],
  }));

  const tableHead = [
    "name",
    "price",
    "maxGroup",
    "slot",
    "Destination",
    "UserBooking",
  ];



  return (
    <div className="p-10 pt-5">
      {isActivePost && (
        <PopupPostTour
          onCancel={onCancel}
          onSucsess={onSucsessPost}
          categories={categories}
        />
      )}

      {PopUpIsActive && (
        <Popup
          onConfirm={handleDelete}
          onCancel={displayPopUp}
          title={"Menghapus Tour"}
          message={
            "Apakah Anda Yakin Ingin Menghapus Tour Ini , Semua Data Mengenai Tour Ini Akan Hilang ,Pastikan Tidak Ada Pesanan Yang Sedang Berjalan"
          }
        />
      )}

      {valueEdit && (
        <PopupUpdateTours
          value={valueEdit}
          onCancel={onCancel}
          onSucsess={onSucsessEdit}
          categories={categories}
        />
      )}

      <TablesAdmin
        stats={getStatsTour}
        headline={"Tours"}
        setIsActivePost={handleIsActivePost}
        Icon={FiMapPin}
        role={"Admin"}
        params={params}
        categories={categories}
      />

      <TableBookingAdmin
        valueTable={filterVal}
        handleEdit={handleSetValueEdit}
        tableHead={tableHead}
        handleDelete={displayPopUp}
      />

      <div>
        <PaginationSimpel
          pagination={page}
          setPagination={setPage}
          lengthData={Tour?.length}
        />
      </div>
    </div>
  );
}
