import { FiCompass } from "react-icons/fi";
import TableBookingAdmin from "../../../admin/BookingAdmin/components/BookingAdmin/TableBookingAdmin";
import TablesAdmin from "../../../admin/GlobalComponents/TablesAdmin";
import {
  UseGetSameGuide,
  UseGetTourGuide,
  UseUpdateDestinationHandle,
} from "../hooks/UseGetTourGuide";
import { useState } from "react";
import PopupUpdateDestination from "../components/PopupUpdateDestination";
import { formatDateId } from "../../../utils/convertDate";
import { InfoValue } from "../components/info";
import PopupCheckUser from "../components/PopupCheckUser";
import {
  UseDeletDocumentation,
  UseUpdateDocumentation,
  UseUpdateUserBooking,
} from "../hooks/UseUpdateTourGuide";
import PopupSeeGuide from "../components/PopupSeeGuide";
import NewLoading from "@/components/loading/NewLoading";

import { EmptySimpleUse } from "@/components/EmptySimpleUse";
import {
  LucideHotel,
  LucideMapPinCheckInside,
  LucideUserX2,
} from "lucide-react";
import { toast } from "sonner";

export default function UpdateTourStatus() {
  const { data: TourGuide } = UseGetTourGuide();
  const { mutate: UpdateDestination, isPending } = UseUpdateDestinationHandle();
  const { mutate: UpdateUserBooking, isPending: LoadUser } =
    UseUpdateUserBooking();
  const { mutate: UpdateDocumentation, isPending: LoadDocUpdate } =
    UseUpdateDocumentation();
  const { mutate: DeleteDoc, isPending: LoadDelete } = UseDeletDocumentation();
  const {
    mutate: GetGuide,
    data: seeGuide,
    isPending: LoadSeeGuide,
    reset: resetSeeGuide,
  } = UseGetSameGuide();

  const [valueEdit, setValueEdit] = useState(null);
  const [isActivePopup, setIsActivePopup] = useState(null);
  const [isActiveTabs, setIsActiveTabs] = useState("destination");

  if (
    !TourGuide ||
    isPending ||
    LoadUser ||
    LoadDocUpdate ||
    LoadDelete ||
    LoadSeeGuide
  )
    return <NewLoading />;

  if (TourGuide.length === 0)
    return (
      <EmptySimpleUse
        title={"Anda Belum Memiliki Tugas Aktif"}
        desc={
          "Anda Sedang Tidak Di Tugaskan Di Lokasi Tour Wisata Manapun Saat Ini"
        }
        icon={<LucideUserX2 />}
      />
    );

  const tableHead = [
    "nama tour",
    "nama wisata",
    "kategori wisata",
    "Status wisata",
    "Tanggal Keberangkatan",
    "Total Dokumentasi",
    "Dokumentasi Gambar",
  ];

  const {
    destinationHandle,
    tourHandle,
    userBooking,
    GetCategories,
    documentationTour,
    sameGuide,
    guides: idGuideIdentity,
  } = TourGuide[0] || [];

  const { trip } = documentationTour.length > 0 ? documentationTour[0] : {};
  const { _id, name, locations } = tourHandle;
  const { hotel } = locations;

  const concatVal = [...(destinationHandle || []), ...(hotel || [])];

  const info = InfoValue(TourGuide);

  const valueList = concatVal?.map((el) => {
    const { from, to } = el.date;

    return {
      id: el._id,
      data: [
        name,
        el.description,
        GetCategories?.find((c) => c._id === el?.categories)?.categoriesTour,
        el.status,
        `${formatDateId(from, true)} - ${formatDateId(to, true)}`,
        trip?.filter((t) => t.destination === el._id)?.length || 0,
        trip
          ?.filter((t) => t.destination === el._id)
          ?.flatMap((el) => el.images).length || 0,
      ],
      typeLocation: el.typeLocation,
    };
  });

  const filterVal = valueList.filter((el) => el.typeLocation === isActiveTabs);

  function handleEdit(idValue) {
    if (documentationTour.length === 0)
      return toast.error("Anda Belum Mengabsen  User", {
        description: "Silahkan Absen Kehadiran User Terlebih Dahulu",
      });

    const findValue = concatVal.find((el) => el._id === idValue);

    const getIsValidCategories = GetCategories?.find(
      (c) => c?._id === findValue?.categories,
    );

    const formatValue = {
      handleUpdate: { ...findValue, getIsValidCategories },
      documentationTour,
      idGuideIdentity,
    };

    setValueEdit(formatValue);
  }

  function handleSaveData(val) {
    UpdateDestination({ val });
    setValueEdit(null);
  }

  function handleUserBooking(value) {
    UpdateUserBooking({ value });
    setIsActivePopup(null);
  }

  function handleUpdateDocumentation(value) {
    UpdateDocumentation({ value });
    setValueEdit(null);
  }

  function handleDeleteDocumentation(value) {
    DeleteDoc({ value });
    setValueEdit(null);
  }

  function handleSeeUserGuide() {
    const idGuide = sameGuide?.map((el) => el._id);

    GetGuide({ value: { guide: idGuide } });
  }

  const tabs = [
    {
      value: "destination",
      label: "Wisata",
      icon: <LucideMapPinCheckInside />,
      default: true,
    },
    { value: "hotel", label: "Akomodasi", icon: <LucideHotel /> },
  ];

  return (
    <div className="p-10 pt-5  ">

      {valueEdit && (
        <PopupUpdateDestination
          value={valueEdit}
          onCancel={() => setValueEdit(null)}
          onSave={handleSaveData}
          tourId={_id}
          onSaveUpdate={handleUpdateDocumentation}
          handleDeleteDoc={handleDeleteDocumentation}
        />
      )}
      {seeGuide?.getGuide.length > 0 && (
        <PopupSeeGuide dataGuide={seeGuide.getGuide} onCancel={resetSeeGuide} />
      )}

      {isActivePopup && (
        <PopupCheckUser
          valueUser={userBooking}
          onSave={handleUserBooking}
          documentation={documentationTour[0]}
          onCancel={() => setIsActivePopup(false)}
          tourId={_id}
        />
      )}

      <TablesAdmin
        stats={info}
        headline={"Handle Wisata"}
        Icon={FiCompass}
        tabs={tabs}
        role={"Guide"}
        NoActiveSearchTab={true}
        setIsActiveTabs={setIsActiveTabs}
        isActive={isActiveTabs}
        handleSeeUser={handleSeeUserGuide}
        setIsActivePost={() => setIsActivePopup(true)}
      />
      <TableBookingAdmin
        valueTable={filterVal}
        handleEdit={handleEdit}
        tableHead={tableHead}
        handleDelete={false}
      />
    </div>
  );
}
