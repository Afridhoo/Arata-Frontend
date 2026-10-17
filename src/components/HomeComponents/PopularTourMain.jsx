import { formatCurrencyId } from "@/utils/convertCurrency";
import { FaHotel, FaUserCheck } from "react-icons/fa";
import { FiDollarSign, FiMapPin, FiTag, FiUsers } from "react-icons/fi";

import ArrowUpRight from "../ArrowUpRight";
import HoverCardUse from "../HoverCardUse";
import { Button } from "../ui/button";

function RenderList({ Icon, value, text }) {
  return (
    <div className="flex items-center gap-3">
      <div>
        <p className="text-[12px] text-slate-400 font-semibold uppercase tracking-wider">
          {text}
        </p>
        <p className="font-bold text-slate-900">{value}</p>
      </div>
    </div>
  );
}
export default function PopularTourMain({ TourRender }) {
  const { bookedCount, _id } = TourRender;
  const { name, description, price, maxGroupSize, slot, locations } =
    TourRender.GetTour;

  const { destination, hotel } = locations;

  return (
    <div className="flex-1 w-full max-w-[500px] flex flex-col justify-center bg-white rounded-[2rem]  p-8 pl-10 pt-2 pb-8 shadow-sm border border-gray-300 relative hover:shadow-md duration-300">
      <h3 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight mt-7">
        {name}
      </h3>
      <p className="text-slate-500 text-lg mb-8 leading-relaxed line-clamp-2 max-w-[400px]">
        {description}
      </p>

      <div className="grid grid-cols-2 gap-7 mb-8   ">
        <RenderList
          Icon={FiDollarSign}
          text={"Harga"}
          value={formatCurrencyId(price)}
        />
        <RenderList
          Icon={FiUsers}
          text={"Maximum Grup"}
          value={`${maxGroupSize} Orang`}
        />
        <RenderList Icon={FiTag} text={"Slot"} value={slot} />

        <RenderList
          Icon={FiMapPin}
          text={"Total Wisata"}
          value={destination?.length}
        />
        <RenderList Icon={FaHotel} text={"Total Hotel"} value={hotel?.length} />
        <RenderList
          Icon={FaUserCheck}
          text={"Tour Ini Berjalan"}
          value={`${bookedCount} Kali`}
        />
      </div>
      <Button className="cursor-pointer rounded-full  h-8 py-4 bg-gray-700 hover:bg-gray-800">
        Lihat Detail
      </Button>
    </div>
  );
}
