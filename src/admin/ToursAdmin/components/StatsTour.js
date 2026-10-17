import { formatCurrencyId } from "../../../utils/convertCurrency";
import { UseGetStatsTour } from "../hooks/useTourAdmin";
import {
  LucideArrowUpRightFromCircle,
  LucideCheck,
  LucideTagX,
  LucideX,
} from "lucide-react";

export function statsTour() {
  const { data: tourStats, isLoading } = UseGetStatsTour();

  if (isLoading || tourStats?.length === 0) return [];

  const mostPopular = tourStats.reduce((max, el) =>
    el.totalConfirmed > max.totalConfirmed ? el : max,
  );

  const mostCancelled = tourStats.reduce((max, el) =>
    el.totalCancelled > max.totalCancelled ? el : max,
  );

  const { name: nameCancel, revenueCancelled } = mostCancelled;
  const { name: namePopular, revenueConfirmed } = mostPopular;

  const info = [
    {
      title: "Biaya Dibatalkan",
      footerTitle: "Dibatalkan Terbanyak ",
      footerDesc: "Berdasarkan Data Keseluruhan",
      val: revenueCancelled ? nameCancel : "-",
      subValue: formatCurrencyId(revenueCancelled),
      icon: LucideTagX,
      footerIcon: LucideX,
    },
    {
      title: "Biaya Dikonfirmasi",
      footerTitle: "Dibooking Terbanyak ",
      val: namePopular,
      footerDesc: "Berdasarkan Data Keseluruhan",
      subValue: formatCurrencyId(revenueConfirmed),
      icon: LucideCheck,
      footerIcon: LucideArrowUpRightFromCircle,
    },
  ];

  return info;
}
