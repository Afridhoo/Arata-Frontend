import { LucideMapPinCheckInside } from "lucide-react";
;

export default function ListLocations({
  headerText,
  subText,
  handleClickStart,
  valueRender,

  idTourActive,
}) {
  return (
    <>
      <div className="flex items-center gap-2 border-b border-emerald-100 md:pb-2.5 md:mb-2.5">
        <LucideMapPinCheckInside className="hidden md:flex" />

        <div>
          <h3 className="text-xs md:text-sm font-bold text-gray-900">{headerText}</h3>
          <p className="text-[10px] text-gray-700">{subText}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 pr-1">
        {valueRender?.map((el, idx) => {
          const { description, address, id: idTour } = el;
          const cheking = idTour === idTourActive;

          return (
            <div
              key={idx}
              onClick={() => handleClickStart(idTour)}
              className={`group flex items-start gap-2.5 p-2.5 rounded-lg border transition-all cursor-pointer
                ${
                  cheking
                    ? "bg-gray-50 border-gray-300"
                    : "bg-slate-50/50 border-gray-100 "
                }`}
            >
              <div
                className={`${cheking ? " text-gray-800  " : "text-gray-400 "}`}
              >
                <span className="font-semibold text-xs md:text-sm">{idx + 1}</span>
              </div>
              <div className="grid">
                <span
                  className={`py-1 px-2 rounded-lg text-xs font-semibold
                    ${cheking ? "text-gray-900" : "text-gray-600"}`}
                >
                  {description}
                </span>

                <span
                  className={`py-1 px-2 rounded-lg text-xs font-semibold
                    ${cheking ? "text-gray-800" : "text-gray-500"}`}
                >
                  {address}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
