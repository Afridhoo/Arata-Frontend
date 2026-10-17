import { Button } from "@/components/ui/button";
import { LucideMapPinCheckInside } from "lucide-react";
import { FiCompass } from "react-icons/fi";

export default function ListLocations({
  location,
  handleCLickMaps,
  handleSetLocationTour,
}) {
  return (
    <div className="w-full flex flex-col gap-2">
      {location?.map((el, index) => (
        <div
          onClick={() => handleCLickMaps([el.lon, el.lat])}
          key={index}
          className="p-3.5 bg-white rounded-xl flex gap-3 cursor-pointer "
        >
          <span>
            <LucideMapPinCheckInside size={20} />
          </span>

          <div className="flex-1 min-w-0 relative">
            <div className="flex items-start justify-between gap-2">
              <h4 className="font-semibold text-sm text-gray-800 truncate ">
                {el.name || "Lokasi Tanpa Nama"}
              </h4>
              {el.addresstype && (
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 capitalize flex-shrink-0">
                  {el.addresstype}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
              {el.display_name}
            </p>

            <div>
              <Button
                type="button"
                className={"mt-3 cursor-pointer"}
                onClick={() => handleSetLocationTour(el)}
                variant="outline"
              >
                Pilih Lokasi
              </Button>
            </div>
          </div>
        </div>
      ))}

      {!location && (
        <div className="h-full flex flex-col items-center justify-center text-center p-6 border border-dashed border-gray-200 rounded-xl bg-gray-50/30">
          <FiCompass className="w-8 h-8 text-gray-300 animate-pulse mb-2" />
          <p className="text-sm text-gray-400 font-medium max-w-[200px]">
            Cari lokasi atau klik pada peta untuk menentukan lokasi Tour
          </p>
        </div>
      )}
    </div>
  );
}
