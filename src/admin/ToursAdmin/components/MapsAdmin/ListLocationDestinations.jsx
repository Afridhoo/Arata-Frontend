import { FiArrowRight, FiSave } from "react-icons/fi";

export default function ListLocationDestinations({
  destination,
  handleCheckDestination,
  handleSaveLocation,
  status,
  isActive,
}) {
  if (!destination || destination.length === 0) return null;

  return (
    <div className="absolute bottom-4  z-[1000] w-80 max-h-72 overflow-y-auto flex flex-col gap-2 pr-1">
      {destination?.map((el, idx) => {
        const {
          city,
          country,
          name,
          address_line2,
          district,
          lat,
          lon,
          place_id,
          datasource,
        } = el.properties || {};

        const category = datasource.raw.tourism;
        const cheking = place_id === isActive;

        return (
          <div
            key={idx}
            className={`${cheking ? "border-r-8 border-green-500 " : "bg-white/95"}  backdrop-blur-sm border border-emerald-100 rounded-xl shadow-lg px-4 py-3 transition-all duration-200 hover:shadow-xl hover:border-emerald-300`}
          >
            {/* Header: Name + Category Badge */}
            <div className="flex items-start justify-between gap-2 mb-2">
              <h2 className="text-sm font-semibold text-gray-800 leading-tight">
                {name}
              </h2>
              {category && (
                <span className="flex-shrink-0 text-[10px] font-medium bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full capitalize">
                  {category}
                </span>
              )}
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100 mb-2" />

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs text-gray-500">
              {city && (
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                  <span className="truncate">{city}</span>
                </div>
              )}
              {country && (
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 flex-shrink-0" />
                  <span className="truncate">{country}</span>
                </div>
              )}
              {district && (
                <div className="flex items-center gap-1 col-span-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 flex-shrink-0" />
                  <span className="truncate">{district}</span>
                </div>
              )}
            </div>

            {/* Address */}
            {address_line2 && (
              <div className="mt-2 text-[11px] text-gray-400 truncate">
                📍 {address_line2}
              </div>
            )}

            <div className="flex items-center gap-4">
              <div>
                <button
                  onClick={() => handleSaveLocation(el, status)}
                  type="button"
                  className="flex gap-1 mt-4 max-w-27 rounded-lg font-semibold cursor-pointer text-xs duration-300 items-center bg-green-600 text-white p-2 hover:bg-green-700"
                >
                  <FiSave className="w-4 h-4" />
                  Pilih Lokasi
                </button>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => handleCheckDestination([lon, lat], place_id)}
                  className="flex gap-1 mt-4 max-w-27 rounded-lg font-semibold cursor-pointer text-xs duration-300 items-center bg-green-600 text-white p-2 hover:bg-green-700"
                >
                  Cek Lokasi
                  <FiArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
