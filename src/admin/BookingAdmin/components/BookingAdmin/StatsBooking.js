
import { UseGetStatsBooking } from "../../hooks/useBookingAdmin";
import { formatCurrencyId } from "../../../../utils/convertCurrency";
import {
  LucideAlertTriangle,
  LucideLineChart,
  LucideListPlus,
  LucideListX,
  LucideMapPinCheckInside,

  LucideUserCheck2,
  LucideUserMinus2,
  LucideUserPlus2,
  LucideUserX2,
  LucideWallet,
} from "lucide-react";

export function GetStatsBooking() {
  const { data: StatsBooking, isLoading } = UseGetStatsBooking();

  if (!StatsBooking || isLoading) return;

  const {
    cancelledBooking,
    confirmedBooking,
    finishedBooking,
    pendingBooking,
    revenueBooking,
    totalBooking,
  } = StatsBooking;

  const info = [
    {
      title: "User Booking",
      val: totalBooking || "-",
      icon: LucideUserPlus2,
      footerIcon: LucideLineChart,
      footerTitle: "Total Booking",
      footerDesc: "Berdasarkan Data Keseluruhan",
    },
    {
      title: "Booking Pending",
      val: pendingBooking || "-",
      icon: LucideUserMinus2,
      footerIcon: LucideAlertTriangle,
      footerTitle: "Total Pending",
      footerDesc: "Booking Belum Dikonfirmasi",
    },
    {
      title: "Booking Confirmed",
      val: confirmedBooking || "-",
      icon: LucideUserCheck2,
      footerTitle: "Total Konfrimasi",
      footerDesc: "Booking Sudah Dikonfirmasi",
      footerIcon: LucideListPlus,
    },
    {
      title: "Booking Dibatalkan",
      val: cancelledBooking || "-",
      icon: LucideUserX2,
      footerTitle: "Total Dibatalkan",
      footerDesc: "Booking Yang Dibatalkan User",
      footerIcon: LucideListX,
    },
    {
      title: "Booking Sudah Selesai",
      val: finishedBooking || "-",
      icon: LucideMapPinCheckInside,
      footerIcon: LucideMapPinCheckInside,
      footerTitle: "Total Selesai",
      footerDesc: "Berdasarkan Data Keseluruhan",
    },
    {
      title: "Total Pendapatan Booking",
      val: revenueBooking ? formatCurrencyId(revenueBooking) : "-",
      icon: LucideWallet,
      // footerTitle: "Total Pendapatan Booking",
      footerDesc: "Seluruh Total Dengan Status Confirmed",
      footerIcon: LucideWallet,
    },
  ];

  return info;
}
