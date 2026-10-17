
import { formatDateId } from "../../../utils/convertDate";

import {
  LucideAlarmCheck,
  LucideCalendarCheck2,
  LucideCamera,
  LucideImagePlus,
  LucideMapPinCheck,
  LucideMapPinCheckInside,
  LucideSwitchCamera,
  LucideUsers2,
  LucideUserX2,
} from "lucide-react";

export function InfoValue(TourGuide) {
  const { destinationHandle, tourHandle, documentationTour, dateAssigned } =
    TourGuide[0];

  const { locations, totalBooking } = tourHandle || {};
  const { hotel, destination } = locations;

  const { trip, userBooking } =
    documentationTour.length > 0 && documentationTour[0];

  const idDestHandle = destinationHandle?.map((el) => el._id);

  const getTotalDoc = trip?.filter((el) =>
    idDestHandle.includes(el.destination),
  ).length;

  const getHotelsIsFinish = hotel
    ?.filter((el) => el?.status === "finished")
    ?.map((el) => el._id);

  const getTotalImgHotel = trip
    ?.filter((el) => getHotelsIsFinish?.includes(el.destination))
    .flatMap((el) => el.images).length;

  const getTotalDocImg = trip
    ?.filter((el) => idDestHandle.includes(el.destination))
    .flatMap((el) => el.images)?.length;

  const getUserInCompleted = userBooking?.reduce(
    (acc, cur) => acc + cur.totalUserIncompleted,
    0,
  );

  const info = [
    {
      title: "Wisata Yang Ditugaskan",
      subValue: destinationHandle?.length,
      icon: LucideMapPinCheckInside,
      footerIcon: LucideMapPinCheckInside,
      footerTitle: `${destinationHandle?.length} Wisata Ditugaskan`,
      footerDesc: "Ditugaskan Oleh Admin",
    },
    {
      title: "Total User Booking",
      subValue: totalBooking || 0,
      icon: LucideUsers2,
      footerDesc: "Pastikan User Yang DiAbsen Sesuai",
      footerTitle: `${totalBooking || 0} User Ikut Serta`,
      footerIcon: LucideUsers2,
    },
    {
      title: "User Yang Tidak Hadir",
      subValue: getUserInCompleted,
      icon: LucideUserX2,
      footerTitle: `${getUserInCompleted || 0} User Tidak Hadir`,
      footerDesc: "User Yang Ketinggalan Masih Bisa Di Absen Jika Sudah Hadir",
      footerIcon: LucideUserX2,
    },

    {
      title: "Tanggal Ditugaskan",
      val: formatDateId(dateAssigned),
      icon: LucideCalendarCheck2,
      footerTitle: `Pastikan Anda Siap `,
      footerIcon: LucideCalendarCheck2,
    },
    {
      title: "Total Dokumentasi Wisata ",
      subValue: getTotalDoc || 0,
      icon: LucideCamera,
      footerTitle: ` Dokumentasi Wisata ${destinationHandle?.length || 0}`,
      footerDesc: `Wajib Upload Dokumentasi Sesuai Dengan Total Wisata Yang Di tugaskan`,
      footerIcon: LucideCamera,
    },
    {
      title: "Dokumentasi Penginapan ",
      subValue: getHotelsIsFinish.length || 0,
      icon: LucideAlarmCheck,
      footerTitle: `Dokumentasi Hotel ${hotel?.length || 0}`,
      footerDesc: `Dokumentasi Hotel Sifatnya Universal Semua Pemandu Bisa Mengupload Gambar`,
      footerIcon: LucideAlarmCheck,
    },
    {
      title: "Total Gambar Dokumentasi",
      subValue: getTotalDocImg || 0,
      icon: LucideImagePlus,

      footerTitle: `Total Gambar Wisata  ${getTotalDocImg || 0}`,
      footerDesc: "Total Keseluruhan Gambar Yang Anda Upload",
      footerIcon: LucideImagePlus,
    },
    {
      title: "Total Gambar Penginapan",
      subValue: getTotalImgHotel || 0,
      icon: LucideSwitchCamera,
      footerTitle: `Total Gambar Hotel   ${getTotalImgHotel || 0}`,
      footerDesc: "Total Keseluruhan Gambar Yang Diupload",
      footerIcon: LucideSwitchCamera,
    },
    {
      title: "Jumlah Wisata",
      subValue: destination?.length || 0,
      icon: LucideMapPinCheck,
      footerTitle: `Total Wisata  ${destination?.length}`,
      footerIcon: LucideMapPinCheck,
    },
    {
      title: "Jumlah Penginapan",
      subValue: hotel?.length || 0,
      icon: LucideMapPinCheckInside,
      footerTitle: `Total Hotel  ${hotel?.length}`,
      footerIcon: LucideMapPinCheckInside,
    },
  ];
  return info;
}
