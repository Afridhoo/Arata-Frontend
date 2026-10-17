import BadgePerStatusLocations from "@/components/BadgePerStatusLocations";
import { BadgeSimpleUse } from "@/components/BadgeSimpleUse";
import { formatDateId } from "@/utils/convertDate";

export default function RenderListLocationsMap({
  value,
  title,
  setLocationActive,
  isActiveTripTour,
  isFinishTour = false,
}) {
  return (
    <div className="flex flex-col gap-3">
      <h4 className="text-xs font-medium text-gray-400 uppercase tracking-widest pb-3 border-b border-gray-100">
        {title}
      </h4>
      <div className="flex flex-col">
        {value.map((el, idx) => {
          return (
            <div
              key={el.id || idx}
              onClick={() => setLocationActive(el.coordinates, el._id)}
              className="flex items-start gap-4 py-3.5 hover:bg-gray-50 rounded-lg px-3 -mx-3 transition-colors duration-200 cursor-pointer"
            >
              <span className="text-xs font-medium text-gray-300 mt-0.5 min-w-[20px]">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col">
                <span className="flex items-center gap-5">
                  <h5 className="font-medium text-gray-900 text-sm leading-snug">
                    {el.description}
                  </h5>

                  {isFinishTour && (
                    <BadgeSimpleUse
                      desc={"Selesai"}
                      style={"bg-green-600 text-white"}
                    />
                  )}

                  {isActiveTripTour && !isFinishTour && (
                    <BadgePerStatusLocations status={el.status} />
                  )}
                </span>

                {el.address && (
                  <p className="text-xs text-gray-400 mt-1">{el.address}</p>
                )}
                {el.date && (
                  <div className="mt-2 mb-2">
                    <BadgeSimpleUse
                      desc={`${formatDateId(el?.date?.from, true)} - ${formatDateId(el?.date?.to, true)}`}
                      variant={"outline"}
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
