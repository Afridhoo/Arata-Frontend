import {
  LucideMapPinCheck,
  LucideStarCheck,
  LucideUserCheck,
} from "lucide-react";

export const infoHistories = ({ value }) => {
  const { dataGuide } = value[0];

  const { finishedHandle, ratingsAverage, ratingsQuantity } = dataGuide;



  const info = [
    {
      title: "Wisata Dipandu",
      subValue: `${finishedHandle} `,
      icon: LucideMapPinCheck,
      footerTitle: `${finishedHandle} Wisata`,
      footerDesc: "Total Kesluruhan Riwayat Memandu Wisata",
      footerIcon: LucideMapPinCheck,
    },
    {
      title: "Rating ",
      subValue: `${ratingsAverage} / 5`,
      icon: LucideStarCheck,
      footerTitle: ` Rating Diterima ${ratingsAverage} / 5`,
      footerDesc: `Rata Rata Dari Keseluruhan Rating`,
      footerIcon: LucideStarCheck,
    },
    {
      title: "Rating Diterima",
      subValue: `${ratingsQuantity} `,
      icon: LucideUserCheck,
      footerTitle: `${ratingsQuantity} Diberikan Oleh User`,
      footerDesc: "Total Rating yang diterima saat/selesai Memandu",
      footerIcon: LucideStarCheck,
    },
  ];

  return info;
};
