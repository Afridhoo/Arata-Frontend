import { formatDateId } from "../../../utils/convertDate";
import InfoGuide from "./InfoGuide";
import { FiCalendar } from "react-icons/fi";
import { BadgeSimpleUse } from "@/components/BadgeSimpleUse";
import {
  LucideMapPin,
  LucideMapPinCheckInside,
  LucideUsers2,
} from "lucide-react";
import { DatePickerWithRange } from "@/components/DatePickerWithRange";

import RangeTime from "@/admin/GlobalComponents/RangeTime";
import { Input } from "@/components/ui/input";
import { FieldLabel } from "@/components/ui/field";

export default function ListLocations({
  el,
  idx,
  register,
  nameRegister,
  dataCategories,
  displayGuide,
  imageStartLocation,
  setDate,
  date,
  setTime,
  time,

  setStartLocTime,
  startLocTime,
}) {
  const {
    description,
    date: oldDate,
    _id,
    image,
    address,
    typeLocation,
    categories,
    time: oldTime = [],
  } = el;

  const isValidCategoris =
    dataCategories?.find((c) => c._id === categories) || {};

  const { categoriesTour, description: descCateg } = isValidCategoris;

  const checkValid = oldTime?.length > 0 ? oldTime : time;
  const validTime = checkValid?.find((e) => e._id === _id);

  return (
    <div className="bg-white rounded-xl border  border-slate-200 shadow-sm overflow-hidden flex flex-col transition-all hover:shadow-md w-[400px] h-full overflow-x-auto">
      <div className="relative h-48 w-full     bg-slate-100">
        <img
          src={imageStartLocation || image}
          alt={description || "Location Image"}
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute top-3 right-3 flex gap-2">
          <div className="flex items-center gap-2  ">
            <BadgeSimpleUse
              desc={typeLocation || "Tanggal Keberangkatan"}
              icon={<LucideMapPinCheckInside />}
              variant={"default"}
            />

            {displayGuide && (
              <BadgeSimpleUse
                variant={"default"}
                desc={`${displayGuide.length} Pemandu`}
                icon={<LucideUsers2 size={18} />}
              />
            )}
          </div>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow gap-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-lg  font-bold text-gray-800 ">
              {description || "-"}
            </p>

            <span className="flex items-center gap-2 mt-5">
              <BadgeSimpleUse desc={"Alamat"} icon={<LucideMapPin />} />
              <p className="text-xs font-medium text-slate-600  wrap-break-word max-w-[250px]">
                {address || "-"}
              </p>
            </span>

            <span className="flex items-center gap-2 mt-5">
              <BadgeSimpleUse desc={"Kategori Tour"} icon={<LucideMapPin />} />
              <p className="text-xs font-medium text-slate-600  wrap-break-word max-w-[250px]">
                {categoriesTour || "-"}
              </p>
            </span>

            <span className="flex items-center gap-2 mt-5">
              <BadgeSimpleUse
                desc={"Deskripsi Kategori"}
                icon={<LucideMapPin />}
              />
              <p className="text-xs font-medium text-slate-600  wrap-break-word max-w-[250px]">
                {descCateg || "-"}
              </p>
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 mt-auto pt-2">
          {oldDate && (
            <BadgeSimpleUse
              variant={"default"}
              desc={`${formatDateId(oldDate?.from, true)} - ${formatDateId(oldDate?.to, true)}`}
            />
          )}
        </div>
      </div>

      <div className="p-4  bg-slate-50 border-t w-full border-slate-100 mt-auto">
        <input
          value={_id}
          type="hidden"
          {...register(`${nameRegister}.${idx}`)}
        />

        <DatePickerWithRange setDate={setDate} date={date} _id={_id} />

        {startLocTime && (
          <div className="flex gap-2 mt-3">
            <span>
              <FieldLabel htmlFor="time-picker-optional">Jam Mulai</FieldLabel>
              <Input
                type="time"
                className="appearance-none bg-background"
                defaultValue={
                  startLocTime.find((x) => x.label === "startTime")?.time
                }
                onChange={(e) =>
                  setStartLocTime({ time: e.target.value, label: "startTime" })
                }
              />
            </span>
            <span>
              <FieldLabel htmlFor="time-picker-optional">
                Jam Selesai
              </FieldLabel>
              <Input
                type="time"
                className="appearance-none bg-background"
                defaultValue={
                  startLocTime.find((x) => x.label === "endTime")?.time
                }
                onChange={(e) =>
                  setStartLocTime({ time: e.target.value, label: "endTime" })
                }
              />
            </span>
          </div>
        )}

        <RangeTime
          schedule={validTime?.schedule}
          time={checkValid}
          setTime={setTime}
          _id={_id}
          text={validTime?.text}
        />
      </div>

      {displayGuide && (
        <div className="overflow-x-auto max-h-100">
          <InfoGuide
            categories={isValidCategoris}
            value={displayGuide}
            dest={el}
            {...register("guide")}
          />
        </div>
      )}
    </div>
  );
}
